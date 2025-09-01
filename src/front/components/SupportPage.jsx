import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com"; // Importa EmailJS

export default function SupportPage() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Envía el correo usando EmailJS
        emailjs.send(
            "service_bivjvjq", // Reemplaza con tu Service ID
            "template_usue40p", // Reemplaza con tu Template ID
            {
                from_name: formData.name,
                from_email: formData.email,
                message: formData.message,
                to_email: formData.email,
            },
            "O2fBKUWflSKwxFw4n" // Reemplaza con tu Public Key
        )
            .then(() => {
                alert("¡Gracias por contactarnos! Tu mensaje ha sido enviado.");
                setFormData({ name: "", email: "", message: "" });
                navigate("/feed");
            })
            .catch(() => {
                alert("Hubo un error al enviar el mensaje. Intenta de nuevo.");
            });
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4">
            <button
                onClick={() => navigate("/feed")}
                className="mb-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition self-center cursor-pointer"
            >
                ← Volver
            </button>
            <div className="w-full max-w-xl bg-gray-800 p-8 rounded-xl shadow-lg">

                <h1 className="text-3xl font-bold mb-4 text-center">Centro de Soporte</h1>
                <p className="text-gray-400 mb-8 text-center">
                    ¿Tienes alguna pregunta o problema? Escríbenos y te responderemos lo antes posible.
                </p>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Tu nombre"
                        required
                        className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Tu email"
                        required
                        className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Escribe tu mensaje aquí..."
                        required
                        rows="5"
                        className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition cursor-pointer"
                    >
                        Enviar mensaje
                    </button>
                </form>
            </div>
        </div>
    );
}
