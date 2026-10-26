"use client";

import { useEffect, useRef } from "react";

interface ShineBorderProps {
  shineColor?: string[];
  className?: string;
}

export function ShineBorder({ shineColor = ["#FF6B35", "#F7931E", "#FDC830"], className = "" }: ShineBorderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let offset = 0;

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create gradient
      const gradient = ctx.createLinearGradient(offset, 0, canvas.width + offset, canvas.height);
      shineColor.forEach((color, index) => {
        gradient.addColorStop(index / (shineColor.length - 1), color);
      });

      // Draw border
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.strokeRect(1, 1, canvas.width - 2, canvas.height - 2);

      offset += 2;
      if (offset > canvas.width + canvas.height) {
        offset = -(canvas.width + canvas.height);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [shineColor]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 rounded-lg ${className}`}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
