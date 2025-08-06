from flask import Blueprint, request, jsonify
from api.models import db, User
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
import traceback

auth_api = Blueprint('auth_api', __name__)

# ------------------ REGISTER ------------------
@auth_api.route('/register', methods=['POST'])
def register_user():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        username = data.get('username')

        if not email or not password or not username:
            return jsonify({"msg": "Todos los campos son requeridos"}), 400

        if User.query.filter_by(email=email).first():
            return jsonify({"msg": "El usuario ya existe"}), 409

        hashed_password = generate_password_hash(password)
        new_user = User(email=email, password=hashed_password, username=username)
        db.session.add(new_user)
        db.session.commit()

        return jsonify({"msg": "Usuario creado correctamente"}), 201

    except Exception as e:
        print("💥 Error en /register:", e)
        traceback.print_exc()
        return jsonify({"msg": "Error interno en el servidor"}), 500


# ------------------ LOGIN ------------------
@auth_api.route('/token', methods=['POST'])
def create_token():
    try:
        data = request.get_json(force=True)
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return jsonify({"msg": "Email y contraseña requeridos"}), 400

        user = User.query.filter_by(email=email).first()

        if not user or not check_password_hash(user.password, password):
            return jsonify({"msg": "Credenciales inválidas"}), 401

        access_token = create_access_token(identity=str(user.id))
        return jsonify({'token': access_token, 'user_id': user.id}), 200

    except Exception as e:
        print("💥 Error en /token:", e)
        traceback.print_exc()
        return jsonify({"msg": "Error interno en el servidor"}), 500


# ------------------ GET PROFILE ------------------
@auth_api.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    return jsonify(user.serialize()), 200


# ------------------ UPDATE PROFILE ------------------
@auth_api.route('/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        user = User.query.get(user_id)

        if not user:
            return jsonify({"msg": "Usuario no encontrado"}), 404

        user.username = data.get("username", user.username)
        user.avatar_url = data.get("avatar_url", user.avatar_url)
        user.banner_url = data.get("banner_url", user.banner_url)
        user.role = data.get("role", user.role)
        user.location = data.get("location", user.location)
        user.bio = data.get("bio", user.bio)

        db.session.commit()
        return jsonify(user.serialize()), 200

    except Exception as e:
        print("💥 Error en /profile PUT:", e)
        traceback.print_exc()
        return jsonify({"msg": "Error interno en el servidor"}), 500
