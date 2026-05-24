"use client";

import { useEffect, useRef } from "react";
import { getPerformanceTier, shouldSkipFrame } from "@/lib/performance";

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const lite = getPerformanceTier() === "lite";
    let running = true;
    let animationId = 0;

    const particles: {
      x: number;
      y: number;
      size: number;
      speed: number;
      opacity: number;
      hue: number;
      vx: number;
    }[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, lite ? 1 : 1.5);
      canvas.width = Math.floor(canvas.offsetWidth * dpr);
      canvas.height = Math.floor(canvas.offsetHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const init = () => {
      particles.length = 0;
      const area = canvas.offsetWidth * canvas.offsetHeight;
      const divisor = lite ? 12000 : 4500;
      const count = Math.min(Math.floor(area / divisor), lite ? 35 : 80);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.offsetWidth,
          y: Math.random() * canvas.offsetHeight,
          size: Math.random() * 2 + 0.5,
          speed: Math.random() * 0.4 + 0.12,
          opacity: Math.random() * 0.5 + 0.2,
          hue: Math.random() > 0.35 ? 190 : 265,
          vx: (Math.random() - 0.5) * 0.25,
        });
      }
    };

    let frame = 0;
    let lastFrame = 0;
    const draw = (now: number) => {
      if (!running) return;
      if (shouldSkipFrame(now, lastFrame)) {
        animationId = requestAnimationFrame(draw);
        return;
      }
      lastFrame = now;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        p.y -= p.speed;
        p.x += p.vx;
        if (p.y < 0) {
          p.y = h;
          p.x = Math.random() * w;
        }
        if (p.x < 0 || p.x > w) p.vx *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 100%, 60%, ${p.opacity})`;
        ctx.fill();
      }

      if (!lite && frame % 2 === 0) {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.hypot(dx, dy);
            if (dist < 80) {
              const alpha = (1 - dist / 80) * 0.15;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.strokeStyle = `rgba(0, 212, 255, ${alpha})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }

      frame++;
      animationId = requestAnimationFrame(draw);
    };

    resize();
    init();
    animationId = requestAnimationFrame(draw);

    const onResize = () => {
      resize();
      init();
    };
    window.addEventListener("resize", onResize);

    const onVisibility = () => {
      running = document.visibilityState === "visible";
      if (running) animationId = requestAnimationFrame(draw);
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-60" aria-hidden />;
}
