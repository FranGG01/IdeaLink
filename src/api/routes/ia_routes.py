from flask import Blueprint, request, jsonify
import os
import requests
from dotenv import load_dotenv

load_dotenv()

ia_bp = Blueprint('ia_bp', __name__)

@ia_bp.route('/ia', methods=['POST'])
def chat_with_ai():
    data = request.get_json()
    user_message = data.get("message", "")

    if not user_message:
        return jsonify({"error": "Mensaje vacío"}), 400

    OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
    if not OPENROUTER_API_KEY:
        return jsonify({"error": "Falta la clave de OpenRouter"}), 500

    try:
        response = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "model": "mistralai/mistral-7b-instruct",  # o gpt-4, anthropic/claude-3-haiku, etc.
                "messages": [
                    {"role": "user", "content": user_message}
                ]
            }
        )

        data = response.json()
        if "choices" in data:
            reply_text = data["choices"][0]["message"]["content"]
            return jsonify({"reply": reply_text})
        else:
            print("Error:", data)
            return jsonify({"error": "Respuesta inválida de OpenRouter"}), 500

    except Exception as e:
        print("Error al contactar con OpenRouter:", e)
        return jsonify({"error": "Error al contactar con OpenRouter"}), 500
