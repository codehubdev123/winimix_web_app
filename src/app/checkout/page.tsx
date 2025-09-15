"use client";

import { useState } from "react";
import {
  CreditCard,
  Truck,
  Lock,
  ArrowRight,
  Shield,
  CheckCircle,
  MapPin,
  Edit,
  ChevronDown,
  Plus,
  ArrowLeft,
  Heart,
  Star,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";

const CheckoutPage = () => {
  const [activeTab, setActiveTab] = useState("information");
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
    saveInfo: false,
    shippingMethod: "standard",
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const cartItems = [
    {
      id: 1,
      name: "iPhone 13 Pro Max",
      price: 999,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1491553895911-0055eca6402d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
      color: "Silver",
      storage: "256GB",
    },
    {
      id: 2,
      name: "Apple Watch Series 7",
      price: 399,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1491553895911-0055eca6402d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
      color: "Midnight",
      size: "41mm",
    },
  ];

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping =
    formData.shippingMethod === "standard"
      ? 15
      : formData.shippingMethod === "express"
        ? 25
        : 40;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  const shippingMethods = [
    {
      id: "standard",
      name: "Standard Delivery",
      price: 15,
      delivery: "2-5 business days",
    },
    {
      id: "express",
      name: "Express Delivery",
      price: 25,
      delivery: "1-2 business days",
    },
    {
      id: "priority",
      name: "Priority Delivery",
      price: 40,
      delivery: "Next day",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}

      {/* Progress Steps */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center mb-12">
          <div className="flex items-center w-full max-w-lg">
            <div
              className={`flex items-center ${activeTab === "information" ? "text-[#222934]" : "text-gray-400"}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${activeTab === "information" ? "bg-blue-100" : "bg-gray-100"}`}
              >
                <span>1</span>
              </div>
              <span className="ml-2 text-sm font-medium">Information</span>
            </div>

            <div className="flex-1 h-0.5 bg-gray-200 mx-4"></div>

            <div
              className={`flex items-center ${activeTab === "shipping" ? "text-[#222934]" : "text-gray-400"}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${activeTab === "shipping" ? "bg-blue-100" : "bg-gray-100"}`}
              >
                <span>2</span>
              </div>
              <span className="ml-2 text-sm font-medium">Shipping</span>
            </div>

            <div className="flex-1 h-0.5 bg-gray-200 mx-4"></div>

            <div
              className={`flex items-center ${activeTab === "payment" ? "text-[#222934]" : "text-gray-400"}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${activeTab === "payment" ? "bg-blue-100" : "bg-gray-100"}`}
              >
                <span>3</span>
              </div>
              <span className="ml-2 text-sm font-medium">Payment</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Checkout Form */}
          <div className="lg:w-2/3">
            {activeTab === "information" && (
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">
                  Contact Information
                </h2>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Shipping Address
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Street Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="flex items-center mb-6">
                  <input
                    type="checkbox"
                    id="saveInfo"
                    name="saveInfo"
                    checked={formData.saveInfo}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="saveInfo"
                    className="block text-sm text-gray-700 ml-2"
                  >
                    Save this information for next time
                  </label>
                </div>

                <button
                  onClick={() => setActiveTab("shipping")}
                  className="w-full cursor-pointer bg-[#222934] hover:bg-[#222934] text-white py-3 px-6 rounded-[100px] font-medium transition-colors flex items-center justify-center"
                >
                  Continue to Shipping
                  <ArrowRight className="ml-2" />
                </button>
              </div>
            )}

            {activeTab === "shipping" && (
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">
                  Shipping Method
                </h2>

                <div className="border border-gray-200 rounded-lg divide-y divide-gray-200 mb-6">
                  {shippingMethods.map((method) => (
                    <div key={method.id} className="p-4">
                      <div className="flex items-start">
                        <input
                          type="radio"
                          id={method.id}
                          name="shippingMethod"
                          value={method.id}
                          checked={formData.shippingMethod === method.id}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 mt-1 mr-3"
                        />
                        <div className="flex-1">
                          <label
                            htmlFor={method.id}
                            className="block text-sm font-medium text-gray-700"
                          >
                            {method.name}
                          </label>
                          <p className="text-sm text-gray-500 mt-1">
                            {method.delivery}
                          </p>
                        </div>
                        <div className="text-sm font-medium text-gray-900">
                          ${method.price}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => setActiveTab("information")}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center"
                  >
                    <ArrowLeft className="mr-2" />
                    Back
                  </button>
                  <button
                    onClick={() => setActiveTab("payment")}
                    className="flex-1 cursor-pointer bg-[#222934] hover:x-bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center"
                  >
                    Continue to Payment
                    <ArrowRight className="ml-2" />
                  </button>
                </div>
              </div>
            )}

            {activeTab === "payment" && (
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">
                  Payment Method
                </h2>

                <div className="border border-gray-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <CreditCard className="text-gray-600 mr-2" />
                      <span className="font-medium">Credit Card</span>
                    </div>
                    <div className="flex space-x-2">
                      <img
                        src="https://readymadeui.com/images/visa.webp"
                        alt="Visa"
                        className="h-6"
                      />
                      <img
                        src="https://readymadeui.com/images/american-express.webp"
                        alt="Mastercard"
                        className="h-6"
                      />
                      <img
                        src="https://readymadeui.com/images/master.webp"
                        alt="Amex"
                        className="h-6"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name on Card
                    </label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        name="expiry"
                        value={formData.expiry}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="123"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center mb-6">
                  <CheckCircle className="text-green-500 mr-2" size={20} />
                  <span className="text-sm text-gray-600">
                    Your payment details are encrypted and secure
                  </span>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => setActiveTab("shipping")}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center"
                  >
                    <ArrowLeft className="mr-2" />
                    Back
                  </button>
                  <button className="flex-1 bg-[#222934] cursor-pointer x-hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center">
                    Complete Order
                  </button>
                </div>
              </div>
            )}

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Purchase Protection
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Shop with confidence. We offer free returns within 30 days of
                purchase and a full money-back guarantee if you're not
                completely satisfied.
              </p>
              <div className="flex items-center text-sm text-gray-600">
                <Shield className="mr-2" size={16} />
                <span>Secure shopping guarantee</span>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-sm font-medium text-gray-800">
                        {item.name}
                      </h3>
                      <div className="flex text-sm text-gray-500 mt-1">
                        <span>Qty: {item.quantity}</span>
                        {item.color && <span className="mx-2">•</span>}
                        {item.color && <span>{item.color}</span>}
                        {item.storage && <span className="mx-2">•</span>}
                        {item.storage && <span>{item.storage}</span>}
                        {item.size && <span className="mx-2">•</span>}
                        {item.size && <span>{item.size}</span>}
                      </div>
                    </div>
                    <div className="text-sm font-medium text-gray-800">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-800">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-800">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-800">${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between border-t border-gray-200 pt-4 mb-6">
                <span className="text-lg font-bold text-gray-800">Total</span>
                <span className="text-lg font-bold text-gray-800">
                  ${total.toFixed(2)}
                </span>
              </div>

              <div className="flex items-center text-sm text-gray-600 mb-4">
                <Truck className="mr-2" size={16} />
                <span>Free shipping on orders over $100</span>
              </div>

              <div className="flex items-center text-sm text-gray-600">
                <Lock className="mr-2" size={16} />
                <span>Secure encrypted transaction</span>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Guaranteed Safe Checkout
                </h3>
                <div className="flex justify-between">
                  <div className="h-8 w-16 bg-white rounded flex items-center justify-center">
                    <img
                      src="https://readymadeui.com/images/american-express.webp"
                      className="w-12"
                      alt="card2"
                    />
                  </div>
                  <div className="h-8 w-16 bg-white rounded flex items-center justify-center">
                    <img
                      src="https://readymadeui.com/images/visa.webp"
                      className="w-12"
                      alt="card1"
                    />
                  </div>
                  <div className="h-8 w-16 bg-white rounded flex items-center justify-center">
                    <img
                      src="https://readymadeui.com/images/master.webp"
                      className="w-12"
                      alt="card3"
                    />
                  </div>
                  <div className="h-8 w-16 bg-white rounded flex items-center justify-center">
                    <img
                      src="https://readymadeui.com/images/american-express.webp"
                      className="w-12"
                      alt="card2"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Support Section */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
