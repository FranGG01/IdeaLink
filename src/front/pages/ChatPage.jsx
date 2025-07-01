import React from "react";
import ChatApp from "../components/ChatApp";

export default function ChatPage() {
    return (
        <div className="min-h-screen bg-gray-900 text-white p-4">
            <h1 className="text-2xl font-bold mb-4">Chat en tiempo real</h1>
            <ChatApp />
        </div>
    );
}
