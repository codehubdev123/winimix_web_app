"use client";

import { useState, useEffect } from "react";
import {
  Home,
  ShoppingCart,
  User,
  Heart,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";

const NewMobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRTL, setIsRTL] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, isMobile]);

  // Menu items
  const menuItems = [
    { id: 1, label: "Home", icon: Home, href: "#" },
    { id: 2, label: "Products", icon: ShoppingCart, href: "#" },
    { id: 3, label: "Wishlist", icon: Heart, href: "#" },
    { id: 4, label: "Account", icon: User, href: "#" },
    { id: 5, label: "Settings", icon: Settings, href: "#" },
    { id: 6, label: "Help & Support", icon: HelpCircle, href: "#" },
  ];

  const secondaryItems = [{ id: 7, label: "Logout", icon: LogOut, href: "#" }];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`min-h-screen bg-gray-100 flex flex-col ${isRTL ? "rtl" : "ltr"}`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* RTL Toggle Button */}
      <button
        onClick={() => setIsRTL(!isRTL)}
        className="fixed top-4 right-4 z-50 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium flex items-center shadow-md hover:bg-blue-700 transition-colors"
      >
        <span className="mr-2">{isRTL ? "LTR" : "RTL"}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Mobile Sidebar Demo
        </h1>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleSidebar}
          className="md:hidden fixed top-4 left-4 z-40 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>

        <p className="text-gray-600 mb-4">
          This is a demo of a mobile sidebar drawer with RTL/LTR support.
        </p>
        <p className="text-gray-600 mb-4">
          Resize your browser to mobile size or use the toggle button to see the
          sidebar in action.
        </p>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Features:</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Mobile-responsive sidebar</li>
            <li>Smooth open/close animations</li>
            <li>Full RTL and LTR support</li>
            <li>Backdrop overlay</li>
            <li>Prevents body scroll when open</li>
            <li>Accessible navigation</li>
          </ul>
        </div>
      </div>

      {/* Backdrop Overlay */}
      {isOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed top-0 ${isRTL ? "right-0" : "left-0"} h-full w-64 bg-white shadow-xl z-40 transform transition-transform duration-300 ease-in-out
        ${isOpen && isMobile ? "translate-x-0" : isRTL ? "translate-x-full" : "-translate-x-full"}
        md:relative md:translate-x-0 md:shadow-none
      `}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              M
            </div>
            <span className="ml-3 font-semibold text-gray-800">My Store</span>
          </div>
          <button
            onClick={toggleSidebar}
            className="md:hidden w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="h-full flex flex-col justify-between overflow-y-auto">
          {/* Main Navigation */}
          <nav className="p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors group"
                    >
                      <Icon className="w-5 h-5" />
                      <span className="ml-3 font-medium">{item.label}</span>
                      <ChevronRight
                        className={`w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity ${isRTL ? "rotate-180" : ""}`}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Secondary Navigation */}
          <div className="p-4 border-t border-gray-200">
            <ul className="space-y-2">
              {secondaryItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors group"
                    >
                      <Icon className="w-5 h-5" />
                      <span className="ml-3 font-medium">{item.label}</span>
                      <ChevronRight
                        className={`w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity ${isRTL ? "rotate-180" : ""}`}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* App Version */}
          <div className="p-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">v1.0.0</p>
          </div>
        </div>
      </div>

      {/* Custom CSS for smooth transitions */}
      <style jsx>{`
        .transform {
          transition: transform 0.3s ease-in-out;
        }
        body {
          overflow-x: hidden;
        }
      `}</style>
    </div>
  );
};

export default NewMobileSidebar;
