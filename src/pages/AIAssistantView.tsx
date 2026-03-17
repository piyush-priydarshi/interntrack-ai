import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Sparkles } from "lucide-react";

interface Message {
  role: "ai" | "user";
  content: string;
}

export default function AIAssistantView() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", content: "Hi! I am your AI Career Agent. Ask me about hiring, interviews or deadlines." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user" as const, content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // MOCK AI RESPONSE (for now)
      await new Promise((res) => setTimeout(res, 1000));

      const aiResponse = {
        role: "ai" as const,
        content: "Analyzing your request... (n8n AI will respond here)",
      };

      setMessages((prev) => [...prev, aiResponse]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "Error contacting AI agent." },
      ]);
    }

    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-3xl mx-auto h-[calc(100vh-8rem)] flex flex-col"
    >
      <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
        <Sparkles size={18} className="text-primary" /> AI Agent
      </h2>

      <div className="flex-1 space-y-4 overflow-y-auto pb-6 pr-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[75%] p-4 rounded-2xl text-sm ${
                msg.role === "ai"
                  ? "glass-surface"
                  : "bg-primary/20 border border-primary/30"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="text-sm text-muted-foreground">AI is thinking...</div>
        )}
      </div>

      <div className="relative mt-auto pt-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask AI about jobs, deadlines, interviews..."
          className="input-field py-4 pl-5 pr-14 rounded-2xl"
        />

        <button
          onClick={handleSend}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-primary rounded-xl"
        >
          <Send size={16} />
        </button>
      </div>
    </motion.div>
  );
}