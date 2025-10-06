"use client";

import React, { useEffect, useState } from "react";
import { CheckCircle, X } from "lucide-react";

interface BeautifulSuccessMessageProps {
  message: string;
  duration?: number;
  onDismiss?: () => void;
  type?: "success" | "info" | "warning";
}

export const SuccessMessage: React.FC<BeautifulSuccessMessageProps> = ({
  message,
  duration = 5000,
  onDismiss,
  type = "success",
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  const styles = {
    success: {
      bg: "bg-gradient-to-r from-green-50 to-emerald-50",
      border: "border-green-200",
      icon: "text-green-500",
      title: "text-green-800",
      message: "text-green-700",
      button: "text-green-400 hover:text-green-600",
    },
    info: {
      bg: "bg-gradient-to-r from-blue-50 to-cyan-50",
      border: "border-blue-200",
      icon: "text-blue-500",
      title: "text-blue-800",
      message: "text-blue-700",
      button: "text-blue-400 hover:text-blue-600",
    },
    warning: {
      bg: "bg-gradient-to-r from-amber-50 to-yellow-50",
      border: "border-amber-200",
      icon: "text-amber-500",
      title: "text-amber-800",
      message: "text-amber-700",
      button: "text-amber-400 hover:text-amber-600",
    },
  };

  const currentStyle = styles[type];

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        startExit();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration]);

  const startExit = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      onDismiss?.();
    }, 300);
  };

  const handleDismiss = () => {
    startExit();
  };

  if (!isVisible) return null;

  return (
    <div
      className={`
      ${currentStyle.bg} ${currentStyle.border} 
      border rounded-xl p-4 shadow-lg
      transform transition-all duration-300 ease-in-out
      ${
        isExiting
          ? "opacity-0 scale-95 -translate-y-2"
          : "opacity-100 scale-100 translate-y-0"
      }
      animate-in slide-in-from-top duration-500
    `}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <div className="flex-shrink-0">
            <div className="relative">
              <CheckCircle className={`h-6 w-6 ${currentStyle.icon}`} />
              <div
                className={`absolute inset-0 ${currentStyle.icon} opacity-20 animate-ping`}
              >
                <CheckCircle className="h-6 w-6" />
              </div>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className={`text-sm font-semibold ${currentStyle.title}`}>
              {type === "success"
                ? "Success!"
                : type === "info"
                  ? "Information"
                  : "Warning"}
            </p>
            <p
              className={`text-sm ${currentStyle.message} mt-1 leading-relaxed`}
            >
              {message}
            </p>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          className={`
            flex-shrink-0 ml-4 inline-flex 
            ${currentStyle.button} 
            focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-full p-1
            transition-colors duration-200
          `}
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Progress bar for auto-dismiss */}
      {duration > 0 && (
        <div className="mt-3 w-full bg-green-200 rounded-full h-1">
          <div
            className={`h-1 rounded-full ${type === "success" ? "bg-green-500" : type === "info" ? "bg-blue-500" : "bg-amber-500"} transition-all duration-${duration} ease-linear`}
            style={{
              width: isExiting ? "100%" : "0%",
              transition: `width ${duration}ms linear`,
            }}
          ></div>
        </div>
      )}
    </div>
  );
};
