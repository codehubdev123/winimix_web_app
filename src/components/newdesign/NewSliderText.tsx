"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";

const NewSliderText = () => {
  return (
    <div className="mt-[24px]  flex items-center flex-col justify-center gap-4">
      <div>
        <p className="text-[18px]">Navy blue low sofa for relaxation</p>
        <h1 className="text-[24px] text-center font-semibold">$1,250.00</h1>
      </div>
      <div className="flex items-center justify-center">
        <Link href="#">
          <div className="bg-[#222934] w-[150px] h-[48px] rounded-[100px] text-white flex items-center justify-center">
            <span> Shop Now</span>
            <ChevronRight width={18} height={18} className="ml-2" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default NewSliderText;
