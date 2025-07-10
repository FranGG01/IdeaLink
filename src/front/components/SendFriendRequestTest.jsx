import { useState, useRef, useEffect } from "react";
import { sendFriendRequestByUsername } from "../../api/routes/friendService";

function AddFriendByUsername() {
    const token = localStorage.getItem("jwt-token");
    const [showInput, setShowInput] = useState(false);
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState(null);

    const wrapperRef = useRef(null);

    // Oculta input al hacer clic fuera del componente
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowInput(false);
                setMessage(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSendRequest = async () => {
        setMessage(null);
        if (!username.trim()) {
            setMessage("Debes ingresar un username");
            return;
        }

        try {
            const res = await sendFriendRequestByUsername(username.trim(), token);
            if (res.error) {
                setMessage(`❌ ${res.error}`);
            } else {
                setMessage("✅ Solicitud enviada con éxito");
                setUsername("");
            }
        } catch {
            setMessage("❌ Error enviando solicitud");
        }
    };

    return (
        <div
            ref={wrapperRef}
            className="p-4 bg-gray-800 text-white rounded max-w-md mx-auto"
        >
            {!showInput ? (
                <button
                    onClick={() => setShowInput(true)}
                    className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700"
                >
                    Agregar amigo por username
                </button>
            ) : (
                <>
                    <h2 className="text-xl mb-4">Enviar solicitud por username</h2>
                    <input
                        type="text"
                        placeholder="Nombre de usuario del receptor"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-2 mb-2 rounded bg-gray-700"
                    />
                    <button
                        onClick={handleSendRequest}
                        className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700"
                    >
                        Enviar solicitud
                    </button>
                    {message && <p className="mt-2">{message}</p>}
                </>
            )}
        </div>
    );
}

export default AddFriendByUsername;


