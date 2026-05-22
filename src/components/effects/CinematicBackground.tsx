"use client";

import { motion } from "framer-motion";
import { ParticleField } from "@/components/effects/ParticleField";
import { NeuralBackground } from "@/components/effects/NeuralBackground";

export function CinematicBackground({ intense = false }: { intense?: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-gradient-to-br from-[#e8f4fc] via-[#f5faff] to-[#eef2ff]" />
      <div className="absolute inset-0 gradient-mesh-future" />
      <div className="absolute inset-0 grid-future opacity-70" />
      <div className="absolute inset-0 scanline-light" />

      {/* Holographic orbs */}
      <motion.div
        className="absolute -left-20 top-[15%] h-[55vh] w-[55vh] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(0,212,255,0.35) 0%, rgba(0,212,255,0.05) 45%, transparent 70%)",
        }}
        animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-24 top-[5%] h-[50vh] w-[50vh] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.3) 0%, rgba(99,102,241,0.08) 50%, transparent 70%)",
        }}
        animate={{ x: [0, -40, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Rotating holographic ring */}
      <motion.div
        className="absolute top-1/2 left-1/2 h-[min(90vw,700px)] w-[min(90vw,700px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/20"
        style={{
          boxShadow: "0 0 80px rgba(0,212,255,0.1), inset 0 0 60px rgba(0,212,255,0.05)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 h-[min(70vw,520px)] w-[min(70vw,520px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-400/15 border-dashed"
        animate={{ rotate: -360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />

      {intense && (
        <>
          {/* Data towers */}
          {Array.from({ length: 14 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute bottom-0 w-px bg-gradient-to-t from-cyan-400/70 via-sky-400/30 to-transparent"
              style={{
                left: `${5 + i * 6.5}%`,
                height: `${20 + (i % 6) * 8}%`,
              }}
              animate={{ opacity: [0.2, 0.9, 0.2], scaleY: [0.9, 1, 0.9] }}
              transition={{ duration: 1.8 + (i % 5) * 0.3, repeat: Infinity, delay: i * 0.1 }}
            />
          ))}
          {/* HUD scan beam */}
          <div className="absolute inset-0 overflow-hidden opacity-[0.06]">
            <div
              className="h-40 w-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent"
              style={{ animation: "hud-scan 10s linear infinite" }}
            />
          </div>
        </>
      )}

      <ParticleField />
      <NeuralBackground />
    </div>
  );
}
