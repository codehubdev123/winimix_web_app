"use client";

import { div } from "framer-motion/client";

type Props = {
  brand: any;
  withCount?: boolean;
};

const NewCategoryItem = ({ brand, withCount }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-[164] h-[164] bg-[#F5F7FA] rounded-[100px] flex items-center justify-center">
        <img src="/p2.svg" alt={brand.name} className="" />
      </div>
      <h1 className="mt-[16px] text-[#181D25] font-semibold">Electronic</h1>
    </div>
  );
};

export default NewCategoryItem;
