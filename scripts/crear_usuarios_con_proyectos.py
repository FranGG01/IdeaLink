import requests
from faker import Faker
from io import BytesIO
import random
fake = Faker()

BASE_URL = "http://127.0.0.1:5000/api"
REGISTER_URL = f"{BASE_URL}/register"
TOKEN_URL = f"{BASE_URL}/token"
PROFILE_URL = f"{BASE_URL}/profile"
PROJECT_URL = f"{BASE_URL}/projects"

# Descargar imagen real aleatoria de Picsum

def get_random_image():
    image_id = random.randint(0, 1084)
    # Paso 1: obtener la URL final tras redirección
    redirect_url = f"https://picsum.photos/id/{image_id}/600/400"
    response = requests.get(redirect_url, stream=True, allow_redirects=True)

    if response.status_code == 200 and "image" in response.headers.get("Content-Type", ""):
        img = BytesIO(response.content)
        img.name = f"{image_id}.jpg"
        return img
    else:
        print(f"⚠️ Error al obtener imagen con id {image_id} - {response.status_code}")
        return None



num_users = 16

for i in range(num_users):
    username = fake.user_name()
    email = fake.email()
    password = "123456"
    avatar_url = f"https://api.dicebear.com/7.x/pixel-art/svg?seed={username}"

    print(f"\n🔸 Creando usuario {i+1}: {username} | {email}")

    # 1. Registrar usuario
    res = requests.post(REGISTER_URL, json={
        "username": username,
        "email": email,
        "password": password
    })

    if res.status_code != 201:
        print(f"❌ Registro fallido: {res.status_code} - {res.text}")
        continue

    # 2. Obtener token
    token_res = requests.post(TOKEN_URL, json={
        "email": email,
        "password": password
    })

    if token_res.status_code != 200:
        print(f"❌ Login fallido: {token_res.text}")
        continue

    token = token_res.json()["token"]

    # 3. Actualizar perfil
    requests.put(PROFILE_URL,
        json={
            "avatar_url": avatar_url,
            "bio": fake.sentence(),
            "location": fake.city(),
            "role": fake.job()
        },
        headers={"Authorization": f"Bearer {token}"}
    )

    # 4. Crear proyecto con imagen real
    image_file = get_random_image()
    if not image_file:
        print("⚠️ No se pudo descargar la imagen")
        continue

    project_data = {
        "title": fake.catch_phrase(),
        "description": fake.text(max_nb_chars=120),
        "hashtags": "#demo #faker",
        "stackblitz_url": "https://stackblitz.com/edit/placeholder"
    }

    unique_filename = f"{username}_{i}.jpg"
    files = {
        "image_file": (unique_filename, image_file, "image/jpeg")
    }


    project_res = requests.post(
        PROJECT_URL,
        data=project_data,
        files=files,
        headers={"Authorization": f"Bearer {token}"}
    )

    if project_res.status_code in [200, 201]:
        print(f"✅ Proyecto creado para {username}")
    else:
        print(f"⚠️ Error al crear proyecto: {project_res.status_code} - {project_res.text}")
