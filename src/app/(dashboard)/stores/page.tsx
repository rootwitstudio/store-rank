"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Store as StoreIcon,
  Filter,
  Search,
  Grid3X3,
  List,
  SlidersHorizontal,
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
import { StoreCard as SharedStoreCard } from '@/components/ui/StoreCard';
import { useStoresList } from "@/stores/storeDetailsStore";
import FilterPanel from './FilterPanel';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";


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
        {/* <ChevronLeft className="w-4 h-4" /> */}
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
        {/* <ChevronRight className="w-4 h-4" /> */}
      </Button>
    </div>
  );
}

export default function StoresPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryId = searchParams.get("categoryId");
  const categoryNameParam = searchParams.get("categoryName");

  const { storesList, fetchStoresByCategory } = useStoresList();
  const { data: stores, loading, error } = storesList;
  const [categoryName, setCategoryName] = useState("All Categories");

  // Filter states
  const [minRating, setMinRating] = useState(0);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [claimedOnly, setClaimedOnly] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"rating" | "name" | "reviews">("rating");
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    if (categoryId) {
      fetchStoresByCategory(categoryId);
      if (categoryNameParam) {
        setCategoryName(categoryNameParam);
      } else {
        setCategoryName("Category");
      }
    }
  }, [categoryId, categoryNameParam, fetchStoresByCategory]);

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
            <div className="card bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
              <FilterPanel
                minRating={minRating}
                setMinRating={setMinRating}
                verifiedOnly={verifiedOnly}
                setVerifiedOnly={setVerifiedOnly}
                claimedOnly={claimedOnly}
                setClaimedOnly={setClaimedOnly}
                selectedCountry={selectedCountry}
                setSelectedCountry={setSelectedCountry}
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
                allTags={allTags}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filters & Sort Row */}
            <div className="lg:hidden flex gap-3 mb-6">
              <Button
                variant="outline"
                onClick={() => setShowMobileFilters(true)}
                className="flex-1"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <Select value={sortBy} onValueChange={(value: string) => setSortBy(value as any)}>
                <SelectTrigger className="flex-1 bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="rating">Sort by Rating</SelectItem>
                  <SelectItem value="name">Sort by Name</SelectItem>
                  <SelectItem value="reviews">Sort by Reviews</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Mobile Filters Modal */}
            <Dialog open={showMobileFilters} onOpenChange={setShowMobileFilters}>
              <DialogContent className="max-w-full w-full h-full p-0 flex flex-col bg-white">
                <DialogHeader className="p-4 border-b">
                  <DialogTitle>Filters</DialogTitle>
                </DialogHeader>
                <div className="flex-1 overflow-y-auto p-4">
                  <FilterPanel
                    minRating={minRating}
                    setMinRating={setMinRating}
                    verifiedOnly={verifiedOnly}
                    setVerifiedOnly={setVerifiedOnly}
                    claimedOnly={claimedOnly}
                    setClaimedOnly={setClaimedOnly}
                    selectedCountry={selectedCountry}
                    setSelectedCountry={setSelectedCountry}
                    selectedTags={selectedTags}
                    setSelectedTags={setSelectedTags}
                    allTags={allTags}
                  />
                </div>
                <DialogFooter className="p-4 border-t flex justify-end gap-2">
                  <DialogClose asChild>
                    <Button variant="outline">Close</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Results Header + Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
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
              <div className="flex items-center gap-3 w-full sm:w-auto">
                {/* Sort Dropdown - visible on all screens, but styled for desktop */}
                <Select value={sortBy} onValueChange={(value: string) => setSortBy(value as any)}>
                  <SelectTrigger className="bg-white min-w-[160px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="rating">Sort by Rating</SelectItem>
                    <SelectItem value="name">Sort by Name</SelectItem>
                    <SelectItem value="reviews">Sort by Reviews</SelectItem>
                  </SelectContent>
                </Select>
                {/* Grid/List Toggle - only on md+ */}
                <div className="hidden md:flex bg-gray-100 rounded-lg p-1">
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
                    ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6"
                    : "space-y-6"
                }>
                  {paginatedStores.map((store) => (
                    <SharedStoreCard
                      key={store.id}
                      id={store.id}
                      name={store.name}
                      description={store.description}
                      category={store.country || store.category || ''}
                      rating={store.rating}
                      reviewCount={store.totalRatings || store.reviewCount || 0}
                      trustScore={store.trustScore || ''}
                      link={store.website || ''}
                      isVerified={store.verified}
                      isClaimed={store.claimed}
                      getTrustScoreColor={() => ''} // You may want to pass the actual function if available
                      avatarGradient="from-blue-100 to-purple-100 text-blue-600"
                      showFullLink={true}
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
