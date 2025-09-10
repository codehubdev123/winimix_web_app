"use client";

import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const PageLayout = ({ children }: Props) => {
  return (
    <div className="min-h-screen bg-gray-5x0 dark:bgx-primary-dark">
      {children}
    </div>
  );
};

export default PageLayout;
