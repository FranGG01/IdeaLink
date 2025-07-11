# api/routes/favorites_routes.py

from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from api.models import db, User, Project

favorites_bp = Blueprint("favorites", __name__)

@favorites_bp.route("/favorites/<int:project_id>", methods=["POST"])
@jwt_required()
def add_favorite(project_id):
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    project = Project.query.get(project_id)

    if not project:
        return jsonify({"error": "Proyecto no encontrado"}), 404

    if project not in user.favorite_projects:
        user.favorite_projects.append(project)
        db.session.commit()

    return jsonify({"message": "Añadido a favoritos"}), 201


@favorites_bp.route("/favorites/<int:project_id>", methods=["DELETE"])
@jwt_required()
def remove_favorite(project_id):
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    project = Project.query.get(project_id)

    if not project:
        return jsonify({"error": "Proyecto no encontrado"}), 404

    if project in user.favorite_projects:
        user.favorite_projects.remove(project)
        db.session.commit()

    return jsonify({"message": "Eliminado de favoritos"}), 200


@favorites_bp.route("/my-favorites", methods=["GET"])
@jwt_required()
def get_my_favorites():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    favorites = [project.serialize(current_user_id=user_id) for project in user.favorite_projects]
    return jsonify(favorites), 200
