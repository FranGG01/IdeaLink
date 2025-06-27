"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_jwt_extended import create_access_token
from werkzeug.security import check_password_hash

api = Blueprint('api', __name__)

#REGISTRAR USUARIO
@api.route('/register', methods=['POST'])
def register_user():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    if not password or not email:
        return jsonify({"msg": "Email y contraseña requeridos"}), 400
    
    user_exists = User.query.filter_by(email=email).first()
    if user_exists:
        return jsonify({"msg": "El usuario ya existe"}), 409
    
    new_user = User(email=email, password=password)
    db.session.add(new_user)
    db.session.commit()
    is_active=True 
    return jsonify({"msg": "Usuario creado correctamente"}), 201


#CREAR TOKEN
@api.route('/token', methods=['POST'])
def create_token():
    data = request.get_json(force=True)
    print("Datos recibidos:", data)
    email = data.get('email')
    password = data.get('password')
    print(f"Email: '{email}', Password: '{password}'")

    user = User.query.filter_by(email=email, password=password).first()
    if not user:
        print("Usuario no encontrado o contraseña incorrecta")
        return jsonify({"msg": "Invalid credentials"}), 401

    access_token = create_access_token(identity=user.id)
    return jsonify({'token': access_token, 'user_id': user.id}), 200
