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
  categories?: Array<RatingSummaryCategory>;
}

function ReviewSources() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <span className="text-gray-700">Organic</span>
          <Info className="w-3 h-3 text-gray-400" />
        </div>
        <span className="font-medium text-gray-900">60</span>
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <span className="text-gray-700">Verified</span>
          <Info className="w-3 h-3 text-gray-400" />
        </div>
        <span className="font-medium text-gray-900">3,830</span>
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <span className="text-gray-700">Invited</span>
          <Info className="w-3 h-3 text-gray-400" />
        </div>
        <span className="font-medium text-gray-900">0</span>
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <span className="text-gray-700">Redirected</span>
          <Info className="w-3 h-3 text-gray-400" />
        </div>
        <span className="font-medium text-gray-900">0</span>
      </div>

      <div className="border-t border-gray-200 pt-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">
            Total reviews from the past 12 months
          </span>
          <span className="font-semibold text-gray-900">3,890</span>
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
  categories = [],
}: RatingBreakdownProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm mb-6">
      <div className="p-4">
        {/* Headers row - all aligned */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-4">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
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
              <span>3% above industry's average</span>
              <button className="text-blue-600 hover:underline ml-1">
                know more
              </button>
            </div>
          </div>

          {/* Column 2: Rating Distribution */}
          <div className="flex flex-col space-y-2 relative">
            {/* Left separator */}
            {/* <div className="hidden md:block absolute -left-6 top-0 bottom-0 w-px bg-gray-200"></div> */}

            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((stars) => {
                const count = breakdown[stars] || 0;
                const percentage =
                  totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                const isChecked = selectedStars.includes(stars);

                return (
                  <div key={stars} className="flex items-center gap-3 text-sm">
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
                      {/* <span className="text-gray-500 text-xs">
                        ({percentage.toFixed(1)}%)
                      </span> */}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Column 3: Review Sources */}
          <div className="flex flex-col space-y-4 relative">
            <ReviewSources />
          </div>
        </div>
      </div>
    </div>
  );
}
