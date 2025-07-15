"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Store as StoreIcon,
  Filter,
  Search,
  Grid3X3,
  List,
  Loader2,
  AlertTriangle,
  ChevronRight,
  Home
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
import FilterPanel from '../../FilterPanel';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import Link from "next/link";
import { useStoresByCategorySlug } from "@/stores/storeDetailsStore";
import { categoryApi } from "@/lib/api";



interface BreadcrumbItem {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  children: Category[];
}



interface CategoryHierarchy {
  category: Category;
  breadcrumbs: BreadcrumbItem[];
  subcategories: Category[];
}

function Breadcrumbs({ breadcrumbs }: { breadcrumbs: BreadcrumbItem[] }) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
      <Link href="/stores" className="hover:text-blue-600 transition-colors">
        <Home className="w-4 h-4" />
      </Link>
      {breadcrumbs.map((crumb) => (
        <div key={crumb.id} className="flex items-center space-x-2">
          <ChevronRight className="w-4 h-4 text-gray-400" />
          {crumb.isActive ? (
            <span className="font-medium text-gray-900">{crumb.name}</span>
          ) : (
            <Link 
              href={`/stores/category/${crumb.slug}`}
              className="hover:text-blue-600 transition-colors"
            >
              {crumb.name}
            </Link>
          )}
        </div>
      ))}
    </nav>
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
        Previous
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
        Next
      </Button>
    </div>
  );
}

