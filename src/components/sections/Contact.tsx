"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, MapPin, MessageSquare, Phone, Send, Loader2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SITE, MAILTO_LINK, TEL_LINK } from "@/lib/site-config";

const GlobeScene = dynamic(
  () => import("@/components/three/GlobeScene").then((m) => m.GlobeScene),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[320px] items-center justify-center rounded-2xl border border-[#00F5FF]/10 bg-[#0B1120]/60 md:h-[400px]">
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-[#00F5FF]/20 border-t-[#00F5FF]" />
      </div>
    ),
  }
);

function buildInitialForm(project: string) {
  return {
    name: "",
    email: "",
    message: project
      ? `I'm interested in learning more about ${project}.`
      : "",
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

  const mailtoWithBody = () => {
    const subject = formState.project
      ? `Project Inquiry: ${formState.project}`
      : "Project Inquiry — CoreLogic Web Lab";
    const body = [
      formState.name && `Name: ${formState.name}`,
      formState.email && `Reply-To: ${formState.email}`,
      "",
      formState.message || "I'd like to discuss a project with CoreLogic Web Lab.",
    ]
      .filter(Boolean)
      .join("\n");
    return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <>
      <a
        href={mailtoWithBody()}
        className="mb-6 flex items-center gap-3 rounded-xl border border-[#00F5FF]/30 bg-[#00F5FF]/10 px-4 py-3 transition-all hover:border-[#00F5FF] hover:bg-[#00F5FF]/20 hover:shadow-[0_0_30px_rgba(0,245,255,0.2)]"
      >
        <Mail className="h-5 w-5 shrink-0 text-[#00F5FF]" />
        <div>
          <p className="text-xs text-[#94A3B8]">Email us directly</p>
          <p className="text-sm font-semibold text-[#F8FAFC]">{SITE.email}</p>
        </div>
      </a>

      <form onSubmit={handleSubmit} className="space-y-6">
        {formState.project && (
          <div className="rounded-lg border border-[#00F5FF]/20 bg-[#00F5FF]/5 px-4 py-2 text-sm text-[#00F5FF]">
            Project: {formState.project}
          </div>
        )}
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-xs tracking-wider text-[#94A3B8] uppercase"
          >
            Your Name
          </label>
          <input
            id="name"
            type="text"
            required
            minLength={2}
            value={formState.name}
            onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
            className="w-full border-b border-[#00F5FF]/30 bg-transparent py-3 text-[#F8FAFC] outline-none transition-colors focus:border-[#00F5FF]"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-xs tracking-wider text-[#94A3B8] uppercase"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            required
            value={formState.email}
            onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
            className="w-full border-b border-[#00F5FF]/30 bg-transparent py-3 text-[#F8FAFC] outline-none transition-colors focus:border-[#00F5FF]"
            placeholder="you@organization.gov"
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="mb-2 block text-xs tracking-wider text-[#94A3B8] uppercase"
          >
            Message
          </label>
          <textarea
            id="message"
            required
            minLength={10}
            rows={4}
            value={formState.message}
            onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
            className="w-full resize-none border-b border-[#00F5FF]/30 bg-transparent py-3 text-[#F8FAFC] outline-none transition-colors focus:border-[#00F5FF]"
            placeholder="Tell us about your project..."
          />
        </div>

        {error && (
          <p className="text-sm text-red-400" role="alert">
            {error}
          </p>
        )}
        {success && (
          <p className="text-sm text-[#00FFB3]" role="status">
            {success}
          </p>
        )}

        <div className="flex flex-wrap gap-4 pt-2">
          <a
            href={mailtoWithBody()}
            className="inline-flex items-center gap-2 rounded-lg border border-[#00F5FF]/30 px-5 py-3 text-sm font-medium text-[#F8FAFC] transition-all hover:border-[#00F5FF] hover:bg-[#00F5FF]/10"
          >
            <Mail className="h-4 w-4 text-[#00F5FF]" />
            Email Directly
          </a>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#00F5FF] to-[#38BDF8] px-5 py-3 text-sm font-semibold text-[#050816] transition-all hover:shadow-[0_0_30px_rgba(0,245,255,0.3)] disabled:opacity-60"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            {loading ? "Sending..." : success ? "Sent" : "Send Message"}
          </button>
        </div>
      </form>

      <button
        type="button"
        onClick={() => document.dispatchEvent(new CustomEvent("open-live-chat"))}
        className="mt-8 w-full rounded-xl border border-[#00F5FF]/10 bg-[#050816]/50 p-4 text-left transition-colors hover:border-[#00F5FF]/30"
      >
        <div className="mb-3 flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-[#00FFB3]" />
          <span className="text-xs font-medium text-[#00FFB3]">Live Support</span>
          <span className="ml-auto h-2 w-2 animate-pulse rounded-full bg-[#00FFB3]" />
        </div>
        <p className="text-xs text-[#94A3B8]">
          Open live chat for instant answers, or call {SITE.phone}.
        </p>
      </button>
    </>
  );
}

export function Contact() {
  const searchParams = useSearchParams();
  const project = searchParams.get("project") ?? "";

  const contactItems = [
    {
      icon: Mail,
      label: "Email",
      value: SITE.email,
      href: MAILTO_LINK,
      primary: true,
    },
    {
      icon: Phone,
      label: "Phone",
      value: SITE.phone,
      href: TEL_LINK,
    },
    {
      icon: MapPin,
      label: "Location",
      value: SITE.location,
      href: "https://maps.google.com/?q=Philippines",
    },
  ];

  return (
    <section id="contact" className="relative section-padding">
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] to-transparent" />
      <div className="relative mx-auto max-w-[1600px]">
        <SectionHeading
          title="Get In Touch"
          subtitle="Email us directly or send a project inquiry — we respond within 24 hours."
        />

        <div className="grid gap-10 lg:grid-cols-2 xl:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-panel glow-cyan rounded-2xl p-8 xl:col-span-1"
          >
            <ContactForm key={project} project={project} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
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
                className={`flex items-center gap-4 rounded-xl border px-5 py-4 transition-colors ${
                  item.primary
                    ? "border-[#00F5FF]/30 bg-[#00F5FF]/10 hover:border-[#00F5FF] hover:bg-[#00F5FF]/15"
                    : "border-[#00F5FF]/10 bg-[#0B1120]/60 hover:border-[#00F5FF]/30 hover:bg-[#00F5FF]/5"
                }`}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#00F5FF]/10 text-[#00F5FF]">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-[#94A3B8]">{item.label}</p>
                  <p className="text-sm font-medium text-[#F8FAFC]">{item.value}</p>
                </div>
              </a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-panel overflow-hidden rounded-2xl"
          >
            <GlobeScene />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
