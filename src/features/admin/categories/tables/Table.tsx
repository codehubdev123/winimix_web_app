"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Category } from "@/services/categoryService";
import {
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Star,
  Search,
  Filter,
  Plus,
} from "lucide-react";
import { AlertDialog } from "@/components/alerts/AlertDialog";
import { CategoryService } from "../services/CategoryService";
import ImageModal from "@/components/models/ImageModal";
import EnhancedImageModal from "@/components/models/EnhancedImageModal";

interface TableProps {
  initialCategories: Category[];
  initialPagination?: any;
  initialFilters?: {
    search?: string;
    isVisible?: boolean;
    isFeatured?: boolean;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  };
}

export const Table: React.FC<TableProps> = ({
  initialCategories,
  initialPagination,
  initialFilters = {},
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedImage, setSelectedImage] = useState(null);

  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [pagination, setPagination] = useState(initialPagination);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    category: Category | null;
  }>({
    isOpen: false,
    category: null,
  });

  const [filters, setFilters] = useState({
    search: initialFilters.search || "",
    isVisible: initialFilters.isVisible,
    isFeatured: initialFilters.isFeatured,
    sortBy: initialFilters.sortBy || "createdAt",
    sortOrder: initialFilters.sortOrder || "desc",
    showFilters: false,
  });

  // Update URL with new search parameters
  const updateURL = (newFilters: any) => {
    const params = new URLSearchParams(searchParams.toString());

    // Update or remove params based on new filters
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value !== undefined && value !== "" && value !== null) {
        params.set(key, value.toString());
      } else {
        params.delete(key);
      }
    });

    // Always include page for pagination
    if (!params.has("page")) {
      params.set("page", "1");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  // Handle search and filters
  const handleSearch = async (newFilters: any) => {
    try {
      setIsLoading(true);
      setError("");

      // const response = await new CategoryService().getCategories({
      //         page: 1, // Reset to first page when searching
      //   limit: pagination?.limit || 10,
      //   ...newFilters,
      // });

      const response = await new CategoryService().getCategories({
        page: 1,
        limit: pagination?.limit || 10,
        ...newFilters,
      });

      if (response.success) {
        setCategories(response.data);
        setPagination(response.pagination);
        updateURL(newFilters);
      } else {
        setError(response.message || "Failed to load categories");
      }
    } catch (err: any) {
      setError(err.message || "Failed to load categories");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle individual filter changes
  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    handleSearch(newFilters);
  };

  // Toggle category visibility
  const handleToggleVisibility = async (category: any) => {
    try {
      const response = await new CategoryService().toggleVisibility(
        category.id,
        category,
      );
      if (response.data.success) {
        // Update local state immediately for better UX
        setCategories((prev) =>
          prev.map((cat) =>
            cat.id === category.id
              ? { ...cat, isVisible: !category.isVisible }
              : cat,
          ),
        );
      } else {
        setError(response.message || "Failed to update visibility");
      }
    } catch (err: any) {
      setError(err.message || "Failed to update visibility");
    }
  };

  // Toggle featured status
  const handleToggleFeatured = async (category: Category) => {
    try {
      const response = await new CategoryService().toggleFeatured(
        category.id,
        category,
      );

      if (response.data.success) {
        // Update local state immediately for better UX
        setCategories((prev) =>
          prev.map((cat) =>
            cat.id === category.id
              ? { ...cat, isFeatured: !category.isFeatured }
              : cat,
          ),
        );
      } else {
        setError(response.message || "Failed to update featured status");
      }
    } catch (err: any) {
      setError(err.message || "Failed to update featured status");
    }
  };

  // Handle delete category
  const handleDelete = (category: Category) => {
    setDeleteDialog({ isOpen: true, category });
  };

  // Confirm delete
  const confirmDelete = async () => {
    if (!deleteDialog.category) return;

    try {
      const response = await new CategoryService().delete(
        deleteDialog.category.id,
      );

      if (response.success) {
        setDeleteDialog({ isOpen: false, category: null });
        // Reload the current page to reflect changes
        router.refresh();
      } else {
        setError(response.message || "Failed to delete category");
      }
    } catch (err: any) {
      setError(err.message || "Failed to delete category");
    }
  };

  // Create new category
  const handleCreateNew = () => {
    router.push("/admin/categories/create");
  };

  // Edit category
  const handleEdit = (category: Category) => {
    router.push(`/admin/categories/${category.id}/edit`);
  };

  // Clear all filters
  const clearFilters = () => {
    const newFilters = {
      search: "",
      isVisible: undefined,
      isFeatured: undefined,
      sortBy: "createdAt",
      sortOrder: "desc",
    };
    setFilters(newFilters);
    handleSearch(newFilters);
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get status badge
  const getStatusBadge = (category: Category) => {
    if (!category.isVisible) {
      return (
        <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
          Hidden
        </span>
      );
    }
    if (category.isFeatured) {
      return (
        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
          Featured
        </span>
      );
    }
    return (
      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
        Visible
      </span>
    );
  };

  // In your table row, update the image cell:
  const handleImageClick = (imageUrl: string, alt: string) => {
    setSelectedImage({ url: imageUrl, alt });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg">
      {/* Error Display */}
      {error && (
        <div className="m-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
          <button
            onClick={() => setError("")}
            className="float-right font-bold"
          >
            ×
          </button>
        </div>
      )}
      {/* Header with Search and Filters */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col space-y-4">
          {/* Title and Create Button */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Categories</h2>
              <p className="text-sm text-gray-600">
                {pagination
                  ? `Showing ${categories?.length} of ${pagination.total} categories`
                  : "Manage your categories"}
              </p>
            </div>

            <button
              onClick={handleCreateNew}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4 sm:mt-0"
            >
              <Plus size={16} className="mr-2" />
              New Category
            </button>
          </div>

          {/* Search and Filter Controls */}
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search by name..."
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filter Toggle Button */}
            <button
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  showFilters: !prev.showFilters,
                }))
              }
              className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <Filter size={16} className="mr-2" />
              Filters
              {(filters.isVisible !== undefined ||
                filters.isFeatured !== undefined) && (
                <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  Active
                </span>
              )}
            </button>
          </div>

          {/* Expanded Filters */}
          {filters.showFilters && (
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Visibility Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Visibility
                  </label>
                  <select
                    value={
                      filters.isVisible === undefined
                        ? ""
                        : filters.isVisible.toString()
                    }
                    onChange={(e) =>
                      handleFilterChange(
                        "isVisible",
                        e.target.value === ""
                          ? undefined
                          : e.target.value === "true",
                      )
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All</option>
                    <option value="true">Visible</option>
                    <option value="false">Hidden</option>
                  </select>
                </div>

                {/* Featured Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Featured
                  </label>
                  <select
                    value={
                      filters.isFeatured === undefined
                        ? ""
                        : filters.isFeatured.toString()
                    }
                    onChange={(e) =>
                      handleFilterChange(
                        "isFeatured",
                        e.target.value === ""
                          ? undefined
                          : e.target.value === "true",
                      )
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All</option>
                    <option value="true">Featured</option>
                    <option value="false">Not Featured</option>
                  </select>
                </div>

                {/* Sort By */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sort By
                  </label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) =>
                      handleFilterChange("sortBy", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="createdAt">Created Date</option>
                    <option value="name.en">Name</option>
                    <option value="sortOrder">Sort Order</option>
                  </select>
                </div>

                {/* Sort Order */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Order
                  </label>
                  <select
                    value={filters.sortOrder}
                    onChange={(e) =>
                      handleFilterChange(
                        "sortOrder",
                        e.target.value as "asc" | "desc",
                      )
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="desc">Newest First</option>
                    <option value="asc">Oldest First</option>
                  </select>
                </div>
              </div>

              {/* Clear Filters */}
              {(filters.isVisible !== undefined ||
                filters.isFeatured !== undefined) && (
                <div className="mt-3">
                  <button
                    onClick={clearFilters}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
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
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center">
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">
                    Loading categories...
                  </p>
                </td>
              </tr>
            ) : categories?.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center">
                  <div className="text-gray-400">
                    <Search size={48} className="mx-auto mb-4" />
                    <p className="text-lg font-medium text-gray-900">
                      No categories found
                    </p>
                    <p className="text-gray-600">
                      {filters.search ||
                      filters.isVisible !== undefined ||
                      filters.isFeatured !== undefined
                        ? "Try adjusting your search or filters"
                        : "Get started by creating your first category"}
                    </p>
                    {!filters.search &&
                      filters.isVisible === undefined &&
                      filters.isFeatured === undefined && (
                        <button
                          onClick={handleCreateNew}
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
              categories?.map((category) => (
                <tr key={category.id} className="hover:bg-gray-50">
                  {/* Image */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {category.image ? (
                      <div
                        className="h-12 w-12 rounded-lg overflow-hidden border cursor-zoom-in hover:opacity-80 transition-opacity"
                        onClick={() =>
                          handleImageClick(category.image, category.name.en)
                        }
                      >
                        <img
                          src={category.image}
                          alt={category.name.en}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="h-12 w-12 rounded-lg bg-gray-200 border flex items-center justify-center">
                        <span className="text-gray-400 text-xs">No image</span>
                      </div>
                    )}
                  </td>

                  {/* Name */}
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {category.name.en}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {/* Slug: {category.slug.en} */}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(category)}
                      <div className="flex space-x-1">
                        <button
                          onClick={() => handleToggleVisibility(category)}
                          className={`p-1 rounded ${
                            category.isVisible
                              ? "text-green-600 hover:text-green-800"
                              : "text-gray-400 hover:text-gray-600"
                          }`}
                          title={category.isVisible ? "Hide" : "Show"}
                        >
                          {category.isVisible ? (
                            <Eye size={16} />
                          ) : (
                            <EyeOff size={16} />
                          )}
                        </button>

                        <button
                          onClick={() => handleToggleFeatured(category)}
                          className={`p-1 rounded ${
                            category.isFeatured
                              ? "text-yellow-600 hover:text-yellow-800"
                              : "text-gray-400 hover:text-gray-600"
                          }`}
                          title={
                            category.isFeatured
                              ? "Remove featured"
                              : "Make featured"
                          }
                        >
                          <Star
                            size={16}
                            fill={category.isFeatured ? "currentColor" : "none"}
                          />
                        </button>
                      </div>
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
                        onClick={() => handleEdit(category)}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded transition-colors"
                        title="Edit category"
                      >
                        <Edit2 size={16} />
                      </button>

                      <button
                        onClick={() => handleDelete(category)}
                        className="text-red-600 hover:text-red-900 p-1 rounded transition-colors"
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
      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
              {Math.min(pagination.page * pagination.limit, pagination.total)}{" "}
              of {pagination.total} entries
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() =>
                  handleSearch({ ...filters, page: pagination.page - 1 })
                }
                disabled={!pagination.hasPrev}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>

              <span className="px-3 py-1 text-sm text-gray-600">
                Page {pagination.page} of {pagination.totalPages}
              </span>

              <button
                onClick={() =>
                  handleSearch({ ...filters, page: pagination.page + 1 })
                }
                disabled={!pagination.hasNext}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Image Modal */}
      <ImageModal
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        imageUrl={selectedImage?.url || ""}
        alt={selectedImage?.alt}
      />
      {/* Or use EnhancedImageModal for more features */}
      {/* <EnhancedImageModal */}
      {/*   isOpen={!!selectedImage} */}
      {/*   onClose={() => setSelectedImage(null)} */}
      {/*   imageUrl={selectedImage?.url || ""} */}
      {/*   alt={selectedImage?.alt} */}
      {/* /> */}
      {/* Delete Confirmation Dialog */}
      <AlertDialog
        isOpen={deleteDialog.isOpen}
        title="Delete Category"
        message={`Are you sure you want to delete "${deleteDialog.category?.name.en}"? This action cannot be undone.`}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteDialog({ isOpen: false, category: null })}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
      />
    </div>
  );
};
