"use client";
import { useState, useRef, useEffect } from "react";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Shirt,
  Monitor,
  Utensils,
  Sofa,
  BookOpen,
  Heart,
  ArrowRight,
  Search,
  Store,
  Sparkles,
  Dumbbell,
  Gamepad2,
  Car,
  X,
  Shield,
  Star,
  TrendingUp,
  Users,
  CheckCircle,
  AlertTriangle,
  Award,
  Globe,
  Clock,
  MessageSquare,
  Zap,
  Target,
  BarChart3,
  ThumbsUp,
  Eye,
  Filter,
  Plus,
  Calendar,
  Activity,
  Quote,
  UserCheck,
  ShoppingBag,
  Verified,
  Flag,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import { categoryApi } from "@/lib/api";
import { HomeList } from "@/components/HomeList";

const featuredStores = [
  {
    id: "1",
    name: "Amazon",
    desc: "World's largest online marketplace with millions of products and fast delivery.",
    tags: ["Verified", "Trusted"],
    category: "Electronics",
    logo: null,
    rating: 4.5,
    score: 8.7,
    verified: true,
    claimed: true,
    country: "United States",
    link: "https://amazon.com",
    reviewCount: 2847,
    trustScore: "Excellent",
  },
  {
    id: "2",
    name: "eBay",
    desc: "Global online marketplace for buying and selling new and used goods.",
    tags: ["Verified"],
    category: "Marketplace",
    logo: null,
    rating: 4.2,
    score: 8.2,
    verified: true,
    claimed: false,
    country: "United States",
    link: "https://ebay.com",
    reviewCount: 1523,
    trustScore: "Great",
  },
  {
    id: "3",
    name: "Flipkart",
    desc: "India's leading e-commerce marketplace with wide product range.",
    tags: ["Verified", "Local"],
    category: "Electronics",
    logo: null,
    rating: 4.8,
    score: 9.1,
    verified: true,
    claimed: true,
    country: "India",
    link: "https://flipkart.com",
    reviewCount: 892,
    trustScore: "Excellent",
  },
  {
    id: "4",
    name: "Zalando",
    desc: "Europe's leading online fashion platform with premium brands.",
    tags: ["Verified"],
    category: "Fashion",
    logo: null,
    rating: 4.0,
    score: 7.9,
    verified: true,
    claimed: true,
    country: "Germany",
    link: "https://zalando.com",
    reviewCount: 634,
    trustScore: "Good",
  },
];

const recentReviews = [
  {
    id: "1",
    storeName: "Amazon",
    rating: 5,
    review: "Excellent service and fast delivery. Highly recommended!",
    reviewer: "Sarah M.",
    date: "2 hours ago",
    verified: true,
  },
  {
    id: "2",
    storeName: "Flipkart",
    rating: 4,
    review: "Good product quality but delivery was delayed.",
    reviewer: "Raj K.",
    date: "5 hours ago",
    verified: true,
  },
  {
    id: "3",
    storeName: "eBay",
    rating: 5,
    review: "Found exactly what I was looking for at a great price.",
    reviewer: "Mike D.",
    date: "1 day ago",
    verified: true,
  },
];

const trustStats = [
  { label: "Verified Stores", value: "50K+", icon: Shield },
  { label: "User Reviews", value: "2M+", icon: MessageSquare },
  { label: "Countries", value: "180+", icon: Globe },
  { label: "Daily Visitors", value: "100K+", icon: Users },
];

const trendingStores = [
  { name: "Shopify", category: "E-commerce Platform", growth: "+25%", reviews: 1234 },
  { name: "Etsy", category: "Handmade & Vintage", growth: "+18%", reviews: 987 },
  { name: "Wayfair", category: "Home & Garden", growth: "+15%", reviews: 756 },
  { name: "ASOS", category: "Fashion", growth: "+12%", reviews: 543 },
];

const howItWorks = [
  {
    step: 1,
    title: "Search & Discover",
    description: "Find stores by category, name, or browse our curated lists of verified retailers",
    icon: Search,
  },
  {
    step: 2,
    title: "Read Reviews",
    description: "Check authentic customer reviews, ratings, and detailed trust scores",
    icon: Eye,
  },
  {
    step: 3,
    title: "Shop Safely",
    description: "Make informed decisions with verified store information and safety ratings",
    icon: Shield,
  },
];

