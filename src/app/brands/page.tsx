"use client";
import React from "react";
import Link from "next/link";
import { ChevronRight, Home, ArrowLeft, ChevronLeft } from "lucide-react";
import BrandItem from "@/components/brands/BrandItem";
import BannerPage from "@/components/banners/BannerPage";
import Breadcrumb from "@/components/breadcrumbs/Breadcrumb";
import PageLayout from "@/components/layouts/PageLayout";

const BrandsPage = () => {
  // Sample brands data
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
    <PageLayout>
      <BannerPage title={"All Brands"} />
      <Breadcrumb />

      {/* Back Button for Mobile */}
      <div className="bg-white border-b border-gray-200 py-2 px-4 sm:hidden">
        <button className="flex items-center text-gray-600 hover:text-[#222934] transition-colors duration-200">
          <ArrowLeft className="w-5 h-5 mr-1 rtl:mr-0 rtl:ml-1 rtl:rotate-180" />
          Back
        </button>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 ">
        {/* <div className="flex justify-between items-center mb-6"> */}
        {/*   <h2 className="text-2xl font-bold text-gray-900">All Brands</h2> */}
        {/*   <div className="text-sm text-[#222934]"> */}
        {/*     Showing <span className="font-semibold">30</span> Brand */}
        {/*   </div> */}
        {/* </div> */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {brands.map((brand) => (
            <BrandItem key={brand.id} brand={brand} withCount />
          ))}
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
    </PageLayout>
  );
};

export default BrandsPage;
