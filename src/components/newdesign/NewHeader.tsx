"use client";

import {
  ChevronRight,
  Heart,
  HelpCircle,
  Home,
  LogOut,
  Menu,
  Search,
  Settings,
  ShoppingCart,
  Sun,
  User,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import NewHomeSlider from "./NewHomeSlider";
import NewCountriesDropdown from "./NewCountriesDropdown";
import NewLanguageDropdown from "./NewLanguageDropdown";
import { useState } from "react";
import NewCurrencyDropdown from "./NewCurrancyDropdown";
import HotOffersButton from "../buttons/HotOffers";

const NewHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const userMenuItems = [
    { label: "My Account", href: "/vendor/profile" },
    { label: "Orders", href: "#" },
    { label: "Wishlist", href: "#" },
    // { label: "Addresses", href: "#" },
    // { label: "Payment Methods", href: "#" },
    { label: "Logout", href: "#" },
  ];

  const categories = [
    {
      name: "Home",
    },
    {
      name: "Men",
    },
    {
      name: "Women",
    },
    {
      name: "Kids",
    },
  ];
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
  return (
    <div className="bg-[#F5F7FA] x-min-h-screen pt-[16px] pb-16">
      {/* top header */}
      <div className="container px-4 lg:px-0 mx-auto   flex items-center justify-between text-[14px] ">
        <div className="flex items-center gap-2 ">
          {/* <p>Contact us 24/7 : +1 50 537 53 082</p> */}
          <NewCountriesDropdown />
          <NewLanguageDropdown />
          <NewCurrencyDropdown />
        </div>

        <div className="">
          <ul className="flex items-center justify-between gap-6  relative">
            {/* <li> */}
            {/*   <Link href="#">Wishlist</Link> */}
            {/* </li> */}
            <li>
              <Link
                href="#"
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
              >
                Account
              </Link>
              {isUserDropdownOpen && (
                <div className="absolute right-0 rtl:right-auto rtl:left-0 mt-2 w-36 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                  {userMenuItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="block px-4 py-2 text-sm text-primary hover:bg-primary hover:text-white transition-colors duration-200"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
      {/* navbar */}
      <div className="container px-4 mx-auto h-[60px] x-px-[24px] mt-[16px] flex items-center justify-between bg-white rounded-[100px]">
        <div className="shrink-0">
          <Link href={"/"}>
            <img
              src={"/logo-black.svg"}
              height={48}
              className="w-[100px] md:w-[150px]"
              alt="logo"
            />
          </Link>
        </div>
        <div className="flex-1  px-2 lg:px-10 h-full  hidden md:block">
          <ul className="flex items-center justify-center gap-8  h-full">
            {categories.map((category, index) => (
              <Link href="#" key={index} className="hover:underline">
                <li className="h-[40px]   flex items-center text-[#333D4C] text-[14px] lg:text-[16px]">
                  {category.name}
                </li>
              </Link>
            ))}
          </ul>
        </div>
        <div>
          <ul className="flex items-center justify-center gap-2">
            <li className="hover:bg-[#EEF1F6] cursor-pointer transition h-[40px] w-[40px] rounded-[100px]  items-center justify-center flex md:hidden">
              <Menu
                width={16}
                height={16}
                className="cursor-pointer"
                onClick={toggleSidebar}
              />
            </li>
            <li>
              <HotOffersButton />
            </li>
            <li className=" relative hover:bg-[#EEF1F6] cursor-pointer  transition h-[40px] w-[40px] rounded-[100px] flex items-center justify-center">
              <Link href={"/cart"}>
                <ShoppingCart width={16} height={16} />
                <span className="absolute -top-1 -right-1 bg-[#222934]  text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </Link>
            </li>
            <li
              className="md:bg-[#EEF1F6] hover:bg-[#EEF1F6]  cursor-pointer h-[40px] w-[40px] rounded-[100px] flex items-center justify-center"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search width={16} height={16} />
            </li>
          </ul>
        </div>
      </div>
      {isSearchOpen && (
        <div className=" mx-auto container mt-2">
          <div className="pb-4 px-2">
            <div className="relative bg-white">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full px-10 py-2 border border-gray-300 rounded-lg focus:none  focus:ring-amber-500 focus:border-amber-500"
              />
              <button className="absolute cursor-pointer right-0 rtl:right-auto rtl:left-0 top-0 h-full px-4 text-primary hover:text-amber-700">
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
        </div>
      )}
      {/* mobile start */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60  z-30 transition-opacity duration-300 cursor-pointer"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
      <div
        className={`
        fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-40 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        {/* Sidebar Header with close button */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center">
            <img
              src={"/logo-black.svg"}
              height={48}
              className="w-[100px] md:w-[150px]"
              alt="logo"
            />
          </div>
          <button
            onClick={toggleSidebar}
            className="w-8 h-8 rounded flex items-center justify-center hover:bg-gray-100 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="h-full flex flex-col justify-between overflow-y-auto py-4">
          {/* Main Navigation */}
          <nav>
            <ul className="space-y-1 px-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      className="flex items-center p-3 rounded-lg text-[#222934] hover:bg-[#222934] hover:text-white transition-colors"
                    >
                      <Icon className="w-5 h-5" />
                      <span className="ml-3 font-medium">{item.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Secondary Navigation */}
          <div className="px-2">
            <ul className="space-y-1">
              {secondaryItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                      <Icon className="w-5 h-5" />
                      <span className="ml-3 font-medium">{item.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewHeader;
