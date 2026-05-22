"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, X } from "lucide-react";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  timestamp: string;
}

function getSessionId() {
  if (typeof window === "undefined") return "";
  let id = sessionStorage.getItem("corelogic-chat-session");
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem("corelogic-chat-session", id);
  }
  return id;
}

function loadHistory(): ChatMessage[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = sessionStorage.getItem("corelogic-chat-history");
    return raw ? (JSON.parse(raw) as ChatMessage[]) : [];
  } catch {
    return [];
  }
}

function saveHistory(messages: ChatMessage[]) {
  sessionStorage.setItem("corelogic-chat-history", JSON.stringify(messages));
}

export function LiveChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const openChat = () => setOpen(true);
    document.addEventListener("open-live-chat", openChat);
    return () => document.removeEventListener("open-live-chat", openChat);
  }, []);

  useEffect(() => {
    const history = loadHistory();
    if (history.length === 0) {
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          text: "Welcome to CoreLogic Web Lab. Ask about our services, AI systems, or government platforms — we're here to help.",
          timestamp: new Date().toISOString(),
        },
      ]);
    } else {
      setMessages(history);
    }
  }, []);

  useEffect(() => {
    if (messages.length) saveHistory(messages);
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      text,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, sessionId: getSessionId() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send");

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          text: data.reply,
          timestamp: data.timestamp,
        },
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Message failed to send");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-[#00F5FF]/40 bg-[#0B1120] text-[#00F5FF] shadow-[0_0_30px_rgba(0,245,255,0.25)] transition-opacity ${open ? "pointer-events-none opacity-0" : "opacity-100"}`}
        aria-label="Open live chat"
      >
        <MessageSquare className="h-6 w-6" />
        <span className="absolute top-0 right-0 h-3 w-3 animate-pulse rounded-full bg-[#00FFB3]" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 flex h-[min(480px,80vh)] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-[#00F5FF]/20 bg-[#0B1120]/95 shadow-[0_0_50px_rgba(0,245,255,0.15)] backdrop-blur-xl"
          >
            <div className="flex items-center justify-between border-b border-[#00F5FF]/10 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#00FFB3]" />
                <span className="text-sm font-medium text-[#F8FAFC]">Live Support</span>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-[#94A3B8] hover:text-[#00F5FF]"
                aria-label="Close chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-[#00F5FF]/20 text-[#F8FAFC]"
                        : "border border-[#00F5FF]/10 bg-[#050816]/80 text-[#94A3B8]"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {loading && (
                <p className="text-xs text-[#94A3B8] animate-pulse">CoreLogic is typing...</p>
              )}
            </div>

            {error && (
              <p className="px-4 text-xs text-red-400" role="alert">
                {error}
              </p>
            )}

            <form onSubmit={sendMessage} className="border-t border-[#00F5FF]/10 p-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about our services..."
                  className="flex-1 rounded-lg border border-[#00F5FF]/20 bg-[#050816]/80 px-3 py-2 text-sm text-[#F8FAFC] outline-none focus:border-[#00F5FF]"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#00F5FF]/20 text-[#00F5FF] disabled:opacity-40"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
