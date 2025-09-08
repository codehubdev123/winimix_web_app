// components/HeroBanner.tsx
"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Star,
  Heart,
} from "lucide-react";

// أنواع البيانات
interface Category {
  id: number;
  name: string;
  nameAr: string;
  image: string;
  subCategories: SubCategory[];
}

interface SubCategory {
  id: number;
  name: string;
  nameAr: string;
  brands?: string[];
  products?: Product[];
}

interface Product {
  id: number;
  name: string;
  nameAr: string;
  price: number;
  image: string;
  rating: number;
  discount?: number;
}

interface Slide {
  id: number;
  image: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  ctaText: string;
  ctaTextAr: string;
  badge?: string;
  badgeAr?: string;
}

// بيانات الفئات مع صور حقيقية
const categories: Category[] = [
  {
    id: 1,
    name: "Electronics",
    nameAr: "إلكترونيات",
    image:
      "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80",
    subCategories: [
      {
        id: 101,
        name: "Smartphones",
        nameAr: "هواتف ذكية",
        brands: ["Samsung", "Apple", "Huawei", "Xiaomi", "Oppo", "Vivo"],
        products: [
          {
            id: 1001,
            name: "iPhone 14 Pro",
            nameAr: "آيفون 14 برو",
            price: 999,
            image:
              "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
            rating: 4.8,
            discount: 10,
          },
          {
            id: 1002,
            name: "Samsung S23",
            nameAr: "سامسونج S23",
            price: 899,
            image:
              "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
            rating: 4.7,
          },
        ],
      },
      {
        id: 102,
        name: "Laptops",
        nameAr: "لابتوبات",
        brands: ["Dell", "HP", "Lenovo", "Asus", "Acer", "MSI"],
        products: [
          {
            id: 1003,
            name: "MacBook Pro",
            nameAr: "ماك بوك برو",
            price: 1299,
            image:
              "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
            rating: 4.9,
            discount: 5,
          },
          {
            id: 1004,
            name: "Dell XPS 13",
            nameAr: "ديل XPS 13",
            price: 999,
            image:
              "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
            rating: 4.6,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Fashion",
    nameAr: "موضة",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80",
    subCategories: [
      {
        id: 201,
        name: "Men's Clothing",
        nameAr: "ملابس رجالية",
        brands: ["Zara", "H&M", "Nike", "Adidas", "Puma", "Tommy"],
        products: [
          {
            id: 2001,
            name: "Casual Shirt",
            nameAr: "قميص كاجوال",
            price: 49,
            image:
              "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
            rating: 4.3,
            discount: 15,
          },
          {
            id: 2002,
            name: "Denim Jeans",
            nameAr: "جينز دينيم",
            price: 79,
            image:
              "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
            rating: 4.5,
          },
        ],
      },
      {
        id: 202,
        name: "Women's Clothing",
        nameAr: "ملابس نسائية",
        brands: ["Zara", "H&M", "Gucci", "Louis Vuitton", "Channel", "Dior"],
        products: [
          {
            id: 2003,
            name: "Summer Dress",
            nameAr: "فساتين صيفية",
            price: 59,
            image:
              "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
            rating: 4.7,
            discount: 20,
          },
          {
            id: 2004,
            name: "Designer Handbag",
            nameAr: "حقيبة يد مصمم",
            price: 199,
            image:
              "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
            rating: 4.8,
          },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Home & Kitchen",
    nameAr: "المنزل والمطبخ",
    image:
      "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80",
    subCategories: [
      {
        id: 301,
        name: "Furniture",
        nameAr: "أثاث",
        brands: [
          "IKEA",
          "Ashley",
          "Wayfair",
          "Home Depot",
          "Rooms To Go",
          "Raymour",
        ],
        products: [
          {
            id: 3001,
            name: "Modern Sofa",
            nameAr: "كنبة عصرية",
            price: 499,
            image:
              "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
            rating: 4.6,
            discount: 10,
          },
          {
            id: 3002,
            name: "Dining Table",
            nameAr: "طاولة طعام",
            price: 299,
            image:
              "https://images.unsplash.com/photo-1556020685-ae41abfc9365?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
            rating: 4.4,
          },
        ],
      },
      {
        id: 302,
        name: "Kitchenware",
        nameAr: "أدوات المطبخ",
        brands: [
          "KitchenAid",
          "Cuisinart",
          "Ninja",
          "Instant Pot",
          "Tefal",
          "Philips",
        ],
        products: [
          {
            id: 3003,
            name: "Blender",
            nameAr: "خلاط",
            price: 79,
            image:
              "https://images.unsplash.com/photo-1570222094114-d054a817e56b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
            rating: 4.5,
            discount: 25,
          },
          {
            id: 3004,
            name: "Air Fryer",
            nameAr: "قلاية هوائية",
            price: 99,
            image:
              "https://images.unsplash.com/photo-1611791484670-ce19b801d192?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
            rating: 4.7,
          },
        ],
      },
    ],
  },
];

// بيانات السلايدر مع صور حقيقية
const slides: Slide[] = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=500&q=80",
    title: "Summer Sale",
    titleAr: "تخفيضات الصيف",
    description: "Get up to 50% off on all summer items",
    descriptionAr: "احصل على خصم يصل إلى 50٪ على جميع منتجات الصيف",
    ctaText: "Shop Now",
    ctaTextAr: "تسوق الآن",
    badge: "HOT DEAL",
    badgeAr: "عرض حصري",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=500&q=80",
    title: "New Arrivals",
    titleAr: "وصل حديثاً",
    description: "Check out our latest products",
    descriptionAr: "اطلع على أحدث منتجاتنا",
    ctaText: "Discover",
    ctaTextAr: "اكتشف",
    badge: "NEW",
    badgeAr: "جديد",
  },
  {
    id: 3,
    image:
      "httpsimages.unsplash.com/photo-1556906781-2f0520405b71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=500&q=80",
    title: "Electronics Sale",
    titleAr: "تخفيضات الإلكترونيات",
    description: "Latest gadgets with amazing discounts",
    descriptionAr: "أحدث الأجهزة بخصومات مذهلة",
    ctaText: "Buy Now",
    ctaTextAr: "اشتري الآن",
    badge: "SALE",
    badgeAr: "تخفيضات",
  },
];

// مكون البانر الرئيسي
export default function HeroBanner() {
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  const [isArabic, setIsArabic] = useState(false); // حالة للغة

  return (
    <div className="relative w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-6">
        {/* زر تبديل اللغة */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setIsArabic(!isArabic)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            {isArabic ? "English" : "العربية"}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* القسم الأيسر: قائمة الفئات */}
          <div className="lg:w-1/4 relative">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm p-4">
              <h3 className="font-semibold text-lg mb-4 rtl:text-right ltr:text-left">
                {isArabic ? "الفئات" : "Categories"}
              </h3>

              <ul className="space-y-2">
                {categories.map((category) => (
                  <li
                    key={category.id}
                    className="relative"
                    onMouseEnter={() => setHoveredCategory(category.id)}
                    onMouseLeave={() => setHoveredCategory(null)}
                  >
                    <button className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors rtl:text-right ltr:text-left">
                      <span>{isArabic ? category.nameAr : category.name}</span>
                      <ChevronDown className="w-4 h-4 rtl:rotate-180" />
                    </button>

                    {/* قائمة فرعية تظهر عند التمرير */}
                    {hoveredCategory === category.id && (
                      <div className="absolute top-0 rtl:right-full ltr:left-full z-50 w-[800px] bg-white dark:bg-gray-800 shadow-xl rounded-lg p-4 border border-gray-200 dark:border-gray-700 grid grid-cols-3 gap-4">
                        {/* العمود الأول: الفئات الفرعية */}
                        <div className="border-r border-gray-200 dark:border-gray-700 pr-4 rtl:border-l rtl:border-r-0 rtl:pr-0 rtl:pl-4">
                          <h4 className="font-semibold text-lg mb-3 rtl:text-right ltr:text-left">
                            {isArabic ? "الفئات الفرعية" : "Sub Categories"}
                          </h4>
                          <ul className="space-y-2">
                            {category.subCategories.map((subCat) => (
                              <li key={subCat.id}>
                                <a
                                  href="#"
                                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 block py-2 rtl:text-right ltr:text-left font-medium"
                                >
                                  {isArabic ? subCat.nameAr : subCat.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* العمود الثاني: العلامات التجارية */}
                        <div className="border-r border-gray-200 dark:border-gray-700 pr-4 rtl:border-l rtl:border-r-0 rtl:pr-0 rtl:pl-4">
                          <h4 className="font-semibold text-lg mb-3 rtl:text-right ltr:text-left">
                            {isArabic ? "العلامات التجارية" : "Popular Brands"}
                          </h4>
                          <ul className="space-y-2">
                            {category.subCategories[0]?.brands
                              ?.slice(0, 8)
                              .map((brand, idx) => (
                                <li key={idx}>
                                  <a
                                    href="#"
                                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 block py-2 rtl:text-right ltr:text-left text-sm"
                                  >
                                    {brand}
                                  </a>
                                </li>
                              ))}
                          </ul>
                        </div>

                        {/* العمود الثالث: المنتجات المميزة */}
                        <div>
                          <h4 className="font-semibold text-lg mb-3 rtl:text-right ltr:text-left">
                            {isArabic ? "منتجات مميزة" : "Featured Products"}
                          </h4>
                          <div className="space-y-4">
                            {category.subCategories[0]?.products?.map(
                              (product) => (
                                <div
                                  key={product.id}
                                  className="flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                                >
                                  <div className="relative">
                                    <img
                                      src={product.image}
                                      alt={
                                        isArabic ? product.nameAr : product.name
                                      }
                                      className="w-16 h-16 object-cover rounded"
                                    />
                                    {product.discount && (
                                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                        -{product.discount}%
                                      </span>
                                    )}
                                  </div>
                                  <div className="flex-1 rtl:text-right ltr:text-left">
                                    <h5 className="font-medium text-sm line-clamp-1">
                                      {isArabic ? product.nameAr : product.name}
                                    </h5>
                                    <div className="flex items-center mt-1">
                                      {[...Array(5)].map((_, i) => (
                                        <Star
                                          key={i}
                                          className={`w-3 h-3 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                                        />
                                      ))}
                                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-1 rtl:mr-1 rtl:ml-0">
                                        ({product.rating})
                                      </span>
                                    </div>
                                    <div className="flex items-center justify-between mt-1">
                                      <span className="font-bold text-blue-600 dark:text-blue-400">
                                        ${product.price}
                                      </span>
                                      <button className="text-gray-500 hover:text-red-500">
                                        <Heart className="w-4 h-4" />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* القسم الأيمن: السلايدر */}
          <div className="lg:w-3/4">
            <div className="relative rounded-lg overflow-hidden shadow-md">
              <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                pagination={{
                  clickable: true,
                  el: ".swiper-pagination",
                  bulletClass:
                    "swiper-pagination-bullet !bg-gray-300 dark:!bg-gray-600",
                  bulletActiveClass:
                    "swiper-pagination-bullet-active !bg-blue-600 dark:!bg-blue-400",
                }}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                loop={true}
                className="hero-swiper"
              >
                {slides.map((slide) => (
                  <SwiperSlide key={slide.id}>
                    <div className="relative h-64 md:h-80 lg:h-96">
                      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent rtl:bg-gradient-to-l"></div>
                      <img
                        src={slide.image}
                        alt={isArabic ? slide.titleAr : slide.title}
                        className="w-full h-full object-cover"
                      />

                      {/* شارة العرض */}
                      {slide.badge && (
                        <div className="absolute top-4 rtl:right-4 ltr:left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {isArabic ? slide.badgeAr : slide.badge}
                        </div>
                      )}

                      <div className="absolute inset-0 flex items-center">
                        <div
                          className={`text-white p-8 max-w-md ${isArabic ? "rtl:text-right ml-auto" : "ltr:text-left mr-auto"}`}
                        >
                          <h2 className="text-3xl md:text-4xl font-bold mb-3">
                            {isArabic ? slide.titleAr : slide.title}
                          </h2>
                          <p className="mb-6 text-gray-100 text-lg">
                            {isArabic ? slide.descriptionAr : slide.description}
                          </p>
                          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center group">
                            {isArabic ? slide.ctaTextAr : slide.ctaText}
                            <ChevronRight
                              className={`w-5 h-5 transition-transform ${isArabic ? "rtl:rotate-180 mr-2 group-hover:mr-3" : "ml-2 group-hover:ml-3"}`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* تخصيص الـ pagination */}
              <div className="swiper-pagination !bottom-4"></div>

              {/* أزرار التنقل المخصصة */}
              <button className="swiper-button-prev absolute top-1/2 transform -translate-y-1/2 left-4 z-10 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all opacity-80 hover:opacity-100">
                <ChevronLeft className="w-6 h-6 text-gray-800 dark:text-white" />
              </button>

              <button className="swiper-button-next absolute top-1/2 transform -translate-y-1/2 right-4 z-10 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all opacity-80 hover:opacity-100">
                <ChevronRight className="w-6 h-6 text-gray-800 dark:text-white" />
              </button>
            </div>

            {/* شبكة المنتجات تحت السلايدر */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              {categories[0].subCategories[0].products?.map((product) => (
                <div
                  key={product.id}
                  className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
                >
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={isArabic ? product.nameAr : product.name}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                    {product.discount && (
                      <span className="absolute top-2 rtl:right-2 ltr:left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                        -{product.discount}%
                      </span>
                    )}
                    <button className="absolute top-2 rtl:left-2 ltr:right-2 text-gray-400 hover:text-red-500">
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="mt-3 rtl:text-right ltr:text-left">
                    <h4 className="font-medium text-sm line-clamp-1">
                      {isArabic ? product.nameAr : product.name}
                    </h4>
                    <div className="flex items-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-bold text-blue-600 dark:text-blue-400">
                        ${product.price}
                      </span>
                      <button className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 p-1 rounded">
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* إضافة CSS مخصص */}
      <style jsx global>{`
        .hero-swiper {
          width: 100%;
          height: 100%;
        }

        .swiper-pagination {
          position: absolute;
          text-align: center;
          transition: 300ms opacity;
          transform: translate3d(0, 0, 0);
          z-index: 10;
        }

        .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          opacity: 1;
          margin: 0 6px;
          transition: all 0.3s ease;
        }

        .swiper-pagination-bullet-active {
          width: 30px;
          border-radius: 10px;
        }

        /* تحسينات للوضع الداكن */
        .dark .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.5);
        }

        .dark .swiper-pagination-bullet-active {
          background: rgba(255, 255, 255, 0.9);
        }

        /* تحسينات للجوال */
        @media (max-width: 768px) {
          .swiper-button-prev,
          .swiper-button-next {
            display: none;
          }

          .swiper-pagination {
            bottom: 10px !important;
          }
        }

        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
