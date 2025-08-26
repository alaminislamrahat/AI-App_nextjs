"use client"
import axios from "axios";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChat = async () => {
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
        setResponse("error: " + error.response.data.error);
      } else {
        setResponse("error: " + error.message);
      }
    } finally {
      setLoading(false);
      setMessage("")
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/20">
        <h1 className="text-3xl font-bold text-cyan-400 text-center mb-6">
          🤖 Hello AI
        </h1>

        {/* Input Box */}
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask me anything..."
          rows={4}
          className="w-full p-4 mb-4 rounded-xl bg-black/40 border border-white/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />

        {/* Button */}
        <button
          onClick={handleChat}
          disabled={loading}
          className="w-full py-3 rounded-xl font-semibold text-lg 
                     bg-cyan-500 text-black hover:bg-cyan-600 
                     disabled:opacity-50 disabled:cursor-not-allowed 
                     transition-colors duration-300"
        >
          {loading ? "Thinking..." : "Chat"}
        </button>

        {/* Response */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-6 p-4 rounded-xl bg-black/40 border border-white/20 text-white min-h-[100px] whitespace-pre-line"
        >
          {loading ? (
            <span className="animate-pulse text-gray-400">AI is typing...</span>
          ) : (
            response || <span className="text-gray-500">No response yet.</span>
          )}
        </motion.div>
      </div>
    </div>
  );
}
