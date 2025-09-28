"use client";
import React, { useState } from "react";
import { Category } from "@/services/categoryService";
import { Edit2, Trash2, Eye, EyeOff, Star, Search, Plus } from "lucide-react";

interface CategoriesTableProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
  onToggleVisibility: (category: Category) => void;
  onToggleFeatured: (category: Category) => void;
  onCreateNew: () => void;
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export const Table: React.FC<CategoriesTableProps> = ({
  categories,
  onEdit,
  onDelete,
  onToggleVisibility,
  onToggleFeatured,
  onCreateNew,
  onSearch,
  isLoading,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch(query);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg">
      {/* Table Header with Search and Actions */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Categories</h2>
            <p className="text-sm text-gray-600">
              Manage your product categories
            </p>
          </div>

          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search categories..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Create New Button */}
            <button
              onClick={onCreateNew}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <Plus size={16} className="mr-2" />
              New Category
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name (EN/AR)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Slug
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sort Order
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              // Loading state
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center">
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">
                    Loading categories...
                  </p>
                </td>
              </tr>
            ) : categories.length === 0 ? (
              // Empty state
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center">
                  <div className="text-gray-400">
                    <Search size={48} className="mx-auto mb-4" />
                    <p className="text-lg font-medium text-gray-900">
                      No categories found
                    </p>
                    <p className="text-gray-600">
                      {searchQuery
                        ? "Try adjusting your search terms"
                        : "Get started by creating your first category"}
                    </p>
                    {!searchQuery && (
                      <button
                        onClick={onCreateNew}
                        className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        <Plus size={16} className="mr-2" />
                        Create Category
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              // Categories list
              categories.map((category) => (
                <tr key={category.id} className="hover:bg-gray-50">
                  {/* Image */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {category.image ? (
                      <img
                        src={category.image}
                        alt={category.name.en}
                        className="h-12 w-12 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="h-12 w-12 rounded-lg bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400 text-xs">No image</span>
                      </div>
                    )}
                  </td>

                  {/* Name */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {category.name.en}
                    </div>
                    <div className="text-sm text-gray-500 text-right" dir="rtl">
                      {category.name.ar}
                    </div>
                  </td>

                  {/* Slug */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {category.slug.en}
                    </div>
                    <div className="text-sm text-gray-500">
                      {category.slug.ar}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onToggleVisibility(category)}
                        className={`p-1 rounded-full ${
                          category.isVisible
                            ? "text-green-600 hover:text-green-800"
                            : "text-gray-400 hover:text-gray-600"
                        }`}
                        title={category.isVisible ? "Visible" : "Hidden"}
                      >
                        {category.isVisible ? (
                          <Eye size={16} />
                        ) : (
                          <EyeOff size={16} />
                        )}
                      </button>

                      <button
                        onClick={() => onToggleFeatured(category)}
                        className={`p-1 rounded-full ${
                          category.isFeatured
                            ? "text-yellow-600 hover:text-yellow-800"
                            : "text-gray-400 hover:text-gray-600"
                        }`}
                        title={
                          category.isFeatured ? "Featured" : "Not Featured"
                        }
                      >
                        <Star
                          size={16}
                          fill={category.isFeatured ? "currentColor" : "none"}
                        />
                      </button>

                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          category.isVisible
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {category.isVisible ? "Visible" : "Hidden"}
                      </span>
                    </div>
                  </td>

                  {/* Sort Order */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {category.sortOrder}
                  </td>

                  {/* Created Date */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(category.createdAt)}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => onEdit(category)}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded"
                        title="Edit category"
                      >
                        <Edit2 size={16} />
                      </button>

                      <button
                        onClick={() => onDelete(category)}
                        className="text-red-600 hover:text-red-900 p-1 rounded"
                        title="Delete category"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      {categories.length > 0 && (
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Showing <span className="font-medium">{categories.length}</span>{" "}
              categories
            </p>
            <div className="text-sm text-gray-600">
              {/* Pagination can be added here later */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
