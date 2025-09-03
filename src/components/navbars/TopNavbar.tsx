"use client";
import React, { useState, useRef, useEffect } from "react";

const TopNavbar = () => {
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("EN");
  const [selectedCountry, setSelectedCountry] = useState({
    name: "Saudi Arabia",
    code: "KSA",
    flag: "🇸🇦",
  });

  const languageRef = useRef(null);
  const countryRef = useRef(null);

  const countries = [
    { name: "Saudi Arabia", code: "KSA", flag: "🇸🇦" },
    { name: "Bahrain", code: "BH", flag: "🇧🇭" },
    { name: "Emirates", code: "UAE", flag: "🇦🇪" },
    { name: "Qatar", code: "QA", flag: "🇶🇦" },
    { name: "Kuwait", code: "KW", flag: "🇰🇼" },
  ];

  const languages = [
    { code: "EN", name: "English" },
    { code: "AR", name: "العربية" },
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (languageRef.current && !languageRef.current.contains(event.target)) {
        setIsLanguageDropdownOpen(false);
      }
      if (countryRef.current && !countryRef.current.contains(event.target)) {
        setIsCountryDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setIsCountryDropdownOpen(false);
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language.code);
    setIsLanguageDropdownOpen(false);
  };

  return (
    <div className="bg-amber-100 text-gray-600 text-xs border-b border-gray-200 relative z-[999]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-8">
          {/* Left side - Phone number */}
          <div className="flex items-center">
            <svg
              className="w-3 h-3 mr-1 rtl:mr-0 rtl:ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              ></path>
            </svg>
            <span className="hidden sm:inline">Customer Service: </span>
            <a
              href="tel:+966112345678"
              className="ml-1 rtl:ml-2 rtl:mr-1 hover:text-amber-700 transition-colors duration-200"
            >
              +966 11 234 5678
            </a>
          </div>

          {/* Right side - Language and Country selector */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            {/* Language Selector */}
            <div className="relative" ref={languageRef}>
              <button
                onClick={() => {
                  setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
                  setIsCountryDropdownOpen(false);
                }}
                className="flex items-center hover:text-amber-700 transition-colors duration-200"
              >
                <span>{selectedLanguage}</span>
                <svg
                  className={`ml-1 rtl:ml-2 rtl:mr-1 w-3 h-3 transition-transform duration-200 ${isLanguageDropdownOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>

              {/* Language Dropdown Menu */}
              {isLanguageDropdownOpen && (
                <div className="absolute right-0 rtl:right-auto rtl:left-0 mt-1 w-32 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => handleLanguageSelect(language)}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-amber-200 transition-colors duration-200 ${selectedLanguage === language.code ? "text-amber-700" : "text-gray-700"}`}
                    >
                      {language.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Country Selector */}
            <div className="relative" ref={countryRef}>
              <button
                onClick={() => {
                  setIsCountryDropdownOpen(!isCountryDropdownOpen);
                  setIsLanguageDropdownOpen(false);
                }}
                className="flex items-center hover:text-amber-700 transition-colors duration-200"
              >
                <span className="mr-1 rtl:mr-2 rtl:ml-1">
                  {selectedCountry.flag}
                </span>
                <span className="hidden sm:inline">{selectedCountry.code}</span>
                <svg
                  className={`ml-1 rtl:ml-0 rtl:mr-1 w-3 h-3 transition-transform duration-200 ${isCountryDropdownOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>

              {/* Country Dropdown Menu */}
              {isCountryDropdownOpen && (
                <div className="absolute right-0 rtl:right-auto rtl:left-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                  {countries.map((country) => (
                    <button
                      key={country.code}
                      onClick={() => handleCountrySelect(country)}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-amber-200 transition-colors duration-200 ${selectedCountry.code === country.code ? "text-amber-700" : "text-gray-700"}`}
                    >
                      <span className="mr-2 rtl:mr-2 rtl:ml-2">
                        {country.flag}
                      </span>
                      {country.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
