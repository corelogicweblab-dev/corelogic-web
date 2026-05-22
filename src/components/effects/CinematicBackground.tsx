"use client";

import { motion } from "framer-motion";
import { ParticleField } from "@/components/effects/ParticleField";
import { NeuralBackground } from "@/components/effects/NeuralBackground";

export function CinematicBackground({ intense = false }: { intense?: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-gradient-to-b from-sky-50 via-white to-sky-50/80" />
      <div className="absolute inset-0 gradient-mesh-light" />
      <div className="absolute inset-0 grid-overlay-light opacity-60" />

      <motion.div
        className="absolute -top-20 left-[10%] h-[50vh] w-[50vh] rounded-full bg-sky-300/30 blur-3xl"
        animate={{ x: [0, 40, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[5%] right-[5%] h-[45vh] w-[45vh] rounded-full bg-indigo-300/25 blur-3xl"
        animate={{ x: [0, -30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {intense &&
        Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute bottom-0 w-1 rounded-t-full bg-gradient-to-t from-sky-400/60 to-transparent"
            style={{ left: `${10 + i * 11}%`, height: `${25 + (i % 4) * 10}%` }}
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2 + i * 0.2, repeat: Infinity }}
          />
        ))}

      <ParticleField />
      <NeuralBackground />
    </div>
  );
}
