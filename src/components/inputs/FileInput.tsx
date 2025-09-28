import React, { useState, useRef } from "react";
import {
  UseFormRegister,
  FieldError,
  UseFormSetValue,
  UseFormWatch,
  FieldErrors,
} from "react-hook-form";
import { X, Upload } from "lucide-react";

interface FileInputProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
  errors: FieldErrors;
  accept?: string;
  maxSize?: number;
  className?: string;
}

export const FileInput: React.FC<FileInputProps> = ({
  label,
  name,
  register,
  setValue,
  watch,
  errors,
  accept = "image/*",
  maxSize = 5 * 1024 * 1024,
  className = "",
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const currentFile = watch(name);

  const error = errors[name] as FieldError | undefined;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) validateAndSetFile(file);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(false);
    const file = event.dataTransfer.files[0];
    if (file) validateAndSetFile(file);
  };

  const validateAndSetFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }
    if (file.size > maxSize) {
      alert(`File size must be less than ${maxSize / 1024 / 1024}MB`);
      return;
    }
    setValue(name, file);
  };

  const removeFile = () => {
    setValue(name, null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const getFilePreview = () => {
    if (!currentFile) return null;
    if (typeof currentFile === "string") return currentFile;
    if (currentFile instanceof File) return URL.createObjectURL(currentFile);
    return null;
  };

  const previewUrl = getFilePreview();

  return (
    <div className={`mb-4 ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div
        className={`
          border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
          ${dragOver ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"}
          ${error ? "border-red-500" : ""}
        `}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          {...register(name)}
          accept={accept}
          onChange={handleFileChange}
          ref={fileInputRef}
          className="hidden"
        />
        {previewUrl ? (
          <div className="relative inline-block">
            <img
              src={previewUrl}
              alt="Preview"
              className="h-32 w-32 object-cover rounded-lg shadow-md"
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeFile();
              }}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">
                <span className="font-medium text-blue-600">
                  Click to upload
                </span>{" "}
                or drag and drop
              </p>
              <p className="text-xs text-gray-500">
                PNG, JPG, GIF up to {maxSize / 1024 / 1024}MB
              </p>
            </div>
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
      {currentFile && typeof currentFile !== "string" && (
        <p className="mt-2 text-sm text-gray-600">
          Selected: {currentFile.name} (
          {(currentFile.size / 1024 / 1024).toFixed(2)}MB)
        </p>
      )}
    </div>
  );
};
