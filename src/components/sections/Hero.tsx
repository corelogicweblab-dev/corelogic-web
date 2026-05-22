"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import gsap from "gsap";
import { Activity, ArrowRight, Shield, Sparkles } from "lucide-react";
import { CinematicBackground } from "@/components/effects/CinematicBackground";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { HERO_INDICATORS, HERO_STATS } from "@/lib/constants";
import { MAILTO_LINK } from "@/lib/site-config";

const BAR_HEIGHTS = [45, 72, 38, 85, 55, 68, 42, 78, 50, 90, 35, 62, 48, 75, 58, 82, 40, 70, 52, 88, 44, 65, 36, 80];

interface HealthData {
  status: string;
  uptime: number;
  services: { ai: string; security: string; cloud: string };
}

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [health, setHealth] = useState<HealthData | null>(null);
  const [systemLabel, setSystemLabel] = useState("Systems Online");

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const res = await fetch("/api/health");
        if (res.ok) {
          const data = (await res.json()) as HealthData;
          setHealth(data);
          setSystemLabel(data.status === "online" ? "Systems Online" : "Systems Degraded");
        }
      } catch {
        setSystemLabel("Systems Checking...");
      }
    };
    fetchHealth();
    const interval = setInterval(fetchHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-reveal", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.3,
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen items-center overflow-hidden pt-24"
    >
      <CinematicBackground intense />

      <div className="section-padding relative z-10 mx-auto grid w-full max-w-[1600px] gap-12 lg:grid-cols-2 lg:gap-16 lg:py-32">
        <div className="flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="hero-reveal mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-[#00F5FF]/20 bg-[#0B1120]/60 px-4 py-1.5 backdrop-blur-sm"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#00FFB3]" />
            <span className="font-[family-name:var(--font-orbitron)] text-[10px] tracking-[0.2em] text-[#94A3B8] uppercase">
              {systemLabel}
            </span>
          </motion.div>

          <h1 className="hero-reveal font-[family-name:var(--font-space-grotesk)] text-4xl font-bold leading-[1.1] tracking-tight text-[#F8FAFC] sm:text-5xl lg:text-6xl xl:text-7xl">
            Engineering Intelligent{" "}
            <span className="text-gradient">Digital Infrastructure</span>
          </h1>

          <p className="hero-reveal mt-6 max-w-xl text-base leading-relaxed text-[#94A3B8] md:text-lg">
            Enterprise software, AI systems, smart governance platforms, cloud
            infrastructure, and next-generation digital experiences.
          </p>

          <div className="hero-reveal mt-10 flex flex-wrap gap-4">
            <Link
              href="#solutions"
              className="group inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#00F5FF] to-[#38BDF8] px-7 py-3.5 text-sm font-semibold text-[#050816] transition-all hover:shadow-[0_0_40px_rgba(0,245,255,0.4)]"
            >
              Explore Solutions
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href={MAILTO_LINK}
              className="inline-flex items-center gap-2 rounded-lg border border-[#00F5FF]/30 bg-[#0B1120]/50 px-7 py-3.5 text-sm font-medium text-[#F8FAFC] backdrop-blur-sm transition-all hover:border-[#00F5FF]/60 hover:bg-[#00F5FF]/10"
            >
              Start a Project
            </a>
          </div>

          <div className="hero-reveal mt-14 grid grid-cols-3 gap-6 border-t border-[#00F5FF]/10 pt-10">
            {HERO_STATS.map((stat) => (
              <div key={stat.label}>
                <p className="font-[family-name:var(--font-orbitron)] text-2xl font-bold text-[#00F5FF] md:text-3xl">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    decimals={stat.suffix === "%" ? 2 : 0}
                  />
                </p>
                <p className="mt-1 text-xs text-[#94A3B8]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-reveal relative flex items-center justify-center lg:justify-end">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="glass-panel glow-cyan glow-border relative w-full max-w-md rounded-2xl p-6 md:p-8"
          >
            <div className="mb-6 flex items-center justify-between border-b border-[#00F5FF]/10 pb-4">
              <span className="font-[family-name:var(--font-orbitron)] text-xs tracking-widest text-[#94A3B8] uppercase">
                System HUD
              </span>
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-[#00FFB3]" />
                <span className="text-xs text-[#00FFB3]">Live</span>
              </div>
            </div>

            <div className="mb-8 text-center">
              <p className="text-sm text-[#94A3B8]">Platform Uptime</p>
              <p className="font-[family-name:var(--font-orbitron)] text-5xl font-bold text-[#00F5FF] md:text-6xl">
                <AnimatedCounter
                  value={health?.uptime ?? 99.99}
                  suffix="%"
                  decimals={2}
                />
              </p>
            </div>

            <div className="space-y-3">
              {HERO_INDICATORS.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.15 }}
                  className="flex items-center gap-3 rounded-xl border border-[#00F5FF]/10 bg-[#050816]/50 px-4 py-3"
                >
                  {i === 0 && <Sparkles className="h-5 w-5 shrink-0 text-[#00F5FF]" />}
                  {i === 1 && <Shield className="h-5 w-5 shrink-0 text-[#38BDF8]" />}
                  {i === 2 && <Activity className="h-5 w-5 shrink-0 text-[#00FFB3]" />}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-[#F8FAFC]">
                      {item.label}
                    </p>
                    <p className="text-xs text-[#00FFB3] capitalize">
                      {health?.services
                        ? (i === 0
                            ? health.services.ai
                            : i === 1
                              ? health.services.security
                              : health.services.cloud)
                        : item.status}
                    </p>
                  </div>
                  <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-[#00FFB3]" />
                </motion.div>
              ))}
            </div>

            <div className="mt-6 h-24 overflow-hidden rounded-lg border border-[#00F5FF]/10 bg-[#050816]/80">
              <div className="flex h-full items-end gap-1 px-3 pb-2">
                {BAR_HEIGHTS.map((h, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 rounded-t bg-gradient-to-t from-[#00F5FF]/20 to-[#00F5FF]"
                    animate={{ height: [`${h}%`, `${Math.max(25, h - 15)}%`] }}
                    transition={{
                      duration: 1.2 + (i % 5) * 0.2,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          <div className="absolute -top-8 -right-4 h-32 w-32 rounded-full bg-[#7C3AED]/20 blur-3xl" />
          <div className="absolute -bottom-8 -left-4 h-40 w-40 rounded-full bg-[#00F5FF]/15 blur-3xl" />
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center gap-2 text-[#94A3B8]"
        >
          <span className="text-[10px] tracking-widest uppercase">Scroll</span>
          <div className="h-10 w-px bg-gradient-to-b from-[#00F5FF] to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
