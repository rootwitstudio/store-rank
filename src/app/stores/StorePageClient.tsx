"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import StoreList from "./StoreList";
import FilterPanel from "./FilterPanel";

interface Store {
  id: string;
  name: string;
  desc: string;
  tags: string[];
  categoryId: string;
  category: string;
  logo: null;
  rating: number;
  score: number;
  verified: boolean;
  claimed: boolean;
  country: string;
  link: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  parentId: string | null;
  subcategories: Category[];
}

interface Props {
  category: Category;
  initialStores: Store[];
}

export default function StorePageClient({ category, initialStores }: Props) {
  const [minRating, setMinRating] = useState(0);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [claimedOnly, setClaimedOnly] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false); // State for mobile filter modal
  const [sortBy, setSortBy] = useState<"rating" | "name">("rating");
  const [showSortModal, setShowSortModal] = useState(false); // State for mobile sort modal
  const [search, setSearch] = useState("");

  // Apply filters and sorting
  let filteredStores = initialStores.filter(
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

  const sortedAndSearchedStores = filteredStores.filter(
    (store) =>
      store.name.toLowerCase().includes(search.toLowerCase()) ||
      store.desc.toLowerCase().includes(search.toLowerCase()) ||
      store.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col lg:flex-row gap-8">
        {/* Filter Sidebar for Large Screens */}
        <aside className="lg:w-1/4 hidden lg:block">
          <div className="bg-gray-100 p-6 rounded-lg">
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
              subcategories={category.subcategories}
            />
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1">
          <StoreList
            category={category.name}
            stores={sortedAndSearchedStores}
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
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            sortBy={sortBy}
            setSortBy={setSortBy}
            showSortModal={showSortModal}
            setShowSortModal={setShowSortModal}
            search={search}
            setSearch={setSearch}
          />
        </div>
      </main>
    </div>
  );
}
