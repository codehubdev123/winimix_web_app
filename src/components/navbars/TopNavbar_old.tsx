"use client";
import { useLocale } from "@/contexts/LocaleContext";
import { Phone } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

const TopNavbar = () => {
  const { locale, changeLocale, t } = useLocale();
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
    changeLocale();
  };

  return (
    <div className="bg-primary/30 text-font text-xs border-b border-primary relative z-[999]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-8">
          {/* Left side - Phone number */}
          <div className="flex items-center">
            <Phone className="w-3 h-3 mr-1 rtl:mr-0 rtl:ml-1" />
            <span className="hidden sm:inline">Customer Service: </span>
            <a
              href="tel:+966112345678"
              className="ml-1 rtl:ml-2 rtl:mr-1 hover:text-secondary  transition-colors duration-200"
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
                className="flex items-center hover:text-secondary transition-colors duration-200"
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
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-primary hover:text-white transition-colors duration-200 ${selectedLanguage === language.code ? "text-secondary" : "text-gray-700"}`}
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
                className="flex items-center hover:text-secondary transition-colors duration-200"
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
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-primary hover:text-white transition-colors duration-200 ${selectedCountry.code === country.code ? "text-secondary" : "text-gray-700"}`}
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
