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
            className="pt-0 bg-gray-800 text-white rounded max-w-md mb-2 ms-18 "
        >
            {!showInput ? (
                <button
                    onClick={() => setShowInput(true)}
                    className="flex items-center rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 py-3 px-6 text-sm font-medium text-white shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer"
                >
                    Agregar amigo
                </button>
            ) : (
                <>
                    <h2 className="text-xl mb-4">Enviar solicitud de amistad</h2>
                    <input
                        type="text"
                        placeholder="Nombre de usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-2 mb-2 rounded bg-gray-700"
                    />
                    <button
                        onClick={handleSendRequest}
                        className="flex items-center rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 py-3 px-6 text-sm font-medium text-white shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer"
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


