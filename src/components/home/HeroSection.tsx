"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Store, 
  Shield, 
  ArrowRight, 
  Loader2, 
  Star, 
  CheckCircle,
  Zap,
  Users,
  Award,
  Globe,
  Filter,
  Clock,
  MapPin,
  ChevronRight,
  X
} from "lucide-react";
import Link from "next/link";
import { useSearch } from "@/stores/searchStore";

interface HeroSectionProps {
  selectedLocation: string;
  getTrustScoreColor: (score: string) => string;
}

const iconMap: Record<string, React.ElementType> = {
  Shirt: () => <div className="w-4 h-4 bg-blue-500 rounded" />,
  Monitor: () => <div className="w-4 h-4 bg-blue-600 rounded" />,
  Utensils: () => <div className="w-4 h-4 bg-blue-700 rounded" />,
  Sofa: () => <div className="w-4 h-4 bg-gray-800 rounded" />,
  BookOpen: () => <div className="w-4 h-4 bg-gray-700 rounded" />,
  Sparkles: () => <div className="w-4 h-4 bg-blue-500 rounded" />,
  Dumbbell: () => <div className="w-4 h-4 bg-gray-600 rounded" />,
  Gamepad2: () => <div className="w-4 h-4 bg-blue-600 rounded" />,
  Heart: () => <div className="w-4 h-4 bg-gray-800 rounded" />,
  Car: () => <div className="w-4 h-4 bg-blue-700 rounded" />,
  Store: () => <div className="w-4 h-4 bg-gray-500 rounded" />,
};

// Quick stats data
const quickStats = [
  { icon: Store, label: "50K+ Stores", color: "text-blue-600" },
  { icon: Users, label: "2M+ Reviews", color: "text-gray-800" },
  { icon: Shield, label: "Verified Safe", color: "text-blue-700" }
];

// Recent searches (mock data - in real app this would come from user's history)
const recentSearches = [
  "Electronics stores", "Fashion brands", "Food delivery"
];

