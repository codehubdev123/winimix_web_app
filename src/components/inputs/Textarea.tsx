import React from "react";
import { UseFormRegister, FieldError, FieldErrors } from "react-hook-form";
import ErrorMessage from "../messages/ErrorMessage";

interface TextareaProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  rows?: number;
  className?: string;
  dir?: "ltr" | "rtl";
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  name,
  register,
  errors,
  required = false,
  placeholder,
  disabled = false,
  rows = 4,
  className = "",
  dir = "ltr",
}) => {
  const error = errors[name] as FieldError | undefined;

  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        id={name}
        rows={rows}
        {...register(name)}
        placeholder={placeholder}
        disabled={disabled}
        dir={dir}
        className={`
          w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          ${error ? "border-red-500" : "border-gray-300"}
          ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
          resize-vertical
          ${className}
        `}
      />
      <ErrorMessage errors={errors} id={name} />
    </div>
  );
};
