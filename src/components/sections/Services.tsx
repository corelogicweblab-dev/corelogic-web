"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SERVICES } from "@/lib/constants";

export function Services() {
  return (
    <section id="services" className="relative section-padding bg-gradient-to-b from-white to-sky-50/50">
      <div className="relative mx-auto max-w-[1600px]">
        <SectionHeading
          title="Our Services"
          subtitle="Innovative solutions engineered for enterprise and government scale."
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
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 },
                }}
                className="card-elevated group rounded-2xl p-6"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-sky-100 to-indigo-100 text-sky-600 transition group-hover:from-sky-500 group-hover:to-cyan-500 group-hover:text-white">
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
