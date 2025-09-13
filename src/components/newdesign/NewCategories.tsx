"use client";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import BrandItem from "../brands/BrandItem";
import NewCategoryItem from "./NewCategortItem";

const NewCategories = () => {
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
    <div className="w-full py-16 px-4 bg-white">
      <div className="container mx-auto">
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
              slidesPerView: 6,
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
              <NewCategoryItem brand={brand} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className=" flex items-center justify-center">
          <Link
            className="mt-12 bg-[#F5F7FA]  text-[#222934]   px-6 py-2 md:px-8  rounded-full font-medium transition-colors shadow-sm text-sm  cursor-pointer"
            href={"/categories"}
          >
            All Categories
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewCategories;
