import requests
import os

def get_friend_status(user_id, token):
    url = f"http://127.0.0.1:5000/api/friend-status/{user_id}"
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.get(url, headers=headers)
    print(f"Status code: {response.status_code}")
    print(f"Response: {response.text}")
    return response.json()

if __name__ == "__main__":
    # Reemplaza estos valores por los reales
    token = os.getenv("FRIEND_TEST_TOKEN", "<tu_token_jwt>")
    user_id = 2  # id del usuario 'manolo'
    if token == "<tu_token_jwt>":
        token = input("Introduce tu JWT válido: ")
    get_friend_status(user_id, token)
