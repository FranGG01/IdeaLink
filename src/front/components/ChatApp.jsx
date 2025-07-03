import React, { useEffect, useState } from "react";
import {
    Chat,
    Channel,
    ChannelHeader,
    MessageList,
    MessageInput,
    Window,
} from "stream-chat-react";
import { StreamChat } from "stream-chat";
import "stream-chat-react/dist/css/v2/index.css";
import '../index.css';

const apiKey = "2pks7t76xeqd";

export default function ChatApp() {
    const [chatClient, setChatClient] = useState(null);
    const [channel, setChannel] = useState(null);

    useEffect(() => {
        const initChat = async () => {
            const client = StreamChat.getInstance(apiKey);
            const userId = "usuario1";
            const token = client.devToken(userId);

            await client.connectUser(
                {
                    id: userId,
                    name: "Francisco",
                    image: `https://getstream.io/random_png/?id=${userId}`,
                },
                token
            );

            const newChannel = client.channel("messaging", "general", {
                name: "Canal General",
            });

            await newChannel.watch();

            setChatClient(client);
            setChannel(newChannel);
        };

        initChat();

        return () => {
            if (chatClient) {
                chatClient.disconnectUser();
            }
        };
    }, []);

    if (!chatClient || !channel) return <p>Cargando chat...</p>;

    return (
        <div className=" bg-[#1e293b] text-white px-4 h-[420px] shadow-none  ">
            <div className="  rounded-2xl shadow-xl overflow-hidden border border-gray-700 h-[460px]">
                <Chat client={chatClient} theme="str-chat__theme-dark">
                    <Channel channel={channel}>
                        <Window>
                            <ChannelHeader />
                            <MessageList />
                            <MessageInput />
                        </Window>
                    </Channel>
                </Chat>
            </div>
        </div>

    );
}
