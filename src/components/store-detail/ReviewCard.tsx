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
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ReviewCardProps {
  review: any;
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

export function ReviewCard({ review }: ReviewCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHelpful, setIsHelpful] = useState(false);
  const [isShared, setIsShared] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Review by ${review.author}`,
          text: review.title,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setIsShared(true);
      setTimeout(() => setIsShared(false), 2000);
    }
  };

  return (
    <Card className="border border-gray-200 hover:shadow-md transition-shadow">
      <CardContent className="p-4 sm:p-6">
        {/* Mobile Layout */}
        <div className="sm:hidden">
          <div className="flex items-start gap-3 mb-4">
            <Avatar className="w-10 h-10 flex-shrink-0">
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold text-sm">
                {review.author.split(' ').map((n: string) => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">{review.author}</h4>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{review.location}</span>
                    <span>•</span>
                    <span>{new Date(review.date).toLocaleDateString()}</span>
                  </div>
                </div>
                {review.verified && (
                  <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200 text-xs">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center justify-between mb-3">
                <StarRating rating={review.rating} size="sm" />
                <span className="text-xs text-green-600 font-medium">{review.orderValue}</span>
              </div>
            </div>
          </div>
          
          <h5 className="font-semibold text-gray-900 mb-3 text-sm">{review.title}</h5>
          
          <div className="text-gray-700 text-sm leading-relaxed mb-4">
            {isExpanded ? review.content : `${review.content.slice(0, 150)}${review.content.length > 150 ? '...' : ''}`}
            {review.content.length > 150 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-blue-600 hover:text-blue-800 ml-1 font-medium"
              >
                {isExpanded ? 'Show less' : 'Read more'}
              </button>
            )}
          </div>
          
          {/* Pros and Cons - Mobile */}
          {(review.pros?.length > 0 || review.cons?.length > 0) && (
            <div className="space-y-3 mb-4">
              {review.pros?.length > 0 && (
                <div>
                  <h6 className="text-xs font-medium text-green-700 mb-2 flex items-center gap-1">
                    <ThumbsUp className="w-3 h-3" />
                    Pros
                  </h6>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {review.pros.slice(0, 2).map((pro: string, index: number) => (
                      <li key={index} className="flex items-start gap-1">
                        <span className="text-green-500 mt-0.5">•</span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {review.cons?.length > 0 && (
                <div>
                  <h6 className="text-xs font-medium text-red-700 mb-2 flex items-center gap-1">
                    <ThumbsDown className="w-3 h-3" />
                    Cons
                  </h6>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {review.cons.slice(0, 2).map((con: string, index: number) => (
                      <li key={index} className="flex items-start gap-1">
                        <span className="text-red-500 mt-0.5">•</span>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsHelpful(!isHelpful)}
              className={`flex items-center gap-1 text-xs transition-colors ${
                isHelpful ? 'text-blue-600' : 'text-gray-500'
              }`}
            >
              <ThumbsUp className="w-3 h-3" />
              {review.helpful + (isHelpful ? 1 : 0)}
            </button>
            <div className="flex items-center gap-3">
              <button 
                onClick={handleShare}
                className="text-xs text-gray-500 hover:text-gray-700"
              >
                {isShared ? <Check className="w-3 h-3" /> : <Share2 className="w-3 h-3" />}
              </button>
              <button className="text-xs text-gray-500 hover:text-gray-700">
                <Flag className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden sm:block">
          <div className="flex gap-4">
            <Avatar className="w-12 h-12 flex-shrink-0">
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold">
                {review.author.split(' ').map((n: string) => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-gray-900">{review.author}</h4>
                    {review.verified && (
                      <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200 text-xs">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
                    <span>{review.location}</span>
                    <span>•</span>
                    <span>{new Date(review.date).toLocaleDateString()}</span>
                    <span>•</span>
                    <span className="text-green-600 font-medium">{review.orderValue}</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="mb-3">
                <StarRating rating={review.rating} size="sm" />
              </div>
              
              <h5 className="font-semibold text-gray-900 mb-3">{review.title}</h5>
              
              <div className="text-gray-700 text-sm leading-relaxed mb-4">
                {isExpanded ? review.content : `${review.content.slice(0, 200)}${review.content.length > 200 ? '...' : ''}`}
                {review.content.length > 200 && (
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-blue-600 hover:text-blue-800 ml-1 font-medium"
                  >
                    {isExpanded ? 'Show less' : 'Read more'}
                  </button>
                )}
              </div>
              
              {/* Pros and Cons - Desktop */}
              {(review.pros?.length > 0 || review.cons?.length > 0) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  {review.pros?.length > 0 && (
                    <div>
                      <h6 className="text-sm font-medium text-green-700 mb-2 flex items-center gap-1">
                        <ThumbsUp className="w-3 h-3" />
                        Pros
                      </h6>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {review.pros.map((pro: string, index: number) => (
                          <li key={index} className="flex items-start gap-1">
                            <span className="text-green-500 mt-1">•</span>
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {review.cons?.length > 0 && (
                    <div>
                      <h6 className="text-sm font-medium text-red-700 mb-2 flex items-center gap-1">
                        <ThumbsDown className="w-3 h-3" />
                        Cons
                      </h6>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {review.cons.map((con: string, index: number) => (
                          <li key={index} className="flex items-start gap-1">
                            <span className="text-red-500 mt-1">•</span>
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
              
              <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 flex-wrap">
                <span>Category: {review.productCategory}</span>
                {review.wouldRecommend && (
                  <>
                    <span>•</span>
                    <span className="text-green-600 font-medium">Would recommend</span>
                  </>
                )}
              </div>
              
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setIsHelpful(!isHelpful)}
                    className={`flex items-center gap-1 text-sm transition-colors ${
                      isHelpful ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <ThumbsUp className="w-4 h-4" />
                    Helpful ({review.helpful + (isHelpful ? 1 : 0)})
                  </button>
                  <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors">
                    <Flag className="w-4 h-4" />
                    Report
                  </button>
                </div>
                <button 
                  onClick={handleShare}
                  className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {isShared ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                  {isShared ? 'Copied' : 'Share'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}