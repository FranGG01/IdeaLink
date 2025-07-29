from flask import Blueprint, request, jsonify
import os
import openai
from dotenv import load_dotenv

load_dotenv()

ia_bp = Blueprint('ia_bp', __name__)

@ia_bp.route('/ia', methods=['POST'])
def chat_with_ai():
    data = request.get_json()
    user_message = data.get("message", "")

    if not user_message:
        return jsonify({"error": "Mensaje vacío"}), 400

    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
    if not OPENAI_API_KEY:
        return jsonify({"error": "Clave API de OpenAI no configurada"}), 500

    openai.api_key = OPENAI_API_KEY

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",  # o "gpt-4" si tienes acceso
            messages=[
                {"role": "user", "content": user_message}
            ]
        )

        reply_text = response["choices"][0]["message"]["content"]
        return jsonify({"reply": reply_text})

    except Exception as e:
        print("Error al contactar con OpenAI:", e)
        return jsonify({"error": "Error al contactar con OpenAI"}), 500
