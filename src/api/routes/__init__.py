from flask import Blueprint

from .auth import auth_api
from .project import project_api
from .application import application_api
from .ia_routes import ia_bp

api = Blueprint('api', __name__)

api.register_blueprint(auth_api, url_prefix='')
api.register_blueprint(project_api, url_prefix='')
api.register_blueprint(application_api, url_prefix='')
api.register_blueprint(ia_bp, url_prefix="ia")
