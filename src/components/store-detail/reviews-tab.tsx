import React, { useEffect, useMemo, useState, useCallback } from "react";
import {
  Star,
  CheckCircle,
  MessageSquare,
  ThumbsUp,
  Share2,
  Pencil,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  useReviewStore,
  type Review as BaseReview,
} from "@/stores/reviewStore";
import { useAuthStore } from "@/stores/authStore";
import { reviewApi } from "@/lib/api";
import { ReviewModal } from "@/components/store-detail/ReviewModal";
import { useStoreDetails } from "@/stores/storeDetailsStore";
import { RatingBreakdown } from "@/components/store-detail/RatingBreakdown";

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

interface ExtendedReview extends BaseReview {
  verified?: boolean;
  helpful?: number;
  response?: ReviewResponse | null;
}

function ReviewDetailModal({
  review,
  isOpen,
  onClose,
}: {
  review: ExtendedReview | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!review) return null;

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
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
                {review.user?.name?.charAt(0) || "A"}
              </span>
            )}
          </div>
          <div>
            <div className="font-medium text-sm">
              {review.user?.name || "Anonymous"}
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>Posted {formatDate(review.createdAt)}</span>
              {review.dateOfPurchase && (
                <>
                  <span>•</span>
                  <span>
                    Experienced on {formatDate(review.dateOfPurchase)}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= (review.rating || 0)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium">{review.rating}.0</span>
            </div>

            {review.title && (
              <h3 className="text-lg font-semibold">{review.title}</h3>
            )}

            <p className="text-gray-700 whitespace-pre-wrap">
              {review.comment}
            </p>

            {review.orderNumber && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Verified Purchase</span>
                <span>•</span>
                <span>Order #{review.orderNumber}</span>
              </div>
            )}

            <div className="flex items-center gap-4 pt-4">
              <Button variant="outline" size="sm" className="text-sm">
                <ThumbsUp className="w-4 h-4 mr-2" /> Helpful (
                {review.helpful || 0})
              </Button>
              <Button variant="outline" size="sm" className="text-sm">
                <Share2 className="w-4 h-4 mr-2" /> Share
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ReviewCard({
  review,
  isUserReview = false,
  onEdit,
  onDelete,
}: {
  review: ExtendedReview;
  isUserReview?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}) {
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [isHelpful, setIsHelpful] = useState(false);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <>
      <div className="p-3 space-y-2">
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
                  {review.user?.name?.charAt(0) || "A"}
                </span>
              )}
            </div>
            <div>
              <h4 className="text-sm text-gray-900">
                {review.user?.name || "Anonymous"}
              </h4>
              <p className="text-xs text-gray-500">
                {formatDate(review.createdAt)}
              </p>
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

        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-4 h-4 ${
                star <= (review.rating || 0)
                  ? "text-yellow-400 fill-current"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>

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

          {review.verified && (
            <div className="flex items-center gap-1 text-green-600 text-xs">
              <CheckCircle className="w-3 h-3" /> Verified Purchase
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className={`text-xs text-gray-600 hover:text-gray-900 h-7 px-2 ${
              isHelpful ? "text-blue-600" : ""
            }`}
            onClick={() => setIsHelpful((v) => !v)}
          >
            <ThumbsUp
              className={`w-3 h-3 mr-1 ${isHelpful ? "fill-current" : ""}`}
            />
            Helpful ({(review.helpful || 0) + (isHelpful ? 1 : 0)})
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-gray-600 hover:text-gray-900 h-7 px-2"
          >
            <Share2 className="w-3 h-3 mr-1" /> Share
          </Button>
        </div>
      </div>

      <ReviewDetailModal
        review={review}
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
      />
    </>
  );
}

// CategoryRatings moved inside RatingBreakdown

export interface ReviewsTabProps {
  storeId: string;
}

export function ReviewsTab({ storeId }: ReviewsTabProps) {
  const { user } = useAuthStore();
  const currentUserId = user?.id;

  const [reviewSort, setReviewSort] = useState("newest");
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [reviews, setReviews] = useState<ExtendedReview[]>([]);
  const [reviewSummary, setReviewSummary] = useState<any>(null);
  const [summaryLoading, setSummaryLoading] = useState(false);

  const { storeDetails } = useStoreDetails();
  const storeName = storeDetails.data?.name;
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setReviewsLoading(true);
      setSummaryLoading(true);

      try {
        // Fetch both reviews and summary in parallel
        const [reviewsData, summaryData] = await Promise.all([
          reviewApi.getStoreReviews(storeId),
          reviewApi.getReviewSummary(storeId),
        ]);

        setReviews(reviewsData);
        setReviewSummary(summaryData);
      } catch (err) {
        console.error("Error fetching review data:", err);
        setReviews([]);
        setReviewSummary(null);
      } finally {
        setReviewsLoading(false);
        setSummaryLoading(false);
      }
    }

    if (storeId) {
      fetchData();
    }
  }, [storeId]);

  // Function to refresh both reviews and summary
  const refreshReviews = useCallback(async () => {
    setReviewsLoading(true);
    setSummaryLoading(true);
    try {
      const [reviewsData, summaryData] = await Promise.all([
        reviewApi.getStoreReviews(storeId),
        reviewApi.getReviewSummary(storeId),
      ]);
      setReviews(reviewsData);
      setReviewSummary(summaryData);
    } catch (err) {
      console.error("Error refreshing reviews:", err);
    } finally {
      setReviewsLoading(false);
      setSummaryLoading(false);
    }
  }, [storeId]);

  // Remove the duplicate useEffect that was calling fetchUserReviews
  // const { userReviews, fetchUserReviews } = useReviewStore();
  // const { data: userReviewsData = [] } = userReviews;

  const allReviews: ExtendedReview[] = useMemo(() => {
    // Since we're only using the direct API call, all reviews come from the same source
    return reviews;
  }, [reviews]);

  const totalReviews = allReviews.length;
  const averageRating = useMemo(() => {
    // Use summary data if available, otherwise calculate from reviews
    if (reviewSummary?.overallRating?.rating) {
      return reviewSummary.overallRating.rating;
    }
    if (!totalReviews) return 0;
    const sum = allReviews.reduce((acc, r) => acc + (r.rating || 0), 0);
    return sum / totalReviews;
  }, [reviewSummary, allReviews, totalReviews]);

  const ratingBreakdown = useMemo(() => {
    // Use summary data if available, otherwise calculate from reviews
    if (reviewSummary?.ratingDistribution) {
      return reviewSummary.ratingDistribution;
    }
    const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    for (const review of allReviews) {
      const stars = Math.round(review.rating || 0);
      if (stars >= 1 && stars <= 5) counts[stars] += 1;
    }
    return counts;
  }, [reviewSummary, allReviews]);

  const [selectedStars, setSelectedStars] = useState<number[]>([]);
  function handleToggleStar(star: number) {
    setSelectedStars((prev) =>
      prev.includes(star) ? prev.filter((s) => s !== star) : [...prev, star]
    );
  }

  const filteredByStars = useMemo(() => {
    if (selectedStars.length === 0) return allReviews;
    return allReviews.filter((r) =>
      selectedStars.includes(Math.round(r.rating || 0))
    );
  }, [allReviews, selectedStars]);

  const sortedReviews = useMemo(() => {
    const list = [...filteredByStars];
    switch (reviewSort) {
      case "highest":
        return list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case "lowest":
        return list.sort((a, b) => (a.rating || 0) - (b.rating || 0));
      case "helpful":
        return list.sort((a, b) => (b.helpful || 0) - (a.helpful || 0));
      case "newest":
      default:
        return list.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }
  }, [filteredByStars, reviewSort]);

  const displayedReviews = sortedReviews;

  return (
    <section className="py-2 px-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-semibold">See what customers say</h2>
        <div className="flex items-center gap-4">
          {displayedReviews.length > 0 && (
            <Button
              onClick={() => setIsWriteReviewOpen(true)}
              //disabled={!accessToken}
            >
              Write a Review
            </Button>
          )}
          <Select value={reviewSort} onValueChange={setReviewSort}>
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

      <div className="min-h-[300px]">
        {reviewsLoading ? (
          <div className="py-16 text-center text-gray-500 text-sm">
            Loading reviews…
          </div>
        ) : totalReviews > 0 ? (
          <>
            <RatingBreakdown
              averageRating={averageRating}
              breakdown={ratingBreakdown}
              totalReviews={totalReviews}
              selectedStars={selectedStars}
              onToggleStar={handleToggleStar}
              reviewSources={reviewSummary?.reviewSources}
            />

            <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-6">
              {displayedReviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white border border-gray-200 rounded-lg shadow-sm"
                >
                  <ReviewCard
                    review={review}
                    isUserReview={review.userId === currentUserId}
                  />
                </div>
              ))}
            </div>

            <div className="md:hidden">
              <div className="overflow-x-auto scrollbar-hide">
                <div
                  className="flex gap-4 pb-4"
                  style={{ width: `${displayedReviews.length * 300}px` }}
                >
                  {displayedReviews.map((review) => (
                    <div
                      key={review.id}
                      className="flex-shrink-0 w-[280px] bg-white border border-gray-200 rounded-lg shadow-sm"
                    >
                      <ReviewCard
                        review={review}
                        isUserReview={review.userId === currentUserId}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center gap-2 mt-4">
                {displayedReviews.map((_, index) => (
                  <div
                    key={index}
                    className="w-2 h-2 rounded-full bg-gray-300"
                  />
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="py-16 flex flex-col items-center justify-center text-center px-4">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
              <MessageSquare className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No reviews yet
            </h3>
            <p className="text-gray-600 max-w-md text-sm">
              Be the first to share your experience with this store.
            </p>
            <Button
              className="mt-4"
              onClick={() => setIsWriteReviewOpen(true)}
              //disabled={!accessToken}
            >
              Write a Review
            </Button>
          </div>
        )}
      </div>

      <ReviewModal
        isOpen={isWriteReviewOpen}
        onClose={() => setIsWriteReviewOpen(false)}
        storeId={storeId}
        storeName={storeName}
        onRefresh={refreshReviews}
      />
    </section>
  );
}
