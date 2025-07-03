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
  Headphones,
  ArrowLeft,
  Info,
  Verified,
  BadgeCheck,
  Store as StoreIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Header } from "@/components/header";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Enhanced mock data with more comprehensive information
const mockStores = [
  {
    id: "1",
    name: "Amazon",
    description: "World's largest online marketplace with millions of products and fast delivery worldwide. Founded in 1994 by Jeff Bezos, Amazon has grown from an online bookstore to a global e-commerce and cloud computing giant serving customers in over 100 countries.",
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
    certifications: ["ISO 27001", "SOC 2", "PCI DSS", "Better Business Bureau A+"],
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
      "Product reviews and ratings",
      "Amazon Web Services (AWS)",
      "Alexa voice assistant integration"
    ],
    popularProducts: [
      { name: "Echo Dot (5th Gen)", price: "$49.99", rating: 4.6, reviews: 45231, category: "Smart Home" },
      { name: "Fire TV Stick 4K Max", price: "$54.99", rating: 4.5, reviews: 32145, category: "Electronics" },
      { name: "Kindle Paperwhite", price: "$139.99", rating: 4.7, reviews: 28934, category: "Books & Media" },
      { name: "AmazonBasics USB Cable", price: "$8.99", rating: 4.3, reviews: 15678, category: "Accessories" }
    ],
    recentNews: [
      {
        title: "Amazon announces new sustainability initiatives",
        date: "2024-01-15",
        summary: "Company commits to carbon neutrality by 2040 with $10 billion investment in clean energy"
      },
      {
        title: "Prime membership benefits expanded",
        date: "2024-01-10",
        summary: "New perks added for Prime subscribers including exclusive deals and faster delivery"
      },
      {
        title: "Amazon opens new fulfillment centers",
        date: "2024-01-05",
        summary: "Five new facilities to improve delivery times and create 10,000 jobs"
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
    },
    businessMetrics: {
      monthlyVisitors: "2.8B",
      marketShare: "38%",
      customerSatisfaction: "87%",
      returnRate: "8.5%"
    },
    awards: [
      "Fortune 500 #2",
      "Best Employer 2024",
      "Innovation Leader",
      "Customer Choice Award"
    ]
  }
];

const mockReviews = [
  {
    id: "1",
    author: "Sarah Johnson",
    avatar: null,
    rating: 5,
    title: "Excellent service and fast delivery",
    content: "I've been shopping with Amazon for over 5 years and they consistently deliver excellent service. The Prime membership is worth every penny - free shipping, fast delivery, and great customer service. Recently ordered a laptop and it arrived the next day in perfect condition. The packaging was secure and the product exactly as described. Customer support was helpful when I had questions about warranty coverage.",
    date: "2024-01-20",
    verified: true,
    helpful: 24,
    location: "New York, USA",
    orderValue: "$1,299",
    productCategory: "Electronics",
    pros: ["Fast delivery", "Great customer service", "Secure packaging"],
    cons: ["Prices could be better"],
    wouldRecommend: true
  },
  {
    id: "2",
    author: "Mike Chen",
    avatar: null,
    rating: 4,
    title: "Good overall experience with minor issues",
    content: "Amazon has a vast selection and competitive prices. Delivery is usually fast with Prime. Had one issue with a damaged package but customer service resolved it quickly with a full refund. The return process is straightforward and hassle-free. Website is easy to navigate and product descriptions are detailed.",
    date: "2024-01-18",
    verified: true,
    helpful: 18,
    location: "California, USA",
    orderValue: "$89",
    productCategory: "Home & Garden",
    pros: ["Wide selection", "Easy returns", "Competitive prices"],
    cons: ["Occasional packaging issues"],
    wouldRecommend: true
  },
  {
    id: "3",
    author: "Emma Wilson",
    avatar: null,
    rating: 5,
    title: "Outstanding customer support",
    content: "Had an issue with my order and contacted customer support through chat. The representative was knowledgeable, friendly, and resolved my issue within minutes. This is why I keep coming back to Amazon. They really care about customer satisfaction and it shows in every interaction.",
    date: "2024-01-15",
    verified: true,
    helpful: 31,
    location: "London, UK",
    orderValue: "$156",
    productCategory: "Books",
    pros: ["Excellent support", "Quick resolution", "Friendly staff"],
    cons: ["None"],
    wouldRecommend: true
  },
  {
    id: "4",
    author: "David Rodriguez",
    avatar: null,
    rating: 3,
    title: "Mixed experience - good products, delivery delays",
    content: "Product quality is generally good and prices are competitive. However, I've experienced several delivery delays recently, even with Prime. Customer service is helpful but sometimes takes time to respond. The mobile app could use some improvements for better user experience.",
    date: "2024-01-12",
    verified: true,
    helpful: 12,
    location: "Texas, USA",
    orderValue: "$234",
    productCategory: "Sports & Outdoors",
    pros: ["Good product quality", "Competitive prices"],
    cons: ["Delivery delays", "App issues"],
    wouldRecommend: true
  },
  {
    id: "5",
    author: "Lisa Thompson",
    avatar: null,
    rating: 5,
    title: "Love the convenience and selection",
    content: "Amazon makes shopping so convenient. The mobile app is user-friendly, product descriptions are detailed, and the review system helps make informed decisions. Prime Video is a nice bonus too! The recommendation engine is surprisingly accurate.",
    date: "2024-01-10",
    verified: true,
    helpful: 19,
    location: "Ontario, Canada",
    orderValue: "$67",
    productCategory: "Beauty & Personal Care",
    pros: ["Convenient", "Great selection", "Good recommendations"],
    cons: ["Can be addictive"],
    wouldRecommend: true
  }
];

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

