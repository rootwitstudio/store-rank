"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { 
  Store, 
  Filter, 
  ArrowUpDown, 
  Search, 
  Star, 
  MapPin, 
  ExternalLink, 
  Shield, 
  CheckCircle, 
  Users, 
  TrendingUp,
  Grid3X3,
  List,
  SlidersHorizontal,
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock data with 10 stores as requested
const mockStores = [
  {
    id: "1",
    name: "Amazon",
    desc: "World's largest online marketplace with millions of products and fast delivery worldwide.",
    tags: ["Free Shipping", "Prime Delivery", "Easy Returns"],
    categoryId: "111f70a8-f143-4b04-bbf3-309d3abc3184",
    category: "E-commerce",
    logo: null,
    rating: 4.2,
    totalRating: 125847,
    verified: true,
    claimed: true,
    country: "United States",
    link: "https://www.amazon.com",
    trustScore: 92,
    founded: "1994",
    employees: "1M+",
    responseTime: "< 1 hour"
  },
  {
    id: "2",
    name: "eBay",
    desc: "Global online marketplace connecting millions of buyers and sellers around the world.",
    tags: ["Auction Style", "Buy It Now", "Global Shipping"],
    categoryId: "111f70a8-f143-4b04-bbf3-309d3abc3184",
    category: "Marketplace",
    logo: null,
    rating: 3.8,
    totalRating: 89234,
    verified: true,
    claimed: false,
    country: "United States",
    link: "https://www.ebay.com",
    trustScore: 78,
    founded: "1995",
    employees: "13,000",
    responseTime: "2-4 hours"
  },
  {
    id: "3",
    name: "Flipkart",
    desc: "India's leading e-commerce marketplace offering electronics, fashion, and more.",
    tags: ["Local Delivery", "Cash on Delivery", "Big Billion Days"],
    categoryId: "222f70a8-f143-4b04-bbf3-309d3abc3184",
    category: "E-commerce",
    logo: null,
    rating: 4.1,
    totalRating: 67890,
    verified: true,
    claimed: true,
    country: "India",
    link: "https://www.flipkart.com",
    trustScore: 85,
    founded: "2007",
    employees: "50,000+",
    responseTime: "< 2 hours"
  },
  {
    id: "4",
    name: "Zalando",
    desc: "Europe's leading online fashion platform with over 4,000 brands and free returns.",
    tags: ["Fashion", "Free Returns", "Premium Brands"],
    categoryId: "333f70a8-f143-4b04-bbf3-309d3abc3184",
    category: "Fashion",
    logo: null,
    rating: 4.0,
    totalRating: 45678,
    verified: false,
    claimed: true,
    country: "Germany",
    link: "https://www.zalando.com",
    trustScore: 81,
    founded: "2008",
    employees: "17,000",
    responseTime: "1-3 hours"
  },
  {
    id: "5",
    name: "Shopify",
    desc: "Leading e-commerce platform helping businesses of all sizes sell online and in-person.",
    tags: ["E-commerce Platform", "Small Business", "Enterprise"],
    categoryId: "444f70a8-f143-4b04-bbf3-309d3abc3184",
    category: "Technology",
    logo: null,
    rating: 4.4,
    totalRating: 34567,
    verified: true,
    claimed: true,
    country: "Canada",
    link: "https://www.shopify.com",
    trustScore: 88,
    founded: "2006",
    employees: "10,000+",
    responseTime: "< 30 min"
  },
  {
    id: "6",
    name: "Etsy",
    desc: "Global marketplace for unique and creative goods made by independent sellers.",
    tags: ["Handmade", "Vintage", "Creative"],
    categoryId: "555f70a8-f143-4b04-bbf3-309d3abc3184",
    category: "Marketplace",
    logo: null,
    rating: 3.9,
    totalRating: 78901,
    verified: true,
    claimed: true,
    country: "United States",
    link: "https://www.etsy.com",
    trustScore: 79,
    founded: "2005",
    employees: "2,500",
    responseTime: "2-6 hours"
  },
  {
    id: "7",
    name: "Best Buy",
    desc: "Leading electronics retailer with expert advice and competitive prices.",
    tags: ["Electronics", "Expert Support", "Price Match"],
    categoryId: "666f70a8-f143-4b04-bbf3-309d3abc3184",
    category: "Electronics",
    logo: null,
    rating: 4.3,
    totalRating: 92341,
    verified: true,
    claimed: true,
    country: "United States",
    link: "https://www.bestbuy.com",
    trustScore: 87,
    founded: "1966",
    employees: "125,000",
    responseTime: "< 1 hour"
  },
  {
    id: "8",
    name: "Target",
    desc: "American retail corporation offering everything from groceries to home goods.",
    tags: ["Everyday Essentials", "Same Day Delivery", "RedCard Benefits"],
    categoryId: "777f70a8-f143-4b04-bbf3-309d3abc3184",
    category: "Retail",
    logo: null,
    rating: 4.1,
    totalRating: 156789,
    verified: true,
    claimed: true,
    country: "United States",
    link: "https://www.target.com",
    trustScore: 84,
    founded: "1902",
    employees: "400,000+",
    responseTime: "1-2 hours"
  },
  {
    id: "9",
    name: "Walmart",
    desc: "World's largest retailer offering low prices on millions of products.",
    tags: ["Low Prices", "Grocery Pickup", "Everyday Low Price"],
    categoryId: "888f70a8-f143-4b04-bbf3-309d3abc3184",
    category: "Retail",
    logo: null,
    rating: 3.7,
    totalRating: 234567,
    verified: true,
    claimed: true,
    country: "United States",
    link: "https://www.walmart.com",
    trustScore: 76,
    founded: "1962",
    employees: "2.3M",
    responseTime: "2-4 hours"
  },
  {
    id: "10",
    name: "Nike",
    desc: "Global leader in athletic footwear, apparel, equipment and accessories.",
    tags: ["Athletic Wear", "Innovation", "Premium Quality"],
    categoryId: "999f70a8-f143-4b04-bbf3-309d3abc3184",
    category: "Sports",
    logo: null,
    rating: 4.2,
    totalRating: 87654,
    verified: true,
    claimed: true,
    country: "United States",
    link: "https://www.nike.com",
    trustScore: 89,
    founded: "1964",
    employees: "75,000",
    responseTime: "< 2 hours"
  }
];

