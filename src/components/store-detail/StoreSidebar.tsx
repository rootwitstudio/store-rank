"use client";

import { Star, TrendingUp, Globe, Phone, Mail, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StoreSidebarProps {
  store: any;
}

export function StoreSidebar({ store }: StoreSidebarProps) {
  return (
    <div className="hidden lg:block lg:col-span-1 space-y-6">
      {/* Quick Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm">Total Reviews</span>
              <span className="font-semibold">{store.totalReviews.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm">Trust Score</span>
              <span className="font-semibold text-green-600">{store.trustScore}/100</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm">Response Rate</span>
              <span className="font-semibold">{store.responseRate}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm">Avg Response Time</span>
              <span className="font-semibold">{store.responseTime}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rating Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Rating Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Last Month</span>
              <div className="flex items-center gap-2">
                <span className="font-semibold">{store.reviewTrends.lastMonth}</span>
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Last 3 Months</span>
              <div className="flex items-center gap-2">
                <span className="font-semibold">{store.reviewTrends.last3Months}</span>
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Last 6 Months</span>
              <div className="flex items-center gap-2">
                <span className="font-semibold">{store.reviewTrends.last6Months}</span>
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Last Year</span>
              <div className="flex items-center gap-2">
                <span className="font-semibold">{store.reviewTrends.lastYear}</span>
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Contact Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Globe className="w-4 h-4 text-gray-500 flex-shrink-0" />
              <a href={store.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
                Visit Website
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-gray-500 flex-shrink-0" />
              <span className="text-sm">{store.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-gray-500 flex-shrink-0" />
              <span className="text-sm">{store.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-gray-500 flex-shrink-0" />
              <span className="text-sm">{store.headquarters}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Similar Stores */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Similar Stores</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {["eBay", "Walmart", "Target"].map((storeName) => (
              <div key={storeName} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center text-sm font-semibold">
                  {storeName.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">{storeName}</div>
                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    4.1 • 89k reviews
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}