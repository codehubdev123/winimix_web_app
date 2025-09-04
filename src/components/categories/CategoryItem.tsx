"use client";

type Props = {
  category: any;
  withCount?: boolean;
};

const CategoryItem = ({ category, withCount = false }: Props) => {
  return (
    <div
      className="relative group overflow-hidden rounded-xl shadow-md hover:shadow-lg h-48 cursor-pointer bg-white transition-all duration-300"
      key={category.id}
    >
      {withCount && (
        <div className="absolute top-3 right-3 rtl:left-auto rtl:right-3 bg-primary text-white text-xs font-bold px-2 py-1 rounded-md z-50">
          {category.productCount} products
        </div>
      )}
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{ backgroundImage: `url(${category.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-gray-900/30"></div>
      </div>
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-center">
        <h3 className="text-sm font-bold mb-1">{category.title}</h3>
        <p className="text-xs opacity-90">{category.subtitle}</p>
      </div>
      {/* Hover Effect Indicator */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="bg-primary text-white text-xs font-bold py-2 px-4 rounded-full">
          Shop Now
        </div>
      </div>
    </div>
  );
};

export default CategoryItem;
