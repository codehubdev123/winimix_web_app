"use client";
import { DynamicIcon } from "lucide-react/dynamic";

import { cn } from "@/components/utils/utils";
import { Box, ChevronDown, ChevronUp } from "lucide-react";
import { ReactNode, useState } from "react";
type Props = {
  name: string;
  menuId: string;
  iconName: any;
  children: ReactNode;
};

const MenuLinkDropdown = ({
  name,
  iconName,
  menuId,
  children,
  ...rest
}: Props) => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (dropdown: any) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  return (
    <div className="mb-2">
      <button
        className="flex items-center justify-between w-full px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
        onClick={() => toggleDropdown(menuId)}
      >
        <div className="flex items-center">
          <DynamicIcon
            name={iconName}
            className={cn("w-5 h-5 mr-3")}
            {...rest}
          />
          <span>{name}</span>
        </div>
        {activeDropdown === menuId ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>
      {activeDropdown === menuId && (
        <div className="pl-9 mt-1 space-y-1">{children}</div>
      )}
    </div>
  );
};

export default MenuLinkDropdown;
