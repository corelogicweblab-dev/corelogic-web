"use client";

import { useEffect, useRef } from "react";

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particles: {
      x: number;
      y: number;
      size: number;
      speed: number;
      opacity: number;
      hue: number;
    }[] = [];
    let animationId: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    };

    const init = () => {
      particles.length = 0;
      const count = Math.floor((canvas.offsetWidth * canvas.offsetHeight) / 5000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.offsetWidth,
          y: Math.random() * canvas.offsetHeight,
          size: Math.random() * 2.5 + 0.5,
          speed: Math.random() * 0.35 + 0.1,
          opacity: Math.random() * 0.5 + 0.2,
          hue: Math.random() > 0.3 ? 190 : 260,
        });
      }
    };

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        p.y -= p.speed;
        if (p.y < 0) {
          p.y = h;
          p.x = Math.random() * w;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 100%, 55%, ${p.opacity})`;
        ctx.fill();
      }

      animationId = requestAnimationFrame(draw);
    };

    resize();
    init();
    draw();
    window.addEventListener("resize", () => {
      resize();
      init();
    });
    return () => cancelAnimationFrame(animationId);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-60" aria-hidden />;
}
