"use client";
import { useState, useEffect, useRef } from "react";

const ECommerceHero = () => {
  const [isRTL, setIsRTL] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [categoriesCollapsed, setCategoriesCollapsed] = useState(true);
  const categoryRefs = useRef([]);
  const dropdownRef = useRef(null);
  const categoriesContainerRef = useRef(null);

  // Sample data
  const categories = [
    {
      id: 1,
      name: "Electronics",
      icon: "fa-mobile-alt",
      subcategories: [
        "Smartphones",
        "Laptops",
        "Tablets",
        "Cameras",
        "Headphones",
        "Wearables",
      ],
      brands: ["Apple", "Samsung", "Sony", "LG", "Google", "Microsoft"],
      image:
        "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 2,
      name: "Fashion",
      icon: "fa-tshirt",
      subcategories: [
        "Men's Clothing",
        "Women's Clothing",
        "Kids' Clothing",
        "Shoes",
        "Bags",
        "Accessories",
      ],
      brands: ["Nike", "Adidas", "Zara", "H&M", "Levi's", "Gucci"],
      image:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 3,
      name: "Home & Kitchen",
      icon: "fa-home",
      subcategories: [
        "Furniture",
        "Decor",
        "Appliances",
        "Cookware",
        "Bedding",
        "Lighting",
      ],
      brands: ["IKEA", "Philips", "KitchenAid", "Tefal", "Whirlpool", "Dyson"],
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 4,
      name: "Beauty",
      icon: "fa-spa",
      subcategories: [
        "Skincare",
        "Makeup",
        "Haircare",
        "Fragrance",
        "Body Care",
        "Men's Grooming",
      ],
      brands: ["L'Oreal", "Maybelline", "Nivea", "Dove", "Neutrogena", "Olay"],
      image:
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
    },
  ];

  const bannerImages = [
    "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1556906781-2f0520405b71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  ];

  const [currentBanner, setCurrentBanner] = useState(0);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % bannerImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Check screen size for responsiveness
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  // Update dropdown position when active category changes
  useEffect(() => {
    if (activeCategory && !isMobile) {
      const categoryIndex = categories.findIndex(
        (cat) => cat.id === activeCategory.id,
      );
      if (categoryIndex !== -1 && categoryRefs.current[categoryIndex]) {
        const rect =
          categoryRefs.current[categoryIndex].getBoundingClientRect();
        setDropdownPosition({
          top: rect.top + window.scrollY,
          left: isRTL ? rect.left - 700 : rect.right,
        });
      }
    }
  }, [activeCategory, isRTL, isMobile]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        // Check if click is not on a category item
        const isCategoryClick = categoryRefs.current.some(
          (ref) => ref && ref.contains(event.target),
        );

        if (!isCategoryClick) {
          setActiveCategory(null);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Toggle categories collapse in mobile view
  const toggleCategoriesCollapse = () => {
    setCategoriesCollapsed(!categoriesCollapsed);
  };

  // Desktop dropdown component (opens to the right)
  const DesktopDropdown = () => (
    <div
      ref={dropdownRef}
      className="fixed bg-white shadow-xl rounded-lg z-50 p-6 grid grid-cols-3 gap-6"
      style={{
        top: `${dropdownPosition.top}px`,
        left: isRTL ? "auto" : `${dropdownPosition.left}px`,
        right: isRTL
          ? `${window.innerWidth - dropdownPosition.left}px`
          : "auto",
        width: "700px",
        opacity: activeCategory ? 1 : 0,
        visibility: activeCategory ? "visible" : "hidden",
        transform: activeCategory ? "translateY(0)" : "translateY(10px)",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={() => setActiveCategory(activeCategory)}
      onMouseLeave={() => setActiveCategory(null)}
    >
      {/* Subcategories Column */}
      <div>
        <h4 className="font-bold text-gray-800 mb-4 text-lg border-b pb-2">
          Subcategories
        </h4>
        <ul className="space-y-3">
          {activeCategory?.subcategories.map((sub, idx) => (
            <li
              key={idx}
              className="text-gray-700 hover:text-primary cursor-pointer transition-colors flex items-center"
            >
              <i
                className={`fas fa-chevron-right text-xs text-gray-400 ${isRTL ? "ml-2 rotate-180" : "mr-2"}`}
              ></i>
              {sub}
            </li>
          ))}
        </ul>
      </div>

      {/* Brands Column */}
      <div>
        <h4 className="font-bold text-gray-800 mb-4 text-lg border-b pb-2">
          Popular Brands
        </h4>
        <ul className="space-y-3">
          {activeCategory?.brands.map((brand, idx) => (
            <li
              key={idx}
              className="text-gray-700 hover:text-primary cursor-pointer transition-colors flex items-center"
            >
              <i
                className={`fas fa-chevron-right text-xs text-gray-400 ${isRTL ? "ml-2 rotate-180" : "mr-2"}`}
              ></i>
              {brand}
            </li>
          ))}
        </ul>
      </div>

      {/* Product Image Column */}
      <div className="flex flex-col">
        <h4 className="font-bold text-gray-800 mb-4 text-lg border-b pb-2">
          Featured Product
        </h4>
        <div className="flex-1 overflow-hidden rounded-lg">
          <img
            src={activeCategory?.image}
            alt={activeCategory?.name}
            className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
        <button className="mt-4 bg-primary hover:bg-secondary text-white font-medium py-2 px-4 rounded-lg w-full transition-colors">
          View All Products
        </button>
      </div>
    </div>
  );

  // Mobile dropdown component (opens directly below category)
  const MobileDropdown = ({ category }) => (
    <div className="bg-white rounded-b-lg shadow-sm p-6 border-t border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Subcategories */}
        <div>
          <h4 className="font-bold text-gray-800 mb-4 text-lg border-b pb-2">
            Subcategories
          </h4>
          <ul className="space-y-3">
            {category.subcategories.map((sub, idx) => (
              <li key={idx} className="text-gray-700 text-sm py-1">
                {sub}
              </li>
            ))}
          </ul>
        </div>

        {/* Brands */}
        <div>
          <h4 className="font-bold text-gray-800 mb-4 text-lg border-b pb-2">
            Popular Brands
          </h4>
          <ul className="space-y-3">
            {category.brands.map((brand, idx) => (
              <li key={idx} className="text-gray-700 text-sm py-1">
                {brand}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Product Image */}
      <div className="mt-6">
        <h4 className="font-bold text-gray-800 mb-4 text-lg border-b pb-2">
          Featured Product
        </h4>
        <div className="overflow-hidden rounded-lg">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-48 object-cover"
          />
        </div>
        <button className="mt-4 bg-primary text-white font-medium py-2 px-4 rounded-lg w-full">
          View All Products
        </button>
      </div>
    </div>
  );

  return (
    <div
      className={`min-h-screen bg-gray-50 ${isRTL ? "rtl" : "ltr"}`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Language Toggle for Demo */}
      <div className="flex justify-end p-4">
        <button
          onClick={() => setIsRTL(!isRTL)}
          className="px-4 py-2 bg-primary text-white rounded-lg font-medium flex items-center"
        >
          <i
            className={`fas ${isRTL ? "fa-globe-americas" : "fa-globe-asia"} ${isRTL ? "ml-2" : "mr-2"}`}
          ></i>
          {isRTL ? "Switch to LTR" : "Switch to RTL"}
        </button>
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Categories Sidebar */}
          <div className="w-full lg:w-1/4 bg-white rounded-xl shadow-sm overflow-hidden h-fit">
            <div
              className="p-4 bg-primary text-white font-bold text-lg flex justify-between items-center cursor-pointer"
              onClick={toggleCategoriesCollapse}
            >
              <div className="flex items-center">
                <i className={`fas fa-list ${isRTL ? "ml-2" : "mr-2"}`}></i>
                <span>Categories</span>
              </div>
              <i
                className={`fas ${categoriesCollapsed ? "fa-chevron-down" : "fa-chevron-up"} ${isRTL ? "mr-auto" : "ml-auto"}`}
              ></i>
            </div>

            <div
              ref={categoriesContainerRef}
              className="divide-y divide-gray-100 relative transition-all duration-300 ease-in-out"
              style={{
                maxHeight: isMobile && categoriesCollapsed ? "0" : "1000px",
                overflow: "hidden",
              }}
            >
              {categories.map((category, index) => (
                <div
                  key={category.id}
                  ref={(el) => (categoryRefs.current[index] = el)}
                  className="category-container relative"
                  onMouseEnter={() => !isMobile && setActiveCategory(category)}
                  onMouseLeave={() => !isMobile && setActiveCategory(null)}
                >
                  <div
                    className="category-item p-4 flex items-center justify-between"
                    onClick={() =>
                      isMobile &&
                      setActiveCategory(
                        activeCategory?.id === category.id ? null : category,
                      )
                    }
                  >
                    <div className="flex items-center">
                      <i
                        className={`fas ${category.icon} text-primary w-6`}
                      ></i>
                      <span
                        className={`${isRTL ? "mr-3" : "ml-3"} font-medium`}
                      >
                        {category.name}
                      </span>
                    </div>
                    <i
                      className={`fas fa-chevron-${isRTL ? "left" : "right"} text-gray-400 text-xs`}
                    ></i>
                  </div>

                  {/* Mobile dropdown directly below category */}
                  {isMobile && activeCategory?.id === category.id && (
                    <MobileDropdown category={category} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Banner */}
          <div className="flex-1 relative">
            <div className="relative rounded-xl overflow-hidden h-full">
              <img
                src={bannerImages[currentBanner]}
                alt="Special Offer"
                className="w-full h-full object-cover banner-slide"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-r from-black/60 to-transparent p-8 flex flex-col justify-center ${isRTL ? "rtl:bg-gradient-to-l" : ""}`}
              >
                <h2 className="text-3xl font-bold text-white mb-4">
                  Summer Sale
                </h2>
                <p className="text-white mb-6 text-lg">
                  Up to 50% off on selected items. Limited time offer!
                </p>
                <button className="bg-primary hover:bg-secondary text-white font-medium py-3 px-8 rounded-lg w-fit transition-colors flex items-center">
                  Shop Now
                  <i
                    className={`fas fa-arrow-right ${isRTL ? "mr-2 rotate-180" : "ml-2"}`}
                  ></i>
                </button>
              </div>

              {/* Banner Indicators */}
              <div
                className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 ${isRTL ? "rtl:space-x-reverse" : ""}`}
              >
                {bannerImages.map((_, idx) => (
                  <button
                    key={idx}
                    className={`w-3 h-3 rounded-full ${currentBanner === idx ? "bg-white" : "bg-white/50"}`}
                    onClick={() => setCurrentBanner(idx)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Desktop Dropdown (opens to the right above banner) */}
      {!isMobile && <DesktopDropdown />}

      <style jsx global>{`
        body {
          font-family: "Inter", sans-serif;
        }

        .category-item {
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .category-item:hover {
          background-color: #f3f4f6;
        }

        .banner-slide {
          animation: fadeIn 1s ease-in;
        }

        @keyframes fadeIn {
          from {
            opacity: 0.6;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default ECommerceHero;
