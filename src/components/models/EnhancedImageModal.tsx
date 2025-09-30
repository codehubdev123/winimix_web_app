"use client";

import { useEffect, useState } from "react";
import { X, ZoomIn, ZoomOut, RotateCcw, Download } from "lucide-react";
import axios from "axios";

interface EnhancedImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  alt?: string;
}

export default function EnhancedImageModal({
  isOpen,
  onClose,
  imageUrl,
  alt = "Image",
}: EnhancedImageModalProps) {
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
      // Reset state when modal opens
      setScale(1);
      setRotation(0);
      setPosition({ x: 0, y: 0 });
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.25, 3));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.25, 0.5));
  const reset = () => {
    setScale(1);
    setRotation(0);
    setPosition({ x: 0, y: 0 });
  };

  const rotate = () => setRotation((prev) => (prev + 90) % 360);

  const handleDownload = async () => {
    if (isDownloading) return;

    setIsDownloading(true);
    try {
      // Using Axios to download the image
      const response = await axios({
        method: "GET",
        url: imageUrl,
        responseType: "blob", // Important for file download
        timeout: 30000, // 30 seconds timeout
        onDownloadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total,
            );
            console.log(`Download Progress: ${percentCompleted}%`);
          }
        },
      });

      // Create blob URL from the response
      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);

      // Create temporary link and trigger download
      const link = document.createElement("a");
      link.href = url;

      // Extract filename from URL or use alt text
      const filename =
        getFilenameFromUrl(imageUrl) ||
        `${alt || "image"}.${getFileExtension(imageUrl)}` ||
        "image.jpg";

      link.download = filename;
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      console.log("✅ Image downloaded successfully");
    } catch (error) {
      console.error("❌ Download failed:", error);

      // Fallback to simple method if Axios fails
      fallbackDownload();
    } finally {
      setIsDownloading(false);
    }
  };

  // Fallback download method
  const fallbackDownload = () => {
    try {
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = getFilenameFromUrl(imageUrl) || `${alt || "image"}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("❌ Fallback download also failed:", error);
      alert(
        'Download failed. Please try right-clicking the image and selecting "Save image as".',
      );
    }
  };

  // Helper function to extract filename from URL
  const getFilenameFromUrl = (url: string): string => {
    try {
      const urlObj = new URL(url);
      const pathname = urlObj.pathname;
      return pathname.substring(pathname.lastIndexOf("/") + 1);
    } catch {
      return "";
    }
  };

  // Helper function to get file extension
  const getFileExtension = (url: string): string => {
    const filename = getFilenameFromUrl(url);
    if (!filename) return "jpg";

    const lastDotIndex = filename.lastIndexOf(".");
    if (lastDotIndex === -1) return "jpg";

    return filename.substring(lastDotIndex + 1);
  };

  // Mouse events for panning
  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      setPosition((prev) => ({
        x: prev.x + e.movementX,
        y: prev.y + e.movementY,
      }));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 backdrop-blur-sm">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-20 p-3 text-white hover:bg-white hover:bg-opacity-20 rounded-full transition-all duration-200"
      >
        <X size={24} />
      </button>

      {/* Controls */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex items-center gap-2 bg-black bg-opacity-50 rounded-full px-4 py-2">
        <button
          onClick={zoomOut}
          disabled={scale <= 0.5}
          className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ZoomOut size={20} />
        </button>

        <button
          onClick={reset}
          className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-full"
        >
          <RotateCcw size={20} />
        </button>

        <button
          onClick={zoomIn}
          disabled={scale >= 3}
          className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ZoomIn size={20} />
        </button>

        <button
          onClick={rotate}
          className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-full"
        >
          ↻
        </button>

        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          {isDownloading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Download size={20} />
          )}
        </button>

        <span className="text-white text-sm mx-2">
          {Math.round(scale * 100)}%
        </span>
      </div>

      {/* Image Container */}
      <div className="relative max-w-4xl max-h-[90vh] w-full mx-4">
        <div
          className="flex items-center justify-center h-full cursor-move"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <img
            src={imageUrl}
            alt={alt}
            className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl transition-transform duration-200"
            style={{
              transform: `scale(${scale}) rotate(${rotation}deg) translate(${position.x}px, ${position.y}px)`,
              cursor: scale > 1 ? "grab" : "default",
            }}
            draggable={false}
          />
        </div>
      </div>

      {/* Click outside to close */}
      <div
        className="absolute inset-0 -z-10 cursor-zoom-out"
        onClick={onClose}
      />
    </div>
  );
}
