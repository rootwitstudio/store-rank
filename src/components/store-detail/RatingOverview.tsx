import React from "react";
import { Star } from "lucide-react";

interface RatingOverviewProps {
  rating?: number;
  totalReviews?: number;
  ratingBreakdown?: {
    [key: number]: number;
  };
}

const RatingOverview: React.FC<RatingOverviewProps> = ({
  rating = 4.8,
  totalReviews = 17000,
  ratingBreakdown = {
    5: 14500,
    4: 1700,
    3: 510,
    2: 170,
    1: 170,
  },
}) => {
  const getRatingLabel = (rating: number) => {
    if (rating >= 4.5) return "Excellent";
    if (rating >= 4.0) return "Great";
    if (rating >= 3.5) return "Good";
    if (rating >= 3.0) return "Fair";
    if (rating >= 2.5) return "Poor";
    return "Very Poor";
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return "text-green-600";
    if (rating >= 4.0) return "text-green-500";
    if (rating >= 3.5) return "text-blue-600";
    if (rating >= 3.0) return "text-yellow-600";
    if (rating >= 2.5) return "text-orange-600";
    return "text-red-600";
  };

  const getBarColor = (stars: number) => {
    if (stars === 5) return "bg-green-500";
    if (stars === 1) return "bg-red-500";
    return "bg-gray-400";
  };

  const formatReviewCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(count % 1000 === 0 ? 0 : 1)}K`;
    }
    return count.toString();
  };

  const getBarWidth = (stars: number) => {
    const total = Object.values(ratingBreakdown).reduce(
      (sum, count) => sum + count,
      0
    );
    if (total === 0) return 0;
    return (ratingBreakdown[stars] / total) * 100;
  };

  return (
    <div className="bg-white p-4 md:p-6">
      <div className="text-center mb-3 md:mb-4">
        <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          {rating}
        </div>
        {/* <div
          className={`text-base md:text-lg font-semibold mb-2 ${getRatingColor(
            rating
          )}`}
        >
          {getRatingLabel(rating)}
        </div> */}
        <div className="flex justify-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className="w-4 h-4 md:w-5 md:h-5 text-green-500 fill-current"
            />
          ))}
        </div>
        <div className="text-xs md:text-sm text-gray-600">
          {formatReviewCount(totalReviews)} reviews
        </div>
      </div>

      <div className="space-y-2 md:space-y-3">
        {[5, 4, 3, 2, 1].map((stars) => (
          <div key={stars} className="flex items-center gap-2 md:gap-3">
            <div className="flex items-center gap-1 min-w-[50px] md:min-w-[60px]">
              <span className="text-xs md:text-sm text-gray-600">{stars}</span>
              <Star className="w-3 h-3 md:w-4 md:h-4 text-gray-400" />
            </div>
            <div className="flex-1 bg-gray-200 rounded-full h-1.5 md:h-2">
              <div
                className={`h-1.5 md:h-2 rounded-full ${getBarColor(stars)}`}
                style={{
                  width: `${getBarWidth(stars)}%`,
                }}
              ></div>
            </div>
            <div className="text-xs md:text-sm text-gray-600 min-w-[35px] md:min-w-[40px] text-right">
              {formatReviewCount(ratingBreakdown[stars] || 0)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingOverview;
