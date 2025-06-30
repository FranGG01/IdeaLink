from flask import Blueprint

from .auth import auth_api
from .project import project_api

api = Blueprint('api', __name__)

api.register_blueprint(auth_api, url_prefix='')
api.register_blueprint(project_api, url_prefix='')
