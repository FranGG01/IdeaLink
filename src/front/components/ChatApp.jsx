import { useEffect, useState } from "react";
import {
    Chat,
    Channel,
    Window,
    ChannelHeader,
    MessageList,
    MessageInput,
} from "stream-chat-react";
import { StreamChat } from "stream-chat";
import "stream-chat-react/dist/css/v2/index.css";

const apiKey = "2pks7t76xeqd";
const client = StreamChat.getInstance(apiKey); // singleton global

export default function ChatApp({ currentUser, friend }) {
    const [ready, setReady] = useState(false);
    const [channel, setChannel] = useState(null);

    /* Conectamos al usuario actual solo una vez */
    useEffect(() => {
        let cancelled = false;

        const connect = async () => {
            if (!client.userID) {
                await client.connectUser(
                    {
                        id: currentUser.id,
                        name: currentUser.name,
                        image: `https://getstream.io/random_png/?id=${currentUser.id}`,
                    },
                    client.devToken(currentUser.id)
                );
            }
            if (!cancelled) setReady(true);
        };

        connect();
        return () => {
            cancelled = true; // NO hacemos disconnectUser → seguimos conectados
        };
    }, [currentUser]);

    /* Cada vez que cambie el amigo creamos o recuperamos el canal DM */
    useEffect(() => {
        let cancelled = false;

        const connect = async () => {
            if (!client.userID) {
                await client.connectUser(
                    {
                        id: String(currentUser.id),
                        name: currentUser.name,
                        image: `https://getstream.io/random_png/?id=${currentUser.id}`,
                    },
                    client.devToken(String(currentUser.id))
                );
            }
            if (!cancelled) setReady(true);
        };

        connect();
        return () => {
            cancelled = true;
        };
    }, [currentUser]);

    useEffect(() => {
        if (!ready || !friend) return;

        const initChannel = async () => {
            await client.upsertUser({
                id: String(friend.id),
                name: friend.name,
                image: `https://getstream.io/random_png/?id=${friend.id}`,
            });

            const members = [String(currentUser.id), String(friend.id)].sort();
            const channelId = members.join("--");

            const ch = client.channel("messaging", channelId, {
                name: friend.name,
                members,
            });
            await ch.watch();
            setChannel(ch);
        };

        initChannel();
    }, [ready, friend, currentUser]);


    if (!ready || !channel)
        return <p className="text-center text-white p-4">Cargando chat…</p>;

    return (
        <div className="rounded-2xl overflow-hidden border border-gray-700 h-[460px]">
            <Chat client={client} theme="str-chat__theme-dark">
                <Channel channel={channel}>
                    <Window>
                        <ChannelHeader />
                        <MessageList />
                        <MessageInput />
                    </Window>
                </Channel>
            </Chat>
        </div>
    );
}


