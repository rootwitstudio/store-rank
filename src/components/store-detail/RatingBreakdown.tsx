"use client";

import { Star, Info } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface RatingSummaryCategory {
  label: string;
  score: number;
  href?: string;
}

interface RatingBreakdownProps {
  averageRating: number;
  breakdown: Record<number, number>;
  totalReviews: number;
  selectedStars?: number[];
  onToggleStar?: (star: number) => void;
  reviewSources?: {
    organic: number;
    verified: number;
    invited: number;
    redirected: number;
    total: number;
    period: string;
  };
}

function ReviewSources({
  reviewSources,
}: {
  reviewSources?: RatingBreakdownProps["reviewSources"];
}) {
  // Show loading state if no data yet
  if (!reviewSources) {
    return (
      <div className="space-y-2 md:space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="flex items-center justify-between text-xs md:text-sm"
          >
            <div className="flex items-center gap-2">
              <div className="w-16 h-3 bg-gray-200 rounded animate-pulse" />
              <Info className="w-3 h-3 text-gray-300" />
            </div>
            <div className="w-8 h-3 bg-gray-200 rounded animate-pulse" />
          </div>
        ))}
        <div className="border-t border-gray-200 pt-2 md:pt-3">
          <div className="flex items-center justify-between text-xs md:text-sm">
            <div className="w-32 h-3 bg-gray-200 rounded animate-pulse" />
            <div className="w-8 h-3 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2 md:space-y-3">
      <div className="flex items-center justify-between text-xs md:text-sm">
        <div className="flex items-center gap-2">
          <span className="text-gray-700">Organic</span>
          <Info className="w-3 h-3 text-gray-400" />
        </div>
        <span className="font-medium text-gray-900">
          {reviewSources.organic.toLocaleString()}
        </span>
      </div>

      <div className="flex items-center justify-between text-xs md:text-sm">
        <div className="flex items-center gap-2">
          <span className="text-gray-700">Verified</span>
          <Info className="w-3 h-3 text-gray-400" />
        </div>
        <span className="font-medium text-gray-900">
          {reviewSources.verified.toLocaleString()}
        </span>
      </div>

      <div className="flex items-center justify-between text-xs md:text-sm">
        <div className="flex items-center gap-2">
          <span className="text-gray-700">Invited</span>
          <Info className="w-3 h-3 text-gray-400" />
        </div>
        <span className="font-medium text-gray-900">
          {reviewSources.invited.toLocaleString()}
        </span>
      </div>

      <div className="flex items-center justify-between text-xs md:text-sm">
        <div className="flex items-center gap-2">
          <span className="text-gray-700">Redirected</span>
          <Info className="w-3 h-3 text-gray-400" />
        </div>
        <span className="font-medium text-gray-900">
          {reviewSources.redirected.toLocaleString()}
        </span>
      </div>

      <div className="border-t border-gray-200 pt-2 md:pt-3">
        <div className="flex items-center justify-between text-xs md:text-sm">
          <span className="text-gray-600">
            Total reviews from the {reviewSources.period}
          </span>
          <span className="font-semibold text-gray-900">
            {reviewSources.total.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}

