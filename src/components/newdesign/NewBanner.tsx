"use client";

import { ChevronRight, Search, ShoppingCart, Sun } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import NewHomeSlider from "./NewHomeSlider";

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
    <div className="bg-[#F5F7FA] x-min-h-screen  pb-16">
      {/* slider and content section */}
      <div className="container mx-auto  x-mb-[200px] ">
        <div className="mx-auto w-full  text-center">
          <h1 className="font-bold text-[20px] lg:text-[56px]">
            Everything You Need for a <br /> Modern Interior
          </h1>
        </div>
        <div className="x-h-[400px] x-bg-[#EEF1F6] mt-[50px] text-center">
          <NewHomeSlider />
        </div>
        {/* <div className="mt-[24px]  flex items-center flex-col justify-center gap-4"> */}
        {/*   <div> */}
        {/*     <p className="text-[18px]">Navy blue low sofa for relaxation</p> */}
        {/*     <h1 className="text-[24px] text-center font-semibold">$1,250.00</h1> */}
        {/*   </div> */}
        {/*   <div className="flex items-center justify-center"> */}
        {/*     <Link href="#"> */}
        {/*       <div className="bg-[#222934] w-[150px] h-[48px] rounded-[100px] text-white flex items-center justify-center"> */}
        {/*         <span> Shop Now</span> */}
        {/*         <ChevronRight width={18} height={18} className="ml-2" /> */}
        {/*       </div> */}
        {/*     </Link> */}
        {/*   </div> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default NewBanner;
