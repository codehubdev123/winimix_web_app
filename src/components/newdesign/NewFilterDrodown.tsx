"use client";

import { useState, useRef, useEffect } from "react";

const Dropdown = ({
  options,
  onSelect,
  placeholder = "Select an option",
  disabled = false,
  value = null,
  className = "",
  position = "bottom",
  maxHeight = "200px",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(value);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setSelected(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (option) => {
    setSelected(option);
    onSelect(option);
    setIsOpen(false);
  };

  const getPositionClasses = () => {
    switch (position) {
      case "top":
        return "bottom-full ltr:left-0 rtl:right-0 mb-2";
      case "left":
        return "ltr:right-full rtl:left-full ltr:mr-2 rtl:ml-2 top-0";
      case "right":
        return "ltr:left-full rtl:right-full ltr:ml-2 rtl:mr-2 top-0";
      default: // bottom
        return "top-full ltr:left-0 rtl:right-0 mt-2";
    }
  };

  return (
    <div
      className={`relative inline-block min-w-48 text-left w-full ${className}`}
      ref={dropdownRef}
    >
      <div>
        <button
          type="button"
          className={`inline-flex justify-between items-center w-full rounded-[100px] border border-gray-300 shadow-sm px-4 py-3 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-primary-500 transition-all duration-200
            ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
            rtl:flex-row-reverse
          `}
          id="options-menu"
          aria-haspopup="true"
          aria-expanded={isOpen}
          disabled={disabled}
          onClick={() => !disabled && setIsOpen(!isOpen)}
        >
          <span className="truncate">
            {selected ? selected.label : placeholder}
          </span>
          <svg
            className={`-me-1 ms-2 h-5 w-5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          className={`origin-top-right absolute w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 ${getPositionClasses()}`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1 overflow-auto" style={{ maxHeight }} role="none">
            {options.map((option, index) => (
              <button
                key={index}
                className={`block w-full text-left px-4 py-2 text-sm transition-colors duration-150
                  ${
                    selected && selected.value === option.value
                      ? "bg-primary-100 text-primary-900"
                      : "text-[#4E5562] hover:bg-gray-100 hover:text-gray-900"
                  }
                  rtl:text-right
                `}
                role="menuitem"
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </button>
            ))}

            {options.length === 0 && (
              <div className="px-4 py-2 text-sm text-gray-500">
                No options available
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
