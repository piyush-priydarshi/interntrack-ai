import { motion } from "framer-motion";
import { Sparkles, Send } from "lucide-react";
import { useState } from "react";

export default function AddJobView() {
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!link) return alert("Paste hiring link first");

    setLoading(true);

    try {
      await fetch("http://localhost:8000/hiring", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ link }),
      });

      alert("AI agent processing hiring link 🚀");
      setLink("");
    } catch (err) {
      alert("Error sending link");
    }

    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
      className="max-w-2xl mx-auto"
    >
      <div className="glass-surface rounded-2xl p-10 space-y-6 text-center">
        <div className="flex justify-center">
          <Sparkles size={36} className="text-primary" />
        </div>

        <h2 className="text-2xl font-bold">AI Hiring Automation</h2>

        <p className="text-muted-foreground text-sm">
          Paste any hiring opportunity link. AI will extract details,
          schedule deadlines, and track the application automatically.
        </p>

        <input
          type="text"
          className="input-field w-full"
          placeholder="Paste hiring link (Internshala / Job Post / Mock Link)"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="btn-primary w-full flex items-center justify-center gap-2 glow-cyan"
        >
          <Send size={18} />
          {loading ? "Processing..." : "Send to AI Agent"}
        </button>
      </div>
    </motion.div>
  );
}