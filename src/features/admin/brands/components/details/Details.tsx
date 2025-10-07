"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Edit,
  Eye,
  EyeOff,
  Star,
  Image as ImageIcon,
  Globe,
  FileText,
  Hash,
  ChartColumnDecreasing,
} from "lucide-react";
import { ElegantPageLoader } from "@/components/loaders/ElegantPageLoader";
import { DetailsItem } from "@/components/details/DetailsItem";

interface BrandDetailsProps {
  brand: any;
}

export const Details: React.FC<DetailsProps> = ({ brand }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleEdit = () => {
    setIsLoading(true);
    router.push(`/admin/brands/${brand.id}/edit`);
  };

  const handleBack = () => {
    setIsLoading(true);
    router.push("/admin/brands");
  };

  const formatDate = (dateString: string | Date) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return <ElegantPageLoader text="Redirecting..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 to-purple-50/50 py-8">
      <div className="x-max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={handleBack}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors group cursor-pointer"
            >
              <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Brands
            </button>

            <button
              onClick={handleEdit}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Brand
            </button>
          </div>

          {/* Top Section - Image and Basic Info */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-start space-x-6">
              {/* Brand Image */}
              <div className="flex-shrink-0">
                <div className="w-24 h-24 rounded-xl overflow-hidden border-2 border-gray-200 bg-gray-50 flex items-center justify-center">
                  {brand.image ? (
                    <img
                      src={brand.image}
                      alt={brand.name?.en || "Brand image"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImageIcon className="h-8 w-8 text-gray-400" />
                  )}
                </div>
              </div>

              {/* Title and Status */}
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                  {brand.name?.en}
                </h1>
                {/* <p className="text-lg text-gray-600 mb-4" dir="rtl"> */}
                {/*   {brand.name?.ar} */}
                {/* </p> */}

                <div className="flex flex-wrap gap-3">
                  {/* Visibility Badge */}
                  <div
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      brand.isVisible
                        ? "bg-green-100 text-green-800 border border-green-200"
                        : "bg-red-100 text-red-800 border border-red-200"
                    }`}
                  >
                    {brand.isVisible ? (
                      <Eye className="h-3 w-3 mr-1" />
                    ) : (
                      <EyeOff className="h-3 w-3 mr-1" />
                    )}
                    {brand.isVisible ? "Visible" : "Hidden"}
                  </div>

                  {/* Featured Badge */}
                  <div
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      brand.isFeatured
                        ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                        : "bg-gray-100 text-gray-800 border border-gray-200"
                    }`}
                  >
                    <Star
                      className={`h-3 w-3 mr-1 ${brand.isFeatured ? "fill-current" : ""}`}
                    />
                    {brand.isFeatured ? "Featured" : "Regular"}
                  </div>

                  {/* Sort Order */}
                  <div className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 border border-blue-200 rounded-full text-sm font-medium">
                    <Hash className="h-3 w-3 mr-1" />
                    Order: {brand.sortOrder}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - 2 Column Details */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          {/* 2 Column Content */}
          <div className="">
            <div className="flow-root">
              <dl className=" divide-y divide-gray-200 rounded border border-gray-200 text-md *:even:bg-gray-50">
                <div className="grid grid-cols-1 gap-1 p-5 sm:grid-cols-3 sm:gap-4 bg-gradient-to-r from-blue-600 to-purple-700 items-center">
                  <dt className="font-bold text-gray-50 flex gap-1 items-center">
                    <Globe className="w-4 h-4" />
                    Key
                  </dt>

                  <dd className="text-gray-50 sm:col-span-2 font-bold flex items-center gap-1">
                    <ChartColumnDecreasing className="w-4 h-4" />
                    Value
                  </dd>
                </div>

                <DetailsItem name={"Name"}>{brand.name?.en}</DetailsItem>

                <DetailsItem name={"Description"}>
                  {brand.description?.en}
                </DetailsItem>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
