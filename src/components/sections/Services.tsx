"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SERVICES } from "@/lib/constants";

export function Services() {
  return (
    <section id="services" className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 gradient-mesh-future opacity-40" />
      <div className="absolute inset-0 grid-future opacity-30" />
      <div className="relative mx-auto max-w-[1600px]">
        <SectionHeading
          title="Our Services"
          subtitle="Next-generation systems engineered for enterprise and government scale."
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.07 } },
          }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
        >
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.title}
                variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
                className="card-future group rounded-2xl p-6"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-violet-500/20 text-cyan-600 ring-1 ring-cyan-400/30 transition-all group-hover:from-cyan-400 group-hover:to-violet-500 group-hover:text-white group-hover:shadow-[0_0_24px_rgba(0,212,255,0.5)]">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-[family-name:var(--font-space-grotesk)] text-sm font-bold leading-snug text-slate-900">
                  {service.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">{service.description}</p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
