import { Star, Globe, Users, Eye, Bookmark } from "lucide-react";
import { VerifiedTag, ClaimedTag } from "@/components/ui/tags";
import Link from "next/link";

export interface StoreCardProps {
  id: string;
  name: string;
  description: string;
  category: string;
  rating: number;
  reviewCount: number;
  trustScore: string;
  link: string;
  isVerified?: boolean;
  isClaimed?: boolean;
  getTrustScoreColor: (score: string) => string;
  avatarGradient?: string;
  monthlyVisitors?: string;
}

// Helper function to extract domain from URL
function extractDomain(url: string): string {
  try {
    const domain = new URL(url.startsWith('http') ? url : `https://${url}`).hostname;
    return domain.replace('www.', '');
  } catch {
    return url;
  }
}

export function StoreCard({
  id,
  name,
  description,
  category,
  rating,
  reviewCount,
  trustScore,
  link,
  isVerified = false,
  isClaimed = false,
  getTrustScoreColor,
  avatarGradient = "from-green-100 to-blue-100 text-green-600",
  monthlyVisitors
}: StoreCardProps) {
  const domain = extractDomain(link);
  
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-lg transition-all duration-300 overflow-hidden h-full flex flex-col">
      {/* Store Header */}
      <div className="flex items-start gap-3 mb-3">
        <div className={`w-12 h-12 bg-gradient-to-br ${avatarGradient} rounded-lg flex items-center justify-center text-lg font-bold flex-shrink-0`}>
          {name.charAt(0)}
        </div>
        <div className="min-w-0 flex-1">
          <Link href={`/stores/${id}`}>
            <h3 className="font-semibold text-lg text-gray-900 mb-1 truncate hover:text-blue-600 transition-colors cursor-pointer">
              {name}
            </h3>
          </Link>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Globe className="h-4 w-4 flex-shrink-0" />
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="truncate font-medium hover:text-blue-600 transition-colors"
            >
              {domain}
            </a>
          </div>
        </div>
      </div>

      {/* Status Tags */}
      {(isVerified || isClaimed) && (
        <div className="flex gap-1 mb-3">
          {isVerified && <VerifiedTag size="sm" iconType="guard" />}
          {isClaimed && <ClaimedTag size="sm" />}
        </div>
      )}

      {/* Rating & Trust Score Row */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
              />
            ))}
          </div>
          <span className="text-sm font-semibold text-gray-900">{rating}</span>
        </div>
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getTrustScoreColor(trustScore)}`}>
          {trustScore}
        </span>
      </div>

      {/* Reviews & Visitors Row */}
      <div className="flex items-center justify-between mb-4">
        <Link 
          href={`/stores/${id}#reviews`} 
          className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 transition-colors font-medium"
        >
          <Users className="h-4 w-4" />
          {reviewCount.toLocaleString()} reviews
        </Link>
        {monthlyVisitors && (
          <span className="text-sm text-gray-500 font-medium">{monthlyVisitors} monthly</span>
        )}
      </div>

      {/* Category */}
      <div className="mb-3">
        <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-md">
          {category}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">{description}</p>

      {/* Action Buttons */}
      <div className="mt-auto pt-2 flex items-center justify-between">
        <button
          className="flex items-center gap-1 text-gray-600 hover:text-blue-600 text-sm transition-colors"
          onClick={() => {
            // Add to favorites functionality
            console.log('Add to favorites:', id);
          }}
        >
          <Bookmark className="h-4 w-4" />
          Save
        </button>
        
        <Link
          href={`/stores/${id}`}
          className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors"
        >
          <Eye className="h-4 w-4" />
          View Details
        </Link>
      </div>
    </div>
  );
} 