import { useState, useEffect } from "react";
import { sendFriendRequest, getFriendStatus } from "../../api/routes/friendService";

function PublicAddFriendButton({ receiverId }) {
    const token = localStorage.getItem("jwt-token");
    const [status, setStatus] = useState("none");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStatus() {
            try {
                const res = await getFriendStatus(receiverId, token);
                console.log("[DEBUG] Estado recibido del backend:", res.status);
                // Normalizar el valor recibido del backend
                if (res.status === "accepted") setStatus("accepted");
                else if (res.status === "pending") setStatus("pending");
                else if (res.status === "rejected") setStatus("rejected");
                else setStatus("none");
            } catch (err) {
                setStatus("none");
            } finally {
                setLoading(false);
            }
        }
        fetchStatus();
    }, [receiverId, token]);

    const handleClick = async () => {
        try {
            const res = await sendFriendRequest(receiverId, token);
            if (res.error) {
                setError(res.error);
                // Si ya existe amistad o solicitud, actualiza el estado para ocultar el botón
                if (res.error.includes("solicitud") || res.error.includes("amistad")) {
                    setStatus("accepted");
                }
            } else {
                setStatus("pending");
                setError(null);
            }
        } catch (err) {
            setError("Error enviando solicitud");
        }
    };

    if (loading) return null;
    if (status === "pending") {
        return <span className="text-green-400 font-semibold">Solicitud enviada</span>;
    }
    if (status === "accepted") {
        return <span className="text-blue-400 font-semibold">Ya son amigos</span>;
    }
    if (status === "rejected") {
        return <span className="text-red-400 font-semibold">Solicitud rechazada</span>;
    }
    return (
        <>
            <button
                onClick={handleClick}
                className={`rounded-md bg-purple-700 py-2 px-4 text-white text-sm shadow-sm hover:bg-purple-800 cursor-pointer${status !== "none" ? " hidden" : ""}`}
                style={status !== "none" ? { display: "none" } : {}}
            >
                Agregar amigo
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </>
    );
}

export default PublicAddFriendButton;
