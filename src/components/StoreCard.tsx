"use client";

import React from "react";
import { Star, ExternalLink, CheckCircle, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface StoreCardProps {
  name: string;
  desc: string;
  tags: string[];
  logo: string | null;
  rating: number;
  totalRating: number;
  country: string;
  link: string;
  buttonLabel?: string;
  onButtonClick?: () => void;
  verified?: boolean;
  claimed?: boolean;
  category: string;
}

function getDomain(url?: string) {
  if (!url) return "";
  try {
    const withProtocol = url.startsWith("http") ? url : `https://${url}`;
    return new URL(withProtocol).host.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function StarRating({ rating, totalRating }: { rating: number; totalRating: number }) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < rating ? "text-blue-500" : "text-gray-300"}`}
            fill={i < rating ? "currentColor" : "none"}
          />
        ))}
      </div>
      <span className="text-xs font-semibold text-gray-700 mt-0.5">
        {rating ? rating.toFixed(1) : '0.0'} ({totalRating})
      </span>
    </div>
  );
}

export const StoreCard: React.FC<StoreCardProps> = ({
  name,
  desc,
  tags,
  logo,
  rating,
  totalRating,
  country,
  link,
  buttonLabel = "More Info",
  onButtonClick,
  verified,
  claimed,
  category,
}) => {
  return (
    <div className="bg-white rounded-lg shadow border p-3 sm:p-4 flex flex-col gap-2 w-full transition-all duration-200 hover:shadow-lg hover:scale-[1.02] cursor-pointer">
      <div className="flex items-center gap-2 mb-1 sm:mb-2">
        {verified && (
          <span className="flex items-center gap-1 text-[10px] sm:text-xs text-green-600 bg-green-100 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
            <CheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            Verified
          </span>
        )}
        {claimed && (
          <span className="flex items-center gap-1 text-[10px] sm:text-xs text-blue-600 bg-blue-100 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
            <Shield className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            Claimed
          </span>
        )}
      </div>
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
          {logo ? (
            <Image src={logo} alt={name} width={28} height={28} className="w-full h-full object-cover" />
          ) : (
            <span className="text-sm sm:text-base font-bold text-gray-500">{name ? name.charAt(0) : ''}</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-base sm:text-lg font-semibold leading-tight truncate">{name}</div>
          <div className="flex items-center gap-2 mt-0.5 sm:mt-1">
            <span className="text-[10px] sm:text-xs text-gray-500">{country}</span>
            <span className="text-[10px] sm:text-xs bg-gray-100 text-gray-700 px-1.5 sm:px-2 py-0.5 rounded-full">{category}</span>
          </div>
        </div>
        <div className="flex flex-col items-center ml-1">
          <StarRating rating={rating} totalRating={totalRating} />
        </div>
      </div>
      <div className="text-sm sm:text-base text-gray-700 mt-0.5 line-clamp-2 min-h-[20px] sm:min-h-[24px]">{desc}</div>
      <div className="flex items-center justify-between mt-0.5">
        {link ? (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-0.5 text-blue-600 hover:text-blue-800 text-xs sm:text-sm font-medium"
          >
            {getDomain(link)} <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3 inline" />
          </a>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
};
