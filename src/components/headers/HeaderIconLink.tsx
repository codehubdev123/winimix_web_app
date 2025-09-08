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
      className="flex items-center  bg-secondary/80 rounded-full"
    >
      <div className="h-[48px] w-[48px] flex items-center justify-center relative text-white">
        {icon}
        {isCart && (
          <span
            className="w-[24px] h-[24px] absolute top-0 -right-2 bg-white rounded-full border-[3px] border-primary
            text-secondary
            flex items-center  justify-center text-sm"
          >
            3
          </span>
        )}
      </div>
    </Link>
  ) : (
    <div
      className="h-[48px] w-[48px] flex items-center justify-center cursor-pointer hover:bg-secondary/80 rounded-full text-white"
      onClick={onClick}
    >
      {icon}
    </div>
  );
};

export default HeaderIconLink;
