"use client";
import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChat = async () => {
    if (!message.trim()) return;
    setLoading(true);
    setResponse("");

    try {
      const { data } = await axios.post(
        "/api/chat",
        { message },
        { headers: { "Content-Type": "application/json" } }
      );
      setResponse(data.response);
    } catch (error) {
      if (error.response) {
        setResponse("❌ " + error.response.data.error);
      } else {
        setResponse("❌ " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-950 font-sans text-white flex flex-col items-center min-h-screen p-6 sm:p-10">
      
      {/* Header */}
      <h1 className="text-4xl sm:text-5xl font-bold text-cyan-400 drop-shadow-lg mb-8">
        🤖 Hello AI
      </h1>

      {/* Chat container */}
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-6 space-y-6 border border-white/20">
        
        {/* Input Box */}
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your question here..."
          rows={4}
          className="w-full p-4 rounded-xl bg-black/40 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 resize-none"
        />

        {/* Button */}
        <button
          onClick={handleChat}
          disabled={loading}
          className="w-full py-3 text-lg font-semibold rounded-xl transition-all 
            bg-cyan-500 hover:bg-cyan-600 text-black hover:text-white 
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "⏳ Thinking..." : "✨ Ask AI"}
        </button>

        {/* Response Box */}
        <div className="mt-4 p-4 rounded-xl bg-black/50 border border-white/10 text-white min-h-[120px] whitespace-pre-line">
          {loading ? (
            <span className="animate-pulse text-gray-400">AI is typing...</span>
          ) : response ? (
            <span className="text-gray-100">{response}</span>
          ) : (
            <span className="text-gray-500">No response yet. Ask me something! 🌟</span>
          )}
        </div>
      </div>

      {/* Footer */}
      <p className="text-gray-500 text-sm mt-6">
        Built By <span className="text-cyan-400">Rahat Developer</span>
      </p>
    </div>
  );
}
