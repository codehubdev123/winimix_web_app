"use client";

import { useState } from "react";
import { Heart, ShoppingCart, Trash2, Search } from "lucide-react";

// Mock data
const initialWishlistItems = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 99.99,
    image: "/api/placeholder/120/120",
    inStock: true,
  },
  {
    id: 2,
    name: "Smart Watch Series 5",
    price: 299.99,
    image: "/api/placeholder/120/120",
    inStock: true,
  },
  {
    id: 3,
    name: "Mechanical Keyboard",
    price: 149.99,
    image: "/api/placeholder/120/120",
    inStock: false,
  },
];

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems);
  const [searchTerm, setSearchTerm] = useState("");

  const removeFromWishlist = (id) => {
    setWishlistItems((items) => items.filter((item) => item.id !== id));
  };

  const moveToCart = (id) => {
    // Implement move to cart logic
    console.log("Moving item to cart:", id);
  };

  const filteredItems = wishlistItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Wishlist</h2>
          <p className="text-gray-600 mt-1">{wishlistItems.length} items</p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search wishlist..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <div className="text-center py-12">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Your wishlist is empty
          </h3>
          <p className="text-gray-600">
            Items you add to your wishlist will appear here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">
                  {item.name}
                </h3>

                <div className="flex items-center justify-between mt-4">
                  <span className="text-lg font-bold text-gray-900">
                    ${item.price}
                  </span>
                  <span
                    className={`text-sm px-2 py-1 rounded-full ${
                      item.inStock
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {item.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => moveToCart(item.id)}
                    disabled={!item.inStock}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm font-medium"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
