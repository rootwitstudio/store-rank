"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Store, TrendingUp, Shield, ArrowRight, Loader2, Star } from "lucide-react";
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

export function HeroSection({ selectedLocation, getTrustScoreColor }: HeroSectionProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
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
    <section className="py-12 sm:py-16 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 sm:px-6">
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
                setIsInputFocused(false);
              }}
            >
              <Input
                ref={inputRef}
                type="text"
                placeholder="Search for stores, brands, or categories..."
                className="w-full h-12 sm:h-14 text-base sm:text-lg pl-4 pr-12 rounded-lg border-2 focus:border-blue-500 shadow-lg"
                value={query}
                onChange={handleSearchChange}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
              />
              <Button
                type="submit"
                className="absolute right-2 h-8 sm:h-10 w-8 sm:w-10 p-0 bg-blue-600 hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                ) : (
                  <Search className="h-4 w-4 sm:h-5 sm:w-5" />
                )}
              </Button>
            </form>

            {/* Search Dropdown */}
            {showDropdown && query.length >= 3 && !isSearchModalOpen && (
              <div
                ref={dropdownRef}
                className="absolute w-full mt-1 bg-white rounded-lg shadow-xl border border-gray-200 max-h-60 overflow-y-auto z-50"
                onMouseDown={(e) => {
                  // Prevent blur when clicking on dropdown
                  e.preventDefault();
                }}
              >
                {loading && (
                  <div className="px-4 py-8 text-center">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2 text-blue-600" />
                    <p className="text-sm text-gray-500">Searching...</p>
                  </div>
                )}

                {error && (
                  <div className="px-4 py-3 text-center text-red-600 text-sm">
                    {error}
                  </div>
                )}

                {!loading && !error && results.length === 0 && query.length >= 3 && (
                  <div className="px-4 py-8 text-center">
                    <Search className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                    <p className="text-sm text-gray-500">No results found for "{query}"</p>
                    <p className="text-xs text-gray-400 mt-1">Try searching for a different store or category</p>
                  </div>
                )}

                {!loading && !error && results.length > 0 && (
                  <>
                    {results.some((result) => result.type === "store") && (
                      <>
                        <div className="px-4 py-2 text-xs text-gray-500 font-semibold bg-gray-50">
                          Companies
                        </div>
                        {results
                          .filter((result) => result.type === "store")
                          .map((result) => (
                            <Link
                              key={result.id}
                              href={`/stores/${result.id}`}
                              className="w-full px-4 py-3 text-left hover:bg-gray-100 text-sm flex items-center justify-between border-b border-gray-100 last:border-b-0"
                              onClick={() => {
                                setShowDropdown(false);
                                setIsInputFocused(false);
                              }}
                            >
                              <div className="flex items-center">
                                <div className="w-8 h-8 bg-gray-200 rounded-md flex items-center justify-center text-gray-600 text-xs font-bold mr-3">
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
                                {result.rating && (
                                  <div className="flex items-center">
                                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                                    <span className="text-xs ml-1">{result.rating}</span>
                                  </div>
                                )}
                              </div>
                            </Link>
                          ))}
                      </>
                    )}

                    {results.some((result) => result.type === "category") && (
                      <>
                        <div className="px-4 py-2 text-xs text-gray-500 font-semibold bg-gray-50">
                          Categories
                        </div>
                        {results
                          .filter((result) => result.type === "category")
                          .map((result) => {
                            const Icon = iconMap[result.icon || "Store"] || iconMap.Store;
                            return (
                              <Link
                                key={result.id}
                                href={`/stores?categoryId=${result.id}`}
                                className="flex items-center px-4 py-3 hover:bg-gray-100 border-b border-gray-100 last:border-b-0"
                                onClick={() => {
                                  setShowDropdown(false);
                                  setIsInputFocused(false);
                                }}
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
      </div>

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
              ✕
            </Button>
          </div>

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
                    <div className="text-sm text-gray-500 font-semibold mb-2">Companies</div>
                    {results
                      .filter((result) => result.type === "store")
                      .map((result) => (
                        <Link
                          key={result.id}
                          href={`/stores/${result.id}`}
                          className="flex items-center p-3 hover:bg-gray-100 rounded-lg mb-2"
                          onClick={() => setIsSearchModalOpen(false)}
                        >
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-gray-200 rounded-md flex items-center justify-center text-gray-600 text-xs font-bold mr-3">
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