export function RatingBreakdown({
  averageRating,
  breakdown,
  totalReviews,
  selectedStars = [],
  onToggleStar,
  reviewSources,
}: RatingBreakdownProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm mb-6">
      <div className="p-4">
        {/* Mobile Layout - Stacked sections */}
        <div className="block md:hidden space-y-6">
          {/* Section 1: Overall Rating */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 h-8">
              <h3 className="font-semibold text-gray-900 text-base">
                Overall Rating
              </h3>
              <Info className="w-4 h-4 text-gray-400" />
            </div>
            <div className="flex flex-col space-y-3">
              <div className="flex items-center gap-3">
                <Star className="w-6 h-6 text-green-500 fill-current" />
                <div className="text-xl font-bold text-gray-900">
                  {averageRating.toFixed(1)}
                  <span className="text-sm text-gray-600">/5</span>
                </div>
              </div>
              <div className="text-xs text-gray-600">
                based on {totalReviews.toLocaleString()} reviews
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-green-700 bg-green-50 border border-green-200 rounded-md px-2 py-1.5">
                <span className="inline-block w-3 h-3 rounded-full bg-green-600 text-white text-[8px] leading-3 text-center">
                  ↗
                </span>
                <span>
                  {totalReviews === 0
                    ? "No reviews yet"
                    : averageRating >= 4.5
                    ? "Excellent"
                    : averageRating >= 4.0
                    ? "Good"
                    : averageRating >= 3.5
                    ? "Average"
                    : averageRating >= 3.0
                    ? "Poor"
                    : "Bad"}{" "}
                  rating
                </span>
                <button className="text-blue-600 hover:underline ml-1 text-xs">
                  know more
                </button>
              </div>
            </div>
          </div>

          {/* Section 2: Rating Distribution */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 h-8">
              <h3 className="font-semibold text-gray-900 text-base">
                Rating Distribution
              </h3>
            </div>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((stars) => {
                const count = breakdown[stars] || 0;
                const percentage =
                  totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                const isChecked = selectedStars.includes(stars);

                return (
                  <div key={stars} className="flex items-center gap-2 text-xs">
                    <label className="flex items-center gap-2 w-14 flex-shrink-0 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => onToggleStar && onToggleStar(stars)}
                        className="accent-blue-600 h-3 w-3"
                      />
                      <span className="flex items-center gap-1 text-gray-700 font-medium text-xs">
                        {stars}{" "}
                        <Star className="w-2.5 h-2.5 text-yellow-400 fill-current" />
                      </span>
                    </label>
                    <div className="flex-1">
                      <Progress
                        value={percentage}
                        className="h-1.5 bg-gray-200"
                      />
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-gray-700 font-medium text-xs">
                        {count.toLocaleString()}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 3: Review Sources */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 h-8">
              <h3 className="font-semibold text-gray-900 text-base">
                Review sources
              </h3>
            </div>
            <ReviewSources reviewSources={reviewSources} />
          </div>
        </div>

        {/* Desktop Layout - 3-column grid */}
        <div className="hidden md:block">
          {/* Headers row */}
          <div className="grid grid-cols-3 gap-12 mb-4">
            <div className="flex items-center gap-2 h-8">
              <h3 className="font-semibold text-gray-900 text-base">
                Overall Rating
              </h3>
              <Info className="w-4 h-4 text-gray-400" />
            </div>
            <div className="flex items-center gap-2 h-8">
              <h3 className="font-semibold text-gray-900 text-base">
                Rating Distribution
              </h3>
            </div>
            <div className="flex items-center gap-2 h-8">
              <h3 className="font-semibold text-gray-900 text-base">
                Review sources
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-12 items-start">
            {/* Column 1: Overall Rating */}
            <div className="flex flex-col space-y-4">
              <div className="flex items-center gap-3">
                <Star className="w-7 h-7 text-green-500 fill-current" />
                <div className="text-2xl font-bold text-gray-900">
                  {averageRating.toFixed(1)}
                  <span className="text-base text-gray-600">/5</span>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                based on {totalReviews.toLocaleString()} reviews
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-green-700 bg-green-50 border border-green-200 rounded-md px-3 py-2">
                <span className="inline-block w-4 h-4 rounded-full bg-green-600 text-white text-[10px] leading-4 text-center">
                  ↗
                </span>
                <span>
                  {totalReviews === 0
                    ? "No reviews yet"
                    : averageRating >= 4.5
                    ? "Excellent"
                    : averageRating >= 4.0
                    ? "Good"
                    : averageRating >= 3.5
                    ? "Average"
                    : averageRating >= 3.0
                    ? "Poor"
                    : "Bad"}{" "}
                  rating
                </span>
                <button className="text-blue-600 hover:underline ml-1">
                  know more
                </button>
              </div>
            </div>

            {/* Column 2: Rating Distribution */}
            <div className="flex flex-col space-y-2 relative">
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((stars) => {
                  const count = breakdown[stars] || 0;
                  const percentage =
                    totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                  const isChecked = selectedStars.includes(stars);

                  return (
                    <div
                      key={stars}
                      className="flex items-center gap-3 text-sm"
                    >
                      <label className="flex items-center gap-2 w-16 flex-shrink-0 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => onToggleStar && onToggleStar(stars)}
                          className="accent-blue-600 h-4 w-4"
                        />
                        <span className="flex items-center gap-1 text-gray-700 font-medium text-sm">
                          {stars}{" "}
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        </span>
                      </label>
                      <div className="flex-1">
                        <Progress
                          value={percentage}
                          className="h-2 bg-gray-200"
                        />
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-gray-700 font-medium text-sm">
                          {count.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Column 3: Review Sources */}
            <div className="flex flex-col space-y-4 relative">
              <ReviewSources reviewSources={reviewSources} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
