"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SERVICES } from "@/lib/constants";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Services() {
  return (
    <section id="services" className="relative section-padding">
      <div className="absolute inset-0 bg-[#0B1120]/50" />
      <div className="relative mx-auto max-w-[1600px]">
        <SectionHeading
          title="Our Services"
          subtitle="Innovative solutions for a digital world — engineered for enterprise and government scale."
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
        >
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.title}
                variants={item}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative overflow-hidden rounded-xl border border-[#00F5FF]/10 bg-[#0B1120]/60 p-6 backdrop-blur-sm transition-all duration-300 hover:border-[#00F5FF]/40 hover:shadow-[0_0_40px_rgba(0,245,255,0.12)]"
              >
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#00F5FF]/5 blur-2xl transition-all group-hover:bg-[#00F5FF]/15" />
                <div className="relative mb-4 flex h-12 w-12 items-center justify-center rounded-lg border border-[#00F5FF]/20 bg-[#050816]/80 text-[#00F5FF] transition-colors group-hover:border-[#00F5FF]/50 group-hover:shadow-[0_0_20px_rgba(0,245,255,0.2)]">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="relative font-[family-name:var(--font-space-grotesk)] text-sm font-semibold leading-snug text-[#F8FAFC]">
                  {service.title}
                </h3>
                <p className="relative mt-2 text-xs leading-relaxed text-[#94A3B8]">
                  {service.description}
                </p>
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-[#00F5FF] to-[#7C3AED] transition-all duration-300 group-hover:w-full" />
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
