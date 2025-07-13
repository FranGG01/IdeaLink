import { useState, useEffect, useRef } from "react";
import { Avatar } from "@material-tailwind/react";
import Separator from "./Separator";
import ModalChat from "../Modal_chat";
import {
  getFriends,
  deleteFriend,
} from "../../../api/routes/friendService";
import FriendRequests from "../FriendRequests";
import SendFriendRequestTest from "../SendFriendRequestTest";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import "./Sidebar.css";

// IMPORTANTE: añade la función real que obtenga solicitudes pendientes
import { getPendingRequests } from "../../../api/routes/friendService";

export default function SidebarRight() {
  const { store, client } = useGlobalReducer();
  const [friend, setFriend] = useState(null);
  const [open, setOpen] = useState(false);
  const [friends, setFriends] = useState([]);
  const [showRequests, setShowRequests] = useState(false);
  const [pendingRequests, setPendingRequests] = useState([]);  // <-- agregado
  const [pendingCount, setPendingCount] = useState(0);
  const [messageCounts, setMessageCounts] = useState({});
  const requestsRef = useRef();

  const token = localStorage.getItem("jwt-token");
  const currentUser = store.user;

  useEffect(() => {
    if (token) {
      getFriends(token)
        .then((res) => {
          if (Array.isArray(res)) setFriends(res);
          else setFriends([]);
        })
        .catch((err) => {
          console.error("Error fetching friends:", err);
          setFriends([]);
        });
    }
  }, [token]);

  useEffect(() => {
    if (!client || !store.user) return;

    const subscriptions = [];

    friends.forEach((f) => {
      const members = [String(store.user.id), String(f.id)].sort();
      const channelId = members.join("--");

      const channel = client.channel("messaging", channelId, {
        members,
      });

      channel.watch().then(() => {
        const listener = (event) => {
          const senderId = event.user?.id || event.message?.user?.id || null;
          if (senderId && String(senderId) !== String(store.user.id)) {
            setMessageCounts((prev) => ({
              ...prev,
              [f.id]: (prev[f.id] || 0) + 1,
            }));
          }
        };

        channel.on("message.new", listener);
        subscriptions.push({ channel, listener });
      });
    });

    return () => {
      subscriptions.forEach(({ channel, listener }) => {
        channel.off("message.new", listener);
      });
    };
  }, [friends, client, store.user]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (requestsRef.current && !requestsRef.current.contains(e.target)) {
        setShowRequests(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Lógica para cargar siempre las solicitudes pendientes y actualizar el contador
  useEffect(() => {
    const fetchPending = async () => {
      if (!token) return;
      try {
        const data = await getPendingRequests(token);
        setPendingRequests(data);
        setPendingCount(data.length);
      } catch (error) {
        console.error("Error cargando solicitudes pendientes", error);
        setPendingRequests([]);
        setPendingCount(0);
      }
    };

    fetchPending();

    // Si quieres refrescar periódicamente (opcional)
    // const interval = setInterval(fetchPending, 30000);
    // return () => clearInterval(interval);
  }, [token]);

  const handleDeleteFriend = async (friendId) => {
    const confirm = window.confirm("¿Eliminar a este amigo y borrar el chat?");
    if (!confirm) return;

    try {
      const res = await deleteFriend(friendId, token);
      if (res.message) {
        // Borrar el canal de chat con ese amigo en Stream
        if (client && store.user) {
          const members = [String(store.user.id), String(friendId)].sort();
          const channelId = members.join("--");
          const channel = client.channel("messaging", channelId, { members });

          await channel.truncate(); // Borra todos los mensajes del canal
        }

        // Eliminar del listado local
        setFriends((prev) => prev.filter((f) => f.id !== friendId));
        if (friend?.id === friendId) {
          setOpen(false);
          setFriend(null);
        }
      } else {
        alert("Error al eliminar al amigo.");
      }
    } catch (error) {
      alert("Error de conexión.");
      console.error(error);
    }
  };


  const resetMessageCount = (friendId) => {
    setMessageCounts((prev) => ({ ...prev, [friendId]: 0 }));
  };

  return (
    <>
      {/* Botón con contador de solicitudes */}
      <div className="relative mb-4 me-0 w-[100px] h-[32px]">
        <button
          onClick={() => setShowRequests(!showRequests)}
          className="bg-blue-600 px-3 py-1.5 rounded-md hover:bg-blue-700 transition text-white text-sm"
        >
          Solicitudes
        </button>
        {pendingCount > 0 && (
          <span className="absolute -top-1 -right-0 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">
            {pendingCount}
          </span>
        )}
      </div>

      {showRequests && (
        <div ref={requestsRef}>
          <FriendRequests
            requests={pendingRequests}
            setRequests={setPendingRequests}
            onFriendAccepted={(newFriend) => {
              setFriends((prev) =>
                prev.some((f) => f.id === newFriend.id)
                  ? prev
                  : [...prev, newFriend]
              );
            }}
            onPendingCountChange={setPendingCount} // Opcional para actualizar desde el hijo
          />
        </div>
      )}

      <aside className="chat_sidebar w-full sm:w-[300px] bg-[#1e293b] p-2 text-white border border-gray-500 max-h-[360px] overflow-y-auto rounded-md hidden xl:block relative">
        <div className="space-y-4 text-sm mt-4 pe-4">
          <h1 className="text-md font-bold mb-4">Amigos</h1>
          {friends.length === 0 && <p>No tienes amigos aún</p>}
          {friends.map((u, idx) => (
            <div key={u.id}>
              <Separator />
              <div
                className="flex items-center justify-between cursor-pointer hover:bg-blue-500/10 px-2 py-1.5 rounded-md group relative"
                onClick={() => {
                  if (!currentUser?.token) {
                    alert("Debes iniciar sesión para chatear");
                    return;
                  }
                  setFriend(u);
                  setOpen(true);
                  resetMessageCount(u.id);
                }}
              >
                <div className="flex items-center space-x-3">
                  <Avatar
                    className="rounded-full w-[50px]"
                    src={
                      u.avatar_url ||
                      `https://getstream.io/random_png/?id=${u.id}`
                    }
                    alt={u.username || u.name}
                  />
                  <p>{u.username || u.name}</p>
                </div>

                <div className="flex items-center gap-4 relative">
                  <span
                    className={`w-2 h-2 rounded-full ${idx === 0
                      ? "bg-green-400"
                      : idx === 1
                        ? "bg-yellow-400"
                        : "bg-gray-400"
                      }`}
                  />

                  {/* Burbuja de mensajes */}
                  {messageCounts[u.id] > 0 && (
                    <span className="absolute -top-0 -right-4 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full ">
                      {messageCounts[u.id]}
                    </span>
                  )}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteFriend(u.id);
                    }}
                    className="text-red-500 text-sm opacity-0 group-hover:opacity-100 transition cursor-pointer me-3"
                    title="Eliminar amigo"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </aside>

      <SendFriendRequestTest />

      {friend && (
        <ModalChat
          open={open}
          onClose={() => {
            setOpen(false);
            setFriend(null);
          }}
          currentUser={currentUser}
          friend={friend}
        />
      )}
    </>
  );
}
