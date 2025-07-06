from flask import Blueprint, request, jsonify
from api.models import db, Project

project_api = Blueprint('project_api', __name__)

@project_api.route('/projects', methods=['GET'])
def get_all_projects():
    projects = Project.query.all()
    return jsonify([p.serialize() for p in projects]), 200

@project_api.route('/projects/<int:id>', methods=['GET'])
def get_project(id):
    project = Project.query.get_or_404(id)
    return jsonify(project.serialize()), 200

@project_api.route('/projects', methods=['POST'])
def create_project():
    data = request.get_json()
    project = Project(
        title = data['title'],
        description = data['description'],
        image_url = data.get('image_url'),
        hashtags = data.get('hashtags'),
        is_accepting_applications=data.get('is_accepting_applications', True),
        owner_id = data['owner_id']
    )
    db.session.add(project)
    db.session.commit()
    return jsonify(project.serialize()), 200

@project_api.route('/projects/<int:id>', methods=['PUT'])
def update_project(id):
    project = Project.query.get_or_404(id)
    data = request.get_json()
    
    project.title = data.get('title',project.title)
    project.description = data.get('description', project.description)
    project.image_url = data.get('image_url', project.image_url)
    project.hashtags = data.get('hashtags', project.hashtags)
    project.is_accepting_applications = data.get('is_accepting_applications', project.is_accepting_applications)
    
    db.session.commit()
    return jsonify(project.serialize()), 200

@project_api.route('/projects/<int:id>', methods=['DELETE'])
def delete_project(id):
    project = Project.query.get_or_404(id)
    db.session.delete(project)
    db.session.commit()
    return '', 204