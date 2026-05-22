"use client";

import { motion } from "framer-motion";
import { ParticleField } from "@/components/effects/ParticleField";
import { NeuralBackground } from "@/components/effects/NeuralBackground";

export function CinematicBackground({ intense = false }: { intense?: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-gradient-to-br from-[#060a14] via-[#0a1020] to-[#0d1528]" />
      <div className="absolute inset-0 gradient-mesh-future" />
      <div className="absolute inset-0 grid-future opacity-80" />
      <div className="absolute inset-0 scanline-light" />

      <motion.div
        className="absolute -left-20 top-[15%] h-[55vh] w-[55vh] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(0,212,255,0.25) 0%, rgba(0,212,255,0.04) 45%, transparent 70%)",
        }}
        animate={{ x: [0, 60, 0], y: [0, 40, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-24 top-[5%] h-[50vh] w-[50vh] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.22) 0%, rgba(99,102,241,0.06) 50%, transparent 70%)",
        }}
        animate={{ x: [0, -50, 0], scale: [1, 1.12, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[10%] left-[30%] h-[40vh] w-[40vh] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(14,165,233,0.15), transparent 65%)",
        }}
        animate={{ y: [0, -30, 0], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute top-1/2 left-1/2 h-[min(90vw,700px)] w-[min(90vw,700px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/25"
        style={{
          boxShadow: "0 0 100px rgba(0,212,255,0.12), inset 0 0 80px rgba(0,212,255,0.06)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 h-[min(70vw,520px)] w-[min(70vw,520px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-400/20 border-dashed"
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 h-[min(50vw,380px)] w-[min(50vw,380px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-500/10"
        animate={{ rotate: 360, scale: [1, 1.05, 1] }}
        transition={{
          rotate: { duration: 30, repeat: Infinity, ease: "linear" },
          scale: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      {intense && (
        <>
          {Array.from({ length: 18 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute bottom-0 w-px bg-gradient-to-t from-cyan-400/80 via-sky-400/40 to-transparent"
              style={{
                left: `${4 + i * 5.5}%`,
                height: `${18 + (i % 7) * 9}%`,
              }}
              animate={{ opacity: [0.15, 1, 0.15], scaleY: [0.85, 1.1, 0.85] }}
              transition={{ duration: 1.5 + (i % 5) * 0.25, repeat: Infinity, delay: i * 0.08 }}
            />
          ))}
          <div className="absolute inset-0 overflow-hidden opacity-[0.12]">
            <div
              className="h-48 w-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent"
              style={{ animation: "hud-scan 8s linear infinite" }}
            />
          </div>
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={`hex-${i}`}
              className="absolute h-3 w-3 rotate-45 border border-cyan-400/30 bg-cyan-400/10"
              style={{
                left: `${15 + i * 14}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </>
      )}

      <ParticleField />
      <NeuralBackground />
    </div>
  );
}
