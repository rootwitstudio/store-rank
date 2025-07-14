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
  Link as LinkIcon,
  Clock,
  Truck,
  Tag,
  X,
  ThumbsUp,
  Share2,
  Pencil,
  Trash2,
  XCircle,
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ReviewModal } from "@/components/store-detail/ReviewModal";
import { useStoreDetails, type StoreDetails } from "@/stores/storeDetailsStore";
import { useReviewStore, type Review as BaseReview } from "@/stores/reviewStore";
import { useAuthStore, type User } from "@/stores/authStore";
import { useQuery } from "@tanstack/react-query";
import { reviewApi } from "@/lib/api";

// Remove the Review interface and keep only ReviewResponse
interface ReviewResponse {
  comment: string;
  createdAt: string;
  userId: string;
  user: {
    id: string;
    name: string;
    picture?: string;
  };
}

// Extend the base Review interface with our additional properties
interface ExtendedReview extends BaseReview {
  verified?: boolean;
  helpful?: number;
  response?: ReviewResponse | null;
}

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

function ReviewDetailModal({ 
  review, 
  isOpen, 
  onClose 
}: { 
  review: ExtendedReview | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!review) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header with user info */}
        <div className="flex items-center gap-3 p-6 border-b shrink-0">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
            {review.user?.picture ? (
              <img
                src={review.user.picture}
                alt={review.user.name}
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <span className="text-lg font-medium text-blue-600">
                {review.user?.name?.charAt(0) || 'A'}
              </span>
            )}
          </div>
          <div>
            <div className="font-medium text-sm">{review.user?.name || 'Anonymous'}</div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>Posted {formatDate(review.createdAt)}</span>
              {review.dateOfPurchase && (
                <>
                  <span>•</span>
                  <span>Experienced on {formatDate(review.dateOfPurchase)}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Review content - scrollable */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= review.rating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium">{review.rating}.0</span>
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold">{review.title}</h3>

            {/* Review text */}
            <p className="text-gray-700 whitespace-pre-wrap">{review.comment}</p>

            {/* Purchase info */}
            {review.orderNumber && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Verified Purchase</span>
                <span>•</span>
                <span>Order #{review.orderNumber}</span>
              </div>
            )}

            {/* Helpful and Share buttons */}
            <div className="flex items-center gap-4 pt-4">
              <Button
                variant="outline"
                size="sm"
                className="text-sm"
                onClick={() => {}}
              >
                <ThumbsUp className="w-4 h-4 mr-2" />
                Helpful ({review.helpful || 0})
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-sm"
                onClick={() => {}}
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ReviewCard({ review, isUserReview = false, onEdit, onDelete }: { 
  review: ExtendedReview; 
  isUserReview?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}) {
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [isHelpful, setIsHelpful] = useState(false);
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <div className="p-3 space-y-2">
        {/* Header with user info and actions */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
              {review.user?.picture ? (
                <img
                  src={review.user.picture}
                  alt={review.user.name}
                  className="w-7 h-7 rounded-full object-cover"
                />
              ) : (
                <span className="text-xs font-medium text-blue-600">
                  {review.user?.name?.charAt(0) || 'A'}
                </span>
              )}
            </div>
            <div>
              <h4 className="text-sm text-gray-900">{review.user?.name || 'Anonymous'}</h4>
              <p className="text-xs text-gray-500">{formatDate(review.createdAt)}</p>
            </div>
          </div>

          {isUserReview && (
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={onEdit}
                className="h-7 w-7 p-0"
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onDelete}
                className="h-7 w-7 p-0"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-4 h-4 ${
                star <= review.rating
                  ? "text-yellow-400 fill-current"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Review content */}
        <div className="space-y-2">
          <div>
            {review.comment.length > 250 ? (
              <>
                <p className="text-sm text-gray-700 leading-relaxed line-clamp-4">
                  {review.comment}
                </p>
                <button 
                  onClick={() => setShowDetailModal(true)}
                  className="text-xs font-medium text-blue-600 hover:text-blue-700 mt-1"
                >
                  Show more
                </button>
              </>
            ) : (
              <p className="text-sm text-gray-700 leading-relaxed">
                {review.comment}
              </p>
            )}
          </div>

          {/* Purchase verification */}
          {review.verified && (
            <div className="flex items-center gap-1 text-green-600 text-xs">
              <CheckCircle className="w-3 h-3" />
              Verified Purchase
            </div>
          )}
        </div>

        {/* Helpful/Share buttons */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className={`text-xs text-gray-600 hover:text-gray-900 h-7 px-2 ${isHelpful ? 'text-blue-600' : ''}`}
            onClick={() => setIsHelpful(!isHelpful)}
          >
            <ThumbsUp className={`w-3 h-3 mr-1 ${isHelpful ? 'fill-current' : ''}`} />
            Helpful ({(review.helpful || 0) + (isHelpful ? 1 : 0)})
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-gray-600 hover:text-gray-900 h-7 px-2"
          >
            <Share2 className="w-3 h-3 mr-1" />
            Share
          </Button>
        </div>
      </div>

      {/* Review Detail Modal */}
      <ReviewDetailModal
        review={review}
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
      />
    </>
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
  const [reviewFilter, setReviewFilter] = useState("all");
  const [reviewSort, setReviewSort] = useState("newest");
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [showEditReview, setShowEditReview] = useState(false);
  const [editingReview, setEditingReview] = useState<ExtendedReview | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletingReviewId, setDeletingReviewId] = useState<string | null>(null);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);
  
  const { user, accessToken } = useAuthStore();
  const currentUserId = user?.id;
  const { userReviews, fetchUserReviews, removeReview } = useReviewStore();
  const { data: userReviewsData = [] } = userReviews;
  
  const { storeDetails, fetchStore } = useStoreDetails();
  const { data: store, loading: storeLoading, error: storeError } = storeDetails;
  
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [reviews, setReviews] = useState<ExtendedReview[]>([]);

  // Initialize auth state
  useEffect(() => {
    if (typeof window !== 'undefined') {
      useAuthStore.getState().initialize();
    }
  }, []);

  // Fetch store reviews
  useEffect(() => {
    async function fetchStoreReviews() {
      if (!storeId || !accessToken) return;
      
      setReviewsLoading(true);
      try {
        const data = await reviewApi.getStoreReviews(storeId, accessToken);
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        // Just set empty reviews on error instead of showing error screen
        setReviews([]);
      } finally {
        setReviewsLoading(false);
      }
    }

    fetchStoreReviews();
  }, [storeId, accessToken]);

  useEffect(() => {
    if (storeId) {
      fetchStore(storeId);
      
      if (accessToken && currentUserId) {
        // fetchUserReviews(currentUserId, accessToken);
      }
    }
  }, [storeId, fetchStore, currentUserId, accessToken]);

  // Refetch user reviews when page comes into focus
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        if (accessToken && currentUserId && storeId) {
          console.log('Page focused - refetching user reviews');
          // fetchUserReviews(currentUserId, accessToken);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [currentUserId, storeId, accessToken]);

  // Handle scroll for sticky header
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsHeaderSticky(scrollPosition > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleEditReview = (review: ExtendedReview) => {
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

  // Filter user reviews for this store
  const storeUserReviews = (userReviewsData || []).filter((review: BaseReview) => 
    review && review.storeId === storeId
  );
  
  // Filter out user's reviews from store reviews to avoid duplicates
  const otherReviews = reviews.filter((review: ExtendedReview) => 
    review && review.userId !== currentUserId
  );
  
  // Combine reviews with user reviews at top
  const allReviews = [...storeUserReviews, ...otherReviews];
  const showViewAllButton = allReviews.length > 4;
  const displayedReviews = showViewAllButton ? allReviews.slice(0, 4) : allReviews;

  // Remove the error section since we're handling errors differently now
  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-200 ${
          isHeaderSticky ? "shadow-md translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="font-medium">{(store?.rating || 0).toFixed(1)}</span>
              </div>
            </div>
            <Button 
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => setShowWriteReview(true)}
            >
              Write Review
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Store Header */}
        <div className="mb-8">
          <div className="flex gap-6 justify-between">
            {/* Left Section - Logo and Store Info */}
            <div className="flex gap-6 flex-1">
              <div className="flex-shrink-0">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center shadow-lg">
                  {store?.logo ? (
                    <img
                      src={store.logo}
                      alt={`${store?.name} logo`}
                      className="w-24 h-24 object-contain rounded-xl"
                    />
                  ) : (
                    <span className="text-4xl font-bold text-blue-600">
                      {store?.name?.charAt(0) || 'S'}
                    </span>
                  )}
                </div>
              </div>

              {/* Middle Section - Store Details */}
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-3xl font-bold text-gray-900">{store?.name}</h1>
                      <div className="flex items-center gap-2">
                        {store?.verified && (
                          <Badge className="bg-green-100 text-green-800 border-green-200">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Verified Store
                          </Badge>
                        )}
                        {store?.claimed && (
                          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                            <ShieldCheck className="w-3 h-3 mr-1" />
                            Claimed Profile
                          </Badge>
                        )}
                      </div>
                      <div className="flex gap-3 ml-auto">
                        <Button
                          className="bg-blue-600 hover:bg-blue-700"
                          onClick={() => setShowWriteReview(true)}
                        >
                          Write Review
                        </Button>
                        {store?.website && (
                          <Button
                            variant="outline"
                            asChild
                          >
                            <a href={ensureHttps(store.website)} target="_blank" rel="noopener noreferrer">
                              <Globe className="w-4 h-4 mr-2" />
                              Visit Website
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-6 mb-4">
                      <div className="flex items-center gap-2">
                        <StarRating rating={store?.rating || 0} size="md" />
                        <span className="text-xl font-bold text-gray-900">
                          {(store?.rating || 0).toFixed(1)}
                        </span>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-600">
                          {store?.totalRatings || 0} reviews
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {store?.description}
                    </p>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-blue-50 rounded-lg p-4">
                        <div className="text-2xl font-bold text-blue-700">98%</div>
                        <div className="text-sm text-blue-600">Trust Score</div>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <div className="text-2xl font-bold text-blue-700">95%</div>
                        <div className="text-sm text-blue-600">Response Rate</div>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <div className="text-2xl font-bold text-blue-700">2h</div>
                        <div className="text-sm text-blue-600">Avg. Response Time</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section - Rating Distribution */}
            <div className="w-96 flex-shrink-0">
              <Card className="bg-white shadow-sm">
                <CardContent className="p-4">
                  <div className="flex gap-6">
                    {/* Left Section - Rating Overview */}
                    <div className="flex flex-col items-center">
                      <div className="text-4xl font-bold text-gray-900">{(store?.rating || 4.7).toFixed(1)}</div>
                      <div className="flex items-center gap-0.5 my-1">
                        {[1, 2, 3, 4].map((star) => (
                          <Star
                            key={star}
                            className="w-4 h-4 text-yellow-400 fill-current"
                          />
                        ))}
                        {[5].map((star) => (
                          <Star
                            key={star}
                            className="w-4 h-4 text-gray-200"
                            fill="#e5e7eb"
                          />
                        ))}
                      </div>
                      <div className="text-xs text-gray-600">{store?.totalRatings || '1,234'} reviews</div>
                    </div>

                    {/* Right Section - Rating Bars */}
                    <div className="flex-1 space-y-1">
                      {[5, 4, 3, 2, 1].map((rating) => {
                        const percentage = rating === 5 ? 65 : 
                                       rating === 4 ? 20 : 
                                       rating === 3 ? 10 : 
                                       rating === 2 ? 3 : 2;
                        const barColor = rating >= 4 ? 'bg-green-500' :
                                     rating === 3 ? 'bg-yellow-400' :
                                     'bg-red-500';
                        return (
                          <div key={rating} className="flex items-center gap-2">
                            <div className="w-4 text-xs font-medium text-gray-600">
                              {rating}
                            </div>
                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${barColor} rounded-full`}
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <div className="w-8 text-xs text-right text-gray-500">
                              {percentage}%
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Reviews List */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">See what customer says</h2>
              <div className="flex items-center gap-4">
                <Select
                  value={reviewSort}
                  onValueChange={setReviewSort}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort reviews" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Most Recent</SelectItem>
                    <SelectItem value="helpful">Most Helpful</SelectItem>
                    <SelectItem value="highest">Highest Rated</SelectItem>
                    <SelectItem value="lowest">Lowest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Reviews Grid with minimum height */}
            <div className="min-h-[600px]">
              {displayedReviews.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {displayedReviews.map((review) => (
                    <ReviewCard
                      key={review.id}
                      review={review}
                      isUserReview={review.userId === currentUserId}
                      onEdit={review.userId === currentUserId ? () => handleEditReview(review) : undefined}
                      onDelete={review.userId === currentUserId ? () => handleDeleteConfirm(review.id) : undefined}
                    />
                  ))}
                </div>
              ) : (
                <div className="h-[600px] flex flex-col items-center justify-center text-center px-4">
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                    <MessageSquare className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No reviews yet</h3>
                  <p className="text-gray-600 mb-8 max-w-md">
                    Be the first to share your experience with this store. Your review helps others make informed decisions.
                  </p>
                  <Button
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={() => setShowWriteReview(true)}
                  >
                    Write a Review
                  </Button>
                </div>
              )}
            </div>

            {/* View All Reviews Button */}
            {showViewAllButton && (
              <div className="text-center mt-8">
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => setShowAllReviews(true)}
                  className="min-w-[200px]"
                >
                  View All Reviews ({allReviews.length} reviews)
                </Button>
              </div>
            )}
            
          </div>

          {/* Right Sidebar */}
          <div>
            {/* Trust Information Card */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  Why Trust Our Reviews?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 text-blue-600">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <p className="text-sm text-gray-700">
                      Only verified purchases can leave reviews
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 text-blue-600">
                      <Users className="w-5 h-5" />
                    </div>
                    <p className="text-sm text-gray-700">
                      Reviews are collected from real customers across multiple platforms
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 text-blue-600">
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                    <p className="text-sm text-gray-700">
                      Advanced AI system detects and prevents fake reviews
                    </p>
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg mt-4">
                  <p className="text-sm text-blue-800">
                    Want to learn more about our review verification process?{' '}
                    <a href="/faq" className="text-blue-600 hover:underline">Read our FAQ</a>
                  </p>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>

        {/* Business Information Section */}
                    <div className="mt-8 px-4">
              {/* Grid layout for Headers and Content */}
              <div className="grid grid-cols-3 gap-8">
                {/* Company Details Header and Content - Left Side (2/3) */}
                <div className="col-span-2 space-y-6">
                  <h2 className="text-2xl font-semibold">Business Information</h2>
                  
                  {/* Categories */}
                  <div className="flex flex-wrap gap-2">
                    {store?.storeCategories?.map((category) => (
                      <Badge 
                        key={category.id} 
                        variant="outline" 
                        className="px-4 py-1.5 text-sm text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors border-blue-200"
                      >
                        {category.name}
                      </Badge>
                    ))}
                  </div>

                  {/* Tags */}
                  {store?.tags && store.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {store.tags.map((tag, index) => (
                        <Badge 
                          key={index} 
                          variant="secondary" 
                          className="px-3 py-1 text-xs bg-blue-100 text-blue-800 border-blue-200 rounded-none"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Description */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-medium text-gray-900">Information provided by various external sources</h3>
                    <p className="text-gray-600 leading-relaxed">{store?.description}{store?.description}{store?.description}</p>
                  </div>
                </div>

                {/* Contact Information Header and Content - Right Side (1/3) */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold">Contact Information</h2>
                  
                  {/* Mobile */}
                  {store?.mobile && (
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                      <div className="flex-shrink-0">
                        <Phone className="w-5 h-5 text-gray-400" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Mobile</div>
                        <div className="text-gray-900 font-medium">{store.mobile}</div>
                      </div>
                    </div>
                  )}
                  
                  {/* Location */}
                  {(store?.state || store?.country) && (
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                      <div className="flex-shrink-0">
                        <MapPin className="w-5 h-5 text-gray-400" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Location</div>
                        <div className="text-gray-900 font-medium">
                          {[
                            store?.state,
                            store?.country
                          ]
                            .filter(Boolean)
                            .join(', ')}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Website */}
                  {store?.website && (
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                      <div className="flex-shrink-0">
                        <Globe className="w-5 h-5 text-gray-400" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Website</div>
                        <a 
                          href={ensureHttps(store.website)} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline font-medium"
                        >
                          {store.website}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
        {/* Business Claim Section */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-8 mt-12">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Is this your business?</h2>
            <p className="text-gray-600 mb-6">
              Claim your listing for free to respond to reviews, update your profile and manage your listing.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Claim your business
            </Button>
          </div>
        </div>

        {/* Similar Businesses Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Similar businesses you may also like</h2>
            <Button variant="link" className="text-blue-600 hover:text-blue-700">
              See more Marketplace Businesses
              <ArrowLeft className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "TJ Maxx",
                logo: "/path/to/logo1.png",
                rating: 3.5,
                reviews: 484
              },
              {
                name: "Skyye",
                logo: "/path/to/logo2.png",
                rating: 5,
                reviews: 1
              },
              {
                name: "BHFO",
                logo: "/path/to/logo3.png",
                rating: 3,
                reviews: 664
              }
            ].map((business, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                      {business.logo ? (
                        <img
                          src={business.logo}
                          alt={`${business.name} logo`}
                          className="w-12 h-12 object-contain"
                        />
                      ) : (
                        <span className="text-xl font-bold text-blue-600">
                          {business.name.charAt(0)}
                        </span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{business.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < business.rating
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">
                          {business.reviews} reviews
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Review Modal */}
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

      {/* All Reviews Modal */}
      <Dialog open={showAllReviews} onOpenChange={setShowAllReviews}>
        <DialogContent className="max-w-4xl h-[90vh] p-0">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">All Reviews</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowAllReviews(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <Select
                value={reviewFilter}
                onValueChange={setReviewFilter}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter reviews" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Reviews</SelectItem>
                  <SelectItem value="verified">Verified Purchases</SelectItem>
                  <SelectItem value="with_photos">With Photos</SelectItem>
                  <SelectItem value="positive">Positive Reviews</SelectItem>
                  <SelectItem value="critical">Critical Reviews</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={reviewSort}
                onValueChange={setReviewSort}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort reviews" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Most Recent</SelectItem>
                  <SelectItem value="helpful">Most Helpful</SelectItem>
                  <SelectItem value="highest">Highest Rated</SelectItem>
                  <SelectItem value="lowest">Lowest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="overflow-y-auto h-full p-6">
            <div className="space-y-6">
              {allReviews.map((review) => (
                <ReviewCard 
                  key={review.id} 
                  review={review}
                  isUserReview={review.userId === currentUserId}
                  onEdit={review.userId === currentUserId ? () => handleEditReview(review) : undefined}
                  onDelete={review.userId === currentUserId ? () => handleDeleteConfirm(review.id) : undefined}
                />
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

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
                  // disabled={deleteReview.loading} // This line was removed from imports
                  className="flex-1 bg-red-600 hover:bg-red-700"
                >
                  {/* {deleteReview.loading ? 'Deleting...' : 'Delete'} */}
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
