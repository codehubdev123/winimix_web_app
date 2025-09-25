import apiClient from "@/lib/api-client";
import { ApiResponse } from "@/lib/api-client";

// Type definitions for Category
export interface Category {
  id: string;
  name: {
    en: string;
    ar: string;
  };
  slug: {
    en: string;
    ar: string;
  };
  description?: {
    en?: string;
    ar?: string;
  };
  isVisible: boolean;
  isFeatured: boolean;
  image?: string;
  parentId?: string | null;
  sortOrder: number;
  metaTitle?: {
    en?: string;
    ar?: string;
  };
  metaDescription?: {
    en?: string;
    ar?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryListParams {
  language?: string;
  featured?: boolean;
  visible?: boolean;
  page?: number;
  limit?: number;
  search?: string;
}

class CategoryService {
  // Explanation: Get all categories with filtering and pagination
  async getCategories(
    params: CategoryListParams = {},
  ): Promise<ApiResponse<Category[]>> {
    const queryParams = new URLSearchParams();

    // Explanation: Convert parameters to URL query string
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, value.toString());
      }
    });

    return await apiClient.get<Category[]>(`/categories?${queryParams}`);
  }

  // Explanation: Get single category by ID
  async getCategoryById(
    id: string,
    language: string = "en",
  ): Promise<ApiResponse<Category>> {
    if (!id) {
      throw new Error("Category ID is required");
    }
    return await apiClient.get<Category>(
      `/categories/${id}?language=${language}`,
    );
  }

  // Explanation: Create new category
  async createCategory(
    categoryData: Omit<Category, "id" | "createdAt" | "updatedAt">,
  ): Promise<ApiResponse<Category>> {
    // Explanation: Validate required fields before API call
    if (!categoryData.name?.en || !categoryData.slug?.en) {
      throw new Error("Category name and slug (English) are required");
    }

    return await apiClient.post<Category>("/categories", categoryData);
  }

  // Explanation: Update existing category
  async updateCategory(
    id: string,
    categoryData: Partial<Category>,
  ): Promise<ApiResponse<Category>> {
    if (!id) {
      throw new Error("Category ID is required for update");
    }

    return await apiClient.put<Category>(`/categories/${id}`, categoryData);
  }

  // Explanation: Delete category
  async deleteCategory(id: string): Promise<ApiResponse<void>> {
    if (!id) {
      throw new Error("Category ID is required for deletion");
    }

    return await apiClient.delete<void>(`/categories/${id}`);
  }

  // Explanation: Toggle category visibility
  async toggleVisibility(
    id: string,
    isVisible: boolean,
  ): Promise<ApiResponse<Category>> {
    return await this.updateCategory(id, { isVisible });
  }

  // Explanation: Toggle featured status
  async toggleFeatured(
    id: string,
    isFeatured: boolean,
  ): Promise<ApiResponse<Category>> {
    return await this.updateCategory(id, { isFeatured });
  }
}

// Explanation: Export singleton instance
export const categoryService = new CategoryService();
export default categoryService;
