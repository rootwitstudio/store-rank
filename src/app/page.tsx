"use client";
import { useState, useRef, useEffect } from "react";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shirt, Monitor, Utensils, Sofa, BookOpen, Heart, ArrowRight, Search, Store, Sparkles, Dumbbell, Gamepad2, Car, X, Shield, Star, TrendingUp, Users, CheckCircle, AlertTriangle, Award, Globe, Clock, MessageSquare, Zap, Target, BarChart3, ThumbsUp, Eye, Filter, Plus, Calendar, Activity, Quote, UserCheck, ShoppingBag, Verified, Flag, RefreshCw, ExternalLink, MapPin, ChevronDown, Siren as Fire, TrendingDown } from "lucide-react";
import Link from "next/link";
import { categoryApi } from "@/lib/api";
import { HomeList } from "@/components/HomeList";

const featuredStores = [
  {
    id: "1",
    name: "Amazon India",
    desc: "India's largest online marketplace with millions of products and fast delivery across the country.",
    tags: ["Verified", "Trusted", "Fast Delivery"],
    category: "Electronics",
    logo: null,
    rating: 4.5,
    score: 8.7,
    verified: true,
    claimed: true,
    country: "India",
    link: "https://amazon.in",
    reviewCount: 2847,
    trustScore: "Excellent",
    monthlyVisitors: "50M+",
    founded: "2013",
  },
  {
    id: "2",
    name: "Flipkart",
    desc: "India's homegrown e-commerce leader with wide product range and excellent customer service.",
    tags: ["Verified", "Local", "Big Billion Days"],
    category: "Electronics",
    logo: null,
    rating: 4.8,
    score: 9.1,
    verified: true,
    claimed: true,
    country: "India",
    link: "https://flipkart.com",
    reviewCount: 3421,
    trustScore: "Excellent",
    monthlyVisitors: "45M+",
    founded: "2007",
  },
  {
    id: "3",
    name: "Myntra",
    desc: "India's fashion destination with latest trends, brands, and exclusive collections.",
    tags: ["Verified", "Fashion", "Trendy"],
    category: "Fashion",
    logo: null,
    rating: 4.3,
    score: 8.5,
    verified: true,
    claimed: true,
    country: "India",
    link: "https://myntra.com",
    reviewCount: 1892,
    trustScore: "Great",
    monthlyVisitors: "25M+",
    founded: "2007",
  },
  {
    id: "4",
    name: "Nykaa",
    desc: "India's leading beauty and wellness platform with authentic products and expert advice.",
    tags: ["Verified", "Beauty", "Authentic"],
    category: "Beauty",
    logo: null,
    rating: 4.4,
    score: 8.3,
    verified: true,
    claimed: true,
    country: "India",
    link: "https://nykaa.com",
    reviewCount: 1234,
    trustScore: "Great",
    monthlyVisitors: "15M+",
    founded: "2012",
  },
];

const recentReviews = [
  {
    id: "1",
    storeName: "Amazon India",
    storeId: "1",
    rating: 5,
    review: "Excellent service and lightning-fast delivery to Mumbai. Product quality was exactly as described. Highly recommended!",
    reviewer: "Priya S.",
    location: "Mumbai, India",
    date: "2 hours ago",
    verified: true,
    helpful: 12,
    category: "Electronics",
  },
  {
    id: "2",
    storeName: "Flipkart",
    storeId: "2",
    rating: 4,
    review: "Good product quality and packaging. Delivery was on time to Bangalore. Customer service was responsive when I had questions.",
    reviewer: "Rajesh K.",
    location: "Bangalore, India",
    date: "5 hours ago",
    verified: true,
    helpful: 8,
    category: "Electronics",
  },
  {
    id: "3",
    storeName: "Myntra",
    storeId: "3",
    rating: 5,
    review: "Amazing collection of ethnic wear! Found the perfect outfit for Diwali. Quality exceeded expectations and delivery to Delhi was super quick.",
    reviewer: "Anita M.",
    location: "Delhi, India",
    date: "1 day ago",
    verified: true,
    helpful: 15,
    category: "Fashion",
  },
  {
    id: "4",
    storeName: "Nykaa",
    storeId: "4",
    rating: 4,
    review: "Authentic beauty products with great packaging. Love their skincare range. Delivery to Chennai was smooth and products were well-protected.",
    reviewer: "Kavya R.",
    location: "Chennai, India",
    date: "1 day ago",
    verified: true,
    helpful: 6,
    category: "Beauty",
  },
  {
    id: "5",
    storeName: "Amazon India",
    storeId: "1",
    rating: 5,
    review: "Best online shopping experience! Their return policy is customer-friendly and delivery to Pune is always on time. Trust them completely.",
    reviewer: "Vikram T.",
    location: "Pune, India",
    date: "2 days ago",
    verified: true,
    helpful: 9,
    category: "Electronics",
  },
];

