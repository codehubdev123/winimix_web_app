"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter, useParams } from "next/navigation";
import { categoryService, Category } from "@/services/categoryService";
import { Input } from "@/components/inputs/Input";
import { Textarea } from "@/components/inputs/Textarea";
import { FileInput } from "@/components/inputs/FileInput";
import { Checkbox } from "@/components/inputs/Checkbox";
import { Save, X, Loader } from "lucide-react";

const editCategorySchema = yup.object({
  "name.en": yup.string().required("English name is required").min(2),
  "name.ar": yup.string().required("Arabic name is required").min(2),
  "slug.en": yup
    .string()
    .required("English slug is required")
    .matches(/^[a-z0-9-]+$/),
  "slug.ar": yup
    .string()
    .required("Arabic slug is required")
    .matches(/^[a-z0-9-]+$/),
  "description.en": yup.string().optional().max(500),
  "description.ar": yup.string().optional().max(500),
  image: yup.mixed().nullable(),
  isVisible: yup.boolean().default(true),
  isFeatured: yup.boolean().default(false),
  sortOrder: yup.number().min(0).default(0),
});

type EditFormData = {
  "name.en": string;
  "name.ar": string;
  "slug.en": string;
  "slug.ar": string;
  "description.en": string;
  "description.ar": string;
  image: File | string | null;
  isVisible: boolean;
  isFeatured: boolean;
  sortOrder: number;
};

export const EditForm: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const categoryId = params.id as string;

  const [isLoading, setIsLoading] = React.useState(false);
  const [category, setCategory] = React.useState<Category | null>(null);
  const [error, setError] = React.useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<EditFormData>();

  useEffect(() => {
    loadCategory();
  }, [categoryId]);

  const loadCategory = async () => {
    try {
      const response = await categoryService.getCategoryById(categoryId);
      if (response.success) {
        setCategory(response.data!);
        reset({
          "name.en": response.data!.name.en,
          "name.ar": response.data!.name.ar,
          "slug.en": response.data!.slug.en,
          "slug.ar": response.data!.slug.ar,
          "description.en": response.data!.description?.en || "",
          "description.ar": response.data!.description?.ar || "",
          image: response.data!.image || null,
          isVisible: response.data!.isVisible,
          isFeatured: response.data!.isFeatured,
          sortOrder: response.data!.sortOrder,
        });
      }
    } catch (err: any) {
      setError("Failed to load category");
    }
  };

  const onSubmit = async (data: EditFormData) => {
    try {
      setIsLoading(true);
      setError("");

      const formData = new FormData();
      formData.append("name.en", data["name.en"]);
      formData.append("name.ar", data["name.ar"]);
      formData.append("slug.en", data["slug.en"]);
      formData.append("slug.ar", data["slug.ar"]);
      formData.append("description.en", data["description.en"]);
      formData.append("description.ar", data["description.ar"]);
      formData.append("isVisible", data.isVisible.toString());
      formData.append("isFeatured", data.isFeatured.toString());
      formData.append("sortOrder", data.sortOrder.toString());

      if (data.image instanceof File) {
        formData.append("image", data.image);
      } else if (!data.image && category?.image) {
        formData.append("removeImage", "true");
      }

      const response = await categoryService.updateCategory(
        categoryId,
        formData,
      );

      if (response.success) {
        router.push("/admin/categories?success=Category updated successfully");
      } else {
        setError(response.message || "Failed to update category");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || err.message || "Something went wrong",
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!category) return <div>Loading...</div>;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit Category</h1>
        <button
          onClick={() => router.push("/admin/categories")}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <X size={20} />
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="English Name *"
            name="name.en"
            register={register}
            error={errors["name.en"]}
          />
          <Input
            label="Arabic Name *"
            name="name.ar"
            register={register}
            error={errors["name.ar"]}
            dir="rtl"
          />
          <Input
            label="English Slug *"
            name="slug.en"
            register={register}
            error={errors["slug.en"]}
          />
          <Input
            label="Arabic Slug *"
            name="slug.ar"
            register={register}
            error={errors["slug.ar"]}
            dir="rtl"
          />
          <Textarea
            label="English Description"
            name="description.en"
            register={register}
            error={errors["description.en"]}
          />
          <Textarea
            label="Arabic Description"
            name="description.ar"
            register={register}
            error={errors["description.ar"]}
            dir="rtl"
          />
        </div>

        <FileInput
          label="Category Image"
          name="image"
          register={register}
          setValue={setValue}
          watch={watch}
          error={errors.image}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Checkbox
            label="Visible to customers"
            name="isVisible"
            register={register}
          />
          <Checkbox
            label="Featured category"
            name="isFeatured"
            register={register}
          />
          <Input
            label="Sort Order"
            name="sortOrder"
            type="number"
            register={register}
            error={errors.sortOrder}
          />
        </div>

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
            className="flex items-center px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? (
              <Loader size={16} className="animate-spin mr-2" />
            ) : (
              <Save size={16} className="mr-2" />
            )}
            {isLoading ? "Updating..." : "Update Category"}
          </button>
        </div>
      </form>
    </div>
  );
};