const allTags = [
  "Free Shipping",
  "Easy Returns", 
  "Prime Delivery",
  "Cash on Delivery",
  "Global Shipping",
  "Local Delivery",
  "Premium Brands",
  "Handmade",
  "Vintage",
  "Quality",
  "Service",
  "Value"
];

const countries = [
  "United States",
  "United Kingdom", 
  "India",
  "Germany",
  "Canada",
  "Australia",
  "Sweden",
  "Spain"
];

const categories = [
  "E-commerce",
  "Marketplace", 
  "Fashion",
  "Technology",
  "Electronics",
  "Home & Garden",
  "Sports",
  "Retail"
];

function StarRating({ rating, totalRating }: { rating: number; totalRating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < fullStars 
                ? "text-yellow-400 fill-yellow-400" 
                : i === fullStars && hasHalfStar
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
      <span className="text-sm font-medium text-gray-900">{rating.toFixed(1)}</span>
      <span className="text-sm text-gray-500">({totalRating.toLocaleString()})</span>
    </div>
  );
}

function TrustScore({ score }: { score: number }) {
  const getScoreColor = (score: number) => {
    if (score >= 85) return "bg-green-500";
    if (score >= 70) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 85) return "Excellent";
    if (score >= 70) return "Good";
    return "Poor";
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        <div className={`w-3 h-3 rounded-full ${getScoreColor(score)}`}></div>
        <span className="text-sm font-medium text-gray-900">{score}</span>
      </div>
      <span className="text-xs text-gray-500">{getScoreLabel(score)}</span>
    </div>
  );
}

