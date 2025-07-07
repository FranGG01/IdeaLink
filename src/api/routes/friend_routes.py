from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy import or_
from api.models import db, User, FriendRequest

friend_bp = Blueprint("friend_bp", __name__, url_prefix="/api")

# ───────────────────────────────────────
# 1. Enviar solicitud  POST /api/friend-request
# body: { "receiver_id": 5 }
# ───────────────────────────────────────
@friend_bp.route("/friend-request", methods=["POST"])
@jwt_required()
def send_request():
    me = get_jwt_identity()
    data = request.get_json() or {}
    receiver_id = data.get("receiver_id")

    if not receiver_id:
        return jsonify({"error": "receiver_id requerido"}), 400
    if receiver_id == me:
        return jsonify({"error": "No puedes enviarte solicitud"}), 400

    exists = FriendRequest.query.filter(
        or_(
            (FriendRequest.sender_id == me) & (FriendRequest.receiver_id == receiver_id),
            (FriendRequest.sender_id == receiver_id) & (FriendRequest.receiver_id == me),
        )
    ).first()
    if exists:
        return jsonify({"error": "Ya existe solicitud o amistad"}), 400

    fr = FriendRequest(sender_id=me, receiver_id=receiver_id)
    db.session.add(fr)
    db.session.commit()
    return jsonify({"message": "Solicitud enviada", "request_id": fr.id}), 201


# ───────────────────────────────────────
# 2. Aceptar / rechazar  POST /api/friend-request/<id>
# body: { "action": "accept" | "reject" }
# ───────────────────────────────────────
@friend_bp.route("/friend-request/<int:req_id>", methods=["POST"])
@jwt_required()
def respond_request(req_id):
    me = get_jwt_identity()
    data = request.get_json() or {}
    action = data.get("action")

    fr = FriendRequest.query.filter_by(id=req_id, receiver_id=me).first()
    if not fr or fr.status != "pending":
        return jsonify({"error": "Solicitud no válida"}), 404

    if action == "accept":
        fr.status = "accepted"
    elif action == "reject":
        fr.status = "rejected"
    else:
        return jsonify({"error": "Acción inválida"}), 400

    db.session.commit()
    return jsonify({"message": f"Solicitud {action}ed"}), 200


# ───────────────────────────────────────
# 3. Ver solicitudes pendientes  GET /api/friend-requests
# ───────────────────────────────────────
@friend_bp.route("/friend-requests", methods=["GET"])
@jwt_required()
def pending_requests():
    me = get_jwt_identity()
    pendings = FriendRequest.query.filter_by(receiver_id=me, status="pending").all()
    return jsonify([
        {
            "id": fr.id,
            "sender": fr.sender.serialize(),
            "created_at": fr.created_at.isoformat(),
        } for fr in pendings
    ]), 200


# ───────────────────────────────────────
# 4. Ver amigos confirmados  GET /api/friends
# ───────────────────────────────────────
@friend_bp.route("/friends", methods=["GET"])
@jwt_required()
def list_friends():
    me = get_jwt_identity()
    user = User.query.get(me)
    return jsonify([u.serialize() for u in user.friends]), 200

