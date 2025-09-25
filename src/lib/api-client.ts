import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";

// Type definitions for API responses
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: string[];
  meta?: {
    total?: number;
    language?: string;
    page?: number;
    limit?: number;
    totalPages?: number;
  };
}

// API client configuration interface
interface ApiClientConfig {
  baseURL: string;
  timeout?: number;
  language?: string;
}

class ApiClient {
  private client: AxiosInstance;
  private language: string = "en";

  constructor(config: ApiClientConfig) {
    // Explanation: Create axios instance with base configuration
    this.client = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout || 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.language = config.language || "en";

    // Explanation: Add request interceptor for automatic header injection
    this.client.interceptors.request.use(
      (config) => {
        // Explanation: Add language header to every request
        config.headers["Accept-Language"] = this.language;

        // Explanation: Add auth token if available (for future authentication)
        const token = localStorage.getItem("authToken");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        console.log(
          `🚀 Making API Request: ${config.method?.toUpperCase()} ${config.url}`,
        );
        return config;
      },
      (error) => {
        console.error("❌ Request Interceptor Error:", error);
        return Promise.reject(error);
      },
    );

    // Explanation: Add response interceptor for consistent error handling
    this.client.interceptors.response.use(
      (response: AxiosResponse<ApiResponse>) => {
        console.log(
          `✅ API Response Success: ${response.status} ${response.config.url}`,
        );

        // Explanation: Ensure response has the expected structure
        if (response.data && typeof response.data.success === "boolean") {
          return response;
        }

        // Explanation: Normalize unexpected response structures
        return {
          ...response,
          data: {
            success: true,
            message: "Request successful",
            data: response.data,
          },
        };
      },
      (error: AxiosError) => {
        console.error("❌ API Response Error:", {
          url: error.config?.url,
          method: error.config?.method,
          status: error.response?.status,
          message: error.message,
        });

        // Explanation: Handle different types of errors consistently
        if (error.response) {
          // Server responded with error status
          const apiError = error.response.data as ApiResponse;
          return Promise.reject({
            success: false,
            message: apiError.message || "Server error occurred",
            errors: apiError.errors || [error.message],
            status: error.response.status,
          });
        } else if (error.request) {
          // Network error - no response received
          return Promise.reject({
            success: false,
            message: "Network error: Please check your internet connection",
            errors: ["Network request failed"],
            status: 0,
          });
        } else {
          // Configuration error
          return Promise.reject({
            success: false,
            message: "Request configuration error",
            errors: [error.message],
            status: 0,
          });
        }
      },
    );
  }

  // Explanation: Set language for all subsequent requests
  setLanguage(lang: string): void {
    this.language = lang;
    // Explanation: Update the interceptor to use new language
    this.client.interceptors.request.use((config) => {
      config.headers["Accept-Language"] = lang;
      return config;
    });
  }

  // Explanation: Generic GET method with TypeScript generics
  async get<T = any>(
    url: string,
    params?: any,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    const response = await this.client.get<ApiResponse<T>>(url, {
      params,
      ...config,
    });
    return response.data;
  }

  // Explanation: Generic POST method
  async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    const response = await this.client.post<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  // Explanation: Generic PUT method
  async put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    const response = await this.client.put<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  // Explanation: Generic DELETE method
  async delete<T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    const response = await this.client.delete<ApiResponse<T>>(url, config);
    return response.data;
  }
}

// Explanation: Create singleton instance with base configuration
const apiClient = new ApiClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "/api",
  timeout: 15000,
});

export default apiClient;
