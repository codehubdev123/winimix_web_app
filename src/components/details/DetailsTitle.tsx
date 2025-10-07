"use client";

import { ChartColumnDecreasing, Globe } from "lucide-react";

type Props = {
  key: string;
  value: string;
};

const DetailsTitle = ({ key, value }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4 bg-gradient-to-r from-blue-600 to-purple-700">
      <dt className="font-bold text-gray-50 flex gap-1 items-center">
        <Globe className="w-4 h-4" />
        {key}
      </dt>

      <dd className="text-gray-50 sm:col-span-2 font-bold flex items-center gap-1">
        <ChartColumnDecreasing className="w-4 h-4" />
        {value}
      </dd>
    </div>
  );
};

export default DetailsTitle;
