"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import gsap from "gsap";
import { Activity, ArrowRight, Shield, Sparkles } from "lucide-react";
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
  const heroRef = useRef<HTMLElement>(null);
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
        setSystemLabel("Connecting...");
      }
    };
    fetchHealth();
    const interval = setInterval(fetchHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-reveal", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.2,
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative flex min-h-screen items-center overflow-hidden pt-24">
      <CinematicBackground intense />

      <div className="section-padding relative z-10 mx-auto grid w-full max-w-[1600px] gap-12 lg:grid-cols-2 lg:gap-16 lg:py-28">
        <div className="flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="hero-reveal mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-sky-200 bg-white/80 px-4 py-2 shadow-sm"
          >
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-500" />
            <span className="text-xs font-semibold tracking-wider text-sky-700 uppercase">
              {systemLabel}
            </span>
          </motion.div>

          <h1 className="hero-reveal font-[family-name:var(--font-space-grotesk)] text-4xl font-bold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl xl:text-7xl">
            Engineering Intelligent{" "}
            <span className="text-gradient">Digital Infrastructure</span>
          </h1>

          <p className="hero-reveal mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
            Enterprise software, AI systems, smart governance platforms, and cloud
            infrastructure — built for organizations that demand excellence.
          </p>

          <div className="hero-reveal mt-10 flex flex-wrap gap-4">
            <Link href="#solutions" className="btn-primary group">
              Explore Solutions
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href={CONTACT_HREF} className="btn-secondary">
              Start a Project
            </Link>
          </div>

          <div className="hero-reveal mt-14 grid grid-cols-3 gap-6 border-t border-sky-100 pt-10">
            {HERO_STATS.map((stat) => (
              <div key={stat.label}>
                <p className="font-[family-name:var(--font-orbitron)] text-2xl font-bold text-sky-600 md:text-3xl">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    decimals={stat.suffix === "%" ? 2 : 0}
                  />
                </p>
                <p className="mt-1 text-xs font-medium text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-reveal relative flex items-center justify-center lg:justify-end">
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="card-elevated relative w-full max-w-md rounded-3xl border-2 border-sky-100 bg-white p-6 shadow-2xl shadow-sky-500/15 md:p-8"
          >
            <div className="mb-6 flex items-center justify-between border-b border-sky-100 pb-4">
              <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">
                Live Platform
              </span>
              <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-2 py-1">
                <Activity className="h-4 w-4 text-emerald-600" />
                <span className="text-xs font-semibold text-emerald-700">Live</span>
              </div>
            </div>

            <div className="mb-8 text-center">
              <p className="text-sm font-medium text-slate-500">Platform Uptime</p>
              <p className="font-[family-name:var(--font-orbitron)] text-5xl font-bold text-sky-600 md:text-6xl">
                <AnimatedCounter value={health?.uptime ?? 99.99} suffix="%" decimals={2} />
              </p>
            </div>

            <div className="space-y-3">
              {HERO_INDICATORS.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.12 }}
                  className="flex items-center gap-3 rounded-xl border border-sky-100 bg-sky-50/50 px-4 py-3"
                >
                  {i === 0 && <Sparkles className="h-5 w-5 text-sky-500" />}
                  {i === 1 && <Shield className="h-5 w-5 text-indigo-500" />}
                  {i === 2 && <Activity className="h-5 w-5 text-emerald-500" />}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-800">{item.label}</p>
                    <p className="text-xs font-medium text-emerald-600 capitalize">
                      {health?.services
                        ? i === 0
                          ? health.services.ai
                          : i === 1
                            ? health.services.security
                            : health.services.cloud
                        : item.status}
                    </p>
                  </div>
                  <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                </motion.div>
              ))}
            </div>

            <div className="mt-6 h-24 overflow-hidden rounded-xl border border-sky-100 bg-slate-50">
              <div className="flex h-full items-end gap-1 px-3 pb-2">
                {BAR_HEIGHTS.map((h, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 rounded-t bg-gradient-to-t from-sky-300 to-sky-500"
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
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center gap-2 text-slate-400"
        >
          <span className="text-[10px] font-medium tracking-widest uppercase">Scroll</span>
          <div className="h-8 w-px bg-gradient-to-b from-sky-400 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
