"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from api.routes.ia_routes import ia_bp
from api.routes.friend_routes import friend_bp
from api.routes.favorites_routes import favorites_bp
from flask import send_from_directory
from stream_chat import StreamChat
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from api.commands import setup_commands
from api.admin import setup_admin
from api.routes import api
from api.models import db
from api.utils import APIException, generate_sitemap
from flask_swagger import swagger
from flask_migrate import Migrate
from flask import Flask, request, jsonify, url_for, send_from_directory
from api.routes.auth import auth_api
from api.routes.usersperfil import usersperfil_api
import os
from dotenv import load_dotenv          # ➊  Añade esto

# ➋  Carga variables .env **antes de todo**
load_dotenv(dotenv_path=".env")


STREAM_API_KEY = os.getenv("STREAM_API_KEY", "2pks7t76xeqd")
STREAM_API_SECRET = os.getenv(
    "STREAM_API_SECRET", "egfuhcyva6qbngb29zun8ru46v5ruaq7xy2kbfqse885vbfsrs7chgk42pnse5y5")

stream_client = StreamChat(api_key=STREAM_API_KEY,
                           api_secret=STREAM_API_SECRET)

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'supersecreto123'
jwt = JWTManager(app)
CORS(app, supports_credentials=True, expose_headers=[
    "Authorization"], allow_headers=["Content-Type", "Authorization"])

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../dist/')
app.url_map.strict_slashes = False

# database configuration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)
MIGRATE = Migrate(app, db, compare_type=True)
with app.app_context():
    db.create_all()

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')
app.register_blueprint(friend_bp, url_prefix='/api')
app.register_blueprint(favorites_bp, url_prefix='/api')
app.register_blueprint(ia_bp, url_prefix="/api")
app.register_blueprint(auth_api, url_prefix='/api')
app.register_blueprint(usersperfil_api, url_prefix='/api')

# Handle/serialize errors like a JSON object


@app.errorhandler(Exception)
def handle_all_exceptions(error):
    response = jsonify(message=str(error))
    response.status_code = 500
    # El header CORS ya se añade automáticamente con flask-cors
    return response


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints


@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file


@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response


@app.route('/static/uploads/<path:filename>')
def uploaded_file(filename):
    # Carpeta absoluta de uploads en la raíz del proyecto
    uploads_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'static', 'uploads')
    
    # Verifica que el archivo existe
    file_path = os.path.join(uploads_dir, filename)
    if not os.path.isfile(file_path):
        abort(404, description="Archivo no encontrado")

    return send_from_directory(uploads_dir, filename)


# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
