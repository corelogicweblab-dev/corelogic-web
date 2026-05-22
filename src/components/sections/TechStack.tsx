"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TECH_STACK } from "@/lib/constants";

export function TechStack() {
  const categories = Object.entries(TECH_STACK);

  return (
    <section id="technology" className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 grid-future opacity-25" />
      <div className="relative mx-auto max-w-[1600px]">
        <SectionHeading
          title="Technology Stack"
          subtitle="Production-grade tools powering our delivery pipeline."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map(([category, items], catIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.08 }}
              className="card-future holo-glass rounded-2xl p-6"
            >
              <h3 className="font-[family-name:var(--font-orbitron)] text-xs font-bold tracking-wider text-sky-600 uppercase">
                {category}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {items.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-lg border border-sky-100 bg-sky-50 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:border-sky-300 hover:bg-white hover:text-sky-700"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
