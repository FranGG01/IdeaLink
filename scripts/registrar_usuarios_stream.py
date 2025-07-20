import requests

# CONFIG
LOGIN_URL = "http://127.0.0.1:5000/api/token"
PROFILE_URL = "http://127.0.0.1:5000/api/profile"
STREAM_TOKEN_URL = "http://127.0.0.1:5000/api/stream-token"

# Lista de correos de usuarios ya creados
emails = [
    # 👇 Reemplaza estos por los emails que se crearon
    "david07@example.org"
]

password = "123456"

for email in emails:
    # Paso 1: Login
    res = requests.post(LOGIN_URL, json={
        "email": email,
        "password": password
    })

    if res.status_code != 200:
        print(f"❌ Error al loguear {email}: {res.status_code} - {res.text}")
        continue

    token = res.json()["token"]

    # Paso 2: Obtener perfil
    profile_res = requests.get(PROFILE_URL, headers={"Authorization": f"Bearer {token}"})
    if profile_res.status_code != 200:
        print(f"⚠️ Error al obtener perfil: {email}")
        continue

    user = profile_res.json()
    username = user.get("username")
    avatar_url = user.get("avatar_url", "")

    # Paso 3: Registrar en Stream
    stream_res = requests.post(
        STREAM_TOKEN_URL,
        json={
            "me": {
                "name": username,
                "image": avatar_url
            },
            "friends": []
        },
        headers={"Authorization": f"Bearer {token}"}
    )

    if stream_res.status_code == 200:
        print(f"🟢 Registrado en Stream: {username}")
    else:
        print(f"⚠️ Error al registrar en Stream: {username} - {stream_res.status_code} - {stream_res.text}")
