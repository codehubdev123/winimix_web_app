"use client";

import { cn } from "@/components/utils/utils";
import Link from "next/link";
type Props = {
  name: string;
  href: string;
};

const MenuLinkDropdownItem = ({ name, href, ...rest }: Props) => {
  return (
    <Link
      href={href}
      className={cn(
        "block py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors",
      )}
      {...rest}
    >
      {name}
    </Link>
  );
};

export default MenuLinkDropdownItem;
