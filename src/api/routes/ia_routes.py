from flask import Blueprint, request, jsonify
import os
import requests

ia_bp = Blueprint('ia_bp', __name__)

@ia_bp.route('/ia', methods=['POST'])
def chat_with_ai():
    data = request.get_json()
    user_message = data.get("message", "")

    if not user_message:
        return jsonify({"error": "Mensaje vacío"}), 400

    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
    if not GEMINI_API_KEY:
        return jsonify({"error": "Clave API no configurada"}), 500

    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key={GEMINI_API_KEY}"

    payload = {
        "contents": [
            {
                "role": "user",
                "parts": [{"text": user_message}]
            }
        ]
    }

    try:
        response = requests.post(url, json=payload)
        response.raise_for_status()
        reply_text = response.json()["candidates"][0]["content"]["parts"][0]["text"]
        return jsonify({"reply": reply_text})

    except Exception as e:
        print("Error al contactar con Gemini:", e)
        return jsonify({"error": "Error al contactar con la IA"}), 500
