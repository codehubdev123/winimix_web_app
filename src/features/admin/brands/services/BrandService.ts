import apiClient from "@/lib/api-client";
import { ApiResponse } from "@/lib/api-client";
import {
  api_admin_brand,
  api_admin_brand_delete,
  api_admin_brand_edit,
  api_admin_brand_show,
} from "../../shared/apiAdmin";

// Type definitions for Brand
export interface Brand {
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

export interface BrandListParams {
  language?: string;
  featured?: boolean;
  visible?: boolean;
  page?: number;
  limit?: number;
  search?: string;
}

export class BrandService {
  // Explanation: Create new brand
  async create(data: any): Promise<any> {
    return await apiClient.post<any>(api_admin_brand, data);
  }

  // Explanation: Get all brands with filtering and pagination

  // Get brands with search, filters, and pagination
  async getBrands(params?: {
    page?: number;
    limit?: number;
    search?: string;
    isVisible?: boolean;
    isFeatured?: boolean;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  }) {
    try {
      // Clean up params - remove undefined values
      const cleanParams: any = {};
      Object.entries(params || {}).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          cleanParams[key] = value;
        }
      });

      const response = await apiClient.get(api_admin_brand, {
        params: cleanParams,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getBrandById(
    id: string,
    language: string = "en",
  ): Promise<ApiResponse<Brand>> {
    if (!id) {
      throw new Error("Brand ID is required");
    }
    return await apiClient.get<any>(api_admin_brand_show(id));
  }

  // Explanation: Update existing brand
  async updateBrand(id: string, brandData: any): Promise<any> {
    if (!id) {
      throw new Error("Brand ID is required for update");
    }

    return await apiClient.put<any>(api_admin_brand_edit(id), brandData);
  }

  // Explanation: Delete brand
  async deleteBrand(id: string): Promise<ApiResponse<void>> {
    if (!id) {
      throw new Error("Brand ID is required for deletion");
    }

    return await apiClient.delete<any>(api_admin_brand_delete(id));
  }

  // Explanation: Toggle brand visibility
  async toggleVisibility(id: string, brandData: any): Promise<any> {
    let toggleValue = !brandData.isVisible;
    const formData = new FormData();
    console.log("🔴🔴🔴🔴🔴🔴 brandData ", brandData);
    formData.append("name.en", brandData["name"]["en"]);
    formData.append("name.ar", brandData["name"]["ar"]);
    formData.append("description.en", brandData["description"]["en"]);
    formData.append("description.ar", brandData["description"]["ar"]);
    (formData.append("isVisible", toggleValue.toString()),
      formData.append("isFeatured", brandData.isFeatured.toString()));
    formData.append("sortOrder", brandData.sortOrder.toString());

    if (brandData.image instanceof File) {
      formData.append("image", brandData.image);
    }

    return await this.updateBrand(id, formData);
  }

  // Explanation: Toggle featured status
  async toggleFeatured(id: string, brandData): Promise<any> {
    const toggleValue = !brandData.isFeatured;
    const formData = new FormData();
    formData.append("name.en", brandData["name"]["en"]);
    formData.append("name.ar", brandData["name"]["ar"]);
    formData.append("description.en", brandData["description"]["en"]);
    formData.append("description.ar", brandData["description"]["ar"]);
    (formData.append("isFeatured", toggleValue.toString()),
      formData.append("isVisible", brandData.isVisible.toString()));
    formData.append("sortOrder", brandData.sortOrder.toString());

    if (brandData.image instanceof File) {
      formData.append("image", brandData.image);
    }

    return await this.updateBrand(id, formData);
  }
}

// export const brandService = new BrandService();
// export default brandService;
