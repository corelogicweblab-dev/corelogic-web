"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WHY_FEATURES } from "@/lib/constants";

export function WhyCoreLogic() {
  return (
    <section id="about" className="section-dark section-below-fold relative section-padding overflow-hidden">
      <div className="absolute inset-0 gradient-mesh-future opacity-50" />
      <div className="relative mx-auto max-w-[1600px]">
        <SectionHeading
          title="Why CoreLogic"
          subtitle="AI-first engineering, security, and mission-critical reliability."
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.08 } },
          }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {WHY_FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.article
                key={feature.title}
                variants={{ hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } }}
                whileHover={{ y: -6 }}
                className="card-future rounded-2xl p-6"
              >
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/15 text-cyan-400 ring-1 ring-cyan-400/30"
                >
                  <Icon className="h-5 w-5" />
                </motion.div>
                <h3 className="font-[family-name:var(--font-space-grotesk)] text-base font-bold text-slate-100">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{feature.description}</p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
