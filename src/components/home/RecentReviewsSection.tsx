"use client";
import { CheckCircle, Star, ThumbsUp } from "lucide-react";
import Link from "next/link";

interface Review {
  id: string;
  storeName: string;
  storeId: string;
  rating: number;
  review: string;
  reviewer: string;
  location: string;
  date: string;
  verified: boolean;
  helpful: number;
  category: string;
}

interface RecentReviewsSectionProps {
  reviews: Review[];
}

export function RecentReviewsSection({ reviews }: RecentReviewsSectionProps) {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-end mb-8 sm:mb-12">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 text-gray-900">Recent Reviews</h2>
            <p className="text-gray-600 text-lg max-w-2xl">Latest authentic reviews from verified customers across India</p>
          </div>
          <Link
            href="/reviews"
            className="text-blue-600 hover:text-blue-700 flex items-center text-sm sm:text-base font-medium group"
          >
            View All Reviews
            <svg className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.slice(0, 6).map((review) => (
            <div key={review.id} className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm mr-3">
                    {review.reviewer.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center">
                      <span className="font-medium text-gray-900">{review.reviewer}</span>
                      {review.verified && (
                        <CheckCircle className="h-4 w-4 text-green-500 ml-2" />
                      )}
                    </div>
                    <div className="text-sm text-gray-500">{review.location}</div>
                  </div>
                </div>
                <div className="text-xs text-gray-400">{review.date}</div>
              </div>

              <div className="mb-3">
                <Link href={`/stores/${review.storeId}`} className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                  {review.storeName}
                </Link>
                <span className="mx-2 text-gray-300">•</span>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{review.category}</span>
              </div>

              <div className="flex items-center mb-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm font-medium">{review.rating}/5</span>
              </div>

              <p className="text-gray-700 text-sm mb-4 line-clamp-3">{review.review}</p>

              <div className="flex items-center justify-between">
                <button className="flex items-center text-gray-500 hover:text-blue-600 text-sm">
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  Helpful ({review.helpful})
                </button>
                <Link href={`/stores/${review.storeId}`} className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 