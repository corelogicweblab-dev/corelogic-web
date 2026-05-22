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
      <div className="flex h-[320px] items-center justify-center rounded-2xl border border-sky-100 bg-sky-50 md:h-[400px]">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-sky-200 border-t-sky-500" />
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
      <div className="mb-6 rounded-2xl border border-sky-200 bg-gradient-to-r from-sky-50 to-indigo-50 px-5 py-4">
        <div className="flex items-start gap-3">
          <Mail className="mt-0.5 h-5 w-5 shrink-0 text-sky-600" />
          <div>
            <p className="text-sm font-semibold text-slate-800">Direct email delivery</p>
            <p className="mt-1 text-sm text-slate-600">
              Submit the form below — your message goes straight to{" "}
              <strong className="text-sky-700">{SITE.email}</strong>. No email app required.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {formState.project && (
          <div className="rounded-xl border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-medium text-sky-800">
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
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-200"
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
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-200"
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
            className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-200"
            placeholder="Tell us about your project..."
          />
        </div>

        {error && (
          <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700" role="alert">
            {error}
          </p>
        )}
        {success && (
          <p className="flex items-start gap-2 rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-800" role="status">
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
          {loading ? "Sending to our team..." : success ? "Message Sent" : "Send Direct to Email"}
        </button>
      </form>

      <button
        type="button"
        onClick={() => document.dispatchEvent(new CustomEvent("open-live-chat"))}
        className="mt-6 w-full rounded-2xl border border-sky-100 bg-sky-50/80 p-4 text-left transition hover:border-sky-300 hover:bg-sky-50"
      >
        <div className="mb-2 flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-sky-600" />
          <span className="text-sm font-semibold text-sky-800">Live Support</span>
          <span className="ml-auto h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
        </div>
        <p className="text-xs text-slate-600">Get instant answers in English — or call {SITE.phone}</p>
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
    <section id="contact" className="relative section-padding bg-white">
      <div className="absolute inset-0 bg-gradient-to-b from-sky-50/50 to-white" />
      <div className="relative mx-auto max-w-[1600px]">
        <SectionHeading
          title="Get In Touch"
          subtitle="Send your project inquiry — delivered directly to our inbox. We respond within 24 hours."
        />

        <div className="grid gap-10 lg:grid-cols-2 xl:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card-elevated rounded-3xl p-8 xl:col-span-1"
          >
            <ContactForm key={project} project={project} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center gap-4"
          >
            {contactItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.label === "Location" ? "_blank" : undefined}
                rel={item.label === "Location" ? "noopener noreferrer" : undefined}
                className="card-elevated flex items-center gap-4 rounded-2xl px-5 py-4"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-100 text-sky-600">
                  <item.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-bold tracking-wide text-slate-500 uppercase">{item.label}</p>
                  <p className="text-base font-semibold text-slate-900">{item.value}</p>
                </div>
              </a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card-elevated overflow-hidden rounded-3xl"
          >
            <GlobeScene />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
