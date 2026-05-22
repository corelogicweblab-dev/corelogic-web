"use client";

import { useEffect, useRef } from "react";

export function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const nodes: { x: number; y: number; vx: number; vy: number }[] = [];
    const nodeCount = 50;
    const connectionDistance = 140;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    };

    const initNodes = () => {
      nodes.length = 0;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
        });
      }
    };

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > w) node.vx *= -1;
        if (node.y < 0 || node.y > h) node.vy *= -1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 212, 255, 0.7)";
        ctx.shadowColor = "rgba(0, 212, 255, 0.8)";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.35;
            const grad = ctx.createLinearGradient(
              nodes[i].x,
              nodes[i].y,
              nodes[j].x,
              nodes[j].y
            );
            grad.addColorStop(0, `rgba(0, 212, 255, ${alpha})`);
            grad.addColorStop(1, `rgba(139, 92, 246, ${alpha * 0.8})`);
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    resize();
    initNodes();
    draw();
    window.addEventListener("resize", () => {
      resize();
      initNodes();
    });
    return () => cancelAnimationFrame(animationId);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-50" aria-hidden />;
}
