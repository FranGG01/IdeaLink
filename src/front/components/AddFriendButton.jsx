import { useState, useEffect } from "react";
import { sendFriendRequest, getFriendStatus } from "../../api/routes/friendService";

function AddFriendButton({ receiverId }) {
    const token = localStorage.getItem("jwt-token");
    const [status, setStatus] = useState("none");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStatus() {
            try {
                const res = await getFriendStatus(receiverId, token);
                setStatus(res.status || "none");
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
            } else {
                setStatus("pending");
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
        return null;
    }
    return (
        <>
            <button
                onClick={handleClick}
                className="rounded-md bg-purple-700 py-2 px-4 text-white text-sm shadow-sm hover:bg-purple-800 cursor-pointer"
            >
                Agregar amigo
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </>
    );
}

export default AddFriendButton;

