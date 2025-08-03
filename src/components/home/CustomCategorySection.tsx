"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { StoreCard } from "@/components/ui/StoreCard";
import { getCategoryIcon } from "@/lib/categoryIcons";
import { CustomCategory, customCategoryApi } from "@/lib/customCategoryApi";

interface CustomCategorySectionProps {
  customCategory: CustomCategory;
  getTrustScoreColor: (score: number | string) => string;
}

export function CustomCategorySection({ customCategory, getTrustScoreColor }: CustomCategorySectionProps) {
  const [stores, setStores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const Icon = getCategoryIcon(customCategory.icon || 'Store');

  useEffect(() => {
    const fetchStores = async () => {
      try {
        setLoading(true);
        const response = await customCategoryApi.getStoresBySlug(customCategory.slug, {
          page: 1,
          pageSize: 6
        });
        setStores(response.stores);
      } catch (err) {
        console.error("Error fetching stores for custom category:", err);
        setError("Failed to load stores");
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, [customCategory.slug]);

  // Transform store data to match StoreCard interface
  const transformedStores = stores.map(store => ({
    id: store.id,
    name: store.name,
    description: store.description || 'No description available',
    category: store.storeCategories[0]?.category.name || 'General',
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
    <section className="py-12 sm:py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-8 sm:mb-12 gap-4 sm:gap-0">
          <div className="flex items-center gap-3">
            <div 
              className="p-3 rounded-lg"
              style={{ backgroundColor: customCategory.color || '#3B82F6' }}
            >
              <Icon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-gray-900">
                {customCategory.name}
              </h2>
              {customCategory.description && (
                <p className="text-gray-600 text-lg max-w-2xl">
                  {customCategory.description}
                </p>
              )}
            </div>
          </div>
          <Link
            href={`/custom-categories/${customCategory.slug}`}
            className="text-orange-600 hover:text-orange-700 flex items-center text-sm sm:text-base font-medium group whitespace-nowrap self-start sm:self-auto"
          >
            View all
            <svg className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 rounded-lg h-64"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500 text-lg">{error}</p>
          </div>
        ) : transformedStores.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No stores found in this category.</p>
            <p className="text-gray-400 text-sm mt-2">This category uses dynamic rules to fetch stores.</p>
          </div>
        ) : (
          <>
            {/* Mobile: Horizontal scroll */}
            <div className="md:hidden">
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
                {transformedStores.slice(0, 5).map((store) => (
                  <div key={store.id} className="flex-shrink-0 w-[280px]">
                    <StoreCard {...store} />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Desktop: Grid layout */}
            <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {transformedStores.slice(0, 8).map((store) => (
                <StoreCard 
                  key={store.id}
                  {...store}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
} 