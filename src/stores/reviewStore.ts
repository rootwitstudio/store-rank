import { create } from 'zustand';
import { reviewApi } from '@/lib/api';

export type ReviewUser = {
  id: string;
  name: string;
  picture: string;
};

export type Review = {
  id: string;
  title: string;
  comment: string;
  rating: number;
  dateOfPurchase: string;
  orderNumber: string;
  attachments: string[];
  purchaseProof: string;
  storeId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  user: ReviewUser;
  replies: any[];
  store?: {
    id: string;
    name: string;
    logo: string;
  };
};

export interface CreateReviewData {
  storeId: string;
  title: string;
  comment: string;
  rating: number;
  dateOfPurchase: string;
  orderNumber: string;
  attachments: string[];
  purchaseProof: string;
}

export interface UpdateReviewData {
  title: string;
  comment: string;
  rating: number;
  attachments: string[];
}

export type ReviewStoreState = {
  // Store reviews
  storeReviews: {
    data: Review[];
    loading: boolean;
    error: string | null;
    storeId: string | null;
  };

  // User reviews  
  userReviews: {
    data: Review[];
    loading: boolean;
    error: string | null;
    userId: string | null;
  };

  // Create review
  createReview: {
    loading: boolean;
    error: string | null;
  };

  // Edit review
  editReview: {
    loading: boolean;
    error: string | null;
  };

  // Delete review
  deleteReview: {
    loading: boolean;
    error: string | null;
  };
  
  // Actions
  fetchStoreReviews: (storeId: string, token?: string) => Promise<void>;
  fetchUserReviews: (userId: string, token: string) => Promise<void>;
  submitReview: (reviewData: CreateReviewData, token: string) => Promise<boolean>;
  updateReview: (reviewId: string, reviewData: UpdateReviewData, token: string) => Promise<boolean>;
  removeReview: (reviewId: string, token: string) => Promise<boolean>;
  clearStoreReviews: () => void;
  clearUserReviews: () => void;
  reset: () => void;
};

export const useReviewStore = create<ReviewStoreState>((set, get) => ({
  storeReviews: {
    data: [],
    loading: false,
    error: null,
    storeId: null,
  },

  userReviews: {
    data: [],
    loading: false,
    error: null,
    userId: null,
  },

  createReview: {
    loading: false,
    error: null,
  },

  editReview: {
    loading: false,
    error: null,
  },

  deleteReview: {
    loading: false,
    error: null,
  },

  fetchStoreReviews: async (storeId: string, token?: string) => {
    set((state) => ({
      storeReviews: { ...state.storeReviews, loading: true, error: null, storeId }
    }));
    
    try {
      const response = await reviewApi.getStoreReviews(storeId, token);
      set((state) => ({
        storeReviews: { ...state.storeReviews, data: response, loading: false }
      }));
    } catch (error) {
      console.error('Error fetching store reviews:', error);
      set((state) => ({
        storeReviews: {
          ...state.storeReviews,
          error: error instanceof Error ? error.message : 'Failed to fetch store reviews',
          loading: false,
          data: []
        }
      }));
    }
  },

  submitReview: async (reviewData: CreateReviewData, token: string) => {
    set((state) => ({
      createReview: { loading: true, error: null }
    }));
    
    try {
      await reviewApi.createReview(reviewData, token);
      set((state) => ({
        createReview: { loading: false, error: null }
      }));
      
      // Refresh reviews for the store after creating
      const { fetchStoreReviews } = get();
      await fetchStoreReviews(reviewData.storeId, token);
      
      return true;
    } catch (error) {
      console.error('Error creating review:', error);
      set((state) => ({
        createReview: {
          loading: false,
          error: error instanceof Error ? error.message : 'Failed to create review'
        }
      }));
      return false;
    }
  },

  fetchUserReviews: async (userId: string, token: string) => {
    set((state) => ({
      userReviews: { ...state.userReviews, loading: true, error: null, userId }
    }));
    
    try {
      const response = await reviewApi.getUserReviews(userId, token);
      set((state) => ({
        userReviews: { ...state.userReviews, data: response, loading: false }
      }));
    } catch (error) {
      console.error('Error fetching user reviews:', error);
      set((state) => ({
        userReviews: {
          ...state.userReviews,
          error: error instanceof Error ? error.message : 'Failed to fetch user reviews',
          loading: false,
          data: []
        }
      }));
    }
  },

  updateReview: async (reviewId: string, reviewData: UpdateReviewData, token: string) => {
    set((state) => ({
      editReview: { loading: true, error: null }
    }));
    
    try {
      await reviewApi.updateReview(reviewId, reviewData, token);
      set((state) => ({
        editReview: { loading: false, error: null }
      }));
      
      // Refresh both store and user reviews after updating
      const { fetchStoreReviews, fetchUserReviews, storeReviews, userReviews } = get();
      if (storeReviews.storeId) {
        await fetchStoreReviews(storeReviews.storeId, token);
      }
      if (userReviews.userId) {
        await fetchUserReviews(userReviews.userId, token);
      }
      
      return true;
    } catch (error) {
      console.error('Error updating review:', error);
      set((state) => ({
        editReview: {
          loading: false,
          error: error instanceof Error ? error.message : 'Failed to update review'
        }
      }));
      return false;
    }
  },

  removeReview: async (reviewId: string, token: string) => {
    set((state) => ({
      deleteReview: { loading: true, error: null }
    }));
    
    try {
      await reviewApi.deleteReview(reviewId, token);
      set((state) => ({
        deleteReview: { loading: false, error: null }
      }));
      
      // Refresh both store and user reviews after deleting
      const { fetchStoreReviews, fetchUserReviews, storeReviews, userReviews } = get();
      if (storeReviews.storeId) {
        await fetchStoreReviews(storeReviews.storeId, token);
      }
      if (userReviews.userId) {
        await fetchUserReviews(userReviews.userId, token);
      }
      
      return true;
    } catch (error) {
      console.error('Error deleting review:', error);
      set((state) => ({
        deleteReview: {
          loading: false,
          error: error instanceof Error ? error.message : 'Failed to delete review'
        }
      }));
      return false;
    }
  },

  clearStoreReviews: () => {
    set((state) => ({
      storeReviews: { ...state.storeReviews, data: [], error: null }
    }));
  },

  clearUserReviews: () => {
    set((state) => ({
      userReviews: { ...state.userReviews, data: [], error: null }
    }));
  },

  reset: () => {
    set({
      storeReviews: { data: [], loading: false, error: null, storeId: null },
      userReviews: { data: [], loading: false, error: null, userId: null },
      createReview: { loading: false, error: null },
      editReview: { loading: false, error: null },
      deleteReview: { loading: false, error: null }
    });
  },
}));

export const useStoreReviews = () => useReviewStore(); 