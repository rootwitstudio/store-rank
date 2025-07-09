"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Store as StoreIcon,
  TrendingUp,
  Award,
  CheckCircle,
  Package,
  Building,
  MessageSquare,
  Star,
  Filter,
  Eye,
  ExternalLink,
  Globe,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Users,
  ShieldCheck,
  AlertTriangle,
  Loader2,
  Link as LinkIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Header } from "@/components/header";
import { StoreHeader } from "@/components/store-detail/StoreHeader";

import { RatingBreakdown } from "@/components/store-detail/RatingBreakdown";
import { ReviewModal } from "@/components/store-detail/ReviewModal";
import { MobileNavTabs } from "@/components/store-detail/MobileNavTabs";
import { StoreSidebar } from "@/components/store-detail/StoreSidebar";
import { useStoreDetails } from "@/stores/storeDetailsStore";
import { useReviewStore, type Review } from "@/stores/reviewStore";
import { useAuthStore } from "@/stores/authStore";
import Link from "next/link";

function ensureHttps(url: string) {
  if (!url) return url;
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  return `https://${url}`;
}

// Utility function to safely convert any value to a string for rendering
function safeStringify(value: any, fallback: string = 'Unknown'): string {
  try {
    if (typeof value === 'string' && value.trim()) {
      return value.trim();
    }
    if (value && typeof value === 'object') {
      // Try common name properties
      const name = value.name || value.category || value.categoryName || value.title;
      if (typeof name === 'string' && name.trim()) {
        return name.trim();
      }
      // If nested object, try to get name from it
      if (name && typeof name === 'object' && name.name && typeof name.name === 'string') {
        return name.name.trim();
      }
    }
    return fallback;
  } catch (error) {
    return fallback;
  }
}

