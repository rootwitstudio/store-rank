import api from './axios-client';

export interface CustomCategory {
  id: string;
  name: string;
  description: string | null;
  slug: string;
  icon: string | null;
  color: string | null;
  isActive: boolean;
  isFeatured: boolean;
  sortOrder: number;
  mappingType: 'MANUAL' | 'RULES' | 'HYBRID';
  rules: Record<string, unknown> | null;
  stores: CustomCategoryStore[];
  createdAt: string;
  updatedAt: string;
}

export interface CustomCategoryStore {
  id: string;
  customCategoryId: string;
  storeId: string;
  sortOrder: number;
  isActive: boolean;
  store: {
    id: string;
    name: string;
    description: string | null;
    website: string | null;
    logo: string | null;
    banner: string | null;
    rating: number;
    totalRatings: number;
    claimed: boolean;
    verified: boolean;
    tags: string[];
    storeCategories: {
      category: {
        id: string;
        name: string;
        slug: string;
        icon: string | null;
      };
    }[];
  };
}

export interface CustomCategoryStoresResponse {
  stores: CustomCategoryStore['store'][];
  total: number;
  pagination: {
    page: number;
    pageSize: number;
    totalPages: number;
  };
}

export const customCategoryApi = {
  // Get all custom categories
  getAll: async (): Promise<CustomCategory[]> => {
    try {
      console.log("Fetching all custom categories");
      const response = await api.get('/custom-categories');
      console.log("Custom categories API response status:", response.status);
      return response.data;
    } catch (error) {
      console.error("Error in getAll custom categories:", error);
      throw error;
    }
  },

  // Get featured custom categories only
  getFeatured: async (): Promise<CustomCategory[]> => {
    try {
      console.log("Fetching featured custom categories");
      const response = await api.get('/custom-categories/featured');
      console.log("Featured custom categories API response status:", response.status);
      return response.data;
    } catch (error) {
      console.error("Error in getFeatured custom categories:", error);
      throw error;
    }
  },

  // Get custom category by slug
  getBySlug: async (slug: string): Promise<CustomCategory> => {
    try {
      console.log("Fetching custom category with slug:", slug);
      const response = await api.get(`/custom-categories/slug/${slug}`);
      console.log("Custom category slug API response status:", response.status);
      return response.data;
    } catch (error) {
      console.error("Error in getBySlug custom category:", error);
      throw error;
    }
  },

  // Get stores by custom category slug
  getStoresBySlug: async (slug: string, options?: {
    claimed?: boolean;
    verified?: boolean;
    minRating?: number;
    maxRating?: number;
    sortBy?: 'rating' | 'name' | 'reviews' | 'updatedAt';
    sortOrder?: 'asc' | 'desc';
    page?: number;
    pageSize?: number;
  }): Promise<CustomCategoryStoresResponse> => {
    try {
      const { 
        claimed,
        verified,
        minRating,
        maxRating,
        sortBy,
        sortOrder,
        page = 1, 
        pageSize = 10 
      } = options || {};
      
      console.log("Fetching stores for custom category slug:", slug, "with options:", options);
      
      const params: Record<string, any> = { page, pageSize };
      if (claimed !== undefined) params.claimed = claimed;
      if (verified !== undefined) params.verified = verified;
      if (minRating !== undefined) params.minRating = minRating;
      if (maxRating !== undefined) params.maxRating = maxRating;
      if (sortBy !== undefined) params.sortBy = sortBy;
      if (sortOrder !== undefined) params.sortOrder = sortOrder;
      
      const response = await api.get(`/custom-categories/slug/${slug}/stores`, { params });
      console.log("Custom category stores API response status:", response.status);
      return response.data;
    } catch (error) {
      console.error("Error in getStoresBySlug custom category:", error);
      throw error;
    }
  },
}; 