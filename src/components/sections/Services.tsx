"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SERVICES } from "@/lib/constants";

export function Services() {
  return (
    <section id="services" className="section-dark relative section-padding overflow-hidden">
      <div className="absolute inset-0 gradient-mesh-future opacity-60" />
      <div className="absolute inset-0 grid-future opacity-40" />
      <div className="relative mx-auto max-w-[1600px]">
        <SectionHeading
          title="Our Services"
          subtitle="Next-generation systems engineered for enterprise and government scale."
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.06 } },
          }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
        >
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.title}
                variants={{ hidden: { opacity: 0, y: 32, rotateX: 8 }, show: { opacity: 1, y: 0, rotateX: 0 } }}
                whileHover={{ y: -8, transition: { duration: 0.25 } }}
                className="card-future group rounded-2xl p-6"
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-violet-500/20 text-cyan-400 ring-1 ring-cyan-400/30 transition-all group-hover:from-cyan-400 group-hover:to-violet-500 group-hover:text-white group-hover:shadow-[0_0_28px_rgba(0,212,255,0.5)]"
                >
                  <Icon className="h-6 w-6" />
                </motion.div>
                <h3 className="font-[family-name:var(--font-space-grotesk)] text-sm font-bold leading-snug text-slate-100">
                  {service.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">{service.description}</p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
