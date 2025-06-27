import axios from "axios";
import api from "./axios-client";

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
    const response = await api.post("/auth/email/register", data);
    return response.data;
  },

  login: async (data: { email: string; password: string }) => {
    const response = await api.post("/auth/email/login", data);
    return response.data;
  },
  verifyGoogleAuth: async (data: {idToken: string;}) => {
    try {
      const response = await api.post("/auth/google", data);
      return response.data;
    } catch (error) {
      console.error("Error in google verify", error);
      throw error;
    }
  }
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
