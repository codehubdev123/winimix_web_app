"use client";

import { useState } from "react";
import ImageModal from "./ImageModal";

interface ClickableImageProps {
  src: string;
  alt: string;
  className?: string;
  fallback?: React.ReactNode;
}

export default function ClickableImage({
  src,
  alt,
  className = "h-12 w-12 rounded-lg border",
  fallback,
}: ClickableImageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!src) {
    return (
      fallback || (
        <div
          className={`${className} bg-gray-200 flex items-center justify-center`}
        >
          <span className="text-gray-400 text-xs">No image</span>
        </div>
      )
    );
  }

  return (
    <>
      <div
        className={`${className} overflow-hidden cursor-zoom-in hover:opacity-80 transition-opacity`}
        onClick={() => setIsModalOpen(true)}
      >
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      </div>

      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        imageUrl={src}
        alt={alt}
      />
    </>
  );
}
