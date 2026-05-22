"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  id?: string;
  title: string;
  subtitle: string;
  align?: "left" | "center";
}

export function SectionHeading({
  id,
  title,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7 }}
      className={`mb-16 ${align === "center" ? "text-center" : "text-left"}`}
    >
      <p className="badge-future mx-auto w-fit">CoreLogic Systems</p>
      <h2 className="text-glow mt-5 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
        {title}
      </h2>
      <p className="mt-4 max-w-2xl text-lg text-slate-600 mx-auto">{subtitle}</p>
      <div
        className={`mt-6 flex items-center gap-3 ${align === "center" ? "justify-center" : ""}`}
      >
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-400" />
        <div className="h-2 w-2 rotate-45 border border-cyan-400 bg-cyan-400/30" />
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-violet-400" />
      </div>
    </motion.div>
  );
}
