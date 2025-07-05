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
  foundedYear: number | null;
  ceoOwner: string | null;
  employeeCount: string | null;
  certifications: any;
  storeCategories: any[];
  users: Array<{
    id: string;
    name: string;
    email: string;
    role: string;
  }>;
};

export type StoreDetailsState = {
  store: StoreDetails | null;
  loading: boolean;
  error: string | null;
  fetchStore: (id: string) => Promise<void>;
  clearStore: () => void;
  reset: () => void;
};

export const useStoreDetailsStore = create<StoreDetailsState>((set, get) => ({
  store: null,
  loading: false,
  error: null,

  fetchStore: async (id: string) => {
    set({ loading: true, error: null });
    
    try {
      const response = await storeApi.getById(id);
      set({ store: response, loading: false });
    } catch (error) {
      console.error('Error fetching store details:', error);
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch store details',
        loading: false,
        store: null
      });
    }
  },

  clearStore: () => {
    set({ store: null, error: null });
  },

  reset: () => {
    set({ store: null, loading: false, error: null });
  },
}));

export const useStoreDetails = () => useStoreDetailsStore(); 