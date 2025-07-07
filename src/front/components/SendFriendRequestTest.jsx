import { useState } from "react";
import { sendFriendRequest } from "../../api/routes/friendService";

function SendFriendRequestTest() {
    const [receiverId, setReceiverId] = useState("");
    const [message, setMessage] = useState("");
    const token = localStorage.getItem("jwt-token");

    const handleSendRequest = async () => {
        if (!receiverId) {
            setMessage("Ingresa el ID del usuario receptor");
            return;
        }

        try {
            const res = await sendFriendRequest(receiverId, token);
            if (res.error) {
                setMessage("Error: " + res.error);
            } else {
                setMessage("Solicitud enviada correctamente");
            }
        } catch (err) {
            setMessage("Error al enviar solicitud");
            console.error(err);
        }
    };

    return (
        <div className="p-4 bg-gray-800 text-white rounded max-w-md mx-auto">
            <h2 className="text-xl mb-4">Enviar solicitud de amistad (test)</h2>
            <input
                type="text"
                placeholder="ID del usuario receptor"
                value={receiverId}
                onChange={(e) => setReceiverId(e.target.value)}
                className="w-full p-2 mb-2 rounded bg-gray-700"
            />
            <button
                onClick={handleSendRequest}
                className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700"
            >
                Enviar solicitud
            </button>
            {message && <p className="mt-2">{message}</p>}
        </div>
    );
}
export default SendFriendRequestTest;
