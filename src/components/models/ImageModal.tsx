"use client";

import { useEffect } from "react";
import { X, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  alt?: string;
}

export default function ImageModal({
  isOpen,
  onClose,
  imageUrl,
  alt = "Image",
}: ImageModalProps) {
  // Handle ESC key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 bg-opacity-90 backdrop-blur-sm">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-full transition-all duration-200"
      >
        <X size={24} />
      </button>

      {/* Image Container */}
      <div className="relative max-w-4xl max-h-[90vh] w-full mx-4">
        <div className="flex items-center justify-center h-full">
          <img
            src={imageUrl}
            alt={alt}
            className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
          />
        </div>
      </div>

      {/* Click outside to close */}
      <div className="absolute inset-0 -z-10" onClick={onClose} />
    </div>
  );
}