export function HeroSection({ selectedLocation, getTrustScoreColor }: HeroSectionProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [minRating, setMinRating] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Use search store
  const { query, results, loading, error, setQuery, search, clearResults } = useSearch();

  // Create stable event handlers with useCallback
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    // Clear results immediately if less than 3 characters
    if (value.length < 3) {
      clearResults();
      return;
    }

    // Trigger search after 3 characters
    search(value);
  }, [setQuery, search, clearResults]);

  const handleSearchFocus = useCallback(() => {
    setIsInputFocused(true);
    if (window.innerWidth < 640) {
      setIsSearchModalOpen(true);
    } else {
      if (query.length >= 3) {
        setShowDropdown(true);
      }
    }
  }, [query]);

  const handleSearchBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    // Only blur if not clicking on dropdown
    const relatedTarget = e.relatedTarget as HTMLElement;
    if (
      !dropdownRef.current?.contains(relatedTarget) &&
      !inputRef.current?.contains(relatedTarget)
    ) {
      setTimeout(() => {
        setIsInputFocused(false);
        setShowDropdown(false);
      }, 150);
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
        setIsInputFocused(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <section className="relative py-12 sm:py-16 bg-gradient-to-br from-blue-50 via-white to-gray-50 overflow-hidden">
      {/* Background Elements - Subtle */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-100/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gray-100/40 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Trust Badge - Compact */}
          <div className="mb-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 border border-blue-200 shadow-sm">
            <Shield className="w-3 h-3 text-blue-600" />
            <span className="text-xs font-medium text-gray-700">Trusted by 2M+ shoppers</span>
          </div>

          {/* Main Headline - Reduced spacing */}
          <div className="mb-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 to-gray-900 bg-clip-text text-transparent">
                Find Trusted Stores
              </span>
              <br />
              <span className="text-gray-900">Shop with Confidence</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-4 leading-relaxed">
              Discover verified stores, read authentic reviews, and make informed shopping decisions.
            </p>
            
            {/* Quick Stats - Compact */}
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              {quickStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="flex items-center gap-1.5 bg-white/70 backdrop-blur-sm rounded-lg px-2.5 py-1.5 border border-gray-200">
                    <Icon className={`w-3.5 h-3.5 ${stat.color}`} />
                    <span className="text-xs font-semibold text-gray-700">{stat.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Enhanced Search Section - Compact with Fixed Focus */}
          <div className={`w-full max-w-2xl relative mb-6 ${isSearchModalOpen ? "hidden sm:block" : ""}`}>
            {/* Search Input */}
            <div className="relative">
              <form
                className="flex items-center relative bg-white rounded-xl shadow-lg border-2 border-gray-200 hover:border-blue-400 focus-within:border-blue-500 transition-all duration-300"
                autoComplete="off"
                onSubmit={(e) => {
                  e.preventDefault();
                  setShowDropdown(false);
                  setIsInputFocused(false);
                }}
              >
                <div className="flex-1 relative">
                  <Input
                    ref={inputRef}
                    type="text"
                    placeholder="Search stores, brands, or categories..."
                    className="w-full h-12 text-base pl-4 pr-16 border-0 rounded-xl bg-transparent focus:ring-0 focus:outline-none focus:border-0 focus:shadow-none placeholder:text-gray-400"
                    value={query}
                    onChange={handleSearchChange}
                    onFocus={handleSearchFocus}
                    onBlur={handleSearchBlur}
                  />
                  
                  {/* Advanced Filters Toggle */}
                  <button
                    type="button"
                    onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                    className="absolute right-14 top-1/2 transform -translate-y-1/2 p-1.5 text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <Filter className="w-4 h-4" />
                  </button>
                </div>
                
                <Button
                  type="submit"
                  className="h-10 w-10 mr-1 bg-gradient-to-r from-blue-600 to-gray-800 hover:from-blue-700 hover:to-gray-900 rounded-lg"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Search className="h-4 w-4" />
                  )}
                </Button>
              </form>

              {/* Advanced Filters Panel - Compact */}
              {showAdvancedFilters && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-3 z-50">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Category</label>
                      <select 
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">All Categories</option>
                        <option value="electronics">Electronics</option>
                        <option value="fashion">Fashion</option>
                        <option value="food">Food & Beverages</option>
                        <option value="beauty">Beauty</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Minimum Rating</label>
                      <select 
                        value={minRating}
                        onChange={(e) => setMinRating(Number(e.target.value))}
                        className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value={0}>Any Rating</option>
                        <option value={3}>3+ Stars</option>
                        <option value={4}>4+ Stars</option>
                        <option value={4.5}>4.5+ Stars</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-end mt-3">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setShowAdvancedFilters(false)}
                      className="text-xs"
                    >
                      Apply Filters
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Search Dropdown - Optimized */}
            {showDropdown && query.length >= 3 && !isSearchModalOpen && (
              <div
                ref={dropdownRef}
                className="absolute w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-80 overflow-y-auto z-50"
                onMouseDown={(e) => {
                  // Prevent blur when clicking on dropdown
                  e.preventDefault();
                }}
              >
                {loading && (
                  <div className="px-4 py-6 text-center">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2 text-blue-600" />
                    <p className="text-sm text-gray-500">Searching...</p>
                  </div>
                )}

                {error && (
                  <div className="px-4 py-3 text-center text-red-600 text-sm bg-red-50 rounded-t-lg">
                    {error}
                  </div>
                )}

                {!loading && !error && results.length === 0 && query.length >= 3 && (
                  <div className="px-4 py-6 text-center">
                    <Search className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                    <p className="text-sm text-gray-500 mb-1">No results found for "{query}"</p>
                    <p className="text-xs text-gray-400">Try a different search term</p>
                  </div>
                )}

                {!loading && !error && results.length > 0 && (
                  <>
                    {results.some((result) => result.type === "store") && (
                      <>
                        <div className="px-4 py-2 text-xs text-gray-500 font-semibold bg-gray-50 border-b flex items-center">
                          <Store className="w-3 h-3 mr-1" />
                          STORES
                        </div>
                        {results
                          .filter((result) => result.type === "store")
                          .slice(0, 4)
                          .map((result) => (
                            <Link
                              key={result.id}
                              href={`/stores/${result.id}`}
                              className="block px-4 py-3 hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0"
                              onClick={() => {
                                setShowDropdown(false);
                                setIsInputFocused(false);
                              }}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-gray-100 rounded-lg flex items-center justify-center text-blue-600 text-sm font-bold mr-3">
                                    {result.name.charAt(0)}
                                  </div>
                                  <div>
                                    <div className="font-medium text-gray-900 text-sm">{result.name}</div>
                                    <div className="text-xs text-gray-500 flex items-center gap-1">
                                      <MapPin className="w-3 h-3" />
                                      {result.country}
                                      {result.verified && (
                                        <Badge className="bg-blue-100 text-blue-800 text-xs ml-1">
                                          <CheckCircle className="w-2 h-2 mr-0.5" />
                                          Verified
                                        </Badge>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  {result.trustScore && (
                                    <span className={`px-2 py-0.5 text-xs font-semibold rounded ${getTrustScoreColor(result.trustScore)}`}>
                                      {result.trustScore}
                                    </span>
                                  )}
                                  {result.rating && (
                                    <div className="flex items-center">
                                      <Star className="h-3 w-3 text-yellow-400 fill-current" />
                                      <span className="text-xs ml-0.5 font-medium">{result.rating}</span>
                                    </div>
                                  )}
                                  <ChevronRight className="w-3 h-3 text-gray-400" />
                                </div>
                              </div>
                            </Link>
                          ))}
                      </>
                    )}

                    {results.some((result) => result.type === "category") && (
                      <>
                        <div className="px-4 py-2 text-xs text-gray-500 font-semibold bg-gray-50 border-b flex items-center">
                          <Globe className="w-3 h-3 mr-1" />
                          CATEGORIES
                        </div>
                        {results
                          .filter((result) => result.type === "category")
                          .slice(0, 3)
                          .map((result) => {
                            const Icon = iconMap[result.icon || "Store"] || iconMap.Store;
                            return (
                              <Link
                                key={result.id}
                                href={`/stores?categoryId=${result.id}`}
                                className="flex items-center px-4 py-3 hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0"
                                onClick={() => {
                                  setShowDropdown(false);
                                  setIsInputFocused(false);
                                }}
                              >
                                <div className="w-7 h-7 bg-gradient-to-br from-blue-100 to-gray-100 rounded-md flex items-center justify-center mr-3">
                                  <Icon />
                                </div>
                                <div className="flex-1">
                                  <div className="text-sm font-medium text-gray-900">{result.name}</div>
                                  <div className="text-xs text-gray-500">{result.description}</div>
                                </div>
                                <ChevronRight className="w-3 h-3 text-gray-400" />
                              </Link>
                            );
                          })}
                      </>
                    )}
                  </>
                )}
              </div>
            )}
          </div>

          {/* Quick Action Buttons - Compact */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <Link href="/categories">
              <Button variant="outline" className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-300 h-10 px-4 rounded-lg text-sm">
                <Store className="h-4 w-4" />
                Browse Categories
              </Button>
            </Link>
            <Link href="/verified">
              <Button variant="outline" className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-300 h-10 px-4 rounded-lg text-sm">
                <Shield className="h-4 w-4" />
                Verified Stores
              </Button>
            </Link>
          </div>

          {/* Value Propositions - Compact with Blue/Black Theme */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-gray-200 hover:shadow-md transition-all duration-300">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center mb-3">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">Instant Verification</h3>
              <p className="text-gray-600 text-sm">Get real-time verification status and trust scores for every store.</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-gray-200 hover:shadow-md transition-all duration-300">
              <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center mb-3">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">Community Driven</h3>
              <p className="text-gray-600 text-sm">Join millions of shoppers sharing authentic experiences.</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-gray-200 hover:shadow-md transition-all duration-300">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-gray-700 rounded-lg flex items-center justify-center mb-3">
                <Award className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">Save Time & Money</h3>
              <p className="text-gray-600 text-sm">Make informed decisions with comprehensive store insights.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search Modal - Optimized */}
      {isSearchModalOpen && (
        <div className="fixed inset-0 bg-white z-[100] flex flex-col">
          <div className="flex items-center px-4 py-3 border-b border-gray-200">
            <div className="relative flex-1 mr-3">
              <Input
                autoFocus
                type="text"
                placeholder="Search stores, brands, or categories..."
                className="w-full h-11 text-base pl-4 pr-10 rounded-lg border focus:border-blue-500 focus:ring-0 focus:outline-none focus:shadow-none"
                value={query}
                onChange={handleSearchChange}
              />
              <Button
                type="submit"
                className="absolute right-1 h-9 w-9 p-0 bg-blue-600 hover:bg-blue-700 rounded-md"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
              </Button>
            </div>
            <Button
              variant="ghost"
              onClick={() => setIsSearchModalOpen(false)}
              className="p-2"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Recent Searches */}
          {query.length === 0 && (
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Recent Searches</h3>
              <div className="space-y-2">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setQuery(search);
                      handleSearchChange({ target: { value: search } } as any);
                    }}
                    className="flex items-center w-full p-3 text-left hover:bg-gray-50 rounded-lg"
                  >
                    <Clock className="w-4 h-4 text-gray-400 mr-3" />
                    <span className="text-gray-700">{search}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex-1 overflow-y-auto p-4">
            {loading && (
              <div className="text-center py-8">
                <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2 text-blue-600" />
                <p className="text-sm text-gray-500">Searching...</p>
              </div>
            )}

            {error && (
              <div className="text-center text-red-600 text-sm py-4">
                {error}
              </div>
            )}

            {!loading && !error && results.length > 0 && (
              <>
                {results.some((result) => result.type === "store") && (
                  <>
                    <div className="text-sm text-gray-500 font-semibold mb-2">Stores</div>
                    {results
                      .filter((result) => result.type === "store")
                      .map((result) => (
                        <Link
                          key={result.id}
                          href={`/stores/${result.id}`}
                          className="flex items-center p-3 hover:bg-gray-100 rounded-lg mb-2"
                          onClick={() => setIsSearchModalOpen(false)}
                        >
                          <div className="flex items-center flex-1">
                            <div className="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center text-gray-600 text-sm font-bold mr-3">
                              {result.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-medium">{result.name}</div>
                              <div className="text-xs text-gray-500">{result.country}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {result.trustScore && (
                              <span className={`px-2 py-0.5 text-xs font-semibold rounded ${getTrustScoreColor(result.trustScore)}`}>
                                {result.trustScore}
                              </span>
                            )}
                          </div>
                        </Link>
                      ))}
                  </>
                )}

                {results.some((result) => result.type === "category") && (
                  <>
                    <div className="text-sm text-gray-500 font-semibold mb-2">Categories</div>
                    {results
                      .filter((result) => result.type === "category")
                      .map((result) => {
                        const Icon = iconMap[result.icon || "Store"] || iconMap.Store;
                        return (
                          <Link
                            key={result.id}
                            href={`/stores?categoryId=${result.id}`}
                            className="flex items-center p-3 hover:bg-gray-100 rounded-lg mb-2"
                            onClick={() => setIsSearchModalOpen(false)}
                          >
                            <div className="w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center mr-3">
                              <Icon />
                            </div>
                            <div>
                              <div className="text-sm font-medium">{result.name}</div>
                              <div className="text-xs text-gray-500">{result.description}</div>
                            </div>
                          </Link>
                        );
                      })}
                  </>
                )}
              </>
            )}

            {!loading && !error && results.length === 0 && query.length >= 3 && (
              <div className="text-center text-gray-500 mt-8">
                <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No results found for "{query}"</p>
                <p className="text-sm mt-2">Try searching for a different store or category</p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}