function StoreCard({ store, viewMode }: { store: any; viewMode: 'grid' | 'list' }) {
  if (viewMode === 'list') {
    return (
      <Card className="hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-gray-300">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* Logo and Basic Info */}
            <div className="flex items-start gap-4 flex-1">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                {store.logo ? (
                  <img src={store.logo} alt={store.name} className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <span className="text-xl font-bold text-gray-600">{store.name.charAt(0)}</span>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{store.name}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs">{store.category}</Badge>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <MapPin className="w-3 h-3" />
                        {store.country}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {store.verified && (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                        <Shield className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                    {store.claimed && (
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Claimed
                      </Badge>
                    )}
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{store.desc}</p>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {store.tags.slice(0, 3).map((tag: string) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Stats and Actions */}
            <div className="lg:w-80 flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Customer Rating</div>
                  <StarRating rating={store.rating} totalRating={store.totalRating} />
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Trust Score</div>
                  <TrustScore score={store.trustScore} />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
                <div>
                  <span className="block">Founded: {store.founded}</span>
                  <span className="block">Employees: {store.employees}</span>
                </div>
                <div>
                  <span className="block">Response: {store.responseTime}</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1" asChild>
                  <a href={store.link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Visit
                  </a>
                </Button>
                <Button size="sm" className="flex-1" asChild>
                  <a href={`/stores/${store.id}`}>
                    View Reviews
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-gray-300 h-full">
      <CardContent className="p-6 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              {store.logo ? (
                <img src={store.logo} alt={store.name} className="w-full h-full object-cover rounded-lg" />
              ) : (
                <span className="text-lg font-bold text-gray-600">{store.name.charAt(0)}</span>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">{store.name}</h3>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">{store.category}</Badge>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <MapPin className="w-3 h-3" />
                  {store.country}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-1">
            {store.verified && (
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100 text-xs">
                <Shield className="w-3 h-3" />
              </Badge>
            )}
            {store.claimed && (
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 text-xs">
                <CheckCircle className="w-3 h-3" />
              </Badge>
            )}
          </div>
        </div>
        
        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">{store.desc}</p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {store.tags.slice(0, 2).map((tag: string) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        {/* Stats */}
        <div className="space-y-3 mb-4">
          <div>
            <div className="text-xs text-gray-500 mb-1">Customer Rating</div>
            <StarRating rating={store.rating} totalRating={store.totalRating} />
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">Trust Score</div>
            <TrustScore score={store.trustScore} />
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex gap-2 mt-auto">
          <Button variant="outline" size="sm" className="flex-1" asChild>
            <a href={store.link} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-1" />
              Visit
            </a>
          </Button>
          <Button size="sm" className="flex-1" asChild>
            <a href={`/stores/${store.id}`}>
              Reviews
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange 
}: { 
  currentPage: number; 
  totalPages: number; 
  onPageChange: (page: number) => void; 
}) {
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        Previous
      </Button>

      <div className="flex items-center gap-1">
        {getVisiblePages().map((page, index) => (
          <div key={index}>
            {page === '...' ? (
              <span className="px-3 py-2 text-gray-500">...</span>
            ) : (
              <Button
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => onPageChange(page as number)}
                className="w-10 h-10"
              >
                {page}
              </Button>
            )}
          </div>
        ))}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
        <ChevronRight className="w-4 h-4 ml-1" />
      </Button>
    </div>
  );
}

export default function StoresPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryId = searchParams.get("categoryId");
  
  const [stores, setStores] = useState(mockStores);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categoryName, setCategoryName] = useState("All Categories");

  // Filter states
  const [showFilters, setShowFilters] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [claimedOnly, setClaimedOnly] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"rating" | "name" | "trustScore" | "reviews">("rating");
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    setLoading(true);
    try {
      const filteredStores = categoryId
        ? mockStores.filter((store) => store.categoryId === categoryId)
        : mockStores;
      setStores(mockStores);

      if (categoryId && filteredStores.length > 0) {
        setCategoryName(filteredStores[0].category);
      } else if (!categoryId) {
        setCategoryName("All Categories");
      }
    } catch (error) {
      console.error("Error filtering stores:", error);
      setError("Failed to load stores. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [categoryId]);

  // Apply filters
  let filteredStores = stores.filter(
    (s) =>
      s.rating >= minRating &&
      (!verifiedOnly || s.verified) &&
      (!claimedOnly || s.claimed) &&
      (selectedCountry === "all" || s.country === selectedCountry) &&
      (selectedCategory === "all" || s.category === selectedCategory) &&
      (selectedTags.length === 0 ||
        selectedTags.every((tag) => s.tags.includes(tag))) &&
      (search === "" ||
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.desc.toLowerCase().includes(search.toLowerCase()) ||
        s.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase())))
  );

  // Apply sorting
  if (sortBy === "rating") {
    filteredStores = filteredStores.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === "name") {
    filteredStores = filteredStores.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "trustScore") {
    filteredStores = filteredStores.sort((a, b) => b.trustScore - a.trustScore);
  } else if (sortBy === "reviews") {
    filteredStores = filteredStores.sort((a, b) => b.totalRating - a.totalRating);
  }

  // Pagination logic
  const totalPages = Math.ceil(filteredStores.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedStores = filteredStores.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [minRating, verifiedOnly, claimedOnly, selectedCountry, selectedCategory, selectedTags, search, sortBy]);

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen flex flex-col">
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading stores...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen flex flex-col">
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-red-500 text-lg">{error}</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-200 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              {categoryName === "All Categories" ? "Discover Trusted Stores" : `${categoryName} Stores`}
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Find reliable businesses with verified reviews and ratings from real customers
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Input
                type="text"
                placeholder="Search stores, brands, or categories..."
                className="w-full h-14 text-base pl-12 pr-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white shadow-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
          </div>
        </div>
      </section>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <div className="hidden lg:block w-80 space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5" />
                Filters
              </h3>
              
              {/* Rating Filter */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Minimum Rating</h4>
                <div className="grid grid-cols-2 gap-2">
                  {[0, 3, 4, 4.5].map((rating) => (
                    <Button
                      key={rating}
                      variant={minRating === rating ? "default" : "outline"}
                      size="sm"
                      onClick={() => setMinRating(rating)}
                      className="justify-center"
                    >
                      {rating === 0 ? "Any" : `${rating}+ ⭐`}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Country Filter */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Country</h4>
                <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Countries" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Countries</SelectItem>
                    {countries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Category</h4>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Status Filters */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Status</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={verifiedOnly}
                      onChange={(e) => setVerifiedOnly(e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm">Verified only</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={claimedOnly}
                      onChange={(e) => setClaimedOnly(e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm">Claimed profiles only</span>
                  </label>
                </div>
              </div>

              {/* Tags Filter */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Features</h4>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {allTags.map((tag) => (
                    <label key={tag} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedTags.includes(tag)}
                        onChange={(e) =>
                          setSelectedTags(
                            e.target.checked
                              ? [...selectedTags, tag]
                              : selectedTags.filter((t) => t !== tag)
                          )
                        }
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm">{tag}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setMinRating(0);
                  setVerifiedOnly(false);
                  setClaimedOnly(false);
                  setSelectedCountry("all");
                  setSelectedCategory("all");
                  setSelectedTags([]);
                  setSearch("");
                }}
              >
                Clear All Filters
              </Button>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filter Button & Controls */}
            <div className="lg:hidden mb-6">
              <div className="flex gap-3 mb-4">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(true)}
                  className="flex-1"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
                <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="trustScore">Trust Score</SelectItem>
                    <SelectItem value="reviews">Most Reviews</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  {filteredStores.length} stores found
                  {currentPage > 1 && (
                    <span className="text-sm font-normal text-gray-500 ml-2">
                      (Page {currentPage} of {totalPages})
                    </span>
                  )}
                </h2>
                <div className="hidden lg:flex items-center gap-2">
                  <span className="text-sm text-gray-500">Sort by:</span>
                  <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rating">Rating</SelectItem>
                      <SelectItem value="trustScore">Trust Score</SelectItem>
                      <SelectItem value="reviews">Most Reviews</SelectItem>
                      <SelectItem value="name">Name</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Store Grid/List */}
            <div className={
              viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                : "space-y-4"
            }>
              {paginatedStores.map((store) => (
                <StoreCard key={store.id} store={store} viewMode={viewMode} />
              ))}
            </div>

            {/* No Results */}
            {filteredStores.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No stores found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your filters or search terms</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setMinRating(0);
                    setVerifiedOnly(false);
                    setClaimedOnly(false);
                    setSelectedCountry("all");
                    setSelectedCategory("all");
                    setSelectedTags([]);
                    setSearch("");
                  }}
                >
                  Clear all filters
                </Button>
              </div>
            )}

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>

        {/* Mobile Filter Modal */}
        {showFilters && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
            <div className="bg-white h-full w-full max-w-sm ml-auto p-6 overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Filters</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFilters(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              {/* Mobile filter content - same as desktop */}
              <div className="space-y-6">
                {/* Rating Filter */}
                <div>
                  <h4 className="font-medium mb-3">Minimum Rating</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {[0, 3, 4, 4.5].map((rating) => (
                      <Button
                        key={rating}
                        variant={minRating === rating ? "default" : "outline"}
                        size="sm"
                        onClick={() => setMinRating(rating)}
                      >
                        {rating === 0 ? "Any" : `${rating}+ ⭐`}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Country Filter */}
                <div>
                  <h4 className="font-medium mb-3">Country</h4>
                  <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Countries" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Countries</SelectItem>
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Status Filters */}
                <div>
                  <h4 className="font-medium mb-3">Status</h4>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={verifiedOnly}
                        onChange={(e) => setVerifiedOnly(e.target.checked)}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm">Verified only</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={claimedOnly}
                        onChange={(e) => setClaimedOnly(e.target.checked)}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm">Claimed profiles only</span>
                    </label>
                  </div>
                </div>

                {/* Tags Filter */}
                <div>
                  <h4 className="font-medium mb-3">Features</h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {allTags.map((tag) => (
                      <label key={tag} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedTags.includes(tag)}
                          onChange={(e) =>
                            setSelectedTags(
                              e.target.checked
                                ? [...selectedTags, tag]
                                : selectedTags.filter((t) => t !== tag)
                            )
                          }
                          className="rounded border-gray-300"
                        />
                        <span className="text-sm">{tag}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t space-y-3">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setMinRating(0);
                    setVerifiedOnly(false);
                    setClaimedOnly(false);
                    setSelectedCountry("all");
                    setSelectedCategory("all");
                    setSelectedTags([]);
                    setSearch("");
                  }}
                >
                  Clear All Filters
                </Button>
                <Button
                  className="w-full"
                  onClick={() => setShowFilters(false)}
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}