"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_jwt_extended import create_access_token

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/token', methods=['POST'])
def create_token():
    email = request.json.get('email')
    password = request.json.get('password')

    user = User.query.filter_(email=email, password=password).first()
    if not user:
        return jsonify({"msg": "Invalid credentials"}), 401
    
    access_token = create_access_token(identity=user.id)
    return jsonify({'token':access_token,'user_id':user.id}), 200

@api.route('/profile', methods=['GET'])
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    return jsonify(user.serialize()), 200

