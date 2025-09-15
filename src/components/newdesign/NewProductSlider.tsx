"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  HeartIcon,
  ShoppingCart,
} from "lucide-react";
import "swiper/css";
import Link from "next/link";

const ProductCardsSlider = () => {
  const [isRTL, setIsRTL] = useState(false);
  const swiperRef = useRef(null);
  const [favorites, setFavorites] = useState([]);

  // Product data
  const products = [
    {
      id: 1,
      image: "/p3.png",
      title: "Nike Air Max",
      price: "$129.99",
      colors: ["bg-red-500", "bg-blue-500", "bg-black", "bg-white"],
      isNew: true,
    },
    {
      id: 2,
      image: "p4.png",
      title: "Wireless Headphones",
      price: "$89.99",
      colors: ["bg-black", "bg-white", "bg-blue-500"],
      isNew: false,
    },
    {
      id: 3,
      image: "p5.png",
      title: "Luxury Watch",
      price: "$249.99",
      colors: ["bg-yellow-500", "bg-silver", "bg-black"],
      isNew: true,
    },
    {
      id: 4,
      image: "p1.png",
      title: "Running Shoes",
      price: "$119.99",
      colors: ["bg-green-500", "bg-blue-500", "bg-gray-400"],
      isNew: false,
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1099&q=80",
      title: "Smart Watch",
      price: "$199.99",
      colors: ["bg-black", "bg-gray-400", "bg-red-500"],
      isNew: true,
    },
    {
      id: 6,
      image:
        "https://images.unsplash.com/photo-1491553895911-0055eca6402d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
      title: "Sports Shoes",
      price: "$139.99",
      colors: ["bg-blue-500", "bg-red-500", "bg-white"],
      isNew: false,
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

  const toggleFavorite = (productId) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter((id) => id !== productId));
    } else {
      setFavorites([...favorites, productId]);
    }
  };

  return (
    <div className={` bg-white flex items-center justify-center py-16 `}>
      {/* Main Container */}
      <div className="w-full container mx-auto px-4  text-[#181D25] ">
        <div className="flex items-center justify-between mb-6 md:mb-10">
          <div className="font-semibold text-center text-[18px] md:text-[28px]">
            Popular Products
          </div>
          <div className="flex gap-1 items-center">
            <Link href="/products">View All</Link>
            <ChevronRight width={16} height={16} />
          </div>
        </div>

        {/* Slider Container */}
        <div className="relative w-full">
          <Swiper
            ref={swiperRef}
            modules={[Autoplay]}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            loop={true}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              480: {
                slidesPerView: 1,
              },
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
              1280: {
                slidesPerView: 4,
              },
            }}
            className="w-full"
          >
            {products.map((product) => (
              <SwiperSlide key={product.id} className="pb-10">
                <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                  {/* Image Section */}
                  <div className="relative h-56 md:h-64 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full x-object-cover transition-transform duration-500 hover:scale-105"
                    />

                    {/* New badge */}
                    {/* <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded text-xs font-medium"></div> */}

                    {/* Favorite button */}
                    {/* <button */}
                    {/*   onClick={() => toggleFavorite(product.id)} */}
                    {/*   className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors" */}
                    {/*   aria-label="Add to favorites" */}
                    {/* > */}
                    {/*   <Heart */}
                    {/*     className={`w-4 h-4 ${favorites.includes(product.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`} */}
                    {/*   /> */}
                    {/* </button> */}
                  </div>

                  {/* Content Section */}
                  <div className="p-4 flex-1 flex flex-col">
                    {/* Color options */}
                    <div className="flex space-x-2 mb-3">
                      {product.colors.map((color, index) => (
                        <div
                          key={index}
                          className={`w-4 h-4 rounded-full ${color} border border-gray-200`}
                        />
                      ))}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-[#364254] text-[14px] mb-2">
                      <Link href={"/product"}> {product.title}</Link>
                    </h3>

                    {/* Price */}
                    <p className="text-[#181D25] font-semibold text-[16px] md:text-[18px] mb-4">
                      {product.price}
                    </p>

                    {/* Add to cart and Favorite buttons */}
                    <div className="mt-auto flex space-x-2">
                      <button className="flex-1 bg-[#222934] cursor-pointer text-white py-2 px-4 rounded-[100px] font-medium transition-colors flex items-center justify-center">
                        Add to Cart
                      </button>
                      <div
                        className="w-[40px] h-[40px] bg-[#EEF1F6] flex items-center justify-center rounded-[100px] cursor-pointer"
                        onClick={() => toggleFavorite(product.id)}
                      >
                        <HeartIcon
                          width={16}
                          height={16}
                          className={`w-4 h-4 ${favorites.includes(product.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Arrows */}
          <button
            onClick={goPrev}
            className={`absolute top-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors border border-gray-200 ${
              isRTL ? "right-2 sm:right-4" : "left-2 sm:left-4"
            }`}
            style={{ top: "40%" }}
            aria-label="Previous products"
          >
            {isRTL ? (
              <ChevronRight className="w-5 h-5 text-gray-700 cursor-pointer" />
            ) : (
              <ChevronLeft className="w-5 h-5 text-gray-700 cursor-pointer" />
            )}
          </button>

          <button
            onClick={goNext}
            className={`absolute top-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors border border-gray-200 ${
              isRTL ? "left-2 sm:left-4" : "right-2 sm:right-4"
            }`}
            style={{ top: "40%" }}
            aria-label="Next products"
          >
            {isRTL ? (
              <ChevronLeft className="w-5 h-5 text-gray-700 cursor-pointer" />
            ) : (
              <ChevronRight className="w-5 h-5 text-gray-700 cursor-pointer" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCardsSlider;
