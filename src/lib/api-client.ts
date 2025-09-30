// lib/axiosInstance.js

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "multipart/form-data", // Default for FormData requests
  },
});

// Add request interceptor

axiosInstance.interceptors.request.use(
  (config) => {
    // For client-side requests
    // Log the request method and URL
    console.log(
      "🔵🔵🔵🔵🔵🔵  ",
      `Sending ${config?.method.toUpperCase()} request to: ${config.url} with ${config.data}`,
    );

    // Log the request body if present
    if (config.data) {
      console.log("Request Body:", JSON.stringify(config.data, null, 2));
    }
    if (typeof window !== "undefined") {
      // const token = localStorage.getItem("access_token");
      // if (token) {
      //   config.headers.Authorization = `Bearer ${token}`;
      // }
    }

    // For server-side requests (like in getServerSideProps)

    // You might set headers here with server-only environment variables or cookies.

    // For third-party APIs

    // config.headers['X-API-KEY'] = process.env.NEXT_PUBLIC_API_KEY;

    return config;
  },

  (error) => Promise.reject(error),
);
// lib/axiosInstance.js

axiosInstance.interceptors.response.use(
  (response) => {
    console.log("⚫⚫⚫⚫⚫⚫ #interceptor response ", response.data);
    return response;
  },

  (error) => {
    if (error.response?.status === 401) {
      // Example: refresh token logic or redirect to login

      console.error("Unauthorized, maybe redirect to login...");
    }

    console.error("API error:", error);

    return Promise.reject(error);
  },
);
export default axiosInstance;
