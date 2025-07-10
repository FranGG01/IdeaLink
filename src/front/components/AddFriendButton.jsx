import { useState } from "react";
import { sendFriendRequestByUsername } from "../../api/routes/friendService";

function AddFriendButton({ username }) {
    const token = localStorage.getItem("jwt-token");
    const [sent, setSent] = useState(false);
    const [error, setError] = useState(null);

    const handleClick = async () => {
        try {
            const res = await sendFriendRequestByUsername(username, token);
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

