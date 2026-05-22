"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WHY_FEATURES } from "@/lib/constants";

export function WhyCoreLogic() {
  return (
    <section id="about" className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 gradient-mesh" />
      <div className="relative mx-auto max-w-[1600px]">
        <SectionHeading
          title="Why CoreLogic"
          subtitle="Built for organizations that demand AI-first engineering, security, and mission-critical reliability."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.article
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (index % 4) * 0.08 }}
                whileHover={{ y: -6 }}
                className="glass-panel group rounded-xl p-6 transition-all hover:shadow-[0_0_40px_rgba(0,245,255,0.08)]"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-[#00F5FF]/10 text-[#00F5FF] transition-colors group-hover:bg-[#00F5FF]/20">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-[family-name:var(--font-space-grotesk)] text-base font-semibold text-[#F8FAFC]">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#94A3B8]">
                  {feature.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
