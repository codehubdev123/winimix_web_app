"use client";

import { useEffect, useRef, useState } from "react";

const NewCountriesDropdown = () => {
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    name: "Saudi Arabia",
    code: "KSA",
    flag: "🇸🇦",
  });
  const countryRef = useRef(null);

  const countries = [
    { name: "Saudi Arabia", code: "KSA", flag: "🇸🇦" },
    { name: "Bahrain", code: "BH", flag: "🇧🇭" },
    { name: "Emirates", code: "UAE", flag: "🇦🇪" },
    { name: "Qatar", code: "QA", flag: "🇶🇦" },
    { name: "Kuwait", code: "KW", flag: "🇰🇼" },
  ];
  // Close dropdowns when clicking outside
  useEffect(() => {
    // if (languageRef.current && !languageRef.current.contains(event.target)) {
    //   setIsLanguageDropdownOpen(false);
    // }

    const handleClickOutside = (event) => {
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

  return (
    <div className="relative" ref={countryRef}>
      <button
        onClick={() => {
          setIsCountryDropdownOpen(!isCountryDropdownOpen);
          // setIsLanguageDropdownOpen(false);
        }}
        className="flex items-center hover:text-secondary transition-colors duration-200"
      >
        <span className="mr-1 rtl:mr-2 rtl:ml-1">{selectedCountry.flag}</span>
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
        <div className="absolute left-0 rtl:left-auto rtl:left-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
          {countries.map((country) => (
            <button
              key={country.code}
              onClick={() => handleCountrySelect(country)}
              className={`block w-full text-left px-4 py-2 text-[14px]  hover:bg-primary hover:text-white transition-colors duration-200 ${selectedCountry.code === country.code ? "text-secondary" : "text-gray-700"}`}
            >
              <span className="mr-2 rtl:mr-2 rtl:ml-2 text-[14px]">
                {country.flag}
              </span>
              {country.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewCountriesDropdown;
