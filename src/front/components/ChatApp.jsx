import { useEffect, useState } from "react";
import {
    Chat,
    Channel,
    Window,
    MessageList,
    MessageInput,
} from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";
import useGlobalReducer from "../hooks/useGlobalReducer";
import CustomChannelHeader from "./CustomChannelHeader";

export default function ChatApp({ friend }) {
    const { store, client, ready } = useGlobalReducer();
    const [channel, setChannel] = useState(null);

    useEffect(() => {
        if (!ready || !friend) return;

        const createOrOpenChannel = async () => {
            const members = [String(store.user.id), String(friend.id)].sort();
            const channelId = members.join("--");

            const ch = client.channel("messaging", channelId, {
                name: friend.username || friend.name,
                members,
            });

            await ch.watch();
            setChannel(ch);
        };

        createOrOpenChannel();

        return () => {
            setChannel(null);
        };
    }, [ready, friend, store.user, client]);

    // Pedir permiso para notificaciones cuando se monta el componente
    useEffect(() => {
        if ("Notification" in window && Notification.permission !== "granted") {
            Notification.requestPermission();
        }
    }, []);

    // Escuchar mensajes nuevos y mostrar notificación si no es el usuario mismo
    useEffect(() => {
        if (!channel) return;

        const handleNewMessage = (event) => {
            console.log("Evento message.new detectado:", event);
            const message = event.message;
            const senderId = message.user.id;

            if (String(senderId) !== String(store.user.id)) {
                console.log("Disparando notificación para:", message.user.name, message.text);
                showNotification(message.user.name || message.user.id, message.text);
            } else {
                console.log("Mensaje propio, no notifico");
            }
        };

        channel.on("message.new", handleNewMessage);

        return () => {
            channel.off("message.new", handleNewMessage);
        };
    }, [channel, store.user]);


    const showNotification = (title, body) => {
        if (Notification.permission === "granted") {
            new Notification(title, {
                body,
                icon: "/favicon.ico", // Opcional: cambia el icono a tu gusto
            });
        }
    };

    if (!ready || !channel) return <p className="text-center text-white p-4">Cargando chat…</p>;

    return (
        <div className="rounded-2xl overflow-hidden border border-gray-700 h-[460px]">
            <Chat client={client} theme="str-chat__theme-dark">
                <Channel channel={channel}>
                    <Window>
                        <CustomChannelHeader friend={friend} />
                        <MessageList />
                        <MessageInput />
                    </Window>
                </Channel>
            </Chat>
        </div>
    );
}

