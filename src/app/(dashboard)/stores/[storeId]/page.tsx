"use client";

import { use, useState } from "react";
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
  Eye
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

// Enhanced mock data
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

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5"
  };

  return (
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

  return (
    <div className="min-h-screen bg-gray-50">      
      <main className="container mx-auto px-4 py-4 sm:py-6 max-w-7xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4 sm:mb-6">
          <button onClick={() => router.push("/stores")} className="hover:text-gray-700">
            Stores
          </button>
          <span>/</span>
          <span className="text-gray-900 font-medium truncate">{store.name}</span>
        </nav>

        {/* Store Header */}
        <div className="mb-6 sm:mb-8">
          <StoreHeader store={store} onWriteReview={() => setShowWriteReview(true)} />
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6 sm:mb-8">
          <MobileNavTabs 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
            reviewCount={store.totalReviews}
          />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Rating Breakdown */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
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
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <TrendingUp className="w-5 h-5" />
                      Business Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                      <div className="text-center">
                        <div className="text-xl sm:text-2xl font-bold text-blue-600">{store.businessMetrics.monthlyVisitors}</div>
                        <div className="text-xs sm:text-sm text-gray-600">Monthly Visitors</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl sm:text-2xl font-bold text-green-600">{store.businessMetrics.marketShare}</div>
                        <div className="text-xs sm:text-sm text-gray-600">Market Share</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl sm:text-2xl font-bold text-purple-600">{store.businessMetrics.customerSatisfaction}</div>
                        <div className="text-xs sm:text-sm text-gray-600">Customer Satisfaction</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl sm:text-2xl font-bold text-orange-600">{store.businessMetrics.returnRate}</div>
                        <div className="text-xs sm:text-sm text-gray-600">Return Rate</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Key Features */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Award className="w-5 h-5" />
                      Key Features & Services
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {store.keyFeatures.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0 mt-0.5" />
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
                        View All
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 sm:space-y-6">
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
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
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
                      <Button onClick={() => setShowWriteReview(true)} className="sm:w-auto">
                        <Star className="w-4 h-4 mr-2" />
                        Write Review
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Reviews List */}
                <div className="space-y-4 sm:space-y-6">
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
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Package className="w-5 h-5" />
                    Popular Products
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {store.popularProducts.map((product, index) => (
                      <Card key={index} className="border border-gray-200">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <h4 className="font-semibold text-gray-900 flex-1 text-sm sm:text-base">{product.name}</h4>
                            <Badge variant="outline" className="ml-2 text-xs">{product.category}</Badge>
                          </div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-lg sm:text-xl font-bold text-green-600">{product.price}</span>
                            <StarRating rating={product.rating} size="sm" />
                          </div>
                          <div className="text-xs sm:text-sm text-gray-500">
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
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Building className="w-5 h-5" />
                    Company Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                    <div className="space-y-4 sm:space-y-6">
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
                    <div className="space-y-4 sm:space-y-6">
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
                            <Badge key={cert} variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                              {cert}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500 block mb-2">Awards & Recognition</label>
                        <div className="flex flex-wrap gap-2">
                          {store.awards.map((award) => (
                            <Badge key={award} variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 text-xs">
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
            )}

            {activeTab === "news" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
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
                            <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">{news.title}</h4>
                            <p className="text-gray-600 text-sm leading-relaxed mb-3">{news.summary}</p>
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
          <StoreSidebar store={store} />
        </div>
      </main>

      {/* Write Review Modal */}
      <WriteReviewModal 
        isOpen={showWriteReview} 
        onClose={() => setShowWriteReview(false)} 
        storeName={store.name}
      />
    </div>
  );
}