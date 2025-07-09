"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Store, 
  TrendingUp, 
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
  Sparkles,
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
  Shirt: () => <div className="w-5 h-5 bg-blue-500 rounded" />,
  Monitor: () => <div className="w-5 h-5 bg-green-500 rounded" />,
  Utensils: () => <div className="w-5 h-5 bg-yellow-500 rounded" />,
  Sofa: () => <div className="w-5 h-5 bg-purple-500 rounded" />,
  BookOpen: () => <div className="w-5 h-5 bg-red-500 rounded" />,
  Sparkles: () => <div className="w-5 h-5 bg-pink-500 rounded" />,
  Dumbbell: () => <div className="w-5 h-5 bg-indigo-500 rounded" />,
  Gamepad2: () => <div className="w-5 h-5 bg-orange-500 rounded" />,
  Heart: () => <div className="w-5 h-5 bg-rose-500 rounded" />,
  Car: () => <div className="w-5 h-5 bg-cyan-500 rounded" />,
  Store: () => <div className="w-5 h-5 bg-gray-500 rounded" />,
};

// Trending searches data
const trendingSearches = [
  "Amazon India", "Flipkart", "Myntra", "Nykaa", "Zomato", "Swiggy"
];

// Quick stats data
const quickStats = [
  { icon: Store, label: "50K+ Stores", color: "text-blue-600" },
  { icon: Users, label: "2M+ Reviews", color: "text-green-600" },
  { icon: Shield, label: "Verified Safe", color: "text-purple-600" },
  { icon: Award, label: "Trusted Platform", color: "text-orange-600" }
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

  const handleTrendingClick = (searchTerm: string) => {
    setQuery(searchTerm);
    search(searchTerm);
    setShowDropdown(true);
  };

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
    <section className="relative py-16 sm:py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-indigo-200/30 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          {/* Trust Badge */}
          <div className="mb-6 flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-blue-200 shadow-sm">
            <Shield className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-gray-700">Trusted by 2M+ shoppers</span>
            <div className="flex -space-x-1">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="text-xs text-white font-bold">{i}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Main Headline */}
          <div className="mb-8 sm:mb-10">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Smart Shopping
              </span>
              <br />
              <span className="text-gray-900">Starts Here</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto mb-6 leading-relaxed">
              Discover verified stores, read authentic reviews, and make confident shopping decisions with India's most trusted platform.
            </p>
            
            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              {quickStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-lg px-3 py-2 border border-gray-200">
                    <Icon className={`w-4 h-4 ${stat.color}`} />
                    <span className="text-sm font-semibold text-gray-700">{stat.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Enhanced Search Section */}
          <div className={`w-full max-w-3xl relative mb-8 ${isSearchModalOpen ? "hidden sm:block" : ""}`}>
            {/* Search Input with Advanced Features */}
            <div className="relative">
              <form
                className="flex items-center relative bg-white rounded-2xl shadow-2xl border-2 border-gray-200 focus-within:border-blue-500 transition-all duration-300"
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
                    className="w-full h-14 sm:h-16 text-base sm:text-lg pl-6 pr-4 border-0 rounded-2xl bg-transparent focus:ring-0 focus:border-0 placeholder:text-gray-400"
                    value={query}
                    onChange={handleSearchChange}
                    onFocus={handleSearchFocus}
                    onBlur={handleSearchBlur}
                  />
                  
                  {/* Advanced Filters Toggle */}
                  <button
                    type="button"
                    onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                    className="absolute right-20 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <Filter className="w-5 h-5" />
                  </button>
                </div>
                
                <Button
                  type="submit"
                  className="h-12 sm:h-14 w-12 sm:w-14 mr-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl shadow-lg"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="h-5 w-5 sm:h-6 sm:w-6 animate-spin" />
                  ) : (
                    <Search className="h-5 w-5 sm:h-6 sm:w-6" />
                  )}
                </Button>
              </form>

              {/* Advanced Filters Panel */}
              {showAdvancedFilters && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 p-4 z-50">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                      <select 
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">All Categories</option>
                        <option value="electronics">Electronics</option>
                        <option value="fashion">Fashion</option>
                        <option value="food">Food & Beverages</option>
                        <option value="beauty">Beauty</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Rating</label>
                      <select 
                        value={minRating}
                        onChange={(e) => setMinRating(Number(e.target.value))}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value={0}>Any Rating</option>
                        <option value={3}>3+ Stars</option>
                        <option value={4}>4+ Stars</option>
                        <option value={4.5}>4.5+ Stars</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-end mt-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setShowAdvancedFilters(false)}
                    >
                      Apply Filters
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Search Suggestions */}
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              <span className="text-sm text-gray-500 mr-2">Trending:</span>
              {trendingSearches.slice(0, 4).map((term, index) => (
                <button
                  key={index}
                  onClick={() => handleTrendingClick(term)}
                  className="text-sm bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 px-3 py-1 rounded-full transition-colors duration-200"
                >
                  {term}
                </button>
              ))}
            </div>

            {/* Search Dropdown */}
            {showDropdown && query.length >= 3 && !isSearchModalOpen && (
              <div
                ref={dropdownRef}
                className="absolute w-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 max-h-96 overflow-y-auto z-50"
                onMouseDown={(e) => {
                  // Prevent blur when clicking on dropdown
                  e.preventDefault();
                }}
              >
                {loading && (
                  <div className="px-6 py-8 text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-3 text-blue-600" />
                    <p className="text-sm text-gray-500">Searching for the best stores...</p>
                  </div>
                )}

                {error && (
                  <div className="px-6 py-4 text-center text-red-600 text-sm bg-red-50 rounded-t-xl">
                    {error}
                  </div>
                )}

                {!loading && !error && results.length === 0 && query.length >= 3 && (
                  <div className="px-6 py-8 text-center">
                    <Search className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p className="text-sm text-gray-500 mb-2">No results found for "{query}"</p>
                    <p className="text-xs text-gray-400">Try searching for a different store or category</p>
                  </div>
                )}

                {!loading && !error && results.length > 0 && (
                  <>
                    {results.some((result) => result.type === "store") && (
                      <>
                        <div className="px-6 py-3 text-xs text-gray-500 font-semibold bg-gray-50 border-b">
                          <Store className="w-4 h-4 inline mr-2" />
                          STORES
                        </div>
                        {results
                          .filter((result) => result.type === "store")
                          .map((result) => (
                            <Link
                              key={result.id}
                              href={`/stores/${result.id}`}
                              className="block px-6 py-4 hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0"
                              onClick={() => {
                                setShowDropdown(false);
                                setIsInputFocused(false);
                              }}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center text-blue-600 text-lg font-bold mr-4">
                                    {result.name.charAt(0)}
                                  </div>
                                  <div>
                                    <div className="font-semibold text-gray-900">{result.name}</div>
                                    <div className="text-sm text-gray-500 flex items-center gap-2">
                                      <MapPin className="w-3 h-3" />
                                      {result.country}
                                      {result.verified && (
                                        <Badge className="bg-green-100 text-green-800 text-xs">
                                          <CheckCircle className="w-3 h-3 mr-1" />
                                          Verified
                                        </Badge>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-3">
                                  {result.trustScore && (
                                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getTrustScoreColor(result.trustScore)}`}>
                                      {result.trustScore}
                                    </span>
                                  )}
                                  {result.rating && (
                                    <div className="flex items-center">
                                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                      <span className="text-sm ml-1 font-medium">{result.rating}</span>
                                    </div>
                                  )}
                                  <ChevronRight className="w-4 h-4 text-gray-400" />
                                </div>
                              </div>
                            </Link>
                          ))}
                      </>
                    )}

                    {results.some((result) => result.type === "category") && (
                      <>
                        <div className="px-6 py-3 text-xs text-gray-500 font-semibold bg-gray-50 border-b">
                          <Globe className="w-4 h-4 inline mr-2" />
                          CATEGORIES
                        </div>
                        {results
                          .filter((result) => result.type === "category")
                          .map((result) => {
                            const Icon = iconMap[result.icon || "Store"] || iconMap.Store;
                            return (
                              <Link
                                key={result.id}
                                href={`/stores?categoryId=${result.id}`}
                                className="flex items-center px-6 py-4 hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0"
                                onClick={() => {
                                  setShowDropdown(false);
                                  setIsInputFocused(false);
                                }}
                              >
                                <div className="w-10 h-10 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center mr-4">
                                  <Icon />
                                </div>
                                <div className="flex-1">
                                  <div className="text-sm font-semibold text-gray-900">{result.name}</div>
                                  <div className="text-xs text-gray-500">{result.description}</div>
                                </div>
                                <ChevronRight className="w-4 h-4 text-gray-400" />
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

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Link href="/categories">
              <Button variant="outline" className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-300 h-12 px-6 rounded-xl shadow-sm">
                <Store className="h-5 w-5" />
                Browse Categories
              </Button>
            </Link>
            <Link href="/trending">
              <Button variant="outline" className="flex items-center gap-2 hover:bg-green-50 hover:border-green-300 h-12 px-6 rounded-xl shadow-sm">
                <TrendingUp className="h-5 w-5" />
                Trending Stores
              </Button>
            </Link>
            <Link href="/verified">
              <Button variant="outline" className="flex items-center gap-2 hover:bg-purple-50 hover:border-purple-300 h-12 px-6 rounded-xl shadow-sm">
                <Shield className="h-5 w-5" />
                Verified Only
              </Button>
            </Link>
            <Link href="/reviews">
              <Button variant="outline" className="flex items-center gap-2 hover:bg-orange-50 hover:border-orange-300 h-12 px-6 rounded-xl shadow-sm">
                <Sparkles className="h-5 w-5" />
                Latest Reviews
              </Button>
            </Link>
          </div>

          {/* Value Propositions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Instant Verification</h3>
              <p className="text-gray-600 text-sm">Get real-time verification status and trust scores for every store before you shop.</p>
            </div>
            
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Community Driven</h3>
              <p className="text-gray-600 text-sm">Join millions of shoppers sharing authentic experiences and honest reviews.</p>
            </div>
            
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Save Time & Money</h3>
              <p className="text-gray-600 text-sm">Make informed decisions faster with our comprehensive store insights and ratings.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Full Page Search Modal for Small Screens */}
      {isSearchModalOpen && (
        <div className="fixed inset-0 bg-white z-[100] flex flex-col">
          <div className="flex items-center px-4 py-3 border-b border-gray-200">
            <div className="relative flex-1 mr-3">
              <Input
                autoFocus
                type="text"
                placeholder="Search stores, brands, or categories..."
                className="w-full h-12 text-base pl-4 pr-10 rounded-lg border focus:border-blue-500"
                value={query}
                onChange={handleSearchChange}
              />
              <Button
                type="submit"
                className="absolute right-2 h-8 w-8 p-0 bg-blue-600 hover:bg-blue-700"
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
                            <Icon />
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