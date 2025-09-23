"use client";
import React, { useState } from "react";
import {
  Minus,
  Plus,
  Trash2,
  ArrowLeft,
  ShoppingBag,
  Heart,
  Shield,
  Truck,
  RotateCw,
} from "lucide-react";
import Link from "next/link";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      price: 89.99,
      originalPrice: 129.99,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      quantity: 1,
      inStock: true,
      color: "Black",
      size: "One Size",
    },
    {
      id: 2,
      name: "Smart Watch Series 5",
      price: 199.99,
      originalPrice: 249.99,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      quantity: 2,
      inStock: true,
      color: "Silver",
      size: "42mm",
    },
    {
      id: 3,
      name: "Premium Leather Backpack",
      price: 129.99,
      originalPrice: 159.99,
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      quantity: 1,
      inStock: false,
      color: "Brown",
      size: "Medium",
    },
  ]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;

    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const shipping = subtotal > 0 ? 15 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-gray-50 py-8" dir="ltr">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Shopping Cart
          </h1>
          <div className="text-sm text-gray-600">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
          </div>
        </div>

        {/* Back to shopping */}
        <div className="mb-6">
          <Link
            href="/products"
            className="flex items-center text-[#222934] hover:text-[#222934] transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2 rtl:rotate-180" />
            Continue Shopping
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              {/* Desktop Table Header */}
              <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-gray-100 text-sm font-medium text-gray-700">
                <div className="col-span-5 rtl:text-right ltr:text-left">
                  Product
                </div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-center">Total</div>
                <div className="col-span-1 text-center">Action</div>
              </div>

              {/* Cart Items List */}
              <div className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-4 md:p-6">
                    <div className="flex flex-col md:grid md:grid-cols-12 md:gap-4 items-start md:items-center">
                      {/* Product Info */}
                      <div className="col-span-5 flex items-start space-x-4 rtl:space-x-reverse mb-4 md:mb-0">
                        <div className="flex-shrink-0 w-20 h-20 bg-gray-200 rounded-md overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm md:text-base font-medium text-gray-900 line-clamp-2">
                            {item.name}
                          </h3>
                          <p className="text-xs text-gray-500 mt-1">
                            {item.color} | {item.size}
                          </p>
                          {!item.inStock && (
                            <p className="text-xs text-rose-600 mt-1">
                              Out of stock
                            </p>
                          )}

                          {/* Mobile price */}
                          <div className="mt-2 md:hidden flex items-center justify-between">
                            <div className="text-sm font-medium text-[#222934]">
                              ${item.price.toFixed(2)}
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-gray-400 hover:text-rose-500 transition-colors duration-200"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Price - Desktop */}
                      <div className="hidden md:flex col-span-2 justify-center">
                        <div className="text-sm md:text-base">
                          <span className="font-medium text-[#222934]">
                            ${item.price.toFixed(2)}
                          </span>
                          {item.originalPrice > item.price && (
                            <span className="text-xs text-gray-500 line-through ml-2 rtl:ml-0 rtl:mr-2">
                              ${item.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Quantity */}
                      <div className="col-span-2 flex justify-center mb-4 md:mb-0">
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="p-2 text-gray-600 hover:text-[#222934] transition-colors duration-200"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-3 py-1 text-sm font-medium w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="p-2 text-gray-600 hover:text-[#222934] transition-colors duration-200"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Total - Desktop */}
                      <div className="hidden md:flex col-span-2 justify-center">
                        <span className="font-medium text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>

                      {/* Action - Desktop */}
                      <div className="hidden md:flex col-span-1 justify-center">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-rose-500 transition-colors duration-200"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Mobile total and action */}
                      <div className="md:hidden w-full flex items-center justify-between pt-4 border-t border-gray-200">
                        <div className="text-sm font-medium text-gray-900">
                          Total: ${(item.price * item.quantity).toFixed(2)}
                        </div>
                        <div className="flex items-center space-x-4 rtl:space-x-reverse">
                          <button className="text-sm text-[#222934] hover:text-[#222934] transition-colors duration-200">
                            <Heart className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-rose-500 hover:text-rose-600 transition-colors duration-200"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Empty State */}
              {cartItems.length === 0 && (
                <div className="p-12 text-center">
                  <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Start shopping to add items to your cart
                  </p>
                  <button className="bg-[#222934] hover:bg-[#222934] text-white px-6 py-2 rounded-lg transition-colors duration-300">
                    Continue Shopping
                  </button>
                </div>
              )}
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              <div className="bg-white rounded-lg shadow p-4 flex items-center">
                <Truck className="w-8 h-8 text-[#222934] mr-3 rtl:mr-0 rtl:ml-3" />
                <div>
                  <h4 className="font-medium text-gray-900">Free Shipping</h4>
                  <p className="text-sm text-gray-600">On orders over $100</p>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-4 flex items-center">
                <RotateCw className="w-8 h-8 text-[#222934] mr-3 rtl:mr-0 rtl:ml-3" />
                <div>
                  <h4 className="font-medium text-gray-900">Easy Returns</h4>
                  <p className="text-sm text-gray-600">30-day return policy</p>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-4 flex items-center">
                <Shield className="w-8 h-8 text-[#222934] mr-3 rtl:mr-0 rtl:ml-3" />
                <div>
                  <h4 className="font-medium text-gray-900">Secure Payment</h4>
                  <p className="text-sm text-gray-600">Safe and encrypted</p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow p-6 sticky top-6">
              <h2 className="text-lg font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">${shipping.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>

                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Discount Code */}
              <div className="mt-6">
                <label
                  htmlFor="discount-code"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Discount Code
                </label>
                <div className="flex flex-wrap">
                  <input
                    type="text"
                    id="discount-code"
                    className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 
                    focus:ring-2 focus:ring-[#222934] focus:border-[#222934]"
                    placeholder="Enter code"
                  />
                  <button className="bg-[#222934] hover:bg-[#222934] text-white px-4 py-2 rounded-r-lg transition-colors duration-300">
                    Apply
                  </button>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                disabled={cartItems.length === 0}
                className={`w-full mt-6 py-3 px-4 rounded-[100px] text-white font-medium transition-colors duration-300 ${
                  cartItems.length === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#222934] hover:bg-[#222934]"
                }`}
              >
                <Link href={"/checkout"}> Proceed to Checkout</Link>
              </button>

              {/* Security Notice */}
              <p className="text-xs text-gray-500 mt-4 text-center">
                <Shield className="w-3 h-3 inline-block mr-1 rtl:mr-0 rtl:ml-1" />
                Your personal data will be used to process your order, support
                your experience throughout this website, and for other purposes
                described in our privacy policy.
              </p>
            </div>

            {/* Continue Shopping for Mobile */}
            <div className="mt-6 bg-white rounded-lg shadow p-4 lg:hidden">
              <h3 className="font-medium text-gray-900 mb-3">
                You might also like
              </h3>
              <div className="flex space-x-4 rtl:space-x-reverse overflow-x-auto pb-2">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex-shrink-0 w-32">
                    <div className="bg-gray-200 rounded-lg h-32 mb-2"></div>
                    <p className="text-sm font-medium text-gray-900 line-clamp-2">
                      Product Name
                    </p>
                    <p className="text-sm text-[#222934] font-medium">$29.99</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
