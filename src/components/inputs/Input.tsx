import React from "react";
import { UseFormRegister, FieldError, FieldErrors } from "react-hook-form";
import ErrorMessage from "../messages/ErrorMessage";

interface InputProps {
  label: string;
  name: string;
  type?: "text" | "email" | "password" | "number" | "url";
  register: UseFormRegister<any>;
  errors: FieldErrors; // Change from error to errors object
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  dir?: "ltr" | "rtl";
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  isNestable?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  name,
  type = "text",
  register,
  errors, // Now receiving the entire errors object
  required = false,
  placeholder,
  disabled = false,
  className = "",
  dir = "ltr",
  onBlur,
  isNestable = false,
}) => {
  // Get error for this specific field
  const error = errors[name] as FieldError | undefined;

  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={name}
        type={type}
        {...register(name)}
        placeholder={placeholder}
        disabled={disabled}
        dir={dir}
        onBlur={onBlur}
        className={`
          w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          ${error ? "border-red-500" : "border-gray-300"}
          ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
          ${className}
        `}
      />
      <ErrorMessage errors={errors} id={name} isNestable={isNestable} />
    </div>
  );
};
