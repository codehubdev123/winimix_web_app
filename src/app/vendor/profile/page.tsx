"use client";

import OrderCards from "@/components/cards/OrderCards";
import ProductListCard from "@/components/cards/ProductListCard";
import ProductItem from "@/components/products/ProductItem";
import AdminProfile from "@/components/profiles/AdminProfile";
import Link from "next/link";
import { useState } from "react";

const VendorProfilePage = () => {
  const [activeTab, setActiveTab] = useState("products");
  const [isFollowing, setIsFollowing] = useState(false);

  // Vendor data
  const vendor = {
    name: "Tech Gadgets",
    category: "Electronics & Accessories",
    rating: 4.7,
    reviews: 1284,
    joined: "March 2022",
    description:
      "We provide the latest tech gadgets and accessories with premium quality. Our products come with warranty and excellent customer support.",
    image:
      "https://images.unsplash.com/photo-1563014959-7aaa83350992?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    coverImage:
      "https://images.unsplash.com/photo-1468436139062-f60a71c5c892?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80",
    followers: 24500,
    following: 342,
    responseRate: 98,
    responseTime: "within 2 hours",
    shippingRate: 95,
    products: 128,
  };

  // Sample products
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
  //     name: "Wireless Earbuds",
  //     price: 79.99,
  //     rating: 4.5,
  //     reviews: 245,
  //     image:
  //       "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  //     category: "Audio",
  //   },
  //   {
  //     id: 2,
  //     name: "Smart Watch",
  //     price: 199.99,
  //     rating: 4.8,
  //     reviews: 512,
  //     image:
  //       "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  //     category: "Wearables",
  //   },
  //   {
  //     id: 3,
  //     name: "Phone Case",
  //     price: 24.99,
  //     rating: 4.3,
  //     reviews: 187,
  //     image:
  //       "https://images.unsplash.com/photo-1601593346740-9b7e84c06f1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  //     category: "Accessories",
  //   },
  //   {
  //     id: 4,
  //     name: "Portable Charger",
  //     price: 49.99,
  //     rating: 4.6,
  //     reviews: 324,
  //     image:
  //       "https://images.unsplash.com/photo-1574944985076-5742d84e7b61?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  //     category: "Power",
  //   },
  //   {
  //     id: 5,
  //     name: "Bluetooth Speaker",
  //     price: 89.99,
  //     rating: 4.7,
  //     reviews: 432,
  //     image:
  //       "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  //     category: "Audio",
  //   },
  //   {
  //     id: 6,
  //     name: "VR Headset",
  //     price: 299.99,
  //     rating: 4.4,
  //     reviews: 156,
  //     image:
  //       "https://images.unsplash.com/photo-1593118247619-e2d6f056869e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  //     category: "Gaming",
  //   },
  // ];

  // Sample reviews
  const reviews = [
    {
      id: 1,
      user: "Sarah Johnson",
      rating: 5,
      date: "2 days ago",
      comment:
        "Excellent product quality and fast shipping. Will definitely buy again!",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    },
    {
      id: 2,
      user: "Michael Chen",
      rating: 4,
      date: "1 week ago",
      comment:
        "Good product but the delivery was a bit delayed. Otherwise satisfied with the purchase.",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    },
    {
      id: 3,
      user: "Emma Wilson",
      rating: 5,
      date: "2 weeks ago",
      comment:
        "Amazing customer service! They helped me choose the right product for my needs.",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    },
  ];

  // Render star ratings
  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < Math.floor(rating) ? "text-amber-400 fill-current" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Photo */}
      <div className="h-[30rem] w-full relative">
        <img
          src={vendor.coverImage}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

        {/* Back Button */}
        <Link
          href="/"
          className="absolute top-6 ltr:left-6 rtl:right-6 bg-white/90 text-gray-800 p-2 rounded-full hover:bg-white transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </Link>
      </div>

      {/* Vendor Info Section */}
      <div className="container mx-auto px-4 py-6 -mt-24 relative z-10">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row items-start">
            {/* Vendor Avatar */}
            <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-6 rtl:md:mr-0 rtl:md:ml-6">
              <div className="relative">
                <img
                  src={vendor.image}
                  alt={vendor.name}
                  className="w-32 h-32 rounded-2xl object-cover border-4 border-white shadow-lg"
                />
                <div className="absolute -bottom-2 -right-2 bg-amber-500 text-white rounded-full p-2 shadow-md">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Vendor Details */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {vendor.name}
                  </h1>
                  <p className="text-gray-600 mt-1">{vendor.category}</p>

                  <div className="flex items-center mt-3">
                    <div className="flex items-center">
                      {renderStars(vendor.rating)}
                      <span className="ml-2 text-gray-700 font-medium">
                        {vendor.rating}
                      </span>
                    </div>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="text-gray-500">
                      {vendor.reviews.toLocaleString()} reviews
                    </span>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="text-gray-500">
                      Joined {vendor.joined}
                    </span>
                  </div>

                  <p className="mt-4 text-gray-700">{vendor.description}</p>
                </div>

                <div className="mt-6 md:mt-0 flex space-x-3 rtl:space-x-reverse">
                  <button
                    className={`px-6 py-3 rounded-lg font-medium transition-colors ${isFollowing ? "bg-gray-200 text-gray-800" : "bg-primary-500 text-white hover:bg-primary-600"}`}
                    onClick={() => setIsFollowing(!isFollowing)}
                  >
                    {isFollowing ? "Following" : "Follow"}
                  </button>
                  <button className="p-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                      />
                    </svg>
                  </button>
                  <button className="p-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-gray-200">
                {/* <div className="text-center"> */}
                {/*   <div className="text-2xl font-bold text-gray-900"> */}
                {/*     {vendor.products} */}
                {/*   </div> */}
                {/*   <div className="text-gray-600 font-bold">Products</div> */}
                {/* </div> */}
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">$ 100</div>
                  <div className="text-gray-600 font-bold">Total Balance</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-700">$ 60</div>
                  <div className="text-green-700 font-bold">
                    Current Balance
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">$ 40</div>
                  <div className="text-orange-600 font-bold">
                    Withdraw Balance
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex overflow-x-auto border-b border-gray-200">
          <button
            className={`px-4 py-3 font-medium whitespace-nowrap ${activeTab === "products" ? "text-primary-600 border-b-2 border-primary-600" : "text-gray-500 hover:text-gray-700"}`}
            onClick={() => setActiveTab("products")}
          >
            Products ({vendor.products})
          </button>
          <button
            className={`px-4 py-3 font-medium whitespace-nowrap ${activeTab === "reviews" ? "text-primary-600 border-b-2 border-primary-600" : "text-gray-500 hover:text-gray-700"}`}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews ({vendor.reviews})
          </button>
          <button
            className={`px-4 py-3 font-medium whitespace-nowrap ${activeTab === "about" ? "text-primary-600 border-b-2 border-primary-600" : "text-gray-500 hover:text-gray-700"}`}
            onClick={() => setActiveTab("about")}
          >
            Management
          </button>
          <button
            className={`px-4 py-3 font-medium whitespace-nowrap ${activeTab === "policies" ? "text-primary-600 border-b-2 border-primary-600" : "text-gray-500 hover:text-gray-700"}`}
            onClick={() => setActiveTab("policies")}
          >
            Orders
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-8">
          {activeTab === "products" && <ProductListCard />}

          {activeTab === "reviews" && (
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Customer Reviews
              </h2>

              <div className="space-y-6">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="border-b border-gray-100 pb-6 last:border-b-0 last:pb-0"
                  >
                    <div className="flex items-start">
                      <img
                        src={review.avatar}
                        alt={review.user}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="ltr:ml-4 rtl:mr-4 flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-900">
                            {review.user}
                          </h3>
                          <span className="text-sm text-gray-500">
                            {review.date}
                          </span>
                        </div>
                        <div className="flex items-center mt-1">
                          {renderStars(review.rating)}
                        </div>
                        <p className="mt-2 text-gray-700">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "about" && (
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <AdminProfile />
            </div>
          )}

          {activeTab === "policies" && (
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <OrderCards />
            </div>
          )}
        </div>
      </div>

      {/* RTL/LTR Toggle for demo purposes */}
      <div className="fixed bottom-4 right-4 z-10">
        <button
          className="bg-gray-800 text-white p-3 rounded-full shadow-lg"
          onClick={() => {
            const html = document.querySelector("html");
            if (html.getAttribute("dir") === "rtl") {
              html.setAttribute("dir", "ltr");
            } else {
              html.setAttribute("dir", "rtl");
            }
          }}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default VendorProfilePage;
