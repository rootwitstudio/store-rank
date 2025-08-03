import { create } from 'zustand';

interface ActiveFiltersState {
  minRating: number;
  verifiedOnly: boolean;
  claimedOnly: boolean;
  selectedTags: string[];
  
  setMinRating: (rating: number) => void;
  setVerifiedOnly: (verified: boolean) => void;
  setClaimedOnly: (claimed: boolean) => void;
  setSelectedTags: (tags: string[]) => void;
  clearAllFilters: () => void;
  initializeFromUrl: () => void;
}

// Helper functions for URL management
const updateUrlParams = (params: Record<string, string | null>) => {
  if (typeof window === 'undefined') return;
  
  const url = new URL(window.location.href);
  
  Object.entries(params).forEach(([key, value]) => {
    if (value === null || value === '' || value === '0' || value === 'false') {
      url.searchParams.delete(key);
    } else {
      url.searchParams.set(key, value);
    }
  });
  
  window.history.replaceState({}, '', url.toString());
};

const getUrlParams = () => {
  if (typeof window === 'undefined') return {};
  
  const params = new URLSearchParams(window.location.search);
  return {
    minRating: parseInt(params.get('minRating') || '0', 10),
    verifiedOnly: params.get('verified') === 'true',
    claimedOnly: params.get('claimed') === 'true',
    selectedTags: params.get('tags') ? params.get('tags')!.split(',') : [],
  };
};

export const useActiveFilters = create<ActiveFiltersState>((set) => ({
  minRating: 0,
  verifiedOnly: false,
  claimedOnly: false,
  selectedTags: [],
  
  setMinRating: (rating) => {
    set({ minRating: rating });
    updateUrlParams({ minRating: rating > 0 ? rating.toString() : null });
  },
  
  setVerifiedOnly: (verified) => {
    set({ verifiedOnly: verified });
    updateUrlParams({ verified: verified ? 'true' : null });
  },
  
  setClaimedOnly: (claimed) => {
    set({ claimedOnly: claimed });
    updateUrlParams({ claimed: claimed ? 'true' : null });
  },
  
  setSelectedTags: (tags) => {
    set({ selectedTags: tags });
    updateUrlParams({ tags: tags.length > 0 ? tags.join(',') : null });
  },
  
  clearAllFilters: () => {
    set({ 
      minRating: 0, 
      verifiedOnly: false, 
      claimedOnly: false, 
      selectedTags: [] 
    });
    updateUrlParams({
      minRating: null,
      verified: null,
      claimed: null,
      tags: null
    });
  },
  
  initializeFromUrl: () => {
    const urlParams = getUrlParams();
    set({
      minRating: urlParams.minRating,
      verifiedOnly: urlParams.verifiedOnly,
      claimedOnly: urlParams.claimedOnly,
      selectedTags: urlParams.selectedTags,
    });
  },
})); 