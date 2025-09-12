"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";

const EcommerceSlider = () => {
  const [isRTL, setIsRTL] = useState(false);
  const swiperRef = useRef(null);

  // Full slides data with product images
  const slides = [
    {
      id: 1,
      image:
        "https://images.pexels.com/photos/4203054/pexels-photo-4203054.jpeg",
      title: "Premium Running Shoes",
      subtitle: "Experience ultimate comfort with our latest collection",
      buttonText: "Shop Now",
    },
    {
      id: 2,
      image:
        "https://images.pexels.com/photos/17924386/pexels-photo-17924386.jpeg",
      title: "Wireless Headphones",
      subtitle: "Immerse yourself in crystal clear sound quality",
      buttonText: "Shop Now",
    },
    {
      id: 3,
      image:
        "https://images.pexels.com/photos/6312107/pexels-photo-6312107.jpeg",
      title: "Luxury Watches",
      subtitle: "Elegant timepieces for the modern professional",
      buttonText: "Shop Now",
    },
    {
      id: 4,
      image:
        "https://images.pexels.com/photos/12039676/pexels-photo-12039676.jpeg",
      title: "Smart Home Devices",
      subtitle: "Transform your living space with intelligent technology",
      buttonText: "Shop Now",
    },
  ];

  const goNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const goPrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  return (
    <div
      className={` x-bg-gray-50 flex items-center justify-center  ${isRTL ? "rtl" : "ltr"}`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Main Container - Full width with max-width constraint */}
      <div className="w-full   ">
        {/* Slider Container - Full width */}
        <div className="relative w-full">
          <Swiper
            ref={swiperRef}
            modules={[Autoplay]}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={true}
            spaceBetween={0}
            slidesPerView={1}
            className="w-full rounded-xl overflow-hidden "
          >
            {slides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div className="flex flex-col items-center w-full">
                  {/* Image Section - Full width with proper aspect ratio */}
                  <div className="relative w-full x-bg-gradient-to-br x-from-blue-50 x-to-purple-50 overflow-hidden">
                    <div className="w-full h-64 sm:h-80 md:h-96 flex items-center justify-center">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full x-object-contain"
                      />
                    </div>

                    {/* Gradient overlay for better text visibility on images */}
                    {/* <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div> */}

                    {/* Discount badge */}
                    {/* <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium"> */}
                    {/*   25% OFF */}
                    {/* </div> */}
                  </div>

                  {/* Content Section - Below the image */}
                  <div className="w-full x-bg-white p-4 md:p-6 text-center bg-[#F5F7FA]">
                    <p className="text-[#181D25] mb-2  text-sm md:text-base">
                      {slide.subtitle}
                    </p>
                    <h2 className="text-xl md:text-2xl font-bold text-[#181D25] mb-4 md:mb-6">
                      {slide.title}
                    </h2>

                    <button className="bg-[#222934]  text-white px-6 py-2 md:px-8 md:py-3 rounded-full font-medium transition-colors shadow-md text-sm md:text-base cursor-pointer">
                      {slide.buttonText}
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Manual Navigation Arrows - Positioned at middle of image only */}
          <button
            onClick={goPrev}
            className={`absolute top-1/2 z-10 w-8 h-8 md:w-12 md:h-12 x-bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors x-border border-gray-200 ${
              isRTL
                ? "right-2 sm:right-4 md:right-6"
                : "left-2 sm:left-4 md:left-6"
            }`}
            style={{ top: "calc(50% - 100px)" }} // Adjusted to account for arrow height
            aria-label="Previous slide"
          >
            {isRTL ? (
              <ChevronRight className="w-4 h-4 md:w-6 md:h-6 text-gray-700 cursor-pointer" />
            ) : (
              <ChevronLeft className="w-4 h-4 md:w-6 md:h-6 text-gray-700 cursor-pointer" />
            )}
          </button>

          <button
            onClick={goNext}
            className={`absolute top-1/2 z-10 w-8 h-8 md:w-12 md:h-12 x-bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors x-border border-gray-200 ${
              isRTL
                ? "left-2 sm:left-4 md:left-6"
                : "right-2 sm:right-4 md:right-6"
            }`}
            style={{ top: "calc(50% - 100px)" }} // Adjusted to account for arrow height
            aria-label="Next slide"
          >
            {isRTL ? (
              <ChevronLeft className="w-4 h-4 md:w-6 md:h-6 text-gray-700 cursor-pointer" />
            ) : (
              <ChevronRight className="w-4 h-4 md:w-6 md:h-6 text-gray-700 cursor-pointer" />
            )}
          </button>
        </div>

        {/* Progress indicators */}
        {/* <div className="flex justify-center mt-6 md:mt-8 space-x-2"> */}
        {/*   {slides.map((_, index) => ( */}
        {/*     <button */}
        {/*       key={index} */}
        {/*       className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-gray-300 hover:bg-gray-400 transition-colors" */}
        {/*       aria-label={`Go to slide ${index + 1}`} */}
        {/*       onClick={() => */}
        {/*         swiperRef.current && swiperRef.current.swiper.slideTo(index) */}
        {/*       } */}
        {/*     /> */}
        {/*   ))} */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default EcommerceSlider;