const latestUpdates = [
  {
    id: "1",
    type: "verified",
    title: "TechMart Electronics",
    description: "Recently verified after thorough security and authenticity checks",
    time: "2 hours ago",
    icon: CheckCircle,
    iconColor: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    id: "2",
    type: "new",
    title: "GreenLife Organics",
    description: "New organic food store added to our marketplace",
    time: "4 hours ago",
    icon: Plus,
    iconColor: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    id: "3",
    type: "flagged",
    title: "QuickDeals Store",
    description: "Flagged for review due to customer complaints - investigation ongoing",
    time: "6 hours ago",
    icon: Flag,
    iconColor: "text-red-600",
    bgColor: "bg-red-50",
  },
  {
    id: "4",
    type: "updated",
    title: "FashionHub",
    description: "Store information updated with new contact details and policies",
    time: "8 hours ago",
    icon: RefreshCw,
    iconColor: "text-purple-600",
    bgColor: "bg-purple-50",
  },
];

const industryInsights = [
  {
    title: "Holiday Shopping Trends",
    value: "Electronics up 35%",
    description: "Consumer electronics seeing highest demand this season",
    icon: Monitor,
    trend: "+35%",
    trendColor: "text-green-600",
  },
  {
    title: "Most Popular Category",
    value: "Fashion & Apparel",
    description: "Leading category with 2.3M searches this month",
    icon: Shirt,
    trend: "2.3M searches",
    trendColor: "text-blue-600",
  },
  {
    title: "Trust Score Average",
    value: "4.2/5.0",
    description: "Overall platform trust rating continues to improve",
    icon: Award,
    trend: "+0.3 this month",
    trendColor: "text-green-600",
  },
  {
    title: "Mobile Shopping",
    value: "68% of users",
    description: "Majority of reviews now come from mobile devices",
    icon: Activity,
    trend: "+12% vs last year",
    trendColor: "text-green-600",
  },
];

const successStories = [
  {
    id: "1",
    name: "Jennifer L.",
    location: "California, USA",
    story: "StoreRankly helped me avoid a fake electronics store that had stolen product photos. The reviews warned me about their poor customer service and non-existent return policy. Saved me $800!",
    outcome: "Avoided scam",
    avatar: "J",
    verified: true,
  },
  {
    id: "2",
    name: "Marcus T.",
    location: "London, UK",
    story: "I discovered an amazing local artisan jewelry store through StoreRankly's verified listings. The reviews were spot-on about their quality and customer service. Now it's my go-to for gifts!",
    outcome: "Found trusted store",
    avatar: "M",
    verified: true,
  },
  {
    id: "3",
    name: "Priya S.",
    location: "Mumbai, India",
    story: "The platform's trust scores helped me choose between similar stores. I went with the higher-rated one and had an excellent experience. The detailed reviews made all the difference.",
    outcome: "Better shopping decision",
    avatar: "P",
    verified: true,
  },
];

const iconMap: Record<string, React.ElementType> = {
  Shirt,
  Monitor,
  Utensils,
  Sofa,
  BookOpen,
  Sparkles,
  Dumbbell,
  Gamepad2,
  Heart,
  Car,
  Store, // Default icon
};

interface Category {
  id: string;
  name: string;
  description: string | null;
  icon: string;
  parentId: string | null;
}

interface StoreSearchResult {
  type: "store";
  id: string;
  name: string;
  description: string | null;
}

interface CategorySearchResult {
  type: "category";
  id: string;
  name: string;
  icon: string;
  description: string;
}

