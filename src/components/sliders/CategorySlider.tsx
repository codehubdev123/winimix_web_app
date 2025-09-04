"use client";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CategorySlider = () => {
  const swiperRef = useRef(null);

  // Sample category data
  const categories = [
    {
      id: 1,
      title: "Electronics",
      subtitle: "Latest Gadgets",
      image:
        "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 2,
      title: "Fashion",
      subtitle: "Trending Styles",
      image:
        "https://plus.unsplash.com/premium_photo-1683984171269-04c84ee23234?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      title: "Home & Kitchen",
      subtitle: "Upgrade Your Space",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 4,
      title: "Beauty",
      subtitle: "Premium Products",
      image:
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 5,
      title: "Sports",
      subtitle: "Equipment & Apparel",
      image:
        "https://plus.unsplash.com/premium_photo-1661284917589-d96587cbe886?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 6,
      title: "Books",
      subtitle: "Best Sellers & More",
      image:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 7,
      title: "Toys",
      subtitle: "Fun for Everyone",
      image:
        "https://images.unsplash.com/photo-1587654780291-39c9404d746b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 8,
      title: "Jewelry",
      subtitle: "Elegant Pieces",
      image:
        "https://media.istockphoto.com/id/1291336646/photo/black-pearl-gold-chain-necklace-on-black-background.jpg?s=2048x2048&w=is&k=20&c=B-pKdQbdn2himuqbOZ_geBQ1yef-OID0q0wdmrxj14I=",
    },
  ];

  return (
    <div className="w-full py-16  px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6 px-2">
          <h2 className="text-2xl md:text-3xl font-bold text-title">
            Shop by Category
          </h2>
          <div className="flex space-x-2 rtl:space-x-reverse">
            <Link
              href="/categories"
              className="text-sm text-secondary hover:underline"
            >
              All Categories
            </Link>
            {/* <button */}
            {/*   className="custom-prev bg-amber-600 hover:bg-amber-700 text-white p-3 rounded-full transition-colors duration-300" */}
            {/*   aria-label="Previous categories" */}
            {/* > */}
            {/*   <ChevronLeft size={16} width={20} height={20} /> */}
            {/* </button> */}
            {/* <button */}
            {/*   className="custom-next bg-amber-600 hover:bg-amber-700 text-white p-3 rounded-full transition-colors duration-300" */}
            {/*   aria-label="Next categories" */}
            {/* > */}
            {/*   <ChevronRight size={16} width={20} height={20} /> */}
            {/* </button> */}
          </div>
        </div>

        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={16}
          slidesPerView={2}
          breakpoints={{
            480: {
              slidesPerView: 3,
            },
            640: {
              slidesPerView: 4,
            },
            768: {
              slidesPerView: 4,
            },
            1024: {
              slidesPerView: 5,
            },
            1280: {
              slidesPerView: 6,
            },
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          navigation={{
            prevEl: ".custom-prev",
            nextEl: ".custom-next",
          }}
          loop={true}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          className="category-swiper px-2 py-4"
          dir="ltr" // This ensures Swiper works correctly in both LTR and RTL
        >
          {categories.map((category) => (
            <SwiperSlide key={category.id}>
              <div className="relative group overflow-hidden rounded-xl shadow-md hover:shadow-lg h-48 cursor-pointer bg-white transition-all duration-300">
                {/* Background Image with Overlay */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${category.image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-gray-900/30"></div>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-center">
                  <h3 className="text-sm font-bold mb-1">{category.title}</h3>
                  <p className="text-xs opacity-90">{category.subtitle}</p>
                </div>

                {/* Hover Effect Indicator */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-primary text-white text-xs font-bold py-2 px-4 rounded-full">
                    Shop Now
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default CategorySlider;
