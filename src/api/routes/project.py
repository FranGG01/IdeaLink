from flask import Blueprint, request, jsonify
from api.models import db, Project
from flask_jwt_extended import jwt_required, get_jwt_identity
from collections import Counter

project_api = Blueprint('project_api', __name__)

# Obtener todos los proyectos
@project_api.route('/projects', methods=['GET'])
def get_all_projects():
    projects = Project.query.order_by(Project.created_at.desc()).all()
    return jsonify([p.serialize() for p in projects]), 200

# Obtener un proyecto específico por ID
@project_api.route('/projects/<int:id>', methods=['GET'])
def get_project(id):
    project = Project.query.get_or_404(id)
    return jsonify(project.serialize()), 200

# Crear un nuevo proyecto
@project_api.route('/projects', methods=['POST'])
@jwt_required()
def create_project():
    import os

    user_id = get_jwt_identity()
    title = request.form.get('title')
    description = request.form.get('description')
    raw_hashtags = request.form.get('hashtags', '')
    hashtags = ', '.join(
        f"#{tag.strip().lstrip('#')}" 
        for tag in raw_hashtags.split(',') if tag.strip()
    )

    stackblitz_url = request.form.get('stackblitz_url')
    image_files = request.files.getlist('image_files')
    image_urls = []

    for image in image_files:
        if image and image.filename:
            filename = image.filename
            save_path = os.path.join("static", "uploads", filename)
            os.makedirs(os.path.dirname(save_path), exist_ok=True)
            image.save(save_path)
            image_urls.append(f"/static/uploads/{filename}")

    project = Project(
        title=title,
        description=description,
        hashtags=hashtags,
        stackblitz_url=stackblitz_url,
        image_urls=image_urls,
        is_accepting_applications=True,
        owner_id=user_id,
        code_files=None
    )

    db.session.add(project)
    db.session.commit()

    return jsonify(project.serialize(current_user_id=user_id)), 200

# Actualizar un proyecto existente
@project_api.route('/projects/<int:id>', methods=['PUT'])
def update_project(id):
    project = Project.query.get_or_404(id)
    data = request.get_json()

    project.title = data.get('title', project.title)
    project.description = data.get('description', project.description)
    project.image_url = data.get('image_url', project.image_url)

    raw_hashtags = data.get('hashtags')
    if raw_hashtags is not None:
        project.hashtags = ', '.join(
            f"#{tag.strip().lstrip('#')}" 
            for tag in raw_hashtags.split(',') if tag.strip()
        )

    project.is_accepting_applications = data.get('is_accepting_applications', project.is_accepting_applications)
    project.stackblitz_url = data.get('stackblitz_url', project.stackblitz_url)
    project.code_files = data.get('code_files', project.code_files)

    db.session.commit()
    return jsonify(project.serialize()), 200

# Eliminar un proyecto
@project_api.route('/projects/<int:id>', methods=['DELETE'])
def delete_project(id):
    project = Project.query.get_or_404(id)
    db.session.delete(project)
    db.session.commit()
    return '', 204

# Obtener los proyectos propios del usuario autenticado
@project_api.route('/my-projects', methods=['GET'])
@jwt_required()
def get_my_projects():
    user_id = int(get_jwt_identity()) 
    projects = Project.query.filter_by(owner_id=user_id).all()
    return jsonify([p.serialize(current_user_id=user_id) for p in projects]), 200

# Obtener colaboraciones (como colaborador o como dueño)
@project_api.route('/my-collaborations', methods=['GET'])
@jwt_required()
def get_my_collaborations():
    user_id = int(get_jwt_identity()) 

    # proyectos donde soy dueño
    own_projects = Project.query.filter_by(owner_id=user_id).all()

    # proyectos donde colaboro
    from api.models import ProjectCollaborator  # asegúrate de importar esto arriba
    collab_links = ProjectCollaborator.query.filter_by(user_id=user_id).all()
    collab_projects = [link.project for link in collab_links]

    # unir y eliminar duplicados
    all_projects = {p.id: p for p in own_projects + collab_projects}.values()

    result = [p.serialize(current_user_id=user_id) for p in all_projects]
    print(f"🔎 user_id actual: {user_id}")
    print(f"🔍 Serializando: {[ (p.title, p.owner_id, user_id, p.serialize(current_user_id=user_id)['is_owner']) for p in all_projects ]}")

    return jsonify(result), 200



# Obtener los hashtags más usados
@project_api.route('/trending-hashtags', methods=['GET'])
def trending_hashtags():
    projects = Project.query.all()
    hashtags_all = []
    for p in projects:
        if p.hashtags:
            tags = [tag.strip().lstrip('#') for tag in p.hashtags.split(',') if tag.strip()]
            hashtags_all.extend(tags)

    counter = Counter(hashtags_all)
    most_common = [tag for tag, count in counter.most_common(6)]
    return jsonify(most_common), 200
