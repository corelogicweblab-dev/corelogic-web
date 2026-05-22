"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Activity, ArrowRight, Shield, Sparkles } from "lucide-react";
import { deferNonCritical } from "@/lib/performance";
import { CinematicBackground } from "@/components/effects/CinematicBackground";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { HERO_INDICATORS, HERO_STATS } from "@/lib/constants";
import { CONTACT_HREF } from "@/lib/site-config";

const BAR_HEIGHTS = [45, 72, 38, 85, 55, 68, 42, 78, 50, 90, 35, 62, 48, 75, 58, 82, 40, 70, 52, 88, 44, 65, 36, 80];

interface HealthData {
  status: string;
  uptime: number;
  services: { ai: string; security: string; cloud: string };
}

export function Hero() {
  const [health, setHealth] = useState<HealthData | null>(null);
  const [systemLabel, setSystemLabel] = useState("All Systems Online");

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const res = await fetch("/api/health");
        if (res.ok) {
          const data = (await res.json()) as HealthData;
          setHealth(data);
          setSystemLabel(data.status === "online" ? "All Systems Online" : "Systems Check");
        }
      } catch {
        setSystemLabel("All Systems Online");
      }
    };

    const cancel = deferNonCritical(fetchHealth, 1500);
    const interval = window.setInterval(fetchHealth, 60000);
    return () => {
      cancel?.();
      clearInterval(interval);
    };
  }, []);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-24">
      <CinematicBackground intense />

      <div className="section-padding relative z-10 mx-auto grid w-full max-w-[1600px] gap-12 lg:grid-cols-2 lg:gap-16 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col justify-center"
        >
          <div className="badge-future">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500" />
            </span>
            {systemLabel}
          </div>

          <h1 className="text-glow mt-0 font-[family-name:var(--font-space-grotesk)] text-4xl font-bold leading-[1.05] tracking-tight text-[#e8f4ff] sm:text-5xl lg:text-6xl xl:text-7xl">
            Engineering Intelligent{" "}
            <span className="text-gradient">Digital Infrastructure</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400">
            Enterprise software, AI systems, smart governance platforms, and cloud
            infrastructure — built for organizations that demand excellence.
          </p>

          <div className="mt-8 h-px w-24 bg-gradient-to-r from-cyan-400 to-violet-500" />

          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="#solutions" className="btn-primary group">
              Explore Solutions
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href={CONTACT_HREF} className="btn-secondary">
              Start a Project
            </Link>
          </div>

          <div className="mt-14 grid grid-cols-3 gap-6 border-t border-cyan-400/20 pt-10">
            {HERO_STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + i * 0.15 }}
              >
                <p className="font-[family-name:var(--font-orbitron)] text-2xl font-bold text-cyan-400 md:text-3xl drop-shadow-[0_0_16px_rgba(0,212,255,0.5)]">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    decimals={stat.suffix === "%" ? 2 : 0}
                  />
                </p>
                <p className="mt-1 text-xs font-medium text-slate-500">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex items-center justify-center lg:justify-end"
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="holo-glass hud-corners relative w-full max-w-md rounded-2xl p-6 md:p-8"
          >
            <div className="mb-6 flex items-center justify-between border-b border-cyan-400/20 pb-4">
              <span className="font-[family-name:var(--font-orbitron)] text-[10px] font-bold tracking-[0.2em] text-cyan-400 uppercase">
                System HUD
              </span>
              <motion.div
                animate={{ boxShadow: ["0 0 8px rgba(0,212,255,0.3)", "0 0 20px rgba(0,212,255,0.6)", "0 0 8px rgba(0,212,255,0.3)"] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex items-center gap-2 rounded border border-cyan-400/40 bg-cyan-400/10 px-2 py-1"
              >
                <Activity className="h-3.5 w-3.5 text-cyan-400" />
                <span className="font-[family-name:var(--font-orbitron)] text-[10px] font-bold text-cyan-400 uppercase">
                  Live
                </span>
              </motion.div>
            </div>

            <div className="mb-8 text-center">
              <p className="font-[family-name:var(--font-orbitron)] text-[10px] tracking-widest text-slate-500 uppercase">
                Platform Uptime
              </p>
              <p className="font-[family-name:var(--font-orbitron)] text-5xl font-bold text-cyan-400 drop-shadow-[0_0_24px_rgba(0,212,255,0.55)] md:text-6xl">
                <AnimatedCounter value={health?.uptime ?? 99.99} suffix="%" decimals={2} />
              </p>
            </div>

            <div className="space-y-3">
              {HERO_INDICATORS.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + i * 0.15 }}
                  whileHover={{ x: 4, borderColor: "rgba(0,212,255,0.4)" }}
                  className="flex items-center gap-3 rounded-lg border border-cyan-400/15 bg-cyan-950/30 px-4 py-3 backdrop-blur-sm"
                >
                  {i === 0 && <Sparkles className="h-5 w-5 text-cyan-400 drop-shadow-[0_0_8px_rgba(0,212,255,0.6)]" />}
                  {i === 1 && <Shield className="h-5 w-5 text-violet-400" />}
                  {i === 2 && <Activity className="h-5 w-5 text-cyan-500" />}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-200">{item.label}</p>
                    <p className="font-[family-name:var(--font-orbitron)] text-[10px] font-semibold text-cyan-500 uppercase capitalize">
                      {health?.services
                        ? i === 0
                          ? health.services.ai
                          : i === 1
                            ? health.services.security
                            : health.services.cloud
                        : item.status}
                    </p>
                  </div>
                  <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400 shadow-[0_0_8px_#00d4ff]" />
                </motion.div>
              ))}
            </div>

            <div className="mt-6 h-24 overflow-hidden rounded-lg border border-cyan-400/20 bg-black/30">
              <div className="flex h-full items-end gap-0.5 px-3 pb-2">
                {BAR_HEIGHTS.slice(0, 12).map((h, i) => (
                  <div
                    key={i}
                    className="hud-bar flex-1 rounded-t bg-gradient-to-t from-cyan-600 via-cyan-400 to-violet-400 shadow-[0_0_12px_rgba(0,212,255,0.5)]"
                    style={
                      {
                        "--bar-h": `${h}%`,
                        animationDelay: `${i * 0.08}s`,
                      } as CSSProperties
                    }
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-[family-name:var(--font-orbitron)] text-[10px] tracking-[0.3em] text-cyan-500/80 uppercase">
            Scroll
          </span>
          <motion.div
            animate={{ scaleY: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="h-10 w-px bg-gradient-to-b from-cyan-400 to-transparent shadow-[0_0_8px_#00d4ff]"
          />
        </motion.div>
      </div>
    </section>
  );
}
