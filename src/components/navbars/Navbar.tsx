"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const categories = [
    {
      id: "electronics",
      name: "Electronics",
      icon: "📱",
      image:
        "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      subcategories: [
        { name: "Smartphones", href: "#" },
        { name: "Laptops", href: "#" },
        { name: "Cameras", href: "#" },
        { name: "Headphones", href: "#" },
        { name: "Wearables", href: "#" },
      ],
      brands: ["Apple", "Samsung", "Sony", "LG", "Google"],
    },
    {
      id: "fashion",
      name: "Fashion",
      icon: "👕",
      image:
        "https://media.istockphoto.com/id/955641488/photo/clothes-shop-costume-dress-fashion-store-style-concept.jpg?s=2048x2048&w=is&k=20&c=8CBZ5nB9gJO1Y5rfsYx-xR4Lkb8TCHQz8BpHT5rm31c=",
      subcategories: [
        { name: "Men's Clothing", href: "#" },
        { name: "Women's Clothing", href: "#" },
        { name: "Shoes", href: "#" },
        { name: "Accessories", href: "#" },
        { name: "Jewelry", href: "#" },
      ],
      brands: ["Nike", "Adidas", "Zara", "H&M", "Levi's"],
    },
    {
      id: "home",
      name: "Home & Kitchen",
      icon: "🏠",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      subcategories: [
        { name: "Furniture", href: "#" },
        { name: "Decor", href: "#" },
        { name: "Kitchenware", href: "#" },
        { name: "Bedding", href: "#" },
        { name: "Appliances", href: "#" },
      ],
      brands: ["IKEA", "KitchenAid", "Philips", "Dyson", "Ninja"],
    },
  ];

  const userMenuItems = [
    { label: "My Account", href: "#" },
    { label: "Orders", href: "#" },
    { label: "Wishlist", href: "#" },
    { label: "Addresses", href: "#" },
    { label: "Payment Methods", href: "#" },
    { label: "Logout", href: "#" },
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      {/* <div className="bg-amber-700 text-white text-sm py-2 px-4 text-center"> */}
      {/*   <p>Free shipping on orders over $50! 🚚</p> */}
      {/* </div> */}

      {/* Main Navbar */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md" : "bg-white"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold text-font">
                {/* Winimix */}
                Wini<span className="text-secondary">Mix</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
              {/* Mega Menu Trigger Items */}
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="relative group"
                  onMouseEnter={() => setActiveMegaMenu(category.id)}
                  onMouseLeave={() => setActiveMegaMenu(null)}
                >
                  <button className="text-font hover:text-secondary px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center">
                    <span className="mr-1 rtl:mr-0 rtl:ml-1">
                      {category.icon}
                    </span>
                    {category.name}
                    <svg
                      className={`ml-1 rtl:ml-0 rtl:mr-1 w-4 h-4 transition-transform duration-200 ${activeMegaMenu === category.id ? "rotate-180" : ""}`}
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

                  {/* Mega Menu */}
                  {activeMegaMenu === category.id && (
                    <div
                      className="absolute left-0 rtl:left-auto rtl:right-0 mt-0 w-[600px] bg-white rounded-b-md shadow-lg overflow-hidden z-50 border border-amber-200 border-t-0"
                      onMouseEnter={() => setActiveMegaMenu(category.id)}
                      onMouseLeave={() => setActiveMegaMenu(null)}
                    >
                      <div className="p-5 grid grid-cols-3 gap-6">
                        <div className="col-span-2">
                          <div className="grid grid-cols-2 gap-6">
                            <div>
                              <h3 className="text-sm font-semibold text-title mb-3 uppercase tracking-wide">
                                Categories
                              </h3>
                              <ul className="space-y-2">
                                {category.subcategories.map((sub) => (
                                  <li key={sub.name}>
                                    <a
                                      href={sub.href}
                                      className="text-font hover:text-secondary text-sm block py-1 transition-colors duration-200"
                                    >
                                      {sub.name}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h3 className="text-sm font-semibold text-title mb-3 uppercase tracking-wide">
                                Popular Brands
                              </h3>
                              <ul className="space-y-2">
                                {category.brands.map((brand) => (
                                  <li key={brand}>
                                    <a
                                      href="#"
                                      className="text-font hover:text-secondary text-sm block py-1 transition-colors duration-200"
                                    >
                                      {brand}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          <div className="mt-4 pt-4 border-t border-gray-100">
                            <a
                              href="#"
                              className="text-secondary hover:underline text-sm font-medium flex items-center"
                            >
                              View all {category.name}
                              <svg
                                className="ml-1 rtl:ml-0 rtl:mr-1 w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M9 5l7 7-7 7"
                                ></path>
                              </svg>
                            </a>
                          </div>
                        </div>
                        <div>
                          <div className="rounded-lg overflow-hidden h-40">
                            <img
                              src={category.image}
                              alt={category.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <p className="text-xs text-font mt-2">
                            Shop the latest {category.name} collection
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Regular Navigation Items */}
              <Link
                href={"/products"}
                className="text-font hover:text-secondary px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Deals
              </Link>
              <a
                href="#"
                className="text-font hover:text-secondary px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                New Arrivals
              </a>
            </div>

            {/* Search, Cart and Auth */}
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-font hover:text-secondary transition-colors duration-200"
                aria-label="Search"
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
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </button>

              {/* Cart */}
              <Link
                href={"/cart"}
                className="p-2 text-font hover:text-secondary relative transition-colors duration-200"
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
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  ></path>
                </svg>
                <span className="absolute -top-1 -right-1 bg-primary  text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </Link>

              {/* User Account with Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="p-2 text-font hover:text-secondary transition-colors duration-200 flex items-center"
                  aria-label="User account"
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
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    ></path>
                  </svg>
                  <svg
                    className={`ml-1 w-4 h-4 transition-transform duration-200 ${isUserDropdownOpen ? "rotate-180" : ""}`}
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

                {/* User Dropdown Menu */}
                {isUserDropdownOpen && (
                  <div className="absolute right-0 rtl:right-auto rtl:left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-amber-200">
                    {userMenuItems.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        className="block px-4 py-2 text-sm text-font hover:bg-primary hover:text-white transition-colors duration-200"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-font hover:text-green-700 transition-colors duration-200"
                aria-label="Open menu"
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
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </button>
            </div>
          </div>

          {/* Search Bar */}
          {isSearchOpen && (
            <div className="pb-4 px-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full px-10 py-2 border border-primary rounded-lg focus:none  focus:ring-secondary focus:border-secondary"
                />
                <button className="absolute right-0 rtl:right-auto rtl:left-0 top-0 h-full px-4 text-primary hover:text-secondary">
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
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-amber-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {categories.map((category) => (
                <div key={category.id} className="relative">
                  <button
                    onClick={() =>
                      setActiveMegaMenu(
                        activeMegaMenu === category.id ? null : category.id,
                      )
                    }
                    className="w-full text-left px-3 py-2 text-font hover:bg-primary hover:text-white rounded-md text-base font-medium flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <span className="mr-2">{category.icon}</span>
                      {category.name}
                    </div>
                    <svg
                      className={`w-4 h-4 transform transition-transform ${activeMegaMenu === category.id ? "rotate-180" : ""}`}
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

                  {activeMegaMenu === category.id && (
                    <div className="pl-4 mt-1 space-y-1">
                      <h4 className="px-3 py-1 text-xs font-semibold text-secondary uppercase tracking-wider">
                        Categories
                      </h4>
                      {category.subcategories.map((sub) => (
                        <a
                          key={sub.name}
                          href={sub.href}
                          className="block px-3 py-2 text-font hover:bg-primary hover:text-white rounded-md text-sm"
                        >
                          {sub.name}
                        </a>
                      ))}
                      <h4 className="px-3 py-1 text-xs font-semibold text-secondary uppercase tracking-wider mt-2">
                        Brands
                      </h4>
                      {category.brands.map((brand) => (
                        <a
                          key={brand}
                          href="#"
                          className="block px-3 py-2 text-font hover:bg-primary hover:text-white rounded-md text-sm"
                        >
                          {brand}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <a
                href="#"
                className="block px-3 py-2 text-font hover:bg-primary hover:text-white rounded-md text-base font-medium"
              >
                Deals
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-font hover:bg-primary hover:text-white rounded-md text-base font-medium"
              >
                New Arrivals
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
