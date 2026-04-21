"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { X } from "lucide-react";
import { ImageFile, formatBytes, compressionPercent } from "./compress";

interface Props {
  image: ImageFile;
  onClose: () => void;
}

export default function ComparisonSlider({ image, onClose }: Props) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(percent);
  }, []);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (isDragging.current) handleMove(e.clientX);
    };
    const handleTouch = (e: TouchEvent) => {
      if (isDragging.current) handleMove(e.touches[0].clientX);
    };
    const handleUp = () => {
      isDragging.current = false;
    };

    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("touchmove", handleTouch);
    window.addEventListener("mouseup", handleUp);
    window.addEventListener("touchend", handleUp);

    return () => {
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("touchmove", handleTouch);
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("touchend", handleUp);
    };
  }, [handleMove]);

  if (!image.compressedPreview) return null;

  const saved = compressionPercent(image.originalSize, image.compressedSize || 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-[var(--background)] rounded-2xl overflow-hidden max-w-3xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[var(--card-border)]">
          <div>
            <h3 className="font-semibold">{image.name}</h3>
            <p className="text-sm text-[var(--muted)]">
              Original: {formatBytes(image.originalSize)} → Compressed:{" "}
              {formatBytes(image.compressedSize || 0)} ({saved}% smaller)
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[var(--muted-bg)]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison */}
        <div className="p-4 flex-1 overflow-auto">
          <div
            ref={containerRef}
            className="relative w-full aspect-video max-h-[60vh] rounded-xl overflow-hidden cursor-ew-resize select-none bg-[var(--muted-bg)]"
            onMouseDown={(e) => {
              isDragging.current = true;
              handleMove(e.clientX);
            }}
            onTouchStart={(e) => {
              isDragging.current = true;
              handleMove(e.touches[0].clientX);
            }}
          >
            {/* After (compressed) - full width background */}
            <img
              src={image.compressedPreview}
              alt="Compressed"
              className="absolute inset-0 w-full h-full object-contain"
              draggable={false}
            />

            {/* Before (original) - clipped */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${position}%` }}
            >
              <img
                src={image.preview}
                alt="Original"
                className="absolute inset-0 w-full h-full object-contain"
                style={{
                  width: containerRef.current
                    ? `${containerRef.current.offsetWidth}px`
                    : "100%",
                }}
                draggable={false}
              />
            </div>

            {/* Slider line */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg"
              style={{ left: `${position}%` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center">
                <div className="flex gap-0.5">
                  <div className="w-0.5 h-4 bg-gray-400 rounded" />
                  <div className="w-0.5 h-4 bg-gray-400 rounded" />
                </div>
              </div>
            </div>

            {/* Labels */}
            <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-black/60 text-white text-xs font-medium">
              Original
            </div>
            <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-black/60 text-white text-xs font-medium">
              Compressed
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
