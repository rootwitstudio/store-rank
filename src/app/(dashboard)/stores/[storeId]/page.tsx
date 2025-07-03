"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Star, 
  ExternalLink, 
  Shield, 
  CheckCircle, 
  MapPin, 
  Calendar, 
  Users, 
  Clock, 
  TrendingUp, 
  TrendingDown,
  Globe,
  Phone,
  Mail,
  Building,
  Award,
  AlertTriangle,
  ThumbsUp,
  ThumbsDown,
  Flag,
  Share2,
  Bookmark,
  ChevronDown,
  ChevronUp,
  Filter,
  Search,
  MoreHorizontal,
  Heart,
  MessageSquare,
  Eye,
  ShoppingCart,
  Package,
  Truck,
  CreditCard,
  Headphones
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Header } from "@/components/header";

// Enhanced mock data
const mockStores = [
  {
    id: "1",
    name: "Amazon",
    description: "World's largest online marketplace with millions of products and fast delivery worldwide. Founded in 1994 by Jeff Bezos, Amazon has grown from an online bookstore to a global e-commerce and cloud computing giant.",
    logo: null,
    website: "https://www.amazon.com",
    category: "E-commerce",
    rating: 4.2,
    totalReviews: 125847,
    verified: true,
    claimed: true,
    country: "United States",
    founded: "1994",
    employees: "1.5M+",
    headquarters: "Seattle, WA, USA",
    phone: "+1-888-280-4331",
    email: "customer-service@amazon.com",
    responseTime: "< 1 hour",
    responseRate: 95,
    tags: ["Free Shipping", "Prime Delivery", "Easy Returns", "24/7 Support"],
    trustScore: 92,
    businessType: "Public Company",
    certifications: ["ISO 27001", "SOC 2", "PCI DSS"],
    socialMedia: {
      twitter: "@amazon",
      facebook: "amazon",
      instagram: "amazon"
    },
    keyFeatures: [
      "Prime membership with free shipping",
      "Same-day delivery in select areas",
      "30-day return policy",
      "24/7 customer support",
      "Secure payment processing",
      "Product reviews and ratings"
    ],
    popularProducts: [
      { name: "Echo Dot (5th Gen)", price: "$49.99", rating: 4.6, reviews: 45231 },
      { name: "Fire TV Stick 4K Max", price: "$54.99", rating: 4.5, reviews: 32145 },
      { name: "Kindle Paperwhite", price: "$139.99", rating: 4.7, reviews: 28934 },
      { name: "AmazonBasics USB Cable", price: "$8.99", rating: 4.3, reviews: 15678 }
    ],
    recentNews: [
      {
        title: "Amazon announces new sustainability initiatives",
        date: "2024-01-15",
        summary: "Company commits to carbon neutrality by 2040"
      },
      {
        title: "Prime membership benefits expanded",
        date: "2024-01-10",
        summary: "New perks added for Prime subscribers"
      }
    ],
    ratingBreakdown: {
      5: 65234,
      4: 32145,
      3: 18765,
      2: 6543,
      1: 3160
    },
    reviewTrends: {
      lastMonth: 4.3,
      last3Months: 4.2,
      last6Months: 4.1,
      lastYear: 4.0
    }
  }
];

const mockReviews = [
  {
    id: "1",
    author: "Sarah Johnson",
    avatar: null,
    rating: 5,
    title: "Excellent service and fast delivery",
    content: "I've been shopping with Amazon for over 5 years and they consistently deliver excellent service. The Prime membership is worth every penny - free shipping, fast delivery, and great customer service. Recently ordered a laptop and it arrived the next day in perfect condition.",
    date: "2024-01-20",
    verified: true,
    helpful: 24,
    location: "New York, USA",
    orderValue: "$1,299",
    productCategory: "Electronics"
  },
  {
    id: "2",
    author: "Mike Chen",
    avatar: null,
    rating: 4,
    title: "Good overall experience with minor issues",
    content: "Amazon has a vast selection and competitive prices. Delivery is usually fast with Prime. Had one issue with a damaged package but customer service resolved it quickly with a full refund. The return process is straightforward.",
    date: "2024-01-18",
    verified: true,
    helpful: 18,
    location: "California, USA",
    orderValue: "$89",
    productCategory: "Home & Garden"
  },
  {
    id: "3",
    author: "Emma Wilson",
    avatar: null,
    rating: 5,
    title: "Outstanding customer support",
    content: "Had an issue with my order and contacted customer support through chat. The representative was knowledgeable, friendly, and resolved my issue within minutes. This is why I keep coming back to Amazon.",
    date: "2024-01-15",
    verified: true,
    helpful: 31,
    location: "London, UK",
    orderValue: "$156",
    productCategory: "Books"
  },
  {
    id: "4",
    author: "David Rodriguez",
    avatar: null,
    rating: 3,
    title: "Mixed experience - good products, delivery delays",
    content: "Product quality is generally good and prices are competitive. However, I've experienced several delivery delays recently, even with Prime. Customer service is helpful but sometimes takes time to respond.",
    date: "2024-01-12",
    verified: true,
    helpful: 12,
    location: "Texas, USA",
    orderValue: "$234",
    productCategory: "Sports & Outdoors"
  },
  {
    id: "5",
    author: "Lisa Thompson",
    avatar: null,
    rating: 5,
    title: "Love the convenience and selection",
    content: "Amazon makes shopping so convenient. The mobile app is user-friendly, product descriptions are detailed, and the review system helps make informed decisions. Prime Video is a nice bonus too!",
    date: "2024-01-10",
    verified: true,
    helpful: 19,
    location: "Ontario, Canada",
    orderValue: "$67",
    productCategory: "Beauty & Personal Care"
  }
];

