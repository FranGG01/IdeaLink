import React, { useState, useRef, useEffect } from "react";

const AIChatSidebar = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage = { sender: "user", text: userInput };
    setMessages((prev) => [...prev, userMessage]);
    setUserInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput }),
      });
      const data = await res.json();
      const botMessage = { sender: "bot", text: data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Error al contactar con la IA." },
      ]);
    }

    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => setMessages([]);

  return (
    <div className="w-full h-full bg-[#1e1e2f] text-white flex flex-col rounded-xl overflow-hidden">
      {/* Header */}
      <div className="px-3 py-2 sm:px-4 sm:py-3 border-b border-gray-600/50 shrink-0">
        <h3 className="text-base sm:text-lg font-semibold">IdeaGenie</h3>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-hidden flex flex-col min-h-0">
        <div className="flex-1 overflow-y-auto px-2 py-2 sm:px-3 sm:py-3 space-y-2 scroll-smooth">
          {messages.length === 0 && (
            <div className="text-center text-gray-400 text-sm mt-8">
              <p>¡Hola! Soy tu asistente de IA.</p>
              <p className="mt-1">¿En qué puedo ayudarte hoy?</p>
            </div>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed break-words ${msg.sender === "user"
                  ? "bg-blue-600 text-white rounded-br-md"
                  : "bg-gray-700 text-gray-100 rounded-bl-md"
                  }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-700 text-gray-100 px-3 py-2 rounded-2xl rounded-bl-md text-sm">
                <div className="flex items-center gap-1">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="ml-2 text-xs">Escribiendo...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="shrink-0 border-t border-gray-600/50 bg-[#1e1e2f]">
        <div className="p-2 sm:p-3">
          <div className="flex gap-2 items-end">
            <div className="flex-1 min-w-0">
              <textarea
                className="w-full min-h-[40px] max-h-[120px] px-3 py-2 rounded-xl bg-[#2a2a3c] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white text-sm resize-none scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-700"
                placeholder="Pregunta algo..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                style={{
                  height: 'auto',
                  minHeight: '40px',
                  maxHeight: '120px',
                  overflow: 'auto'
                }}
                onInput={(e) => {
                  e.target.style.height = 'auto';
                  e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
                }}
              />
            </div>
            <button
              onClick={sendMessage}
              disabled={loading || !userInput.trim()}
              className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-xl hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition duration-200 flex items-center justify-center"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              )}
            </button>
          </div>

          {/* Clear Chat Button */}
          <button
            onClick={clearChat}
            className="mt-2 text-xs text-gray-400 hover:text-gray-300 hover:underline transition duration-200"
          >
            Limpiar chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChatSidebar;