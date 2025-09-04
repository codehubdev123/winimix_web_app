"use client";
import React from "react";
import Link from "next/link";
import { ChevronRight, Home, ArrowLeft, ChevronLeft } from "lucide-react";
import BrandItem from "@/components/brands/BrandItem";

const BrandsPage = () => {
  // Sample category data
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

  // Breadcrumb items
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Brands", href: "#" },
  ];

  return (
    <div className="min-h-screen bg-gray-50" dir="ltr">
      {/* Banner Section */}
      <div className="relative py-16 md:py-24 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80')`,
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600/80 to-amber-800/80 z-1"></div>

        {/* Animated Blobs */}
        <div className="absolute top-0 left-0 w-full h-full z-2">
          <div className="absolute top-10 left-10 w-72 h-72 bg-amber-500 rounded-full filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-32 w-96 h-96 bg-amber-400 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-32 w-80 h-80 bg-amber-300 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            All Brands
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Discover our wide range of products organized by category
          </p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 rtl:space-x-reverse">
              <li>
                <div>
                  <Link
                    href="/"
                    className="text-gray-400 hover:text-amber-600 transition-colors duration-200"
                  >
                    <Home className="w-5 h-5" />
                    <span className="sr-only">Home</span>
                  </Link>
                </div>
              </li>
              {breadcrumbItems.map((item, index) => (
                <li key={index}>
                  <div className="flex items-center">
                    <ChevronRight className="w-4 h-4 text-gray-400 mx-2 rtl:rotate-180" />
                    {index === breadcrumbItems.length - 1 ? (
                      <span className="text-sm font-medium text-amber-600">
                        {item.label}
                      </span>
                    ) : (
                      <Link
                        href={item.href}
                        className="text-sm font-medium text-gray-500 hover:text-amber-600 transition-colors duration-200"
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </div>

      {/* Back Button for Mobile */}
      <div className="bg-white border-b border-gray-200 py-2 px-4 sm:hidden">
        <button className="flex items-center text-gray-600 hover:text-amber-700 transition-colors duration-200">
          <ArrowLeft className="w-5 h-5 mr-1 rtl:mr-0 rtl:ml-1 rtl:rotate-180" />
          Back
        </button>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">All Brands</h2>
          <div className="text-sm text-amber-600">
            Showing <span className="font-semibold">30</span> Brand
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {brands.map((brand) => (
            <BrandItem key={brand.id} brand={brand} withCount />
          ))}
        </div>

        {/* Load More Button */}
        {/* <div className="text-center mt-12"> */}
        {/*   <button className="bg-white border border-amber-600 text-amber-700 hover:bg-amber-50 px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"> */}
        {/*     Load More Categories */}
        {/*   </button> */}
        {/* </div> */}
      </div>

      {/* Newsletter Section */}
      <div className="bg-amber-50 border-t border-amber-200 py-12 px-4 sm:px-6 lg:px-8 mt-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Stay Updated
          </h2>
          <p className="text-gray-600 mb-6">
            Subscribe to our newsletter to get updates on new brands and
            products
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
            <button className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: scale(1) translate(0px, 0px);
          }
          33% {
            transform: scale(1.1) translate(30px, -50px);
          }
          66% {
            transform: scale(0.9) translate(-20px, 20px);
          }
          100% {
            transform: scale(1) translate(0px, 0px);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default BrandsPage;
