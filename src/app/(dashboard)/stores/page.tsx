"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Store as StoreIcon,
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
  ChevronRight,
  Globe,
  Loader2,
  AlertTriangle
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
import { useStoresList } from "@/stores/storeDetailsStore";
import Link from "next/link";

function getDomain(url: string) {
  try {
    const parsed = new URL(url.startsWith('http') ? url : `https://${url}`);
    return parsed.hostname.replace('www.', '');
  } catch {
    return url;
  }
}

function ensureHttps(url: string) {
  if (!url) return url;
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  return `https://${url}`;
}

function StarRating({ rating, totalRating }: { rating: number; totalRating: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
            }`}
          />
        ))}
      </div>
      <span className="text-sm font-medium">{rating.toFixed(1)}</span>
      <span className="text-sm text-gray-500">({totalRating.toLocaleString()})</span>
    </div>
  );
}

function StoreCard({ store, viewMode }: { store: any; viewMode: 'grid' | 'list' }) {
  if (viewMode === 'list') {
    return (
      <Card className="hover:shadow-lg transition-all duration-300 border border-gray-200">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                {store.logo ? (
                  <img
                    src={store.logo}
                    alt={`${store.name} logo`}
                    className="w-16 h-16 object-contain rounded-lg"
                  />
                ) : (
                  <span className="text-xl font-bold text-blue-600">
                    {store.name.charAt(0)}
                  </span>
                )}
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold text-gray-900 truncate">
                        {store.name}
                      </h3>
                      {store.verified && (
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      )}
                      {store.claimed && (
                        <Shield className="w-5 h-5 text-blue-500 flex-shrink-0" />
                      )}
                    </div>
                  </div>

                  <p className="text-gray-600 mb-3 line-clamp-2">{store.description}</p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {store.tags.slice(0, 3).map((tag: string) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {store.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{store.tags.length - 3}
                      </Badge>
                    )}
                  </div>

                  <StarRating rating={store.rating} totalRating={store.totalRatings} />
                </div>

                <div className="flex flex-col sm:items-end gap-3">
                                     <div className="flex items-center text-sm text-gray-500">
                     <MapPin className="w-4 h-4 mr-1" />
                     {store.country || 'Unknown'}
                   </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <Link href={`/stores/${store.id}`}>
                      <Button variant="outline" size="sm" className="w-full sm:w-auto">
                        View Details
                      </Button>
                    </Link>
                                         <Button asChild size="sm" className="w-full sm:w-auto">
                       <a href={ensureHttps(store.website)} target="_blank" rel="noopener noreferrer">
                         <ExternalLink className="w-4 h-4 mr-1" />
                         Visit Site
                       </a>
                     </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="hover:shadow-lg transition-all duration-300 border border-gray-200 h-full">
      <CardContent className="p-6 h-full flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
              {store.logo ? (
                <img
                  src={store.logo}
                  alt={`${store.name} logo`}
                  className="w-10 h-10 object-contain rounded"
                />
              ) : (
                <span className="text-lg font-bold text-blue-600">
                  {store.name.charAt(0)}
                </span>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-bold text-gray-900 truncate">{store.name}</h3>
              <div className="flex items-center gap-1 mt-1">
                {store.verified && (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                )}
                {store.claimed && (
                  <Shield className="w-4 h-4 text-blue-500" />
                )}
              </div>
            </div>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
          {store.description}
        </p>

        <div className="flex flex-wrap gap-1 mb-4">
          {store.tags.slice(0, 2).map((tag: string) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {store.tags.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{store.tags.length - 2}
            </Badge>
          )}
        </div>

        <div className="space-y-3 mt-auto">
          <StarRating rating={store.rating} totalRating={store.totalRatings} />

                     <div className="flex items-center text-sm text-gray-500">
             <MapPin className="w-4 h-4 mr-1" />
             {store.country || 'Unknown'}
           </div>

          <div className="flex gap-2">
            <Link href={`/stores/${store.id}`} className="flex-1">
              <Button variant="outline" size="sm" className="w-full text-xs">
                Details
              </Button>
            </Link>
                         <Button asChild size="sm" className="flex-1 text-xs">
               <a href={ensureHttps(store.website)} target="_blank" rel="noopener noreferrer">
                 Visit
                 <ExternalLink className="w-3 h-3 ml-1" />
               </a>
             </Button>
          </div>
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
        <ChevronLeft className="w-4 h-4" />
      </Button>

      {getVisiblePages().map((page, index) => (
        <Button
          key={index}
          variant={page === currentPage ? "default" : "outline"}
          size="sm"
          onClick={() => typeof page === 'number' && onPageChange(page)}
          disabled={typeof page !== 'number'}
          className="min-w-[40px]"
        >
          {page}
        </Button>
      ))}

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
}

export default function StoresPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryId = searchParams.get("categoryId");

  const { storesList, fetchStoresByCategory } = useStoresList();
  const { data: stores, loading, error } = storesList;
  const [categoryName, setCategoryName] = useState("All Categories");

  // Filter states
  const [showFilters, setShowFilters] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [claimedOnly, setClaimedOnly] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"rating" | "name" | "reviews">("rating");
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    if (categoryId) {
      fetchStoresByCategory(categoryId);
      setCategoryName("Category Stores"); // We can update this when we have category details
    }
  }, [categoryId, fetchStoresByCategory]);

  // Apply filters
  let filteredStores = stores.filter(
    (s) =>
      s.rating >= minRating &&
      (!verifiedOnly || s.verified) &&
      (!claimedOnly || s.claimed) &&
      (selectedCountry === "all" || (s.country && s.country === selectedCountry)) &&
      (selectedTags.length === 0 ||
        selectedTags.every((tag) => s.tags.includes(tag))) &&
      (search === "" ||
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.description.toLowerCase().includes(search.toLowerCase()) ||
        s.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase())))
  );

  // Apply sorting
  if (sortBy === "rating") {
    filteredStores = filteredStores.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === "name") {
    filteredStores = filteredStores.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "reviews") {
    filteredStores = filteredStores.sort((a, b) => b.totalRatings - a.totalRatings);
  }

  // Pagination logic
  const totalPages = Math.ceil(filteredStores.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedStores = filteredStores.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [minRating, verifiedOnly, claimedOnly, selectedCountry, selectedTags, search, sortBy]);

  // Get unique countries from stores
  const countries = Array.from(new Set(stores.map(store => store.country).filter((country): country is string => Boolean(country))));

  // Get unique tags from stores
  const allTags = Array.from(new Set(stores.flatMap(store => store.tags)));

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen flex flex-col">
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-blue-600" />
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
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-red-500" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Stores</h2>
              <p className="text-gray-600 mb-4">{error}</p>
              <Button onClick={() => categoryId && fetchStoresByCategory(categoryId)}>
                Try Again
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!categoryId) {
    return (
      <div className="bg-gray-50 min-h-screen flex flex-col">
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <StoreIcon className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">No Category Selected</h2>
              <p className="text-gray-600 mb-4">Please select a category to view stores.</p>
              <Button onClick={() => router.push('/')}>
                Go to Homepage
              </Button>
            </div>
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
          <div className="hidden lg:block w-80">
            <Card>
              <CardContent className="p-6">
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
                {countries.length > 0 && (
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
                )}

                {/* Verification Filters */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Verification</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="verified"
                        checked={verifiedOnly}
                        onChange={(e) => setVerifiedOnly(e.target.checked)}
                        className="rounded border-gray-300"
                      />
                      <label htmlFor="verified" className="text-sm">Verified Only</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="claimed"
                        checked={claimedOnly}
                        onChange={(e) => setClaimedOnly(e.target.checked)}
                        className="rounded border-gray-300"
                      />
                      <label htmlFor="claimed" className="text-sm">Claimed Only</label>
                    </div>
                  </div>
                </div>

                {/* Tags Filter */}
                {allTags.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Tags</h4>
                    <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                      {allTags.slice(0, 10).map((tag) => (
                        <Button
                          key={tag}
                          variant={selectedTags.includes(tag) ? "default" : "outline"}
                          size="sm"
                          onClick={() => {
                            setSelectedTags(prev =>
                              prev.includes(tag)
                                ? prev.filter(t => t !== tag)
                                : [...prev, tag]
                            );
                          }}
                          className="text-xs"
                        >
                          {tag}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filters Toggle */}
            <div className="lg:hidden mb-6">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="w-full"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters & Sort
              </Button>
            </div>

            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {filteredStores.length} Store{filteredStores.length !== 1 ? 's' : ''} Found
                </h2>
                {search && (
                  <p className="text-sm text-gray-600 mt-1">
                    Searching for "{search}"
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3">
                {/* Sort */}
                <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Sort by Rating</SelectItem>
                    <SelectItem value="name">Sort by Name</SelectItem>
                    <SelectItem value="reviews">Sort by Reviews</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Toggle */}
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="h-8 w-8 p-0"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="h-8 w-8 p-0"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Stores Grid/List */}
            {paginatedStores.length === 0 ? (
              <div className="text-center py-12">
                <StoreIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Stores Found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters or search terms
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearch("");
                    setMinRating(0);
                    setVerifiedOnly(false);
                    setClaimedOnly(false);
                    setSelectedCountry("all");
                    setSelectedTags([]);
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <>
                <div className={
                  viewMode === 'grid'
                    ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                    : "space-y-6"
                }>
                  {paginatedStores.map((store) => (
                    <StoreCard
                      key={store.id}
                      store={store}
                      viewMode={viewMode}
                    />
                  ))}
                </div>

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
