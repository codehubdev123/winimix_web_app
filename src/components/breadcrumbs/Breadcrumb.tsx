"use client";

import { ChevronLeft, ChevronRight, Home } from "lucide-react";
import Link from "next/link";

const Breadcrumb = () => {
  // Breadcrumb items
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Brands", href: "#" },
  ];

  return (
    <div className="bg-[#F5F7FA] border-b border-gray-200 py-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 rtl:space-x-reverse">
            <li>
              <div>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-[#222934] transition-colors duration-200"
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
                    <span className="text-sm font-medium text-[#222934]">
                      {item.label}
                    </span>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-sm font-medium text-gray-500 hover:text-[#222934] transition-colors duration-200"
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
  );
};

export default Breadcrumb;
