from flask import Blueprint, request, jsonify
from api.models import db, Postularse, ProjectCollaborator
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy.orm import joinedload

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
@jwt_required()
def apply_to_project():
    try:
        data = request.get_json()
        user_id = get_jwt_identity()

        application = Postularse(
            message=data.get('message'),
            user_id=user_id,
            project_id=data.get('project_id')
        )

        db.session.add(application)
        db.session.commit()
        return jsonify(application.serialize()), 201

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500


@application_api.route('/my-project-applications', methods=['GET'])
@jwt_required()
def get_my_project_applications():
    current_user_id = get_jwt_identity()

    applications = Postularse.query.join(Postularse.project).filter(
        Postularse.project.has(owner_id=current_user_id)
    ).all()

    return jsonify([app.serialize() for app in applications]), 200


@application_api.route('/applications/received', methods=['GET'])
@jwt_required()
def get_received_applications():
    user_id = get_jwt_identity()

    from api.models import Project

    user_projects = Project.query.filter_by(owner_id=user_id).all()
    project_ids = [p.id for p in user_projects]

    applications = Postularse.query.filter(Postularse.project_id.in_(project_ids)).all()

    return jsonify([a.serialize() for a in applications]), 200


@application_api.route('/applications/<int:id>/accept', methods=['POST'])
@jwt_required()
def accept_application(id):
    from traceback import print_exc
    try:
        current_user_id = get_jwt_identity()

        application = Postularse.query.options(db.joinedload(Postularse.project)).get(id)
        if not application:
            return jsonify({"error": "Postulación no encontrada"}), 404

        project = application.project
        if str(project.owner_id) != str(current_user_id):
            return jsonify({
                "error": "No autorizado",
                "project_owner_id": project.owner_id,
                "current_user_id": current_user_id
            }), 403

        collaborator = ProjectCollaborator(
            user_id=application.user_id,
            project_id=application.project_id
        )
        db.session.add(collaborator)
        db.session.delete(application)
        db.session.commit()

        return jsonify({"msg": "Colaborador añadido"}), 200

    except Exception as e:
        print("❌ ERROR al aceptar postulación")
        print_exc()
        return jsonify({"error": str(e)}), 500



@application_api.route('/applications/<int:postulacion_id>/reject', methods=['POST'])
@jwt_required()
def reject_application(postulacion_id):
    post = Postularse.query.options(db.joinedload(Postularse.project)).get_or_404(postulacion_id)
    current_user_id = get_jwt_identity()

    print(">> current_user_id:", current_user_id)
    print(">> post.project.owner_id:", post.project.owner_id)

    if str(post.project.owner_id) != str(current_user_id):
        return jsonify({"error": "No autorizado"}), 403

    db.session.delete(post)
    db.session.commit()

    return jsonify({"message": "Postulación rechazada"}), 200



@application_api.route('/applications/<int:id>/debug', methods=['GET'])
@jwt_required()
def debug_application(id):
    application = Postularse.query.options(joinedload(Postularse.project)).get(id)
    if not application:
        return jsonify({"error": "No existe esa postulación"}), 404

    return jsonify({
        "postulacion_id": application.id,
        "project_id": application.project.id,
        "project_owner_id": application.project.owner_id,
        "user_id": application.user_id,
        "current_user_id": get_jwt_identity()
    }), 200
