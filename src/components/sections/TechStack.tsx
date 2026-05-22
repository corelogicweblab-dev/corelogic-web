"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TECH_STACK } from "@/lib/constants";

export function TechStack() {
  const categories = Object.entries(TECH_STACK);

  return (
    <section id="technology" className="relative section-padding">
      <div className="absolute inset-0 bg-[#0B1120]/40" />
      <div className="absolute inset-0 grid-overlay opacity-30" />
      <div className="relative mx-auto max-w-[1600px]">
        <SectionHeading
          title="Technology Stack"
          subtitle="Production-grade tools powering our AI infrastructure and enterprise delivery pipeline."
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {categories.map(([category, items], catIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.08 }}
              className="glass-panel glow-border rounded-2xl p-6"
            >
              <h3 className="font-[family-name:var(--font-orbitron)] text-xs tracking-[0.2em] text-[#00F5FF] uppercase">
                {category}
              </h3>
              <ul className="mt-5 flex flex-wrap gap-3">
                {items.map((tech, i) => (
                  <motion.li
                    key={tech}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: catIndex * 0.05 + i * 0.03 }}
                    whileHover={{ scale: 1.05 }}
                    className="rounded-lg border border-[#00F5FF]/15 bg-[#050816]/60 px-4 py-2 text-sm font-medium text-[#F8FAFC] transition-colors hover:border-[#00F5FF]/40 hover:bg-[#00F5FF]/10 hover:text-[#00F5FF]"
                  >
                    {tech}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
