"use client";

import { useEffect, useState } from "react";
import { getPerformanceTier, deferNonCritical, type PerformanceTier } from "@/lib/performance";
import { ParticleField } from "@/components/effects/ParticleField";
import { NeuralBackground } from "@/components/effects/NeuralBackground";

export function CinematicBackground({ intense = false }: { intense?: boolean }) {
  const [tier, setTier] = useState<PerformanceTier>("lite");
  const [canvasReady, setCanvasReady] = useState(false);

  useEffect(() => {
    setTier(getPerformanceTier());
    return deferNonCritical(() => setCanvasReady(true));
  }, []);

  const showCanvas = canvasReady && tier === "full";
  const towerCount = intense ? (tier === "full" ? 10 : 0) : 0;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-gradient-to-br from-[#060a14] via-[#0a1020] to-[#0d1528]" />
      <div className="absolute inset-0 gradient-mesh-future" />
      <div className="absolute inset-0 grid-future opacity-60" />
      {tier === "full" && <div className="absolute inset-0 scanline-light" />}

      <div className="bg-orb-cyan absolute -left-20 top-[15%] h-[55vh] w-[55vh] rounded-full" />
      <div className="bg-orb-violet absolute -right-24 top-[5%] h-[50vh] w-[50vh] rounded-full" />

      <div className="ring-orbit-slow absolute top-1/2 left-1/2 h-[min(90vw,700px)] w-[min(90vw,700px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/20" />
      {tier === "full" && (
        <div className="ring-orbit-reverse absolute top-1/2 left-1/2 h-[min(70vw,520px)] w-[min(70vw,520px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-400/20 border-dashed" />
      )}

      {towerCount > 0 &&
        Array.from({ length: towerCount }).map((_, i) => (
          <div
            key={i}
            className="data-tower absolute bottom-0 w-px bg-gradient-to-t from-cyan-400/80 via-sky-400/40 to-transparent"
            style={{
              left: `${6 + i * 9}%`,
              height: `${20 + (i % 5) * 10}%`,
              animationDelay: `${i * 0.12}s`,
            }}
          />
        ))}

      {intense && tier === "full" && (
        <div className="absolute inset-0 overflow-hidden opacity-[0.1]">
          <div
            className="h-48 w-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent"
            style={{ animation: "hud-scan 8s linear infinite" }}
          />
        </div>
      )}

      {showCanvas && (
        <>
          <ParticleField />
          <NeuralBackground />
        </>
      )}
    </div>
  );
}
