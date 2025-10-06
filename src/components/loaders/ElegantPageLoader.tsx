import React from "react";

interface ElegantPageLoaderProps {
  text?: string;
  subtitle?: string;
}

export const ElegantPageLoader: React.FC<ElegantPageLoaderProps> = ({
  text = "Loading",
  subtitle = "Please wait while we prepare your content",
}) => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50/40 via-white/40 to-purple-50/40 flex items-center justify-center">
      <div className="text-center">
        {/* Animated Logo/Icon */}
        <div className="relative mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mx-auto animate-pulse shadow-lg"></div>
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-30 animate-pulse"></div>
        </div>

        {/* Animated Text */}
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
        <div className="mt-8 w-64 mx-auto">
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-[progress_2s_ease-in-out_infinite]"></div>
          </div>
        </div>
      </div>

      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-200 rounded-full blur-3xl opacity-30 animate-float"></div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-200 rounded-full blur-3xl opacity-30 animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-pink-200 rounded-full blur-2xl opacity-20 animate-float-slow"></div>
      </div>
    </div>
  );
};
