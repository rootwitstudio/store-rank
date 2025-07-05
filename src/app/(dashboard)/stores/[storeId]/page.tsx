"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Store as StoreIcon,
  TrendingUp,
  Award,
  CheckCircle,
  Package,
  Building,
  MessageSquare,
  Star,
  Filter,
  Eye,
  ExternalLink,
  Globe,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Users,
  ShieldCheck,
  AlertTriangle,
  Loader2,
  Link as LinkIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Header } from "@/components/header";
import { StoreHeader } from "@/components/store-detail/StoreHeader";
import { ReviewCard } from "@/components/store-detail/ReviewCard";
import { RatingBreakdown } from "@/components/store-detail/RatingBreakdown";
import { WriteReviewModal } from "@/components/store-detail/WriteReviewModal";
import { MobileNavTabs } from "@/components/store-detail/MobileNavTabs";
import { StoreSidebar } from "@/components/store-detail/StoreSidebar";
import { useStoreDetails } from "@/stores/storeDetailsStore";
import Link from "next/link";

function ensureHttps(url: string) {
  if (!url) return url;
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  return `https://${url}`;
}

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  const starSize = size === "sm" ? "w-4 h-4" : "w-5 h-5";

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${starSize} ${star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
        />
      ))}
    </div>
  );
}

