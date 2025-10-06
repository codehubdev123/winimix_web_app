import axios from "axios";

// Configure axios base URL
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds timeout for file uploads
  headers: {
    "Content-Type": "multipart/form-data", // Default for FormData requests
  },
});

// Add request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(
      `🚀 Making ${config.method?.toUpperCase()} request to: ${config.url}`,
    );
    return config;
  },
  (error) => {
    console.error("❌ Request error:", error);
    return Promise.reject(error);
  },
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log(`✅ Response received:`, response.data);
    return response.data;
  },
  (error) => {
    console.error("❌ Response error:", error.response?.data || error.message);
    return Promise.reject(error);
  },
);

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
  image?: string;
  isVisible: boolean;
  isFeatured: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse {
  success: boolean;
  message: string;
  data: Category[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: string[];
}

class CategoryService {
  /**
   * Get all categories with pagination and search
   */
  async getCategories(params?: {
    page?: number;
    limit?: number;
    search?: string;
    language?: string;
  }): Promise<PaginatedResponse> {
    const response = await apiClient.get("/categories", { params });
    return response.data;
  }

  /**
   * Get single category by ID
   */
  async getCategoryById(
    id: string,
    language: string = "en",
  ): Promise<ApiResponse<Category>> {
    const response = await apiClient.get(`/categories/${id}`, {
      params: { language },
    });
    return response.data;
  }

  /**
   * Create new category with image upload
   */
  async createCategory(formData: FormData): Promise<ApiResponse<Category>> {
    const response = await apiClient.post("/categories", formData);
    return response.data;
  }

  /**
   * Update existing category
   */
  async updateCategory(
    id: string,
    formData: FormData,
  ): Promise<ApiResponse<Category>> {
    const response = await apiClient.put(`/categories/${id}`, formData);
    return response.data;
  }

  /**
   * Delete category
   */
  async deleteCategory(id: string): Promise<ApiResponse<void>> {
    const response = await apiClient.delete(`/categories/${id}`);
    return response.data;
  }

  /**
   * Toggle category visibility
   */
  async toggleVisibility(
    id: string,
    isVisible: boolean,
  ): Promise<ApiResponse<Category>> {
    const formData = new FormData();
    formData.append("isVisible", isVisible.toString());
    return this.updateCategory(id, formData);
  }

  /**
   * Toggle featured status
   */
  async toggleFeatured(
    id: string,
    isFeatured: boolean,
  ): Promise<ApiResponse<Category>> {
    const formData = new FormData();
    formData.append("isFeatured", isFeatured.toString());
    return this.updateCategory(id, formData);
  }
}

export const categoryService = new CategoryService();
export default categoryService;
