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
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className={`mb-16 ${align === "center" ? "text-center" : "text-left"}`}
    >
      <motion.p
        initial={{ opacity: 0, letterSpacing: "0.35em" }}
        whileInView={{ opacity: 1, letterSpacing: "0.2em" }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="badge-future mx-auto w-fit"
      >
        CoreLogic Systems
      </motion.p>
      <h2 className="text-glow mt-5 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold tracking-tight text-[#e8f4ff] md:text-4xl lg:text-5xl">
        {title}
      </h2>
      <p className="mt-4 max-w-2xl text-lg text-slate-400 mx-auto">{subtitle}</p>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={`mt-6 flex items-center gap-3 ${align === "center" ? "justify-center" : ""}`}
      >
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-400" />
        <motion.div
          animate={{ rotate: [0, 90, 180, 270, 360] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="h-2 w-2 border border-cyan-400 bg-cyan-400/40"
        />
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-violet-400" />
      </motion.div>
    </motion.div>
  );
}
