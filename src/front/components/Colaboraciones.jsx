import React, { useEffect, useState } from "react";
import { Users, MailPlus, Handshake } from "lucide-react";

export default function Collaborations() {
    const [collabs, setCollabs] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        const fetchCollaborations = async () => {
            try {
                const token = localStorage.getItem("jwt-token");
                const res = await fetch("http://127.0.0.1:5000/api/my-collaborations", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (!res.ok) throw new Error("Error al cargar colaboraciones");

                const data = await res.json();
                setCollabs(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCollaborations();
    }, []);

    return (
        <div className="p-6 text-white max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <Users className="w-7 h-7" /> Colaboraciones
            </h1>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Mis colaboraciones</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    {collabs.map((project) => (
                        <div
                            key={project.id}
                            onClick={() => setSelectedProject(project)}
                            className="bg-slate-800 p-4 rounded-xl shadow hover:bg-slate-700 cursor-pointer transition"
                        >
                            <h3 className="text-lg font-medium">{project.title}</h3>
                            <p className="text-sm text-gray-300">Descripción: {project.description}</p>
                            <p className="text-sm text-gray-400">StackBlitz asignado: {project.stackblitz_url ? "Sí" : "No"}</p>
                        </div>
                    ))}
                </div>
            </section>

            {selectedProject?.stackblitz_url && (
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Editor de código</h2>
                    <iframe
                        src={`${selectedProject.stackblitz_url}?embed=1`}
                        className="w-full h-[80vh] border rounded-md"
                        allow="accelerometer; camera; microphone; geolocation; midi; clipboard-read; clipboard-write"
                    ></iframe>
                </section>
            )}
        </div>
    );
}
