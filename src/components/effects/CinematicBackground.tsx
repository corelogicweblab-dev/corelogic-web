"use client";

import { motion } from "framer-motion";
import { ParticleField } from "@/components/effects/ParticleField";
import { NeuralBackground } from "@/components/effects/NeuralBackground";

export function CinematicBackground({ intense = false }: { intense?: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* Deep base */}
      <div className="absolute inset-0 bg-[#050816]" />

      {/* City-energy light streaks */}
      <div
        className="absolute inset-0 opacity-40 mix-blend-screen"
        style={{
          backgroundImage: `
            linear-gradient(105deg, transparent 40%, rgba(0, 245, 255, 0.08) 48%, transparent 56%),
            linear-gradient(-75deg, transparent 30%, rgba(124, 58, 237, 0.12) 38%, transparent 46%),
            linear-gradient(90deg, transparent 60%, rgba(56, 189, 248, 0.06) 70%, transparent 80%)
          `,
          backgroundSize: "200% 100%",
          animation: "light-sweep 12s ease-in-out infinite",
        }}
      />

      {/* Aurora orbs */}
      <motion.div
        className="absolute -top-[20%] -left-[10%] h-[70vh] w-[70vh] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(0, 245, 255, 0.22) 0%, rgba(0, 245, 255, 0.05) 40%, transparent 70%)",
        }}
        animate={{ x: [0, 80, 0], y: [0, 40, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[10%] -right-[15%] h-[60vh] w-[60vh] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(124, 58, 237, 0.25) 0%, rgba(124, 58, 237, 0.06) 45%, transparent 70%)",
        }}
        animate={{ x: [0, -60, 0], y: [0, 50, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-[20%] h-[50vh] w-[80vw] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse, rgba(56, 189, 248, 0.15) 0%, transparent 65%)",
        }}
        animate={{ opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Horizon glow — smart-city skyline feel */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[45vh]"
        style={{
          background: `
            linear-gradient(to top, rgba(0, 245, 255, 0.12) 0%, transparent 55%),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 80px,
              rgba(0, 245, 255, 0.03) 80px,
              rgba(0, 245, 255, 0.03) 81px
            )
          `,
        }}
      />

      {/* Vertical data towers */}
      {intense &&
        Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute bottom-0 w-px bg-gradient-to-t from-[#00F5FF]/50 via-[#00F5FF]/20 to-transparent"
            style={{
              left: `${8 + i * 7.5}%`,
              height: `${30 + (i % 5) * 12}%`,
            }}
            animate={{ opacity: [0.2, 0.7, 0.2], scaleY: [0.85, 1, 0.85] }}
            transition={{
              duration: 2 + (i % 4) * 0.5,
              repeat: Infinity,
              delay: i * 0.15,
            }}
          />
        ))}

      <div className="absolute inset-0 grid-overlay opacity-[0.35]" />
      <ParticleField />
      <NeuralBackground />

      {/* Scan line */}
      <div className="absolute inset-0 overflow-hidden opacity-[0.04]">
        <div
          className="h-32 w-full bg-gradient-to-b from-transparent via-[#00F5FF] to-transparent"
          style={{ animation: "scanline 8s linear infinite" }}
        />
      </div>

      {/* Vignette + depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050816]/30 via-transparent to-[#050816]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050816_85%)]" />
    </div>
  );
}
