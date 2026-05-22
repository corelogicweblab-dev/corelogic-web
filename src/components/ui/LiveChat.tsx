"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Mail, MessageSquare, Send, X } from "lucide-react";
import { ChatMessageContent } from "@/components/ui/ChatMessageContent";
import { SITE } from "@/lib/site-config";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  timestamp: string;
}

type Panel = "chat" | "email";

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

**Send a project inquiry:** Switch to **Send Email** above — name, email, and message.
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
  const [panel, setPanel] = useState<Panel>("chat");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const [emailForm, setEmailForm] = useState({ name: "", email: "", message: "" });
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [emailSuccess, setEmailSuccess] = useState<string | null>(null);

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
    if (panel === "chat" && messages.length) saveHistory(messages);
    if (panel === "chat") {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [messages, open, loading, panel]);

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

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailLoading(true);
    setEmailError(null);
    setEmailSuccess(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...emailForm, source: "live-support" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send");

      setEmailSuccess(data.message);
      setEmailForm({ name: "", email: "", message: "" });
    } catch (err) {
      setEmailError(err instanceof Error ? err.message : "Unable to send message");
    } finally {
      setEmailLoading(false);
    }
  };

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.08 }}
        className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-2xl text-white transition-opacity ${
          open ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
        style={{
          background: "linear-gradient(135deg, #00d4ff, #6366f1)",
          boxShadow: "0 0 30px rgba(0,212,255,0.5), 0 8px 24px rgba(99,102,241,0.3)",
        }}
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
            className="holo-glass fixed bottom-6 right-6 z-50 flex h-[min(580px,85vh)] w-[min(400px,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-2xl"
          >
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{
                background: "linear-gradient(90deg, rgba(0,212,255,0.9), rgba(99,102,241,0.9))",
              }}
            >
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-white shadow-[0_0_8px_white]" />
                <span className="font-[family-name:var(--font-orbitron)] text-[11px] font-bold tracking-widest text-white uppercase">
                  Live Support
                </span>
              </div>
              <button type="button" onClick={() => setOpen(false)} className="text-white/90 hover:text-white" aria-label="Close">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex border-b border-cyan-400/20 bg-white/50">
              <button
                type="button"
                onClick={() => setPanel("chat")}
                className={`flex flex-1 items-center justify-center gap-1.5 py-2.5 font-[family-name:var(--font-orbitron)] text-[10px] font-bold tracking-wider uppercase transition ${
                  panel === "chat"
                    ? "border-b-2 border-cyan-500 text-cyan-700 bg-white/80"
                    : "text-slate-500 hover:text-cyan-600"
                }`}
              >
                <MessageSquare className="h-3.5 w-3.5" />
                Chat
              </button>
              <button
                type="button"
                onClick={() => setPanel("email")}
                className={`flex flex-1 items-center justify-center gap-1.5 py-2.5 font-[family-name:var(--font-orbitron)] text-[10px] font-bold tracking-wider uppercase transition ${
                  panel === "email"
                    ? "border-b-2 border-cyan-500 text-cyan-700 bg-white/80"
                    : "text-slate-500 hover:text-cyan-600"
                }`}
              >
                <Mail className="h-3.5 w-3.5" />
                Send Email
              </button>
            </div>

            {panel === "chat" ? (
              <>
                <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto bg-white/40 p-4 backdrop-blur-sm">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[90%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                          msg.role === "user"
                            ? "text-white shadow-[0_0_16px_rgba(0,212,255,0.3)]"
                            : "holo-glass border border-cyan-400/20 text-slate-700"
                        }`}
                        style={
                          msg.role === "user"
                            ? { background: "linear-gradient(135deg, #00d4ff, #0ea5e9)" }
                            : undefined
                        }
                      >
                        <ChatMessageContent text={msg.text} light={msg.role === "assistant"} />
                      </div>
                    </div>
                  ))}
                  {loading && (
                    <p className="font-[family-name:var(--font-orbitron)] text-[10px] tracking-wider text-cyan-600 animate-pulse uppercase">
                      Processing...
                    </p>
                  )}
                </div>

                {error && <p className="px-4 text-xs text-red-600" role="alert">{error}</p>}

                <div className="border-t border-cyan-400/20 bg-white/60 p-3 backdrop-blur-md">
                  <div className="mb-2 flex flex-wrap gap-1.5">
                    {QUICK_PROMPTS.map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        disabled={loading}
                        onClick={() => sendText(prompt)}
                        className="rounded-full border border-cyan-400/30 bg-cyan-50/80 px-2.5 py-1 font-[family-name:var(--font-orbitron)] text-[9px] font-semibold tracking-wide text-cyan-800 uppercase hover:bg-cyan-100 disabled:opacity-50"
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
                      className="flex-1 rounded-xl border border-cyan-400/30 bg-white/80 px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200/50"
                      disabled={loading}
                    />
                    <button
                      type="submit"
                      disabled={loading || !input.trim()}
                      className="flex h-10 w-10 items-center justify-center rounded-xl text-white disabled:opacity-40"
                      style={{
                        background: "linear-gradient(135deg, #00d4ff, #6366f1)",
                        boxShadow: "0 0 16px rgba(0,212,255,0.4)",
                      }}
                      aria-label="Send"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <form onSubmit={sendEmail} className="flex flex-1 flex-col overflow-y-auto bg-white/40 p-4 backdrop-blur-sm">
                <p className="mb-4 text-sm text-slate-600">
                  Send your project inquiry to our team. We&apos;ll reply within 24 hours.
                </p>

                <label className="mb-1 font-[family-name:var(--font-orbitron)] text-[9px] font-bold tracking-wider text-slate-500 uppercase">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  minLength={2}
                  value={emailForm.name}
                  onChange={(e) => setEmailForm((s) => ({ ...s, name: e.target.value }))}
                  className="mb-3 rounded-xl border border-cyan-400/30 bg-white/90 px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200/50"
                  placeholder="John Doe"
                  disabled={emailLoading}
                />

                <label className="mb-1 font-[family-name:var(--font-orbitron)] text-[9px] font-bold tracking-wider text-slate-500 uppercase">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={emailForm.email}
                  onChange={(e) => setEmailForm((s) => ({ ...s, email: e.target.value }))}
                  className="mb-3 rounded-xl border border-cyan-400/30 bg-white/90 px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200/50"
                  placeholder="you@company.com"
                  disabled={emailLoading}
                />

                <label className="mb-1 font-[family-name:var(--font-orbitron)] text-[9px] font-bold tracking-wider text-slate-500 uppercase">
                  Message
                </label>
                <textarea
                  required
                  minLength={10}
                  rows={5}
                  value={emailForm.message}
                  onChange={(e) => setEmailForm((s) => ({ ...s, message: e.target.value }))}
                  className="mb-4 flex-1 resize-none rounded-xl border border-cyan-400/30 bg-white/90 px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200/50"
                  placeholder="Tell us about your project..."
                  disabled={emailLoading}
                />

                {emailError && (
                  <p className="mb-3 text-xs text-red-600" role="alert">
                    {emailError}
                  </p>
                )}
                {emailSuccess && (
                  <p className="mb-3 text-xs text-emerald-700" role="status">
                    {emailSuccess}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={emailLoading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white disabled:opacity-50"
                  style={{
                    background: "linear-gradient(135deg, #00d4ff, #6366f1)",
                    boxShadow: "0 0 16px rgba(0,212,255,0.4)",
                  }}
                >
                  {emailLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Mail className="h-5 w-5" />
                  )}
                  {emailLoading ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
