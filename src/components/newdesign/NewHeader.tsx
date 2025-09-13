"use client";

import { ChevronRight, Search, ShoppingCart, Sun } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import NewHomeSlider from "./NewHomeSlider";
import NewCountriesDropdown from "./NewCountriesDropdown";
import NewLanguageDropdown from "./NewLanguageDropdown";

const NewHeader = () => {
  const categories = [
    {
      name: "Beadroom",
    },
    {
      name: "Living Room",
    },
    {
      name: "Kitchen",
    },
    {
      name: "Decoration",
    },
    {
      name: "Office",
    },
    {
      name: "Sale",
    },
    {
      name: "Blog",
    },
  ];
  return (
    <div className="bg-[#F5F7FA] x-min-h-screen pt-[16px] pb-16">
      {/* top header */}
      <div className=" container  mx-auto flex items-center justify-between text-[14px] ">
        <div className="flex items-center gap-2">
          {/* <p>Contact us 24/7 : +1 50 537 53 082</p> */}
          <NewCountriesDropdown />
          <NewLanguageDropdown />
        </div>
        <div>🔥The Biggest Sale Ever 50% Off</div>

        <div>
          <ul className="flex items-center justify-between gap-6">
            <li>
              <Link href="#">Wishlist</Link>
            </li>
            <li>
              <Link href="#">Account</Link>
            </li>
          </ul>
        </div>
      </div>
      {/* navbar */}
      <div className="container mx-auto h-[60px] px-[24px] mt-[16px] flex items-center justify-between bg-white rounded-[100px]">
        <div>
          <Image src={"/logo-black.svg"} width={150} height={48} alt="logo" />
        </div>
        <div className="flex-1  px-10 h-full">
          <ul className="flex items-center justify-center gap-8  h-full">
            {categories.map((category, index) => (
              <Link href="#" key={index} className="hover:underline">
                <li className="h-[40px]   flex items-center text-[#333D4C]">
                  {category.name}
                </li>
              </Link>
            ))}
          </ul>
        </div>
        <div>
          <ul className="flex items-center justify-center gap-2">
            <li className="hover:bg-[#EEF1F6] cursor-pointer transition h-[40px] w-[40px] rounded-[100px] flex items-center justify-center">
              <Sun width={16} height={16} />
            </li>
            <li className=" relative hover:bg-[#EEF1F6] cursor-pointer  transition h-[40px] w-[40px] rounded-[100px] flex items-center justify-center">
              <ShoppingCart width={16} height={16} />
              <span className="absolute -top-1 -right-1 bg-[#222934]  text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </li>
            <li className=" bg-[#EEF1F6] cursor-pointer h-[40px] w-[40px] rounded-[100px] flex items-center justify-center">
              <Search width={16} height={16} />
            </li>
          </ul>
        </div>
      </div>
      {/* slider and content section */}
    </div>
  );
};

export default NewHeader;
