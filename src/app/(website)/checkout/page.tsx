"use client";
import { useState, useRef, useEffect } from "react";

const CheckoutPage = () => {
  const [shippingType, setShippingType] = useState("villa");
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

  const [mapLocation, setMapLocation] = useState({
    lat: 40.7128,
    lng: -74.006,
    address: "New York, NY, USA",
  });
  const [mapSearch, setMapSearch] = useState("");
  const mapRef = useRef(null);
  const autocompleteRef = useRef(null);

  const [orderSummary] = useState({
    items: [
      {
        name: "Wireless Headphones",
        price: 129.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100",
      },
      {
        name: "Phone Case",
        price: 24.99,
        quantity: 2,
        image:
          "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=100",
      },
      {
        name: "Screen Protector",
        price: 14.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=100",
      },
    ],
    shipping: 9.99,
    tax: 18.75,
  });

  // Initialize Google Maps (mock implementation - replace with actual Google Maps API)
  useEffect(() => {
    // In a real implementation, you would initialize Google Maps here
    // This is a mock implementation for demonstration
    const initMap = () => {
      console.log("Google Maps initialized");
      // Initialize autocomplete
      if (mapSearch) {
        // Mock search results
        console.log("Searching for:", mapSearch);
      }
    };

    initMap();
  }, [mapSearch]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setShippingData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleMapSearch = (e) => {
    setMapSearch(e.target.value);
  };

  const handlePlaceSelect = (place) => {
    // Mock function - in real implementation, this would come from Google Places API
    setMapLocation({
      lat: 40.7128 + (Math.random() - 0.5) * 0.1,
      lng: -74.006 + (Math.random() - 0.5) * 0.1,
      address: place || mapSearch,
    });
    setShippingData((prev) => ({
      ...prev,
      address: place || mapSearch,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process order
    console.log("Order data:", { shippingData, mapLocation, shippingType });
    alert("Order placed successfully!");
  };

  const calculateTotal = () => {
    const subtotal = orderSummary.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    return subtotal + orderSummary.shipping + orderSummary.tax;
  };

  // Mock search suggestions
  const searchSuggestions = [
    "123 Main Street, New York, NY",
    "456 Park Avenue, Manhattan, NY",
    "789 Broadway, Brooklyn, NY",
    "321 Central Park West, NY",
  ];

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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Shipping Information */}
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Shipping Information
              </h2>

              {/* Address Type Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Address Type
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    {
                      value: "villa",
                      label: "Villa",
                      description: "Residential house",
                    },
                    {
                      value: "apartment",
                      label: "Apartment",
                      description: "Multi-unit building",
                    },
                    {
                      value: "office",
                      label: "Office",
                      description: "Business address",
                    },
                  ].map((type) => (
                    <label
                      key={type.value}
                      className={`relative flex cursor-pointer rounded-lg border p-4 focus:outline-none transition-all ${
                        shippingType === type.value
                          ? "border-indigo-600 bg-indigo-50 shadow-sm"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <input
                        type="radio"
                        name="shipping-type"
                        value={type.value}
                        checked={shippingType === type.value}
                        onChange={(e) => setShippingType(e.target.value)}
                        className="sr-only"
                      />
                      <div className="flex items-center w-full">
                        <div
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            shippingType === type.value
                              ? "border-indigo-600 bg-indigo-600"
                              : "border-gray-300"
                          }`}
                        >
                          {shippingType === type.value && (
                            <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                          )}
                        </div>
                        <div className="ml-3 flex-1">
                          <span className="block text-sm font-medium text-gray-900">
                            {type.label}
                          </span>
                          <span className="block text-xs text-gray-500">
                            {type.description}
                          </span>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-2"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-2"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="john.doe@example.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-2"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              {/* Map Search */}
              <div className="mb-6">
                <label
                  htmlFor="mapSearch"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Search Location on Map *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="mapSearch"
                    value={mapSearch}
                    onChange={handleMapSearch}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter your address to search on map..."
                  />
                  <div className="absolute right-3 top-2">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>

                  {/* Search Suggestions */}
                  {mapSearch && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                      {searchSuggestions
                        .filter((suggestion) =>
                          suggestion
                            .toLowerCase()
                            .includes(mapSearch.toLowerCase()),
                        )
                        .map((suggestion, index) => (
                          <div
                            key={index}
                            className="px-3 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                            onClick={() => handlePlaceSelect(suggestion)}
                          >
                            <div className="flex items-center space-x-2">
                              <svg
                                className="w-4 h-4 text-gray-400"
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
                              <span className="text-sm">{suggestion}</span>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Map Display */}
              <div className="mb-6">
                <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center relative overflow-hidden">
                  {/* Mock Map - Replace with actual Google Maps component */}
                  <div className="text-center">
                    <svg
                      className="w-12 h-12 text-gray-400 mx-auto mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                      />
                    </svg>
                    <p className="text-gray-600 font-medium">
                      Google Maps Integration
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Selected Location: {mapLocation.address}
                    </p>
                    <p className="text-xs text-gray-400">
                      Coordinates: {mapLocation.lat.toFixed(4)},{" "}
                      {mapLocation.lng.toFixed(4)}
                    </p>

                    {/* Mock Map Marker */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="relative">
                        <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg"></div>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-red-500"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Address Details */}
              <div className="grid grid-cols-1 gap-4 mb-6">
                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700 mb-2"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="123 Main Street"
                  />
                </div>

                {/* Dynamic Fields based on Address Type */}
                {shippingType === "apartment" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="apartment"
                        className="block text-sm font-medium text-gray-700 mb-2"
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Apt 4B"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="floor"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Floor
                      </label>
                      <input
                        type="text"
                        id="floor"
                        name="floor"
                        value={shippingData.floor}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="3rd Floor"
                      />
                    </div>
                  </div>
                )}

                {shippingType === "office" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="officeNumber"
                        className="block text-sm font-medium text-gray-700 mb-2"
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Suite 500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="company"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={shippingData.company}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Tech Corp Inc."
                      />
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700 mb-2"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="New York"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      State *
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      required
                      value={shippingData.state}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="NY"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="zipCode"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      required
                      value={shippingData.zipCode}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="10001"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Instructions */}
              <div className="mb-6">
                <label
                  htmlFor="deliveryInstructions"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Delivery Notes
                </label>
                <textarea
                  id="deliveryInstructions"
                  name="deliveryInstructions"
                  rows={4}
                  value={shippingData.deliveryInstructions}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Any special delivery instructions? (gate code, building access, etc.)"
                />
              </div>

              <div className="flex items-center mb-6"></div>

              <button
                type="submit"
                className="w-full bg-primary cursor-pointer text-white py-3 px-4 rounded-[100px] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 font-medium"
              >
                Order Now Order - ${calculateTotal().toFixed(2)}
              </button>
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
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          Qty: {item.quantity}
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

              {/* Selected Address Preview */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-medium text-gray-900 mb-2">
                  Delivery To
                </h4>
                <p className="text-xs text-gray-600">
                  {shippingData.firstName} {shippingData.lastName}
                </p>
                <p className="text-xs text-gray-600">{shippingData.address}</p>
                {shippingData.apartment && (
                  <p className="text-xs text-gray-600">
                    Apt: {shippingData.apartment}
                  </p>
                )}
                <p className="text-xs text-gray-600">
                  {shippingData.city}, {shippingData.state}{" "}
                  {shippingData.zipCode}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
