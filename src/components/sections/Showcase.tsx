"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SHOWCASE_PROJECTS } from "@/lib/constants";

function projectInquiryHref(title: string) {
  return `/?project=${encodeURIComponent(title)}#contact`;
}

function ProjectVisual({ visual }: { visual: string }) {
  const panel =
    "rounded border border-cyan-400/30 bg-slate-900/60 backdrop-blur-sm shadow-[0_0_12px_rgba(0,212,255,0.2)]";

  if (visual === "command") {
    return (
      <div className="flex h-full gap-2 p-4">
        {[0, 1, 2].map((i) => (
          <div key={i} className={`flex-1 p-2 ${panel}`}>
            <div className="mb-2 h-2 w-8 rounded bg-gradient-to-r from-cyan-400 to-indigo-400" />
            <div className="space-y-1">
              {["72%", "88%", "65%", "91%", "78%"].map((width, j) => (
                <div
                  key={j}
                  className="h-1 rounded-full bg-gradient-to-r from-cyan-300/60 to-indigo-300/40"
                  style={{ width }}
                />
              ))}
            </div>
            <div className="mt-3 grid grid-cols-3 gap-1">
              {Array.from({ length: 6 }).map((_, j) => (
                <div key={j} className="aspect-square rounded bg-cyan-400/15 ring-1 ring-cyan-400/20" />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (visual === "dashboard") {
    return (
      <div className="flex h-full flex-col gap-3 p-4">
        <div className="flex gap-2">
          {["KPI", "GIS", "Alerts"].map((t) => (
            <div
              key={t}
              className="rounded border border-cyan-400/40 bg-cyan-950/50 px-2 py-1 font-[family-name:var(--font-orbitron)] text-[8px] font-semibold tracking-wider text-cyan-400 uppercase"
            >
              {t}
            </div>
          ))}
        </div>
        <div className="flex flex-1 gap-2">
          <div className={`flex-1 p-2 ${panel}`}>
            <div className="h-full rounded bg-gradient-to-br from-cyan-200/40 via-white/20 to-violet-200/30" />
          </div>
          <div className="w-1/3 space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-8 rounded bg-violet-400/20 ring-1 ring-violet-400/25" />
            ))}
          </div>
        </div>
      </div>
    );
  }
  if (visual === "ai") {
    return (
      <div className="relative flex h-full items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.25),transparent)]" />
        <div className="relative h-32 w-32 rounded-full border-2 border-violet-400/50 shadow-[0_0_30px_rgba(139,92,246,0.3)]">
          <div className="absolute inset-4 rounded-full border border-cyan-400/50 animate-pulse" />
          <div className="absolute inset-8 rounded-full bg-gradient-to-b from-cyan-300/40 to-violet-400/30" />
          <div className="absolute -inset-4 rounded-full border border-cyan-400/20 animate-[spin_20s_linear_infinite]" />
        </div>
        <div className={`absolute bottom-4 left-4 right-4 p-2 text-[8px] text-slate-400 ${panel}`}>
          Processing natural language query...
        </div>
      </div>
    );
  }
  if (visual === "dispatch") {
    return (
      <div className="grid h-full grid-cols-2 gap-2 p-4">
        <div className={panel}>
          <p className="font-[family-name:var(--font-orbitron)] text-[8px] tracking-wider text-emerald-600 uppercase">
            Active Units
          </p>
          <p className="font-[family-name:var(--font-orbitron)] text-2xl text-emerald-600">24</p>
        </div>
        <div className={panel}>
          <p className="font-[family-name:var(--font-orbitron)] text-[8px] tracking-wider text-cyan-600 uppercase">
            Incidents
          </p>
          <p className="font-[family-name:var(--font-orbitron)] text-2xl text-cyan-600">7</p>
        </div>
        <div className={`col-span-2 flex-1 ${panel}`}>
          <div className="relative h-full min-h-[60px]">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="absolute h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                style={{ left: `${20 + i * 25}%`, top: `${30 + i * 15}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex h-full flex-col gap-2 p-4">
      <div className="grid grid-cols-4 gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className={`h-12 ${panel}`} />
        ))}
      </div>
      <div className="flex-1 rounded border border-violet-400/25 bg-gradient-to-r from-violet-200/30 to-cyan-100/40 shadow-[inset_0_0_20px_rgba(0,212,255,0.1)]" />
    </div>
  );
}

export function Showcase() {
  return (
    <section id="solutions" className="section-dark section-below-fold relative section-padding overflow-hidden">
      <div className="absolute inset-0 gradient-mesh-future opacity-55" />
      <div className="absolute inset-0 grid-future opacity-30" />
      <div className="relative mx-auto max-w-[1600px]">
        <SectionHeading
          title="Featured Solutions"
          subtitle="Advanced platforms we build for governments, enterprises, and mission-critical operations."
        />

        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {SHOWCASE_PROJECTS.slice(0, 3).map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 48, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="card-future group overflow-hidden rounded-2xl"
            >
              <div
                className={`h-52 bg-gradient-to-br ${project.gradient} border-b border-[#00F5FF]/10`}
              >
                <ProjectVisual visual={project.visual} />
              </div>
              <div className="p-6">
                <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-slate-100">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {project.description}
                </p>
                <Link
                  href={projectInquiryHref(project.title)}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 transition hover:text-cyan-300"
                >
                  Request Demo
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {SHOWCASE_PROJECTS.slice(3).map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -32 : 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12, duration: 0.6 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="card-future flex overflow-hidden rounded-2xl"
            >
              <div className={`w-2/5 min-h-[180px] bg-gradient-to-br ${project.gradient}`}>
                <ProjectVisual visual={project.visual} />
              </div>
              <div className="flex flex-1 flex-col justify-center p-6">
                <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-slate-100">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm text-slate-400">{project.description}</p>
                <Link
                  href={projectInquiryHref(project.title)}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300"
                >
                  Request Demo
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