export default function StoreDetailPage({
  params,
}: {
  params: Promise<{ storeId: string }>;
}) {
  const router = useRouter();
  const { storeId } = use(params);
  const [activeTab, setActiveTab] = useState("overview");
  const [reviewFilter, setReviewFilter] = useState("all");
  const [reviewSort, setReviewSort] = useState("newest");
  const [showWriteReview, setShowWriteReview] = useState(false);
  const { storeDetails, fetchStore } = useStoreDetails();
  const { data: store, loading, error } = storeDetails;

  useEffect(() => {
    if (storeId) {
      fetchStore(storeId);
    }
  }, [storeId, fetchStore]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">

        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-blue-600" />
              <p className="text-gray-600 text-lg">Loading store details...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">

        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-red-500" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Store</h2>
              <p className="text-gray-600 mb-4">{error}</p>
              <Button onClick={() => fetchStore(storeId)} className="mr-4">
                Try Again
              </Button>
              <Button variant="outline" onClick={() => router.back()}>
                Go Back
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!store) {
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <StoreIcon className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Store Not Found</h2>
              <p className="text-gray-600 mb-4">The store you're looking for doesn't exist.</p>
              <Button onClick={() => router.back()}>
                Go Back
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">


      <main className="container mx-auto px-4 py-6">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Search
          </Button>
        </div>

        {/* Store Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center">
                {store.logo ? (
                  <img
                    src={store.logo}
                    alt={`${store.name} logo`}
                    className="w-16 h-16 object-contain rounded-lg"
                  />
                ) : (
                  <span className="text-2xl font-bold text-blue-600">
                    {store.name.charAt(0)}
                  </span>
                )}
              </div>
            </div>

            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                    {store.name}
                  </h1>
                  <div className="flex items-center gap-3 mb-3">
                    {store.verified && (
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                    {store.claimed && (
                      <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                        <ShieldCheck className="w-3 h-3 mr-1" />
                        Claimed
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <StarRating rating={store.rating} size="md" />
                      <span className="text-xl font-bold text-gray-900">
                        {store.rating.toFixed(1)}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {store.totalRatings} review{store.totalRatings !== 1 ? 's' : ''}
                    </div>
                  </div>
                </div>
              </div>

              {store.description && (
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {store.description}
                </p>
              )}

              <div className="flex flex-wrap gap-2 mb-4">
                {store.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                {store.website && (
                  <a
                    href={store.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-blue-600"
                  >
                    <Globe className="w-4 h-4" />
                    Website
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                {store.email && (
                  <div className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    {store.email}
                  </div>
                )}
                {store.mobile && (
                  <div className="flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    {store.mobile}
                  </div>
                )}
                {store.country && (
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {store.country}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex overflow-x-auto">
              {[
                { id: "overview", label: "Overview", icon: Eye },
                { id: "company", label: "Company", icon: Building },
                { id: "reviews", label: "Reviews", icon: MessageSquare },
                { id: "contact", label: "Contact", icon: Phone },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <StoreIcon className="w-5 h-5" />
                      Store Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-gray-500">Store Name</label>
                          <div className="text-gray-900 font-medium">{store.name}</div>
                        </div>
                        {store.foundedYear && (
                          <div>
                            <label className="text-sm font-medium text-gray-500">Founded</label>
                            <div className="text-gray-900 font-medium">{store.foundedYear}</div>
                          </div>
                        )}
                        {store.employeeCount && (
                          <div>
                            <label className="text-sm font-medium text-gray-500">Employee Count</label>
                            <div className="text-gray-900 font-medium">{store.employeeCount}</div>
                          </div>
                        )}
                        {store.ceoOwner && (
                          <div>
                            <label className="text-sm font-medium text-gray-500">CEO/Owner</label>
                            <div className="text-gray-900 font-medium">{store.ceoOwner}</div>
                          </div>
                        )}
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-gray-500">Created</label>
                          <div className="text-gray-900 font-medium">
                            {new Date(store.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Last Updated</label>
                          <div className="text-gray-900 font-medium">
                            {new Date(store.updatedAt).toLocaleDateString()}
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Total Ratings</label>
                          <div className="text-gray-900 font-medium">{store.totalRatings}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {store.storeCategories && store.storeCategories.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Package className="w-5 h-5" />
                        Categories
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {store?.storeCategories?.map((category, index) => (
                          <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            {category.name || category}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {activeTab === "company" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="w-5 h-5" />
                    Company Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Company Name</label>
                        <div className="text-gray-900 font-medium">{store.name}</div>
                      </div>
                      {store.website && (
                        <div>
                          <label className="text-sm font-medium text-gray-500">Website</label>
                          <a
                            href={ensureHttps(store.website)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                          >
                            {store.website}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      )}
                      {store.foundedYear && (
                        <div>
                          <label className="text-sm font-medium text-gray-500">Founded</label>
                          <div className="text-gray-900 font-medium">{store.foundedYear}</div>
                        </div>
                      )}
                      {store.employeeCount && (
                        <div>
                          <label className="text-sm font-medium text-gray-500">Employee Count</label>
                          <div className="text-gray-900 font-medium">{store.employeeCount}</div>
                        </div>
                      )}
                    </div>
                    <div className="space-y-4">
                      {store.ceoOwner && (
                        <div>
                          <label className="text-sm font-medium text-gray-500">CEO/Owner</label>
                          <div className="text-gray-900 font-medium">{store.ceoOwner}</div>
                        </div>
                      )}
                      {store.users && store.users.length > 0 && (
                        <div>
                          <label className="text-sm font-medium text-gray-500">Business Users</label>
                          <div className="space-y-2">
                            {store.users.map((user) => (
                              <div key={user.id} className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                  <span className="text-sm font-medium text-blue-600">
                                    {user.name.charAt(0)}
                                  </span>
                                </div>
                                <div>
                                  <div className="text-sm font-medium">{user.name}</div>
                                  <div className="text-xs text-gray-500">{user.role}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "reviews" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Customer Reviews
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Reviews Yet</h3>
                    <p className="text-gray-600 mb-4">Be the first to review this store</p>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Write a Review
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "contact" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="w-5 h-5" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {store.email && (
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-gray-500" />
                        <div>
                          <label className="text-sm font-medium text-gray-500">Email</label>
                          <div className="text-gray-900 font-medium">{store.email}</div>
                        </div>
                      </div>
                    )}
                    {store.mobile && (
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-gray-500" />
                        <div>
                          <label className="text-sm font-medium text-gray-500">Mobile</label>
                          <div className="text-gray-900 font-medium">{store.mobile}</div>
                        </div>
                      </div>
                    )}
                    {store.website && (
                      <div className="flex items-center gap-3">
                        <Globe className="w-5 h-5 text-gray-500" />
                        <div>
                          <label className="text-sm font-medium text-gray-500">Website</label>
                          <a
                            href={ensureHttps(store.website)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                          >
                            {store.website}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    )}
                    {(store.address1 || store.city || store.state || store.country) && (
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                        <div>
                          <label className="text-sm font-medium text-gray-500">Address</label>
                          <div className="text-gray-900 font-medium">
                            {store.address1 && <div>{store.address1}</div>}
                            {store.address2 && <div>{store.address2}</div>}
                            <div>
                              {[store.city, store.state, store.pincode, store.country]
                                .filter(Boolean)
                                .join(', ')}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {store.website && (
                  <Button
                    asChild
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <a href={ensureHttps(store.website)} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Visit Website
                    </a>
                  </Button>
                )}
                <Button variant="outline" className="w-full">
                  <Star className="w-4 h-4 mr-2" />
                  Write Review
                </Button>
                <Button variant="outline" className="w-full">
                  <LinkIcon className="w-4 h-4 mr-2" />
                  Share Store
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Store Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Overall Rating</span>
                    <div className="flex items-center gap-2">
                      <StarRating rating={store.rating} size="sm" />
                      <span className="font-medium">{store.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Reviews</span>
                    <span className="font-medium">{store.totalRatings}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Verified</span>
                    <Badge variant={store.verified ? "default" : "secondary"}>
                      {store.verified ? "Yes" : "No"}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Claimed</span>
                    <Badge variant={store.claimed ? "default" : "secondary"}>
                      {store.claimed ? "Yes" : "No"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
