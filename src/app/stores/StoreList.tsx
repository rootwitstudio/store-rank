"use client";
import { useState } from "react";
import { Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Filter, ArrowUpDown, X, Search, Info } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/header";
import FilterPanel from "./FilterPanel";

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

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  return (
    <span className="flex items-center gap-0.5">
      {[...Array(fullStars)].map((_, i) => (
        <svg
          key={i}
          className="w-4 h-4 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
        </svg>
      ))}
      {halfStar && (
        <svg
          className="w-4 h-4 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <defs>
            <linearGradient id="half">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path
            fill="url(#half)"
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z"
          />
        </svg>
      )}
    </span>
  );
}

interface Store {
  name: string;
  desc: string;
  tags: string[];
  category: string;
  logo: string | null;
  rating: number;
  score: number;
  verified: boolean;
  claimed: boolean;
  country: string;
  link: string;
}

interface Props {
  category: string;
  stores: Store[];
}

export default function StoreList({ category, stores }: Props) {
  const [showFilters, setShowFilters] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [claimedOnly, setClaimedOnly] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"rating" | "name">("rating");
  const [showSortModal, setShowSortModal] = useState(false);
  const [search, setSearch] = useState("");

  let filteredStores = stores.filter(
    (s) =>
      s.rating >= minRating &&
      (!verifiedOnly || s.verified) &&
      (!claimedOnly || s.claimed) &&
      (selectedCountry === "all" || s.country === selectedCountry) &&
      (selectedTags.length === 0 ||
        selectedTags.every((tag) => s.tags.includes(tag)))
  );

  if (sortBy === "rating") {
    filteredStores = filteredStores.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === "name") {
    filteredStores = filteredStores.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  const sortedStores = filteredStores.filter(
    (store) =>
      store.name.toLowerCase().includes(search.toLowerCase()) ||
      store.desc.toLowerCase().includes(search.toLowerCase()) ||
      store.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="container mx-auto px-4 py-8 lg:flex lg:space-x-6">
      {/* Mobile Filter and Sort Buttons */}
      <div className="lg:hidden flex gap-4 mb-6">
        {/* Mobile Filter Button */}
        <Button
          variant="outline"
          className="flex-1 flex items-center justify-center gap-2"
          onClick={() => setShowFilters(true)}
        >
          <Filter className="h-4 w-4" />
          Filter by
        </Button>

        {/* Mobile Sort Button */}
        <Button
          variant="outline"
          className="flex-1 flex items-center justify-center gap-2"
          onClick={() => setShowSortModal(true)}
        >
          <ArrowUpDown className="h-4 w-4" />
          Sort by
        </Button>
      </div>

      {/* Mobile Filter Modal */}
      {showFilters && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
          <div className="bg-white h-full w-full max-w-sm ml-auto p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Filters</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFilters(false)}
              >
                Close
              </Button>
            </div>
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
              subcategories={[]}
            />
          </div>
        </div>
      )}

      {/* Desktop Filter Panel */}
      <div className="hidden lg:block w-72 space-y-6 p-6 rounded-lg shadow-sm bg-white border">
        <h2 className="text-lg font-semibold">Filters</h2>
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
          subcategories={[]}
        />
      </div>

      {/* Main content area (Search, Sort, and Stores Grid) */}
      <div className="flex-1 space-y-6">
        {/* Search and Sort Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          <div className="flex-1 relative w-full">
            <Input
              type="text"
              placeholder="Search stores..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>
          {/* Desktop Sort Dropdown */}
          <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
            <span className="text-sm font-medium text-gray-700">Sort By:</span>
            <Select
              value={sortBy}
              onValueChange={(value: "rating" | "name") => setSortBy(value)}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Stores Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedStores.map((store, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <div className="flex items-start mb-4">
                <div className="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center text-gray-600 font-bold text-sm mr-4">
                  {store.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">{store.name}</h3>
                  <p className="text-sm text-gray-600">{store.desc}</p>
                </div>
              </div>
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(store.rating)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-700">
                  {store.rating}
                </span>
                {store.verified && (
                  <span className="ml-4 px-2 py-0.5 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    Verified
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {store.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={store.link}
                className="text-blue-600 hover:underline text-sm flex items-center"
              >
                Visit Store
                <Store className="ml-1 h-4 w-4" />
              </a>
            </div>
          ))}
        </div>

        {/* Mobile Sort Modal */}
        {showSortModal && (
          <div className="fixed inset-0 z-50 bg-white md:hidden flex flex-col">
            {/* Sort Modal Header, Body, and Footer */}
            <div className="flex items-center justify-between p-4 border-b">
              <button className="text-blue-600 text-sm font-medium">
                Clear all
              </button>
              <h2 className="text-lg font-semibold">Sort By</h2>
              <button
                onClick={() => {
                  setSortBy(sortBy === "rating" ? "name" : "rating");
                  setShowSortModal(false);
                }}
                className="p-1 rounded-md hover:bg-gray-100"
              >
                <X className="h-5 w-5 text-gray-700" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {/* Sort controls */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 sr-only">
                  Sort By
                </label>
                <Select
                  value={sortBy === "rating" ? "rating" : "name"}
                  onValueChange={(value: "rating" | "name") => {
                    setSortBy(value);
                    setShowSortModal(false);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {/* Sort modal does not need an Apply button as sorting is immediate */}
          </div>
        )}
      </div>
    </div>
  );
}
