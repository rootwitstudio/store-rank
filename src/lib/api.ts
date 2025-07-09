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

  getByCategory: async (categoryId: string) => {
    try {
      const response = await api.get(`/stores/category/${categoryId}`);
      return response.data;
    } catch (error) {
      console.error("Error in getByCategory stores:", error);
      throw error;
    }
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
  },

  sendOtp: async (data: { email: string }) => {
    const response = await api.post("/auth/email/login-otp", data);
    return response.data;
  },

  verifyOtp: async (data: { email: string; otp: string }) => {
    const response = await api.post("/auth/email/login-otp/verify", data);
    return response.data;
  },

  sendLoginLink: async (data: { email: string }) => {
    const response = await api.post("/auth/email/login-link", data);
    return response.data;
  },

  verifyLoginLink: async (token: string) => {
    const response = await api.get(`/auth/email/login-link/verify?token=${token}`);
    return response.data;
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

// Review API
export const reviewApi = {
  getStoreReviews: async (storeId: string, token?: string) => {
    try {
      console.log("Fetching reviews for store ID:", storeId);
      const headers: any = {};
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
      const response = await api.get(`/reviews/store/${storeId}`, { headers });
      console.log("Store reviews API response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching store reviews:", error);
      throw error;
    }
  },

  createReview: async (reviewData: {
    storeId: string;
    title: string;
    comment: string;
    rating: number;
    dateOfPurchase: string;
    orderNumber: string;
    attachments: string[];
    purchaseProof: string;
  }, token: string) => {
    try {
      console.log("Creating review:", reviewData);
      const response = await api.post('/reviews', reviewData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
      console.log("Create review API response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error creating review:", error);
      if (axios.isAxiosError(error)) {
        console.error("Error response data:", error.response?.data);
        console.error("Error response status:", error.response?.status);
        console.error("Error request config:", error.config);
      }
      throw error;
    }
  },

  getUserReviews: async (userId: string, token: string) => {
    try {
      console.log("Fetching user reviews for user ID:", userId);
      const response = await api.get(`/reviews/user/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      console.log("User reviews API response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching user reviews:", error);
      throw error;
    }
  },

  updateReview: async (reviewId: string, reviewData: {
    title?: string;
    comment?: string;
    rating?: number;
    dateOfPurchase?: string;
    orderNumber?: string;
    attachments?: string[];
    purchaseProof?: string;
  }, token: string) => {
    try {
      console.log("Updating review:", reviewId, reviewData);
      const response = await api.patch(`/reviews/${reviewId}`, reviewData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
      console.log("Update review API response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error updating review:", error);
      throw error;
    }
  },

  deleteReview: async (reviewId: string, token: string) => {
    try {
      console.log("Deleting review:", reviewId);
      const response = await api.delete(`/reviews/${reviewId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      console.log("Delete review API response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error deleting review:", error);
      throw error;
    }
  },
};

// Search API
export const searchApi = {
  search: async (params: {
    q: string;
    limit?: number;
    offset?: number;
    includeInactive?: boolean;
    categoryOnly?: boolean;
    storeOnly?: boolean;
    customCategoryOnly?: boolean;
  }) => {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('q', params.q);
      queryParams.append('limit', (params.limit || 10).toString());
      queryParams.append('offset', (params.offset || 0).toString());
      queryParams.append('includeInactive', params.includeInactive ? 'yes' : 'no');
      queryParams.append('categoryOnly', params.categoryOnly ? 'yes' : 'no');
      queryParams.append('storeOnly', params.storeOnly ? '1' : '0');
      queryParams.append('customCategoryOnly', params.customCategoryOnly ? 'yes' : 'no');
      
      console.log('Search API request:', `/search?${queryParams.toString()}`);
      
      const response = await api.get(`/search?${queryParams.toString()}`);
      
      console.log('Search API response:', response.data);
      
      return response.data;
    } catch (error) {
      console.error("Error in search:", error);
      
      // Return empty array on error to avoid .map errors
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Search failed');
    }
  },
};
