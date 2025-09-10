"use client";
import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";
import { useState, useEffect, useRef } from "react";
import { cn } from "./utils/utils";
import { useLocale } from "@/contexts/LocaleContext";
import { ChevronRight, MonitorCheck } from "lucide-react";
import HomeSlider from "./sliders/HomeSlider";

const ECommerceHero = () => {
  const { theme, setTheme, isDark } = useTheme();
  const [isRTL, setIsRTL] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [categoriesCollapsed, setCategoriesCollapsed] = useState(false);
  const [mobileCategoriesCollapsed, setMobileCategoriesCollapsed] =
    useState(true);
  const { locale, changeLocale, t } = useLocale();
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const categoryRefs = useRef([]);
  const dropdownRef = useRef(null);
  const categoriesContainerRef = useRef(null);
  const [selectedLanguage, setSelectedLanguage] = useState("EN");
  const languageRef = useRef(null);
  const countryRef = useRef(null);
  const [selectedCountry, setSelectedCountry] = useState({
    name: "Saudi Arabia",
    code: "KSA",
    flag: "🇸🇦",
  });

  const countries = [
    { name: "Saudi Arabia", code: "KSA", flag: "🇸🇦" },
    { name: "Bahrain", code: "BH", flag: "🇧🇭" },
    { name: "Emirates", code: "UAE", flag: "🇦🇪" },
    { name: "Qatar", code: "QA", flag: "🇶🇦" },
    { name: "Kuwait", code: "KW", flag: "🇰🇼" },
  ];

  const languages = [
    { code: "EN", name: "English" },
    { code: "AR", name: "العربية" },
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (languageRef.current && !languageRef.current.contains(event.target)) {
        setIsLanguageDropdownOpen(false);
      }
      if (countryRef.current && !countryRef.current.contains(event.target)) {
        setIsCountryDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setIsCountryDropdownOpen(false);
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language.code);
    setIsLanguageDropdownOpen(false);
    changeLocale();
  };

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  const setSystemTheme = () => {
    setTheme("system");
  };

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
    {
      id: 5,
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
        "https://images.unsplash.com/photo-1596462502276-27bfdc403348?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
    },

    {
      id: 6,
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

    {
      id: 7,
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

    {
      id: 8,
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
    {
      id: 9,
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

    {
      id: 10,
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
        "https://images.unsplash.com/photo-1596462502276-27bfdc403348?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
    },

    {
      id: 12,
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
        "https://images.unsplash.com/photo-1596462502274-27bfdc403348?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
    },

    {
      id: 14,
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
        "https://images.unsplash.com/photo-1596462502272-27bfdc403348?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
    },

    {
      id: 16,
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
        "https://images.unsplash.com/photo-1596462502270-27bfdc403348?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
    },

    {
      id: 18,
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
        "https://images.unsplash.com/photo-1596462502268-27bfdc403348?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
    },
  ];

  const bannerImages = [
    "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
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
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);

      // Reset categories collapse state on desktop
      if (!mobile) {
        setCategoriesCollapsed(false);
        setMobileCategoriesCollapsed(true);
      } else {
        setCategoriesCollapsed(false);
      }
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

  // Toggle categories collapse for desktop
  const toggleCategoriesCollapse = () => {
    setCategoriesCollapsed(!categoriesCollapsed);
  };

  // Toggle mobile categories collapse
  const toggleMobileCategoriesCollapse = () => {
    setMobileCategoriesCollapsed(!mobileCategoriesCollapsed);
  };

  // Desktop dropdown component (opens to the right)
  const DesktopDropdown = () => (
    <div
      ref={dropdownRef}
      className="fixed bg-white dark:bg-primary-dark shadow-xl rounded-lg z-50 p-6 grid grid-cols-3 gap-6"
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
        <h4 className="font-bold text-font dark:text-white mb-4 text-[16px] ">
          Smartphones
        </h4>
        <ul className="space-y-3">
          {activeCategory?.subcategories.map((sub, idx) => (
            <li
              key={idx}
              className="text-font dark:text-white hover:text-primary cursor-pointer transition-colors flex items-center"
            >
              <i
                className={`fas fa-chevron-right text-xs text-[#cdf] ${isRTL ? "ml-2 rotate-180" : "mr-2"}`}
              ></i>
              {sub}
            </li>
          ))}
        </ul>
      </div>

      {/* Brands Column */}
      <div>
        <h4 className="font-bold text-font dark:text-white mb-4 text-[16px] ">
          Accessories
        </h4>
        <ul className="space-y-3">
          {activeCategory?.brands.map((brand, idx) => (
            <li
              key={idx}
              className="text-font dark:text-white hover:text-primary cursor-pointer transition-colors flex items-center"
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
    <div className="min-h-screen bg-white dark:bg-primary-dark">
      {/* Navbar with Categories Toggle (only on larger screens) */}
      <header className="bg-primary dark:bg-header-dark shadow-sm hidden lg:block ">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center gap-6 h-[48px]">
            <div
              className="flex items-center justify-between bg-secondary dark:bg-secondary-dark w-1/4  font-medium px-[24px] py-[12px] cursor-pointer rounded-t-[8px]"
              onClick={toggleCategoriesCollapse}
            >
              <div className="flex gap-2 items-center">
                <Image
                  src="/categories.svg"
                  width={18}
                  height={18}
                  alt="categories"
                />

                <h1 className="flex h-full justify-center items-center text-white">
                  Categories
                </h1>
              </div>
              <div>
                {/* className={`fas ${categoriesCollapsed ? "fa-chevron-down" : "fa-chevron-up"} ${isRTL ? "mr-2" : "ml-2"}`} */}
                <Image
                  src="/arrow_down.svg"
                  width={16}
                  height={16}
                  alt="arrow down"
                  className={cn({ "rotate-180": categoriesCollapsed })}
                />
              </div>
            </div>
            {/* middle header */}
            <div className="flex items-center justify-between flex-1 bg-xyellow-400">
              <nav className="flex text-left space-x-8  flex-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <a
                    key={index}
                    href="#"
                    className="text-gray-700 hover:underline text-white px-4 py-2"
                  >
                    Best Sellers
                  </a>
                ))}
              </nav>
            </div>
            {/* right header */}
            <div className="flex items-center space-x-x4 bg-bxlue-400 text-[14px]  h-full gap-3">
              {/* language dropdown */}
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                {/* Language Selector */}
                <div className="relative" ref={languageRef}>
                  <button
                    onClick={() => {
                      setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
                      setIsCountryDropdownOpen(false);
                    }}
                    className="flex items-center hover:underline transition-colors duration-200 text-white cursor-pointer"
                  >
                    <span>{selectedLanguage} </span>
                    <svg
                      className={`ml-1 rtl:ml-2 rtl:mr-1 w-3 h-3 transition-transform duration-200 ${isLanguageDropdownOpen ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </button>

                  {/* Language Dropdown Menu */}
                  {isLanguageDropdownOpen && (
                    <div className="absolute right-0 rtl:right-auto rtl:left-0 mt-1 w-32 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                      {languages.map((language) => (
                        <button
                          key={language.code}
                          onClick={() => handleLanguageSelect(language)}
                          className={`block w-full text-left px-4 py-2 text-sm hover:bg-primary hover:text-white transition-colors duration-200 ${selectedLanguage === language.code ? "text-secondary" : "text-gray-700"}`}
                        >
                          {language.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Country Selector */}
              </div>
              {/* countries dropdown */}
              <div className="relative" ref={countryRef}>
                <button
                  onClick={() => {
                    setIsCountryDropdownOpen(!isCountryDropdownOpen);
                    setIsLanguageDropdownOpen(false);
                  }}
                  className="flex items-center hover:text-secondary transition-colors duration-200"
                >
                  <span className="mr-1 rtl:mr-2 rtl:ml-1">
                    {selectedCountry.flag}
                  </span>
                  <span className="hidden sm:inline text-white">
                    {selectedCountry.code}
                  </span>
                  <Image
                    src="/arrow_down.svg"
                    width={16}
                    height={16}
                    alt="arrow down"
                    className={cn({ "rotate-180": categoriesCollapsed })}
                  />

                  {/* <svg */}
                  {/*   className={`ml-1 rtl:ml-0 rtl:mr-1 w-3 h-3 transition-transform duration-200 ${isCountryDropdownOpen ? "rotate-180" : ""}`} */}
                  {/*   fill="none" */}
                  {/*   stroke="currentColor" */}
                  {/*   viewBox="0 0 24 24" */}
                  {/*   xmlns="http://www.w3.org/2000/svg" */}
                  {/* > */}
                  {/*   <path */}
                  {/*     strokeLinecap="round" */}
                  {/*     strokeLinejoin="round" */}
                  {/*     strokeWidth="2" */}
                  {/*     d="M19 9l-7 7-7-7" */}
                  {/*   ></path> */}
                  {/* </svg> */}
                </button>

                {/* Country Dropdown Menu */}
                {isCountryDropdownOpen && (
                  <div className="absolute right-0 rtl:right-auto rtl:left-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    {countries.map((country) => (
                      <button
                        key={country.code}
                        onClick={() => handleCountrySelect(country)}
                        className={`block w-full text-left px-4 py-2 text-sm hover:bg-primary hover:text-white transition-colors duration-200 ${selectedCountry.code === country.code ? "text-secondary" : "text-gray-700"}`}
                      >
                        <span className="mr-2 rtl:mr-2 rtl:ml-2">
                          {country.flag}
                        </span>
                        {country.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Language Toggle for Demo */}
      {/* <div className="flex justify-end p-4"> */}
      {/*   <button */}
      {/*     onClick={() => setIsRTL(!isRTL)} */}
      {/*     className="px-4 py-2 bg-primary text-white rounded-lg font-medium flex items-center" */}
      {/*   > */}
      {/*     <i */}
      {/*       className={`fas ${isRTL ? "fa-globe-americas" : "fa-globe-asia"} ${isRTL ? "ml-2" : "mr-2"}`} */}
      {/*     ></i> */}
      {/*     {isRTL ? "Switch to LTR" : "Switch to RTL"} */}
      {/*   </button> */}
      {/* </div> */}

      {/* Hero Section #ebeef2 */}
      <section className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:gap-6">
          {/* Categories Sidebar - Hidden when collapsed on desktop */}
          {(!categoriesCollapsed || isMobile) && (
            <div className="w-full lg:w-1/4 bg-white  shadow-sm overflow-hidden h-fit">
              {/* Mobile Categories Toggle */}
              {isMobile && (
                <div
                  className="p-4 bg-secondary text-white font-bold text-lg flex justify-between items-center cursor-pointer"
                  onClick={toggleMobileCategoriesCollapse}
                >
                  <div className="flex items-center">
                    <i className={`fas fa-list ${isRTL ? "ml-2" : "mr-2"}`}></i>
                    <span>Categories</span>
                  </div>
                  {/* <i */}
                  {/*   className={`fas ${mobileCategoriesCollapsed ? "fa-chevron-down" : "fa-chevron-up"} ${isRTL ? "mr-auto" : "ml-auto"}`} */}
                  {/* ></i> */}
                  <Image
                    src="/categories.svg"
                    width={18}
                    height={18}
                    alt="categories"
                  />
                </div>
              )}
              {/* Desktop Categories Title */}
              {/* {!isMobile && ( */}
              {/*   <div className="p-4 bg-primary text-white font-bold text-lg"> */}
              {/*     <i className={`fas fa-list ${isRTL ? "ml-2" : "mr-2"}`}></i> */}
              {/*     <span>Categories</span> */}
              {/*   </div> */}
              {/* )} */}
              <div
                ref={categoriesContainerRef}
                className="divide-y divide-gray-100 dark:divide-none relative transition-all duration-300 ease-in-out bg-white dark:bg-primary-dark p-[9px] lg:h-[520px] lg:!overflow-y-auto no-scrollbar border border-[#EEF1F6] dark:border-[#333D4C]"
                style={{
                  maxHeight:
                    isMobile && mobileCategoriesCollapsed ? "0" : "1000px",
                  overflow: "hidden",
                }}
              >
                {categories.map((category, index) => (
                  <div
                    key={category.id}
                    ref={(el) => (categoryRefs.current[index] = el)}
                    className="category-container relative "
                    onMouseEnter={() =>
                      !isMobile && setActiveCategory(category)
                    }
                    onMouseLeave={() => !isMobile && setActiveCategory(null)}
                  >
                    <div
                      className="category-item cursor-pointer px-4 py-[10px] flex items-center justify-between bg-white dark:bg-primary-dark rounded-[8px] hover:bg-[#F5F7FA] dark:hover:bg-[#222934] dark:text-white"
                      onClick={() =>
                        isMobile &&
                        setActiveCategory(
                          activeCategory?.id === category.id ? null : category,
                        )
                      }
                    >
                      <div className="flex items-center justify-between  flex-1">
                        <div className="flex items-center gap-2">
                          <MonitorCheck
                            width={20}
                            height={20}
                            className="text-[#858b95]"
                          />
                          <span
                            className={`font-medium text-[14px] text-[#333D4C] dark:text-white`}
                          >
                            {category.name}
                          </span>
                        </div>
                        <div className="">
                          <ChevronRight
                            width={16}
                            height={16}
                            className="text-[#333D4C] dark:text-white"
                          />
                        </div>
                        {/* <i */}
                        {/*   className={`fas ${category.icon} text-primary w-6`} */}
                        {/* ></i> */}
                        {/* <span */}
                        {/*   className={`${isRTL ? "mr-3" : "ml-3"} font-medium`} */}
                        {/* > */}
                        {/*   {category.name} */}
                        {/* </span> */}
                      </div>
                      {/* <i */}
                      {/*   className={`fas fa-chevron-${isRTL ? "left" : "right"} text-gray-400 text-xs`} */}
                      {/* ></i> */}
                    </div>

                    {/* Mobile dropdown directly below category */}
                    {isMobile && activeCategory?.id === category.id && (
                      <MobileDropdown category={category} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* #banner #slider - Expands when categories are collapsed */}
          <div
            className={`relative rounded-xl overflow-hidden ${categoriesCollapsed ? "w-full" : "flex-1"} lg:mt-[19px] `}
          >
            <HomeSlider />
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
          {/* cursor: pointer; */}
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
