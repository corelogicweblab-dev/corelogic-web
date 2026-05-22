"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, X } from "lucide-react";
import { ChatMessageContent } from "@/components/ui/ChatMessageContent";
import { SITE } from "@/lib/site-config";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  timestamp: string;
}

const QUICK_PROMPTS = [
  "How do I build a website?",
  "What services do you offer?",
  "How much does it cost?",
  "How do I get started?",
] as const;

const WELCOME_MESSAGE = `Hello! Welcome to **CoreLogic Web Lab** Live Support.

I can help with:
• Website & web app development
• Mobile apps, AI, and government systems
• Pricing, process, and our tech stack

**Try:** "How do I build a website?" or "What services do you offer?"

**Project inquiries:** Use the contact form — sent directly to ${SITE.email}
**Phone:** ${SITE.phone}`;

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
    const raw = sessionStorage.getItem("corelogic-chat-history-v3");
    return raw ? (JSON.parse(raw) as ChatMessage[]) : [];
  } catch {
    return [];
  }
}

function saveHistory(messages: ChatMessage[]) {
  sessionStorage.setItem("corelogic-chat-history-v3", JSON.stringify(messages));
}

export function LiveChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (typeof window === "undefined") {
      return [{ id: "welcome", role: "assistant", text: WELCOME_MESSAGE, timestamp: new Date().toISOString() }];
    }
    const history = loadHistory();
    return history.length > 0
      ? history
      : [{ id: "welcome", role: "assistant", text: WELCOME_MESSAGE, timestamp: new Date().toISOString() }];
  });

  useEffect(() => {
    const openChat = () => setOpen(true);
    document.addEventListener("open-live-chat", openChat);
    return () => document.removeEventListener("open-live-chat", openChat);
  }, []);

  useEffect(() => {
    if (messages.length) saveHistory(messages);
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open, loading]);

  const sendText = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role: "user", text: trimmed, timestamp: new Date().toISOString() },
    ]);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, sessionId: getSessionId() }),
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
        className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-xl shadow-sky-500/40 transition-opacity ${open ? "pointer-events-none opacity-0" : "opacity-100"}`}
        aria-label="Open live chat"
      >
        <MessageSquare className="h-6 w-6" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 flex h-[min(560px,85vh)] w-[min(400px,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-2xl border border-sky-200 bg-white shadow-2xl shadow-sky-500/20"
          >
            <div className="flex items-center justify-between border-b border-sky-100 bg-gradient-to-r from-sky-500 to-cyan-500 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
                <span className="text-sm font-bold text-white">Live Support</span>
              </div>
              <button type="button" onClick={() => setOpen(false)} className="text-white/90 hover:text-white" aria-label="Close chat">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[90%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-sky-500 text-white"
                        : "border border-sky-100 bg-white text-slate-600 shadow-sm"
                    }`}
                  >
                    <ChatMessageContent text={msg.text} light={msg.role === "assistant"} />
                  </div>
                </div>
              ))}
              {loading && <p className="text-xs font-medium text-sky-600 animate-pulse">CoreLogic is typing...</p>}
            </div>

            {error && <p className="px-4 text-xs text-red-600" role="alert">{error}</p>}

            <div className="border-t border-sky-100 bg-white p-3">
              <div className="mb-2 flex flex-wrap gap-1.5">
                {QUICK_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    disabled={loading}
                    onClick={() => sendText(prompt)}
                    className="rounded-full border border-sky-200 bg-sky-50 px-2.5 py-1 text-[10px] font-medium text-sky-800 hover:bg-sky-100 disabled:opacity-50"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendText(input);
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about our services..."
                  className="flex-1 rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500 text-white disabled:opacity-40"
                  aria-label="Send"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
