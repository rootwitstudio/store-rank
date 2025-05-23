"use client";

import { Info } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const allTags = [
  "Free Shipping",
  "Eco-friendly",
  "Online Only",
  "Local",
  "Discounts",
];

const countries = [
  "United States",
  "United Kingdom",
  "India",
  "Germany",
  "Australia",
];

interface FilterPanelProps {
  minRating: number;
  setMinRating: (rating: number) => void;
  verifiedOnly: boolean;
  setVerifiedOnly: (verified: boolean) => void;
  claimedOnly: boolean;
  setClaimedOnly: (claimed: boolean) => void;
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
  subcategories?: Array<{ id: string; name: string }>;
  className?: string;
}

export default function FilterPanel({
  minRating,
  setMinRating,
  verifiedOnly,
  setVerifiedOnly,
  claimedOnly,
  setClaimedOnly,
  selectedCountry,
  setSelectedCountry,
  selectedTags,
  setSelectedTags,
  subcategories,
  className = "",
}: FilterPanelProps) {
  return (
    <div className={`space-y-6 ${className}`}>
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

      {/* Location Filter */}
      <div>
        <h3 className="text-base font-semibold mb-2">Location</h3>
        <Select value={selectedCountry} onValueChange={setSelectedCountry}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All Countries" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Countries</SelectItem>
            {countries.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
                      : selectedTags.filter((t) => t !== tag)
                  )
                }
                className="accent-blue-600"
              />
              {tag}
            </label>
          ))}
        </div>
      </div>

      {/* Related Categories */}
      {subcategories && (
        <div>
          <h3 className="text-base font-semibold mb-2">Related Categories</h3>
          {subcategories.length > 0 ? (
            <ul>
              {subcategories.map((sub) => (
                <li key={sub.id} className="mb-1">
                  {sub.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 text-sm">No related subcategories.</p>
          )}
        </div>
      )}
    </div>
  );
}
