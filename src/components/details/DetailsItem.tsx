"use client";

import React, { ReactNode } from "react";

interface Props {
  name: string;
  children: ReactNode;
}

export const DetailsItem = ({ name, children }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-1 p-4 sm:grid-cols-3 sm:gap-4">
      <dt className="font-medium text-gray-900">{name}</dt>

      <dd className="text-gray-700 sm:col-span-2">{children}</dd>
    </div>
  );
};
