import { useEffect, useState } from "react";
import {
    respondFriendRequest,
    getPendingRequests,
    getFriends,
} from "../../api/routes/friendService";

export default function FriendRequests({
    requests,
    setRequests,
    onFriendAccepted,
    onPendingCountChange, // agregado para manejar contador externo
}) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("jwt-token");

    const updateCount = (newRequests) => {
        setRequests(newRequests);
        if (typeof onPendingCountChange === "function") {
            onPendingCountChange(newRequests.length);
        }
    };

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const data = await getPendingRequests(token);
                updateCount(data);
            } catch (err) {
                setError("Error cargando solicitudes");
            } finally {
                setLoading(false);
            }
        };
        fetchRequests();
    }, [token]);

    const handleResponse = async (id, action) => {
        try {
            const res = await respondFriendRequest(id, action, token);

            if (res.error) {
                alert("Error al responder solicitud: " + res.error);
                return;
            }

            if (action === "accept" && typeof onFriendAccepted === "function") {
                const updatedFriends = await getFriends(token);
                const newFriend = updatedFriends[updatedFriends.length - 1];

                if (newFriend) {
                    onFriendAccepted(newFriend);
                }
            }

            const updatedRequests = requests.filter((req) => req.id !== id);
            updateCount(updatedRequests);
        } catch (err) {
            alert("Error al responder solicitud");
        }
    };

    if (loading) return <p>Cargando solicitudes...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (requests.length === 0) return <p>No tienes solicitudes pendientes.</p>;

    return (
        <div className="bg-gray-800 text-white p-4 rounded-lg max-w-md mx-auto flex-wrap">
            <h3 className="text-xl font-bold mb-4">Solicitudes de amistad pendientes</h3>
            {requests.map((req) => (
                <div
                    key={req.id}
                    className="flex-wrap justify-between items-center border-b border-gray-600 py-2"
                >
                    <div className="flex items-center space-x-2">
                        <img
                            src={
                                req.sender.avatar_url ||
                                `https://ui-avatars.com/api/?name=${req.sender.username}`
                            }
                            alt={req.sender.username}
                            className="w-8 h-8 rounded-full"
                        />
                        <span>{req.sender.username || req.sender.email || "Usuario"}</span>
                    </div>
                    <div className="flex gap-2 mt-3">
                        <button
                            onClick={() => handleResponse(req.id, "accept")}
                            className="bg-green-600 px-3 py-1 rounded hover:bg-green-700"
                        >
                            Aceptar
                        </button>
                        <button
                            onClick={() => handleResponse(req.id, "reject")}
                            className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
                        >
                            Rechazar
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

