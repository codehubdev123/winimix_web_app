"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { categoryService } from "@/services/categoryService";
import { Input } from "@/components/inputs/Input";
import { Textarea } from "@/components/inputs/Textarea";
import { FileInput } from "@/components/inputs/FileInput";
import { Checkbox } from "@/components/inputs/Checkbox";
import { Save, X, Loader } from "lucide-react";
import { CreateCategorySchema } from "../validations/CreateCategotySchema";

// Simplified schema for better error messages
const createCategorySchema = yup.object({
  "name.en": yup
    .string()
    .required("English name is required")
    .min(2, "Must be at least 2 characters"),
  "name.ar": yup
    .string()
    .required("Arabic name is required")
    .min(2, "Must be at least 2 characters"),
  "slug.en": yup
    .string()
    .required("English slug is required")
    .matches(
      /^[a-z0-9-]+$/,
      "Only lowercase letters, numbers, and hyphens allowed",
    ),
  "slug.ar": yup
    .string()
    .required("Arabic slug is required")
    .matches(
      /^[a-z0-9-]+$/,
      "Only lowercase letters, numbers, and hyphens allowed",
    ),
  "description.en": yup
    .string()
    .optional()
    .max(500, "Must be less than 500 characters"),
  "description.ar": yup
    .string()
    .optional()
    .max(500, "Must be less than 500 characters"),
  image: yup.mixed().nullable(),
  isVisible: yup.boolean().default(true),
  isFeatured: yup.boolean().default(false),
  sortOrder: yup.number().min(0, "Cannot be negative").default(0),
});

interface CreateFormData {
  "name.en": string;
  "name.ar": string;
  "slug.en": string;
  "slug.ar": string;
  "description.en": string;
  "description.ar": string;
  image: File | null;
  isVisible: boolean;
  isFeatured: boolean;
  sortOrder: number;
}

export const CreateForm: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    trigger,
  } = useForm<any>({
    mode: "onSubmit",
    resolver: yupResolver(CreateCategorySchema as any),
    defaultValues: {
      name: {
        en: "",
        ar: "",
      },
      description: {
        en: "",
        ar: "",
      },
      image: null,
      isVisible: true,
      isFeatured: false,
      sortOrder: 0,
    },
  });

  const generateSlug = (text: string, field: "en" | "ar") => {
    if (!text) return;

    const slug = text
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();

    setValue(`slug.${field}`, slug);
    trigger(`slug.${field}`);
  };

  const onSubmit = async (data: CreateFormData) => {
    alert("submitted");
    try {
      setIsLoading(true);
      setError("");

      console.log("📤 Form data:", data);

      const formData = new FormData();
      formData.append("name.en", data["name.en"]);
      formData.append("name.ar", data["name.ar"]);
      formData.append("slug.en", data["slug.en"]);
      formData.append("slug.ar", data["slug.ar"]);
      formData.append("description.en", data["description.en"] || "");
      formData.append("description.ar", data["description.ar"] || "");
      formData.append("isVisible", data.isVisible.toString());
      formData.append("isFeatured", data.isFeatured.toString());
      formData.append("sortOrder", data.sortOrder.toString());

      if (data.image instanceof File) {
        formData.append("image", data.image);
      }

      const response = await categoryService.createCategory(formData);

      if (response.success) {
        router.push("/admin/categories?success=Category created successfully");
        router.refresh();
      } else {
        setError(response.message || "Failed to create category");
      }
    } catch (err: any) {
      console.error("❌ Form submission error:", err);

      if (err.response?.data) {
        const apiError = err.response.data;
        if (apiError.errors && Array.isArray(apiError.errors)) {
          setError(apiError.errors.join(", "));
        } else {
          setError(apiError.message || "API error occurred");
        }
      } else if (err.message) {
        setError(err.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onError = (errors: any) => {
    console.log("❌ Form validation errors:", errors);
    console.log("#input", errors["name"]["en"]);
    // setError("Please fix the validation errors above.");
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Create New Category
        </h1>
        <button
          onClick={() => router.push("/admin/categories")}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          type="button"
        >
          <X size={20} />
        </button>
      </div>

      {/* Global error message */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* English Name - Now shows error below input */}
          <Input
            label="English Name *"
            name="name.en"
            type="text"
            register={register}
            errors={errors} // Pass the entire errors object
            required
            placeholder="Electronics"
            onBlur={(e) => generateSlug(e.target.value, "en")}
            isNestable
          />

          {/* Arabic Name */}
          <Input
            label="Arabic Name *"
            name="name.ar"
            type="text"
            register={register}
            errors={errors}
            required
            placeholder="إلكترونيات"
            dir="rtl"
            onBlur={(e) => generateSlug(e.target.value, "ar")}
            isNestable
          />

          {/* English Description */}
          <Textarea
            label="English Description"
            name="description.en"
            register={register}
            errors={errors}
            placeholder="Latest electronic devices and gadgets"
            rows={3}
          />

          {/* Arabic Description */}
          <Textarea
            label="Arabic Description"
            name="description.ar"
            register={register}
            errors={errors}
            placeholder="أحدث الأجهزة الإلكترونية والأدوات"
            dir="rtl"
            rows={3}
          />
        </div>

        {/* File Input */}
        <FileInput
          label="Image"
          name="image"
          register={register}
          setValue={setValue}
          watch={watch}
          errors={errors}
          accept="image/*"
          maxSize={5 * 1024 * 1024}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Visibility Toggle */}
          <Checkbox
            label="Visible to customers"
            name="isVisible"
            register={register}
            errors={errors}
          />

          {/* Featured Toggle */}
          <Checkbox
            label="Featured category"
            name="isFeatured"
            register={register}
            errors={errors}
          />

          {/* Sort Order */}
          <Input
            label="Sort Order"
            name="sortOrder"
            type="number"
            register={register}
            errors={errors}
            placeholder="0"
          />
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-3 pt-6 border-t">
          <button
            type="button"
            onClick={() => router.push("/admin/categories")}
            disabled={isLoading}
            className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center px-6 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? (
              <Loader size={16} className="animate-spin mr-2" />
            ) : (
              <Save size={16} className="mr-2" />
            )}
            {isLoading ? "Creating..." : "Create Category"}
          </button>
        </div>
      </form>
    </div>
  );
};
