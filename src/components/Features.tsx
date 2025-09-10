"use client";

import { CreditCard, RefreshCw, Truck } from "lucide-react";

const Features = () => {
  const features = [
    {
      title: "Free Shipping & Return",
      subTtitle: "For all orders over $199.00",
      icon: (
        <Truck width={32} height={32} className="text-font dark:text-white" />
      ),
    },
    {
      title: "Free Shipping & Return",
      subTtitle: "For all orders over $199.00",
      icon: (
        <CreditCard
          width={32}
          height={32}
          className="text-font dark:text-white"
        />
      ),
    },
    {
      title: "Free Shipping & Return",
      subTtitle: "For all orders over $199.00",
      icon: (
        <RefreshCw
          width={32}
          height={32}
          className="text-font dark:text-white"
        />
      ),
    },
    {
      title: "Free Shipping & Return",
      subTtitle: "For all orders over $199.00",
      icon: (
        <Truck width={32} height={32} className="text-font dark:text-white" />
      ),
    },
  ];
  return (
    <div className="py-[72px] bg-white dark:bg-primary-dark px-5 lg:mx-0">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[24px]">
          {features.map((feature, index) => (
            <div
              className="h-[86px] bg-white dark:bg-primary-dark flex items-center justify-start gap-[16px]"
              key={index}
            >
              <div className="flex">
                <div className="h-[86px] w-[86px] rounded-[100px] bg-[#F5F7FA] dark:bg-[#222934] flex items-center justify-center">
                  {feature.icon}
                </div>
              </div>
              <div className="text-font dark:text-white">
                <h1 className="font-medium font-[16px]">{feature.title}</h1>
                <p className="font-[14px]">{feature.subTtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
