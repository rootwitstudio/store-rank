"use client";

import { Info } from "lucide-react";
import { useEffect } from "react";
import { useStoresByCategory } from "@/stores/storesStore";
import { useSearchParams, useParams } from "next/navigation";
import { useActiveFilters } from "./useActiveFilters";

interface FilterPanelProps {
  className?: string;
}

export default function FilterPanel({ className = "" }: FilterPanelProps) {
  const searchParams = useSearchParams();
  const params = useParams();
  const categoryId = searchParams.get("categoryId");
  const categorySlug = searchParams.get("categorySlug") || (params.slug as string);
  
  const { storesByCategory, filterStores } = useStoresByCategory();
  const { data: stores, loading } = storesByCategory;

  // Filter states - managed by shared hook
  const {
    minRating,
    verifiedOnly,
    claimedOnly,
    selectedTags,
    setMinRating,
    setVerifiedOnly,
    setClaimedOnly,
    setSelectedTags,
    clearAllFilters,
    initializeFromUrl
  } = useActiveFilters();

  // Initialize filters from URL on component mount
  useEffect(() => {
    initializeFromUrl();
  }, [initializeFromUrl]);

  // Get unique tags from current stores
  const allTags = Array.from(new Set(
    Array.isArray(stores) 
      ? stores.filter(store => store && Array.isArray(store.tags)).flatMap(store => store.tags)
      : []
  ));

  // Trigger API call when filters change
  useEffect(() => {
    const filters = {
      categorySlug: categorySlug || undefined,
      category: categoryId || undefined,
      includeSub: true,
      claimed: claimedOnly || undefined,
      verified: verifiedOnly || undefined,
      minRating: minRating > 0 ? minRating : undefined,
      page: 1,
      pageSize: 12,
    };

    // Only call API if we have a categorySlug or categoryId
    if (categorySlug || categoryId) {
      console.log('FilterPanel: Calling API with filters:', filters);
      filterStores(filters);
    }
  }, [minRating, verifiedOnly, claimedOnly, selectedTags, categorySlug, categoryId, filterStores]);

  // Log current filter state for debugging
  useEffect(() => {
    console.log('FilterPanel: Current filter state:', {
      minRating,
      verifiedOnly,
      claimedOnly,
      selectedTags,
      categorySlug,
      categoryId
    });
    console.log('FilterPanel: Current URL:', window.location.href);
  }, [minRating, verifiedOnly, claimedOnly, selectedTags, categorySlug, categoryId]);

  return (
    <div className={`space-y-6 ${className} ${loading ? 'opacity-60 pointer-events-none' : ''}`}>
      {/* Loading indicator */}
      {loading && (
        <div className="text-center py-2">
          <div className="inline-flex items-center gap-2 text-sm text-gray-600">
            <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            Applying filters...
          </div>
        </div>
      )}
      
      {/* Rating Filter */}
      <div>
        <h3 className="text-base font-semibold mb-2">Rating</h3>
        <div className="flex border border-gray-300 rounded-md overflow-hidden">
          {[0, 3, 4, 4.5].map((r) => (
            <button
              key={r}
              className={`flex-1 text-center py-2 text-sm font-medium ${
                minRating === r
                  ? "bg-blue-100 text-blue-700 border-blue-600"
                  : "bg-white text-gray-700 border-r border-gray-300"
              }`}
              onClick={() => setMinRating(r)}
            >
              {r === 0 ? "Any" : `★ ${r}+`}
            </button>
          ))}
        </div>
      </div>

      {/* Company Status Filter */}
      <div>
        <h3 className="text-base font-semibold mb-2">Company Status</h3>
        <div className="space-y-2">
          <label className="flex items-center justify-between text-sm text-gray-700">
            <span className="flex items-center gap-1">
              Verified <Info className="h-3 w-3 text-gray-400" />
            </span>
            <input
              type="checkbox"
              checked={verifiedOnly}
              onChange={(e) => setVerifiedOnly(e.target.checked)}
              className="accent-blue-600"
            />
          </label>
          <label className="flex items-center justify-between text-sm text-gray-700">
            <span className="flex items-center gap-1">
              Claimed <Info className="h-3 w-3 text-gray-400" />
            </span>
            <input
              type="checkbox"
              checked={claimedOnly}
              onChange={(e) => setClaimedOnly(e.target.checked)}
              className="accent-blue-600"
            />
          </label>
        </div>
      </div>

      {/* Tags Filter */}
      <div>
        <h3 className="text-base font-semibold mb-2">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <label
              key={tag}
              className="flex items-center gap-1 text-xs border border-gray-300 rounded-md px-2 py-1 bg-white text-gray-700"
            >
              <input
                type="checkbox"
                checked={selectedTags.includes(tag)}
                onChange={(e) =>
                  setSelectedTags(
                    e.target.checked
                      ? [...selectedTags, tag]
                      : selectedTags.filter((t: string) => t !== tag)
                  )
                }
                className="accent-blue-600"
              />
              {tag}
            </label>
          ))}
        </div>
      </div>

      {/* Clear Filters Button */}
      <div>
        <button
          onClick={clearAllFilters}
          disabled={loading}
          className="w-full py-2 px-4 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );
}
