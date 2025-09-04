"use client";

import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  onClick?: () => void;
};

const ButtonIconLink = ({ children, onClick }: Props) => {
  return (
    <button
      className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0  hover:text-secondary cursor-pointer h-9 rounded-md px-3"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ButtonIconLink;
