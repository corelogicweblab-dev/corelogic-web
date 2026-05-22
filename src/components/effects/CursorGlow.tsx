"use client";

import { useEffect, useSyncExternalStore } from "react";
import { motion, useSpring } from "framer-motion";

function subscribePointer(callback: () => void) {
  const mq = window.matchMedia("(pointer: fine)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getPointerSnapshot() {
  return window.matchMedia("(pointer: fine)").matches;
}

function getServerPointerSnapshot() {
  return false;
}

export function CursorGlow() {
  const enabled = useSyncExternalStore(
    subscribePointer,
    getPointerSnapshot,
    getServerPointerSnapshot
  );
  const spring = { stiffness: 150, damping: 20 };
  const x = useSpring(0, spring);
  const y = useSpring(0, spring);

  useEffect(() => {
    if (!enabled) return;
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block"
      style={{ x, y, translateX: "-50%", translateY: "-50%" }}
    >
      <div className="h-72 w-72 rounded-full bg-cyan-400/15 blur-[90px]" />
      <div className="absolute top-1/2 left-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-400/10 blur-[60px]" />
      <div className="absolute top-1/2 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/50 bg-cyan-400/20 shadow-[0_0_12px_rgba(0,212,255,0.5)]" />
    </motion.div>
  );
}