export default function CategoryStoresPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  // State management
  const { storesByCategorySlug, fetchStoresByCategorySlug } = useStoresByCategorySlug();
  const { data: stores, loading, error, pagination } = storesByCategorySlug;
  
  // Category hierarchy state
  const [categoryHierarchy, setCategoryHierarchy] = useState<CategoryHierarchy | null>(null);
  const [categoryLoading, setCategoryLoading] = useState(true);
  const [categoryError, setCategoryError] = useState<string | null>(null);

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
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [includeSub] = useState(true);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch category hierarchy and stores
  useEffect(() => {
    const fetchData = async () => {
      if (!slug) return;

      setCategoryLoading(true);
      setCategoryError(null);

      try {
        // Fetch category hierarchy with breadcrumbs
        const categoryData = await categoryApi.getHierarchyBySlug(slug);
        if (!categoryData) {
          throw new Error('Category not found');
        }
        setCategoryHierarchy(categoryData);

        // Fetch stores by category slug using the store
        await fetchStoresByCategorySlug(slug, {
          includeSub,
          page: currentPage,
          pageSize: 12
        });

      } catch (err) {
        setCategoryError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setCategoryLoading(false);
      }
    };

    fetchData();
  }, [slug, includeSub, currentPage, fetchStoresByCategorySlug]);

  // Apply client-side filters
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

  // Get unique tags from stores
  const allTags = Array.from(new Set(stores.flatMap(store => store.tags)));

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [minRating, verifiedOnly, claimedOnly, selectedCountry, selectedTags, search, sortBy]);

  if (loading || categoryLoading) {
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

  if (error || categoryError) {
    return (
      <div className="bg-gray-50 min-h-screen flex flex-col">
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-red-500" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Stores</h2>
              <p className="text-gray-600 mb-4">{error || categoryError}</p>
              <Button onClick={() => router.push('/stores')}>
                Go to All Stores
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!categoryHierarchy) {
    return (
      <div className="bg-gray-50 min-h-screen flex flex-col">
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <StoreIcon className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Category Not Found</h2>
              <p className="text-gray-600 mb-4">The category you&apos;re looking for doesn&apos;t exist.</p>
              <Button onClick={() => router.push('/stores')}>
                Go to All Stores
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Hero Section - Compact Banner */}
      <section className="bg-white border-b border-gray-200 py-2 md:py-4">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Breadcrumbs breadcrumbs={categoryHierarchy.breadcrumbs} />
            
            <div className="text-center mb-3 md:mb-4">
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-1 md:mb-2 text-gray-900">
                {categoryHierarchy.category.name} Stores
              </h1>
              {categoryHierarchy.category.description && (
                <p className="text-sm md:text-base text-gray-600 mb-2 md:mb-3">
                  {categoryHierarchy.category.description}
                </p>
              )}
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative mb-3">
              {/* Desktop Search */}
              <div className="hidden md:block">
                <Input
                  type="text"
                  placeholder="Search stores, brands, or categories..."
                  className="w-full h-10 text-sm pl-10 pr-4 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white shadow-sm"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>

              {/* Mobile Search Button */}
              <div className="md:hidden">
                <Button
                  variant="outline"
                  onClick={() => setShowMobileSearch(true)}
                  className="w-full h-10 text-left justify-start text-gray-500 border-2 border-gray-200 rounded-lg"
                >
                  <Search className="h-4 w-4 mr-2" />
                  <span className="text-sm">Search stores...</span>
                </Button>
              </div>
            </div>

            {/* Subcategories - Smaller and under search */}
            {categoryHierarchy.subcategories.length > 0 && (
              <div className="max-w-5xl mx-auto">
                <div className="flex flex-wrap gap-1.5 justify-center">
                  {categoryHierarchy.subcategories.map((subcat) => (
                    <Link
                      key={subcat.id}
                      href={`/stores/category/${subcat.slug}`}
                      className="px-2 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-md transition-colors text-xs font-medium"
                    >
                      {subcat.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <main className="flex-1 container mx-auto px-4 py-3 md:py-4">
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
          {/* Sidebar Filters - Desktop */}
          <div className="hidden lg:block w-72">
            <div className="card bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-6">
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
          <div className="flex-1 min-w-0">
            {/* Mobile Filters & Sort Row */}
            <div className="lg:hidden flex gap-3 mb-4">
              <Button
                variant="outline"
                onClick={() => setShowMobileFilters(true)}
                className="flex-1"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <Select value={sortBy} onValueChange={(value) => setSortBy(value as "rating" | "name" | "reviews")}>
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

            {/* Mobile Search Modal */}
            <Dialog open={showMobileSearch} onOpenChange={setShowMobileSearch}>
              <DialogContent className="max-w-full w-full h-full p-0 flex flex-col bg-white m-0 rounded-none">
                <DialogHeader className="p-4 border-b bg-white">
                  <DialogTitle className="text-lg font-semibold">Search Stores</DialogTitle>
                </DialogHeader>
                <div className="flex-1 p-4 bg-gray-50">
                  <div className="relative mb-4">
                    <Input
                      type="text"
                      placeholder="Search stores, brands, or categories..."
                      className="w-full h-12 text-base pl-12 pr-4 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white shadow-sm"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      autoFocus
                    />
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  </div>
                  
                  {/* Search results preview */}
                  {search && (
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                      <p className="text-sm text-gray-600 mb-2">
                        Searching for &quot;{search}&quot;
                      </p>
                      <p className="text-xs text-gray-500">
                        Tap &quot;Search&quot; to see results
                      </p>
                    </div>
                  )}
                </div>
                <DialogFooter className="p-4 border-t bg-white flex justify-between gap-3">
                  <DialogClose asChild>
                    <Button variant="outline" className="flex-1">Cancel</Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button className="flex-1">Search</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Results Header + Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {filteredStores.length} Store{filteredStores.length !== 1 ? 's' : ''} Found
                </h2>
                {search && (
                  <p className="text-sm text-gray-600 mt-1">
                    Searching for &quot;{search}&quot;
                  </p>
                )}
              </div>
              <div className="hidden lg:flex items-center gap-3 w-full sm:w-auto">
                {/* Sort Dropdown - only on lg+ */}
                <Select value={sortBy} onValueChange={(value) => setSortBy(value as "rating" | "name" | "reviews")}>
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
            {filteredStores.length === 0 ? (
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
                    ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4 md:gap-6"
                    : "space-y-4 md:space-y-6"
                }>
                  {filteredStores.map((store) => (
                    <SharedStoreCard
                      key={store.id}
                      id={store.id}
                      name={store.name}
                      description={store.description}
                      category={store.country || ''}
                      rating={store.rating}
                      reviewCount={store.totalRatings || 0}
                      trustScore={''}
                      link={store.website || ''}
                      isVerified={store.verified}
                      isClaimed={store.claimed}
                      getTrustScoreColor={() => ''}
                      avatarGradient="from-blue-100 to-purple-100 text-blue-600"
                      showFullLink={true}
                    />
                  ))}
                </div>

                <Pagination
                  currentPage={pagination.page}
                  totalPages={pagination.totalPages}
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