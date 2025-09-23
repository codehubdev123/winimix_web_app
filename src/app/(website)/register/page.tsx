"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const RegisterPage = () => {
  const [userType, setUserType] = useState("user");
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
    agreeToTerms: false,
    newsletter: true,
    dateOfBirth: "",
    companyName: "",
    businessType: "",
    taxId: "",
    website: "",
    businessAddress: "",
    city: "",
    country: "",
    zipCode: "",
    description: "",
    categories: [],
  });

  const businessTypes = [
    "Retail",
    "Wholesale",
    "Manufacturer",
    "Dropshipper",
    "Service Provider",
    "Digital Products",
  ];
  const productCategories = [
    "Electronics",
    "Fashion",
    "Home & Garden",
    "Beauty & Health",
    "Sports & Outdoors",
    "Books & Media",
    "Toys & Games",
    "Food & Beverages",
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCategoryToggle = (category) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentStep < (userType === "user" ? 2 : 3)) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log("Registration data:", { userType, ...formData });
      alert(
        `${userType === "user" ? "User" : "Vendor"} registration successful!`,
      );
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return (
          formData.email &&
          formData.password &&
          formData.confirmPassword &&
          formData.password === formData.confirmPassword &&
          formData.agreeToTerms
        );
      case 2:
        if (userType === "user") {
          return formData.firstName && formData.lastName && formData.phone;
        }
        return formData.companyName && formData.businessType && formData.taxId;
      case 3:
        return formData.businessAddress && formData.city && formData.country;
      default:
        return false;
    }
  };

  const totalSteps = userType === "user" ? 2 : 3;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold  x-bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-primary"
          >
            Register
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 mt-2 text-lg"
          >
            Start your journey
          </motion.p>
        </div>

        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Progress Bar */}
          <div className="x-bg-gradient-to-r from-blue-600 to-purple-600 border-t-4 p-1">
            <div
              className="h-1 bg-white/20 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>

          <div className="p-8">
            {/* Step Indicators */}
            <div className="flex justify-center mb-8">
              {[...Array(totalSteps)].map((_, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 font-semibold transition-all duration-300 ${
                      currentStep > index + 1
                        ? "bg-green-500 border-green-500 text-white"
                        : currentStep === index + 1
                          ? "x-bg-blue-600 x-border-blue-600 text-white shadow-lg x-shadow-blue-500/25 bg-primary border-primary border-primary"
                          : "border-gray-300 text-gray-400"
                    }`}
                  >
                    {currentStep > index + 1 ? (
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
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      index + 1
                    )}
                  </div>
                  {index < totalSteps - 1 && (
                    <div
                      className={`w-16 h-1 mx-2 transition-all duration-300 ${
                        currentStep > index + 1 ? "bg-green-500" : "bg-gray-300"
                      }`}
                    ></div>
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <AnimatePresence mode="wait">
                {/* Step 1: Account Type */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
                        Choose Your Path
                      </h2>
                      <p className="text-gray-600 text-center">
                        Select how you want to use our platform
                      </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* User Card */}
                      <motion.label
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative cursor-pointer group ${
                          userType === "user"
                            ? "ring-4 ring-blue-500/20"
                            : "hover:ring-4 hover:ring-gray-200"
                        } rounded-2xl transition-all duration-300`}
                      >
                        <input
                          type="radio"
                          name="userType"
                          value="user"
                          checked={userType === "user"}
                          onChange={(e) => setUserType(e.target.value)}
                          className="sr-only"
                        />
                        <div
                          className={`p-8 rounded-2xl border-2 transition-all duration-300 ${
                            userType === "user"
                              ? "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-300"
                              : "bg-white border-gray-200 group-hover:border-blue-200"
                          }`}
                        >
                          <div className="text-center">
                            <div
                              className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-all duration-300 ${
                                userType === "user"
                                  ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
                                  : "bg-gray-100 text-gray-400 group-hover:bg-blue-100 group-hover:text-blue-500"
                              }`}
                            >
                              <svg
                                className="w-8 h-8"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                              </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                              Shopping User
                            </h3>
                            <p className="text-gray-600 mb-4">
                              I want to shop and purchase products
                            </p>
                            {/* <ul className="text-sm text-gray-500 space-y-1"> */}
                            {/*   <li className="flex items-center"> */}
                            {/*     <svg */}
                            {/*       className="w-4 h-4 text-green-500 mr-2" */}
                            {/*       fill="none" */}
                            {/*       stroke="currentColor" */}
                            {/*       viewBox="0 0 24 24" */}
                            {/*     > */}
                            {/*       <path */}
                            {/*         strokeLinecap="round" */}
                            {/*         strokeLinejoin="round" */}
                            {/*         strokeWidth={2} */}
                            {/*         d="M5 13l4 4L19 7" */}
                            {/*       /> */}
                            {/*     </svg> */}
                            {/*     Browse thousands of products */}
                            {/*   </li> */}
                            {/*   <li className="flex items-center"> */}
                            {/*     <svg */}
                            {/*       className="w-4 h-4 text-green-500 mr-2" */}
                            {/*       fill="none" */}
                            {/*       stroke="currentColor" */}
                            {/*       viewBox="0 0 24 24" */}
                            {/*     > */}
                            {/*       <path */}
                            {/*         strokeLinecap="round" */}
                            {/*         strokeLinejoin="round" */}
                            {/*         strokeWidth={2} */}
                            {/*         d="M5 13l4 4L19 7" */}
                            {/*       /> */}
                            {/*     </svg> */}
                            {/*     Secure payment processing */}
                            {/*   </li> */}
                            {/*   <li className="flex items-center"> */}
                            {/*     <svg */}
                            {/*       className="w-4 h-4 text-green-500 mr-2" */}
                            {/*       fill="none" */}
                            {/*       stroke="currentColor" */}
                            {/*       viewBox="0 0 24 24" */}
                            {/*     > */}
                            {/*       <path */}
                            {/*         strokeLinecap="round" */}
                            {/*         strokeLinejoin="round" */}
                            {/*         strokeWidth={2} */}
                            {/*         d="M5 13l4 4L19 7" */}
                            {/*       /> */}
                            {/*     </svg> */}
                            {/*     Fast delivery options */}
                            {/*   </li> */}
                            {/* </ul> */}
                          </div>
                        </div>
                      </motion.label>

                      {/* Vendor Card */}
                      <motion.label
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative cursor-pointer group ${
                          userType === "vendor"
                            ? "ring-4 ring-purple-500/20"
                            : "hover:ring-4 hover:ring-gray-200"
                        } rounded-2xl transition-all duration-300`}
                      >
                        <input
                          type="radio"
                          name="userType"
                          value="vendor"
                          checked={userType === "vendor"}
                          onChange={(e) => setUserType(e.target.value)}
                          className="sr-only"
                        />
                        <div
                          className={`p-8 rounded-2xl border-2 transition-all duration-300 ${
                            userType === "vendor"
                              ? "bg-gradient-to-br from-purple-50 to-purple-100 border-purple-300"
                              : "bg-white border-gray-200 group-hover:border-purple-200"
                          }`}
                        >
                          <div className="text-center">
                            <div
                              className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-all duration-300 ${
                                userType === "vendor"
                                  ? "bg-purple-500 text-white shadow-lg shadow-purple-500/25"
                                  : "bg-gray-100 text-gray-400 group-hover:bg-purple-100 group-hover:text-purple-500"
                              }`}
                            >
                              <svg
                                className="w-8 h-8"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 8v-4m0 4h4"
                                />
                              </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                              Vendor/Seller
                            </h3>
                            <p className="text-gray-600 mb-4">
                              I want to sell products on the platform
                            </p>
                            {/* <ul className="text-sm text-gray-500 space-y-1"> */}
                            {/*   <li className="flex items-center"> */}
                            {/*     <svg */}
                            {/*       className="w-4 h-4 text-green-500 mr-2" */}
                            {/*       fill="none" */}
                            {/*       stroke="currentColor" */}
                            {/*       viewBox="0 0 24 24" */}
                            {/*     > */}
                            {/*       <path */}
                            {/*         strokeLinecap="round" */}
                            {/*         strokeLinejoin="round" */}
                            {/*         strokeWidth={2} */}
                            {/*         d="M5 13l4 4L19 7" */}
                            {/*       /> */}
                            {/*     </svg> */}
                            {/*     Reach millions of customers */}
                            {/*   </li> */}
                            {/*   <li className="flex items-center"> */}
                            {/*     <svg */}
                            {/*       className="w-4 h-4 text-green-500 mr-2" */}
                            {/*       fill="none" */}
                            {/*       stroke="currentColor" */}
                            {/*       viewBox="0 0 24 24" */}
                            {/*     > */}
                            {/*       <path */}
                            {/*         strokeLinecap="round" */}
                            {/*         strokeLinejoin="round" */}
                            {/*         strokeWidth={2} */}
                            {/*         d="M5 13l4 4L19 7" */}
                            {/*       /> */}
                            {/*     </svg> */}
                            {/*     Advanced seller tools */}
                            {/*   </li> */}
                            {/*   <li className="flex items-center"> */}
                            {/*     <svg */}
                            {/*       className="w-4 h-4 text-green-500 mr-2" */}
                            {/*       fill="none" */}
                            {/*       stroke="currentColor" */}
                            {/*       viewBox="0 0 24 24" */}
                            {/*     > */}
                            {/*       <path */}
                            {/*         strokeLinecap="round" */}
                            {/*         strokeLinejoin="round" */}
                            {/*         strokeWidth={2} */}
                            {/*         d="M5 13l4 4L19 7" */}
                            {/*       /> */}
                            {/*     </svg> */}
                            {/*     24/7 seller support */}
                            {/*   </li> */}
                            {/* </ul> */}
                          </div>
                        </div>
                      </motion.label>
                    </div>

                    {/* Account Details */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Account Details
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                            placeholder="your@email.com"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Password *
                            </label>
                            <input
                              type="password"
                              name="password"
                              required
                              value={formData.password}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                              placeholder="••••••••"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Confirm *
                            </label>
                            <input
                              type="password"
                              name="confirmPassword"
                              required
                              value={formData.confirmPassword}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                              placeholder="••••••••"
                            />
                          </div>
                        </div>
                      </div>
                      {formData.password &&
                        formData.confirmPassword &&
                        formData.password !== formData.confirmPassword && (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-red-600 text-sm mt-2 flex items-center"
                          >
                            <svg
                              className="w-4 h-4 mr-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            Passwords do not match
                          </motion.p>
                        )}
                    </motion.div>

                    {/* Terms */}
                    <div className="space-y-4">
                      <label className="flex items-start space-x-3 cursor-pointer group">
                        <div className="flex items-center h-5 mt-0.5">
                          <input
                            type="checkbox"
                            name="agreeToTerms"
                            required
                            checked={formData.agreeToTerms}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition duration-150"
                          />
                        </div>
                        <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                          I agree to the{" "}
                          <Link
                            href="/terms"
                            className="text-blue-600 hover:text-blue-700 font-medium"
                          >
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link
                            href="/privacy"
                            className="text-blue-600 hover:text-blue-700 font-medium"
                          >
                            Privacy Policy
                          </Link>
                        </span>
                      </label>

                      <label className="flex items-start space-x-3 cursor-pointer group">
                        <div className="flex items-center h-5 mt-0.5">
                          <input
                            type="checkbox"
                            name="newsletter"
                            checked={formData.newsletter}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition duration-150"
                          />
                        </div>
                        <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                          Send me product updates, special offers, and
                          newsletters
                        </span>
                      </label>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Profile/Business Info */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
                        {userType === "user"
                          ? "Personal Information"
                          : "Business Information"}
                      </h2>
                      <p className="text-gray-600 text-center">
                        {userType === "user"
                          ? "Tell us about yourself"
                          : "Tell us about your business"}
                      </p>
                    </div>

                    {userType === "user" ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              First Name *
                            </label>
                            <input
                              type="text"
                              name="firstName"
                              required
                              value={formData.firstName}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
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
                              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                            />
                          </div>
                        </div>
                        <div className="space-y-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Last Name *
                            </label>
                            <input
                              type="text"
                              name="lastName"
                              required
                              value={formData.lastName}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Date of Birth
                            </label>
                            <input
                              type="date"
                              name="dateOfBirth"
                              value={formData.dateOfBirth}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Company Name *
                            </label>
                            <input
                              type="text"
                              name="companyName"
                              required
                              value={formData.companyName}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Business Type *
                            </label>
                            <select
                              name="businessType"
                              required
                              value={formData.businessType}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                            >
                              <option value="">Select business type</option>
                              {businessTypes.map((type) => (
                                <option key={type} value={type}>
                                  {type}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Tax ID/VAT Number *
                            </label>
                            <input
                              type="text"
                              name="taxId"
                              required
                              value={formData.taxId}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Website
                            </label>
                            <input
                              type="url"
                              name="website"
                              value={formData.website}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                              placeholder="https://example.com"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-3">
                            Product Categories *
                          </label>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {productCategories.map((category) => (
                              <label
                                key={category}
                                className="flex items-center space-x-2 cursor-pointer group"
                              >
                                <div
                                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                                    formData.categories.includes(category)
                                      ? "bg-blue-500 border-blue-500"
                                      : "border-gray-300 group-hover:border-blue-300"
                                  }`}
                                >
                                  {formData.categories.includes(category) && (
                                    <svg
                                      className="w-3 h-3 text-white"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={3}
                                        d="M5 13l4 4L19 7"
                                      />
                                    </svg>
                                  )}
                                </div>
                                <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                                  {category}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Step 3: Vendor Business Details */}
                {currentStep === 3 && userType === "vendor" && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
                        Business Address
                      </h2>
                      <p className="text-gray-600 text-center">
                        Where is your business located?
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Business Address *
                        </label>
                        <input
                          type="text"
                          name="businessAddress"
                          required
                          value={formData.businessAddress}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            City *
                          </label>
                          <input
                            type="text"
                            name="city"
                            required
                            value={formData.city}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Country *
                          </label>
                          <input
                            type="text"
                            name="country"
                            required
                            value={formData.country}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            ZIP Code *
                          </label>
                          <input
                            type="text"
                            name="zipCode"
                            required
                            value={formData.zipCode}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Business Description
                        </label>
                        <textarea
                          name="description"
                          rows={4}
                          value={formData.description}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          placeholder="Tell us about your business..."
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t border-gray-200">
                <motion.button
                  type="button"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`px-8 py-3 rounded-[100px] font-medium transition-all duration-300 ${
                    currentStep > 1
                      ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      : "invisible"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    <span>Back</span>
                  </div>
                </motion.button>

                <motion.button
                  type="submit"
                  disabled={!isStepValid()}
                  whileHover={{ scale: isStepValid() ? 1.02 : 1 }}
                  whileTap={{ scale: isStepValid() ? 0.98 : 1 }}
                  className={`px-8 py-3 rounded-[100px] font-medium transition-all duration-300 ${
                    isStepValid()
                      ? "x-bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 bg-primary"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span>
                      {currentStep === totalSteps
                        ? "Create Account"
                        : "Continue"}
                    </span>
                    {currentStep < totalSteps && (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    )}
                  </div>
                </motion.button>
              </div>
            </form>

            {/* Login Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center mt-8 pt-6 border-t border-gray-200"
            >
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Sign in here
                </Link>
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
