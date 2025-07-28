import requests
from faker import Faker
from io import BytesIO
import random

fake = Faker()

BASE_URL = "https://sample-service-name-alvt.onrender.com/api"
REGISTER_URL = f"{BASE_URL}/register"
TOKEN_URL = f"{BASE_URL}/token"
PROFILE_URL = f"{BASE_URL}/profile"
PROJECT_URL = f"{BASE_URL}/projects"

hashtags_pool = [
    "javascript", "react", "python", "flask", "css", "frontend",
    "backend", "api", "tailwind", "vite", "docker", "jwt", "postgres"
]

# Descargar múltiples imágenes reales aleatorias


def get_multiple_images(count=2):
    images = []
    tries = 0
    while len(images) < count and tries < count * 3:
        tries += 1
        image_id = random.randint(0, 1084)
        url = f"https://picsum.photos/id/{image_id}/600/400"
        res = requests.get(url, stream=True)
        if res.status_code == 200 and "image" in res.headers.get("Content-Type", ""):
            img = BytesIO(res.content)
            img.name = f"{image_id}.jpg"
            images.append(img)
    return images


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

    # 4. Crear hashtags aleatorios
    random_hashtags = random.sample(hashtags_pool, k=random.randint(2, 4))
    hashtags_str = ", ".join(f"#{tag}" for tag in random_hashtags)

    # 5. Descargar múltiples imágenes
    images = get_multiple_images(count=random.randint(2, 3))
    if not images:
        print("⚠️ No se pudieron descargar imágenes")
        continue

    # 6. Crear proyecto
    project_data = {
        "title": fake.catch_phrase(),
        "description": fake.text(max_nb_chars=120),
        "hashtags": hashtags_str,
        "stackblitz_url": "https://stackblitz.com/edit/placeholder"
    }

    files = []
    for idx, img in enumerate(images):
        files.append(
            ("image_files", (f"{username}_{i}_img{idx+1}.jpg", img, "image/jpeg")))

    project_res = requests.post(
        PROJECT_URL,
        data=project_data,
        files=files,
        headers={"Authorization": f"Bearer {token}"}
    )

    if project_res.status_code in [200, 201]:
        print(f"✅ Proyecto creado para {username}")
    else:
        print(
            f"⚠️ Error al crear proyecto: {project_res.status_code} - {project_res.text}")
