import requests
from faker import Faker

fake = Faker()
REGISTER_URL = "http://127.0.0.1:5000/api/register"
TOKEN_URL = "http://127.0.0.1:5000/api/token"
PROFILE_URL = "http://127.0.0.1:5000/api/profile"
STREAM_TOKEN_URL = "http://127.0.0.1:5000/api/stream-token"


num_users = 20  # Cambia si quieres más o menos usuarios

for i in range(num_users):
    username = fake.user_name()
    email = fake.email()
    password = "123456"
    avatar_url = f"https://api.dicebear.com/7.x/pixel-art/svg?seed={username}"

    # Paso 1: Registrar usuario
    res = requests.post(REGISTER_URL, json={
        "username": username,
        "email": email,
        "password": password
    })

    if res.status_code == 201:
        print(f"✅ {i+1}/{num_users} Usuario creado: {username}")

        # Paso 2: Obtener token JWT
        token_res = requests.post(TOKEN_URL, json={
            "email": email,
            "password": password
        })

        if token_res.status_code == 200:
            token = token_res.json()["token"]

            # Paso 3: Actualizar perfil
            profile_res = requests.put(
                PROFILE_URL,
                json={
                    "avatar_url": avatar_url,
                    "bio": fake.sentence(nb_words=6),
                    "location": fake.city(),
                    "role": fake.job()
                },
                headers={"Authorization": f"Bearer {token}"}
            )

            if profile_res.status_code == 200:
                print(f"🖼️ Perfil actualizado para {username}")
            else:
                print(f"⚠️ Error al actualizar perfil: {profile_res.text}")
        else:
            print(f"⚠️ Error al loguear: {token_res.text}")
    else:
        print(f"❌ Error al crear {username}: {res.text}")
