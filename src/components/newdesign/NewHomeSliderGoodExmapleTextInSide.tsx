"use client";

import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";

const EcommerceSlider = () => {
  const [isRTL, setIsRTL] = useState(false);
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);

  // Full slides data with transparent product images
  const slides = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
      title: "Premium Running Shoes",
      subtitle: "Experience ultimate comfort with our latest collection",
      price: "$129.99",
      buttonText: "Shop Now",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      title: "Wireless Headphones",
      subtitle: "Immerse yourself in crystal clear sound quality",
      price: "$89.99",
      buttonText: "Buy Now",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
      title: "Luxury Watches",
      subtitle: "Elegant timepieces for the modern professional",
      price: "$249.99",
      buttonText: "Discover",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      title: "Smart Home Devices",
      subtitle: "Transform your living space with intelligent technology",
      price: "$199.99",
      buttonText: "Explore",
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80",
      title: "Fitness Equipment",
      subtitle: "Achieve your health goals with premium gear",
      price: "$299.99",
      buttonText: "Get Fit",
    },
  ];

  // Update navigation when RTL changes
  useEffect(() => {
    if (swiperInstance) {
      swiperInstance.update();
    }
  }, [isRTL, swiperInstance]);

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center py-12 ${isRTL ? "rtl" : "ltr"}`}
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

      <div className="max-w-5xl mx-auto px-4 w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Featured Products
        </h2>

        <div className="relative bg-white rounded-2xl shadow-xl p-6">
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation={{
              prevEl: navigationPrevRef.current,
              nextEl: navigationNextRef.current,
            }}
            onSwiper={setSwiperInstance}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={true}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 1,
              },
              1024: {
                slidesPerView: 1,
              },
            }}
            className="h-full"
          >
            {slides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  {/* Image Section */}
                  <div className="w-full md:w-1/2 h-96 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl overflow-hidden flex items-center justify-center p-8">
                    <div
                      className="w-full h-full relative"
                      style={{
                        backgroundImage: `url(${slide.image})`,
                        backgroundSize: "contain",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }}
                    >
                      {/* Transparent overlay for better text visibility */}
                      <div className="absolute inset-0 bg-black/5"></div>

                      {/* Discount badge */}
                      <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        25% OFF
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="w-full md:w-1/2 p-4 text-center md:text-left">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                      {slide.title}
                    </h2>
                    <p className="text-gray-600 mb-6 text-lg">
                      {slide.subtitle}
                    </p>

                    <div className="flex items-center justify-center md:justify-start mb-6">
                      <span className="text-2xl font-bold text-blue-600">
                        {slide.price}
                      </span>
                      <span className="ml-3 text-lg text-gray-400 line-through">
                        $159.99
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium transition-colors shadow-md">
                        {slide.buttonText}
                      </button>
                      <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-8 py-3 rounded-full font-medium transition-colors">
                        View Details
                      </button>
                    </div>

                    {/* Features list */}
                    <div className="mt-8 grid grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <svg
                          className="w-5 h-5 text-green-500 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-sm text-gray-600">
                          Free Shipping
                        </span>
                      </div>
                      <div className="flex items-center">
                        <svg
                          className="w-5 h-5 text-green-500 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-sm text-gray-600">
                          2 Year Warranty
                        </span>
                      </div>
                      <div className="flex items-center">
                        <svg
                          className="w-5 h-5 text-green-500 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-sm text-gray-600">
                          30-Day Returns
                        </span>
                      </div>
                      <div className="flex items-center">
                        <svg
                          className="w-5 h-5 text-green-500 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-sm text-gray-600">
                          24/7 Support
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Arrows */}
          <button
            ref={navigationPrevRef}
            className={`absolute top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors border border-gray-200 ${
              isRTL ? "right-4" : "left-4"
            }`}
            aria-label="Previous slide"
          >
            {isRTL ? (
              <ChevronRight className="w-6 h-6 text-gray-700" />
            ) : (
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            )}
          </button>

          <button
            ref={navigationNextRef}
            className={`absolute top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors border border-gray-200 ${
              isRTL ? "left-4" : "right-4"
            }`}
            aria-label="Next slide"
          >
            {isRTL ? (
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            ) : (
              <ChevronRight className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Progress indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className="w-3 h-3 rounded-full bg-gray-300 hover:bg-gray-400 transition-colors"
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => swiperInstance && swiperInstance.slideTo(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EcommerceSlider;
