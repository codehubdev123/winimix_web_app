"use client";

import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const PageLayout = ({ children }: Props) => {
  return <div className="min-h-screen bg-gray-50">{children}</div>;
};

export default PageLayout;
