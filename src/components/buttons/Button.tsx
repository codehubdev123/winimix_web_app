"use client";

import { ReactNode } from "react";

type Props = {
  name: string;
  children?: ReactNode;
  onClick?: () => void;
};

const Button = ({ name, onClick }: Props) => {
  return (
    <button
      className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 h-11 rounded-md px-8 flex-1 bg-primary hover:bg-secondary text-lg py-3 text-white cursor-pointer"
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default Button;
