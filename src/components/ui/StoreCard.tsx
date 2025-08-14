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
    const domain = new URL(url.startsWith("http") ? url : `https://${url}`)
      .hostname;
    return domain.replace("www.", "");
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
  monthlyVisitors,
}: StoreCardProps) {
  const domain = extractDomain(link);

  // Function to get text-only colors for trust score
  const getTrustScoreTextColor = (score: string) => {
    if (!score) return "text-gray-600";

    const numericScore = parseFloat(score);
    if (!isNaN(numericScore)) {
      if (numericScore >= 4.5) return "text-green-600";
      if (numericScore >= 4.0) return "text-green-500";
      if (numericScore >= 3.5) return "text-blue-600";
      if (numericScore >= 3.0) return "text-blue-500";
      if (numericScore >= 2.5) return "text-yellow-600";
      if (numericScore >= 2.0) return "text-yellow-500";
      if (numericScore > 0) return "text-red-600";
    }

    // Handle text-based scores
    switch (score) {
      case "Excellent":
        return "text-green-600";
      case "Great":
        return "text-blue-600";
      case "Good":
        return "text-yellow-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-all duration-300 overflow-hidden h-full flex flex-col">
      {/* Top Section: Logo + Store Info */}
      <div className="flex items-start gap-3 mb-2">
        {/* Company Logo - Left Side */}
        <div
          className={`w-12 h-12 bg-gradient-to-br ${avatarGradient} rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0 shadow-sm`}
        >
          {name.charAt(0)}
        </div>

        {/* Store Info - Right of Logo */}
        <div className="flex-1 min-w-0">
          {/* Store Name and Verification */}
          <div className="flex items-center gap-2 mb-1">
            <Link href={`/stores/${id}`}>
              <h3 className="font-bold text-lg text-gray-900 hover:text-blue-600 transition-colors cursor-pointer line-clamp-1">
                {name}
              </h3>
            </Link>

            {/* Verification Tags */}
            {(isVerified || isClaimed) && (
              <div className="flex gap-1">
                {isVerified && <VerifiedTag size="sm" iconType="guard" />}
                {isClaimed && <ClaimedTag size="sm" />}
              </div>
            )}
          </div>

          {/* Website Domain */}
          <div className="mb-2">
            <span className="text-blue-600 text-sm font-medium">{domain}</span>
          </div>

          {/* Category Tag */}
          <div className="mb-3">
            <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-md">
              {category}
            </span>
          </div>
        </div>
      </div>

      {/* Rating Section */}
      <div className="mb-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-gray-900 font-semibold">{rating}</span>
          <span className="text-gray-500">
            ({reviewCount.toLocaleString()} reviews)
          </span>
        </div>
      </div>

      {/* Description */}
      <div className="mb-4 flex-1">
        <p className="text-gray-700 text-sm leading-relaxed line-clamp-2">
          {description}
        </p>
      </div>

      {/* Bottom Section: Actions */}
      <div className="mt-auto flex justify-end">
        <div className="flex items-center gap-2">
          {/* <button
            className="flex items-center gap-1 text-gray-600 hover:text-blue-600 text-sm transition-colors p-2 rounded-lg hover:bg-gray-50"
            onClick={() => {
              console.log("Add to favorites:", id);
            }}
          >
            <Bookmark className="h-4 w-4" />
            <span className="hidden sm:inline">Save</span>
          </button> */}

          <Link
            href={`/stores/${id}`}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
