"use client";

import { useState, useEffect } from "react";
import { Info } from "lucide-react";

interface CustomCategoryFilterPanelProps {
  onFiltersChange: (filters: CustomCategoryFilters) => void;
  categorySlug: string;
  isCustomCategory?: boolean;
}

interface CustomCategoryFilters {
  minRating: number;
  verifiedOnly: boolean;
  claimedOnly: boolean;
  sortBy: 'rating' | 'reviews' | 'name' | 'newest';
  sortOrder: 'asc' | 'desc';
}

export function CustomCategoryFilterPanel({ 
  onFiltersChange, 
  categorySlug, 
  isCustomCategory = false 
}: CustomCategoryFilterPanelProps) {
  const [filters, setFilters] = useState<CustomCategoryFilters>({
    minRating: 0,
    verifiedOnly: false,
    claimedOnly: false,
    sortBy: 'rating',
    sortOrder: 'desc'
  });

  const [loading, setLoading] = useState(false);

  // Update parent component when filters change
  useEffect(() => {
    setLoading(true);
    onFiltersChange(filters);
    
    // Simulate API delay
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, [filters, onFiltersChange]);

  const updateFilter = (key: keyof CustomCategoryFilters, value: string | number | boolean) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearAllFilters = () => {
    setFilters({
      minRating: 0,
      verifiedOnly: false,
      claimedOnly: false,
      sortBy: 'rating',
      sortOrder: 'desc'
    });
  };

  return (
    <div className={`space-y-6 ${loading ? 'opacity-60 pointer-events-none' : ''}`}>
      {/* Loading indicator */}
      {loading && (
        <div className="text-center py-2">
          <div className="inline-flex items-center gap-2 text-sm text-gray-600">
            <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            Applying filters...
          </div>
        </div>
      )}

      {/* Custom Category Info */}
      {isCustomCategory && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-medium text-blue-900 mb-1">Custom Category</h4>
              <p className="text-xs text-blue-700">
                This category uses dynamic rules to show stores. Filters are applied on top of the category rules.
              </p>
            </div>
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
                filters.minRating === r
                  ? "bg-blue-100 text-blue-700 border-blue-600"
                  : "bg-white text-gray-700 border-r border-gray-300"
              }`}
              onClick={() => updateFilter('minRating', r)}
            >
              {r === 0 ? "Any" : `★ ${r}+`}
            </button>
          ))}
        </div>
      </div>

      {/* Sort Options */}
      <div>
        <h3 className="text-base font-semibold mb-2">Sort By</h3>
        <div className="space-y-2">
          <label className="flex items-center justify-between text-sm text-gray-700">
            <span>Rating</span>
            <input
              type="radio"
              name="sortBy"
              value="rating"
              checked={filters.sortBy === 'rating'}
              onChange={(e) => updateFilter('sortBy', e.target.value)}
              className="accent-blue-600"
            />
          </label>
          <label className="flex items-center justify-between text-sm text-gray-700">
            <span>Most Reviews</span>
            <input
              type="radio"
              name="sortBy"
              value="reviews"
              checked={filters.sortBy === 'reviews'}
              onChange={(e) => updateFilter('sortBy', e.target.value)}
              className="accent-blue-600"
            />
          </label>
          <label className="flex items-center justify-between text-sm text-gray-700">
            <span>Name</span>
            <input
              type="radio"
              name="sortBy"
              value="name"
              checked={filters.sortBy === 'name'}
              onChange={(e) => updateFilter('sortBy', e.target.value)}
              className="accent-blue-600"
            />
          </label>
          <label className="flex items-center justify-between text-sm text-gray-700">
            <span>Newest</span>
            <input
              type="radio"
              name="sortBy"
              value="newest"
              checked={filters.sortBy === 'newest'}
              onChange={(e) => updateFilter('sortBy', e.target.value)}
              className="accent-blue-600"
            />
          </label>
        </div>
      </div>

      {/* Sort Order */}
      <div>
        <h3 className="text-base font-semibold mb-2">Sort Order</h3>
        <div className="space-y-2">
          <label className="flex items-center justify-between text-sm text-gray-700">
            <span>Highest First</span>
            <input
              type="radio"
              name="sortOrder"
              value="desc"
              checked={filters.sortOrder === 'desc'}
              onChange={(e) => updateFilter('sortOrder', e.target.value)}
              className="accent-blue-600"
            />
          </label>
          <label className="flex items-center justify-between text-sm text-gray-700">
            <span>Lowest First</span>
            <input
              type="radio"
              name="sortOrder"
              value="asc"
              checked={filters.sortOrder === 'asc'}
              onChange={(e) => updateFilter('sortOrder', e.target.value)}
              className="accent-blue-600"
            />
          </label>
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
              checked={filters.verifiedOnly}
              onChange={(e) => updateFilter('verifiedOnly', e.target.checked)}
              className="accent-blue-600"
            />
          </label>
          <label className="flex items-center justify-between text-sm text-gray-700">
            <span className="flex items-center gap-1">
              Claimed <Info className="h-3 w-3 text-gray-400" />
            </span>
            <input
              type="checkbox"
              checked={filters.claimedOnly}
              onChange={(e) => updateFilter('claimedOnly', e.target.checked)}
              className="accent-blue-600"
            />
          </label>
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