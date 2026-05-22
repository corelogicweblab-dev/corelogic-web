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
  "Paano magpagawa ng website?",
  "Ano ang services ninyo?",
  "Magkano ang price?",
  "Paano magsimula?",
] as const;

const WELCOME_MESSAGE = `Kumusta! Ako ang **CoreLogic Web Lab Live Support**.

Makakakuha ka agad ng details about:
• Website & web app development
• Mobile apps, AI, government/LGU systems
• Pricing, process, at tech stack

**Try:** "paano magpagawa ng website?" o "services"

📧 ${SITE.email}
📱 ${SITE.phone}`;

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
    const raw = sessionStorage.getItem("corelogic-chat-history-v2");
    return raw ? (JSON.parse(raw) as ChatMessage[]) : [];
  } catch {
    return [];
  }
}

function saveHistory(messages: ChatMessage[]) {
  sessionStorage.setItem("corelogic-chat-history-v2", JSON.stringify(messages));
}

export function LiveChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const openChat = () => setOpen(true);
    document.addEventListener("open-live-chat", openChat);
    return () => document.removeEventListener("open-live-chat", openChat);
  }, []);

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (typeof window === "undefined") {
      return [
        {
          id: "welcome",
          role: "assistant",
          text: WELCOME_MESSAGE,
          timestamp: new Date().toISOString(),
        },
      ];
    }
    const history = loadHistory();
    if (history.length > 0) return history;
    return [
      {
        id: "welcome",
        role: "assistant",
        text: WELCOME_MESSAGE,
        timestamp: new Date().toISOString(),
      },
    ];
  });

  useEffect(() => {
    if (messages.length) saveHistory(messages);
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open, loading]);

  const sendText = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      text: trimmed,
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

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    sendText(input);
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
            className="fixed bottom-6 right-6 z-50 flex h-[min(560px,85vh)] w-[min(420px,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-2xl border border-[#00F5FF]/20 bg-[#0B1120]/98 shadow-[0_0_50px_rgba(0,245,255,0.15)] backdrop-blur-xl"
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

            <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto p-4 scroll-smooth">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[92%] rounded-xl px-3 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-[#00F5FF]/20 text-[#F8FAFC]"
                        : "border border-[#00F5FF]/10 bg-[#050816]/90 text-[#94A3B8]"
                    }`}
                  >
                    <ChatMessageContent text={msg.text} />
                  </div>
                </div>
              ))}
              {loading && (
                <p className="text-xs text-[#00F5FF] animate-pulse">Nagtatype ang CoreLogic...</p>
              )}
            </div>

            {error && (
              <p className="px-4 text-xs text-red-400" role="alert">
                {error}
              </p>
            )}

            <div className="border-t border-[#00F5FF]/10 px-3 pt-2">
              <div className="mb-2 flex flex-wrap gap-1.5">
                {QUICK_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    disabled={loading}
                    onClick={() => sendText(prompt)}
                    className="rounded-full border border-[#00F5FF]/20 bg-[#050816]/80 px-2.5 py-1 text-[10px] text-[#94A3B8] transition-colors hover:border-[#00F5FF]/40 hover:text-[#00F5FF] disabled:opacity-50"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
              <form onSubmit={sendMessage} className="pb-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Hal: paano magpagawa ng website?"
                    className="flex-1 rounded-lg border border-[#00F5FF]/20 bg-[#050816]/80 px-3 py-2 text-sm text-[#F8FAFC] outline-none focus:border-[#00F5FF]"
                    disabled={loading}
                  />
                  <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#00F5FF]/20 text-[#00F5FF] disabled:opacity-40"
                    aria-label="Send message"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
