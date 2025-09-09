from flask import Blueprint, jsonify
from api.models import User

usersperfil_api = Blueprint('usersperfil_api', __name__)

@usersperfil_api.route('/user/<int:user_id>', methods=['GET'])
def get_public_user_profile(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404
    # Solo datos públicos
    public_data = {
        "id": user.id,
        "username": user.username,
        "avatar_url": user.avatar_url,
        "banner_url": user.banner_url,
        "role": user.role,
        "location": user.location,
        "bio": user.bio
    }
    return jsonify(public_data), 200
