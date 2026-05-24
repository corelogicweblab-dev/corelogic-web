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
    "rounded border border-cyan-400/30 bg-slate-900/70 backdrop-blur-sm shadow-[0_0_12px_rgba(0,212,255,0.15)]";

  if (visual === "command") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex h-full gap-2 p-3"
      >
        {[
          { label: "Alerts", value: "12", bars: ["65%", "82%", "45%"] },
          { label: "Regions", value: "8", bars: ["90%", "55%", "72%"] },
          { label: "Assets", value: "156", bars: ["48%", "78%", "60%"] },
        ].map((col) => (
          <motion.div
            key={col.label}
            animate={{ opacity: [0.85, 1, 0.85] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className={`flex-1 p-2 ${panel}`}
          >
            <p className="font-[family-name:var(--font-orbitron)] text-[7px] tracking-wider text-cyan-500 uppercase">
              {col.label}
            </p>
            <p className="font-[family-name:var(--font-orbitron)] text-lg font-bold text-cyan-300">{col.value}</p>
            <motion.div
              className="mt-2 space-y-1"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            >
              {col.bars.map((width, j) => (
                <motion.div
                  key={j}
                  className="h-1 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500"
                  animate={{ width: [width, `${parseInt(width) - 10}%`, width] }}
                  transition={{ duration: 1.5 + j * 0.2, repeat: Infinity }}
                />
              ))}
            </motion.div>
            <motion.div
              className="mt-2 grid grid-cols-3 gap-0.5"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
            >
              {Array.from({ length: 6 }).map((_, j) => (
                <motion.div
                  key={j}
                  className="aspect-square rounded bg-cyan-400/20 ring-1 ring-cyan-400/30"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: j * 0.1 }}
                />
              ))}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    );
  }

  if (visual === "dashboard") {
    const kpis = [
      { label: "Citizens", val: "48.2K" },
      { label: "Permits", val: "1,204" },
      { label: "Revenue", val: "₱12.4M" },
    ];
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex h-full flex-col gap-2 p-3"
      >
        <motion.div
          className="flex gap-1.5"
          animate={{ opacity: [0.9, 1, 0.9] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {["KPI", "GIS", "Alerts"].map((t) => (
            <span
              key={t}
              className="rounded border border-cyan-400/50 bg-cyan-950/80 px-2 py-0.5 font-[family-name:var(--font-orbitron)] text-[7px] font-bold tracking-wider text-cyan-400 uppercase"
            >
              {t}
            </span>
          ))}
        </motion.div>
        <div className="grid grid-cols-3 gap-1.5">
          {kpis.map((k, i) => (
            <motion.div
              key={k.label}
              className={`p-1.5 ${panel}`}
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
            >
              <p className="text-[6px] text-slate-500 uppercase">{k.label}</p>
              <p className="font-[family-name:var(--font-orbitron)] text-[10px] font-bold text-cyan-300">{k.val}</p>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="flex flex-1 gap-2"
          animate={{ opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <motion.div className={`flex-1 p-2 ${panel}`} animate={{ scale: [1, 1.02, 1] }} transition={{ duration: 3, repeat: Infinity }}>
            <p className="mb-1 font-[family-name:var(--font-orbitron)] text-[6px] text-cyan-500 uppercase">GIS Map</p>
            <div className="relative h-full min-h-[60px] rounded bg-gradient-to-br from-cyan-950 to-slate-900">
              <div className="absolute inset-2 grid grid-cols-4 grid-rows-3 gap-px opacity-60">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="border border-cyan-500/20" />
                ))}
              </div>
              {[30, 55, 70].map((left, i) => (
                <motion.div
                  key={i}
                  className="absolute h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]"
                  style={{ left: `${left}%`, top: `${35 + i * 12}%` }}
                  animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                />
              ))}
              <motion.div
                className="absolute bottom-1 left-1 right-1 h-0.5 rounded bg-cyan-400/40"
                animate={{ scaleX: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ transformOrigin: "left" }}
              />
            </div>
          </motion.div>
          <div className="flex w-[38%] flex-col gap-1.5">
            {[
              { h: "h-6", w: "88%" },
              { h: "h-5", w: "72%" },
              { h: "h-7", w: "95%" },
              { h: "h-4", w: "60%" },
            ].map((bar, i) => (
              <motion.div
                key={i}
                className={`${bar.h} rounded bg-gradient-to-r from-violet-500/40 to-cyan-500/30 ring-1 ring-violet-400/30`}
                style={{ width: bar.w }}
                animate={{ opacity: [0.5, 1, 0.5], width: [bar.w, `${parseInt(bar.w) + 8}%`, bar.w] }}
                transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.15 }}
              />
            ))}
            <motion.p
              className="mt-auto font-[family-name:var(--font-orbitron)] text-[6px] text-emerald-400"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ↑ 12% vs last month
            </motion.p>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  if (visual === "ai") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative flex h-full flex-col items-center justify-center overflow-hidden p-3"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.3),transparent)]" />
        <motion.div
          className="relative h-28 w-28 rounded-full border-2 border-violet-400/60 shadow-[0_0_40px_rgba(139,92,246,0.4)]"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <motion.div
            className="absolute inset-3 rounded-full border border-cyan-400/60"
            animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <div className="absolute inset-6 rounded-full bg-gradient-to-b from-cyan-400/50 to-violet-500/40" />
          <motion.div
            className="absolute inset-0 flex items-center justify-center font-[family-name:var(--font-orbitron)] text-[8px] font-bold text-white"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            AI
          </motion.div>
        </motion.div>
        <motion.div
          className={`absolute bottom-2 left-2 right-2 p-2 ${panel}`}
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <p className="font-[family-name:var(--font-orbitron)] text-[7px] text-cyan-400">Query</p>
          <motion.p
            className="text-[8px] text-slate-300"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            &quot;Show FOI requests for Q3 2025...&quot;
          </motion.p>
          <motion.div
            className="mt-1 h-0.5 rounded bg-cyan-400/60"
            animate={{ width: ["20%", "85%", "20%"] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    );
  }

  if (visual === "dispatch") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="grid h-full grid-cols-2 gap-2 p-3"
      >
        <motion.div className={panel} animate={{ scale: [1, 1.02, 1] }} transition={{ duration: 2, repeat: Infinity }}>
          <p className="font-[family-name:var(--font-orbitron)] text-[7px] tracking-wider text-emerald-400 uppercase">
            Active Units
          </p>
          <motion.p
            className="font-[family-name:var(--font-orbitron)] text-2xl font-bold text-emerald-400"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            24
          </motion.p>
          <p className="text-[6px] text-slate-500">12 responding</p>
        </motion.div>
        <motion.div className={panel} animate={{ scale: [1, 1.02, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}>
          <p className="font-[family-name:var(--font-orbitron)] text-[7px] tracking-wider text-cyan-400 uppercase">
            Incidents
          </p>
          <motion.p
            className="font-[family-name:var(--font-orbitron)] text-2xl font-bold text-cyan-400"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
          >
            7
          </motion.p>
          <p className="text-[6px] text-slate-500">3 critical</p>
        </motion.div>
        <motion.div className={`col-span-2 min-h-[70px] ${panel}`}>
          <p className="mb-1 font-[family-name:var(--font-orbitron)] text-[6px] text-cyan-500 uppercase">Live Map</p>
          <motion.div className="relative h-12 rounded bg-slate-950/80" animate={{ opacity: [0.85, 1, 0.85] }} transition={{ duration: 2, repeat: Infinity }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={i}
                className={`absolute h-2 w-2 rounded-full ${i === 2 ? "bg-red-400 shadow-[0_0_8px_#f87171]" : "bg-emerald-400 shadow-[0_0_6px_#34d399]"}`}
                style={{ left: `${15 + i * 16}%`, top: `${25 + (i % 3) * 20}%` }}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    );
  }

  const govKpis = [
    { label: "Compliance", pct: 94 },
    { label: "Budget", pct: 78 },
    { label: "Projects", pct: 86 },
    { label: "Citizens", pct: 91 },
  ];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="flex h-full flex-col gap-2 p-3"
    >
      <motion.div
        className="grid grid-cols-4 gap-1.5"
        animate={{ opacity: [0.9, 1, 0.9] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {govKpis.map((k, i) => (
          <motion.div
            key={k.label}
            className={`p-1.5 ${panel}`}
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }}
          >
            <p className="text-[5px] text-slate-500 uppercase">{k.label}</p>
            <motion.p
              className="font-[family-name:var(--font-orbitron)] text-[9px] font-bold text-cyan-300"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
            >
              {k.pct}%
            </motion.p>
            <div className="mt-0.5 h-0.5 overflow-hidden rounded bg-slate-800">
              <motion.div
                className="h-full rounded bg-gradient-to-r from-cyan-400 to-violet-500"
                animate={{ width: [`${k.pct - 5}%`, `${k.pct}%`, `${k.pct - 5}%`] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
      <motion.div
        className="flex flex-1 flex-col gap-1 rounded border border-violet-400/25 bg-slate-950/60 p-2"
        animate={{ opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        <p className="font-[family-name:var(--font-orbitron)] text-[6px] text-violet-400 uppercase">Executive Overview</p>
        <div className="flex flex-1 items-end gap-1">
          {[40, 65, 45, 80, 55, 70, 90, 60].map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-t bg-gradient-to-t from-violet-600 via-cyan-500 to-cyan-300"
              animate={{ height: [`${h}%`, `${h + 12}%`, `${h}%`] }}
              transition={{ duration: 1.2 + i * 0.1, repeat: Infinity }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Showcase() {
  return (
    <section id="solutions" className="section-dark section-below-fold relative section-padding overflow-hidden">
      <motion.div
        className="absolute inset-0 gradient-mesh-future opacity-55"
        animate={{ opacity: [0.45, 0.6, 0.45] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-0 grid-future opacity-30"
        animate={{ opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -right-32 top-1/4 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl"
        animate={{ x: [0, -30, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -left-32 bottom-1/4 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl"
        animate={{ x: [0, 30, 0], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"
        animate={{ opacity: [0.2, 0.7, 0.2], scaleX: [0.8, 1, 0.8] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
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
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: index * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="card-future group overflow-hidden rounded-2xl"
            >
              <div className={`relative h-52 overflow-hidden bg-gradient-to-br ${project.gradient} border-b border-cyan-400/10`}>
                <ProjectVisual visual={project.visual} />
              </div>
              <motion.div
                className="p-6"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + index * 0.08, duration: 0.5 }}
              >
                <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-slate-100">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{project.description}</p>
                <Link
                  href={projectInquiryHref(project.title)}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 transition hover:text-cyan-300"
                >
                  Request Demo
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </motion.article>
          ))}
        </div>

        <motion.div
          className="mt-6 grid gap-6 md:grid-cols-2"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.12 } },
          }}
        >
          {SHOWCASE_PROJECTS.slice(3).map((project, index) => (
            <motion.article
              key={project.title}
              variants={{ hidden: { opacity: 0, x: index % 2 === 0 ? -24 : 24 }, show: { opacity: 1, x: 0 } }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="card-future flex overflow-hidden rounded-2xl"
            >
              <div className={`relative w-2/5 min-h-[180px] overflow-hidden bg-gradient-to-br ${project.gradient}`}>
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
        </motion.div>
      </div>
    </section>
  );
}
