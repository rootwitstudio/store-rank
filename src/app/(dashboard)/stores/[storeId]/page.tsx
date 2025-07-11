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
  Share2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ReviewModal } from "@/components/store-detail/ReviewModal";
import { useStoreDetails } from "@/stores/storeDetailsStore";
import { useReviewStore, type Review as BaseReview } from "@/stores/reviewStore";
import { useAuthStore } from "@/stores/authStore";

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

function generateDummyReviews(count: number): ExtendedReview[] {
  const reviewTitles = [
    "Great experience!",
    "Excellent service",
    "Could be better",
    "Outstanding quality",
    "Highly recommended",
    "Not what I expected",
    "Amazing customer service",
    "Will shop again",
    "Mixed feelings",
    "Fantastic store"
  ];

  const reviewComments = [
    "The products arrived quickly and were exactly as described. Very satisfied with my purchase! The packaging was excellent and everything arrived in perfect condition. The customer service team was also very helpful when I had questions about my order. I would definitely recommend this store to others looking for quality products and reliable service. The prices were competitive and the shipping was fast.",
    "Customer service was exceptional. They went above and beyond to help me with my purchase. The team was knowledgeable and patient in answering all my questions. The product quality exceeded my expectations and arrived earlier than expected. I've already recommended this store to several friends and family members.",
    "Quality is good but shipping took longer than expected. While the product itself meets my needs, I think there could be improvements in the delivery process. Communication about shipping delays could have been better. However, the customer service team was responsive when I reached out about the delay.",
    "One of the best online shopping experiences I've had. Will definitely return! The website was easy to navigate, the checkout process was smooth, and the product arrived well-packaged and on time. The quality is excellent and exactly as described in the product details.",
    "Great selection of products and competitive prices. The store offers a wide range of options to choose from, and their prices are very reasonable compared to other retailers. The quality of the items I received was excellent, and the shipping was fast and reliable.",
    "Had some issues with my order but customer service resolved them quickly. While there was an initial problem with my delivery, the support team was very professional and efficient in handling the situation. They provided regular updates and made sure I was satisfied with the resolution.",
    "Everything was perfect from ordering to delivery. The website is user-friendly, the product descriptions are accurate, and the checkout process is seamless. The packaging was secure, and the delivery was right on schedule. I'm very impressed with the overall service.",
    "The quality exceeded my expectations. Highly recommend! The attention to detail in both the product and service is remarkable. The store clearly values customer satisfaction and it shows in every aspect of their business. I'll definitely be a repeat customer.",
    "Good overall experience but there's room for improvement. While the product quality is good and customer service is helpful, the website could be more intuitive and the shipping tracking could be more detailed. Still, I would recommend this store to others.",
    "Very professional and reliable store. A pleasure to do business with. From the moment I placed my order to receiving the package, everything was handled professionally. The communication was clear, the delivery was on time, and the product quality is excellent."
  ];

  const userNames = [
    "John D.",
    "Sarah M.",
    "Michael R.",
    "Emma W.",
    "David L.",
    "Lisa K.",
    "Robert P.",
    "Anna S.",
    "James B.",
    "Maria C."
  ];

  // Generate random avatar URLs using DiceBear API
  const getAvatarUrl = (seed: string) => `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;

  return Array.from({ length: count }, (_, i) => {
    const createdAt = new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString();
    const hasResponse = Math.random() > 0.7;
    const hasPurchaseProof = Math.random() > 0.7;
    const userName = userNames[i % userNames.length];
    const verified = Math.random() > 0.3;
    
    return {
      id: `review-${i + 1}`,
      userId: `user-${i + 1}`,
      storeId: "store-1",
      rating: Math.floor(Math.random() * 3) + 3, // Generates 3-5 star ratings
      title: reviewTitles[i % reviewTitles.length],
      comment: reviewComments[i % reviewComments.length],
      createdAt,
      updatedAt: createdAt,
      dateOfPurchase: new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000).toISOString(),
      orderNumber: `ORD-${Math.random().toString(36).substring(7).toUpperCase()}`,
      attachments: Math.random() > 0.8 ? ["product-photo.jpg"] : [],
      purchaseProof: hasPurchaseProof ? `proof-${Math.random().toString(36).substring(7)}` : "",
      verified,
      helpful: Math.floor(Math.random() * 50),
      user: {
        id: `user-${i + 1}`,
        name: userName,
        picture: getAvatarUrl(userName)
      },
      response: hasResponse ? {
        comment: "Thank you for your feedback! We appreciate your business and are glad you had a positive experience. Our team works hard to provide the best service possible, and we're happy to hear that it shows. Please don't hesitate to reach out if you need anything else.",
        createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        userId: "store-admin",
        user: {
          id: "store-admin",
          name: "Store Support",
          picture: getAvatarUrl("store-support")
        }
      } : null,
      replies: []
    };
  });
}

// Add new ReviewDetailModal component before ReviewCard
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
      <DialogContent className="max-w-2xl">
        <div className="space-y-4">
          {/* Header with user info */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
              {review.user?.picture ? (
                <img
                  src={review.user.picture}
                  alt={review.user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <span className="text-lg font-semibold text-blue-600">
                  {review.user?.name?.charAt(0) || 'U'}
                </span>
              )}
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">{review.user?.name}</h4>
              <p className="text-sm text-gray-500">{formatDate(review.createdAt)}</p>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <StarRating rating={review.rating} size="md" />
            <span className="font-medium text-gray-900">{review.rating}</span>
            {review.title && (
              <>
                <span className="text-gray-500">•</span>
                <span className="text-gray-900">{review.title}</span>
              </>
            )}
          </div>

          {/* Review content */}
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {review.comment}
          </p>

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

          {/* Helpful/Share buttons */}
          <div className="flex items-center gap-4 pt-4 border-t">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 hover:text-gray-900"
            >
              <ThumbsUp className="w-4 h-4 mr-2" />
              Helpful ({review.helpful || 0})
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 hover:text-gray-900"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
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
      <div className="p-4 space-y-3">
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
                  {review.user?.name?.charAt(0) || 'U'}
                </span>
              )}
            </div>
            <div>
              <h4 className="text-sm text-gray-900">{review.user?.name}</h4>
              <p className="text-xs text-gray-500">{formatDate(review.createdAt)}</p>
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

        {/* Rating and Title */}
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
          <span className="text-sm font-medium text-gray-900">{review.rating}</span>
          <span className="text-gray-500">•</span>
          <span className="text-sm text-gray-600">{review.title}</span>
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
                  className="text-xs font-medium text-blue-600 hover:text-blue-700 mt-2"
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
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className={`text-xs text-gray-600 hover:text-gray-900 h-8 px-3 ${isHelpful ? 'text-blue-600' : ''}`}
            onClick={() => setIsHelpful(!isHelpful)}
          >
            <ThumbsUp className={`w-3 h-3 mr-1.5 ${isHelpful ? 'fill-current' : ''}`} />
            Helpful ({(review.helpful || 0) + (isHelpful ? 1 : 0)})
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-gray-600 hover:text-gray-900 h-8 px-3"
          >
            <Share2 className="w-3 h-3 mr-1.5" />
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

  const { user, accessToken } = useAuthStore();
  const currentUserId = user?.id || "d9c9e39d-b50d-40be-9974-880bb2fe8c57"; // fallback

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

  // Handle scroll for sticky header
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsHeaderSticky(offset > 200);
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
  const storeUserReviews = (userReviewsData || []).filter(review => 
    review && review.storeId === storeId
  );
  
  // Filter out user's reviews from store reviews to avoid duplicates
  const otherReviews = (reviews || []).filter(review => 
    review && review.userId !== currentUserId
  );
  
  // Combine reviews with user reviews at top
  const dummyReviews: ExtendedReview[] = generateDummyReviews(20); // Changed back to 20 reviews
  const allReviews = [...(storeUserReviews || []), ...dummyReviews];
  const showViewAllButton = allReviews.length > 4;
  const displayedReviews = showViewAllButton ? allReviews.slice(0, 4) : allReviews;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600 text-lg">Loading store details...</p>
        </div>
      </div>
    );
  }

  if (error || !store) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-red-500" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {error ? "Error Loading Store" : "Store Not Found"}
          </h2>
          <p className="text-gray-600 mb-6">
            {error || "The store you're looking for doesn't exist."}
          </p>
          <div className="flex gap-3 justify-center">
            {error && (
              <Button onClick={() => fetchStore(storeId)} className="bg-blue-600 hover:bg-blue-700">
                Try Again
              </Button>
            )}
            <Button variant="outline" onClick={() => router.back()}>
              Go Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

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
                <span className="font-medium">{(store.rating || 0).toFixed(1)}</span>
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
                  {store.logo ? (
                    <img
                      src={store.logo}
                      alt={`${store.name} logo`}
                      className="w-24 h-24 object-contain rounded-xl"
                    />
                  ) : (
                    <span className="text-4xl font-bold text-blue-600">
                      {store.name?.charAt(0) || 'S'}
                    </span>
                  )}
                </div>
              </div>

              {/* Middle Section - Store Details */}
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-3xl font-bold text-gray-900">{store.name}</h1>
                      <div className="flex items-center gap-2">
                        {store.verified && (
                          <Badge className="bg-green-100 text-green-800 border-green-200">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Verified Store
                          </Badge>
                        )}
                        {store.claimed && (
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
                        {store.website && (
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
                        <StarRating rating={store.rating || 0} size="md" />
                        <span className="text-xl font-bold text-gray-900">
                          {(store.rating || 0).toFixed(1)}
                        </span>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-600">
                          {store.totalRatings || 0} reviews
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {store.description}
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
                      <div className="text-4xl font-bold text-gray-900">{(store.rating || 4.7).toFixed(1)}</div>
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
                      <div className="text-xs text-gray-600">{store.totalRatings || '1,234'} reviews</div>
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
                <CardTitle className="flex items-center gap-2 text-lg">
                  <ShieldCheck className="w-5 h-5 text-blue-600" />
                  Why Trust Our Reviews?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
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

            {/* Business Information Card */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  Business Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {store.foundedYear && (
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <div>
                      <div className="text-sm text-gray-500">Founded</div>
                      <div className="font-medium">{store.foundedYear}</div>
                    </div>
                  </div>
                )}
                {store.employeeCount && (
                  <div className="flex items-center gap-3">
                    <Users className="w-4 h-4 text-gray-500" />
                    <div>
                      <div className="text-sm text-gray-500">Employees</div>
                      <div className="font-medium">{store.employeeCount}</div>
                    </div>
                  </div>
                )}
                {store.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <div>
                      <div className="text-sm text-gray-500">Email</div>
                      <div className="font-medium break-all">{store.email}</div>
                    </div>
                  </div>
                )}
                {store.mobile && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <div>
                      <div className="text-sm text-gray-500">Phone</div>
                      <div className="font-medium">{store.mobile}</div>
                    </div>
                  </div>
                )}
                {store.website && (
                  <div className="flex items-center gap-3">
                    <Globe className="w-4 h-4 text-gray-500" />
                    <div>
                      <div className="text-sm text-gray-500">Website</div>
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
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Business Claim Section */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-8">
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
