import { create } from 'zustand';
import { storeApi, categoryApi } from '@/lib/api';

export interface Store {
  id: string;
  name: string;
  description: string;
  website: string;
  logo: string | null;
  banner: string | null;
  rating: number;
  totalRatings: number;
  claimed: boolean;
  verified: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  email: string | null;
  mobile: string | null;
  address1: string | null;
  address2: string | null;
  state: string | null;
  city: string | null;
  pincode: string | null;
  country: string | null;
  socialMedia: unknown;
  appStores: unknown;
  marketplaces: unknown;
  foundedYear: string | null;
  ceoOwner: string | null;
  employeeCount: string | null;
  certifications: string[];
  storeCategories: unknown[];
  users: Array<{
    id: string;
    name: string;
    email: string;
    role: string;
  }>;
}

export interface BreadcrumbItem {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  parentId: string | null;
  children: Category[];
}

export interface CategoryHierarchy {
  category: Category;
  breadcrumbs: BreadcrumbItem[];
  subcategories: Category[];
}

export interface StoreResponse {
  stores: Store[];
  total: number;
  pagination: {
    page: number;
    pageSize: number;
    totalPages: number;
  };
}

export interface StoresState {
  // All stores
  allStores: {
    data: Store[];
    loading: boolean;
    error: string | null;
  };

  // Single store details
  storeDetails: {
    data: Store | null;
    loading: boolean;
    error: string | null;
  };

  // Stores by category slug
  storesByCategory: {
    data: Store[];
    loading: boolean;
    error: string | null;
    categorySlug: string | null;
    pagination: {
      page: number;
      pageSize: number;
      totalPages: number;
      total: number;
    };
  };

  // Category hierarchy
  categoryHierarchy: {
    data: CategoryHierarchy | null;
    loading: boolean;
    error: string | null;
    currentSlug: string | null;
  };

  // Actions
  fetchAllStores: () => Promise<void>;
  fetchStoreById: (id: string) => Promise<void>;
  fetchStoresByCategory: (categorySlug: string, options?: {
    includeSub?: boolean;
    claimed?: boolean;
    verified?: boolean;
    minRating?: number;
    maxRating?: number;
    sortBy?: 'rating' | 'name' | 'reviews' | 'updatedAt';
    sortOrder?: 'asc' | 'desc';
    page?: number;
    pageSize?: number;
  }) => Promise<void>;
  fetchCategoryHierarchy: (slug: string) => Promise<void>;
  filterStores: (filters: {
    categorySlug?: string;
    category?: string;
    includeSub?: boolean;
    claimed?: boolean;
    verified?: boolean;
    minRating?: number;
    maxRating?: number;
    sortBy?: 'rating' | 'name' | 'reviews' | 'updatedAt';
    sortOrder?: 'asc' | 'desc';
    page?: number;
    pageSize?: number;
  }) => Promise<void>;
  clearStoreDetails: () => void;
  clearStoresByCategory: () => void;
  clearCategoryHierarchy: () => void;
  reset: () => void;
}

const initialState = {
  allStores: {
    data: [],
    loading: false,
    error: null,
  },
  storeDetails: {
    data: null,
    loading: false,
    error: null,
  },
  storesByCategory: {
    data: [],
    loading: false,
    error: null,
    categorySlug: null,
    pagination: {
      page: 1,
      pageSize: 12,
      totalPages: 1,
      total: 0,
    },
  },
  categoryHierarchy: {
    data: null,
    loading: false,
    error: null,
    currentSlug: null,
  },
};

