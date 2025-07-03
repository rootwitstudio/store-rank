"use client";

import { Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface RatingBreakdownProps {
  breakdown: any;
  totalReviews: number;
}

export function RatingBreakdown({ breakdown, totalReviews }: RatingBreakdownProps) {
  return (
    <div className="space-y-3">
      {[5, 4, 3, 2, 1].map((stars) => {
        const count = breakdown[stars] || 0;
        const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
        
        return (
          <div key={stars} className="flex items-center gap-3 text-sm">
            <div className="flex items-center gap-1 w-12 sm:w-16 flex-shrink-0">
              <span className="text-gray-600 font-medium text-xs sm:text-sm">{stars}</span>
              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            </div>
            <div className="flex-1">
              <Progress value={percentage} className="h-2" />
            </div>
            <span className="text-gray-600 w-16 sm:w-20 text-right font-medium text-xs sm:text-sm">
              {count.toLocaleString()}
            </span>
            <span className="text-gray-500 w-10 sm:w-12 text-right text-xs">
              {percentage.toFixed(1)}%
            </span>
          </div>
        );
      })}
    </div>
  );
}