function RatingBreakdown({ breakdown, totalReviews }: { breakdown: any; totalReviews: number }) {
  return (
    <div className="space-y-3">
      {[5, 4, 3, 2, 1].map((stars) => {
        const count = breakdown[stars] || 0;
        const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
        
        return (
          <div key={stars} className="flex items-center gap-3 text-sm">
            <div className="flex items-center gap-1 w-16 flex-shrink-0">
              <span className="text-gray-600 font-medium">{stars}</span>
              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            </div>
            <div className="flex-1">
              <Progress value={percentage} className="h-2" />
            </div>
            <span className="text-gray-600 w-20 text-right font-medium">
              {count.toLocaleString()}
            </span>
            <span className="text-gray-500 w-12 text-right text-xs">
              {percentage.toFixed(1)}%
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
    <Card className="border border-gray-200 hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-start gap-4 flex-1">
            <Avatar className="w-12 h-12 flex-shrink-0">
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold">
                {review.author.split(' ').map((n: string) => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
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
                  <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
                    <span>{review.location}</span>
                    <span>•</span>
                    <span>{new Date(review.date).toLocaleDateString()}</span>
                    <span>•</span>
                    <span className="text-green-600 font-medium">{review.orderValue}</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="flex-shrink-0">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="mb-3">
                <StarRating rating={review.rating} size="sm" />
              </div>
              
              <h5 className="font-semibold text-gray-900 mb-3">{review.title}</h5>
              
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
              
              {/* Pros and Cons */}
              {(review.pros?.length > 0 || review.cons?.length > 0) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  {review.pros?.length > 0 && (
                    <div>
                      <h6 className="text-sm font-medium text-green-700 mb-2 flex items-center gap-1">
                        <ThumbsUp className="w-3 h-3" />
                        Pros
                      </h6>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {review.pros.map((pro: string, index: number) => (
                          <li key={index} className="flex items-start gap-1">
                            <span className="text-green-500 mt-1">•</span>
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {review.cons?.length > 0 && (
                    <div>
                      <h6 className="text-sm font-medium text-red-700 mb-2 flex items-center gap-1">
                        <ThumbsDown className="w-3 h-3" />
                        Cons
                      </h6>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {review.cons.map((con: string, index: number) => (
                          <li key={index} className="flex items-start gap-1">
                            <span className="text-red-500 mt-1">•</span>
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
              
              <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 flex-wrap">
                <span>Category: {review.productCategory}</span>
                {review.wouldRecommend && (
                  <>
                    <span>•</span>
                    <span className="text-green-600 font-medium">Would recommend</span>
                  </>
                )}
              </div>
              
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setIsHelpful(!isHelpful)}
                    className={`flex items-center gap-1 text-sm transition-colors ${
                      isHelpful ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <ThumbsUp className="w-4 h-4" />
                    Helpful ({review.helpful + (isHelpful ? 1 : 0)})
                  </button>
                  <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors">
                    <Flag className="w-4 h-4" />
                    Report
                  </button>
                </div>
                <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function WriteReviewModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Write a Review</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              ×
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="text-sm font-medium mb-2 block">Overall Rating</Label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="transition-colors"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-sm text-gray-600">
                {rating > 0 && `${rating} star${rating !== 1 ? 's' : ''}`}
              </span>
            </div>
          </div>

          <div>
            <Label htmlFor="review-title" className="text-sm font-medium mb-2 block">
              Review Title
            </Label>
            <Input
              id="review-title"
              placeholder="Summarize your experience"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="review-content" className="text-sm font-medium mb-2 block">
              Your Review
            </Label>
            <Textarea
              id="review-content"
              placeholder="Share your experience with this store..."
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={onClose} variant="outline" className="flex-1">
              Cancel
            </Button>
            <Button className="flex-1" disabled={rating === 0 || !title.trim() || !content.trim()}>
              Submit Review
            </Button>
          </div>
        </CardContent>
      </Card>
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

  const store = mockStores.find((s) => s.id === storeId);

  if (!store) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <StoreIcon className="w-8 h-8 text-gray-400" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Store not found</h1>
            <p className="text-gray-600 mb-6">The store you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => router.push("/stores")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
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
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <button onClick={() => router.push("/stores")} className="hover:text-gray-700">
            Stores
          </button>
          <span>/</span>
          <span className="text-gray-900 font-medium">{store.name}</span>
        </nav>

        {/* Store Header */}
        <Card className="mb-8 border-0 shadow-lg bg-gradient-to-r from-white to-blue-50">
          <CardContent className="p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Store Info - Takes 2 columns on large screens */}
              <div className="lg:col-span-2">
                <div className="flex flex-col sm:flex-row gap-6 mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg flex-shrink-0">
                    {store.name.charAt(0)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                      <div className="min-w-0">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{store.name}</h1>
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
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-gray-500 flex-shrink-0" />
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
                        <MapPin className="w-4 h-4 text-gray-500 flex-shrink-0" />
                        <span className="text-gray-700 truncate">{store.country}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500 flex-shrink-0" />
                        <span className="text-gray-700">Founded {store.founded}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-500 flex-shrink-0" />
                        <span className="text-gray-700">{store.employees} employees</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">{store.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {store.tags.slice(0, 4).map((tag) => (
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
                    
                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3">
                      <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
                        <a href={store.website} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Visit Website
                        </a>
                      </Button>
                      <Button variant="outline" size="lg" onClick={() => setShowWriteReview(true)}>
                        <Star className="w-4 h-4 mr-2" />
                        Write Review
                      </Button>
                      <Button variant="outline" size="lg">
                        <Bookmark className="w-4 h-4 mr-2" />
                        Save
                      </Button>
                      <Button variant="outline" size="lg">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Rating Card - Takes 1 column on large screens */}
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

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200 overflow-x-auto">
            <nav className="flex space-x-8 min-w-max">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === "overview" && (
              <div className="space-y-8">
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

                {/* Business Metrics */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Business Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{store.businessMetrics.monthlyVisitors}</div>
                        <div className="text-sm text-gray-600">Monthly Visitors</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{store.businessMetrics.marketShare}</div>
                        <div className="text-sm text-gray-600">Market Share</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">{store.businessMetrics.customerSatisfaction}</div>
                        <div className="text-sm text-gray-600">Customer Satisfaction</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">{store.businessMetrics.returnRate}</div>
                        <div className="text-sm text-gray-600">Return Rate</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Key Features */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      Key Features & Services
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {store.keyFeatures.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700 font-medium">{feature}</span>
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
                        View All Reviews
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
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
                      <Button onClick={() => setShowWriteReview(true)}>
                        <Star className="w-4 h-4 mr-2" />
                        Write Review
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Reviews List */}
                <div className="space-y-6">
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {store.popularProducts.map((product, index) => (
                      <Card key={index} className="border border-gray-200">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <h4 className="font-semibold text-gray-900 flex-1">{product.name}</h4>
                            <Badge variant="outline" className="ml-2">{product.category}</Badge>
                          </div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xl font-bold text-green-600">{product.price}</span>
                            <StarRating rating={product.rating} size="sm" />
                          </div>
                          <div className="text-sm text-gray-500">
                            {product.reviews.toLocaleString()} reviews
                          </div>
                        </CardContent>
                      </Card>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div>
                          <label className="text-sm font-medium text-gray-500 block mb-1">Founded</label>
                          <div className="text-gray-900 font-medium">{store.founded}</div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 block mb-1">Employees</label>
                          <div className="text-gray-900 font-medium">{store.employees}</div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 block mb-1">Headquarters</label>
                          <div className="text-gray-900 font-medium">{store.headquarters}</div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 block mb-1">Business Type</label>
                          <div className="text-gray-900 font-medium">{store.businessType}</div>
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div>
                          <label className="text-sm font-medium text-gray-500 block mb-1">Phone</label>
                          <div className="text-gray-900 font-medium">{store.phone}</div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 block mb-1">Email</label>
                          <div className="text-gray-900 font-medium">{store.email}</div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 block mb-2">Certifications</label>
                          <div className="flex flex-wrap gap-2">
                            {store.certifications.map((cert) => (
                              <Badge key={cert} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                {cert}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500 block mb-2">Awards & Recognition</label>
                          <div className="flex flex-wrap gap-2">
                            {store.awards.map((award) => (
                              <Badge key={award} variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                                <Award className="w-3 h-3 mr-1" />
                                {award}
                              </Badge>
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
                  <div className="space-y-6">
                    {store.recentNews.map((news, index) => (
                      <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                        <div className="flex items-start gap-4">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-2">{news.title}</h4>
                            <p className="text-gray-600 text-sm mb-3 leading-relaxed">{news.summary}</p>
                            <div className="text-xs text-gray-500">
                              {new Date(news.date).toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
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
        </div>
      </main>

      {/* Write Review Modal */}
      <WriteReviewModal isOpen={showWriteReview} onClose={() => setShowWriteReview(false)} />
    </div>
  );
}