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
import ProductItem from "../products/ProductItem";
type Props = {
  pTitle?: string;
  isWhite?: boolean;
};
const ProductCardsSlider = ({ pTitle, isWhite = false }: Props) => {
  const [isRTL, setIsRTL] = useState(false);
  const swiperRef = useRef(null);
  const [favorites, setFavorites] = useState([]);

  // Product data
  const products = [
    {
      id: 1,
      name: "Wireless  Headphones",
      price: 89.99,
      originalPrice: 129.99,
      images: [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      ],
      rating: 4.5,
      reviews: 124,
      category: "Electronics",
      brand: "Sony",
      inStock: true,
      isNew: true,
      discount: 30,
    },
    {
      id: 2,
      name: "Smart Watch Series 5",
      price: 199.99,
      originalPrice: 249.99,
      images: [
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlf极x8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&极t=crop&w=500&q=80",
      ],
      rating: 4.8,
      category: "Electronics",
      brand: "Sony",
      inStock: true,

      reviews: 89,
      isNew: false,
      discount: 20,
    },
    {
      id: 3,
      name: "Premium Leather Backpack",
      price: 129.99,
      originalPrice: 159.99,
      images: [
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      ],
      rating: 4.3,
      category: "Electronics",
      brand: "Sony",
      inStock: true,

      reviews: 67,
      isNew: true,
      discount: 18,
    },
    {
      id: 4,
      name: "Wireless Charging Pad",
      price: 39.99,
      originalPrice: 49.99,
      images: [
        "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&ixid=M3wxMjA3f极B8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3极%3D&auto=format&fit=crop&w=500&q=80",
      ],
      rating: 4.2,
      category: "Electronics",
      brand: "Sony",
      inStock: true,

      reviews: 42,
      isNew: false,
      discount: 20,
    },
    {
      id: 5,
      name: "Minimalist Sneakers",
      price: 79.99,
      originalPrice: 99.99,
      images: [
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      ],
      rating: 4.6,
      category: "Electronics",
      brand: "Sony",
      inStock: true,

      reviews: 156,
      isNew: true,
      discount: 20,
    },
    {
      id: 6,
      name: "Smart Home Speaker",
      price: 129.99,
      originalPrice: 149.99,
      images: [
        "https://images.unsplash.com/photo-1589003077984-894e133dabab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwa极0by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1589003077984-894e133dabab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwa极0by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1589003077984-894e133dabab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwa极0by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      ],
      rating: 4.7,
      category: "Electronics",
      brand: "Sony",
      inStock: true,

      reviews: 201,
      isNew: false,
      discount: 13,
    },
    {
      id: 7,
      name: "Designer Sunglasses",
      price: 149.99,
      originalPrice: 199.99,
      images: [
        "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      ],
      rating: 4.4,
      category: "Electronics",
      brand: "Sony",
      inStock: true,

      reviews: 78,
      isNew: true,
      discount: 25,
    },
    {
      id: 8,
      name: "Fitness Tracker Band",
      price: 59.99,
      originalPrice: 79.99,
      images: [
        "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      ],
      rating: 4.1,
      category: "Electronics",
      brand: "Sony",
      inStock: true,

      reviews: 95,
      isNew: false,
      discount: 25,
    },
  ];

  //   [
  //   {
  //     id: 1,
  //     image: "/p3.png",
  //     title: "Nike Air Max",
  //     price: "$129.99",
  //     colors: ["bg-red-500", "bg-blue-500", "bg-black", "bg-white"],
  //     isNew: true,
  //   },
  //   {
  //     id: 2,
  //     image: "p4.png",
  //     title: "Wireless Headphones",
  //     price: "$89.99",
  //     colors: ["bg-black", "bg-white", "bg-blue-500"],
  //     isNew: false,
  //   },
  //   {
  //     id: 3,
  //     image: "p5.png",
  //     title: "Luxury Watch",
  //     price: "$249.99",
  //     colors: ["bg-yellow-500", "bg-silver", "bg-black"],
  //     isNew: true,
  //   },
  //   {
  //     id: 4,
  //     image: "p1.png",
  //     title: "Running Shoes",
  //     price: "$119.99",
  //     colors: ["bg-green-500", "bg-blue-500", "bg-gray-400"],
  //     isNew: false,
  //   },
  //   {
  //     id: 5,
  //     image:
  //       "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1099&q=80",
  //     title: "Smart Watch",
  //     price: "$199.99",
  //     colors: ["bg-black", "bg-gray-400", "bg-red-500"],
  //     isNew: true,
  //   },
  //   {
  //     id: 6,
  //     image:
  //       "https://images.unsplash.com/photo-1491553895911-0055eca6402d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
  //     title: "Sports Shoes",
  //     price: "$139.99",
  //     colors: ["bg-blue-500", "bg-red-500", "bg-white"],
  //     isNew: false,
  //   },
  // ];

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
    <div
      className={` ${isWhite ? "bg-white" : "bg-gray-50"} flex items-center justify-center py-16`}
    >
      {/* Main Container */}
      <div className="w-full container mx-auto px-4  text-[#181D25] ">
        <div className="flex items-center justify-between mb-6 md:mb-10">
          <div className="font-semibold text-center text-[18px] md:text-[28px]">
            {pTitle}
          </div>
          <div className="flex gap-1 items-center">
            <Link href="/products">View All</Link>
            <ChevronRight width={16} height={16} />
          </div>
        </div>

        {/* Slider Container */}
        <div className="relative w-full" dir="ltr">
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
                <ProductItem key={product.id} product={product} />
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