function ReviewCard({ review, isUserReview = false, onEdit, onDelete }: { 
  review: Review; 
  isUserReview?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}) {
  const { user } = useAuthStore();
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Use authState user info if it's the current user's review
  const displayUser = isUserReview && user ? user : review.user;
  const displayName = isUserReview && user ? user.name : (review.user?.name || 'Anonymous');

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
      {/* Header with user info and actions */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
            {displayUser?.picture ? (
              <img
                src={displayUser.picture}
                alt={displayName}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <span className="text-sm font-semibold text-blue-600">
                {displayName?.charAt(0) || 'U'}
              </span>
            )}
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">{displayName}</h4>
            <p className="text-sm text-gray-500">{formatDate(review.createdAt)}</p>
          </div>
        </div>

        {/* Edit/Delete actions for user's own reviews */}
        {isUserReview && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onEdit}
              className="text-blue-600 hover:text-blue-700"
            >
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onDelete}
              className="text-red-600 hover:text-red-700"
            >
              Delete
            </Button>
          </div>
        )}
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-4 h-4 ${
                star <= review.rating
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        <span className="font-medium text-gray-900">{review.rating}</span>
        <span className="text-gray-500">•</span>
        <span className="text-sm text-gray-600">{review.title}</span>
      </div>

      {/* Review content */}
      <div className="space-y-3">
        <p className="text-gray-700 leading-relaxed">{review.comment}</p>
        
        {/* Purchase details */}
        {(review.orderNumber || review.dateOfPurchase) && (
          <div className="bg-gray-50 rounded-lg p-3 text-sm">
            <div className="flex flex-wrap gap-4 text-gray-600">
              {review.orderNumber && (
                <span>Order #: {review.orderNumber}</span>
              )}
              {review.dateOfPurchase && (
                <span>Purchased: {formatDate(review.dateOfPurchase)}</span>
              )}
            </div>
          </div>
        )}

        {/* Attachments */}
        {review.attachments && review.attachments.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {review.attachments.map((attachment, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                📎 {attachment}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  const starSize = size === "sm" ? "w-4 h-4" : "w-5 h-5";

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${starSize} ${star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
        />
      ))}
    </div>
  );
}

export default function StoreDetailPage({
  params,
}: {
  params: Promise<{ storeId: string }>;
}) {
  const router = useRouter();
  const { storeId } = use(params);
  const [activeTab, setActiveTab] = useState("overview");
  const [reviewFilter, setReviewFilter] = useState("all");
  const [reviewSort, setReviewSort] = useState("newest");
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [showEditReview, setShowEditReview] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletingReviewId, setDeletingReviewId] = useState<string | null>(null);
  
  const { storeDetails, fetchStore } = useStoreDetails();
  const { data: store, loading, error } = storeDetails;
  
  const { 
    storeReviews, 
    userReviews,
    fetchStoreReviews, 
    fetchUserReviews,
    removeReview,
    deleteReview 
  } = useReviewStore();
  const { data: reviews = [], loading: reviewsLoading, error: reviewsError } = storeReviews;
  const { data: userReviewsData = [], loading: userReviewsLoading, error: userReviewsError } = userReviews;

  // Get user and token from authStore
  const { user, accessToken } = useAuthStore();
  const currentUserId = user?.id || "d9c9e39d-b50d-40be-9974-880bb2fe8c57"; // fallback
  
  console.log('Current user from authStore:', user);
  console.log('Access token from authStore:', accessToken ? 'Present' : 'Missing');

  useEffect(() => {
    if (storeId) {
      fetchStore(storeId);
      fetchStoreReviews(storeId, accessToken);
      
      // Fetch user reviews with token
      console.log('Fetching user reviews', currentUserId, accessToken);
      if (accessToken && currentUserId) {
        fetchUserReviews(currentUserId, accessToken);
      }
    }
  }, [storeId, fetchStore, fetchStoreReviews, fetchUserReviews, currentUserId, accessToken]);

  // Refetch user reviews when page comes into focus
  useEffect(() => {
    const handleFocus = () => {
      if (accessToken && currentUserId && storeId) {
        console.log('Page focused - refetching user reviews');
        fetchUserReviews(currentUserId, accessToken);
      }
    };

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        handleFocus();
      }
    };

    // Listen for window focus and page visibility changes
    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [currentUserId, storeId, fetchUserReviews, accessToken]);

  const handleEditReview = (review: Review) => {
    setEditingReview(review);
    setShowEditReview(true);
  };

  const handleDeleteConfirm = (reviewId: string) => {
    setDeletingReviewId(reviewId);
    setShowDeleteConfirm(true);
  };

  const handleDeleteReview = async () => {
    if (!deletingReviewId) return;
    
    try {
      const success = await removeReview(deletingReviewId, accessToken || '');
      
      if (success) {
        setShowDeleteConfirm(false);
        setDeletingReviewId(null);
      }
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  // Filter user reviews for this store - with safety checks
  const storeUserReviews = (userReviewsData || []).filter(review => 
    review && review.storeId === storeId
  );
  
  // Filter out user's reviews from store reviews to avoid duplicates - with safety checks
  const otherReviews = (reviews || []).filter(review => 
    review && review.userId !== currentUserId
  );
  
  // Debug logging
  console.log('Current User ID:', currentUserId);
  console.log('Store ID:', storeId);
  console.log('User Reviews Data:', userReviewsData);
  console.log('Filtered Store User Reviews:', storeUserReviews);
  console.log('Other Reviews (excluding user):', otherReviews);
  console.log('Auth Token:', accessToken ? 'Present' : 'Missing');
  
  // Combine reviews with user reviews at top - with safety checks
  const allReviews = [...(storeUserReviews || []), ...(otherReviews || [])];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">

        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-blue-600" />
              <p className="text-gray-600 text-lg">Loading store details...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">

        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-red-500" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Store</h2>
              <p className="text-gray-600 mb-4">{error}</p>
              <Button onClick={() => fetchStore(storeId)} className="mr-4">
                Try Again
              </Button>
              <Button variant="outline" onClick={() => router.back()}>
                Go Back
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!store) {
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <StoreIcon className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Store Not Found</h2>
              <p className="text-gray-600 mb-4">The store you're looking for doesn't exist.</p>
              <Button onClick={() => router.back()}>
                Go Back
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">


      <main className="container mx-auto px-4 py-6">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Search
          </Button>
        </div>

        {/* Store Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center">
                {store?.logo ? (
                  <img
                    src={store.logo}
                    alt={`${store?.name || 'Store'} logo`}
                    className="w-16 h-16 object-contain rounded-lg"
                  />
                ) : (
                  <span className="text-2xl font-bold text-blue-600">
                    {store?.name?.charAt(0) || 'S'}
                  </span>
                )}
              </div>
            </div>

            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                    {store?.name || 'Store Name'}
                  </h1>
                  <div className="flex items-center gap-3 mb-3">
                    {store?.verified && (
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                    {store?.claimed && (
                      <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                        <ShieldCheck className="w-3 h-3 mr-1" />
                        Claimed
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <StarRating rating={store?.rating || 0} size="md" />
                      <span className="text-xl font-bold text-gray-900">
                        {(store?.rating || 0).toFixed(1)}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {store?.totalRatings || 0} review{(store?.totalRatings || 0) !== 1 ? 's' : ''}
                    </div>
                  </div>
                </div>
              </div>

              {store?.description && (
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {store.description}
                </p>
              )}

              <div className="flex flex-wrap gap-2 mb-4">
                {(store?.tags || []).map((tag, index) => {
                  const tagName = safeStringify(tag, 'Tag');
                  return (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tagName}
                    </Badge>
                  );
                })}
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                {store?.website && (
                  <a
                    href={store.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-blue-600"
                  >
                    <Globe className="w-4 h-4" />
                    Website
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                {store?.email && (
                  <div className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    {store.email}
                  </div>
                )}
                {store?.mobile && (
                  <div className="flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    {store.mobile}
                  </div>
                )}
                {store?.country && (
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {store.country}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex overflow-x-auto">
              {[
                { id: "overview", label: "Overview", icon: Eye },
                { id: "company", label: "Company", icon: Building },
                { id: "reviews", label: "Reviews", icon: MessageSquare },
                { id: "contact", label: "Contact", icon: Phone },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <StoreIcon className="w-5 h-5" />
                      Store Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-gray-500">Store Name</label>
                          <div className="text-gray-900 font-medium">{store?.name || 'N/A'}</div>
                        </div>
                        {store?.foundedYear && (
                          <div>
                            <label className="text-sm font-medium text-gray-500">Founded</label>
                            <div className="text-gray-900 font-medium">{store.foundedYear}</div>
                          </div>
                        )}
                        {store?.employeeCount && (
                          <div>
                            <label className="text-sm font-medium text-gray-500">Employee Count</label>
                            <div className="text-gray-900 font-medium">{store.employeeCount}</div>
                          </div>
                        )}
                        {store?.ceoOwner && (
                          <div>
                            <label className="text-sm font-medium text-gray-500">CEO/Owner</label>
                            <div className="text-gray-900 font-medium">{store.ceoOwner}</div>
                          </div>
                        )}
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-gray-500">Created</label>
                          <div className="text-gray-900 font-medium">
                            {store?.createdAt ? new Date(store.createdAt).toLocaleDateString() : 'N/A'}
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Last Updated</label>
                          <div className="text-gray-900 font-medium">
                            {store?.updatedAt ? new Date(store.updatedAt).toLocaleDateString() : 'N/A'}
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Total Ratings</label>
                          <div className="text-gray-900 font-medium">{store?.totalRatings || 0}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {store?.storeCategories && store.storeCategories.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Package className="w-5 h-5" />
                        Categories
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {store?.storeCategories?.map((category, index) => {
                          const categoryName = safeStringify(category, 'Unknown Category');
                          
                          return (
                            <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                              {categoryName}
                            </Badge>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {activeTab === "company" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="w-5 h-5" />
                    Company Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Company Name</label>
                        <div className="text-gray-900 font-medium">{store?.name || 'N/A'}</div>
                      </div>
                      {store?.website && (
                        <div>
                          <label className="text-sm font-medium text-gray-500">Website</label>
                          <a
                            href={ensureHttps(store.website)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                          >
                            {store.website}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      )}
                      {store?.foundedYear && (
                        <div>
                          <label className="text-sm font-medium text-gray-500">Founded</label>
                          <div className="text-gray-900 font-medium">{store.foundedYear}</div>
                        </div>
                      )}
                      {store?.employeeCount && (
                        <div>
                          <label className="text-sm font-medium text-gray-500">Employee Count</label>
                          <div className="text-gray-900 font-medium">{store.employeeCount}</div>
                        </div>
                      )}
                    </div>
                    <div className="space-y-4">
                      {store?.ceoOwner && (
                        <div>
                          <label className="text-sm font-medium text-gray-500">CEO/Owner</label>
                          <div className="text-gray-900 font-medium">{store.ceoOwner}</div>
                        </div>
                      )}
                      {store?.users && store.users.length > 0 && (
                        <div>
                          <label className="text-sm font-medium text-gray-500">Business Users</label>
                          <div className="space-y-2">
                            {store.users.map((user) => (
                              <div key={user?.id || Math.random()} className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                  <span className="text-sm font-medium text-blue-600">
                                    {user?.name?.charAt(0) || 'U'}
                                  </span>
                                </div>
                                <div>
                                  <div className="text-sm font-medium">{user?.name || 'Unknown User'}</div>
                                  <div className="text-xs text-gray-500">{user?.role || 'Unknown Role'}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "reviews" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-5 h-5" />
                      Customer Reviews ({storeUserReviews.length + otherReviews.length})
                    </div>
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={() => setShowWriteReview(true)}
                    >
                      Write a Review
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {reviewsLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                      <span className="ml-2 text-gray-600">Loading reviews...</span>
                    </div>
                  ) : reviewsError ? (
                    <div className="text-center py-8">
                      <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-red-500" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Reviews</h3>
                      <p className="text-gray-600 mb-4">{reviewsError}</p>
                      <Button 
                        variant="outline" 
                        onClick={() => fetchStoreReviews(storeId)}
                      >
                        Try Again
                      </Button>
                    </div>
                  ) : otherReviews.length === 0 && storeUserReviews.length === 0 ? (
                    <div className="text-center py-8">
                      <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No Reviews Yet</h3>
                      <p className="text-gray-600 mb-4">Be the first to review this store</p>
                      <Button 
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={() => setShowWriteReview(true)}
                      >
                        Write a Review
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* User's Own Reviews - Show at top */}
                      {storeUserReviews.length > 0 && (
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Your Review</h3>
                            <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                              Your Review
                            </Badge>
                          </div>
                          {storeUserReviews.map((review) => (
                            <ReviewCard 
                              key={review.id} 
                              review={review}
                              isUserReview={true}
                              onEdit={() => handleEditReview(review)}
                              onDelete={() => handleDeleteConfirm(review.id)}
                            />
                          ))}
                          
                          {/* Separator */}
                          {otherReviews.length > 0 && (
                            <div className="border-t border-gray-200 pt-6 mt-6">
                              <h3 className="text-lg font-semibold text-gray-900 mb-4">Other Reviews</h3>
                            </div>
                          )}
                        </div>
                      )}
                      
                      {/* Other Store Reviews */}
                      {otherReviews.map((review) => (
                        <ReviewCard key={review.id} review={review} />
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {activeTab === "contact" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="w-5 h-5" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {store?.email && (
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-gray-500" />
                        <div>
                          <label className="text-sm font-medium text-gray-500">Email</label>
                          <div className="text-gray-900 font-medium">{store.email}</div>
                        </div>
                      </div>
                    )}
                    {store?.mobile && (
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-gray-500" />
                        <div>
                          <label className="text-sm font-medium text-gray-500">Mobile</label>
                          <div className="text-gray-900 font-medium">{store.mobile}</div>
                        </div>
                      </div>
                    )}
                    {store?.website && (
                      <div className="flex items-center gap-3">
                        <Globe className="w-5 h-5 text-gray-500" />
                        <div>
                          <label className="text-sm font-medium text-gray-500">Website</label>
                          <a
                            href={ensureHttps(store.website)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                          >
                            {store.website}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    )}
                    {(store?.address1 || store?.city || store?.state || store?.country) && (
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                        <div>
                          <label className="text-sm font-medium text-gray-500">Address</label>
                          <div className="text-gray-900 font-medium">
                            {store?.address1 && <div>{store.address1}</div>}
                            {store?.address2 && <div>{store.address2}</div>}
                            <div>
                              {[store?.city, store?.state, store?.pincode, store?.country]
                                .filter(Boolean)
                                .join(', ')}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {store?.website && (
                  <Button
                    asChild
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <a href={ensureHttps(store.website)} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Visit Website
                    </a>
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setShowWriteReview(true)}
                >
                  <Star className="w-4 h-4 mr-2" />
                  Write Review
                </Button>
                <Button variant="outline" className="w-full">
                  <LinkIcon className="w-4 h-4 mr-2" />
                  Share Store
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Store Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Overall Rating</span>
                    <div className="flex items-center gap-2">
                      <StarRating rating={store?.rating || 0} size="sm" />
                      <span className="font-medium">{(store?.rating || 0).toFixed(1)}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Reviews</span>
                    <span className="font-medium">{store?.totalRatings || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Verified</span>
                    <Badge variant={store?.verified ? "default" : "secondary"}>
                      {store?.verified ? "Yes" : "No"}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Claimed</span>
                    <Badge variant={store?.claimed ? "default" : "secondary"}>
                      {store?.claimed ? "Yes" : "No"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Review Modal - Unified for both create and edit */}
      <ReviewModal
        isOpen={showWriteReview || showEditReview}
        onClose={() => {
          setShowWriteReview(false);
          setShowEditReview(false);
          setEditingReview(null);
        }}
        isEdit={showEditReview}
        review={editingReview || undefined}
        storeName={store?.name || 'Store'}
        storeId={storeId}
      />

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md shadow-2xl border-0">
            <CardHeader>
              <CardTitle className="text-lg">Delete Review</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Are you sure you want to delete this review? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setDeletingReviewId(null);
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleDeleteReview}
                  disabled={deleteReview.loading}
                  className="flex-1 bg-red-600 hover:bg-red-700"
                >
                  {deleteReview.loading ? 'Deleting...' : 'Delete'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
