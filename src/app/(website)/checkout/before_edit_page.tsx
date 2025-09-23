"use client";
import { useState } from "react";

const CheckoutPage = () => {
  const [shippingType, setShippingType] = useState("villa");
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingData, setShippingData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "United States",
    state: "",
    zipCode: "",
    apartment: "",
    floor: "",
    officeNumber: "",
    company: "",
    deliveryInstructions: "",
    saveAddress: true,
  });

  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [orderSummary] = useState({
    items: [
      { name: "Wireless Headphones", price: 129.99, quantity: 1 },
      { name: "Phone Case", price: 24.99, quantity: 2 },
      { name: "Screen Protector", price: 14.99, quantity: 1 },
    ],
    shipping: 9.99,
    tax: 18.75,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setShippingData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Process order
      alert("Order placed successfully!");
    }
  };

  const calculateTotal = () => {
    const subtotal = orderSummary.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    return subtotal + orderSummary.shipping + orderSummary.tax;
  };

  // Mock map coordinates (in a real app, you'd use a mapping library)
  const [mapLocation] = useState({ lat: 40.7128, lng: -74.006 });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-600 mt-2">
            Complete your purchase with secure checkout
          </p>
        </div>

        {/* Progress Steps */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center flex-1">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    currentStep >= step
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  {step}
                </div>
                <div
                  className={`flex-1 h-1 mx-2 ${
                    currentStep > step ? "bg-indigo-600" : "bg-gray-300"
                  }`}
                ></div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span
              className={currentStep >= 1 ? "text-indigo-600 font-medium" : ""}
            >
              Shipping
            </span>
            <span
              className={currentStep >= 2 ? "text-indigo-600 font-medium" : ""}
            >
              Payment
            </span>
            <span
              className={currentStep >= 3 ? "text-indigo-600 font-medium" : ""}
            >
              Review
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              {/* Step 1: Shipping Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Shipping Information
                  </h2>

                  {/* Address Type Selection */}
                  <div className="border-b pb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                      Address Type
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <label
                        className={`relative flex cursor-pointer rounded-lg border p-4 focus:outline-none ${
                          shippingType === "villa"
                            ? "border-indigo-600 bg-indigo-50"
                            : "border-gray-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="shipping-type"
                          value="villa"
                          checked={shippingType === "villa"}
                          onChange={(e) => setShippingType(e.target.value)}
                          className="sr-only"
                        />
                        <div className="flex items-center">
                          <div
                            className={`w-4 h-4 rounded-full border-2 ${
                              shippingType === "villa"
                                ? "border-indigo-600 bg-indigo-600"
                                : "border-gray-300"
                            }`}
                          ></div>
                          <div className="ml-3">
                            <span className="block text-sm font-medium text-gray-900">
                              Villa
                            </span>
                            <span className="block text-sm text-gray-500">
                              Residential house
                            </span>
                          </div>
                        </div>
                        <svg
                          className={`h-5 w-5 absolute top-4 right-4 ${
                            shippingType === "villa"
                              ? "text-indigo-600"
                              : "text-gray-300"
                          }`}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </label>

                      <label
                        className={`relative flex cursor-pointer rounded-lg border p-4 focus:outline-none ${
                          shippingType === "apartment"
                            ? "border-indigo-600 bg-indigo-50"
                            : "border-gray-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="shipping-type"
                          value="apartment"
                          checked={shippingType === "apartment"}
                          onChange={(e) => setShippingType(e.target.value)}
                          className="sr-only"
                        />
                        <div className="flex items-center">
                          <div
                            className={`w-4 h-4 rounded-full border-2 ${
                              shippingType === "apartment"
                                ? "border-indigo-600 bg-indigo-600"
                                : "border-gray-300"
                            }`}
                          ></div>
                          <div className="ml-3">
                            <span className="block text-sm font-medium text-gray-900">
                              Apartment
                            </span>
                            <span className="block text-sm text-gray-500">
                              Multi-unit building
                            </span>
                          </div>
                        </div>
                        <svg
                          className={`h-5 w-5 absolute top-4 right-4 ${
                            shippingType === "apartment"
                              ? "text-indigo-600"
                              : "text-gray-300"
                          }`}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </label>

                      <label
                        className={`relative flex cursor-pointer rounded-lg border p-4 focus:outline-none ${
                          shippingType === "office"
                            ? "border-indigo-600 bg-indigo-50"
                            : "border-gray-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="shipping-type"
                          value="office"
                          checked={shippingType === "office"}
                          onChange={(e) => setShippingType(e.target.value)}
                          className="sr-only"
                        />
                        <div className="flex items-center">
                          <div
                            className={`w-4 h-4 rounded-full border-2 ${
                              shippingType === "office"
                                ? "border-indigo-600 bg-indigo-600"
                                : "border-gray-300"
                            }`}
                          ></div>
                          <div className="ml-3">
                            <span className="block text-sm font-medium text-gray-900">
                              Office
                            </span>
                            <span className="block text-sm text-gray-500">
                              Business address
                            </span>
                          </div>
                        </div>
                        <svg
                          className={`h-5 w-5 absolute top-4 right-4 ${
                            shippingType === "office"
                              ? "text-indigo-600"
                              : "text-gray-300"
                          }`}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </label>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        value={shippingData.firstName}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        value={shippingData.lastName}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={shippingData.email}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={shippingData.phone}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  {/* Address Information */}
                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Street Address *
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      required
                      value={shippingData.address}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  {/* Dynamic Fields based on Address Type */}
                  {shippingType === "apartment" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="apartment"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Apartment Number *
                        </label>
                        <input
                          type="text"
                          id="apartment"
                          name="apartment"
                          required
                          value={shippingData.apartment}
                          onChange={handleInputChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="floor"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Floor
                        </label>
                        <input
                          type="text"
                          id="floor"
                          name="floor"
                          value={shippingData.floor}
                          onChange={handleInputChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                    </div>
                  )}

                  {shippingType === "office" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="officeNumber"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Office Number *
                        </label>
                        <input
                          type="text"
                          id="officeNumber"
                          name="officeNumber"
                          required
                          value={shippingData.officeNumber}
                          onChange={handleInputChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="company"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Company Name
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={shippingData.company}
                          onChange={handleInputChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-gray-700"
                      >
                        City *
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        required
                        value={shippingData.city}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="state"
                        className="block text-sm font-medium text-gray-700"
                      >
                        State/Province *
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        required
                        value={shippingData.state}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="zipCode"
                        className="block text-sm font-medium text-gray-700"
                      >
                        ZIP/Postal Code *
                      </label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        required
                        value={shippingData.zipCode}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="deliveryInstructions"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Delivery Instructions
                    </label>
                    <textarea
                      id="deliveryInstructions"
                      name="deliveryInstructions"
                      rows={3}
                      value={shippingData.deliveryInstructions}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Gate code, building instructions, etc."
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="saveAddress"
                      name="saveAddress"
                      checked={shippingData.saveAddress}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="saveAddress"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Save this address for future orders
                    </label>
                  </div>
                </div>
              )}

              {/* Step 2: Payment Information */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Payment Method
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label
                      className={`relative flex cursor-pointer rounded-lg border p-4 focus:outline-none ${
                        paymentMethod === "credit-card"
                          ? "border-indigo-600 bg-indigo-50"
                          : "border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment-method"
                        value="credit-card"
                        checked={paymentMethod === "credit-card"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="sr-only"
                      />
                      <div className="flex items-center">
                        <div
                          className={`w-4 h-4 rounded-full border-2 ${
                            paymentMethod === "credit-card"
                              ? "border-indigo-600 bg-indigo-600"
                              : "border-gray-300"
                          }`}
                        ></div>
                        <div className="ml-3">
                          <span className="block text-sm font-medium text-gray-900">
                            Credit Card
                          </span>
                          <span className="block text-sm text-gray-500">
                            Visa, MasterCard, Amex
                          </span>
                        </div>
                      </div>
                    </label>

                    <label
                      className={`relative flex cursor-pointer rounded-lg border p-4 focus:outline-none ${
                        paymentMethod === "paypal"
                          ? "border-indigo-600 bg-indigo-50"
                          : "border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment-method"
                        value="paypal"
                        checked={paymentMethod === "paypal"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="sr-only"
                      />
                      <div className="flex items-center">
                        <div
                          className={`w-4 h-4 rounded-full border-2 ${
                            paymentMethod === "paypal"
                              ? "border-indigo-600 bg-indigo-600"
                              : "border-gray-300"
                          }`}
                        ></div>
                        <div className="ml-3">
                          <span className="block text-sm font-medium text-gray-900">
                            PayPal
                          </span>
                          <span className="block text-sm text-gray-500">
                            Secure online payment
                          </span>
                        </div>
                      </div>
                    </label>
                  </div>

                  {paymentMethod === "credit-card" && (
                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor="cardNumber"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Card Number
                        </label>
                        <input
                          type="text"
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="expiry"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            id="expiry"
                            placeholder="MM/YY"
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="cvc"
                            className="block text-sm font-medium text-gray-700"
                          >
                            CVC
                          </label>
                          <input
                            type="text"
                            id="cvc"
                            placeholder="123"
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Order Review */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Order Review
                  </h2>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-2">
                      Shipping Address
                    </h3>
                    <p className="text-gray-600">
                      {shippingData.firstName} {shippingData.lastName}
                    </p>
                    <p className="text-gray-600">{shippingData.address}</p>
                    <p className="text-gray-600">
                      {shippingData.city}, {shippingData.state}{" "}
                      {shippingData.zipCode}
                    </p>
                    <p className="text-gray-600">{shippingData.phone}</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-2">
                      Payment Method
                    </h3>
                    <p className="text-gray-600 capitalize">
                      {paymentMethod.replace("-", " ")}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">
                      Delivery Instructions
                    </h3>
                    <p className="text-gray-600">
                      {shippingData.deliveryInstructions ||
                        "No special instructions"}
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Back
                  </button>
                ) : (
                  <div></div>
                )}

                <button
                  type="submit"
                  className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm font-medium"
                >
                  {currentStep === 3 ? "Place Order" : "Continue"}
                </button>
              </div>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Order Summary
              </h3>

              {/* Items List */}
              <div className="space-y-4 mb-6">
                {orderSummary.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-xs font-medium text-gray-600">
                          {item.quantity}x
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {item.name}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 border-t pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">
                    $
                    {orderSummary.items
                      .reduce(
                        (sum, item) => sum + item.price * item.quantity,
                        0,
                      )
                      .toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900">
                    ${orderSummary.shipping.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-900">
                    ${orderSummary.tax.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-semibold border-t pt-2">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">
                    ${calculateTotal().toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Map Preview */}
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-900 mb-2">
                  Delivery Location
                </h4>
                <div className="bg-gray-200 rounded-lg h-32 flex items-center justify-center">
                  <div className="text-center">
                    <svg
                      className="w-8 h-8 text-gray-400 mx-auto mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <p className="text-xs text-gray-500">Map preview</p>
                    <p className="text-xs text-gray-400">
                      Lat: {mapLocation.lat}, Lng: {mapLocation.lng}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