function StarRating({ rating, size = "sm", showNumber = true }: { rating: number; size?: "sm" | "md" | "lg"; showNumber?: boolean }) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6"
  };

  return (
    <div className="flex items-center gap-1">
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

function RatingBreakdown({ breakdown, totalReviews }: { breakdown: any; totalReviews: number }) {
  return (
    <div className="space-y-2">
      {[5, 4, 3, 2, 1].map((stars) => {
        const count = breakdown[stars] || 0;
        const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
        
        return (
          <div key={stars} className="flex items-center gap-3 text-sm">
            <div className="flex items-center gap-1 w-12">
              <span className="text-gray-600">{stars}</span>
              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            </div>
            <div className="flex-1">
              <Progress value={percentage} className="h-2" />
            </div>
            <span className="text-gray-600 w-16 text-right">
              {count.toLocaleString()}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function ReviewCard({ review }: { review: any }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHelpful, setIsHelpful] = useState(false);

  return (
    <Card className="border border-gray-200">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="w-12 h-12">
            <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
              {review.author.split(' ').map((n: string) => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-gray-900">{review.author}</h4>
                  {review.verified && (
                    <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200 text-xs">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>{review.location}</span>
                  <span>•</span>
                  <span>{new Date(review.date).toLocaleDateString()}</span>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="mb-3">
              <StarRating rating={review.rating} size="sm" />
            </div>
            
            <h5 className="font-semibold text-gray-900 mb-2">{review.title}</h5>
            
            <div className="text-gray-700 text-sm leading-relaxed mb-4">
              {isExpanded ? review.content : `${review.content.slice(0, 200)}${review.content.length > 200 ? '...' : ''}`}
              {review.content.length > 200 && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-blue-600 hover:text-blue-800 ml-1 font-medium"
                >
                  {isExpanded ? 'Show less' : 'Read more'}
                </button>
              )}
            </div>
            
            <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
              <span>Order value: {review.orderValue}</span>
              <span>•</span>
              <span>Category: {review.productCategory}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsHelpful(!isHelpful)}
                  className={`flex items-center gap-1 text-sm ${
                    isHelpful ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <ThumbsUp className="w-4 h-4" />
                  Helpful ({review.helpful + (isHelpful ? 1 : 0)})
                </button>
                <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
                  <Flag className="w-4 h-4" />
                  Report
                </button>
              </div>
              <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
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

  const store = mockStores.find((s) => s.id === storeId);

  if (!store) {
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Store not found</h1>
            <Button onClick={() => router.push("/stores")}>
              Back to Stores
            </Button>
          </div>
        </main>
      </div>
    );
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: Eye },
    { id: "reviews", label: `Reviews (${store.totalReviews.toLocaleString()})`, icon: MessageSquare },
    { id: "products", label: "Popular Products", icon: Package },
    { id: "company", label: "Company Info", icon: Building },
    { id: "news", label: "News & Updates", icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Store Header */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left: Store Info */}
              <div className="flex-1">
                <div className="flex items-start gap-6 mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    {store.name.charAt(0)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-3xl font-bold text-gray-900">{store.name}</h1>
                      <div className="flex items-center gap-2">
                        {store.verified && (
                          <Badge className="bg-green-100 text-green-800 border-green-200">
                            <Shield className="w-4 h-4 mr-1" />
                            Verified
                          </Badge>
                        )}
                        {store.claimed && (
                          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Claimed
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-gray-500" />
                        <a 
                          href={store.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          {new URL(store.website).hostname.replace('www.', '')}
                        </a>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <MapPin className="w-4 h-4" />
                        {store.country}
                      </div>
                      <Badge variant="outline">{store.category}</Badge>
                    </div>
                    
                    <p className="text-gray-600 leading-relaxed mb-6">{store.description}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {store.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-gray-100">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    <ExternalLink className="w-5 h-5 mr-2" />
                    Visit Website
                  </Button>
                  <Button variant="outline" size="lg" onClick={() => setShowWriteReview(true)}>
                    <Star className="w-5 h-5 mr-2" />
                    Write Review
                  </Button>
                  <Button variant="outline" size="lg">
                    <Bookmark className="w-5 h-5 mr-2" />
                    Save Store
                  </Button>
                  <Button variant="outline" size="lg">
                    <Share2 className="w-5 h-5 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
              
              {/* Right: Rating & Stats */}
              <div className="lg:w-80">
                <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4">
                      <div className="text-5xl font-bold text-gray-900 mb-2">{store.rating.toFixed(1)}</div>
                      <StarRating rating={store.rating} size="lg" showNumber={false} />
                      <div className="text-sm text-gray-600 mt-2">
                        Based on {store.totalReviews.toLocaleString()} reviews
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-green-600">{store.trustScore}</div>
                        <div className="text-xs text-gray-600">Trust Score</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-600">{store.responseRate}%</div>
                        <div className="text-xs text-gray-600">Response Rate</div>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-blue-200">
                      <div className="text-sm text-gray-600">
                        <div className="flex justify-between mb-1">
                          <span>Response Time:</span>
                          <span className="font-medium">{store.responseTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Founded:</span>
                          <span className="font-medium">{store.founded}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                      activeTab === tab.id
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
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

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Rating Breakdown */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Rating Breakdown
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RatingBreakdown breakdown={store.ratingBreakdown} totalReviews={store.totalReviews} />
                  </CardContent>
                </Card>

                {/* Key Features */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      Key Features
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {store.keyFeatures.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Reviews Preview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-5 h-5" />
                        Recent Reviews
                      </div>
                      <Button variant="outline" size="sm" onClick={() => setActiveTab("reviews")}>
                        View All
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockReviews.slice(0, 2).map((review) => (
                        <ReviewCard key={review.id} review={review} />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-6">
                {/* Review Filters */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1">
                        <Select value={reviewFilter} onValueChange={setReviewFilter}>
                          <SelectTrigger>
                            <SelectValue placeholder="Filter reviews" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Reviews</SelectItem>
                            <SelectItem value="5">5 Stars</SelectItem>
                            <SelectItem value="4">4 Stars</SelectItem>
                            <SelectItem value="3">3 Stars</SelectItem>
                            <SelectItem value="2">2 Stars</SelectItem>
                            <SelectItem value="1">1 Star</SelectItem>
                            <SelectItem value="verified">Verified Only</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex-1">
                        <Select value={reviewSort} onValueChange={setReviewSort}>
                          <SelectTrigger>
                            <SelectValue placeholder="Sort by" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="newest">Newest First</SelectItem>
                            <SelectItem value="oldest">Oldest First</SelectItem>
                            <SelectItem value="highest">Highest Rated</SelectItem>
                            <SelectItem value="lowest">Lowest Rated</SelectItem>
                            <SelectItem value="helpful">Most Helpful</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Reviews List */}
                <div className="space-y-4">
                  {mockReviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                </div>

                {/* Load More */}
                <div className="text-center">
                  <Button variant="outline" size="lg">
                    Load More Reviews
                  </Button>
                </div>
              </div>
            )}

            {activeTab === "products" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Popular Products
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {store.popularProducts.map((product, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">{product.name}</h4>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-lg font-bold text-green-600">{product.price}</span>
                          <StarRating rating={product.rating} size="sm" />
                        </div>
                        <div className="text-sm text-gray-500">
                          {product.reviews.toLocaleString()} reviews
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "company" && (
              <div className="space-y-6">
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
                          <label className="text-sm font-medium text-gray-500">Founded</label>
                          <div className="text-gray-900">{store.founded}</div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Employees</label>
                          <div className="text-gray-900">{store.employees}</div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Headquarters</label>
                          <div className="text-gray-900">{store.headquarters}</div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Business Type</label>
                          <div className="text-gray-900">{store.businessType}</div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-gray-500">Phone</label>
                          <div className="text-gray-900">{store.phone}</div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Email</label>
                          <div className="text-gray-900">{store.email}</div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Certifications</label>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {store.certifications.map((cert) => (
                              <Badge key={cert} variant="outline">{cert}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "news" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Recent News & Updates
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {store.recentNews.map((news, index) => (
                      <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                        <h4 className="font-semibold text-gray-900 mb-2">{news.title}</h4>
                        <p className="text-gray-600 text-sm mb-2">{news.summary}</p>
                        <div className="text-xs text-gray-500">
                          {new Date(news.date).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Reviews</span>
                    <span className="font-semibold">{store.totalReviews.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Trust Score</span>
                    <span className="font-semibold text-green-600">{store.trustScore}/100</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Response Rate</span>
                    <span className="font-semibold">{store.responseRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Avg Response Time</span>
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
                <div className="space-y-3">
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
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Globe className="w-4 h-4 text-gray-500" />
                    <a href={store.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
                      Visit Website
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{store.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{store.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-gray-500" />
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
                    <div key={storeName} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center text-sm font-semibold">
                        {storeName.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{storeName}</div>
                        <div className="text-xs text-gray-500">4.1 ★ • 89k reviews</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}