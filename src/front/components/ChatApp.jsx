import { useEffect, useState } from "react";
import {
    Chat,
    Channel,
    Window,
    ChannelHeader,
    MessageList,
    MessageInput,
} from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";
import useGlobalReducer from "../hooks/useGlobalReducer";

export default function ChatApp({ friend }) {
    const { store, client, ready } = useGlobalReducer();
    const [channel, setChannel] = useState(null);

    useEffect(() => {
        if (!ready || !friend) return;

        const createOrOpenChannel = async () => {
            const members = [String(store.user.id), String(friend.id)].sort();
            const channelId = members.join("--");

            const ch = client.channel("messaging", channelId, {
                name: friend.name,
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

    if (!ready || !channel) return <p className="text-center text-white p-4">Cargando chat…</p>;

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
