"use client";

import { useState, useRef } from "react";
import { Columns } from "lucide-react";

export default function BeforeAfter() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (
    event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
  ) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = "touches" in event ? event.touches[0].clientX : event.clientX;

    if (!isDragging && event.type === "mousemove") return;

    const position = ((x - rect.left) / rect.width) * 100;

    if (position >= 0 && position <= 100) {
      setSliderPosition(position);
    }
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  // NEW IMAGE: High-Res Traditional Bride
  const IMAGE_URL =
    "https://www.shutterstock.com/image-photo/concept-editing-photo-retouching-before-260nw-1013103964.jpg";

  return (
    <div className="w-full max-w-5xl mx-auto py-20 px-4">
      <div className="text-center mb-10">
        <h2 className="text-yellow-500 uppercase tracking-widest font-bold mb-2">
          Our Magic Touch
        </h2>
        <h3 className="text-4xl font-bold text-white">
          Before & <span className="text-gray-500">After</span>
        </h3>
        <p className="text-gray-400 mt-4 text-sm">
          Drag the slider to see our color grading process.
        </p>
      </div>

      <div
        ref={containerRef}
        className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden cursor-ew-resize select-none border border-gray-800 touch-none shadow-2xl"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMove}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
        onTouchMove={handleMove}
        onClick={handleMove}
      >
        {/* IMAGE 1: The "After" (Vibrant Color) */}
        <img
          src={IMAGE_URL}
          alt="After"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-yellow-500 text-black font-bold px-3 py-1 rounded text-xs z-10 shadow-lg">
          AFTER (EDITED)
        </div>

        {/* IMAGE 2: The "Before" (Raw/Flat Profile) */}
        {/* We use CSS filters to simulate a RAW camera file (Desaturated, Low Contrast) */}
        <img
          src={IMAGE_URL}
          alt="Before"
          className="absolute inset-0 w-full h-full object-cover sepia-[.3] grayscale-[.5] brightness-90 contrast-75 saturate-50"
          style={{
            clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
          }}
        />
        <div className="absolute top-4 left-4 bg-white text-black font-bold px-3 py-1 rounded text-xs z-10 shadow-lg">
          BEFORE (RAW)
        </div>

        {/* The Slider Handle Line */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-yellow-500 z-20 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* The Handle Circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-500 text-black p-3 rounded-full shadow-[0_0_15px_rgba(234,179,8,0.8)] border-2 border-white hover:scale-110 transition-transform">
            <Columns size={20} />
          </div>
        </div>
      </div>
    </div>
  );
}
