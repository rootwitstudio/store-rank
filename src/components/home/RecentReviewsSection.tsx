"use client";
import { CheckCircle, Star, ThumbsUp } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { reviewApi } from "@/lib/api";

interface Review {
  id: string;
  title: string;
  comment: string;
  rating: number;
  createdAt: string;
  reviewType: "ORGANIC" | "VERIFIED" | "INVITED" | "REDIRECTED";
  user: {
    id: string;
    name: string;
    picture?: string;
  };
  store: {
    id: string;
    name: string;
    logo?: string;
  };
  replies: Array<{
    id: string;
    comment: string;
    createdAt: string;
    user: {
      id: string;
      name: string;
      picture?: string;
    };
  }>;
}

interface RecentReviewsSectionProps {
  initialReviews?: Review[];
}

// Reusable header component to eliminate duplication
function HeaderSection() {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-8 sm:mb-12 gap-4 sm:gap-0">
      <div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 text-gray-900">
          Recent Reviews
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl">
          Latest authentic reviews from verified customers across India
        </p>
      </div>
      <Link
        href="/reviews"
        className="text-blue-600 hover:text-blue-700 flex items-center text-sm sm:text-base font-medium group whitespace-nowrap self-start sm:self-auto"
      >
        View all
        <svg
          className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </Link>
    </div>
  );
}

export function RecentReviewsSection({
  initialReviews,
}: RecentReviewsSectionProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews || []);
  const [loading, setLoading] = useState(!initialReviews);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!initialReviews) {
      fetchRecentReviews();
    }
  }, [initialReviews]);

  const fetchRecentReviews = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await reviewApi.getAllReviews({
        page: 1,
        pageSize: 6,
        sortBy: "createdAt",
        sortOrder: "desc",
        //reviewType: 'VERIFIED', // Show verified reviews first
      });

      setReviews(response.reviews || []);
    } catch (err) {
      console.error("Error fetching recent reviews:", err);
      setError("Failed to load recent reviews");
      // Fallback to empty array to prevent crashes
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.ceil(diffDays / 30)} months ago`;
    return date.toLocaleDateString();
  };

  const getReviewText = (review: Review) => {
    return review.comment || review.title || "No review text available";
  };

  const getReviewerInitial = (review: Review) => {
    return review.user?.name?.charAt(0) || "U";
  };

  const isVerified = (review: Review) => {
    return review.reviewType === "VERIFIED";
  };

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <HeaderSection />

        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-100 p-6 animate-pulse"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-20"></div>
                      <div className="h-3 bg-gray-200 rounded w-16"></div>
                    </div>
                  </div>
                  <div className="h-3 bg-gray-200 rounded w-12"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-24 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-32 mb-3"></div>
                <div className="h-16 bg-gray-200 rounded mb-4"></div>
                <div className="flex justify-between">
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">{error}</p>
            <button
              onClick={fetchRecentReviews}
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && reviews.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No reviews available at the moment.</p>
          </div>
        )}

        {!loading && !error && reviews.length > 0 && (
          <>
            {/* Mobile: Horizontal scroll */}
            <div className="md:hidden">
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="flex-shrink-0 w-[280px] h-full bg-white rounded-xl border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 flex flex-col"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm mr-3">
                          {getReviewerInitial(review)}
                        </div>
                        <div>
                          <div className="flex items-center">
                            <span className="font-medium text-gray-900 truncate max-w-[100px]">
                              {review.user.name}
                            </span>
                            {isVerified(review) && (
                              <CheckCircle className="h-4 w-4 text-green-500 ml-2" />
                            )}
                          </div>
                          <div className="text-sm text-gray-500 truncate max-w-[100px]">
                            India
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-400">
                        {formatDate(review.createdAt)}
                      </div>
                    </div>

                    <div className="mb-3">
                      <Link
                        href={`/stores/${review.store.id}`}
                        className="text-blue-600 hover:text-blue-700 font-medium text-sm truncate max-w-[120px]"
                      >
                        {review.store.name}
                      </Link>
                      <span className="mx-2 text-gray-300">•</span>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded truncate max-w-[80px]">
                        {isVerified(review) ? "Verified" : review.reviewType}
                      </span>
                    </div>

                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm font-medium">
                        {review.rating}/5
                      </span>
                    </div>

                    <p className="text-gray-700 text-sm mb-4 line-clamp-3 min-h-[60px]">
                      {getReviewText(review)}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-2">
                      <button className="flex items-center text-gray-500 hover:text-blue-600 text-sm">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        Helpful ({review.replies.length})
                      </button>
                      <Link
                        href={`/stores/${review.store.id}`}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop: Grid layout */}
            <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 flex flex-col h-full"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm mr-3">
                        {getReviewerInitial(review)}
                      </div>
                      <div>
                        <div className="flex items-center">
                          <span className="font-medium text-gray-900 truncate max-w-[100px]">
                            {review.user.name}
                          </span>
                          {isVerified(review) && (
                            <CheckCircle className="h-4 w-4 text-green-500 ml-2" />
                          )}
                        </div>
                        <div className="text-sm text-gray-500 truncate max-w-[100px]">
                          India
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-400">
                      {formatDate(review.createdAt)}
                    </div>
                  </div>

                  <div className="mb-3">
                    <Link
                      href={`/stores/${review.store.id}`}
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm truncate max-w-[120px]"
                    >
                      {review.store.name}
                    </Link>
                    <span className="mx-2 text-gray-300">•</span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded truncate max-w-[80px]">
                      {isVerified(review) ? "Verified" : review.reviewType}
                    </span>
                  </div>

                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm font-medium">
                      {review.rating}/5
                    </span>
                  </div>

                  <p className="text-gray-700 text-sm mb-4 line-clamp-3 min-h-[60px]">
                    {getReviewText(review)}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-2">
                    <button className="flex items-center text-gray-500 hover:text-blue-600 text-sm">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      Helpful ({review.replies.length})
                    </button>
                    <Link
                      href={`/stores/${review.store.id}`}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
