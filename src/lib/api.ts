import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to add the auth token to requests
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Store API
export const storeApi = {
  getAll: async (params?: {
    category?: string;
    minRating?: number;
    verified?: boolean;
    claimed?: boolean;
    country?: string;
    tags?: string[];
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  }) => {
    const response = await api.get("/stores", { params });
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/stores/${id}`);
    return response.data;
  },

  create: async (data: any) => {
    const response = await api.post("/stores", data);
    return response.data;
  },

  update: async (id: string, data: any) => {
    const response = await api.patch(`/stores/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    await api.delete(`/stores/${id}`);
  },
};

// Auth API
export const authApi = {
  register: async (data: {
    email: string;
    password: string;
    name?: string;
    role?: "USER" | "BUSINESS" | "ADMIN";
  }) => {
    const response = await api.post("/auth/register", data);
    return response.data;
  },

  login: async (data: { email: string; password: string }) => {
    const response = await api.post("/auth/login", data);
    return response.data;
  },
};

// Category API
export const categoryApi = {
  getAll: async () => {
    try {
      const response = await api.get("/categories");
      return response.data;
    } catch (error) {
      console.error("Error in getAll categories:", error);
      throw error;
    }
  },
  getById: async (id: string) => {
    try {
      console.log("Fetching category with ID:", id); // Debug log
      const response = await api.get(`/categories/${id}`);
      console.log("Category API response status:", response.status); // Debug log
      return response.data;
    } catch (error) {
      console.error("Error in getById category:", error);
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  },
};

export default api;
