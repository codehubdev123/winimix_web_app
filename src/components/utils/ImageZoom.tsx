"use client";

import { useState, useRef, useContext } from "react";
import Image from "next/image";
import { useLocale } from "@/contexts/LocaleContext";

export default function ImageZoom({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const { locale } = useLocale();
  const [showZoom, setShowZoom] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const { left, top, width, height } = container.getBoundingClientRect();

    // Calculate cursor position relative to image
    const x = e.clientX - left;
    const y = e.clientY - top;

    // Calculate percentage for background position (0-100%)
    const bgX = (x / width) * 100;
    const bgY = (y / height) * 100;

    setPosition({ x: bgX, y: bgY });
    setCursorPosition({ x, y });
  };

  return (
    <div className="relative group">
      {/* Main Image Container */}
      <div
        ref={containerRef}
        className="relative overflow-hidden"
        onMouseEnter={() => setShowZoom(true)}
        onMouseLeave={() => setShowZoom(false)}
        onMouseMove={handleMouseMove}
      >
        <Image
          src={src}
          alt={alt}
          width={800}
          height={800}
          className={`w-full h-full cover ${className}`}
          priority
        />

        {/* Zoom Lens (visible on hover) */}
        {showZoom && (
          <div
            className="absolute pointer-events-none border-2 border-gray-300 bg-[#222934]/50 bg-opacity-20 rounded-full"
            style={{
              width: "150px",
              height: "150px",
              left: `${cursorPosition.x - 75}px`,
              top: `${cursorPosition.y - 75}px`,
              transform: "translateZ(0)",
            }}
          />
        )}
      </div>

      {/* Zoomed Preview (position changes based on RTL/LTR) */}
      {showZoom && (
        <div
          className={`absolute top-0 ${locale === "ar" ? "right-full mr-4" : "left-full ml-4"} w-[400px] h-[400px] border border-gray-200 rounded-lg overflow-hidden shadow-lg z-10 hidden lg:block`}
        >
          <div
            className="w-full h-full bg-white bg-no-repeat"
            style={{
              backgroundImage: `url(${src})`,
              backgroundPosition: `${position.x}% ${position.y}%`,
              backgroundSize: "200%",
            }}
          />
        </div>
      )}
    </div>
  );
}
