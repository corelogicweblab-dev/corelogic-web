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
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
      className={`mb-14 ${align === "center" ? "text-center" : "text-left"}`}
    >
      <p className="font-[family-name:var(--font-orbitron)] text-xs font-semibold tracking-[0.3em] text-sky-600 uppercase">
        CoreLogic Systems
      </p>
      <h2 className="mt-3 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
        {title}
      </h2>
      <p className="mt-4 max-w-2xl text-lg text-slate-600 mx-auto">{subtitle}</p>
      <div
        className={`mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-sky-400 to-indigo-500 ${
          align === "center" ? "mx-auto" : ""
        }`}
      />
    </motion.div>
  );
}
