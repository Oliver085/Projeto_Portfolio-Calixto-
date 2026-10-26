"use client";

import { useEffect, useState } from "react";

export function CursorHalo() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className="pointer-events-none fixed z-50 transition-opacity duration-300"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "translate(-50%, -50%)",
      }}
    >
      {/* Outer halo - large blur */}
      <div className="absolute inset-0 -translate-x-1/2 -translate-y-1/2">
        <div className="h-32 w-32 rounded-full bg-blue-500/20 blur-[40px] animate-pulse-halo" />
      </div>

      {/* Middle halo */}
      <div className="absolute inset-0 -translate-x-1/2 -translate-y-1/2">
        <div className="h-20 w-20 rounded-full bg-blue-400/30 blur-[20px] animate-pulse-halo" style={{ animationDelay: '0.1s' }} />
      </div>

      {/* Inner glow */}
      <div className="absolute inset-0 -translate-x-1/2 -translate-y-1/2">
        <div className="h-8 w-8 rounded-full bg-blue-300/40 blur-[10px]" />
      </div>
    </div>
  );
}
