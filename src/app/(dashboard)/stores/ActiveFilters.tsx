"use client";

import { X } from "lucide-react";
import { useActiveFilters } from "./useActiveFilters";

export default function ActiveFilters() {
  const {
    minRating,
    verifiedOnly,
    claimedOnly,
    selectedTags,
    setMinRating,
    setVerifiedOnly,
    setClaimedOnly,
    setSelectedTags,
    clearAllFilters
  } = useActiveFilters();

  const hasActiveFilters = minRating > 0 || verifiedOnly || claimedOnly || selectedTags.length > 0;

  if (!hasActiveFilters) {
    return null;
  }

  const removeTag = (tagToRemove: string) => {
    setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
      {/* Header - Mobile Optimized */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-blue-900 flex items-center gap-2">
          <span className="hidden sm:inline">Active Filters</span>
          <span className="sm:hidden">Filters</span>
          <span className="bg-blue-200 text-blue-800 text-xs px-2 py-0.5 rounded-full">
            {[minRating > 0, verifiedOnly, claimedOnly, ...selectedTags].filter(Boolean).length}
          </span>
        </h3>
        <button
          onClick={clearAllFilters}
          className="text-xs text-blue-700 hover:text-blue-900 underline sm:text-sm"
        >
          Clear All
        </button>
      </div>
      
      {/* Mobile: Horizontal scroll for filters */}
      <div className="sm:hidden">
        <div className="relative">
          <div className="flex gap-2 overflow-x-auto pb-2 [-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none]">
          {/* Rating Filter */}
          {minRating > 0 && (
            <div className="inline-flex items-center gap-1 bg-white border border-blue-300 rounded-full px-3 py-1.5 text-xs font-medium text-blue-800 whitespace-nowrap">
              <span>★ {minRating}+</span>
              <button
                onClick={() => setMinRating(0)}
                className="ml-1 hover:bg-blue-100 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}

          {/* Verified Filter */}
          {verifiedOnly && (
            <div className="inline-flex items-center gap-1 bg-white border border-blue-300 rounded-full px-3 py-1.5 text-xs font-medium text-blue-800 whitespace-nowrap">
              <span>Verified</span>
              <button
                onClick={() => setVerifiedOnly(false)}
                className="ml-1 hover:bg-blue-100 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}

          {/* Claimed Filter */}
          {claimedOnly && (
            <div className="inline-flex items-center gap-1 bg-white border border-blue-300 rounded-full px-3 py-1.5 text-xs font-medium text-blue-800 whitespace-nowrap">
              <span>Claimed</span>
              <button
                onClick={() => setClaimedOnly(false)}
                className="ml-1 hover:bg-blue-100 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}

          {/* Tags Filters */}
          {selectedTags.map((tag) => (
            <div
              key={tag}
              className="inline-flex items-center gap-1 bg-white border border-blue-300 rounded-full px-3 py-1.5 text-xs font-medium text-blue-800 whitespace-nowrap"
            >
              <span>{tag}</span>
              <button
                onClick={() => removeTag(tag)}
                className="ml-1 hover:bg-blue-100 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
          </div>
          {/* Scroll indicator for mobile */}
          <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-blue-50 to-transparent pointer-events-none"></div>
        </div>
      </div>

      {/* Desktop: Wrap layout */}
      <div className="hidden sm:flex sm:flex-wrap sm:gap-2">
        {/* Rating Filter */}
        {minRating > 0 && (
          <div className="inline-flex items-center gap-1 bg-white border border-blue-300 rounded-full px-3 py-1 text-xs font-medium text-blue-800">
            <span>Rating: {minRating}+ stars</span>
            <button
              onClick={() => setMinRating(0)}
              className="ml-1 hover:bg-blue-100 rounded-full p-0.5"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        {/* Verified Filter */}
        {verifiedOnly && (
          <div className="inline-flex items-center gap-1 bg-white border border-blue-300 rounded-full px-3 py-1 text-xs font-medium text-blue-800">
            <span>Verified stores only</span>
            <button
              onClick={() => setVerifiedOnly(false)}
              className="ml-1 hover:bg-blue-100 rounded-full p-0.5"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        {/* Claimed Filter */}
        {claimedOnly && (
          <div className="inline-flex items-center gap-1 bg-white border border-blue-300 rounded-full px-3 py-1 text-xs font-medium text-blue-800">
            <span>Claimed stores only</span>
            <button
              onClick={() => setClaimedOnly(false)}
              className="ml-1 hover:bg-blue-100 rounded-full p-0.5"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        {/* Tags Filters */}
        {selectedTags.map((tag) => (
          <div
            key={tag}
            className="inline-flex items-center gap-1 bg-white border border-blue-300 rounded-full px-3 py-1 text-xs font-medium text-blue-800"
          >
            <span>Tag: {tag}</span>
            <button
              onClick={() => removeTag(tag)}
              className="ml-1 hover:bg-blue-100 rounded-full p-0.5"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
} 