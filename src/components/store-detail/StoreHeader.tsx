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
  Check,
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface StoreHeaderProps {
  store: {
    name: string;
    logo: string;
    description: string;
    rating: number;
    totalRatings: number;
    website: string;
    location: string;
    foundedYear?: number;
    employeeCount?: number;
    categories: string[];
    verificationDate?: string;
    responseRate?: number;
    responseTime?: string;
  };
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

export function StoreHeader({ store }: StoreHeaderProps) {
  return (
    <div className="bg-white border-b">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Store Logo */}
          <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
            <img
              src={store.logo}
              alt={`${store.name} logo`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Store Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8 mb-6">
              <div>
                <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-2">
                  {store.name}
                </h1>
                <div className="flex items-center gap-6 text-sm text-gray-600">
                  {store.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {store.location}
                    </div>
                  )}
                  {store.website && (
                    <a
                      href={store.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
                    >
                      <Globe className="w-4 h-4" />
                      Visit Website
                    </a>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-8">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(store.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-semibold text-gray-900">
                      {store.rating.toFixed(1)}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {store.totalRatings.toLocaleString()} reviews
                  </div>
                </div>

                {store.verificationDate && (
                  <div className="hidden lg:block">
                    <Badge className="bg-blue-50 text-blue-700 border-blue-100">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Verified Business
                    </Badge>
                  </div>
                )}
              </div>
            </div>

            <p className="text-gray-600 max-w-3xl mb-6">
              {store.description}
            </p>

            {/* Store Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {store.foundedYear && (
                <div>
                  <div className="text-sm text-gray-500 mb-1">Founded</div>
                  <div className="font-medium text-gray-900">{store.foundedYear}</div>
                </div>
              )}
              {store.employeeCount && (
                <div>
                  <div className="text-sm text-gray-500 mb-1">Employees</div>
                  <div className="font-medium text-gray-900">{store.employeeCount}</div>
                </div>
              )}
              {store.responseRate && (
                <div>
                  <div className="text-sm text-gray-500 mb-1">Response Rate</div>
                  <div className="font-medium text-gray-900">{store.responseRate}%</div>
                </div>
              )}
              {store.responseTime && (
                <div>
                  <div className="text-sm text-gray-500 mb-1">Response Time</div>
                  <div className="font-medium text-gray-900">{store.responseTime}</div>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="w-full lg:w-auto flex flex-col gap-3">
            <Button className="w-full lg:w-auto bg-blue-600 hover:bg-blue-700">
              <MessageSquare className="w-4 h-4 mr-2" />
              Write a Review
            </Button>
            <Button variant="outline" className="w-full lg:w-auto">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}