"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WHY_FEATURES } from "@/lib/constants";

export function WhyCoreLogic() {
  return (
    <section id="about" className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 gradient-mesh-future opacity-35" />
      <div className="relative mx-auto max-w-[1600px]">
        <SectionHeading
          title="Why CoreLogic"
          subtitle="AI-first engineering, security, and mission-critical reliability."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.article
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (index % 4) * 0.06 }}
                className="card-future rounded-2xl p-6"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-sky-100 text-sky-600">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-[family-name:var(--font-space-grotesk)] text-base font-bold text-slate-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{feature.description}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
