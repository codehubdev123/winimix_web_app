"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Star,
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  Plus,
  Minus,
  ArrowRight,
  HeartIcon,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import ProductCardItem from "@/components/ProductCardItem";
import Footer from "@/components/Footer";
import ImageZoom from "@/components/utils/ImageZoom";
import { useLocale } from "@/contexts/LocaleContext";
import PageLayout from "@/components/layouts/PageLayout";
import Breadcrumb from "@/components/breadcrumbs/Breadcrumb";
import BannerPage from "@/components/banners/BannerPage";
import ButtonBordered from "@/components/buttons/ButtonBordered";
import Button from "@/components/buttons/Button";
import { useCart } from "@/contexts/CartContext";
import ButtonIconLink from "@/components/buttons/ButtonIconLink";

// Mock product data - in real app, this would come from API/database
const getProductData = (id: string) => {
  return {
    id: id,
    name: "Premium Ceramic Brake Pads Set",
    nameAr: "مجموعة فحمات فرامل سيراميك ممتازة",
    price: 299,
    originalPrice: 399,
    discount: 25,
    rating: 5,
    reviews: 47,
    inStock: true,
    stockCount: 8,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    ],
    category: "Brake System",
    categoryAr: "نظام الفرامل",
    brand: "AutoPro",
    sku: "BP-CERAMIC-001",
    description: {
      en: "Our Premium Ceramic Brake Pads Set delivers exceptional stopping power and durability for your vehicle. Engineered with advanced ceramic compound technology, these brake pads provide superior performance in all driving conditions while minimizing brake dust and noise.",
      ar: "مجموعة فحمات الفرامل السيراميك الممتازة توفر قوة توقف استثنائية ومتانة لمركبتك. مصممة بتقنية المركب السيراميكي المتقدم، توفر هذه الفحمات أداءً فائقاً في جميع ظروف القيادة مع تقليل غبار الفرامل والضوضاء.",
    },
    features: {
      en: [
        "Advanced ceramic compound for superior braking performance",
        "Low dust formula keeps wheels cleaner longer",
        "Quiet operation with minimal brake noise",
        "Extended pad life for better value",
        "OEM-quality fit and finish",
        "Includes all necessary hardware and shims",
        "Temperature resistant up to 650°C",
        "Environmentally friendly materials",
      ],
      ar: [
        "مركب سيراميكي متقدم لأداء فرملة فائق",
        "تركيبة قليلة الغبار تحافظ على نظافة العجلات لفترة أطول",
        "تشغيل هادئ مع الحد الأدنى من ضوضاء الفرامل",
        "عمر أطول للفحمات لقيمة أفضل",
        "جودة وتشطيب بمستوى الشركة المصنعة الأصلية",
        "يشمل جميع الأجهزة والحشوات اللازمة",
        "مقاوم للحرارة حتى 650 درجة مئوية",
        "مواد صديقة للبيئة",
      ],
    },
    specifications: {
      en: [
        { label: "Material", value: "Premium Ceramic Compound" },
        { label: "Temperature Range", value: "-40°C to 650°C" },
        { label: "Friction Coefficient", value: "0.35-0.45" },
        { label: "Wear Rate", value: "Low (Grade A)" },
        { label: "Noise Level", value: "Ultra Quiet" },
        { label: "Dust Level", value: "Minimal" },
        { label: "Warranty", value: "2 Years / 50,000 KM" },
        { label: "Certification", value: "ECE R90, ISO 9001" },
      ],
      ar: [
        { label: "المادة", value: "مركب سيراميكي ممتاز" },
        { label: "نطاق درجة الحرارة", value: "-40°م إلى 650°م" },
        { label: "معامل الاحتكاك", value: "0.35-0.45" },
        { label: "معدل التآكل", value: "منخفض (درجة أ)" },
        { label: "مستوى الضوضاء", value: "هادئ جداً" },
        { label: "مستوى الغبار", value: "الحد الأدنى" },
        { label: "الضمان", value: "سنتان / 50,000 كم" },
        { label: "الشهادة", value: "ECE R90, ISO 9001" },
      ],
    },
    compatibility: [
      "Toyota Camry 2018-2023",
      "Honda Accord 2016-2022",
      "Nissan Altima 2019-2023",
      "Hyundai Sonata 2020-2023",
      "Kia Optima 2016-2020",
    ],
  };
};

