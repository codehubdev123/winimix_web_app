"use client";

import Image from "next/image";

const OfferBanner = () => {
  return (
    <div className="bg-gray-100">
      <div className="max-w-7xl mx-auto py-16 ">
        <Image
          fill
          src="https://shopo.quomodothemes.website/assets/images/ads-3.png"
          alt="offer banner"
          className="w-full h-auto !relative border border-white"
        />
      </div>
    </div>
  );
};

export default OfferBanner;
