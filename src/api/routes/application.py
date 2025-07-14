from flask import Blueprint, request, jsonify
from api.models import db, Postularse
from flask_jwt_extended import jwt_required, get_jwt_identity

application_api = Blueprint('application_api', __name__)

@application_api.route('/applications', methods=['GET'])
def get_all_applications():
    applications = Postularse.query.all()
    return jsonify([a.serialize() for a in applications]), 200

@application_api.route('/application/<int:project_id>', methods=['GET'])
def get_applications_for_project(project_id):
    applications = Postularse.query.filter_by(project_id=project_id).all()
    return jsonify([a.serialize() for a in applications]), 200

@application_api.route('/applications', methods=['POST'])
def apply_to_project():
    data = request.get_json()
    user_id = get_jwt_identity() 
    
    application = Postularse(
        message = data.get('message'),
        user_id = data['user_id'],
        project_id = data['project_id']
    )
    db.session.add(application)
    db.session.commit()
    return jsonify(application.serialize()), 201