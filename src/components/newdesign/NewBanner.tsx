"use client";

import { Search, ShoppingCart, Sun } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const NewBanner = () => {
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
    <div className="bg-[#F5F7FA] min-h-screen pt-[16px]">
      {/* top header */}
      <div className=" container  mx-auto flex items-center justify-between text-[14px] ">
        <div>
          <p>Contact us 24/7 : +1 50 537 53 082</p>
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
          <ul className="flex items-center justify-center gap-6">
            <li className="hover:bg-[#EEF1F6] cursor-pointer transition h-[40px] w-[40px] rounded-[100px] flex items-center justify-center">
              <Sun width={16} height={16} />
            </li>
            <li className="hover:bg-[#EEF1F6] cursor-pointer  transition h-[40px] w-[40px] rounded-[100px] flex items-center justify-center">
              <ShoppingCart width={16} height={16} />
            </li>
            <li className="bg-[#EEF1F6] cursor-pointer h-[40px] w-[40px] rounded-[100px] flex items-center justify-center">
              <Search width={16} height={16} />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NewBanner;
