"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Header } from "@/components/header";

import { StoreCard } from "@/components/ui/StoreCard";
import { getCategoryIcon } from "@/lib/categoryIcons";
import { customCategoryApi, CustomCategory } from "@/lib/customCategoryApi";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Grid3X3, List, Store as StoreIcon, ArrowLeft } from "lucide-react";

export default function CustomCategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [customCategory, setCustomCategory] = useState<CustomCategory | null>(null);
  interface Store {
    id: string;
    name: string;
    description: string | null;
    website: string | null;
    rating: number;
    totalRatings: number;
    verified: boolean;
    claimed: boolean;
    storeCategories?: Array<{
      category: {
        name: string;
      };
    }>;
  }
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(12);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<"rating" | "name" | "reviews" | "updatedAt">("rating");

  const getTrustScoreColor = (score: number | string) => {
    const numericScore = typeof score === 'string' ? parseFloat(score) : score;
    if (isNaN(numericScore)) {
      switch (score) {
        case "Excellent": return "text-green-600 bg-green-100";
        case "Great": return "text-blue-600 bg-blue-100";
        case "Good": return "text-yellow-600 bg-yellow-100";
        default: return "text-gray-600 bg-gray-100";
      }
    }
    if (numericScore >= 4.5) return "text-green-600 bg-green-100";
    if (numericScore >= 4.0) return "text-green-500 bg-green-50";
    if (numericScore >= 3.5) return "text-blue-600 bg-blue-100";
    if (numericScore >= 3.0) return "text-blue-500 bg-blue-50";
    if (numericScore >= 2.5) return "text-yellow-600 bg-yellow-100";
    if (numericScore >= 2.0) return "text-yellow-500 bg-yellow-50";
    if (numericScore > 0) return "text-red-600 bg-red-100";
    return "text-gray-600 bg-gray-100";
  };

  // Fetch category and stores
  useEffect(() => {
    const fetchCategoryAndStores = async () => {
      try {
        setLoading(true);
        const categoryData = await customCategoryApi.getBySlug(slug);
        setCustomCategory(categoryData);
        const storesResponse = await customCategoryApi.getStoresBySlug(slug, {
          sortBy: sortBy,
          sortOrder: 'desc',
          page: currentPage,
          pageSize
        });
        setStores(storesResponse.stores);
        setTotal(storesResponse.total);
      } catch (err) {
        console.error("Error fetching custom category:", err);
        setError("Failed to load category");
      } finally {
        setLoading(false);
      }
    };
    if (slug) {
      fetchCategoryAndStores();
    }
  }, [slug, currentPage, sortBy]);

  // Reset to page 1 when sort changes
  const handleSortChange = (newSortBy: "rating" | "name" | "reviews" | "updatedAt") => {
    setSortBy(newSortBy);
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="bg-white min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <div className="container mx-auto px-4 sm:px-6 py-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded mb-4 w-1/3"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-gray-200 rounded-lg h-64"></div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !customCategory) {
    return (
      <div className="bg-white min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <div className="container mx-auto px-4 sm:px-6 py-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Category Not Found</h1>
              <p className="text-gray-600">{error || "The requested category could not be found."}</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const Icon = getCategoryIcon(customCategory.icon || 'Store');
  const totalPages = Math.ceil(total / pageSize);

  // Transform store data to match StoreCard interface
  const transformedStores = stores.map(store => ({
    id: store.id,
    name: store.name,
    description: store.description || 'No description available',
    category: store.storeCategories?.[0]?.category?.name || 'General',
    rating: store.rating,
    reviewCount: store.totalRatings,
    trustScore: store.rating >= 4.5 ? 'Excellent' : store.rating >= 4.0 ? 'Great' : store.rating >= 3.5 ? 'Good' : 'Average',
    link: store.website || '#',
    isVerified: store.verified,
    isClaimed: store.claimed,
    getTrustScoreColor,
    avatarGradient: "from-green-100 to-blue-100 text-green-600",
    monthlyVisitors: undefined
  }));

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Category Header */}
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-12">
          <div className="container mx-auto px-4 sm:px-6">
            {/* Mobile Back Button */}
            <div className="lg:hidden mb-4">
              <Button
                variant="ghost"
                onClick={() => window.history.back()}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <div 
                className="p-4 rounded-xl"
                style={{ backgroundColor: customCategory.color || '#3B82F6' }}
              >
                <Icon className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                  {customCategory.name}
                </h1>
                {customCategory.description && (
                  <p className="text-gray-600 text-lg max-w-3xl">
                    {customCategory.description}
                  </p>
                )}
              </div>
            </div>
            {/* <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                {total} stores found
              </div>
            </div> */}
          </div>
        </section>
        {/* Main Content Section */}
        <section className="py-6 md:py-8">
          <div className="container mx-auto px-4 sm:px-6">
            {/* Mobile Sort Row - Only show on mobile */}
            <div className="lg:hidden mb-6 flex justify-center">
              <Select value={sortBy} onValueChange={(value) => handleSortChange(value as "rating" | "name" | "reviews" | "updatedAt")}> 
                <SelectTrigger className="bg-white min-w-[160px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="rating">Sort by Rating</SelectItem>
                  <SelectItem value="name">Sort by Name</SelectItem>
                  <SelectItem value="reviews">Sort by Reviews</SelectItem>
                  <SelectItem value="updatedAt">Sort by Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {transformedStores.length} Store{transformedStores.length !== 1 ? 's' : ''} Found
                </h2>
              </div>
                              <div className="hidden lg:flex items-center gap-3 w-full sm:w-auto">
                  {/* Sort Dropdown - only on lg+ */}
                 <Select value={sortBy} onValueChange={(value) => handleSortChange(value as "rating" | "name" | "reviews" | "updatedAt")}> 
                  <SelectTrigger className="bg-white min-w-[160px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="rating">Sort by Rating</SelectItem>
                    <SelectItem value="name">Sort by Name</SelectItem>
                    <SelectItem value="reviews">Sort by Reviews</SelectItem>
                    <SelectItem value="updatedAt">Sort by Newest</SelectItem>
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
            {transformedStores.length === 0 ? (
              <div className="text-center py-12">
                <StoreIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Stores Found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your sort option
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSortBy("rating");
                    setCurrentPage(1);
                  }}
                >
                  Reset Sort
                </Button>
              </div>
            ) : (
              <>
                <div className={
                  viewMode === 'grid'
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8"
                    : "space-y-4 md:space-y-6 mb-8"
                }>
                  {transformedStores.map((store) => (
                    <StoreCard key={store.id} {...store} />
                  ))}
                </div>
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </Button>
                      {[...Array(totalPages)].map((_, i) => (
                        <Button
                          key={i + 1}
                          variant={currentPage === i + 1 ? "default" : "outline"}
                          size="sm"
                          onClick={() => handlePageChange(i + 1)}
                          className="min-w-[40px]"
                        >
                          {i + 1}
                        </Button>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>
    </div>
  );
} 