const trendingStores = [
  { 
    id: "5",
    name: "Meesho", 
    category: "Social Commerce", 
    growth: "+45%", 
    reviews: 1834,
    rating: 4.2,
    link: "https://meesho.com",
    description: "India's fastest-growing social commerce platform",
    trustScore: "Great",
    isRising: true,
  },
  { 
    id: "6",
    name: "Swiggy Instamart", 
    category: "Quick Commerce", 
    growth: "+38%", 
    reviews: 987,
    rating: 4.1,
    link: "https://swiggy.com",
    description: "10-minute grocery delivery across major Indian cities",
    trustScore: "Good",
    isRising: true,
  },
  { 
    id: "7",
    name: "Boat", 
    category: "Electronics", 
    growth: "+32%", 
    reviews: 756,
    rating: 4.3,
    link: "https://boat-lifestyle.com",
    description: "India's leading audio and wearables brand",
    trustScore: "Great",
    isRising: true,
  },
  { 
    id: "8",
    name: "Lenskart", 
    category: "Eyewear", 
    growth: "+28%", 
    reviews: 543,
    rating: 4.0,
    link: "https://lenskart.com",
    description: "India's largest eyewear retailer with home try-on",
    trustScore: "Good",
    isRising: true,
  },
  { 
    id: "9",
    name: "BigBasket", 
    category: "Groceries", 
    growth: "+25%", 
    reviews: 432,
    rating: 4.2,
    link: "https://bigbasket.com",
    description: "India's largest online grocery store",
    trustScore: "Great",
    isRising: true,
  },
  { 
    id: "10",
    name: "Zomato", 
    category: "Food Delivery", 
    growth: "+22%", 
    reviews: 321,
    rating: 3.9,
    link: "https://zomato.com",
    description: "Food delivery and restaurant discovery platform",
    trustScore: "Good",
    isRising: false,
  },
];