export const useStoresStore = create<StoresState>((set) => ({
  ...initialState,

  fetchAllStores: async () => {
    set((state) => ({
      allStores: { ...state.allStores, loading: true, error: null }
    }));

    try {
      const response = await storeApi.getAll();
      set((state) => ({
        allStores: { ...state.allStores, data: response, loading: false }
      }));
    } catch (error) {
      console.error('Error fetching all stores:', error);
      set((state) => ({
        allStores: {
          ...state.allStores,
          error: error instanceof Error ? error.message : 'Failed to fetch stores',
          loading: false,
          data: []
        }
      }));
    }
  },

  fetchStoreById: async (id: string) => {
    set((state) => ({
      storeDetails: { ...state.storeDetails, loading: true, error: null }
    }));

    try {
      const response = await storeApi.getById(id);
      set((state) => ({
        storeDetails: { ...state.storeDetails, data: response, loading: false }
      }));
    } catch (error) {
      console.error('Error fetching store details:', error);
      set((state) => ({
        storeDetails: {
          ...state.storeDetails,
          error: error instanceof Error ? error.message : 'Failed to fetch store details',
          loading: false,
          data: null
        }
      }));
    }
  },

  fetchStoresByCategory: async (categorySlug: string, options: {
    includeSub?: boolean;
    claimed?: boolean;
    verified?: boolean;
    minRating?: number;
    maxRating?: number;
    sortBy?: 'rating' | 'name' | 'reviews' | 'updatedAt';
    sortOrder?: 'asc' | 'desc';
    page?: number;
    pageSize?: number;
  } = {}) => {
    set((state) => ({
      storesByCategory: { 
        ...state.storesByCategory, 
        loading: true, 
        error: null, 
        categorySlug 
      }
    }));

    try {
      const response = await storeApi.getByCategorySlug(categorySlug, options);
      const storeData = response.stores || response;
      const paginationData = response.pagination || {
        page: options.page || 1,
        pageSize: options.pageSize || 12,
        totalPages: 1,
        total: Array.isArray(storeData) ? storeData.length : 0,
      };

      set((state) => ({
        storesByCategory: {
          ...state.storesByCategory,
          data: storeData,
          loading: false,
          pagination: paginationData
        }
      }));
    } catch (error) {
      console.error('Error fetching stores by category:', error);
      set((state) => ({
        storesByCategory: {
          ...state.storesByCategory,
          error: error instanceof Error ? error.message : 'Failed to fetch stores',
          loading: false,
          data: []
        }
      }));
    }
  },

  fetchCategoryHierarchy: async (slug: string) => {
    set((state) => ({
      categoryHierarchy: { 
        ...state.categoryHierarchy, 
        loading: true, 
        error: null, 
        currentSlug: slug 
      }
    }));

    try {
      const response = await categoryApi.getHierarchyBySlug(slug);
      set((state) => ({
        categoryHierarchy: {
          ...state.categoryHierarchy,
          data: response,
          loading: false
        }
      }));
    } catch (error) {
      console.error('Error fetching category hierarchy:', error);
      set((state) => ({
        categoryHierarchy: {
          ...state.categoryHierarchy,
          error: error instanceof Error ? error.message : 'Failed to fetch category hierarchy',
          loading: false,
          data: null
        }
      }));
    }
  },

  filterStores: async (filters) => {
    set((state) => ({
      storesByCategory: { 
        ...state.storesByCategory, 
        loading: true, 
        error: null 
      }
    }));

    try {
      const response = await storeApi.filterStores(filters);
      const storeData = response.stores || response;
      const paginationData = response.pagination || {
        page: filters.page || 1,
        pageSize: filters.pageSize || 12,
        totalPages: 1,
        total: Array.isArray(storeData) ? storeData.length : 0,
      };

      set((state) => ({
        storesByCategory: {
          ...state.storesByCategory,
          data: storeData,
          loading: false,
          pagination: paginationData,
          categorySlug: filters.categorySlug || null
        }
      }));
    } catch (error) {
      console.error('Error filtering stores:', error);
      set((state) => ({
        storesByCategory: {
          ...state.storesByCategory,
          error: error instanceof Error ? error.message : 'Failed to filter stores',
          loading: false,
          data: []
        }
      }));
    }
  },

  clearStoreDetails: () => {
    set((state) => ({
      storeDetails: { ...state.storeDetails, data: null, error: null }
    }));
  },

  clearStoresByCategory: () => {
    set((state) => ({
      storesByCategory: {
        ...state.storesByCategory,
        data: [],
        error: null,
        categorySlug: null,
        pagination: {
          page: 1,
          pageSize: 12,
          totalPages: 1,
          total: 0,
        }
      }
    }));
  },

  clearCategoryHierarchy: () => {
    set((state) => ({
      categoryHierarchy: {
        ...state.categoryHierarchy,
        data: null,
        error: null,
        currentSlug: null
      }
    }));
  },

  reset: () => {
    set(initialState);
  },
}));

// Convenience hooks
export const useAllStores = () => {
  const { allStores, fetchAllStores } = useStoresStore();
  return { allStores, fetchAllStores };
};

export const useStoreDetails = () => {
  const { storeDetails, fetchStoreById, clearStoreDetails } = useStoresStore();
  return { storeDetails, fetchStoreById, clearStoreDetails };
};

export const useStoresByCategory = () => {
  const { 
    storesByCategory, 
    fetchStoresByCategory, 
    clearStoresByCategory,
    filterStores 
  } = useStoresStore();
  return { 
    storesByCategory, 
    fetchStoresByCategory, 
    clearStoresByCategory,
    filterStores 
  };
};

export const useCategoryHierarchy = () => {
  const { 
    categoryHierarchy, 
    fetchCategoryHierarchy, 
    clearCategoryHierarchy 
  } = useStoresStore();
  return { 
    categoryHierarchy, 
    fetchCategoryHierarchy, 
    clearCategoryHierarchy 
  };
}; 