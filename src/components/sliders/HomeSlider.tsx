"use client";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

const HomeSlider = () => {
  const swiperRef = useRef(null);

  // Sample e-commerce slider data
  const slides = [
    {
      id: 1,
      title: "Summer Collection 2023",
      subtitle: "Get up to 50% off on summer essentials",
      image:
        "https://plus.unsplash.com/premium_photo-1681488262364-8aeb1b6aac56?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ctaText: "Shop Now",
      ctaLink: "#",
      bgPosition: "center",
    },
    {
      id: 2,
      title: "New Tech Gadgets",
      subtitle: "Latest electronics with amazing features",
      image:
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      ctaText: "Explore Tech",
      ctaLink: "#",
      bgPosition: "center",
    },
    {
      id: 3,
      title: "Home Decor Sale",
      subtitle: "Refresh your space with our exclusive collection",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      ctaText: "Discover Home",
      ctaLink: "#",
      bgPosition: "center",
    },
    {
      id: 4,
      title: "Fashion Trends",
      subtitle: "Stay ahead with the latest fashion trends",
      image:
        "https://plus.unsplash.com/premium_photo-1701984401514-a32a73eac549?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ctaText: "View Collection",
      ctaLink: "#",
      bgPosition: "center",
    },
  ];

  return (
    <div className="w-full relative overflow-hidden">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        // pagination={{
        //   clickable: true,
        //   el: ".custom-pagination",
        //   renderBullet: (index, className) => {
        //     return `<span class="${className} bg-pri hover:bg-amber-700 transition-colors duration-300"></span>`;
        //   },
        // }}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        loop={true}
        className="ecommerce-swiper"
        dir="ltr" // Ensure Swiper works correctly in both LTR and RTL
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative h-96 md:h-[500px] w-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundPosition: slide.bgPosition,
              }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30"></div>

              {/* Content */}
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                  <div className={`max-w-md text-white text-left mr-auto`}>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 animate-fadeIn">
                      {slide.title}
                    </h2>
                    <p className="text-lg md:text-xl mb-6 opacity-90 animate-fadeIn delay-150">
                      {slide.subtitle}
                    </p>
                    <a
                      href={slide.ctaLink}
                      className="inline-block bg-primary hover:bg-secondary text-white font-medium py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 animate-fadeIn delay-300"
                    >
                      {slide.ctaText}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation */}
      <div className="absolute inset-y-0 left-0 flex items-center z-10">
        <button className="custom-prev cursor-pointer bg-white/20 hover:bg-white/30 text-white p-3 rounded-l-lg transition-all duration-300 ml-4">
          <svg
            className="w-6 h-6 "
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
        </button>
      </div>

      <div className="absolute inset-y-0 right-0 flex items-center z-10">
        <button className="custom-next cursor-pointer bg-white/20 hover:bg-white/30 text-white p-3 rounded-r-lg transition-all duration-300 mr-4">
          <svg
            className="w-6 h-6 "
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </button>
      </div>

      {/* Custom Pagination */}
      <div className="absolute bottom-4 left-0 right-0 z-10 flex justify-center">
        <div className="custom-pagination flex space-x-2 rtl:space-x-reverse"></div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
          opacity: 0;
        }
        .delay-150 {
          animation-delay: 0.15s;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }

        /* RTL Support */
        [dir="rtl"] .ecommerce-swiper :global(.swiper-button-prev) {
          left: auto;
          right: 10px;
        }
        [dir="rtl"] .ecommerce-swiper :global(.swiper-button-next) {
          right: auto;
          left: 10px;
        }
      `}</style>
    </div>
  );
};

export default HomeSlider;
