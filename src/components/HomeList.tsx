import React from "react";
import { Star, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface HomeListProps {
  id: string;
  name: string;
  desc: string;
  rating: number;
  country: string;
  profileImage?: string;
  buttonLabel?: string;
  onButtonClick?: () => void;
  link?: string;
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

function StarRating({ rating }: { rating: number }) {
  // Mock review count (you can replace this with a real prop if needed)
  const reviewCount = 456;
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-3 h-3 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
            fill={i < rating ? "currentColor" : "none"}
          />
        ))}
      </div>
      <span className="text-xs font-semibold text-gray-700 mt-0.5">
        {rating.toFixed(1)} ({reviewCount})
      </span>
    </div>
  );
}

export const HomeList: React.FC<HomeListProps> = ({
  id,
  name,
  desc,
  rating,
  country,
  profileImage,
  buttonLabel = "More Info",
  onButtonClick,
  link,
}) => {
  const router = useRouter();

  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick();
    } else {
      router.push(`/stores/${id}`);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow border p-3 flex flex-col gap-2 max-w-xs w-full transition-all duration-200 hover:shadow-lg hover:scale-[1.02] cursor-pointer">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
          {profileImage ? (
            <Image src={profileImage} alt={name} width={32} height={32} className="w-full h-full object-cover" />
          ) : (
            <span className="text-base font-bold text-gray-500">{name.charAt(0)}</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-base font-semibold leading-tight truncate">{name}</div>
          <div className="text-xs text-gray-500 mb-0.5 truncate">{country}</div>
        </div>
        <div className="flex flex-col items-center ml-1">
          <StarRating rating={rating} />
        </div>
      </div>
      <div className="text-sm text-gray-700 mt-0.5 line-clamp-2 min-h-[24px]">{desc}</div>
      <div className="flex items-center justify-between mt-0.5">
        {link ? (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-0.5 text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            {getDomain(link)} <ExternalLink className="w-3 h-3 inline" />
          </a>
        ) : (
          <span />
        )}
        <Button 
          className="bg-black hover:bg-gray-900 text-white px-2 py-0.5 rounded text-xs font-semibold h-6 min-w-0" 
          onClick={handleButtonClick}
        >
          {buttonLabel}
        </Button>
      </div>
    </div>
  );
}; 