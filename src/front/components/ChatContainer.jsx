import { useState } from "react";
import SidebarRight from "./SidebarRight";   // tu lista de amigos
import ChatApp from "./ChatApp";            // el chat

export default function ChatContainer() {
    // usuario “loggeado” en este ejemplo
    const currentUser = { id: "usuario1", name: "Francisco" };

    // aquí guardaremos el amigo clicado
    const [selectedFriend, setSelectedFriend] = useState(null);

    return (
        <div className="flex h-full">
            {/* Lista de amigos: al hacer click, actualiza selectedFriend */}
            <SidebarRight onSelectFriend={setSelectedFriend} />

            {/* Chat solo si hay amigo seleccionado */}
            {selectedFriend ? (
                <ChatApp currentUser={currentUser} friend={selectedFriend} />
            ) : (
                <p className="text-white m-auto">Elige un amigo para chatear</p>
            )}
        </div>
    );
}