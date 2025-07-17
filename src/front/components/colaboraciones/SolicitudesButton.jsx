import React, { useEffect, useState } from "react";
import { Users } from "lucide-react";

export default function SolicitudesButton() {
    const [applications, setApplications] = useState([]);
    const [showRequests, setShowRequests] = useState(false);
    const [pendingCount, setPendingCount] = useState(0);

    const fetchApplications = async () => {
        try {
            const token = localStorage.getItem("jwt-token");
            const res = await fetch("http://127.0.0.1:5000/api/my-project-applications", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) throw new Error("Error al obtener postulaciones");
            const data = await res.json();
            setApplications(data);
            setPendingCount(data.length);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchApplications();

        const token = localStorage.getItem("jwt-token");
        fetch("http://127.0.0.1:5000/api/profile", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => console.log("🧾 Usuario actual:", data));
    }, []);


    const handleAccept = async (appId) => {
        console.log(`✅ Aceptar postulación ${appId}`);
        try {
            const token = localStorage.getItem("jwt-token");
            const res = await fetch(`http://127.0.0.1:5000/api/applications/${appId}/accept`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            if (!res.ok) throw new Error("Error al aceptar postulación");

            setApplications((prev) => prev.filter((a) => a.id !== appId));
            setPendingCount((prev) => prev - 1)
        } catch (error) {
            console.error("❌ Error aceptando postulación:", error);
        }
    };



    const handleReject = async (appId) => {
        try {
            const token = localStorage.getItem("jwt-token");
            const res = await fetch(`http://127.0.0.1:5000/api/applications/${appId}/reject`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            if (!res.ok) throw new Error("Error al rechazar postulación");

            setApplications((prev) => prev.filter((a) => a.id !== appId));
            setPendingCount((prev) => prev - 1);
        } catch (error) {
            console.error("❌ Error rechazando postulación:", error);
        };
    }
    return (
        <div className="relative flex mb-2 me-0 w-[100px] h-[32px]">
            <button
                onClick={() => setShowRequests(!showRequests)}
                className="flex ms-18 items-center rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 py-3 px-6 text-sm font-medium text-white shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer"
            >
                Solicitudes
            </button>
            {pendingCount > 0 && (
                <span className="absolute -top-1 -right-7 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                    {pendingCount}
                </span>
            )}

            {/* Modal de solicitudes */}
            {showRequests && (
                <div className="absolute top-12 right-0 bg-gray-800 border border-gray-700 p-4 rounded-md shadow-lg w-[300px] z-50">
                    <h3 className="text-purple-400 font-bold mb-2">Postulaciones</h3>
                    {applications.length === 0 ? (
                        <p className="text-gray-400 text-sm">No hay nuevas solicitudes.</p>
                    ) : (
                        <ul className="space-y-2 max-h-60 overflow-y-auto">
                            {applications.map((app) => (
                                <li
                                    key={app.id}
                                    className="border border-gray-600 rounded-md p-2 text-white"
                                >
                                    <p className="font-semibold">{app.user.username}</p>
                                    <p className="text-sm italic text-gray-400">
                                        {app.message}
                                    </p>
                                    <div className="mt-2 flex gap-2">
                                        <button
                                            onClick={() => handleAccept(app.id)}
                                            className="bg-green-600 hover:bg-green-700 px-2 py-1 rounded text-xs"
                                        >
                                            Aceptar
                                        </button>
                                        <button
                                            onClick={() => handleReject(app.id)}
                                            className="bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-xs"
                                        >
                                            Rechazar
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}
