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

  getByCategorySlug: async (
    categorySlug: string,
    options?: {
      includeSub?: boolean;
      claimed?: boolean;
      verified?: boolean;
      minRating?: number;
      maxRating?: number;
      sortBy?: "rating" | "name" | "reviews" | "updatedAt";
      sortOrder?: "asc" | "desc";
      page?: number;
      pageSize?: number;
    }
  ) => {
    try {
      const params = new URLSearchParams();

      if (options?.includeSub !== undefined) {
        params.append("includeSub", options.includeSub.toString());
      }
      if (options?.claimed !== undefined) {
        params.append("claimed", options.claimed.toString());
      }
      if (options?.verified !== undefined) {
        params.append("verified", options.verified.toString());
      }
      if (options?.minRating !== undefined) {
        params.append("minRating", options.minRating.toString());
      }
      if (options?.maxRating !== undefined) {
        params.append("maxRating", options.maxRating.toString());
      }
      if (options?.sortBy !== undefined) {
        params.append("sortBy", options.sortBy);
      }
      if (options?.sortOrder !== undefined) {
        params.append("sortOrder", options.sortOrder);
      }
      if (options?.page !== undefined) {
        params.append("page", options.page.toString());
      }
      if (options?.pageSize !== undefined) {
        params.append("pageSize", options.pageSize.toString());
      }

      const queryString = params.toString();
      const url = `/stores/category-slug/${categorySlug}${
        queryString ? `?${queryString}` : ""
      }`;

      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.error("Error in getByCategorySlug stores:", error);
      throw error;
    }
  },

  filterStores: async (filters: {
    categorySlug?: string;
    category?: string;
    includeSub?: boolean;
    claimed?: boolean;
    verified?: boolean;
    minRating?: number;
    maxRating?: number;
    sortBy?: "rating" | "name" | "reviews" | "updatedAt";
    sortOrder?: "asc" | "desc";
    page?: number;
    pageSize?: number;
  }) => {
    try {
      const response = await api.get("/stores/filter", { params: filters });
      return response.data;
    } catch (error) {
      console.error("Error in filterStores:", error);
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
  verifyGoogleAuth: async (data: { idToken: string }) => {
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
    const response = await api.get(
      `/auth/email/login-link/verify?token=${token}`
    );
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
      const response = await api.get(`/categories/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error in getById category:", error);
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  },

  getBySlug: async (slug: string) => {
    try {
      const response = await api.get(`/categories/slug/${slug}`);
      return response.data;
    } catch (error) {
      console.error("Error in getBySlug category:", error);
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  },

  getHierarchyBySlug: async (slug: string) => {
    try {
      const response = await api.get(`/categories/slug/${slug}/hierarchy`);
      return response.data;
    } catch (error) {
      console.error("Error in getHierarchyBySlug category:", error);
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  },

  getBreadcrumbs: async (slug: string) => {
    try {
      const response = await api.get(`/categories/slug/${slug}/breadcrumbs`);
      return response.data;
    } catch (error) {
      console.error("Error in getBreadcrumbs:", error);
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return [];
      }
      throw error;
    }
  },
};

// Review API
export const reviewApi = {
  getAllReviews: async (params?: {
    page?: number;
    pageSize?: number;
    sortBy?: "createdAt" | "rating" | "title" | "dateOfPurchase";
    sortOrder?: "asc" | "desc";
    rating?: number;
    reviewType?: "ORGANIC" | "VERIFIED" | "INVITED" | "REDIRECTED";
    storeId?: string;
    userId?: string;
  }) => {
    try {
      const response = await api.get("/reviews", { params });
      return response.data;
    } catch (error) {
      console.error("Error fetching all reviews:", error);
      throw error;
    }
  },

  getStoreReviews: async (storeId: string, token?: string) => {
    try {
      const headers: any = {};
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
      const response = await api.get(`/reviews/store/${storeId}`, { headers });
      return response.data;
    } catch (error) {
      console.error("Error fetching store reviews:", error);
      throw error;
    }
  },

  getReviewSummary: async (storeId: string) => {
    try {
      const response = await api.get(`/reviews/store/${storeId}/summary`);
      return response.data;
    } catch (error) {
      console.error("Error fetching review summary:", error);
      throw error;
    }
  },

  createReview: async (
    reviewData: {
      storeId: string;
      title: string;
      comment: string;
      rating: number;
      dateOfPurchase: string;
      orderNumber: string;
      attachments: string[];
      purchaseProof: string;
    },
    token: string
  ) => {
    try {
      const response = await api.post("/reviews", reviewData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
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
      const response = await api.get(`/reviews/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching user reviews:", error);
      throw error;
    }
  },

  updateReview: async (
    reviewId: string,
    reviewData: {
      title?: string;
      comment?: string;
      rating?: number;
      dateOfPurchase?: string;
      orderNumber?: string;
      attachments?: string[];
      purchaseProof?: string;
    },
    token: string
  ) => {
    try {
      const response = await api.patch(`/reviews/${reviewId}`, reviewData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error updating review:", error);
      throw error;
    }
  },

  deleteReview: async (reviewId: string, token: string) => {
    try {
      const response = await api.delete(`/reviews/${reviewId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
      queryParams.append("q", params.q);
      queryParams.append("limit", (params.limit || 10).toString());
      queryParams.append("offset", (params.offset || 0).toString());
      queryParams.append(
        "includeInactive",
        params.includeInactive ? "yes" : "no"
      );
      queryParams.append("categoryOnly", params.categoryOnly ? "yes" : "no");
      queryParams.append("storeOnly", params.storeOnly ? "1" : "0");
      queryParams.append(
        "customCategoryOnly",
        params.customCategoryOnly ? "yes" : "no"
      );

      const response = await api.get(`/search?${queryParams.toString()}`);

      return response.data;
    } catch (error) {
      console.error("Error in search:", error);

      // Return empty array on error to avoid .map errors
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Search failed");
    }
  },
};

// Success Stories API
export const successStoriesApi = {
  create: async (data: {
    name: string;
    location: string;
    designation?: string;
    story: string;
    outcome: string;
    avatar?: string;
    rating?: number;
  }) => {
    try {
      const response = await api.post("/success-stories", data);
      return response.data;
    } catch (error) {
      console.error("Error creating success story:", error);
      throw error;
    }
  },

  getAll: async (options?: {
    limit?: number;
    offset?: number;
    verified?: boolean;
    sortBy?: "createdAt" | "date" | "rating";
    sortOrder?: "asc" | "desc";
  }) => {
    try {
      const params = new URLSearchParams();

      if (options?.limit) params.append("limit", options.limit.toString());
      if (options?.offset) params.append("offset", options.offset.toString());
      if (options?.verified !== undefined)
        params.append("verified", options.verified.toString());
      if (options?.sortBy) params.append("sortBy", options.sortBy);
      if (options?.sortOrder) params.append("sortOrder", options.sortOrder);

      const response = await api.get(`/success-stories?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching success stories:", error);
      throw error;
    }
  },

  getFeatured: async (limit: number = 6) => {
    try {
      const response = await api.get(
        `/success-stories/featured?limit=${limit}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching featured success stories:", error);
      throw error;
    }
  },

  getById: async (id: string) => {
    try {
      const response = await api.get(`/success-stories/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching success story:", error);
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  },

  update: async (
    id: string,
    data: Partial<{
      name: string;
      location: string;
      designation?: string;
      story: string;
      outcome: string;
      avatar?: string;
      rating?: number;
    }>
  ) => {
    try {
      const response = await api.put(`/success-stories/${id}`, data);
      return response.data;
    } catch (error) {
      console.error("Error updating success story:", error);
      throw error;
    }
  },

  delete: async (id: string) => {
    try {
      await api.delete(`/success-stories/${id}`);
    } catch (error) {
      console.error("Error deleting success story:", error);
      throw error;
    }
  },

  verify: async (id: string) => {
    try {
      const response = await api.put(`/success-stories/${id}/verify`);
      return response.data;
    } catch (error) {
      console.error("Error verifying success story:", error);
      throw error;
    }
  },
};

// Blog API
export const blogApi = {
  getAll: async (options?: {
    limit?: number;
    offset?: number;
    category?: string;
    search?: string;
    status?: "DRAFT" | "PUBLISHED" | "ARCHIVED";
    featured?: boolean;
    sortBy?: "publishedAt" | "readTime" | "title";
    sortOrder?: "asc" | "desc";
  }) => {
    try {
      const params = new URLSearchParams();

      if (options?.limit) params.append("take", options.limit.toString());
      if (options?.offset) params.append("skip", options.offset.toString());
      if (options?.category) params.append("category", options.category);
      if (options?.search) params.append("search", options.search);
      if (options?.status) params.append("status", options.status);
      if (options?.featured !== undefined)
        params.append("featured", options.featured.toString());
      if (options?.sortBy) params.append("sortBy", options.sortBy);
      if (options?.sortOrder) params.append("sortOrder", options.sortOrder);

      const response = await api.get(`/blogs/posts?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      throw error;
    }
  },

  getFeatured: async (limit: number = 4) => {
    try {
      const response = await api.get(`/blogs/posts/featured?limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching featured blog posts:", error);
      throw error;
    }
  },

  getById: async (id: string) => {
    try {
      const response = await api.get(`/blogs/posts/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching blog post:", error);
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  },

  getBySlug: async (slug: string) => {
    try {
      const response = await api.get(`/blogs/posts/slug/${slug}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching blog post by slug:", error);
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  },

  getCategories: async () => {
    try {
      const response = await api.get("/blogs/categories");
      return response.data;
    } catch (error) {
      console.error("Error fetching blog categories:", error);
      throw error;
    }
  },
};

// Industry Insights API
export const industryInsightsApi = {
  create: async (data: {
    title: string;
    value: string;
    description: string;
    icon: string;
    trend: string;
    trendColor: string;
    category: string;
    content: string;
    readTime: number;
    featured?: boolean;
    tags?: string[];
  }) => {
    try {
      const response = await api.post("/industry-insights", data);
      return response.data;
    } catch (error) {
      console.error("Error creating industry insight:", error);
      throw error;
    }
  },

  getAll: async (options?: {
    limit?: number;
    offset?: number;
    category?: string;
    featured?: boolean;
    sortBy?: "createdAt" | "publishedAt" | "title";
    sortOrder?: "asc" | "desc";
    search?: string;
  }) => {
    try {
      const params = new URLSearchParams();

      if (options?.limit) params.append("limit", options.limit.toString());
      if (options?.offset) params.append("offset", options.offset.toString());
      if (options?.category) params.append("category", options.category);
      if (options?.featured !== undefined)
        params.append("featured", options.featured.toString());
      if (options?.sortBy) params.append("sortBy", options.sortBy);
      if (options?.sortOrder) params.append("sortOrder", options.sortOrder);
      if (options?.search) params.append("search", options.search);

      const response = await api.get(`/industry-insights?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching industry insights:", error);
      throw error;
    }
  },

  getFeatured: async (limit: number = 4) => {
    try {
      const response = await api.get(
        `/industry-insights/featured?limit=${limit}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching featured industry insights:", error);
      throw error;
    }
  },

  getById: async (id: string) => {
    try {
      const response = await api.get(`/industry-insights/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching industry insight:", error);
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  },

  update: async (
    id: string,
    data: Partial<{
      title: string;
      value: string;
      description: string;
      icon: string;
      trend: string;
      trendColor: string;
      category: string;
      content: string;
      readTime: number;
      featured?: boolean;
      tags?: string[];
    }>
  ) => {
    try {
      const response = await api.put(`/industry-insights/${id}`, data);
      return response.data;
    } catch (error) {
      console.error("Error updating industry insight:", error);
      throw error;
    }
  },

  delete: async (id: string) => {
    try {
      await api.delete(`/industry-insights/${id}`);
    } catch (error) {
      console.error("Error deleting industry insight:", error);
      throw error;
    }
  },

  getCategories: async () => {
    try {
      const response = await api.get("/industry-insights/categories");
      return response.data;
    } catch (error) {
      console.error("Error fetching insight categories:", error);
      throw error;
    }
  },
};
