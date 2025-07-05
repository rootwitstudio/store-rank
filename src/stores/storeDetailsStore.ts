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
  
  // Actions
  fetchStore: (id: string) => Promise<void>;
  fetchStoresByCategory: (categoryId: string) => Promise<void>;
  clearStoreDetails: () => void;
  clearStoresList: () => void;
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

  reset: () => {
    set({
      storeDetails: { data: null, loading: false, error: null },
      storesList: { data: [], loading: false, error: null, categoryId: null }
    });
  },
}));

export const useStoreDetails = () => useStoreDetailsStore();
export const useStoresList = () => useStoreDetailsStore(); 