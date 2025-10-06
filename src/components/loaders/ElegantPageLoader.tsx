"use client";

import React from "react";

interface WinimixPageLoaderProps {
  text?: string;
  subtitle?: string;
  showLogo?: boolean;
}

export const ElegantPageLoader: React.FC<WinimixPageLoaderProps> = ({
  text = "Loading Winimix",
  subtitle = "Preparing your experience...",
  showLogo = true,
}) => {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
      {/* Main Loader Container */}
      <div className="text-center space-y-8">
        {/* Animated Logo/Brand */}
        {showLogo && (
          <div className="relative">
            {/* Main Logo Container */}
            <div className="w-24 h-24 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 rounded-2xl mx-auto flex items-center justify-center shadow-2xl animate-pulse">
              <span className="text-white font-bold text-xl tracking-tight">
                W
              </span>
            </div>

            {/* Floating Particles */}
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-bounce"></div>
            <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-green-400 rounded-full animate-bounce delay-100"></div>
            <div className="absolute -top-2 -left-2 w-5 h-5 bg-red-400 rounded-full animate-bounce delay-200"></div>

            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-xl opacity-30 animate-pulse"></div>
          </div>
        )}

        {/* Text Content */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            {text}
            <span className="inline-flex ml-1">
              <span className="animate-bounce">.</span>
              <span className="animate-bounce delay-100">.</span>
              <span className="animate-bounce delay-200">.</span>
            </span>
          </h3>

          {subtitle && (
            <p className="text-gray-500 text-sm max-w-sm mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {/* Animated Progress Bar */}
        <div className="w-64 mx-auto">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-[progress_1.5s_ease-in-out_infinite]"></div>
          </div>
        </div>

        {/* Loading Stats */}
        <div className="flex justify-center space-x-6 text-xs text-gray-400">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span>Processing</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-150"></div>
            <span>Optimizing</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse delay-300"></div>
            <span>Finalizing</span>
          </div>
        </div>
      </div>

      {/* Background Animated Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-200 rounded-full blur-3xl opacity-20 animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-purple-200 rounded-full blur-3xl opacity-20 animate-float-delayed"></div>
        <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-pink-200 rounded-full blur-2xl opacity-15 animate-float-slow"></div>
      </div>
    </div>
  );
};