const trustStats = [
  { label: "Verified Stores", value: "50K+", icon: Shield },
  { label: "User Reviews", value: "2M+", icon: MessageSquare },
  { label: "Countries", value: "180+", icon: Globe },
  { label: "Daily Visitors", value: "100K+", icon: Users },
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

const industryInsights = [
  {
    title: "Festival Shopping Surge",
    value: "Electronics up 45%",
    description: "Diwali season driving massive growth in electronics and home appliances",
    icon: Monitor,
    trend: "+45%",
    trendColor: "text-green-600",
  },
  {
    title: "Most Popular Category",
    value: "Fashion & Lifestyle",
    description: "Leading category with 3.2M searches this month across India",
    icon: Shirt,
    trend: "3.2M searches",
    trendColor: "text-blue-600",
  },
  {
    title: "Trust Score Average",
    value: "4.3/5.0",
    description: "Indian e-commerce trust rating shows strong consumer confidence",
    icon: Award,
    trend: "+0.4 this month",
    trendColor: "text-green-600",
  },
  {
    title: "Mobile Commerce",
    value: "78% of users",
    description: "Mobile-first shopping dominates Indian e-commerce landscape",
    icon: Activity,
    trend: "+15% vs last year",
    trendColor: "text-green-600",
  },
];

const successStories = [
  {
    id: "1",
    name: "Arjun P.",
    location: "Bangalore, India",
    story: "StoreRankly helped me identify a fake electronics store that was using stolen product images. The community reviews warned about their poor delivery and fake products. Saved me ₹25,000!",
    outcome: "Avoided scam",
    avatar: "A",
    verified: true,
  },
  {
    id: "2",
    name: "Sneha M.",
    location: "Delhi, India",
    story: "Found an amazing local handicrafts store through StoreRankly's verified listings. The reviews were accurate about their authentic products and fast shipping. Now my go-to for gifts!",
    outcome: "Found trusted store",
    avatar: "S",
    verified: true,
  },
  {
    id: "3",
    name: "Rohit K.",
    location: "Mumbai, India",
    story: "The platform's trust scores helped me choose between similar fashion stores. Went with the higher-rated one and had an excellent experience. The detailed reviews made all the difference.",
    outcome: "Better shopping decision",
    avatar: "R",
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
  const [selectedLocation, setSelectedLocation] = useState("India");
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [categoryError, setCategoryError] = useState<string | null>(null);
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([]);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const locations = ["India", "United States", "United Kingdom", "Canada", "Australia"];

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
    if (!showLocationDropdown) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        locationRef.current &&
        !locationRef.current.contains(event.target as Node)
      ) {
        setShowLocationDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showLocationDropdown]);

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

  const SectionContainer = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <section className={`py-12 sm:py-16 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6">
        {children}
      </div>
    </section>
  );

  const SectionHeader = ({ 
    title, 
    subtitle, 
    linkText, 
    linkHref 
  }: { 
    title: string; 
    subtitle: string; 
    linkText?: string; 
    linkHref?: string; 
  }) => (
    <div className="flex justify-between items-end mb-8 sm:mb-12">
      <div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 text-gray-900">{title}</h2>
        <p className="text-gray-600 text-lg max-w-2xl">{subtitle}</p>
      </div>
      {linkText && linkHref && (
        <Link
          href={linkHref}
          className="text-blue-600 hover:text-blue-700 flex items-center text-sm sm:text-base font-medium group"
        >
          {linkText}
          <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  );

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Location Selection Bar */}
        <div className="bg-blue-600 text-white py-2">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm">
                <MapPin className="h-4 w-4 mr-2" />
                <span>Shopping in:</span>
              </div>
              <div className="relative" ref={locationRef}>
                <button
                  onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                  className="flex items-center bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded text-sm font-medium transition-colors"
                >
                  {selectedLocation}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </button>
                {showLocationDropdown && (
                  <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 min-w-[120px]">
                    {locations.map((location) => (
                      <button
                        key={location}
                        onClick={() => {
                          setSelectedLocation(location);
                          setShowLocationDropdown(false);
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                          selectedLocation === location ? "text-blue-600 font-medium" : "text-gray-700"
                        }`}
                      >
                        {location}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 1. Search Section */}
        <SectionContainer className="bg-gradient-to-br from-blue-50 via-white to-purple-50">
          <div className="flex flex-col items-center text-center">
            <div className="mb-8 sm:mb-10">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                Find Trusted Online Stores in
                <br className="hidden sm:block" />
                <span className="text-blue-600">{selectedLocation}</span>
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
                <Button variant="outline" className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-300">
                  <Store className="h-4 w-4" />
                  Browse Categories
                </Button>
              </Link>
              <Link href="/trending">
                <Button variant="outline" className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-300">
                  <TrendingUp className="h-4 w-4" />
                  Trending Stores
                </Button>
              </Link>
              <Link href="/verified">
                <Button variant="outline" className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-300">
                  <Shield className="h-4 w-4" />
                  Verified Only
                </Button>
              </Link>
            </div>
          </div>
        </SectionContainer>

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

        {/* 2. Browse by Category Section */}
        <SectionContainer className="bg-white">
          <SectionHeader
            title="Browse by Category"
            subtitle="Find stores in your favorite shopping categories"
            linkText="View All"
            linkHref="/categories"
          />
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
                      className="group flex flex-col items-center justify-center p-4 sm:p-6 bg-white rounded-xl hover:bg-blue-50 hover:shadow-lg transition-all duration-300 text-center border border-gray-100 hover:border-blue-200"
                    >
                      <Icon className="h-8 w-8 sm:h-10 sm:w-10 mb-2 sm:mb-3 text-blue-600 group-hover:text-blue-700 transition-colors group-hover:scale-110 transform duration-300" />
                      <span className="text-sm sm:text-base font-medium text-gray-900 group-hover:text-blue-700 transition-colors">
                        {category.name}
                      </span>
                    </Link>
                  );
                })}
            </div>
          )}
        </SectionContainer>

        {/* 3. Top Rated Stores Section */}
        <SectionContainer className="bg-gray-50">
          <SectionHeader
            title="Top Rated Stores"
            subtitle="Discover the most trusted online stores with excellent reviews"
            linkText="View All"
            linkHref="/stores"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredStores.map((store) => (
              <div key={store.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center text-blue-600 text-lg font-bold mr-3">
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
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getTrustScoreColor(store.trustScore)}`}>
                    {store.trustScore}
                  </span>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500">{store.reviewCount} reviews</span>
                  <span className="text-sm text-gray-500">{store.monthlyVisitors} monthly</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <a
                    href={store.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Visit Store
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                  <Link href={`/stores/${store.id}`}>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </SectionContainer>

        {/* 4. Recent Reviews Section */}
        <SectionContainer className="bg-white">
          <SectionHeader
            title="Recent Reviews"
            subtitle="Latest authentic reviews from verified customers across India"
            linkText="View All Reviews"
            linkHref="/reviews"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentReviews.slice(0, 6).map((review) => (
              <div key={review.id} className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm mr-3">
                      {review.reviewer.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center">
                        <span className="font-medium text-gray-900">{review.reviewer}</span>
                        {review.verified && (
                          <CheckCircle className="h-4 w-4 text-green-500 ml-2" />
                        )}
                      </div>
                      <div className="text-sm text-gray-500">{review.location}</div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400">{review.date}</div>
                </div>

                <div className="mb-3">
                  <Link href={`/stores/${review.storeId}`} className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                    {review.storeName}
                  </Link>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{review.category}</span>
                </div>

                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm font-medium">{review.rating}/5</span>
                </div>

                <p className="text-gray-700 text-sm mb-4 line-clamp-3">{review.review}</p>

                <div className="flex items-center justify-between">
                  <button className="flex items-center text-gray-500 hover:text-blue-600 text-sm">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    Helpful ({review.helpful})
                  </button>
                  <Link href={`/stores/${review.storeId}`} className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </SectionContainer>

        {/* 5. Trending Stores Section */}
        <SectionContainer className="bg-gray-50">
          <SectionHeader
            title="Trending Stores"
            subtitle="Fastest growing and most popular stores in India right now"
            linkText="View All Trending"
            linkHref="/trending"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingStores.map((store, index) => (
              <div key={store.id} className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                {index < 3 && (
                  <div className="absolute top-0 right-0 bg-gradient-to-l from-orange-500 to-red-500 text-white px-3 py-1 text-xs font-bold rounded-bl-lg">
                    <Fire className="h-3 w-3 inline mr-1" />
                    HOT
                  </div>
                )}
                
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center text-green-600 text-lg font-bold mr-3">
                      {store.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{store.name}</h3>
                      <p className="text-sm text-gray-500">{store.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {store.isRising ? (
                      <TrendingUp className="h-5 w-5 text-green-500" />
                    ) : (
                      <TrendingDown className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4">{store.description}</p>

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
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getTrustScoreColor(store.trustScore)}`}>
                    {store.trustScore}
                  </span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500">{store.reviews} reviews</span>
                  <span className={`text-sm font-semibold ${store.isRising ? 'text-green-600' : 'text-red-600'}`}>
                    {store.growth} growth
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <a
                    href={store.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Visit Store
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                  <Link href={`/stores/${store.id}`}>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </SectionContainer>

        {/* 6. Industry Insights Section */}
        <SectionContainer className="bg-white">
          <SectionHeader
            title="Industry Insights"
            subtitle="Stay ahead with the latest shopping trends and market insights from India"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industryInsights.map((insight, index) => {
              const Icon = insight.icon;
              return (
                <div key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <Icon className="h-8 w-8 text-blue-600" />
                    <span className={`text-sm font-semibold px-2 py-1 rounded-full bg-white ${insight.trendColor}`}>
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
        </SectionContainer>

        {/* 7. How StoreRankly Works Section */}
        <SectionContainer className="bg-gray-50">
          <SectionHeader
            title="How StoreRankly Works"
            subtitle="Making online shopping safer and smarter with verified reviews and trusted store information"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.step} className="text-center">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto">
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
        </SectionContainer>

        {/* 8. Success Stories Section */}
        <SectionContainer className="bg-white">
          <SectionHeader
            title="Success Stories"
            subtitle="Real stories from our community about how StoreRankly helped them shop smarter and safer"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {successStories.map((story) => (
              <div key={story.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg mr-4 flex-shrink-0">
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
        </SectionContainer>

        {/* 9. Trust & Safety Section */}
        <SectionContainer className="bg-gray-50">
          <SectionHeader
            title="Trust & Safety"
            subtitle="We're committed to helping you make safe and informed shopping decisions with verified reviews and store ratings"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-green-50 rounded-xl border border-green-100 hover:shadow-lg transition-all duration-300">
              <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-green-800">Verified Stores</h3>
              <p className="text-green-700 text-sm">
                All stores undergo verification to ensure legitimacy and trustworthiness before listing.
              </p>
            </div>
            
            <div className="text-center p-6 bg-blue-50 rounded-xl border border-blue-100 hover:shadow-lg transition-all duration-300">
              <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-blue-800">Authentic Reviews</h3>
              <p className="text-blue-700 text-sm">
                Only verified customers can leave reviews, ensuring authentic and helpful feedback.
              </p>
            </div>
            
            <div className="text-center p-6 bg-red-50 rounded-xl border border-red-100 hover:shadow-lg transition-all duration-300">
              <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-red-800">Fraud Protection</h3>
              <p className="text-red-700 text-sm">
                We actively monitor and flag suspicious stores to protect our community from scams.
              </p>
            </div>
          </div>
        </SectionContainer>

        {/* 10. Trusted by Millions Section */}
        <SectionContainer className="bg-white">
          <SectionHeader
            title="Trusted by Millions"
            subtitle="Join our growing community of smart shoppers making informed decisions every day"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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
        </SectionContainer>

        {/* CTA Section */}
        <SectionContainer className="bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Join Our Community of Smart Shoppers
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Share your shopping experiences, help others make better decisions, and discover new trusted stores in India.
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
        </SectionContainer>
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