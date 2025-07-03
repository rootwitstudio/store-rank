"use client";

import { useState } from "react";
import { 
  Star, 
  ExternalLink, 
  Shield, 
  CheckCircle, 
  MapPin, 
  Calendar, 
  Users, 
  Globe,
  Share2,
  Bookmark,
  Phone,
  Mail,
  Heart,
  Copy,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface StoreHeaderProps {
  store: any;
  onWriteReview: () => void;
}

function StarRating({ rating, size = "sm", showNumber = true, className = "" }: { 
  rating: number; 
  size?: "sm" | "md" | "lg"; 
  showNumber?: boolean;
  className?: string;
}) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6"
  };

  return (
    <div className={`flex items-center gap-1 ${className}`}>
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
      {showNumber && (
        <span className={`font-medium text-gray-900 ${size === 'lg' ? 'text-lg' : size === 'md' ? 'text-base' : 'text-sm'}`}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}

export function StoreHeader({ store, onWriteReview }: StoreHeaderProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [isShared, setIsShared] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: store.name,
          text: `Check out ${store.name} - ${store.rating} stars with ${store.totalReviews.toLocaleString()} reviews`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
      setIsShared(true);
      setTimeout(() => setIsShared(false), 2000);
    }
  };

  return (
    <>
      {/* Mobile-First Header */}
      <div className="lg:hidden">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-white via-blue-50 to-indigo-50">
          <CardContent className="p-4">
            {/* Store Logo and Basic Info */}
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg flex-shrink-0">
                {store.name.charAt(0)}
              </div>
              
              <div className="flex-1 min-w-0">
                <h1 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{store.name}</h1>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {store.verified && (
                    <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">
                      <Shield className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                  {store.claimed && (
                    <Badge className="bg-blue-100 text-blue-800 border-blue-200 text-xs">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Claimed
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{store.country}</span>
                  <span>•</span>
                  <Badge variant="outline" className="text-xs">{store.category}</Badge>
                </div>
              </div>
            </div>

            {/* Rating Section - Prominent for mobile */}
            <div className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-blue-100">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{store.rating.toFixed(1)}</div>
                  <StarRating rating={store.rating} size="md" showNumber={false} />
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">Trust Score</div>
                  <div className="text-2xl font-bold text-green-600">{store.trustScore}</div>
                </div>
              </div>
              <div className="text-sm text-gray-600 text-center">
                Based on {store.totalReviews.toLocaleString()} reviews
              </div>
            </div>

            {/* Quick Info Grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-white rounded-lg p-3 text-center border border-gray-100">
                <div className="text-sm text-gray-600 mb-1">Response Time</div>
                <div className="font-semibold text-gray-900">{store.responseTime}</div>
              </div>
              <div className="bg-white rounded-lg p-3 text-center border border-gray-100">
                <div className="text-sm text-gray-600 mb-1">Founded</div>
                <div className="font-semibold text-gray-900">{store.founded}</div>
              </div>
            </div>

            {/* Action Buttons - Mobile Optimized */}
            <div className="space-y-3">
              <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 h-12" asChild>
                <a href={store.website} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Visit Store
                </a>
              </Button>
              
              <div className="grid grid-cols-3 gap-2">
                <Button variant="outline" size="sm" onClick={onWriteReview} className="h-10">
                  <Star className="w-4 h-4 mr-1" />
                  Review
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setIsSaved(!isSaved)}
                  className={`h-10 ${isSaved ? 'bg-red-50 text-red-600 border-red-200' : ''}`}
                >
                  <Heart className={`w-4 h-4 mr-1 ${isSaved ? 'fill-current' : ''}`} />
                  {isSaved ? 'Saved' : 'Save'}
                </Button>
                <Button variant="outline" size="sm" onClick={handleShare} className="h-10">
                  {isShared ? <Check className="w-4 h-4 mr-1" /> : <Share2 className="w-4 h-4 mr-1" />}
                  {isShared ? 'Copied' : 'Share'}
                </Button>
              </div>
            </div>

            {/* Contact Info - Collapsible on mobile */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 gap-2">
                <a 
                  href={store.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-white transition-colors"
                >
                  <Globe className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-blue-600 font-medium truncate">
                    {new URL(store.website).hostname.replace('www.', '')}
                  </span>
                </a>
                {store.phone && (
                  <a 
                    href={`tel:${store.phone}`}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-white transition-colors"
                  >
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">{store.phone}</span>
                  </a>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block">
        <Card className="border-0 shadow-lg bg-gradient-to-r from-white to-blue-50">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Store Info - Takes 2 columns */}
              <div className="lg:col-span-2">
                <div className="flex gap-6 mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg flex-shrink-0">
                    {store.name.charAt(0)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="min-w-0">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{store.name}</h1>
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          {store.verified && (
                            <Badge className="bg-green-100 text-green-800 border-green-200">
                              <Shield className="w-3 h-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                          {store.claimed && (
                            <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Claimed
                            </Badge>
                          )}
                          <Badge variant="outline">{store.category}</Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-gray-500" />
                        <a 
                          href={store.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 font-medium truncate"
                        >
                          {new URL(store.website).hostname.replace('www.', '')}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700">{store.country}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700">Founded {store.founded}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700">{store.employees} employees</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">{store.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {store.tags.slice(0, 4).map((tag: string) => (
                        <Badge key={tag} variant="secondary" className="bg-gray-100">
                          {tag}
                        </Badge>
                      ))}
                      {store.tags.length > 4 && (
                        <Badge variant="secondary" className="bg-gray-100">
                          +{store.tags.length - 4} more
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-3">
                      <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
                        <a href={store.website} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Visit Website
                        </a>
                      </Button>
                      <Button variant="outline" size="lg" onClick={onWriteReview}>
                        <Star className="w-4 h-4 mr-2" />
                        Write Review
                      </Button>
                      <Button 
                        variant="outline" 
                        size="lg"
                        onClick={() => setIsSaved(!isSaved)}
                        className={isSaved ? 'bg-red-50 text-red-600 border-red-200' : ''}
                      >
                        <Heart className={`w-4 h-4 mr-2 ${isSaved ? 'fill-current' : ''}`} />
                        {isSaved ? 'Saved' : 'Save'}
                      </Button>
                      <Button variant="outline" size="lg" onClick={handleShare}>
                        {isShared ? <Check className="w-4 h-4 mr-2" /> : <Share2 className="w-4 h-4 mr-2" />}
                        {isShared ? 'Copied' : 'Share'}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Rating Card */}
              <div className="lg:col-span-1">
                <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 h-full">
                  <CardContent className="p-6 text-center">
                    <div className="mb-6">
                      <div className="text-5xl font-bold text-gray-900 mb-2">{store.rating.toFixed(1)}</div>
                      <StarRating rating={store.rating} size="lg" showNumber={false} className="justify-center mb-2" />
                      <div className="text-sm text-gray-600">
                        Based on {store.totalReviews.toLocaleString()} reviews
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{store.trustScore}</div>
                        <div className="text-xs text-gray-600">Trust Score</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{store.responseRate}%</div>
                        <div className="text-xs text-gray-600">Response Rate</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Response Time:</span>
                        <span className="font-medium">{store.responseTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Business Type:</span>
                        <span className="font-medium">{store.businessType}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}