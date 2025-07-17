import sys
import os

# Añadir la raíz del proyecto al path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from src.app import app
from api.models import db, ProjectCollaborator

with app.app_context():
    try:
        ProjectCollaborator.__table__.drop(db.engine)
        print("✅ Tabla project_collaborators eliminada")
    except Exception as e:
        print("⚠️ No se pudo eliminar project_collaborators (probablemente no existe):", e)

    db.create_all()
    print("✅ Todas las tablas creadas de nuevo")
