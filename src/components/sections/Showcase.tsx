"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectVisual } from "@/components/sections/ProjectVisual";
import { SHOWCASE_PROJECTS } from "@/lib/constants";

function projectInquiryHref(title: string) {
  return `/?project=${encodeURIComponent(title)}#contact`;
}

export function Showcase() {
  return (
    <section id="solutions" className="section-dark section-below-fold relative section-padding overflow-hidden">
      <div className="section-ambient absolute inset-0 gradient-mesh-future opacity-55" />
      <div className="section-ambient absolute inset-0 grid-future opacity-30" />
      <div className="pointer-events-none absolute -right-32 top-1/4 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl anim-orb-drift-a" />
      <div className="pointer-events-none absolute -left-32 bottom-1/4 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl anim-orb-drift-b" />

      <div className="relative mx-auto max-w-[1600px]">
        <SectionHeading
          title="Featured Solutions"
          subtitle="Advanced platforms we build for governments, enterprises, and mission-critical operations."
        />

        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {SHOWCASE_PROJECTS.slice(0, 3).map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8 }}
              className="card-future card-smooth-hover group overflow-hidden rounded-2xl"
            >
              <div className={`relative h-52 overflow-hidden bg-gradient-to-br ${project.gradient} border-b border-cyan-400/10`}>
                <ProjectVisual visual={project.visual} />
              </div>
              <div className="p-6">
                <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-slate-100">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{project.description}</p>
                <Link
                  href={projectInquiryHref(project.title)}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 transition-colors hover:text-cyan-300"
                >
                  Request Demo
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          className="mt-6 grid gap-6 md:grid-cols-2"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
        >
          {SHOWCASE_PROJECTS.slice(3).map((project, index) => (
            <motion.article
              key={project.title}
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
              whileHover={{ y: -6 }}
              className="card-future card-smooth-hover flex overflow-hidden rounded-2xl"
            >
              <div className={`relative w-2/5 min-h-[180px] overflow-hidden bg-gradient-to-br ${project.gradient}`}>
                <ProjectVisual visual={project.visual} />
              </div>
              <div className="flex flex-1 flex-col justify-center p-6">
                <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-slate-100">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm text-slate-400">{project.description}</p>
                <Link
                  href={projectInquiryHref(project.title)}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300"
                >
                  Request Demo
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
