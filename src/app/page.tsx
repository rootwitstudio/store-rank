"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { HomeList } from "@/components/HomeList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Search,
  TrendingUp,
  Shield,
  Users,
  Star,
  ArrowRight,
  CheckCircle,
  Globe,
  Zap,
  Award,
  BarChart3,
  MessageSquare,
  Filter,
  Sparkles,
  Target,
  Clock,
  ThumbsUp
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Mock data
const featuredStores = [
  {
    id: "1",
    name: "Amazon",
    desc: "World's largest online marketplace with millions of products and fast delivery worldwide.",
    rating: 4.2,
    country: "United States",
    link: "https://www.amazon.com",
    category: "E-commerce",
    verified: true,
    claimed: true,
    trustScore: 92,
    responseTime: "< 1 hour"
  },
  {
    id: "2",
    name: "Shopify",
    desc: "Leading e-commerce platform helping businesses of all sizes sell online and in-person.",
    rating: 4.4,
    country: "Canada",
    link: "https://www.shopify.com",
    category: "Technology",
    verified: true,
    claimed: true,
    trustScore: 89,
    responseTime: "< 30 min"
  },
  {
    id: "3",
    name: "Etsy",
    desc: "Global marketplace for unique and creative goods made by independent sellers.",
    rating: 3.9,
    country: "United States",
    link: "https://www.etsy.com",
    category: "Marketplace",
    verified: true,
    claimed: true,
    trustScore: 85,
    responseTime: "2-6 hours"
  }
];

const categories = [
  { name: "Electronics", icon: "📱", count: "2.3k", color: "bg-blue-50 text-blue-700" },
  { name: "Fashion", icon: "👕", count: "1.8k", color: "bg-purple-50 text-purple-700" },
  { name: "Home & Living", icon: "🏠", count: "1.2k", color: "bg-green-50 text-green-700" },
  { name: "Food & Beverages", icon: "🍕", count: "950", color: "bg-orange-50 text-orange-700" },
  { name: "Beauty", icon: "💄", count: "780", color: "bg-pink-50 text-pink-700" },
  { name: "Sports", icon: "⚽", count: "650", color: "bg-indigo-50 text-indigo-700" }
];

const trendingSearches = [
  "Amazon reviews", "Best electronics stores", "Fashion retailers", "Local businesses",
  "Online shopping", "Customer service", "Delivery reviews", "Product quality"
];

const stats = [
  { label: "Verified Stores", value: "10,000+", icon: Shield, color: "text-green-600" },
  { label: "Customer Reviews", value: "2.5M+", icon: MessageSquare, color: "text-blue-600" },
  { label: "Countries Covered", value: "50+", icon: Globe, color: "text-purple-600" },
  { label: "Trust Score Avg", value: "87%", icon: Award, color: "text-orange-600" }
];

