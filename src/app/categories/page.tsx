"use client";
import React from "react";
import { ArrowLeft } from "lucide-react";
import BannerPage from "@/components/banners/BannerPage";
import Breadcrumb from "@/components/breadcrumbs/Breadcrumb";
import CategoryItem from "@/components/categories/CategoryItem";
import PageLayout from "@/components/layouts/PageLayout";

const CategoriesPage = () => {
  // Sample category data
  const categories = [
    {
      id: 1,
      title: "Electronics",
      subtitle: "Latest Gadgets & Devices",
      image:
        "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      productCount: 245,
    },
    {
      id: 2,
      title: "Fashion",
      subtitle: "Trending Styles",
      image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3f极B8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      productCount: 512,
    },
    {
      id: 3,
      title: "Home & Kitchen",
      subtitle: "Upgrade Your Space",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      productCount: 387,
    },
    {
      id: 4,
      title: "Beauty",
      subtitle: "Premium Products",
      image:
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      productCount: 198,
    },
    {
      id: 5,
      title: "Sports",
      subtitle: "Equipment & Apparel",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      productCount: 276,
    },
    {
      id: 6,
      title: "Books",
      subtitle: "Best Sellers & More",
      image:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      productCount: 154,
    },
    {
      id: 7,
      title: "Toys",
      subtitle: "Fun for Everyone",
      image:
        "https://images.unsplash.com/photo-1587654780291-39c9404d746b?极lib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      productCount: 321,
    },
    {
      id: 8,
      title: "Jewelry",
      subtitle: "Elegant Pieces",
      image:
        "https://media.istockphoto.com/id/1291336646/photo/black-pearl-gold-chain-necklace-on-black-background.jpg?s=2048x2048&w=is&k=20&c=B-pKdQbdn2himuqbOZ_geBQ1yef-OID0q0wdmrxj14I=",
      productCount: 132,
    },
  ];

  // Breadcrumb items
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Categories", href: "#" },
  ];

  return (
    <>
      <PageLayout>
        <BannerPage title={"All Brands"} />
        <Breadcrumb />
        <div className="bg-white border-b border-gray-200 py-2 px-4 sm:hidden">
          <button className="flex items-center text-gray-600 hover:text-secondary transition-colors duration-200">
            <ArrowLeft className="w-5 h-5 mr-1 rtl:mr-0 rtl:ml-1 rtl:rotate-180" />
            Back
          </button>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-title">All Categories</h2>
            <div className="text-sm text-secondary">
              Showing <span className="font-semibold">{categories.length}</span>{" "}
              categories
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category) => (
              <CategoryItem key={category.id} category={category} withCount />
            ))}
            {categories.map((category) => (
              <CategoryItem key={category.id} category={category} withCount />
            ))}
          </div>

          {/* Load More Button */}
          {/* <div className="text-center mt-12"> */}
          {/*   <button className="bg-white border border-amber-600 text-amber-700 hover:bg-amber-50 px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"> */}
          {/*     Load More Categories */}
          {/*   </button> */}
          {/* </div> */}
        </div>
      </PageLayout>
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
    </>
  );
};

export default CategoriesPage;
