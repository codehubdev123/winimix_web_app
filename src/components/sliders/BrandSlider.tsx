"use client";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import BrandItem from "../brands/BrandItem";
import { ChevronRight } from "lucide-react";

const BrandSlider = () => {
  const swiperRef = useRef(null);

  // Sample brand data
  const brands = [
    {
      id: 1,
      name: "Nike",
      logo: "https://cdn.worldvectorlogo.com/logos/nike-6.svg",
      url: "#",
    },
    {
      id: 2,
      name: "Apple",
      logo: "https://cdn.worldvectorlogo.com/logos/apple-13.svg",
      url: "#",
    },
    {
      id: 3,
      name: "Samsung",
      logo: "https://cdn.worldvectorlogo.com/logos/samsung-2.svg",
      url: "#",
    },
    {
      id: 4,
      name: "Adidas",
      logo: "https://cdn.worldvectorlogo.com/logos/adidas-2.svg",
      url: "#",
    },
    {
      id: 5,
      name: "Sony",
      logo: "https://cdn.worldvectorlogo.com/logos/sony-2.svg",
      url: "#",
    },
    {
      id: 6,
      name: "Microsoft",
      logo: "https://cdn.worldvectorlogo.com/logos/microsoft-5.svg",
      url: "#",
    },
    {
      id: 7,
      name: "LG",
      logo: "https://cdn.worldvectorlogo.com/logos/lg-electronics-1.svg",
      url: "#",
    },
    {
      id: 8,
      name: "Puma",
      logo: "https://cdn.worldvectorlogo.com/logos/puma-logo.svg",
      url: "#",
    },
    {
      id: 9,
      name: "Canon",
      logo: "https://cdn.worldvectorlogo.com/logos/canon-2.svg",
      url: "#",
    },
    {
      id: 10,
      name: "Dell",
      logo: "https://cdn.worldvectorlogo.com/logos/dell-1.svg",
      url: "#",
    },
  ];

  return (
    <div className="w-full py-16 px-4 bg-gray-100">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6 px-2">
          <h2 className="text-[18px] md:text-[28px] font-bold text-title">
            Shop by Brands
          </h2>
          <div className="flex space-x-2 rtl:space-x-reverse">
            <div className="flex gap-1 items-center">
              <Link href="/brands">All Brands</Link>
              <ChevronRight width={16} height={16} />
            </div>
          </div>
        </div>
        {/* <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-gray-900"> */}
        {/*   Shop by Brand */}
        {/* </h2> */}

        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={30}
          slidesPerView={2}
          breakpoints={{
            480: {
              slidesPerView: 3,
            },
            640: {
              slidesPerView: 4,
            },
            768: {
              slidesPerView: 5,
            },
            1024: {
              slidesPerView: 6,
            },
            1280: {
              slidesPerView: 7,
            },
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          className="brands-swiper"
          dir="ltr"
        >
          {brands.map((brand) => (
            <SwiperSlide key={brand.id}>
              <BrandItem brand={brand} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default BrandSlider;
