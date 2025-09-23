"use client";

import React, { useState, useEffect } from "react";

const HotOffersButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPulsing, setIsPulsing] = useState(true);

  // Pulsing animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIsPulsing((prev) => !prev);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <button
      className={`
        relative overflow-hidden
        px-3 py-1 rounded-full
        font-bold text-white
        transition-all duration-300
        transform ${isHovered ? "scale-105 -translate-y-0.5" : "scale-100"}
        shadow-lg ${isHovered ? "shadow-orange-500/30" : "shadow-orange-500/20"}
        bg-gradient-to-r from-orange-500 to-orange-600
        hover:from-orange-600 hover:to-orange-700
        border-2 border-orange-400
        flex items-center justify-center
cursor-pointer
        group
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main text */}
      <span className="relative z-10 flex items-center">
        <span className="mr-2">🔥</span>
        Exclusive
        <span className="ml-2">🔥</span>
      </span>

      {/* Pulse animation effect */}
      <span
        className={`
          absolute inset-0 rounded-full
          bg-orange-400
          transition-all duration-1000
          ${isPulsing ? "opacity-0 scale-125" : "opacity-100 scale-100"}
        `}
      />

      {/* Shimmer effect on hover */}
      <span
        className={`
          absolute inset-0
          bg-gradient-to-r from-transparent via-white/30 to-transparent
          translate-x-[-100%]
          group-hover:translate-x-[100%]
          transition-transform duration-1000
        `}
      />

      {/* Particle effects */}
      {isHovered && (
        <>
          <span
            className="absolute w-1 h-1 bg-yellow-300 rounded-full animate-bounce"
            style={{ top: "20%", left: "25%" }}
          />
          <span
            className="absolute w-1 h-1 bg-yellow-300 rounded-full animate-bounce"
            style={{ top: "30%", left: "75%", animationDelay: "0.2s" }}
          />
          <span
            className="absolute w-1 h-1 bg-yellow-300 rounded-full animate-bounce"
            style={{ bottom: "20%", left: "40%", animationDelay: "0.4s" }}
          />
          <span
            className="absolute w-1 h-1 bg-yellow-300 rounded-full animate-bounce"
            style={{ bottom: "30%", left: "60%", animationDelay: "0.6s" }}
          />
        </>
      )}
    </button>
  );
};

export default HotOffersButton;
