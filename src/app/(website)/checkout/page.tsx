"use client";
import { useState, useRef } from "react";
import {
  GoogleMap,
  LoadScript,
  Autocomplete,
  Marker,
} from "@react-google-maps/api";

const CheckoutPage = () => {
  const [addressType, setAddressType] = useState("villa");
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: "",
    phone: "",
    email: "",

    // Address Type Specific Fields
    villaNumber: "",
    buildingName: "",
    buildingNumber: "",
    floor: "",
    apartmentNumber: "",
    towerName: "",
    officeNumber: "",

    // Common Address Fields
    street: "",
    district: "",
    city: "",
    country: "Saudi Arabia",
    postalCode: "",

    // Additional Info
    notes: "",

    // Payment
    paymentMethod: "credit-card",
    saveAddress: true,
  });

  const [mapLocation, setMapLocation] = useState({
    lat: 24.7136,
    lng: 46.6753,
    address: "Riyadh, Saudi Arabia",
  });

  const [mapSearch, setMapSearch] = useState("");
  const autocompleteRef = useRef(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // Supported GCC countries
  const gccCountries = [
    "Saudi Arabia",
    "United Arab Emirates",
    "Qatar",
    "Bahrain",
    "Oman",
    "Kuwait",
  ];

  const saudiCities = [
    "Riyadh",
    "Jeddah",
    "Mecca",
    "Medina",
    "Dammam",
    "Khobar",
    "Dhahran",
    "Tabuk",
    "Abha",
    "Jizan",
    "Al Hofuf",
    "Al Khobar",
  ];

  const addressTypes = [
    {
      value: "villa",
      label: "Villa",
      icon: "🏠",
      description: "Standalone house",
      inputs: ["villaNumber"],
    },
    {
      value: "apartment",
      label: "Apartment",
      icon: "🏢",
      description: "in a building",
      inputs: ["buildingName", "buildingNumber", "floor", "apartmentNumber"],
    },
    // {
    //   value: "building",
    //   label: "Building",
    //   icon: "🏬",
    //   description: "Commercial building",
    //   inputs: ["buildingName", "buildingNumber", "floor"],
    // },
    {
      value: "office",
      label: "Office",
      icon: "💼",
      description: "Office space",
      inputs: ["towerName", "floor", "officeNumber"],
    },
  ];

  const paymentMethods = [
    {
      value: "credit-card",
      label: "Credit/Debit Card",
      icons: ["💳", "🛡️"],
      description: "Pay with Visa, MasterCard, or Mada",
    },
    {
      value: "apple-pay",
      label: "Apple Pay",
      icons: [""],
      description: "Fast and secure payment",
    },
    {
      value: "stc-pay",
      label: "STC Pay",
      icons: ["📱"],
      description: "Popular in Saudi Arabia",
    },
    {
      value: "cash",
      label: "Cash on Delivery",
      icons: ["💵"],
      description: "Pay when you receive",
    },
  ];

  const cardIcons = {
    visa: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg",
    mastercard:
      "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg",
    mada: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Mada_Logo.svg",
    amex: "https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg",
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddressTypeChange = (type) => {
    setAddressType(type);
    // Reset specific fields when changing address type
    setFormData((prev) => ({
      ...prev,
      villaNumber: "",
      buildingName: "",
      buildingNumber: "",
      floor: "",
      apartmentNumber: "",
      towerName: "",
      officeNumber: "",
    }));
  };

  const onMapLoad = (map) => {
    setIsMapLoaded(true);
  };

  const onAutocompleteLoad = (autocomplete) => {
    autocompleteRef.current = autocomplete;
    autocomplete.setComponentRestrictions({
      country: ["sa", "ae", "qa", "bh", "om", "kw"],
    });
  };

  const onPlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place.geometry) {
        const location = place.geometry.location;
        setMapLocation({
          lat: location.lat(),
          lng: location.lng(),
          address: place.formatted_address,
        });

        // Extract address components
        const addressComponents = place.address_components;
        let street = "";
        let district = "";
        let city = "";
        let country = "";

        addressComponents.forEach((component) => {
          const types = component.types;
          if (types.includes("route")) {
            street = component.long_name;
          } else if (
            types.includes("sublocality") ||
            types.includes("neighborhood")
          ) {
            district = component.long_name;
          } else if (types.includes("locality")) {
            city = component.long_name;
          } else if (types.includes("country")) {
            country = component.long_name;
          }
        });

        setFormData((prev) => ({
          ...prev,
          street: street || prev.street,
          district: district || prev.district,
          city: city || prev.city,
          country: country || prev.country,
        }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Checkout data:", { addressType, ...formData, mapLocation });
    alert("Order placed successfully!");
  };

  const mapContainerStyle = {
    width: "100%",
    height: "300px",
    borderRadius: "12px",
  };

  const center = {
    lat: mapLocation.lat,
    lng: mapLocation.lng,
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
      libraries={["places"]}
      onLoad={onMapLoad}
    >
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Complete Your Order
            </h1>
            <p className="text-gray-600 mt-2">
              Enter your delivery details and payment information
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information Card */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3">
                      1
                    </span>
                    Personal Information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="+966 5X XXX XXXX"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Address Type Selection */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3">
                      2
                    </span>
                    Shipping Type
                  </h2>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                    {addressTypes.map((type) => (
                      <label
                        key={type.value}
                        className={`relative cursor-pointer group ${
                          addressType === type.value
                            ? "ring-2 ring-blue-500"
                            : "hover:ring-2 hover:ring-gray-300"
                        } rounded-xl transition-all duration-300`}
                      >
                        <input
                          type="radio"
                          name="addressType"
                          value={type.value}
                          checked={addressType === type.value}
                          onChange={() => handleAddressTypeChange(type.value)}
                          className="sr-only"
                        />
                        <div
                          className={`p-4 rounded-xl border-2 text-center transition-all duration-300 ${
                            addressType === type.value
                              ? "bg-blue-50 border-blue-300"
                              : "bg-gray-50 border-gray-200 group-hover:border-gray-300"
                          }`}
                        >
                          <div className="text-2xl mb-2">{type.icon}</div>
                          <div className="font-medium text-gray-900">
                            {type.label}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {type.description}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>

                  {/* Dynamic Address Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Villa Specific */}
                    {addressType === "villa" && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Villa Number *
                        </label>
                        <input
                          type="text"
                          name="villaNumber"
                          required
                          value={formData.villaNumber}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          placeholder="Villa 123"
                        />
                      </div>
                    )}

                    {/* Apartment/Building Specific */}
                    {(addressType === "apartment" ||
                      addressType === "building") && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Building Name *
                          </label>
                          <input
                            type="text"
                            name="buildingName"
                            required
                            value={formData.buildingName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                            placeholder="Al Faisaliah Tower"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Building Number *
                          </label>
                          <input
                            type="text"
                            name="buildingNumber"
                            required
                            value={formData.buildingNumber}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                            placeholder="Bldg 456"
                          />
                        </div>
                      </>
                    )}

                    {/* Office Specific */}
                    {addressType === "office" && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tower Name *
                        </label>
                        <input
                          type="text"
                          name="towerName"
                          required
                          value={formData.towerName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          placeholder="Kingdom Tower"
                        />
                      </div>
                    )}

                    {/* Common Fields for Multiple Types */}
                    {(addressType === "apartment" ||
                      addressType === "building" ||
                      addressType === "office") && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Floor *
                        </label>
                        <input
                          type="text"
                          name="floor"
                          required
                          value={formData.floor}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          placeholder="Floor 15"
                        />
                      </div>
                    )}

                    {(addressType === "apartment" ||
                      addressType === "office") && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {addressType === "apartment"
                            ? "Apartment Number *"
                            : "Office Number *"}
                        </label>
                        <input
                          type="text"
                          name={
                            addressType === "apartment"
                              ? "apartmentNumber"
                              : "officeNumber"
                          }
                          required
                          value={
                            formData[
                              addressType === "apartment"
                                ? "apartmentNumber"
                                : "officeNumber"
                            ]
                          }
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          placeholder={
                            addressType === "apartment"
                              ? "Apt 301"
                              : "Office 1502"
                          }
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Map and Location */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3">
                      3
                    </span>
                    Location on Map
                  </h2>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Search Location (GCC Countries Only) *
                    </label>
                    <Autocomplete
                      onLoad={onAutocompleteLoad}
                      onPlaceChanged={onPlaceChanged}
                      options={{
                        types: ["address"],
                        componentRestrictions: {
                          country: ["sa", "ae", "qa", "bh", "om", "kw"],
                        },
                      }}
                    >
                      <input
                        type="text"
                        value={mapSearch}
                        onChange={(e) => setMapSearch(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="Enter your address in Saudi Arabia, UAE, Qatar, etc."
                      />
                    </Autocomplete>
                  </div>

                  {isMapLoaded ? (
                    <GoogleMap
                      mapContainerStyle={mapContainerStyle}
                      center={center}
                      zoom={15}
                    >
                      <Marker position={center} />
                    </GoogleMap>
                  ) : (
                    <div className="h-64 bg-gray-200 rounded-xl flex items-center justify-center">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading map...</p>
                      </div>
                    </div>
                  )}

                  <div className="mt-4 text-xs text-gray-500 flex items-center">
                    <svg
                      className="w-4 h-4 mr-1 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    Map restricted to GCC countries: Saudi Arabia, UAE, Qatar,
                    Bahrain, Oman, Kuwait
                  </div>
                </div>

                {/* Additional Address Details */}
                {/* <div className="bg-white rounded-2xl shadow-lg p-6"> */}
                {/*   <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center"> */}
                {/*     <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3"> */}
                {/*       4 */}
                {/*     </span> */}
                {/*     Address Details */}
                {/*   </h2> */}
                {/**/}
                {/*   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"> */}
                {/*     <div> */}
                {/*       <label className="block text-sm font-medium text-gray-700 mb-2"> */}
                {/*         Street Name * */}
                {/*       </label> */}
                {/*       <input */}
                {/*         type="text" */}
                {/*         name="street" */}
                {/*         required */}
                {/*         value={formData.street} */}
                {/*         onChange={handleInputChange} */}
                {/*         className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300" */}
                {/*         placeholder="King Fahd Road" */}
                {/*       /> */}
                {/*     </div> */}
                {/**/}
                {/*     <div> */}
                {/*       <label className="block text-sm font-medium text-gray-700 mb-2"> */}
                {/*         District * */}
                {/*       </label> */}
                {/*       <input */}
                {/*         type="text" */}
                {/*         name="district" */}
                {/*         required */}
                {/*         value={formData.district} */}
                {/*         onChange={handleInputChange} */}
                {/*         className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300" */}
                {/*         placeholder="Al Olaya" */}
                {/*       /> */}
                {/*     </div> */}
                {/**/}
                {/*     <div> */}
                {/*       <label className="block text-sm font-medium text-gray-700 mb-2"> */}
                {/*         City * */}
                {/*       </label> */}
                {/*       <select */}
                {/*         name="city" */}
                {/*         required */}
                {/*         value={formData.city} */}
                {/*         onChange={handleInputChange} */}
                {/*         className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300" */}
                {/*       > */}
                {/*         <option value="">Select City</option> */}
                {/*         {saudiCities.map((city) => ( */}
                {/*           <option key={city} value={city}> */}
                {/*             {city} */}
                {/*           </option> */}
                {/*         ))} */}
                {/*       </select> */}
                {/*     </div> */}
                {/**/}
                {/*     <div> */}
                {/*       <label className="block text-sm font-medium text-gray-700 mb-2"> */}
                {/*         Postal Code */}
                {/*       </label> */}
                {/*       <input */}
                {/*         type="text" */}
                {/*         name="postalCode" */}
                {/*         value={formData.postalCode} */}
                {/*         onChange={handleInputChange} */}
                {/*         className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300" */}
                {/*         placeholder="12345" */}
                {/*       /> */}
                {/*     </div> */}
                {/*   </div> */}
                {/**/}
                {/*   <div> */}
                {/*     <label className="block text-sm font-medium text-gray-700 mb-2"> */}
                {/*       Delivery Notes */}
                {/*     </label> */}
                {/*     <textarea */}
                {/*       name="notes" */}
                {/*       rows={3} */}
                {/*       value={formData.notes} */}
                {/*       onChange={handleInputChange} */}
                {/*       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300" */}
                {/*       placeholder="Any special delivery instructions? (gate code, building access, etc.)" */}
                {/*     /> */}
                {/*   </div> */}
                {/* </div> */}

                {/* Payment Method */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3">
                      5
                    </span>
                    Payment Method
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {paymentMethods.map((method) => (
                      <label
                        key={method.value}
                        className={`relative cursor-pointer group ${
                          formData.paymentMethod === method.value
                            ? "ring-2 ring-blue-500"
                            : "hover:ring-2 hover:ring-gray-300"
                        } rounded-xl transition-all duration-300`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.value}
                          checked={formData.paymentMethod === method.value}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <div
                          className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                            formData.paymentMethod === method.value
                              ? "bg-blue-50 border-blue-300"
                              : "bg-gray-50 border-gray-200 group-hover:border-gray-300"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-gray-900">
                              {method.label}
                            </span>
                            <div className="flex space-x-1">
                              {method.icons.map((icon, index) => (
                                <span key={index} className="text-lg">
                                  {icon}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="text-xs text-gray-500">
                            {method.description}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>

                  {/* Card Icons Display */}
                  {formData.paymentMethod === "credit-card" && (
                    <div className="border-t pt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        We Accept
                      </label>
                      <div className="flex space-x-3">
                        {Object.entries(cardIcons).map(([card, icon]) => (
                          <div
                            key={card}
                            className="w-12 h-8 bg-white border border-gray-200 rounded flex items-center justify-center p-1"
                          >
                            <img
                              src={icon}
                              alt={card}
                              className="max-w-full max-h-full object-contain"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center mt-4">
                    <input
                      type="checkbox"
                      name="saveAddress"
                      checked={formData.saveAddress}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label className="ml-2 text-sm text-gray-700">
                      Save this address for future orders
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:from-blue-700 hover:to-green-700"
                >
                  Complete Order - SAR 1,245.00
                </button>
              </form>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Order Summary
                </h3>

                {/* Product List */}
                <div className="space-y-4 mb-6">
                  {[
                    {
                      name: "Wireless Headphones",
                      price: 299,
                      quantity: 1,
                      image: "🎧",
                    },
                    { name: "Phone Case", price: 49, quantity: 2, image: "📱" },
                    {
                      name: "Smart Watch",
                      price: 199,
                      quantity: 1,
                      image: "⌚",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-xl">
                          {item.image}
                        </div>
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
                        SAR {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-2 border-t pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">SAR 796.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-gray-900">SAR 49.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax (15%)</span>
                    <span className="text-gray-900">SAR 119.40</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Discount</span>
                    <span className="text-green-600">-SAR 50.00</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold border-t pt-2">
                    <span className="text-gray-900">Total</span>
                    <span className="text-gray-900">SAR 914.40</span>
                  </div>
                </div>

                {/* Delivery Estimate */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-2 text-blue-700">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-sm font-medium">
                      Estimated Delivery
                    </span>
                  </div>
                  <p className="text-sm text-blue-600 mt-1">
                    2-3 business days
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LoadScript>
  );
};

export default CheckoutPage;
