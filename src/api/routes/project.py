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

