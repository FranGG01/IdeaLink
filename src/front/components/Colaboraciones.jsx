import React from "react";
import { Users, MailPlus, Handshake } from "lucide-react";

export default function Collaborations() {
    return (
        <div className="p-6 text-white max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <Users className="w-7 h-7" /> Colaboraciones
            </h1>

            <section>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Handshake className="w-5 h-5" /> Explorar colaboraciones
                </h2>
                <input
                    type="text"
                    placeholder="Buscar proyectos..."
                    className="w-full p-2 rounded-md bg-slate-700 text-white placeholder:text-gray-400"
                />

            </section>
            <br />
            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Mis colaboraciones</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-slate-800 p-4 rounded-xl shadow">
                        <h3 className="text-lg font-medium">Proyecto: IdeaChat</h3>
                        <p className="text-sm text-gray-300">Colaboradores: Enrique, Juanca, Fran</p>
                        <p className="text-sm text-gray-400">Estado: Activo</p>
                    </div>

                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <MailPlus className="w-5 h-5" /> Solicitudes
                </h2>
                <p className="text-gray-400 mb-2">No tienes solicitudes nuevas.</p>
            </section>
            <iframe
                src="https://stackblitz.com/edit/react?embed=1&file=src/App.js"
                className="w-full h-[80vh] border rounded-md"
                allow="accelerometer; camera; microphone; geolocation; midi; clipboard-read; clipboard-write"
            ></iframe>

        </div>
    );
}