const features = [
  {
    icon: Shield,
    title: "Verified Reviews",
    description: "All reviews are verified from real customers who made actual purchases",
    color: "bg-green-50 text-green-600"
  },
  {
    icon: BarChart3,
    title: "Trust Scores",
    description: "AI-powered trust scores based on multiple factors and customer feedback",
    color: "bg-blue-50 text-blue-600"
  },
  {
    icon: Zap,
    title: "Real-time Updates",
    description: "Get instant notifications about store responses and review updates",
    color: "bg-yellow-50 text-yellow-600"
  },
  {
    icon: Target,
    title: "Smart Matching",
    description: "Find stores that match your preferences and shopping behavior",
    color: "bg-purple-50 text-purple-600"
  }
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const router = useRouter();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/stores?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleTrendingSearch = (query: string) => {
    router.push(`/stores?search=${encodeURIComponent(query)}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section - Mobile First */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="relative container mx-auto px-4 py-12 sm:py-16 lg:py-20">
          <div className="max-w-4xl mx-auto text-center">
            {/* Mobile-First Headlines */}
            <div className="mb-6 sm:mb-8">
              <Badge className="bg-white/10 text-white border-white/20 mb-4 px-3 py-1">
                <Sparkles className="w-3 h-3 mr-1" />
                Trusted by 2.5M+ shoppers
              </Badge>
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                Find Trusted Stores
                <span className="block text-2xl sm:text-3xl lg:text-5xl text-blue-200 mt-2">
                  Make Smart Purchases
                </span>
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-blue-100 mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed">
                Discover verified reviews, trust scores, and detailed insights about online stores before you buy
              </p>
            </div>

            {/* Enhanced Search Bar */}
            <div className="max-w-2xl mx-auto mb-8 sm:mb-12">
              <div className="relative">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-0">
                  <div className="relative flex-1">
                    <Input
                      type="text"
                      placeholder="Search stores, brands, or products..."
                      className="w-full h-12 sm:h-14 text-base sm:text-lg pl-12 sm:pl-14 pr-4 sm:pr-6 rounded-xl sm:rounded-l-xl sm:rounded-r-none border-2 border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-white/70 focus:border-white/40 focus:bg-white/20 transition-all"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setIsSearchFocused(true)}
                      onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    />
                    <Search className="absolute left-4 sm:left-5 top-1/2 transform -translate-y-1/2 text-white/70 h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <Button 
                    size="lg" 
                    className="h-12 sm:h-14 px-6 sm:px-8 bg-white text-blue-700 hover:bg-blue-50 font-semibold text-base sm:text-lg rounded-xl sm:rounded-l-none sm:rounded-r-xl shadow-lg hover:shadow-xl transition-all"
                    onClick={handleSearch}
                  >
                    <Search className="w-5 h-5 mr-2" />
                    Search
                  </Button>
                </div>
              </div>

              {/* Trending Searches - Mobile Optimized */}
              <div className="mt-4 sm:mt-6">
                <p className="text-sm text-blue-200 mb-3">Trending searches:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {trendingSearches.slice(0, 4).map((search) => (
                    <button
                      key={search}
                      className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-sm rounded-full border border-white/20 hover:border-white/40 transition-all"
                      onClick={() => handleTrendingSearch(search)}
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Stats - Mobile Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className={`inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 mb-2 sm:mb-3`}>
                    <stat.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.color.replace('text-', 'text-white')}`} />
                  </div>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-blue-200">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTA Buttons - Mobile Stack */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-white text-blue-700 hover:bg-blue-50 font-semibold px-6 sm:px-8 h-12 sm:h-14 text-base sm:text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
                asChild
              >
                <Link href="/categories">
                  <Shield className="w-5 h-5 mr-2" />
                  Browse Categories
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 font-semibold px-6 sm:px-8 h-12 sm:h-14 text-base sm:text-lg rounded-xl transition-all"
                asChild
              >
                <Link href="/stores">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  View All Stores
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/5 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/5 rounded-full blur-xl animate-pulse delay-1000"></div>
      </section>

      {/* Categories Section - Mobile Optimized */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover trusted stores across different categories with verified reviews and ratings
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/stores?category=${category.name.toLowerCase()}`}
                className="group"
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 group-hover:scale-105 border-2 hover:border-blue-200">
                  <CardContent className="p-4 sm:p-6 text-center">
                    <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{category.icon}</div>
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">{category.name}</h3>
                    <Badge className={`${category.color} text-xs`}>
                      {category.count} stores
                    </Badge>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-12">
            <Button variant="outline" size="lg" asChild className="px-6 sm:px-8">
              <Link href="/categories">
                View All Categories
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Stores - Mobile Carousel */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Featured Stores
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Top-rated stores with excellent customer service and verified reviews
            </p>
          </div>

          {/* Mobile: Stack, Desktop: Grid */}
          <div className="block sm:hidden space-y-4">
            {featuredStores.map((store) => (
              <HomeList
                key={store.id}
                id={store.id}
                name={store.name}
                desc={store.desc}
                rating={store.rating}
                country={store.country}
                link={store.link}
                buttonLabel="View Reviews"
              />
            ))}
          </div>

          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredStores.map((store) => (
              <HomeList
                key={store.id}
                id={store.id}
                name={store.name}
                desc={store.desc}
                rating={store.rating}
                country={store.country}
                link={store.link}
                buttonLabel="View Reviews"
              />
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-12">
            <Button size="lg" asChild className="px-6 sm:px-8">
              <Link href="/stores">
                Explore All Stores
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section - Mobile Cards */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose StoreRankly?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide comprehensive insights to help you make informed shopping decisions
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature) => (
              <Card key={feature.title} className="text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${feature.color} mb-4`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Mobile Optimized */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
              Ready to Find Your Perfect Store?
            </h2>
            <p className="text-lg sm:text-xl text-blue-100 mb-8 sm:mb-10">
              Join millions of smart shoppers who trust StoreRankly for their purchasing decisions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-blue-700 hover:bg-blue-50 font-semibold px-6 sm:px-8 h-12 sm:h-14 text-base sm:text-lg"
                asChild
              >
                <Link href="/stores">
                  <Search className="w-5 h-5 mr-2" />
                  Start Exploring
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white/30 text-white hover:bg-white/10 font-semibold px-6 sm:px-8 h-12 sm:h-14 text-base sm:text-lg"
                asChild
              >
                <Link href="/business/register">
                  <Building2 className="w-5 h-5 mr-2" />
                  List Your Business
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-3 text-sm sm:text-base">Company</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-sm sm:text-base">Features</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
                <li><Link href="/stores" className="hover:text-white transition-colors">Store Reviews</Link></li>
                <li><Link href="/categories" className="hover:text-white transition-colors">Categories</Link></li>
                <li><Link href="/trust-score" className="hover:text-white transition-colors">Trust Scores</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-sm sm:text-base">Support</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
                <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/guidelines" className="hover:text-white transition-colors">Guidelines</Link></li>
                <li><Link href="/report" className="hover:text-white transition-colors">Report Issue</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-sm sm:text-base">Legal</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 sm:mb-0">
              <div className="flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700">
                <Shield className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
              </div>
              <span className="font-bold text-sm sm:text-base">StoreRankly</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-400">
              © 2024 StoreRankly. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}