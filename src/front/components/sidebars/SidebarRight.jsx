import { useState } from "react";
import { Avatar } from "@material-tailwind/react";
import Separator from "./Separator";
import ModalChat from "../Modal_chat";

export default function SidebarRight() {
  // Usuario logueado (mock)
  const currentUser = { id: "usuario1", name: "Francisco" };

  // Amigo seleccionado y estado del modal
  const [friend, setFriend] = useState(null);
  const [open, setOpen] = useState(false);

  const users = [
    { id: "usuario2", name: "Ana López" },
    { id: "usuario3", name: "Juan Pérez" },
    { id: "usuario4", name: "Laura Martin" },
    { id: "usuario5", name: "Juan Camilo" },
    { id: "usuario6", name: "Pedro Gómez" },
    { id: "usuario7", name: "Lucía Hernández" },
    { id: "usuario8", name: "Carlos Ruiz" },
    { id: "usuario9", name: "María Díaz" },
  ];

  return (
    <>
      {/* Lista de amigos */}
      <aside className="chat_sidebar w-[300px] bg-[#1e293b] p-2 text-white border border-gray-500 max-h-[360px] overflow-y-auto rounded-md">
        <div className="space-y-4 text-sm">
          {users.map((u, index) => (
            <div key={u.id}>
              <Separator />
              <div
                className="flex items-center justify-between cursor-pointer hover:bg-blue-500/10 px-2 py-1.5 rounded-md"
                onClick={() => {
                  setFriend(u);
                  setOpen(true);
                }}
              >
                <div className="flex items-center space-x-3">
                  <Avatar
                    className="rounded-full w-[50px]"
                    src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/ct-assets/team-4.jpg"
                    alt={u.name}
                  />
                  <p className={u.name === "Juan Pérez" ? "font-semibold" : ""}>
                    {u.name}
                  </p>
                </div>
                <span
                  className={`w-2 h-2 rounded-full ${index === 0 ? "bg-green-400" : index === 1 ? "bg-yellow-400" : "bg-gray-400"
                    }`}
                />
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Modal con el chat */}
      <ModalChat
        open={open}
        onClose={() => setOpen(false)}
        currentUser={currentUser}
        friend={friend}
      />
    </>
  );
}
