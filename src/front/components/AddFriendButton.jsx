import { useState } from "react";
import { sendFriendRequest } from "../../api/routes/friendService";

function AddFriendButton({ receiverId }) {
    const token = localStorage.getItem("token");
    const [sent, setSent] = useState(false);
    const [error, setError] = useState(null);

    const handleClick = async () => {
        try {
            const res = await sendFriendRequest(receiverId, token);
            if (res.error) {
                setError(res.error);
            } else {
                setSent(true);
            }
        } catch (err) {
            setError("Error enviando solicitud");
        }
    };

    if (sent) {
        return <span className="text-green-400">Solicitud enviada</span>;
    }

    return (
        <>
            <button onClick={handleClick} className="btn-primary">
                Agregar amigo
            </button>
            {error && <p className="text-red-500">{error}</p>}
        </>
    );
}
export default AddFriendButton;
