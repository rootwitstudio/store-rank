"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Store as StoreIcon,
  Filter,
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
import ActiveFilters from '../../ActiveFilters';
import FilterUrlSync from '../../FilterUrlSync';
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

  const [includeSub] = useState(true);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

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

        // Fetch stores by category slug using the store with filters
        await fetchStoresByCategorySlug(slug, {
          includeSub,
          claimed: claimedOnly || undefined,
          verified: verifiedOnly || undefined,
          minRating: minRating > 0 ? minRating : undefined,
          sortBy: sortBy,
          sortOrder: 'desc', // Always sort in descending order for better UX
          page: currentPage,
          pageSize: 12
        });

      } catch (err) {
        setCategoryError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setCategoryLoading(false);
        setIsInitialLoad(false);
      }
    };

    fetchData();
  }, [slug, includeSub, currentPage, fetchStoresByCategorySlug, minRating, verifiedOnly, claimedOnly, sortBy]);

  // Apply client-side filters (only for country and tags since these aren't supported by the API yet)
  // Note: Sorting and rating/verification filters are now handled by the API
  const filteredStores = stores.filter(
    (s) =>
      (selectedCountry === "all" || (s.country && s.country === selectedCountry)) &&
      (selectedTags.length === 0 ||
        selectedTags.every((tag) => s.tags.includes(tag)))
  );



  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [minRating, verifiedOnly, claimedOnly, selectedCountry, selectedTags, sortBy]);

  // Only show full page loader on initial load (when we don't have category data yet)
  if (categoryLoading && !categoryHierarchy) {
    return (
      <div className="bg-gray-50 min-h-screen flex flex-col">
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-blue-600" />
              <p className="text-gray-600">Loading category...</p>
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
      <FilterUrlSync />
      {/* Category Header - Similar to Custom Category Page */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-8 md:py-12">
        <div className="container mx-auto px-4">
          <Breadcrumbs breadcrumbs={categoryHierarchy.breadcrumbs} />
          
          <div className="flex items-center gap-4 mb-6 mt-4">
            <div className="p-3 md:p-4 rounded-xl bg-blue-600">
              <StoreIcon className="h-6 w-6 md:h-8 md:w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                {categoryHierarchy.category.name}
              </h1>
              {categoryHierarchy.category.description && (
                <p className="text-gray-600 text-sm md:text-lg max-w-3xl">
                  {categoryHierarchy.category.description}
                </p>
              )}
            </div>
          </div>
          
          {/* <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {pagination.total} stores found
            </div>
          </div> */}
        </div>
      </section>

      <main className="flex-1 container mx-auto px-4 py-3 md:py-4">
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
          {/* Sidebar Filters - Desktop */}
          <div className="hidden lg:block w-72">
            <div className="card bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-6">
              <FilterPanel 
                loading={loading}
                onFiltersChange={(filters) => {
                  setMinRating(filters.minRating);
                  setVerifiedOnly(filters.verifiedOnly);
                  setClaimedOnly(filters.claimedOnly);
                }}
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
              <Select value={sortBy} onValueChange={(value) => setSortBy(value as "rating" | "name" | "reviews")} disabled={loading}>
                <SelectTrigger className={`flex-1 bg-white ${loading ? 'opacity-75' : ''}`}>
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
                    loading={loading}
                    onFiltersChange={(filters) => {
                      setMinRating(filters.minRating);
                      setVerifiedOnly(filters.verifiedOnly);
                      setClaimedOnly(filters.claimedOnly);
                    }}
                  />
                </div>
                <DialogFooter className="p-4 border-t flex justify-end gap-2">
                  <DialogClose asChild>
                    <Button variant="outline">Close</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>



            {/* Active Filters */}
            <ActiveFilters />

            {/* Results Header + Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {pagination.total} Store{pagination.total !== 1 ? 's' : ''} Found
                </h2>
                {(minRating > 0 || verifiedOnly || claimedOnly) && (
                  <p className="text-sm text-gray-600 mt-1">
                    Showing filtered results
                  </p>
                )}
              </div>
              <div className="hidden lg:flex items-center gap-3 w-full sm:w-auto">
                {/* Sort Dropdown - only on lg+ */}
                <Select value={sortBy} onValueChange={(value) => setSortBy(value as "rating" | "name" | "reviews")} disabled={loading}>
                  <SelectTrigger className={`bg-white min-w-[160px] ${loading ? 'opacity-75' : ''}`}>
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

            {/* Stores Grid/List with Loading Overlay */}
            <div className="relative">
              {/* Loading Overlay - only show when there are existing stores */}
              {loading && stores.length > 0 && (
                <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-10 flex items-start justify-center pt-8">
                  <div className="bg-white rounded-lg shadow-lg px-6 py-4 flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-sm font-medium text-gray-700">Updating results...</span>
                  </div>
                </div>
              )}

              {stores.length === 0 && !loading && !isInitialLoad ? (
                <div className="text-center py-12">
                  <StoreIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No Stores Found</h3>
                  <p className="text-gray-600 mb-4">
                    {minRating > 0 || verifiedOnly || claimedOnly 
                      ? "Try adjusting your filters" 
                      : "No stores available in this category"}
                  </p>
                  {(minRating > 0 || verifiedOnly || claimedOnly) && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setMinRating(0);
                        setVerifiedOnly(false);
                        setClaimedOnly(false);
                        setSelectedCountry("all");
                        setSelectedTags([]);
                        setCurrentPage(1);
                      }}
                    >
                      Clear Filters
                    </Button>
                  )}
                </div>
              ) : stores.length === 0 && (loading || isInitialLoad) ? (
                <div className="text-center py-12">
                  <div className="w-12 h-12 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading stores...</p>
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
        </div>
      </main>
    </div>
  );
}