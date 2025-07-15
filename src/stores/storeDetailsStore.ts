import { create } from 'zustand';
import { storeApi } from '@/lib/api';

export type StoreDetails = {
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
  socialMedia: any;
  appStores: any;
  marketplaces: any;
  foundedYear: string | null;
  ceoOwner: string | null;
  employeeCount: string | null;
  certifications: string[];
  storeCategories: any[];
  users: Array<{
    id: string;
    name: string;
    email: string;
    role: string;
  }>;
};

export type StoreDetailsState = {
  // Individual store details
  storeDetails: {
    data: StoreDetails | null;
    loading: boolean;
    error: string | null;
  };
  
  // Stores by category
  storesList: {
    data: StoreDetails[];
    loading: boolean;
    error: string | null;
    categoryId: string | null;
  };

  // Stores by category slug
  storesByCategorySlug: {
    data: StoreDetails[];
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
  
  // Actions
  fetchStore: (id: string) => Promise<void>;
  fetchStoresByCategory: (categoryId: string) => Promise<void>;
  fetchStoresByCategorySlug: (categorySlug: string, options?: {
    includeSub?: boolean;
    page?: number;
    pageSize?: number;
  }) => Promise<void>;
  clearStoreDetails: () => void;
  clearStoresList: () => void;
  clearStoresByCategorySlug: () => void;
  reset: () => void;
};

export const useStoreDetailsStore = create<StoreDetailsState>((set, get) => ({
  storeDetails: {
    data: null,
    loading: false,
    error: null,
  },
  
  storesList: {
    data: [],
    loading: false,
    error: null,
    categoryId: null,
  },

  storesByCategorySlug: {
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

  fetchStore: async (id: string) => {
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

  fetchStoresByCategory: async (categoryId: string) => {
    set((state) => ({
      storesList: { ...state.storesList, loading: true, error: null, categoryId }
    }));
    
    try {
      const response = await storeApi.getByCategory(categoryId);
      set((state) => ({
        storesList: { ...state.storesList, data: response, loading: false }
      }));
    } catch (error) {
      console.error('Error fetching stores by category:', error);
      set((state) => ({
        storesList: {
          ...state.storesList,
          error: error instanceof Error ? error.message : 'Failed to fetch stores',
          loading: false,
          data: []
        }
      }));
    }
  },

  fetchStoresByCategorySlug: async (categorySlug: string, options?: {
    includeSub?: boolean;
    page?: number;
    pageSize?: number;
  }) => {
    set((state) => ({
      storesByCategorySlug: { 
        ...state.storesByCategorySlug, 
        loading: true, 
        error: null, 
        categorySlug 
      }
    }));
    
    try {
      const response = await storeApi.getByCategorySlug(categorySlug, options);
      set((state) => ({
        storesByCategorySlug: { 
          ...state.storesByCategorySlug, 
          data: response.stores || response, 
          loading: false,
          pagination: response.pagination || {
            page: options?.page || 1,
            pageSize: options?.pageSize || 12,
            totalPages: 1,
            total: response.stores?.length || response.length || 0,
          }
        }
      }));
    } catch (error) {
      console.error('Error fetching stores by category slug:', error);
      set((state) => ({
        storesByCategorySlug: {
          ...state.storesByCategorySlug,
          error: error instanceof Error ? error.message : 'Failed to fetch stores',
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

  clearStoresList: () => {
    set((state) => ({
      storesList: { ...state.storesList, data: [], error: null }
    }));
  },

  clearStoresByCategorySlug: () => {
    set((state) => ({
      storesByCategorySlug: { 
        ...state.storesByCategorySlug, 
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

  reset: () => {
    set({
      storeDetails: { data: null, loading: false, error: null },
      storesList: { data: [], loading: false, error: null, categoryId: null },
      storesByCategorySlug: {
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
      }
    });
  },
}));

export const useStoreDetails = () => useStoreDetailsStore();
export const useStoresList = () => useStoreDetailsStore();
export const useStoresByCategorySlug = () => useStoreDetailsStore(); 