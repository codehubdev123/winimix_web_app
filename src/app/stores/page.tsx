"use client";

import { Volleyball } from "lucide-react";
import { useState } from "react";

const StoresPage = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("popular");
  const [activeCategory, setActiveCategory] = useState("all");

  // Sample store data
  const stores = [
    {
      id: 1,
      name: "Tech Gadgets",
      category: "electronics",
      rating: 4.7,
      reviews: 1284,
      description: "Latest tech gadgets and accessories",
      image:
        "https://images.unsplash.com/photo-1563014959-7aaa83350992?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      featured: true,
      deliveryTime: "30-45 min",
    },
    {
      id: 2,
      name: "Fashion Hub",
      category: "clothing",
      rating: 4.3,
      reviews: 876,
      description: "Trendy clothing for all ages",
      image:
        "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      featured: false,
      deliveryTime: "45-60 min",
    },
    {
      id: 3,
      name: "Fresh Market",
      category: "grocery",
      rating: 4.8,
      reviews: 2103,
      description: "Fresh groceries and daily essentials",
      image:
        "https://images.pexels.com/photos/2536965/pexels-photo-2536965.jpeg",
      featured: true,
      deliveryTime: "25-40 min",
    },
    {
      id: 4,
      name: "Home Essentials",
      category: "home",
      rating: 4.5,
      reviews: 945,
      description: "Everything for your home",
      image:
        "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      featured: false,
      deliveryTime: "35-50 min",
    },
    {
      id: 5,
      name: "Book World",
      category: "books",
      rating: 4.6,
      reviews: 632,
      description: "Books for all interests",
      image:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      featured: true,
      deliveryTime: "40-55 min",
    },
    {
      id: 6,
      name: "Sports Gear",
      category: "sports",
      rating: 4.4,
      reviews: 521,
      description: "Quality sports equipment",
      image:
        "https://images.unsplash.com/photo-1587654780291-39c9404d746b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      featured: false,
      deliveryTime: "30-45 min",
    },
    {
      id: 7,
      name: "Beauty Palace",
      category: "beauty",
      rating: 4.9,
      reviews: 1347,
      description: "Cosmetics and beauty products",
      image:
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      featured: true,
      deliveryTime: "25-40 min",
    },
    {
      id: 8,
      name: "Toy Kingdom",
      category: "toys",
      rating: 4.2,
      reviews: 432,
      description: "Toys for children of all ages",
      image:
        "https://images.unsplash.com/photo-1587654780291-39c9404d746b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      featured: false,
      deliveryTime: "40-60 min",
    },
  ];

  const categories = [
    { id: "all", name: "All Stores", icon: "🛍️" },
    { id: "electronics", name: "Electronics", icon: "📱" },
    { id: "clothing", name: "Clothing", icon: "👕" },
    { id: "grocery", name: "Grocery", icon: "🛒" },
    { id: "home", name: "Home", icon: "🏠" },
    { id: "books", name: "Books", icon: "📚" },
    { id: "sports", name: "Sports", icon: "⚽" },
    { id: "beauty", name: "Beauty", icon: "💄" },
    { id: "toys", name: "Toys", icon: "🧸" },
  ];

  const filteredStores =
    activeCategory === "all"
      ? stores
      : stores.filter((store) => store.category === activeCategory);

  const sortedStores = [...filteredStores].sort((a, b) => {
    if (sortBy === "popular") return b.rating - a.rating;
    if (sortBy === "newest") return b.id - a.id;
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <h1 className="text-2xl font-bold text-gray-900">
                All Of Our Store
              </h1>
              <span className="ml-3 px-2 py-1 bg-primary-100 text-primary-800 text-xs font-medium rounded-full">
                128 stores
              </span>
            </div>

            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="relative">
                <select
                  className="py-2 pl-3 pr-10 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="popular">Most Popular</option>
                  <option value="newest">Newest</option>
                  <option value="name">Name (A-Z)</option>
                </select>
              </div>

              {/* <div className="flex bg-gray-100 rounded-lg p-1"> */}
              {/*   <button */}
              {/*     className={`p-2 rounded-md ${viewMode === "grid" ? "bg-white shadow-sm" : "text-gray-500"}`} */}
              {/*     onClick={() => setViewMode("grid")} */}
              {/*   > */}
              {/*     <svg */}
              {/*       className="w-4 h-4" */}
              {/*       fill="none" */}
              {/*       stroke="currentColor" */}
              {/*       viewBox="0 0 24 24" */}
              {/*       xmlns="http://www.w3.org/2000/svg" */}
              {/*     > */}
              {/*       <path */}
              {/*         strokeLinecap="round" */}
              {/*         strokeLinejoin="round" */}
              {/*         strokeWidth={2} */}
              {/*         d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" */}
              {/*       /> */}
              {/*     </svg> */}
              {/*   </button> */}
              {/*   <button */}
              {/*     className={`p-2 rounded-md ${viewMode === "list" ? "bg-white shadow-sm" : "text-gray-500"}`} */}
              {/*     onClick={() => setViewMode("list")} */}
              {/*   > */}
              {/*     <svg */}
              {/*       className="w-4 h-4" */}
              {/*       fill="none" */}
              {/*       stroke="currentColor" */}
              {/*       viewBox="0 0 24 24" */}
              {/*       xmlns="http://www.w3.org/2000/svg" */}
              {/*     > */}
              {/*       <path */}
              {/*         strokeLinecap="round" */}
              {/*         strokeLinejoin="round" */}
              {/*         strokeWidth={2} */}
              {/*         d="M4 6h16M4 10h16M4 14h16M4 18h16" */}
              {/*       /> */}
              {/*     </svg> */}
              {/*   </button> */}
              {/* </div> */}
            </div>
          </div>
        </div>
      </header>

      {/* Category Filters */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`cursor-pointer flex-shrink-0 flex items-center px-4 py-2 rounded-full mr-3 rtl:mr-0 rtl:ml-3 ${activeCategory === category.id ? "bg-[#222934] text-white" : "bg-white text-gray-700 border border-gray-200"}`}
              onClick={() => setActiveCategory(category.id)}
            >
              <span className="mr-2 rtl:mr-0 rtl:ml-2">{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedStores.map((store, index) => (
              <div
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col"
                key={store.id}
              >
                {/* Image Section */}
                <div className="relative h-56 md:h-64 overflow-hidden">
                  <img
                    src={store.image}
                    alt={store.name}
                    className="w-full h-full x-object-cover transition-transform duration-500 hover:scale-105"
                  />

                  {/* New badge */}
                  {/* <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded text-xs font-medium"></div> */}

                  {/* Favorite button */}
                  {/* <button */}
                  {/*   onClick={() => toggleFavorite(product.id)} */}
                  {/*   className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors" */}
                  {/*   aria-label="Add to favorites" */}
                  {/* > */}
                  {/*   <Heart */}
                  {/*     className={`w-4 h-4 ${favorites.includes(product.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`} */}
                  {/*   /> */}
                  {/* </button> */}
                </div>

                {/* Content Section */}
                <div className="p-4 flex-1 flex flex-col">
                  {/* Color options */}
                  {/* <div className="flex space-x-2 mb-3"> */}
                  {/*   {product.colors.map((color, index) => ( */}
                  {/*     <div */}
                  {/*       key={index} */}
                  {/*       className={`w-4 h-4 rounded-full ${color} border border-gray-200`} */}
                  {/*     /> */}
                  {/*   ))} */}
                  {/* </div> */}

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-[#364254] text-[16px] mb-2">
                    {store.name}
                  </h3>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center justify-start gap-2">
                      <Volleyball width={20} height={20} />
                      <p>By Store Owner</p>
                    </div>
                    <div>247 Products</div>
                  </div>

                  {/* Price */}
                  {/* <p className="text-[#181D25] font-semibold text-[16px] md:text-[18px] mb-4"> */}
                  {/*   {product.price} */}
                  {/* </p> */}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {sortedStores.map((store) => (
              <div
                key={store.id}
                className="border-b border-gray-100 last:border-b-0"
              >
                <div className="flex flex-col md:flex-row p-4">
                  <div className="md:w-48 flex-shrink-0 mb-4 md:mb-0">
                    <img
                      src={store.image}
                      alt={store.name}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>

                  <div className="flex-1 md:pl-6 rtl:md:pl-0 rtl:md:pr-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">
                          {store.name}
                        </h3>
                        <p className="text-gray-500 text-sm mt-1">
                          {store.description}
                        </p>

                        <div className="flex items-center mt-2">
                          <div className="flex items-center bg-primary-50 text-primary-700 px-2 py-1 rounded-full">
                            <svg
                              className="w-4 h-4 mr-1 rtl:mr-0 rtl:ml-1"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="text-sm font-medium">
                              {store.rating}
                            </span>
                          </div>

                          <span className="text-sm text-gray-500 mx-3">•</span>
                          <span className="text-sm text-gray-500">
                            {store.reviews.toLocaleString()} reviews
                          </span>

                          <span className="text-sm text-gray-500 mx-3">•</span>
                          <div className="flex items-center text-sm text-gray-500">
                            <svg
                              className="w-4 h-4 mr-1 rtl:mr-0 rtl:ml-1"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span>{store.deliveryTime}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 md:mt-0">
                        <button className="bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded-lg transition-colors duration-200">
                          Visit Store
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {sortedStores.map((store) => (
              <div
                key={store.id}
                className="border-b border-gray-100 last:border-b-0"
              >
                <div className="flex flex-col md:flex-row p-4">
                  <div className="md:w-48 flex-shrink-0 mb-4 md:mb-0">
                    <img
                      src={store.image}
                      alt={store.name}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>

                  <div className="flex-1 md:pl-6 rtl:md:pl-0 rtl:md:pr-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">
                          {store.name}
                        </h3>
                        <p className="text-gray-500 text-sm mt-1">
                          {store.description}
                        </p>

                        <div className="flex items-center mt-2">
                          <div className="flex items-center bg-primary-50 text-primary-700 px-2 py-1 rounded-full">
                            <svg
                              className="w-4 h-4 mr-1 rtl:mr-0 rtl:ml-1"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="text-sm font-medium">
                              {store.rating}
                            </span>
                          </div>

                          <span className="text-sm text-gray-500 mx-3">•</span>
                          <span className="text-sm text-gray-500">
                            {store.reviews.toLocaleString()} reviews
                          </span>

                          <span className="text-sm text-gray-500 mx-3">•</span>
                          <div className="flex items-center text-sm text-gray-500">
                            <svg
                              className="w-4 h-4 mr-1 rtl:mr-0 rtl:ml-1"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span>{store.deliveryTime}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 md:mt-0">
                        <button className="bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded-lg transition-colors duration-200">
                          Visit Store
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {sortedStores.map((store) => (
              <div
                key={store.id}
                className="border-b border-gray-100 last:border-b-0"
              >
                <div className="flex flex-col md:flex-row p-4">
                  <div className="md:w-48 flex-shrink-0 mb-4 md:mb-0">
                    <img
                      src={store.image}
                      alt={store.name}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>

                  <div className="flex-1 md:pl-6 rtl:md:pl-0 rtl:md:pr-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">
                          {store.name}
                        </h3>
                        <p className="text-gray-500 text-sm mt-1">
                          {store.description}
                        </p>

                        <div className="flex items-center mt-2">
                          <div className="flex items-center bg-primary-50 text-primary-700 px-2 py-1 rounded-full">
                            <svg
                              className="w-4 h-4 mr-1 rtl:mr-0 rtl:ml-1"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="text-sm font-medium">
                              {store.rating}
                            </span>
                          </div>

                          <span className="text-sm text-gray-500 mx-3">•</span>
                          <span className="text-sm text-gray-500">
                            {store.reviews.toLocaleString()} reviews
                          </span>

                          <span className="text-sm text-gray-500 mx-3">•</span>
                          <div className="flex items-center text-sm text-gray-500">
                            <svg
                              className="w-4 h-4 mr-1 rtl:mr-0 rtl:ml-1"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span>{store.deliveryTime}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 md:mt-0">
                        <button className="bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded-lg transition-colors duration-200">
                          Visit Store
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* RTL/LTR Toggle for demo purposes */}
      <div className="fixed bottom-4 right-4 z-10">
        <button
          className="bg-gray-800 text-white p-3 rounded-full shadow-lg"
          onClick={() => {
            const html = document.querySelector("html");
            if (html.getAttribute("dir") === "rtl") {
              html.setAttribute("dir", "ltr");
            } else {
              html.setAttribute("dir", "rtl");
            }
          }}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default StoresPage;
