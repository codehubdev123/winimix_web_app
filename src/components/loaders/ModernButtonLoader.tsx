// components/loaders/ModernButtonLoader.tsx
import React from "react";

interface ModernButtonLoaderProps {
  text?: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "outline";
}

export const ModernButtonLoader: React.FC<ModernButtonLoaderProps> = ({
  text = "Processing",
  size = "md",
  variant = "primary",
}) => {
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  const variantClasses = {
    primary: "text-white",
    secondary: "text-gray-700",
    outline: "text-blue-600",
  };

  return (
    <div className="inline-flex items-center space-x-2">
      {/* Morphing Dots */}
      <div className="flex space-x-1">
        <div
          className={`${sizeClasses[size]} bg-current rounded-full animate-bounce [animation-delay:-0.3s]`}
        ></div>
        <div
          className={`${sizeClasses[size]} bg-current rounded-full animate-bounce [animation-delay:-0.15s]`}
        ></div>
        <div
          className={`${sizeClasses[size]} bg-current rounded-full animate-bounce`}
        ></div>
      </div>

      {text && (
        <span className={`text-sm ${variantClasses[variant]}`}>{text}</span>
      )}
    </div>
  );
};
