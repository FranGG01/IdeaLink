from app import app
from api.models import db, User
from werkzeug.security import generate_password_hash

def migrate_passwords_to_hash():
    with app.app_context():
        users = User.query.all()
        for user in users:
            if not user.password.startswith('pbkdf2:'):
                print(f"Actualizando password de {user.email}")
                hashed_password = generate_password_hash(user.password)
                user.password = hashed_password
                db.session.add(user)
        db.session.commit()
        print("Migración completada.")

if __name__ == "__app__":
    migrate_passwords_to_hash()