export default function ProductDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { locale, changeLocale, t } = useLocale();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [favorites, setFavorites] = useState([]);

  const product = getProductData(params.id);
  const toggleFavorite = (productId) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter((id) => id !== productId));
    } else {
      setFavorites([...favorites, productId]);
    }
  };

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
  ];
  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        nameAr: product.nameAr,
        price: product.price,
        image: product.images[0],
        inStock: product.inStock,
      });
    }
  };

  const relatedProducts = [
    {
      id: "2",
      name: "Brake Rotors Set",
      nameAr: "مجموعة أقراص الفرامل",
      price: 599,
      image: "/p1.webp",
      imageActive: "/p11.png",
    },
    {
      id: "3",
      name: "Brake Fluid DOT 4",
      nameAr: "سائل الفرامل DOT 4",
      price: 45,
      image: "/p5.jpg",
      imageActive: "/p55.png",
    },
    {
      id: "4",
      name: "Brake Calipers",
      nameAr: "كاليبرات الفرامل",
      price: 899,
      image: "/p3.jpg",
      imageActive: "/p33.png",
    },
    {
      id: "5",
      name: "Brake Lines Kit",
      nameAr: "طقم خطوط الفرامل",
      price: 159,
      image: "/p6.jpeg",
      imageActive: "/p66.png",
    },
  ];

  return (
    <PageLayout>
      <div className="container mx-auto pt-12 pb-8">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-1 text-sm text-gray-700">
            <li>
              <a
                href="#"
                className="block transition-colors hover:text-gray-900"
              >
                {" "}
                Home{" "}
              </a>
            </li>

            <li className="rtl:rotate-180">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </li>

            <li>
              <a href="#" className="block transition-colors text-[#9CA3AF] ">
                Categories
              </a>
            </li>
          </ol>
        </nav>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            {/* Main Image with Zoom */}
            <div className="mb-4 relative">
              <ImageZoom
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={locale === "ar" ? product.nameAr : product.name}
                className="w-full h-96 lg:h-[500px] rounded-lg shadow-lg"
              />

              {/* Discount Badge */}
              {product.discount && (
                <div
                  className={`absolute top-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold ${
                    locale === "ar" ? "left-4" : "right-4"
                  }`}
                >
                  -{product.discount}%
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            <div className="x-grid x-grid-cols-5 flex items-center justify-start gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative overflow-hidden rounded border-2 transition-all duration-200 cursor-pointer w-[96px] h-[96px] ${
                    selectedImage === index
                      ? "border-[#222934] ring-2 ring-[#222934]"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${locale === "ar" ? product.nameAr : product.name} - View ${index + 1}`}
                    className="w-full h-full x-h-16 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {locale === "ar" ? product.categoryAr : product.category}
                </span>
                <span
                  className={`text-sm text-gray-500 ${locale === "ar" ? "mr-4" : "ml-4"}`}
                >
                  SKU: {product.sku}
                </span>
              </div>

              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {locale === "ar" ? product.nameAr : product.name}
              </h1>

              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < product.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span
                  className={`text-gray-600 ${locale === "ar" ? "mr-2" : "ml-2"}`}
                >
                  ({product.reviews} {locale === "ar" ? "تقييم" : "reviews"})
                </span>
                <span
                  className={`font-semibold ${locale === "ar" ? "mr-4" : "ml-4"} ${product.inStock ? "text-green-600" : "text-red-600"}`}
                >
                  {product.inStock
                    ? locale === "ar"
                      ? "متوفر"
                      : "In Stock"
                    : locale === "ar"
                      ? "غير متوفر"
                      : "Out of Stock"}
                </span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <span className="text-3xl font-bold text-[#222934]">
                    {product.price} SAR
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-gray-500 line-through">
                      {product.originalPrice} SAR
                    </span>
                  )}
                  {product.discount && (
                    <span className="bg-green-600 text-white px-2 py-1 rounded text-sm font-semibold">
                      {locale === "ar"
                        ? `وفر ${product.discount}%`
                        : `Save ${product.discount}%`}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {locale === "ar"
                    ? "شامل الضريبة. يتم حساب الشحن عند الدفع."
                    : "Tax included. Shipping calculated at checkout."}
                </p>
              </div>
            </div>

            {/* Vehicle Compatibility */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">
                {locale === "ar" ? "توافق المركبة" : "Compatibility"}
              </label>
              <select
                className={`w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#222934] ${
                  locale === "ar" ? "text-right" : "text-left"
                }`}
              >
                <option value="">
                  {locale === "ar" ? "اختر مركبتك" : "Select your vehicle"}
                </option>
                {product.compatibility.map((vehicle, index) => (
                  <option key={index} value={vehicle}>
                    {vehicle}
                  </option>
                ))}
              </select>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">
                {locale === "ar" ? "الكمية" : "Quantity"}
              </label>
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-gray-100 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-3 border-x border-gray-300 min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-sm text-gray-600">
                  {locale === "ar"
                    ? `فقط ${product.stockCount} متبقي في المخزون!`
                    : `Only ${product.stockCount} left in stock!`}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <Button
                  name="Add To Cart"
                  disabled={!product.inStock}
                  onClick={handleAddToCart}
                />
                <Link href="/checkout">
                  <ButtonBordered name={"Buy Now"} />
                </Link>
              </div>

              <div className="flex justify-center space-x-4 rtl:space-x-reverse">
                <ButtonIconLink>
                  <Share2 className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                  {locale === "ar" ? "شارك" : "Share"}
                </ButtonIconLink>
                <ButtonIconLink>
                  <Heart className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                  {locale === "ar" ? "أضف للمفضلة" : "Add to Wishlist"}
                </ButtonIconLink>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center space-x-3 rtl:space-x-reverse p-3 bg-gray-50 rounded-lg">
                <Truck className="w-6 h-6 text-[#222934]" />
                <div>
                  <div className="font-semibold text-sm">
                    {locale === "ar" ? "توصيل مجاني" : "Free Delivery"}
                  </div>
                  <div className="text-xs text-gray-600">
                    {locale === "ar"
                      ? "للطلبات أكثر من 500 ريال"
                      : "Orders over 500 SAR"}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse p-3 bg-gray-50 rounded-lg">
                <Shield className="w-6 h-6 text-green-600" />
                <div>
                  <div className="font-semibold text-sm">
                    {locale === "ar" ? "ضمان سنتان" : "2 Year Warranty"}
                  </div>
                  <div className="text-xs text-gray-600">
                    {locale === "ar" ? "جودة مضمونة" : "Quality guaranteed"}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse p-3 bg-gray-50 rounded-lg">
                <RotateCcw className="w-6 h-6 text-orange-600" />
                <div>
                  <div className="font-semibold text-sm">
                    {locale === "ar" ? "إرجاع سهل" : "Easy Returns"}
                  </div>
                  <div className="text-xs text-gray-600">
                    {locale === "ar"
                      ? "سياسة إرجاع 30 يوم"
                      : "30 day return policy"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Information Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 rtl:space-x-reverse flex-wrap ">
              {[
                {
                  id: "description",
                  label: locale === "ar" ? "الوصف" : "Description",
                },
                {
                  id: "specifications",
                  label: locale === "ar" ? "المواصفات" : "Specifications",
                },
                {
                  id: "reviews",
                  label: `${locale === "ar" ? "التقييمات" : "Reviews"} (${product.reviews})`,
                },
                {
                  id: "installation",
                  label: locale === "ar" ? "التركيب" : "Installation",
                },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium transition-colors ${
                    activeTab === tab.id
                      ? "border-[#222934] text-[#222934]"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {/* Description Tab */}
            {activeTab === "description" && (
              <div className="prose max-w-none">
                <h3 className="text-2xl font-semibold mb-4">
                  {locale === "ar" ? "وصف المنتج" : "Product Description"}
                </h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {locale === "ar"
                    ? product.description.ar
                    : product.description.en}
                </p>

                <h4 className="text-xl font-semibold mb-3">
                  {locale === "ar" ? "الميزات الرئيسية:" : "Key Features:"}
                </h4>
                <ul className="list-disc pl-6 rtl:pr-6 rtl:pl-0 space-y-2 text-gray-700">
                  {(locale === "ar"
                    ? product.features.ar
                    : product.features.en
                  ).map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Specifications Tab */}
            {activeTab === "specifications" && (
              <div>
                <h3 className="text-2xl font-semibold mb-6">
                  {locale === "ar"
                    ? "المواصفات التقنية"
                    : "Technical Specifications"}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(locale === "ar"
                    ? product.specifications.ar
                    : product.specifications.en
                  ).map((spec, index) => (
                    <div
                      key={index}
                      className="flex justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <span className="font-semibold text-gray-800">
                        {spec.label}:
                      </span>
                      <span className="text-gray-600">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === "reviews" && (
              <div>
                <h3 className="text-2xl font-semibold mb-6">
                  {locale === "ar" ? "تقييمات العملاء" : "Customer Reviews"}
                </h3>
                <div className="space-y-6">
                  {/* Review Summary */}
                  <div className="flex items-center space-x-6 rtl:space-x-reverse p-6 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-[#222934]">
                        {product.rating}.0
                      </div>
                      <div className="flex items-center justify-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {product.reviews}{" "}
                        {locale === "ar" ? "تقييم" : "reviews"}
                      </div>
                    </div>
                    <div className="flex-1">
                      {[5, 4, 3, 2, 1].map((stars) => (
                        <div
                          key={stars}
                          className="flex items-center space-x-2 rtl:space-x-reverse mb-1"
                        >
                          <span className="text-sm w-8">{stars}★</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-yellow-400 h-2 rounded-full"
                              style={{
                                width:
                                  stars === 5
                                    ? "80%"
                                    : stars === 4
                                      ? "15%"
                                      : "5%",
                              }}
                            />
                          </div>
                          <span className="text-sm text-gray-600 w-8">
                            {stars === 5 ? "80%" : stars === 4 ? "15%" : "5%"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Individual Reviews */}
                  <div className="space-y-4">
                    {[
                      {
                        name: "Ahmed Al-Rashid",
                        rating: 5,
                        date: "2024-01-15",
                        comment:
                          locale === "ar"
                            ? "منتج ممتاز، جودة عالية وأداء رائع. أنصح به بشدة."
                            : "Excellent product, high quality and great performance. Highly recommended.",
                      },
                      {
                        name: "Sarah Mohammed",
                        rating: 5,
                        date: "2024-01-10",
                        comment:
                          locale === "ar"
                            ? "فحمات فرامل رائعة، هادئة جداً ولا تترك غبار. سعر مناسب."
                            : "Great brake pads, very quiet and no dust. Good price.",
                      },
                    ].map((review, index) => (
                      <div
                        key={index}
                        className="p-4 border border-gray-200 rounded-lg"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <span className="font-semibold">{review.name}</span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                                />
                              ))}
                            </div>
                          </div>
                          <span className="text-sm text-gray-500">
                            {review.date}
                          </span>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Installation Tab */}
            {activeTab === "installation" && (
              <div>
                <h3 className="text-2xl font-semibold mb-6">
                  {locale === "ar" ? "دليل التركيب" : "Installation Guide"}
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold mb-4">
                      {locale === "ar"
                        ? "الأدوات المطلوبة:"
                        : "Required Tools:"}
                    </h4>
                    <ul className="list-disc pl-6 rtl:pr-6 rtl:pl-0 space-y-1 text-gray-700 mb-6">
                      <li>{locale === "ar" ? "مفتاح ربط" : "Lug wrench"}</li>
                      <li>{locale === "ar" ? "رافعة سيارة" : "Car jack"}</li>
                      <li>
                        {locale === "ar" ? "حامل السيارة" : "Jack stands"}
                      </li>
                      <li>{locale === "ar" ? "مفك براغي" : "Screwdriver"}</li>
                      <li>{locale === "ar" ? "مفتاح ألن" : "Allen key set"}</li>
                    </ul>

                    <h4 className="text-lg font-semibold mb-4">
                      {locale === "ar"
                        ? "خطوات التركيب:"
                        : "Installation Steps:"}
                    </h4>
                    <ol className="list-decimal pl-6 rtl:pr-6 rtl:pl-0 space-y-2 text-gray-700">
                      <li>
                        {locale === "ar"
                          ? "ارفع السيارة وثبتها بأمان"
                          : "Safely lift and secure the vehicle"}
                      </li>
                      <li>
                        {locale === "ar" ? "أزل العجلة" : "Remove the wheel"}
                      </li>
                      <li>
                        {locale === "ar"
                          ? "أزل الكاليبر القديم"
                          : "Remove the old caliper"}
                      </li>
                      <li>
                        {locale === "ar"
                          ? "أزل الفحمات القديمة"
                          : "Remove old brake pads"}
                      </li>
                      <li>
                        {locale === "ar"
                          ? "نظف منطقة التركيب"
                          : "Clean the installation area"}
                      </li>
                      <li>
                        {locale === "ar"
                          ? "ركب الفحمات الجديدة"
                          : "Install new brake pads"}
                      </li>
                      <li>
                        {locale === "ar"
                          ? "أعد تركيب الكاليبر"
                          : "Reinstall the caliper"}
                      </li>
                      <li>
                        {locale === "ar"
                          ? "اختبر الفرامل قبل القيادة"
                          : "Test brakes before driving"}
                      </li>
                    </ol>
                  </div>
                  <div>
                    <img
                      src="/placeholder.svg?height=400&width=500"
                      alt={
                        locale === "ar"
                          ? "مخطط تركيب فحمات الفرامل"
                          : "Brake pad installation diagram"
                      }
                      className="w-full rounded-lg shadow-lg"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            {locale === "ar" ? "منتجات ذات صلة" : "Related Products"}
          </h2>
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 pb-20">
            {products.map((product) => (
              <div
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col pb-10"
                key={product.id}
              >
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
                    {product.title}
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
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
