"use client";

import { useState, useEffect, useRef } from "react";

const InfiniteBrandsScroll = () => {
  const [isRTL, setIsRTL] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollContainerRef = useRef(null);

  // Brand data with logos
  const brands = [
    {
      id: 1,
      name: "Nike",
      logo: "https://cdn.worldvectorlogo.com/logos/nike-4.svg",
    },
    {
      id: 2,
      name: "Adidas",
      logo: "https://cdn.worldvectorlogo.com/logos/adidas-2.svg",
    },
    {
      id: 3,
      name: "Apple",
      logo: "https://cdn.worldvectorlogo.com/logos/apple-11.svg",
    },
    {
      id: 4,
      name: "Samsung",
      logo: "https://cdn.worldvectorlogo.com/logos/samsung-2.svg",
    },
    {
      id: 5,
      name: "Sony",
      logo: "https://cdn.worldvectorlogo.com/logos/sony-2.svg",
    },
    {
      id: 6,
      name: "Microsoft",
      logo: "https://cdn.worldvectorlogo.com/logos/microsoft-5.svg",
    },
    {
      id: 7,
      name: "Amazon",
      logo: "https://cdn.worldvectorlogo.com/logos/amazon-2.svg",
    },
    {
      id: 8,
      name: "Google",
      logo: "https://cdn.worldvectorlogo.com/logos/google-2015.svg",
    },
    {
      id: 9,
      name: "Intel",
      logo: "https://cdn.worldvectorlogo.com/logos/intel-8.svg",
    },
    {
      id: 10,
      name: "Dell",
      logo: "https://cdn.worldvectorlogo.com/logos/dell-3.svg",
    },
    {
      id: 11,
      name: "HP",
      logo: "https://cdn.worldvectorlogo.com/logos/hp-3.svg",
    },
    {
      id: 12,
      name: "Lenovo",
      logo: "https://cdn.worldvectorlogo.com/logos/lenovo-2.svg",
    },
    {
      id: 13,
      name: "Asus",
      logo: "https://cdn.worldvectorlogo.com/logos/asus-1.svg",
    },
    {
      id: 14,
      name: "LG",
      logo: "https://cdn.worldvectorlogo.com/logos/lg-3.svg",
    },
    {
      id: 15,
      name: "Panasonic",
      logo: "https://cdn.worldvectorlogo.com/logos/panasonic-2.svg",
    },
  ];

  // Duplicate brands for seamless infinite scroll
  const duplicatedBrands = [...brands, ...brands, ...brands];

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let animationFrameId;
    let scrollSpeed = 1; // Adjust speed as needed

    const scroll = () => {
      if (!isPaused && scrollContainer && !isScrolling) {
        if (isRTL) {
          scrollContainer.scrollLeft -= scrollSpeed;
          // Reset to middle when reaching the beginning
          if (scrollContainer.scrollLeft <= 0) {
            scrollContainer.scrollLeft = scrollContainer.scrollWidth / 3;
          }
        } else {
          scrollContainer.scrollLeft += scrollSpeed;
          // Reset to middle when reaching the end
          if (
            scrollContainer.scrollLeft >=
            scrollContainer.scrollWidth - scrollContainer.clientWidth
          ) {
            scrollContainer.scrollLeft = scrollContainer.scrollWidth / 3;
          }
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isRTL, isPaused, isScrolling]);

  // Handle manual scrolling
  const handleScroll = () => {
    setIsScrolling(true);
    clearTimeout(window.scrollTimeout);
    window.scrollTimeout = setTimeout(() => {
      setIsScrolling(false);
    }, 1000);
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center py-12 ${isRTL ? "rtl" : "ltr"}`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* RTL Toggle Button */}
      <button
        onClick={() => setIsRTL(!isRTL)}
        className="fixed top-4 right-4 z-50 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium flex items-center shadow-md hover:bg-blue-700 transition-colors"
      >
        <span className="mr-2">{isRTL ? "LTR" : "RTL"}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <div className="w-full max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
          Our Trusted Brands
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto text-lg">
          Discover our premium partners and brands. Scroll manually or let it
          autoscroll. Hover over any logo to see it in full color.
        </p>

        {/* Scroll Container with manual scroll support */}
        <div
          ref={scrollContainerRef}
          className="w-full overflow-x-auto scrollbar-hide" // Hide scrollbar for cleaner look
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onScroll={handleScroll}
          onWheel={handleScroll}
          onTouchMove={handleScroll}
        >
          <div className="flex w-max py-4">
            {duplicatedBrands.map((brand, index) => (
              <div
                key={`${brand.id}-${index}`}
                className="flex-shrink-0 w-44 h-44 mx-3 bg-white rounded-2xl shadow-md flex items-center justify-center p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl group cursor-pointer"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="max-w-full max-h-20 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Controls and Indicators */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-8 gap-4">
          <div className="text-sm text-gray-500 flex items-center">
            <div
              className={`w-3 h-3 rounded-full mr-2 ${isPaused || isScrolling ? "bg-yellow-500" : "bg-green-500"}`}
            ></div>
            {isScrolling
              ? "Manual scrolling"
              : isPaused
                ? "Scroll paused"
                : "Auto-scrolling"}
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="hidden md:inline">Scroll manually or</span>
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
            >
              {isPaused ? "Resume Auto" : "Pause Auto"}
            </button>
          </div>

          <div className="flex items-center text-sm text-gray-500">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            Hover to see colors
          </div>
        </div>

        {/* Scroll instructions for mobile */}
        <div className="md:hidden text-center mt-4 text-xs text-gray-400">
          ← Scroll horizontally →
        </div>
      </div>

      {/* Custom CSS to hide scrollbar */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none; /* Chrome, Safari and Opera */
        }
      `}</style>
    </div>
  );
};

export default InfiniteBrandsScroll;