type SearchResult = StoreSearchResult | CategorySearchResult;

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [categoryError, setCategoryError] = useState<string | null>(null);
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([]);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const data = await categoryApi.getAll();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategoryError("Failed to load categories. Please try again later.");
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (search.length === 0) {
      setFilteredResults([]);
      return;
    }

    const lowerCaseSearch = search.toLowerCase();
    const results: SearchResult[] = [];

    // Filter Categories
    categories
      .filter((category) => !category.parentId)
      .forEach((category) => {
        if (category.name.toLowerCase().includes(lowerCaseSearch)) {
          results.push({
            type: "category",
            id: category.id,
            name: category.name,
            icon: category.icon || "Store",
            description: `The best companies in the category '${category.name}'`,
          });
        }
      });

    // Filter Stores
    featuredStores.forEach((store) => {
      if (
        store.name.toLowerCase().includes(lowerCaseSearch) ||
        store.desc.toLowerCase().includes(lowerCaseSearch)
      ) {
        results.push({
          type: "store",
          id: store.id,
          name: store.name,
          description: store.desc || null,
        });
      }
    });

    setFilteredResults(results);
  }, [search, categories, featuredStores]);

  useEffect(() => {
    if (!showDropdown) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDropdown]);

  useEffect(() => {
    if (isSearchModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isSearchModalOpen]);

  const getTrustScoreColor = (score: string) => {
    switch (score) {
      case "Excellent":
        return "text-green-600 bg-green-100";
      case "Great":
        return "text-blue-600 bg-blue-100";
      case "Good":
        return "text-yellow-600 bg-yellow-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 sm:py-12 md:py-16">
          <div className="container mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
            <div className="mb-6 sm:mb-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                Find Trusted Online Stores
                <br className="hidden sm:block" />
                <span className="text-blue-600">Read Real Reviews</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-6 sm:mb-8">
                Discover verified e-commerce stores, read authentic customer reviews, and make informed shopping decisions. 
                Join millions of shoppers who trust our platform.
              </p>
            </div>

            {/* Main Search Input */}
            <div className={`w-full max-w-2xl relative mb-6 sm:mb-8 ${isSearchModalOpen ? "hidden sm:block" : ""}`}>
              <form
                className="flex items-center relative"
                autoComplete="off"
                onSubmit={(e) => {
                  e.preventDefault();
                  setShowDropdown(false);
                }}
              >
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder="Search for stores, brands, or categories..."
                  className="w-full h-12 sm:h-14 text-base sm:text-lg pl-4 pr-12 rounded-lg border-2 focus:border-blue-500 shadow-lg"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setShowDropdown(true);
                  }}
                  onFocus={() => {
                    if (window.innerWidth < 640) {
                      setIsSearchModalOpen(true);
                    } else {
                      setShowDropdown(true);
                    }
                  }}
                />
                <Button
                  type="submit"
                  className="absolute right-2 h-8 sm:h-10 w-8 sm:w-10 p-0 bg-blue-600 hover:bg-blue-700"
                >
                  <Search className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </form>

              {/* Search Dropdown */}
              {showDropdown && filteredResults.length > 0 && !isSearchModalOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute w-full mt-1 bg-white rounded-lg shadow-xl border border-gray-200 max-h-60 overflow-y-auto z-50"
                >
                  {filteredResults.some((result) => result.type === "store") && (
                    <>
                      <div className="px-4 py-2 text-xs text-gray-500 font-semibold bg-gray-50">
                        Companies
                      </div>
                      {filteredResults
                        .filter((result) => result.type === "store")
                        .map((result) => {
                          const storeResult = result as StoreSearchResult;
                          const store = featuredStores.find(s => s.id === storeResult.id);
                          return (
                            <Link
                              key={storeResult.id}
                              href={`/stores/${storeResult.id}`}
                              className="w-full px-4 py-3 text-left hover:bg-gray-100 text-sm flex items-center justify-between border-b border-gray-100 last:border-b-0"
                              onClick={() => setShowDropdown(false)}
                            >
                              <div className="flex items-center">
                                <div className="w-8 h-8 bg-gray-200 rounded-md flex items-center justify-center text-gray-600 text-xs font-bold mr-3">
                                  {storeResult.name.charAt(0)}
                                </div>
                                <div>
                                  <div className="font-medium">{storeResult.name}</div>
                                  <div className="text-xs text-gray-500">{store?.country}</div>
                                </div>
                              </div>
                              {store && (
                                <div className="flex items-center gap-2">
                                  <span className={`px-2 py-0.5 text-xs font-semibold rounded ${getTrustScoreColor(store.trustScore)}`}>
                                    {store.trustScore}
                                  </span>
                                  <div className="flex items-center">
                                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                                    <span className="text-xs ml-1">{store.rating}</span>
                                  </div>
                                </div>
                              )}
                            </Link>
                          );
                        })}
                    </>
                  )}

                  {filteredResults.some((result) => result.type === "category") && (
                    <>
                      <div className="px-4 py-2 text-xs text-gray-500 font-semibold bg-gray-50">
                        Categories
                      </div>
                      {filteredResults
                        .filter((result) => result.type === "category")
                        .map((result) => {
                          const categoryResult = result as CategorySearchResult;
                          const Icon = iconMap[categoryResult.icon] || Store;
                          return (
                            <Link
                              key={categoryResult.id}
                              href={`/stores?categoryId=${categoryResult.id}`}
                              className="flex items-center px-4 py-3 hover:bg-gray-100 border-b border-gray-100 last:border-b-0"
                              onClick={() => setShowDropdown(false)}
                            >
                              <Icon className="h-5 w-5 text-gray-600 mr-3" />
                              <div>
                                <div className="text-sm font-medium">{categoryResult.name}</div>
                                <div className="text-xs text-gray-500">{categoryResult.description}</div>
                              </div>
                            </Link>
                          );
                        })}
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              <Link href="/categories">
                <Button variant="outline" className="flex items-center gap-2">
                  <Store className="h-4 w-4" />
                  Browse Categories
                </Button>
              </Link>
              <Link href="/trending">
                <Button variant="outline" className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Trending Stores
                </Button>
              </Link>
              <Link href="/verified">
                <Button variant="outline" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Verified Only
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Full Page Search Modal for Small Screens */}
        {isSearchModalOpen && (
          <div className="fixed inset-0 bg-white z-[100] flex flex-col">
            <div className="flex items-center px-4 py-3 border-b border-gray-200">
              <div className="relative flex-1 mr-3">
                <Input
                  autoFocus
                  type="text"
                  placeholder="Search for stores, brands, or categories..."
                  className="w-full h-12 text-base pl-4 pr-10 rounded-lg border focus:border-blue-500"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
              <Button
                variant="ghost"
                onClick={() => setIsSearchModalOpen(false)}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {filteredResults.length > 0 ? (
                <div className="space-y-1">
                  {filteredResults.some((result) => result.type === "store") && (
                    <>
                      <div className="px-4 py-2 text-xs text-gray-500 font-semibold">Companies</div>
                      {filteredResults
                        .filter((result) => result.type === "store")
                        .map((result) => {
                          const storeResult = result as StoreSearchResult;
                          const store = featuredStores.find(s => s.id === storeResult.id);
                          return (
                            <Link
                              key={storeResult.id}
                              href={`/stores/${storeResult.id}`}
                              className="block w-full px-4 py-3 text-left hover:bg-gray-100 rounded-lg"
                              onClick={() => setIsSearchModalOpen(false)}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <div className="w-8 h-8 bg-gray-200 rounded-md flex items-center justify-center text-gray-600 text-xs font-bold mr-3">
                                    {storeResult.name.charAt(0)}
                                  </div>
                                  <div>
                                    <div className="font-medium">{storeResult.name}</div>
                                    <div className="text-xs text-gray-500">{store?.country}</div>
                                  </div>
                                </div>
                                {store && (
                                  <div className="flex items-center gap-2">
                                    <span className={`px-2 py-0.5 text-xs font-semibold rounded ${getTrustScoreColor(store.trustScore)}`}>
                                      {store.trustScore}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </Link>
                          );
                        })}
                    </>
                  )}

                  {filteredResults.some((result) => result.type === "category") && (
                    <>
                      <div className="px-4 py-2 text-xs text-gray-500 font-semibold">Categories</div>
                      {filteredResults
                        .filter((result) => result.type === "category")
                        .map((result) => {
                          const categoryResult = result as CategorySearchResult;
                          const Icon = iconMap[categoryResult.icon] || Store;
                          return (
                            <Link
                              key={categoryResult.id}
                              href={`/stores?categoryId=${categoryResult.id}`}
                              className="flex items-center px-4 py-3 hover:bg-gray-100 rounded-lg"
                              onClick={() => setIsSearchModalOpen(false)}
                            >
                              <Icon className="h-5 w-5 text-gray-600 mr-3" />
                              <div>
                                <div className="text-sm font-medium">{categoryResult.name}</div>
                                <div className="text-xs text-gray-500">{categoryResult.description}</div>
                              </div>
                            </Link>
                          );
                        })}
                    </>
                  )}
                </div>
              ) : (
                search.length > 0 && !loadingCategories && (
                  <div className="text-center text-gray-500 mt-8">
                    <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No results found for "{search}"</p>
                    <p className="text-sm mt-2">Try searching for a different store or category</p>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {/* How It Works Section */}
        <section className="py-8 sm:py-12 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">How StoreRankly Works</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Making online shopping safer and smarter with verified reviews and trusted store information
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {howItWorks.map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.step} className="text-center">
                    <div className="relative mb-6">
                      <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                        <Icon className="h-10 w-10 text-blue-600" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {step.step}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Latest Store Updates Section */}
        <section className="py-8 sm:py-12 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex justify-between items-center mb-6 sm:mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-2">Latest Store Updates</h2>
                <p className="text-gray-600">Stay informed about new stores, verifications, and important changes</p>
              </div>
              <Link
                href="/updates"
                className="text-blue-600 hover:text-blue-700 flex items-center text-sm sm:text-base font-medium"
              >
                View All
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {latestUpdates.map((update) => {
                const Icon = update.icon;
                return (
                  <div key={update.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start">
                      <div className={`p-2 rounded-lg ${update.bgColor} mr-4 flex-shrink-0`}>
                        <Icon className={`h-5 w-5 ${update.iconColor}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{update.title}</h3>
                        <p className="text-gray-600 text-sm mb-2">{update.description}</p>
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          {update.time}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Industry Insights Section */}
        <section className="py-8 sm:py-12 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Industry Insights</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Stay ahead with the latest shopping trends, statistics, and market insights
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {industryInsights.map((insight, index) => {
                const Icon = insight.icon;
                return (
                  <div key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-100">
                    <div className="flex items-center justify-between mb-4">
                      <Icon className="h-8 w-8 text-blue-600" />
                      <span className={`text-sm font-semibold ${insight.trendColor}`}>
                        {insight.trend}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{insight.title}</h3>
                    <div className="text-2xl font-bold text-blue-600 mb-2">{insight.value}</div>
                    <p className="text-gray-600 text-sm">{insight.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Success Stories Section */}
        <section className="py-8 sm:py-12 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Success Stories</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Real stories from our community about how StoreRankly helped them shop smarter and safer
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {successStories.map((story) => (
                <div key={story.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg mr-4 flex-shrink-0">
                      {story.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center mb-1">
                        <h3 className="font-semibold">{story.name}</h3>
                        {story.verified && (
                          <CheckCircle className="h-4 w-4 text-green-500 ml-2" />
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{story.location}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <Quote className="h-5 w-5 text-gray-400 mb-2" />
                    <p className="text-gray-700 italic">"{story.story}"</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <ThumbsUp className="h-3 w-3 mr-1" />
                      {story.outcome}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-8 sm:py-12 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex justify-between items-center mb-6 sm:mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-2">Browse by Category</h2>
                <p className="text-gray-600">Find stores in your favorite shopping categories</p>
              </div>
              <Link
                href="/categories"
                className="text-blue-600 hover:text-blue-700 flex items-center text-sm sm:text-base font-medium"
              >
                View All
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            {loadingCategories ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 rounded-lg h-24 sm:h-28"></div>
                  </div>
                ))}
              </div>
            ) : categoryError ? (
              <p className="text-red-500 text-center">{categoryError}</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                {categories
                  .filter((category) => !category.parentId)
                  .slice(0, 10)
                  .map((category) => {
                    const Icon = iconMap[category.icon] || Store;
                    return (
                      <Link
                        key={category.id}
                        href={`/stores?categoryId=${category.id}`}
                        className="group flex flex-col items-center justify-center p-4 sm:p-6 bg-white rounded-lg hover:bg-blue-50 hover:shadow-md transition-all duration-200 text-center border border-gray-100"
                      >
                        <Icon className="h-8 w-8 sm:h-10 sm:w-10 mb-2 sm:mb-3 text-blue-600 group-hover:text-blue-700 transition-colors" />
                        <span className="text-sm sm:text-base font-medium text-gray-900 group-hover:text-blue-700 transition-colors">
                          {category.name}
                        </span>
                      </Link>
                    );
                  })}
              </div>
            )}
          </div>
        </section>

        {/* Featured Stores Section */}
        <section className="py-8 sm:py-12 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex justify-between items-center mb-6 sm:mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-2">Top Rated Stores</h2>
                <p className="text-gray-600">Discover the most trusted online stores with excellent reviews</p>
              </div>
              <Link
                href="/stores"
                className="text-blue-600 hover:text-blue-700 flex items-center text-sm sm:text-base font-medium"
              >
                View All
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredStores.map((store) => (
                <div key={store.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-gray-600 text-lg font-bold mr-3">
                        {store.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{store.name}</h3>
                        <p className="text-sm text-gray-500">{store.country}</p>
                      </div>
                    </div>
                    {store.verified && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{store.desc}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < store.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm font-medium">{store.rating}</span>
                    </div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded ${getTrustScoreColor(store.trustScore)}`}>
                      {store.trustScore}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{store.reviewCount} reviews</span>
                    <Link href={`/stores/${store.id}`}>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        View Store
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust & Safety Section */}
        <section className="py-8 sm:py-12 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Trust & Safety</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We're committed to helping you make safe and informed shopping decisions with verified reviews and store ratings.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="text-center p-6 bg-green-50 rounded-lg border border-green-100">
                <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-green-800">Verified Stores</h3>
                <p className="text-green-700 text-sm">
                  All stores undergo verification to ensure legitimacy and trustworthiness before listing.
                </p>
              </div>
              
              <div className="text-center p-6 bg-blue-50 rounded-lg border border-blue-100">
                <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-blue-800">Authentic Reviews</h3>
                <p className="text-blue-700 text-sm">
                  Only verified customers can leave reviews, ensuring authentic and helpful feedback.
                </p>
              </div>
              
              <div className="text-center p-6 bg-red-50 rounded-lg border border-red-100">
                <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-red-800">Fraud Protection</h3>
                <p className="text-red-700 text-sm">
                  We actively monitor and flag suspicious stores to protect our community from scams.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Platform Statistics Section */}
        <section className="py-8 sm:py-12 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Trusted by Millions</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Join our growing community of smart shoppers making informed decisions every day
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">50K+</div>
                <div className="text-gray-600">Verified Stores</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-green-600 mb-2">2M+</div>
                <div className="text-gray-600">Customer Reviews</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-purple-600 mb-2">180+</div>
                <div className="text-gray-600">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-orange-600 mb-2">100K+</div>
                <div className="text-gray-600">Daily Visitors</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-8 sm:py-12 bg-blue-600">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Join Our Community of Smart Shoppers
            </h2>
            <p className="text-blue-100 text-lg mb-6 sm:mb-8 max-w-2xl mx-auto">
              Share your shopping experiences, help others make better decisions, and discover new trusted stores.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <Button size="lg" variant="outline" className="bg-white text-blue-600 hover:bg-gray-100 border-white">
                  Write a Review
                </Button>
              </Link>
              <Link href="/business/register">
                <Button size="lg" className="bg-blue-700 hover:bg-blue-800 text-white">
                  List Your Store
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-8 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-3">For Shoppers</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/categories" className="hover:text-blue-600">Browse Categories</Link></li>
                <li><Link href="/trending" className="hover:text-blue-600">Trending Stores</Link></li>
                <li><Link href="/verified" className="hover:text-blue-600">Verified Stores</Link></li>
                <li><Link href="/reviews" className="hover:text-blue-600">Recent Reviews</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">For Businesses</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/business/register" className="hover:text-blue-600">List Your Store</Link></li>
                <li><Link href="/business/pricing" className="hover:text-blue-600">Pricing</Link></li>
                <li><Link href="/business/features" className="hover:text-blue-600">Features</Link></li>
                <li><Link href="/business/support" className="hover:text-blue-600">Business Support</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Support</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/help" className="hover:text-blue-600">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-blue-600">Contact Us</Link></li>
                <li><Link href="/report" className="hover:text-blue-600">Report a Store</Link></li>
                <li><Link href="/guidelines" className="hover:text-blue-600">Community Guidelines</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Company</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/about" className="hover:text-blue-600">About Us</Link></li>
                <li><Link href="/careers" className="hover:text-blue-600">Careers</Link></li>
                <li><Link href="/press" className="hover:text-blue-600">Press</Link></li>
                <li><Link href="/blog" className="hover:text-blue-600">Blog</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t pt-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
            <div className="flex items-center gap-6 mb-4 sm:mb-0">
              <Link href="/privacy" className="hover:text-blue-600">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-blue-600">Terms of Service</Link>
              <Link href="/cookies" className="hover:text-blue-600">Cookie Policy</Link>
            </div>
            <div className="text-center sm:text-right">
              © 2024 StoreRankly. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}