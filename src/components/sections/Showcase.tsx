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
  if (visual === "command") {
    return (
      <div className="flex h-full gap-2 p-4">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="flex-1 rounded border border-[#00F5FF]/20 bg-[#050816]/90 p-2"
          >
            <div className="mb-2 h-2 w-8 rounded bg-[#00F5FF]/40" />
            <div className="space-y-1">
              {["72%", "88%", "65%", "91%", "78%"].map((width, j) => (
                <div
                  key={j}
                  className="h-1 rounded-full bg-[#38BDF8]/30"
                  style={{ width }}
                />
              ))}
            </div>
            <div className="mt-3 grid grid-cols-3 gap-1">
              {Array.from({ length: 6 }).map((_, j) => (
                <div key={j} className="aspect-square rounded bg-[#00F5FF]/10" />
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
              className="rounded border border-[#38BDF8]/30 px-2 py-1 text-[8px] text-[#38BDF8]"
            >
              {t}
            </div>
          ))}
        </div>
        <div className="flex flex-1 gap-2">
          <div className="flex-1 rounded border border-[#00F5FF]/15 bg-[#050816]/80 p-2">
            <div className="h-full rounded bg-gradient-to-br from-[#00F5FF]/10 to-transparent" />
          </div>
          <div className="w-1/3 space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-8 rounded bg-[#7C3AED]/20" />
            ))}
          </div>
        </div>
      </div>
    );
  }
  if (visual === "ai") {
    return (
      <div className="relative flex h-full items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.3),transparent)]" />
        <div className="relative h-32 w-32 rounded-full border-2 border-[#7C3AED]/50">
          <div className="absolute inset-4 rounded-full border border-[#00F5FF]/40 animate-pulse" />
          <div className="absolute inset-8 rounded-full bg-gradient-to-b from-[#00F5FF]/30 to-[#7C3AED]/30" />
          <div className="absolute -inset-4 rounded-full border border-[#00F5FF]/10 animate-[spin_20s_linear_infinite]" />
        </div>
        <div className="absolute bottom-4 left-4 right-4 rounded border border-[#00F5FF]/20 bg-[#050816]/80 p-2 text-[8px] text-[#94A3B8]">
          Processing natural language query...
        </div>
      </div>
    );
  }
  if (visual === "dispatch") {
    return (
      <div className="grid h-full grid-cols-2 gap-2 p-4">
        <div className="rounded border border-[#00FFB3]/20 bg-[#050816]/80 p-2">
          <p className="text-[8px] text-[#00FFB3]">Active Units</p>
          <p className="font-[family-name:var(--font-orbitron)] text-2xl text-[#00FFB3]">24</p>
        </div>
        <div className="rounded border border-[#00F5FF]/20 bg-[#050816]/80 p-2">
          <p className="text-[8px] text-[#00F5FF]">Incidents</p>
          <p className="font-[family-name:var(--font-orbitron)] text-2xl text-[#00F5FF]">7</p>
        </div>
        <div className="col-span-2 flex-1 rounded border border-[#38BDF8]/15 bg-[#050816]/60">
          <div className="relative h-full">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="absolute h-2 w-2 rounded-full bg-[#00FFB3]"
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
          <div key={i} className="h-12 rounded border border-[#38BDF8]/20 bg-[#050816]/70" />
        ))}
      </div>
      <div className="flex-1 rounded border border-[#7C3AED]/20 bg-gradient-to-r from-[#7C3AED]/10 to-[#00F5FF]/5" />
    </div>
  );
}

export function Showcase() {
  return (
    <section id="solutions" className="relative section-padding overflow-hidden bg-white">
      <div className="absolute inset-0 gradient-mesh-light opacity-80" />
      <div className="relative mx-auto max-w-[1600px]">
        <SectionHeading
          title="Featured Solutions"
          subtitle="Advanced platforms we build for governments, enterprises, and mission-critical operations."
        />

        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {SHOWCASE_PROJECTS.slice(0, 3).map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -6 }}
              className="card-elevated group overflow-hidden rounded-3xl"
            >
              <div
                className={`h-52 bg-gradient-to-br ${project.gradient} border-b border-[#00F5FF]/10`}
              >
                <ProjectVisual visual={project.visual} />
              </div>
              <div className="p-6">
                <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-slate-900">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {project.description}
                </p>
                <Link
                  href={projectInquiryHref(project.title)}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-sky-600 hover:text-sky-700"
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
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="card-elevated flex overflow-hidden rounded-3xl"
            >
              <div className={`w-2/5 min-h-[180px] bg-gradient-to-br ${project.gradient}`}>
                <ProjectVisual visual={project.visual} />
              </div>
              <div className="flex flex-1 flex-col justify-center p-6">
                <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-slate-900">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{project.description}</p>
                <Link
                  href={projectInquiryHref(project.title)}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-sky-600 hover:text-sky-700"
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
