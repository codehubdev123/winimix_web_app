"use client";

type Props = {
  brand: any;
  withCount?: boolean;
};

const BrandItem = ({ brand, withCount }: Props) => {
  return (
    <div className="group relative bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-500 p-6 h-40 flex items-center justify-center border border-gray-100 hover:border-amber-200">
      {withCount && (
        <div className="absolute top-3 right-3 rtl:left-auto rtl:right-3 bg-primary text-white text-xs font-bold px-2 py-1 rounded-md z-50">
          20 product
        </div>
      )}
      {/* Background effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-white opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-500"></div>

      {/* Logo */}
      <div className="relative z-10 transform transition-all duration-500 group-hover:scale-110">
        <img
          src={brand.logo}
          alt={brand.name}
          className="h-16 mx-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
        />
      </div>

      {/* Brand name overlay on hover */}
      <div className="absolute bottom-0 left-0 right-0 bg-primary text-white text-sm font-medium py-2 text-center rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {brand.name}
      </div>

      {/* Shine effect on hover */}
      <div className="absolute inset-0 overflow-hidden rounded-xl">
        <div className="absolute top-0 left-0 w-full h-full transform -skew-x-12 transition-all duration-700 group-hover:translate-x-full group-hover:opacity-50 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
      </div>
    </div>
  );
};

export default BrandItem;
