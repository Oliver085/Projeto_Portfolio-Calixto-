"use client";

import { useEffect, useRef } from "react";

export function GradientMeshBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      time += 0.005;

      // Clear canvas
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Create gradient mesh with multiple moving gradients
      const gradients = [
        {
          x: canvas.width * (0.5 + Math.sin(time) * 0.3),
          y: canvas.height * (0.3 + Math.cos(time * 0.7) * 0.2),
          color: "rgba(21, 104, 251, 0.3)", // Blue
          size: 600,
        },
        {
          x: canvas.width * (0.7 + Math.cos(time * 0.8) * 0.2),
          y: canvas.height * (0.6 + Math.sin(time * 0.6) * 0.3),
          color: "rgba(139, 92, 246, 0.25)", // Purple
          size: 500,
        },
        {
          x: canvas.width * (0.3 + Math.sin(time * 0.9) * 0.25),
          y: canvas.height * (0.7 + Math.cos(time * 0.5) * 0.2),
          color: "rgba(59, 130, 246, 0.2)", // Light blue
          size: 550,
        },
        {
          x: canvas.width * (0.5 + Math.cos(time * 1.1) * 0.2),
          y: canvas.height * (0.5 + Math.sin(time * 0.4) * 0.25),
          color: "rgba(37, 99, 235, 0.15)", // Medium blue
          size: 650,
        },
      ];

      // Draw each gradient
      gradients.forEach((grad) => {
        const gradient = ctx.createRadialGradient(
          grad.x,
          grad.y,
          0,
          grad.x,
          grad.y,
          grad.size
        );

        gradient.addColorStop(0, grad.color);
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
