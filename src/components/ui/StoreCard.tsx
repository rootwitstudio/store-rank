import { Star, ExternalLink } from "lucide-react";
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
  linkText?: string;
  showFullLink?: boolean;
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
  monthlyVisitors,
  linkText = "Visit Store",
  showFullLink = false
}: StoreCardProps) {
  return (
    <div className="relative bg-white rounded-xl border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 overflow-hidden h-full flex flex-col">
      {/* Tags in top-right corner */}
      <div className="absolute top-4 right-4 z-10 flex gap-1">
        {isVerified && <VerifiedTag size="sm" iconType="guard" />}
        {isClaimed && <ClaimedTag size="sm" />}
      </div>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center h-16">
          <div className={`w-12 h-12 bg-gradient-to-br ${avatarGradient} rounded-lg flex items-center justify-center text-lg font-bold mr-3`}>
            {name.charAt(0)}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-base truncate flex-1">{name}</h3>
            </div>
            <p className="text-sm text-gray-500 truncate max-w-[120px]">{category}</p>
          </div>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[40px]">{description}</p>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm font-medium">{rating}</span>
        </div>
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getTrustScoreColor(trustScore)}`}>
          {trustScore}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <Link href={`/stores/${id}#reviews`} className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
          {reviewCount} reviews
        </Link>
        {monthlyVisitors && (
          <span className="text-sm text-gray-500">{monthlyVisitors} monthly</span>
        )}
      </div>

      <div className="flex items-center mt-auto pt-4">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          {showFullLink ? link : linkText}
          <ExternalLink className="h-3 w-3 ml-1" />
        </a>
      </div>
    </div>
  );
} 