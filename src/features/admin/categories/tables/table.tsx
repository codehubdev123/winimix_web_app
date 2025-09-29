"use client";
import React, { useState } from "react";
import { Category } from "@/services/CategoryService";
import {
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Star,
  Search,
  Filter,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

interface TableProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
  onToggleVisibility: (id: string, isVisible: boolean) => void;
  onToggleFeatured: (id: string, isFeatured: boolean) => void;
  onSearch: (params: {
    search: string;
    isVisible?: boolean;
    isFeatured?: boolean;
    sortBy: string;
    sortOrder: "asc" | "desc";
  }) => void;
  onCreateNew: () => void;
  isLoading: boolean;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export const Table: React.FC<TableProps> = ({
  categories,
  onEdit,
  onDelete,
  onToggleVisibility,
  onToggleFeatured,
  onSearch,
  onCreateNew,
  isLoading,
  pagination,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    isVisible: undefined as boolean | undefined,
    isFeatured: undefined as boolean | undefined,
    sortBy: "createdAt",
    sortOrder: "desc" as "asc" | "desc",
  });
  const [showFilters, setShowFilters] = useState(false);

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch({
      search: query,
      ...filters,
    });
  };

  // Handle filter changes
  const handleFilterChange = (key: string, value: any) => {
    const newFilters = {
      ...filters,
      [key]: value,
    };
    setFilters(newFilters);
    onSearch({
      search: searchQuery,
      ...newFilters,
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      isVisible: undefined,
      isFeatured: undefined,
      sortBy: "createdAt",
      sortOrder: "desc",
    });
    onSearch({
      search: searchQuery,
      sortBy: "createdAt",
      sortOrder: "desc",
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

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

  return (
    <div className="bg-white rounded-lg shadow-lg">
      {/* Header with Search and Filters */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col space-y-4">
          {/* Title and Create Button */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Categories</h2>
              <p className="text-sm text-gray-600">
                {pagination
                  ? `Showing ${categories.length} of ${pagination.total} categories`
                  : "Manage your categories"}
              </p>
            </div>

            <button
              onClick={onCreateNew}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4 sm:mt-0"
            >
              <span className="mr-2">+</span>
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
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
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
          {showFilters && (
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

      {/* Table */}
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
            ) : categories.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center">
                  <div className="text-gray-400">
                    <Search size={48} className="mx-auto mb-4" />
                    <p className="text-lg font-medium text-gray-900">
                      No categories found
                    </p>
                    <p className="text-gray-600">
                      {searchQuery ||
                      filters.isVisible !== undefined ||
                      filters.isFeatured !== undefined
                        ? "Try adjusting your search or filters"
                        : "Get started by creating your first category"}
                    </p>
                    {!searchQuery &&
                      filters.isVisible === undefined &&
                      filters.isFeatured === undefined && (
                        <button
                          onClick={onCreateNew}
                          className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                          + Create Category
                        </button>
                      )}
                  </div>
                </td>
              </tr>
            ) : (
              categories.map((category) => (
                <tr key={category.id} className="hover:bg-gray-50">
                  {/* Image */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {category.image ? (
                      <img
                        src={category.image}
                        alt={category.name.en}
                        className="h-12 w-12 rounded-lg object-cover border"
                      />
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
                    <div className="text-sm text-gray-500 text-right" dir="rtl">
                      {category.name.ar}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      Slug: {category.slug.en}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(category)}
                      <div className="flex space-x-1">
                        <button
                          onClick={() =>
                            onToggleVisibility(category.id, !category.isVisible)
                          }
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
                          onClick={() =>
                            onToggleFeatured(category.id, !category.isFeatured)
                          }
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
                        onClick={() => onEdit(category)}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded transition-colors"
                        title="Edit category"
                      >
                        <Edit2 size={16} />
                      </button>

                      <button
                        onClick={() => onDelete(category)}
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
                  onSearch({
                    search: searchQuery,
                    ...filters,
                    page: pagination.page - 1,
                  })
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
                  onSearch({
                    search: searchQuery,
                    ...filters,
                    page: pagination.page + 1,
                  })
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
    </div>
  );
};
