"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Header } from "@/components/header";
import { Store, Filter, ArrowUpDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import FilterPanel from "./FilterPanel";
import { StoreCard } from "@/components/StoreCard";

// Mock data for stores
const mockStores = [
  {
    id: "1",
    name: "Amazon",
    desc: "World's largest online marketplace with millions of products.",
    tags: ["Free Shipping", "Eco-friendly"],
    categoryId: "111f70a8-f143-4b04-bbf3-309d3abc3184",
    category: "Electronics",
    logo: null,
    rating: 4.5,
    score: 8.7,
    verified: true,
    claimed: true,
    country: "United States",
    link: "https://www.amazon.com",
  },
  {
    id: "2",
    name: "eBay",
    desc: "Global online marketplace for buying and selling goods.",
    tags: ["Discounts", "Online Only"],
    categoryId: "111f70a8-f143-4b04-bbf3-309d3abc3184",
    category: "Electronics",
    logo: null,
    rating: 4.2,
    score: 8.2,
    verified: false,
    claimed: false,
    country: "United Kingdom",
    link: "https://www.ebay.com",
  },
  {
    id: "3",
    name: "Flipkart",
    desc: "India's leading e-commerce marketplace.",
    tags: ["Local"],
    categoryId: "222f70a8-f143-4b04-bbf3-309d3abc3184",
    category: "Home",
    logo: null,
    rating: 4.8,
    score: 9.1,
    verified: true,
    claimed: true,
    country: "India",
    link: "https://www.flipkart.com",
  },
  {
    id: "4",
    name: "Zalando",
    desc: "Europe's leading online fashion platform.",
    tags: ["Free Shipping", "Discounts"],
    categoryId: "333f70a8-f143-4b04-bbf3-309d3abc3184",
    category: "Food",
    logo: null,
    rating: 4.0,
    score: 7.9,
    verified: false,
    claimed: true,
    country: "Germany",
    link: "https://www.zalando.com",
  },
];

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

export function StarRating({ rating }: { rating: number }) {
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

export default function StoresPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryId = searchParams.get("categoryId");
  const [stores, setStores] = useState(mockStores);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categoryName, setCategoryName] = useState("All Categories");

  // Filter states
  const [showFilters, setShowFilters] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [claimedOnly, setClaimedOnly] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"rating" | "name">("rating");
  const [showSortModal, setShowSortModal] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);
    try {
      // Filter stores based on categoryId
      const filteredStores = categoryId
        ? mockStores.filter((store) => store.categoryId === categoryId)
        : mockStores;
      setStores(filteredStores);

      // Determine category name for display
      if (categoryId && filteredStores.length > 0) {
        setCategoryName(filteredStores[0].category);
      } else if (!categoryId) {
        setCategoryName("All Categories");
      }
    } catch (error) {
      console.error("Error filtering stores:", error);
      setError("Failed to load stores. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [categoryId]);

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

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Loading stores...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="container mx-auto px-4 py-8 lg:flex lg:space-x-6">
          {/* Mobile Filter and Sort Buttons */}
          <div className="lg:hidden flex gap-4 mb-6">
            <Button
              variant="outline"
              className="flex-1 flex items-center justify-center gap-2"
              onClick={() => setShowFilters(true)}
            >
              <Filter className="h-4 w-4" />
              Filter by
            </Button>

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
                <span className="text-sm font-medium text-gray-700">
                  Sort By:
                </span>
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
              {sortedStores.map((store) => (
                <StoreCard key={store.id} store={store} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
