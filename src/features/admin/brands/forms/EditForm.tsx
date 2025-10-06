"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useParams } from "next/navigation";
import { Brand } from "@/services/brandService";
import { Input } from "@/components/inputs/Input";
import { Textarea } from "@/components/inputs/Textarea";
import { Checkbox } from "@/components/inputs/Checkbox";
import { Save, X, Loader } from "lucide-react";
import { BrandService } from "../services/BrandService";
import { FileInput } from "@/components/inputs/FileInput";
import { ElegantPageLoader } from "@/components/loaders/ElegantPageLoader";
import { route_admin_brands } from "@/routes/admin";

type EditFormData = {
  "name.en": string;
  "name.ar": string;
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
  const brandId = params.id as string;

  const [isLoading, setIsLoading] = React.useState(false);
  const [brand, setBrand] = React.useState<Brand | null>(null);
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
    loadBrand();
  }, [brandId]);

  const loadBrand = async () => {
    try {
      const response = await new BrandService().getBrandById(brandId);
      if (response.data.success) {
        setBrand(response.data.data);
        let data = response.data.data;
        reset({
          "name.en": data.name.en,
          "name.ar": data.name.ar,
          "description.en": data.description.en,
          "description.ar": data.description.ar,
          image: data!.image || null,
          isVisible: data!.isVisible,
          isFeatured: data!.isFeatured,
          sortOrder: data!.sortOrder,
        });
      }
    } catch (err: any) {
      // setError("Failed to load brand");
    }
  };

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      setError("");

      const formData = new FormData();
      formData.append("name.en", data["name"]["en"]);
      formData.append("name.ar", data["name"]["ar"]);
      formData.append("description.en", data["description"]["en"]);
      formData.append("description.ar", data["description"]["ar"]);
      formData.append("isVisible", data.isVisible.toString());
      formData.append("isFeatured", data.isFeatured.toString());
      formData.append("sortOrder", data.sortOrder.toString());

      if (data.image instanceof File) {
        formData.append("image", data.image);
      } else if (!data.image && brand?.image) {
        formData.append("removeImage", "true");
      }

      const response = await new BrandService().updateBrand(brandId, formData);

      if (response.data.success) {
        // Use encodeURIComponent to handle special characters in messages
        const successMessage = encodeURIComponent("Brand updated successfully");
        router.push(`/admin/brands?success=${successMessage}`);
        router.refresh();
      } else {
        setError(response.message || "Failed to update brand");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || err.message || "Something went wrong",
      );
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading) {
    return <ElegantPageLoader text="Creating ..." subtitle="Redirecting ..." />;
  }

  if (!brand) return <div>Loading...</div>;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 x-max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit Brand</h1>
        <button
          onClick={() => router.push(route_admin_brands)}
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
            label="English Name"
            name="name.en"
            register={register}
            errors={errors}
          />
          <Input
            label="Arabic Name"
            name="name.ar"
            register={register}
            errors={errors}
          />
          <Textarea
            label="English Description"
            name="description.en"
            register={register}
            errors={errors}
            placeholder=""
            rows={3}
            isNestable
          />
          <Textarea
            label="Arabic Description"
            name="description.ar"
            register={register}
            errors={errors}
            placeholder=""
            rows={3}
            isNestable
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6  items-center">
          {/* Visibility Toggle */}
          <Checkbox
            label="Visible to customers"
            name="isVisible"
            register={register}
            errors={errors}
          />

          {/* Featured Toggle */}
          <Checkbox
            label="Featured brand"
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

        <div className="flex justify-end space-x-3 pt-6 border-t">
          <button
            type="button"
            onClick={() => router.push(route_admin_brands)}
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
            {isLoading ? "Updating..." : "Update Brand"}
          </button>
        </div>
      </form>
    </div>
  );
};
