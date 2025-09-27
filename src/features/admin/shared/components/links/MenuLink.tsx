"use client";
import { DynamicIcon } from "lucide-react/dynamic";

import { cn } from "@/components/utils/utils";
import Link from "next/link";
type Props = {
  name: string;
  href: string;
  iconName: any;
};

const MenuLink = ({ name, href, iconName, ...rest }: Props) => {
  return (
    <Link
      href={href}
      className="flex items-center px-4 py-3 bg-blue-500 text-white rounded-lg mb-2"
    >
      <DynamicIcon name={iconName} className={cn("w-5 h-5 mr-3")} {...rest} />
      <span>{name}</span>
    </Link>
  );
};

export default MenuLink;
