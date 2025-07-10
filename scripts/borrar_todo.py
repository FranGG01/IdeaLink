import sys, os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'src')))

from dotenv import load_dotenv
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', 'src', '.env.example'))

from app import app
from api.models import db, User, Project

with app.app_context():
    print("🔎 Buscando proyectos falsos...")
    fake_projects = Project.query.filter(Project.stackblitz_url == "https://stackblitz.com/edit/placeholder").all()
    print(f"🧨 {len(fake_projects)} proyectos serán eliminados.")
    for p in fake_projects:
        db.session.delete(p)

    print("🔎 Buscando usuarios falsos...")
    fake_users = User.query.filter(User.email.like('%@%')).filter(User.bio.like('%.%')).filter(User.avatar_url.like('%dicebear%')).all()
    print(f"🧨 {len(fake_users)} usuarios serán eliminados.")
    for u in fake_users:
        db.session.delete(u)

    db.session.commit()
    print("✅ Eliminación completada.")
