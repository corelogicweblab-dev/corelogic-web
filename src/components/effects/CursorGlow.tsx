"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
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
  const x = useSpring(0, { stiffness: 120, damping: 28, mass: 0.4 });
  const y = useSpring(0, { stiffness: 120, damping: 28, mass: 0.4 });
  const pending = useRef({ x: 0, y: 0 });
  const rafId = useRef(0);

  useEffect(() => {
    if (!enabled) return;

    const flush = () => {
      rafId.current = 0;
      x.set(pending.current.x);
      y.set(pending.current.y);
    };

    const move = (e: PointerEvent) => {
      pending.current = { x: e.clientX, y: e.clientY };
      if (!rafId.current) {
        rafId.current = requestAnimationFrame(flush);
      }
    };

    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block smooth-gpu"
      style={{ x, y, translateX: "-50%", translateY: "-50%" }}
    >
      <div className="h-64 w-64 rounded-full bg-cyan-400/15 blur-[72px]" />
      <div className="absolute top-1/2 left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/40 bg-cyan-400/15" />
    </motion.div>
  );
}
