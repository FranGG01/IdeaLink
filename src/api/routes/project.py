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
    user_id = get_jwt_identity()
    data = request.get_json()

    title = data.get('title')
    description = data.get('description')
    raw_hashtags = data.get('hashtags', '')
    hashtags = ', '.join(
        f"#{tag.strip().lstrip('#')}" 
        for tag in raw_hashtags.split(',') if tag.strip()
    )
    stackblitz_url = data.get('stackblitz_url')
    image_urls = data.get('image_urls', [])

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
# Actualizar un proyecto existente (parcial). Acepta JSON o multipart.
@project_api.route('/projects/<int:id>', methods=['PUT', 'PATCH'])
@jwt_required()
def update_project(id):
    import os
    project = Project.query.get_or_404(id)
    user_id = int(get_jwt_identity())
    if project.owner_id != user_id:
        return jsonify({"msg": "Forbidden"}), 403

    if request.content_type and 'multipart/form-data' in request.content_type:
        title = request.form.get('title', project.title)
        description = request.form.get('description', project.description)
        raw_hashtags = request.form.get('hashtags', None)
        stackblitz_url = request.form.get('stackblitz_url', project.stackblitz_url)
        is_accepting = request.form.get('is_accepting_applications', None)
        code_files = request.form.get('code_files', project.code_files)

        if raw_hashtags is not None:
            hashtags = ', '.join(f"#{t.strip().lstrip('#')}" for t in raw_hashtags.split(',') if t.strip())
        else:
            hashtags = project.hashtags

        if is_accepting is not None:
            is_accepting = (str(is_accepting).lower() in ['1','true','yes'])
        else:
            is_accepting = project.is_accepting_applications

        # Gestión de imágenes: añadir y/o eliminar
        image_files = request.files.getlist('image_files') 
        remove_list = request.form.getlist('remove_image_urls')  

        current_urls = list(project.image_urls or [])
        if remove_list:
            current_urls = [u for u in current_urls if u not in set(remove_list)]

        for image in image_files:
            if image and image.filename:
                filename = image.filename
                save_path = os.path.join("static", "uploads", filename)
                os.makedirs(os.path.dirname(save_path), exist_ok=True)
                image.save(save_path)
                current_urls.append(f"/static/uploads/{filename}")

        project.title = title
        project.description = description
        project.hashtags = hashtags
        project.stackblitz_url = stackblitz_url
        project.is_accepting_applications = is_accepting
        project.code_files = code_files
        project.image_urls = current_urls

    else:

        data = request.get_json() or {}
        project.title = data.get('title', project.title)
        project.description = data.get('description', project.description)
        project.stackblitz_url = data.get('stackblitz_url', project.stackblitz_url)
        project.code_files = data.get('code_files', project.code_files)
        if 'is_accepting_applications' in data:
            project.is_accepting_applications = bool(data['is_accepting_applications'])

        raw_hashtags = data.get('hashtags', None)
        if raw_hashtags is not None:
            project.hashtags = ', '.join(
                f"#{tag.strip().lstrip('#')}" for tag in raw_hashtags.split(',') if tag.strip()
            )

        # Añadir/eliminar imágenes 
        add_urls = data.get('add_image_urls', [])
        remove_urls = set(data.get('remove_image_urls', []))
        if add_urls or remove_urls:
            current = list(project.image_urls or [])
            current = [u for u in current if u not in remove_urls]
            current.extend([u for u in add_urls if u])
            project.image_urls = current

    db.session.commit()
    return jsonify(project.serialize(current_user_id=user_id)), 200


# Eliminar un proyecto
@project_api.route('/projects/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_project(id):
    project = Project.query.get_or_404(id)
    user_id = int(get_jwt_identity())
    if project.owner_id != user_id:
        return jsonify({"msg": "Forbidden"}), 403

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
