from flask import Blueprint, request, jsonify
from api.models import db, User
from flask_jwt_extended import create_access_token
from werkzeug.security import generate_password_hash, check_password_hash

auth_api = Blueprint('auth_api', __name__)

@auth_api.route('/register', methods=['POST'])
def register_user():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not password or not email:
        return jsonify({"msg": "Email y contraseña requeridos"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"msg": "El usuario ya existe"}), 409

    hashed_password = generate_password_hash(password)
    new_user = User(email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "Usuario creado correctamente"}), 201

@auth_api.route('/token', methods=['POST'])
def create_token():
    data = request.get_json(force=True)
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()

    if not user or not check_password_hash(user.password, password):
        return jsonify({"msg": "Credenciales inválidas"}), 401

    access_token = create_access_token(identity=user.id)
    return jsonify({'token': access_token, 'user_id': user.id}), 200
