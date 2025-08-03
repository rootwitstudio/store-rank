"use client";

import { useState } from "react";
import { 
  Star, 
  CheckCircle, 
  ThumbsUp, 
  ThumbsDown, 
  Flag, 
  Share2, 
  MoreHorizontal,
  Check,
  Pencil,
  Trash2,
  Store
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Review {
  id: string;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
  rating: number;
  title: string;
  content: string;
  createdAt: string;
  helpfulCount: number;
  verifiedPurchase: boolean;
  storeResponse?: string;
  images?: string[];
}

interface ReviewCardProps {
  review: Review;
  isUserReview?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5"
  };

  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`${sizeClasses[size]} ${
            i < Math.floor(rating) 
              ? "text-yellow-400 fill-yellow-400" 
              : i === Math.floor(rating) && rating % 1 >= 0.5
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

export function ReviewCard({ review, isUserReview, onEdit, onDelete }: ReviewCardProps) {
  return (
    <div className="p-6 bg-white rounded-xl border border-gray-100 hover:border-gray-200 transition-colors">
      {/* Review Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={review.user.avatar} alt={review.user.name} />
            <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-medium text-gray-900">{review.user.name}</h4>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <time dateTime={review.createdAt}>
                {new Date(review.createdAt).toLocaleDateString('en-US', {
                  month: 'long',
                  year: 'numeric'
                })}
              </time>
              {review.verifiedPurchase && (
                <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-100">
                  Verified Purchase
                </Badge>
              )}
            </div>
          </div>
        </div>

        {isUserReview && (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onEdit}
              className="text-gray-500 hover:text-gray-700"
            >
              <Pencil className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onDelete}
              className="text-gray-500 hover:text-red-600"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < review.rating
                ? "text-yellow-400 fill-current"
                : "text-gray-200"
            }`}
          />
        ))}
      </div>

      {/* Review Content */}
      <div className="space-y-4">
        {review.title && (
          <h5 className="font-medium text-gray-900">{review.title}</h5>
        )}
        <p className="text-gray-600 leading-relaxed">{review.content}</p>
        
        {/* Review Images */}
        {review.images && review.images.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
            {review.images.map((image, index) => (
              <div 
                key={index}
                className="relative aspect-square rounded-lg overflow-hidden bg-gray-100"
              >
                <img
                  src={image}
                  alt={`Review image ${index + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}

        {/* Store Response */}
        {review.storeResponse && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Store className="w-4 h-4 text-gray-600" />
              <h6 className="font-medium text-gray-900">Store Response</h6>
            </div>
            <p className="text-gray-600 text-sm">{review.storeResponse}</p>
          </div>
        )}

        {/* Review Helpfulness */}
        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:text-gray-700"
          >
            <ThumbsUp className="w-4 h-4 mr-1" />
            Helpful ({review.helpfulCount || 0})
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:text-gray-700"
          >
            <Flag className="w-4 h-4 mr-1" />
            Report
          </Button>
        </div>
      </div>
    </div>
  );
}