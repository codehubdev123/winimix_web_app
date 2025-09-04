"use client";

import { ReactNode } from "react";

type Props = {
  title?: string;
  children: ReactNode;
};

const FooterSection = ({ title, children }: Props) => {
  return (
    <div>
      <h4 className="text-lg font-semibold mb-4 text-white">{title}</h4>
      <ul className="space-y-2">{children}</ul>
    </div>
  );
};

export default FooterSection;
