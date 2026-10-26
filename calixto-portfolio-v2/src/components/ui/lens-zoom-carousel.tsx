"use client";

import { useState, useRef, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LensZoomCarouselProps {
  images: string[];
  title: string;
  category: string;
  onClose: () => void;
}

export function LensZoomCarousel({ images, title, category, onClose }: LensZoomCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const thumbnailRef = useRef<HTMLDivElement>(null);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
  };

  const handleMouseMove = (e: React.MouseEvent, index: number) => {
    if (thumbnailRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePosition({ x, y });
      setHoveredIndex(index);
    }
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrevious();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/98 backdrop-blur-xl p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-7xl h-full flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6 relative z-10">
          <div>
            <h3 className="font-display text-3xl font-bold text-foreground">{title}</h3>
            <span className="inline-block mt-2 bg-brand px-4 py-1 text-xs uppercase tracking-widest text-primary-foreground">
              {category}
            </span>
          </div>
          <button
            onClick={onClose}
            className="rounded-full bg-foreground/10 p-3 backdrop-blur transition hover:bg-brand hover:text-primary-foreground"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Main Image */}
        <div className="relative flex-1 flex items-center justify-center mb-6 overflow-hidden rounded-xl border border-border bg-background/50">
          <img
            src={images[currentIndex]}
            alt={`${title} - ${currentIndex + 1}`}
            className="max-h-full max-w-full object-contain"
          />

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-3 backdrop-blur transition hover:bg-brand hover:text-primary-foreground"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-3 backdrop-blur transition hover:bg-brand hover:text-primary-foreground"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          {/* Image counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-background/80 px-4 py-2 text-sm backdrop-blur">
            {currentIndex + 1} / {images.length}
          </div>
        </div>

        {/* Thumbnails with Lens Zoom Effect */}
        {images.length > 1 && (
          <div className="relative">
            <div
              ref={thumbnailRef}
              className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-track-background scrollbar-thumb-border"
              style={{
                scrollbarWidth: "thin",
              }}
            >
              {images.map((image, index) => (
                <div
                  key={index}
                  className="relative flex-shrink-0 cursor-pointer"
                  onClick={() => handleThumbnailClick(index)}
                  onMouseMove={(e) => handleMouseMove(e, index)}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* Lens zoom effect */}
                  {hoveredIndex === index && (
                    <div
                      className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg"
                      style={{
                        zIndex: 100,
                      }}
                    >
                      <div
                        className="absolute w-32 h-32 rounded-full border-4 border-white/30 shadow-2xl"
                        style={{
                          left: `${mousePosition.x}%`,
                          top: `${mousePosition.y}%`,
                          transform: "translate(-50%, -50%)",
                          backgroundImage: `url(${image})`,
                          backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`,
                          backgroundSize: "400%",
                          backgroundRepeat: "no-repeat",
                          filter: "brightness(1.2)",
                        }}
                      />
                    </div>
                  )}

                  <div
                    className={`relative w-32 h-32 overflow-hidden rounded-lg border-2 transition-all duration-300 ${
                      currentIndex === index
                        ? "border-brand scale-105"
                        : "border-border hover:border-brand/50"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
