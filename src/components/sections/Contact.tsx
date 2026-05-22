"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, MapPin, MessageSquare, Phone, Send, Loader2, CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SITE, TEL_LINK } from "@/lib/site-config";

const GlobeScene = dynamic(
  () => import("@/components/three/GlobeScene").then((m) => m.GlobeScene),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[320px] items-center justify-center rounded-2xl border border-cyan-400/20 bg-slate-900/50 md:h-[400px]">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-cyan-900 border-t-cyan-400" />
      </div>
    ),
  }
);

function buildInitialForm(project: string) {
  return {
    name: "",
    email: "",
    message: project ? `I'm interested in learning more about ${project}.` : "",
    project,
  };
}

function ContactForm({ project }: { project: string }) {
  const [formState, setFormState] = useState(() => buildInitialForm(project));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");

      setSuccess(data.message);
      setFormState(buildInitialForm(project));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-5">
        {formState.project && (
          <div className="rounded-xl border border-cyan-400/30 bg-cyan-950/40 px-4 py-2 text-sm font-medium text-cyan-300">
            Project: {formState.project}
          </div>
        )}

        <div>
          <label htmlFor="name" className="mb-1.5 block text-xs font-bold tracking-wide text-slate-500 uppercase">
            Your Name
          </label>
          <input
            id="name"
            type="text"
            required
            minLength={2}
            value={formState.name}
            onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
            className="w-full rounded-xl border border-cyan-400/20 bg-slate-900/60 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-xs font-bold tracking-wide text-slate-500 uppercase">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            required
            value={formState.email}
            onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
            className="w-full rounded-xl border border-cyan-400/20 bg-slate-900/60 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
            placeholder="you@company.com"
          />
        </div>

        <div>
          <label htmlFor="message" className="mb-1.5 block text-xs font-bold tracking-wide text-slate-500 uppercase">
            Message
          </label>
          <textarea
            id="message"
            required
            minLength={10}
            rows={4}
            value={formState.message}
            onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
            className="w-full resize-none rounded-xl border border-cyan-400/20 bg-slate-900/60 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
            placeholder="Tell us about your project..."
          />
        </div>

        {error && (
          <p className="rounded-lg bg-red-950/50 px-4 py-2 text-sm text-red-400" role="alert">
            {error}
          </p>
        )}
        {success && (
          <p className="flex items-start gap-2 rounded-lg bg-emerald-950/40 px-4 py-3 text-sm text-emerald-400" role="status">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
            {success}
          </p>
        )}

        <button type="submit" disabled={loading} className="btn-primary w-full !py-4">
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Send className="h-5 w-5" />
          )}
          {loading ? "Sending..." : success ? "Message Sent" : "Send Message"}
        </button>
      </form>

      <button
        type="button"
        onClick={() => document.dispatchEvent(new CustomEvent("open-live-chat"))}
        className="mt-6 w-full rounded-2xl border border-cyan-400/20 bg-cyan-950/30 p-4 text-left transition hover:border-cyan-400/50 hover:bg-cyan-950/50"
      >
        <div className="mb-2 flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-cyan-400" />
          <span className="text-sm font-semibold text-cyan-300">Live Support</span>
          <span className="ml-auto h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
        </div>
        <p className="text-xs text-slate-400">Get instant answers in English — or call {SITE.phone}</p>
      </button>
    </>
  );
}

export function Contact() {
  const searchParams = useSearchParams();
  const project = searchParams.get("project") ?? "";

  const contactItems = [
    { icon: Mail, label: "Email", value: SITE.email, href: "#contact", copy: true },
    { icon: Phone, label: "Phone", value: SITE.phone, href: TEL_LINK },
    { icon: MapPin, label: "Location", value: SITE.location, href: "https://maps.google.com/?q=Philippines" },
  ];

  return (
    <section id="contact" className="section-dark section-below-fold relative section-padding">
      <div className="absolute inset-0 gradient-mesh-future opacity-45" />
      <div className="relative mx-auto max-w-[1600px]">
        <SectionHeading
          title="Get In Touch"
          subtitle="Tell us about your project. We respond within 24 hours."
        />

        <div className="grid gap-10 lg:grid-cols-2 xl:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, x: -40, scale: 0.96 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.65 }}
            viewport={{ once: true }}
            className="holo-glass hud-corners rounded-2xl p-8 xl:col-span-1"
          >
            <ContactForm key={project} project={project} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center gap-4"
          >
            {contactItems.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                target={item.label === "Location" ? "_blank" : undefined}
                rel={item.label === "Location" ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ x: 6 }}
                className="card-future flex items-center gap-4 rounded-2xl px-5 py-4"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/15 text-cyan-400">
                  <item.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-bold tracking-wide text-slate-500 uppercase">{item.label}</p>
                  <p className="text-base font-semibold text-slate-100">{item.value}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="holo-glass overflow-hidden rounded-2xl"
          >
            <GlobeScene />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
