"use client";

import { useLocale } from "@/contexts/LocaleContext";
import { useEffect, useRef, useState } from "react";

const NewCurrencyDropdown = () => {
  const { locale, changeLocale, t } = useLocale();
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("ريال");
  const languageRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (languageRef.current && !languageRef.current.contains(event.target)) {
        setIsLanguageDropdownOpen(false);
      }
      // if (countryRef.current && !countryRef.current.contains(event.target)) {
      //   setIsCountryDropdownOpen(false);
      // }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const languages = [
    { code: "1", name: "ريال" },
    { code: "2", name: "درهم" },
    { code: "3", name: "دولار" },
    { code: "4", name: "دينار" },
  ];
  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language.name);
    setIsLanguageDropdownOpen(false);
  };

  return (
    <div className="relative" ref={languageRef}>
      <button
        onClick={() => {
          setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
          // setIsCountryDropdownOpen(false);
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
        <div className="absolute left-0 rtl:left-auto rtl:left-0 mt-1 w-32 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
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
  );
};

export default NewCurrencyDropdown;
