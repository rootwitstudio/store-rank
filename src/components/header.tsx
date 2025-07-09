"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Menu, X, Shield, User, Building2, MapPin, ChevronDown, TrendingUp, Star, Bell, Filter } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/stores/authStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

// Mock trending searches and categories for demo
const trendingSearches = [
  "Amazon reviews", "Best electronics stores", "Fashion retailers", "Local businesses"
];

const quickCategories = [
  { name: "Electronics", icon: "📱", count: "2.3k stores" },
  { name: "Fashion", icon: "👕", count: "1.8k stores" },
  { name: "Home", icon: "🏠", count: "1.2k stores" },
  { name: "Food", icon: "🍕", count: "950 stores" }
];

const recentSearches = [
  "Nike store reviews", "Best coffee shops", "Online electronics"
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("IN");
  const { user, logout, accessToken } = useAuth();
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  
  const handleBusinessClick = () => {
    router.push("/business/register");
  };

  const countries = [
    { code: "IN", name: "India", flag: "🇮🇳" },
    { code: "US", name: "United States", flag: "🇺🇸" },
    { code: "UK", name: "United Kingdom", flag: "🇬🇧" },
    { code: "CA", name: "Canada", flag: "🇨🇦" },
    { code: "AU", name: "Australia", flag: "🇦🇺" },
  ];

  const currentCountry = countries.find(c => c.code === selectedCountry) || countries[0];

  // Close search dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (query: string) => {
    if (query.trim()) {
      router.push(`/stores?search=${encodeURIComponent(query.trim())}`);
      setIsSearchFocused(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex h-14 sm:h-16 items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 text-lg sm:text-xl lg:text-2xl font-bold tracking-tight hover:opacity-90 transition-opacity flex-shrink-0"
            >
              <div className="relative flex h-7 w-7 sm:h-8 sm:w-8 lg:h-10 lg:w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 shadow-md">
                <Shield className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-white" />
              </div>
              <span className="hidden xs:inline text-base sm:text-lg lg:text-xl">StoreRankly</span>
            </Link>

            {/* Desktop Search Bar */}
            <div className="hidden lg:flex flex-1 max-w-2xl mx-8 relative" ref={searchRef}>
              <div className="relative w-full">
                <Input
                  type="text"
                  placeholder="Search stores, brands, or reviews..."
                  className="w-full h-11 text-base pl-12 pr-20 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white shadow-sm transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                  <Button 
                    size="sm" 
                    className="h-7 px-3 text-xs"
                    onClick={() => handleSearch(searchQuery)}
                  >
                    Search
                  </Button>
                </div>
              </div>

              {/* Search Dropdown */}
              {isSearchFocused && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 z-50 max-h-96 overflow-y-auto">
                  <div className="p-4">
                    {/* Quick Categories */}
                    <div className="mb-6">
                      <h3 className="text-sm font-semibold text-gray-700 mb-3">Browse Categories</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {quickCategories.map((category) => (
                          <Link
                            key={category.name}
                            href={`/categories?category=${category.name.toLowerCase()}`}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                            onClick={() => setIsSearchFocused(false)}
                          >
                            <span className="text-2xl">{category.icon}</span>
                            <div>
                              <div className="font-medium text-gray-900">{category.name}</div>
                              <div className="text-xs text-gray-500">{category.count}</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Trending Searches */}
                    <div className="mb-4">
                      <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        Trending Searches
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {trendingSearches.map((search) => (
                          <button
                            key={search}
                            className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm hover:bg-blue-100 transition-colors"
                            onClick={() => handleSearch(search)}
                          >
                            {search}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Recent Searches */}
                    {recentSearches.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold text-gray-700 mb-3">Recent Searches</h3>
                        <div className="space-y-1">
                          {recentSearches.map((search) => (
                            <button
                              key={search}
                              className="flex items-center gap-3 w-full p-2 text-left hover:bg-gray-50 rounded-lg transition-colors"
                              onClick={() => handleSearch(search)}
                            >
                              <Search className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-700">{search}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              <Link
                href="/categories"
                className="relative text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-blue-600 after:transition-all hover:after:w-full"
              >
                Categories
              </Link>
              <Link
                href="/blogs"
                className="relative text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-blue-600 after:transition-all hover:after:w-full"
              >
                Blogs
              </Link>
            </nav>

            {/* Right side: Auth Buttons and Country Selection */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Desktop Auth Buttons */}
              <div className="hidden lg:flex items-center gap-3">
                {user && accessToken ? (
                  <div className="flex items-center gap-3">
                    {user?.role === "BUSINESS" && (
                      <Link
                        href="/dashboard"
                        className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                      >
                        Dashboard
                      </Link>
                    )}
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-3 w-3 text-blue-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-700 max-w-24 truncate">
                        {user.name || user.email}
                      </span>
                    </div>
                    <button
                      onClick={logout}
                      className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      Login
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleBusinessClick}
                      className="text-xs px-3 py-1.5 h-8"
                    >
                      For Business
                    </Button>
                  </>
                )}
              </div>

              {/* Country Selection */}
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger className="w-auto border-0 shadow-none hover:bg-gray-100 px-2 py-1 h-auto gap-1 text-xs sm:text-sm">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />
                    <span className="hidden sm:inline font-medium">{currentCountry.code}</span>
                    <span className="sm:hidden text-lg">{currentCountry.flag}</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{country.flag}</span>
                        <span>{country.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 text-gray-700 hover:text-black transition-colors rounded-lg hover:bg-gray-100 flex-shrink-0"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5 sm:h-6 sm:w-6" />
                ) : (
                  <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar - Below header */}
          <div className="lg:hidden pb-3 pt-2" ref={searchRef}>
            <div className="relative">
              <Input
                type="text"
                placeholder="Search stores, brands..."
                className="w-full h-10 text-base pl-10 pr-16 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Button 
                size="sm" 
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 px-3 text-xs"
                onClick={() => handleSearch(searchQuery)}
              >
                Go
              </Button>
            </div>

            {/* Mobile Search Dropdown */}
            {isSearchFocused && (
              <div className="absolute left-3 right-3 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-80 overflow-y-auto">
                <div className="p-3">
                  {/* Quick Categories - Mobile */}
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Categories</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {quickCategories.map((category) => (
                        <Link
                          key={category.name}
                          href={`/categories?category=${category.name.toLowerCase()}`}
                          className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                          onClick={() => setIsSearchFocused(false)}
                        >
                          <span className="text-lg">{category.icon}</span>
                          <div>
                            <div className="font-medium text-gray-900 text-sm">{category.name}</div>
                            <div className="text-xs text-gray-500">{category.count}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Trending - Mobile */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      Trending
                    </h3>
                    <div className="flex flex-wrap gap-1">
                      {trendingSearches.slice(0, 3).map((search) => (
                        <button
                          key={search}
                          className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs hover:bg-blue-100 transition-colors"
                          onClick={() => handleSearch(search)}
                        >
                          {search}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden border-t bg-white/95 backdrop-blur-sm shadow-lg rounded-b-lg mx-[-12px] sm:mx-[-16px]">
              <nav className="flex flex-col py-2">
                {/* Navigation Links */}
                <Link
                  href="/categories"
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Shield className="h-4 w-4 text-blue-600" />
                  </div>
                  Categories
                </Link>
                
                <Link
                  href="/blogs"
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors border-b border-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <Search className="h-4 w-4 text-green-600" />
                  </div>
                  Blogs
                </Link>

                {/* Auth Section */}
                <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                  {user && accessToken ? (
                    <div className="space-y-3">
                      {/* User Info */}
                      <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {user.name || 'User'}
                          </p>
                          <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        </div>
                      </div>

                      {/* Dashboard Link for Business Users */}
                      {user?.role === "BUSINESS" && (
                        <Link 
                          href="/dashboard" 
                          className="flex items-center gap-3 p-3 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <Building2 className="h-4 w-4" />
                          Dashboard
                        </Link>
                      )}

                      {/* Logout Button */}
                      <button
                        className="flex items-center gap-3 p-3 w-full text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        onClick={() => {
                          logout();
                          setIsMenuOpen(false);
                        }}
                      >
                        <X className="h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Link 
                        href="/login" 
                        className="flex items-center justify-center gap-2 w-full p-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <User className="h-4 w-4" />
                        Login
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-center gap-2 p-3 h-auto"
                        onClick={() => {
                          handleBusinessClick();
                          setIsMenuOpen(false);
                        }}
                      >
                        <Building2 className="h-4 w-4" />
                        For Business
                      </Button>
                    </div>
                  )}
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
}