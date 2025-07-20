import { create } from 'zustand';
import { searchApi } from '@/lib/api';

export type SearchResult = {
  id: string;
  type: 'store' | 'category';
  name: string;
  description?: string;
  icon?: string;
  slug?: string;
  rating?: number;
  reviewCount?: number;
  trustScore?: string;
  country?: string;
  verified?: boolean;
  category?: string;
  link?: string;
  // Add more fields as needed based on API response
};

export type SearchState = {
  query: string;
  results: SearchResult[];
  loading: boolean;
  error: string | null;
  setQuery: (query: string) => void;
  search: (query: string, options?: {
    limit?: number;
    offset?: number;
    includeInactive?: boolean;
    categoryOnly?: boolean;
    storeOnly?: boolean;
    customCategoryOnly?: boolean;
  }) => Promise<void>;
  clearResults: () => void;
  reset: () => void;
};

export const useSearchStore = create<SearchState>((set, get) => ({
  query: '',
  results: [],
  loading: false,
  error: null,
  
  setQuery: (query) => {
    set({ query });
  },
  
  search: async (query, options = {}) => {
    if (query.length < 3) {
      set({ results: [], error: null });
      return;
    }
    
    const currentQuery = get().query;
    if (currentQuery !== query) {
      // Query changed while request was in progress, ignore this request
      return;
    }
    
    set({ loading: true, error: null });
    
    try {
      const response = await searchApi.search({
        q: query,
        limit: options.limit || 10,
        offset: options.offset || 0,
        includeInactive: options.includeInactive || false,
        categoryOnly: options.categoryOnly || false,
        storeOnly: options.storeOnly || false,
        customCategoryOnly: options.customCategoryOnly || false,
      });
      
      // Check if query is still the same after API call
      if (get().query !== query) {
        return; // Query changed, ignore this response
      }
      
      // Handle different response formats
      let responseData: any[] = [];
      
      if (Array.isArray(response)) {
        responseData = response;
      } else if (response && typeof response === 'object') {
        // Handle the specific API response format with categories, stores, customCategories
        if (response.categories || response.stores || response.customCategories) {
          const categories = (response.categories || []).map((item: any) => ({
            ...item,
            type: 'category'
          }));
          
          const stores = (response.stores || []).map((item: any) => ({
            ...item,
            type: 'store'
          }));
          
          const customCategories = (response.customCategories || []).map((item: any) => ({
            ...item,
            type: 'category'
          }));
          
          responseData = [...categories, ...customCategories, ...stores];
        }
        // Try common response formats as fallback
        else if (Array.isArray(response.data)) {
          responseData = response.data;
        } else if (Array.isArray(response.results)) {
          responseData = response.results;
        } else if (Array.isArray(response.items)) {
          responseData = response.items;
        } else {
          console.warn('Unexpected response format:', response);
          responseData = [];
        }
      } else {
        console.warn('Unexpected response format:', response);
        responseData = [];
      }
      
      // Transform API response to match our SearchResult type
      const transformedResults: SearchResult[] = responseData.map((item: any) => ({
        id: item.id,
        type: item.type || 'store',
        name: item.name,
        description: item.description,
        icon: item.icon,
        slug: item.slug,
        rating: item.rating,
        reviewCount: item.reviewCount,
        trustScore: item.trustScore,
        country: item.country,
        verified: item.verified,
        category: item.category,
        link: item.link,
      }));
      
      set({ results: transformedResults, loading: false });
    } catch (error) {
      console.error('Search error:', error);
      // Only set error if query is still the same
      if (get().query === query) {
        set({ 
          error: error instanceof Error ? error.message : 'Search failed', 
          loading: false,
          results: [] 
        });
      }
    }
  },
  
  clearResults: () => {
    set({ results: [], error: null });
  },
  
  reset: () => {
    set({ query: '', results: [], loading: false, error: null });
  },
}));

export const useSearch = () => useSearchStore(); 