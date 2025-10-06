import { SuccessMessage } from "@/components/alerts/SuccessMessage";
import { CategoryService } from "@/features/admin/categories/services/CategoryService";
import { Table } from "@/features/admin/categories/tables/Table";

interface CategoriesPageProps {
  searchParams: Promise<{
    search?: string;
    page?: string;
    limit?: string;
    isVisible?: string;
    isFeatured?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    success?: string; // Add success parameter
    error?: string; // Add error parameter if needed
  }>;
}

export default async function CategoriesPage({
  searchParams,
}: CategoriesPageProps) {
  // AWAIT the searchParams Promise first
  const params = await searchParams;

  // Parse search params with defaults using the awaited params
  const page = parseInt(params.page || "1");
  const limit = parseInt(params.limit || "10");
  const search = params.search || "";
  const isVisible = params.isVisible ? params.isVisible === "true" : undefined;
  const isFeatured = params.isFeatured
    ? params.isFeatured === "true"
    : undefined;
  const sortBy = params.sortBy || "createdAt";
  const sortOrder = params.sortOrder || "desc";
  const successMessage = params.success; // Get success message
  const errorMessage = params.error; // Get error message

  try {
    // Fetch categories from the server
    const response = await new CategoryService().getCategories({
      page,
      limit,
      search,
      isVisible,
      isFeatured,
      sortBy,
      sortOrder,
    });

    if (!response.success) {
      // throw new Error(response.message || "Failed to load categories");
    }

    return (
      <div className="space-y-6">
        {/* Success Message */}
        {successMessage && (
          <SuccessMessage
            message={successMessage}
            duration={5000} // Auto dismiss after 5 seconds
          />
        )}
        <Table
          initialCategories={response.data}
          initialPagination={response.pagination}
          initialFilters={{
            search,
            isVisible,
            isFeatured,
            sortBy,
            sortOrder,
          }}
        />
      </div>
    );
  } catch (error) {
    console.error("Error loading categories:", error);

    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-red-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">
              Failed to load categories
            </h3>
            <div className="mt-2 text-sm text-red-700">
              <p>
                {(error as Error).message || "Please try refreshing the page."}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
