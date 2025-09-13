"use client";
import NewFilterDrodown from "@/components/newdesign/NewFilterDrodown";
import { HeartIcon } from "lucide-react";
import { useState } from "react";

const ProductsPage = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const toggleFavorite = (productId) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter((id) => id !== productId));
    } else {
      setFavorites([...favorites, productId]);
    }
  };

  const products = [
    {
      id: 1,
      image: "/p3.png",
      title: "Nike Air Max",
      price: "$129.99",
      colors: ["bg-red-500", "bg-blue-500", "bg-black", "bg-white"],
      isNew: true,
    },
    {
      id: 2,
      image: "p4.png",
      title: "Wireless Headphones",
      price: "$89.99",
      colors: ["bg-black", "bg-white", "bg-blue-500"],
      isNew: false,
    },
    {
      id: 3,
      image: "p5.png",
      title: "Luxury Watch",
      price: "$249.99",
      colors: ["bg-yellow-500", "bg-silver", "bg-black"],
      isNew: true,
    },
    {
      id: 4,
      image: "p1.png",
      title: "Running Shoes",
      price: "$119.99",
      colors: ["bg-green-500", "bg-blue-500", "bg-gray-400"],
      isNew: false,
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1099&q=80",
      title: "Smart Watch",
      price: "$199.99",
      colors: ["bg-black", "bg-gray-400", "bg-red-500"],
      isNew: true,
    },
    {
      id: 6,
      image:
        "https://images.unsplash.com/photo-1491553895911-0055eca6402d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
      title: "Sports Shoes",
      price: "$139.99",
      colors: ["bg-blue-500", "bg-red-500", "bg-white"],
      isNew: false,
    },
  ];

  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
    { value: "option4", label: "Option 4" },
    { value: "option5", label: "Option 5" },
  ];

  const categories = [
    { value: "electronics", label: "Electronics" },
    { value: "clothing", label: "Clothing" },
    { value: "books", label: "Books" },
    { value: "home", label: "Home & Kitchen" },
    { value: "sports", label: "Sports & Outdoors" },
  ];

  const users = [
    { value: "user1", label: "John Doe" },
    { value: "user2", label: "Jane Smith" },
    { value: "user3", label: "Robert Johnson" },
    { value: "user4", label: "Emily Davis" },
    { value: "user5", label: "Michael Wilson" },
  ];

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    console.log("Selected option:", option);
  };

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    console.log("Selected category:", category);
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    console.log("Selected user:", user);
  };

  return (
    <>
      <div className="container mx-auto pt-12 pb-8">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-1 text-sm text-gray-700">
            <li>
              <a
                href="#"
                className="block transition-colors hover:text-gray-900"
              >
                {" "}
                Home{" "}
              </a>
            </li>

            <li className="rtl:rotate-180">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </li>

            <li>
              <a href="#" className="block transition-colors text-[#9CA3AF] ">
                Categories
              </a>
            </li>
          </ol>
        </nav>
      </div>
      <div className="mx-auto container">
        <h1 className="text-[18px] md:text-[20px] font-semibold text-[#181D25] pb-8">
          Products Catalog
        </h1>
      </div>
      <div className="mx-auto container flex items-center gap-3 pb-8">
        <div>
          <NewFilterDrodown
            options={options}
            onSelect={handleSelectOption}
            placeholder="Choose an option"
          />
        </div>
        <div>
          <NewFilterDrodown
            options={options}
            onSelect={handleSelectOption}
            placeholder="Choose an option"
          />
        </div>
        <div>
          <NewFilterDrodown
            options={options}
            onSelect={handleSelectOption}
            placeholder="Choose an option"
          />
        </div>
        <div>
          <NewFilterDrodown
            options={options}
            onSelect={handleSelectOption}
            placeholder="Choose an option"
          />
        </div>
        <div>
          <NewFilterDrodown
            options={options}
            onSelect={handleSelectOption}
            placeholder="Choose an option"
          />
        </div>
      </div>
      {/* products area */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 pb-20">
        {products.map((product) => (
          <div
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col pb-10"
            key={product.id}
          >
            {/* Image Section */}
            <div className="relative h-56 md:h-64 overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
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
              <div className="flex space-x-2 mb-3">
                {product.colors.map((color, index) => (
                  <div
                    key={index}
                    className={`w-4 h-4 rounded-full ${color} border border-gray-200`}
                  />
                ))}
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-[#364254] text-[14px] mb-2">
                {product.title}
              </h3>

              {/* Price */}
              <p className="text-[#181D25] font-semibold text-[16px] md:text-[18px] mb-4">
                {product.price}
              </p>

              {/* Add to cart and Favorite buttons */}
              <div className="mt-auto flex space-x-2">
                <button className="flex-1 bg-[#222934] cursor-pointer text-white py-2 px-4 rounded-[100px] font-medium transition-colors flex items-center justify-center">
                  Add to Cart
                </button>
                <div
                  className="w-[40px] h-[40px] bg-[#EEF1F6] flex items-center justify-center rounded-[100px] cursor-pointer"
                  onClick={() => toggleFavorite(product.id)}
                >
                  <HeartIcon
                    width={16}
                    height={16}
                    className={`w-4 h-4 ${favorites.includes(product.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}

        {products.map((product) => (
          <div
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col pb-10"
            key={product.id}
          >
            {/* Image Section */}
            <div className="relative h-56 md:h-64 overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
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
              <div className="flex space-x-2 mb-3">
                {product.colors.map((color, index) => (
                  <div
                    key={index}
                    className={`w-4 h-4 rounded-full ${color} border border-gray-200`}
                  />
                ))}
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-[#364254] text-[14px] mb-2">
                {product.title}
              </h3>

              {/* Price */}
              <p className="text-[#181D25] font-semibold text-[16px] md:text-[18px] mb-4">
                {product.price}
              </p>

              {/* Add to cart and Favorite buttons */}
              <div className="mt-auto flex space-x-2">
                <button className="flex-1 bg-[#222934] cursor-pointer text-white py-2 px-4 rounded-[100px] font-medium transition-colors flex items-center justify-center">
                  Add to Cart
                </button>
                <div
                  className="w-[40px] h-[40px] bg-[#EEF1F6] flex items-center justify-center rounded-[100px] cursor-pointer"
                  onClick={() => toggleFavorite(product.id)}
                >
                  <HeartIcon
                    width={16}
                    height={16}
                    className={`w-4 h-4 ${favorites.includes(product.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductsPage;
