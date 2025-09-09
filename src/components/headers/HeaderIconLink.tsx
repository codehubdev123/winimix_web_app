"use client";

import { LucideIcon } from "lucide-react";
import Link from "next/link";

type Props = {
  isLink?: boolean;
  isCart?: boolean;
  href?: string;
  icon?: any;
  onClick?: () => void;
};
const HeaderIconLink = ({
  isLink,
  isCart,
  href,
  icon,
  onClick,
  ...rest
}: Props) => {
  return isLink ? (
    <Link
      href={href || "#"}
      onClick={onClick}
      className="flex items-center  bg-secondary/80 dark:bg-secondary-dark rounded-full"
    >
      <div className="h-[48px] w-[48px] flex items-center justify-center relative text-white">
        {icon}
        {isCart && (
          <span
            className="w-[24px] h-[24px] absolute top-0 -right-2 bg-white dark:bg-[#33B36B] rounded-full border-[3px] border-primary dark:border-[#222934]
            text-secondary dark:text-white
            flex items-center  justify-center text-sm"
          >
            3
          </span>
        )}
      </div>
    </Link>
  ) : (
    <div
      className="h-[48px] w-[48px] flex items-center justify-center cursor-pointer hover:bg-secondary/80 dark:hover:bg-secondary-dark rounded-full text-white"
      onClick={onClick}
    >
      {icon}
    </div>
  );
};

export default HeaderIconLink;
