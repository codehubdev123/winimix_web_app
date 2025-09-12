"use client";

import Image from "next/image";

const NewFeatures = () => {
  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 pb-16 gap-[64px]">
      {Array.from({ length: 3 }).map(() => (
        <div className="flex items-center justify-center flex-col gap-[24px]">
          <div>
            <img src="/feature.png" width={60} height={60} alt="feature" />
          </div>
          <div className="text-center">
            <h1 className="text-[#181D25] text-[20px] font-semibold">
              Unbeatable quality
            </h1>
          </div>
          <div className="text-center">
            <p>
              We choose raw materials from the best manufacturers, so our
              furniture and decor are of the highest quality at the best prices.
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewFeatures;
