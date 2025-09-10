"use client";

import Link from "next/link";

const NewBanner = () => {
  return (
    <div className="bg-[#F5F7FA] min-h-screen pt-[16px]">
      <div className=" container  mx-auto flex items-center justify-between text-[14px] ">
        <div>
          <p>Contact us 24/7 : +1 50 537 53 082</p>
        </div>
        <div>🔥The Biggest Sale Ever 50% Off</div>

        <div>
          <ul className="flex items-center justify-between gap-6">
            <li>
              <Link href="#">Wishlist</Link>
            </li>
            <li>
              <Link href="#">Account</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NewBanner;
