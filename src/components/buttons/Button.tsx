"use client";

import { ReactNode } from "react";
import { cn } from "../utils/utils";

type Props = {
  name: string;
  children?: ReactNode;
  onClick?: () => void;
};

const Button = ({ name, onClick, ...rest }: Props) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 h-11  px-8 flex-1 bg-[#222934] hover:bg-[#222934] text-lg py-3 text-white cursor-pointer rounded-[100px]",
      )}
      onClick={onClick}
      {...rest}
    >
      {name}
    </button>
  );
};

export default Button;
