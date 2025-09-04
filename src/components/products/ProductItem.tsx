"use client";
import { Swiper, SwiperSlide } from "swiper/react";

import {
  Heart,
  Star,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

type Props = {
  product: any;
};
const ProductItem = ({ product }: Props) => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (productId) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter((id) => id !== productId));
    } else {
      setFavorites([...favorites, productId]);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />,
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="w-4 h-4 text-amber-400 fill-amber-400" />,
      );
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }

    return stars;
  };

  return (
    <div
      key={product.id}
      className="bg-white rounded-xl shadow-md overflow-hidden group transition-all duration-500 hover:shadow-xl hover:-translate-y-2"
    >
      {/* Product Image Container with Swiper Slider */}
      <div className="relative overflow-hidden">
        {/* Favorite Icon */}
        <button
          onClick={() => toggleFavorite(product.id)}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full transition-all duration-300 ${
            favorites.includes(product.id)
              ? "bg-rose-100 text-rose-500"
              : "bg-white/80 text-gray-500 hover:bg-rose-100 hover:text-rose-500"
          }`}
          aria-label="Add to favorites"
        >
          <Heart
            className={`w-5 h-5 ${favorites.includes(product.id) ? "fill-current" : ""}`}
            size={20}
          />
        </button>

        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-2 py-1 rounded-md z-10">
            {product.discount}% OFF
          </div>
        )}

        {/* New Badge */}
        {product.isNew && (
          <div className="absolute top-12 left-3 bg-emerald-600 text-white text-xs font-bold px-2 py-1 rounded-md z-10">
            NEW
          </div>
        )}

        {/* Product Image Slider */}
        <div className="h-60 overflow-hidden">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            navigation={{
              nextEl: `.next-${product.id}`,
              prevEl: `.prev-${product.id}`,
            }}
            pagination={{
              clickable: true,
              el: `.pagination-${product.id}`,
            }}
            loop={true}
            className="h-full"
          >
            {product.images.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={image}
                  alt={`${product.name} - View ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Arrows */}
          <button
            className={`prev-${product.id} absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-1 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 z-10`}
          >
            <ChevronRight className="w-4 h-4 ltr:rotate-180" />
          </button>
          <button
            className={`next-${product.id} absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-1 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 z-10`}
          >
            <ChevronLeft className="w-4 h-4 ltr:rotate-180" />
          </button>

          {/* Custom Pagination */}
          <div
            className={`pagination-${product.id} absolute bottom-2 left-0 right-0 flex justify-center space-x-1 rtl:space-x-reverse z-10`}
          ></div>
        </div>

        {/* Quick Add to Cart Button */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button className="w-full py-3 text-sm font-medium flex items-center justify-center">
            <Plus className="w-4 h-4 mr-2" />
            Quick Add to Cart
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-font mb-1 group-hover:text-secondary transition-colors duration-300 cursor-pointer">
          <Link href="/product"> {product.name}</Link>
        </h3>

        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex mr-2">{renderStars(product.rating)}</div>
          <span className="text-xs text-gray-500">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center mt-3">
          <span className="text-xl font-bold text-secondary">
            ${product.price}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through ml-2">
              ${product.originalPrice}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button className="mt-4 w-full bg-primary hover:bg-secondary text-white py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center cursor-pointer">
          <ShoppingCart className="w-5 h-5 mr-2" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
