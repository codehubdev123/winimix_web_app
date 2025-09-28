import React from "react";
import { UseFormRegister, FieldError, FieldErrors } from "react-hook-form";

interface CheckboxProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  disabled?: boolean;
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  name,
  register,
  errors,
  disabled = false,
  className = "",
}) => {
  const error = errors[name] as FieldError | undefined;

  return (
    <div className={`mb-4 ${className}`}>
      <label className="flex items-center space-x-3">
        <input
          type="checkbox"
          {...register(name)}
          disabled={disabled}
          className={`h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
        />
        <span className="text-sm font-medium text-gray-700">{label}</span>
      </label>
      {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
    </div>
  );
};
