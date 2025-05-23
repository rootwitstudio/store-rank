"use client";
import { useState, useRef, useEffect } from "react";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Home as HomeIcon,
  Shirt,
  Monitor,
  Utensils,
  Sofa,
  BookOpen,
  ShoppingCart,
  Heart,
  Gift,
  Camera,
  ArrowRight,
  Search,
  Store,
  Link as LinkIcon,
  Filter,
  ArrowUpDown,
  Sparkles,
  Dumbbell,
  Gamepad2,
  Car,
  X,
} from "lucide-react";
import Link from "next/link";
import { categoryApi } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";

const leftLinks = [
  "Trending Stores",
  "Editor's Picks",
  "Seasonal Picks",
  "Recently Viewed",
  "Local Favorites",
  "Hidden Gems",
];
const rightLinks = [
  "New Arrivals",
  "Top Rated",
  "Recommended For You",
  "On Sale Now",
  "Local Favorites",
  "Hidden Gems",
];

const mockSuggestions = [
  "Amazon",
  "eBay",
  "Best Buy",
  "Walmart",
  "Target",
  "AliExpress",
  "Etsy",
  "Zara",
  "H&M",
  "Apple Store",
];

const featuredStores = [
  {
    name: "Store A",
    desc: "Short description of Store A. Lorem ipsum dolor sit amet.",
    tags: ["Tag1"],
    category: "Fashion",
    logo: null,
    rating: 4.5,
    score: 8.7,
    verified: true,
    link: "#",
  },
  {
    name: "Store B",
    desc: "Short description of Store B. Lorem ipsum dolor sit amet.",
    tags: ["Tag4"],
    category: "Electronics",
    logo: null,
    rating: 4.2,
    score: 8.2,
    verified: false,
    link: "#",
  },
  {
    name: "Store C",
    desc: "Short description of Store C. Lorem ipsum dolor sit amet.",
    tags: ["Tag1"],
    category: "Home",
    logo: null,
    rating: 4.8,
    score: 9.1,
    verified: true,
    link: "#",
  },
  {
    name: "Store D",
    desc: "Short description of Store D. Lorem ipsum dolor sit amet.",
    tags: [],
    category: "Food",
    logo: null,
    rating: 4.0,
    score: 7.9,
    verified: false,
    link: "#",
  },
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

const iconMap: { [key: string]: any } = {
  Shirt,
  Monitor,
  Utensils,
  Sofa,
  BookOpen,
  Sparkles,
  Dumbbell,
  Gamepad2,
  Heart,
  Car,
  Store, // Default icon
};

interface Category {
  id: string;
  name: string;
  description: string | null;
  icon: string;
  parentId: string | null;
  // Add children property for nested structure if needed for other parts, but not for this dropdown display
  // children?: Category[];
}

// Define types for search results
interface StoreSearchResult {
  type: "store";
  id: string; // Assuming stores have IDs
  name: string;
  description: string | null;
  // Add other store properties needed for display
}

interface CategorySearchResult {
  type: "category";
  id: string;
  name: string;
  icon: string;
  description: string; // Descriptive text for categories in dropdown
}

type SearchResult = StoreSearchResult | CategorySearchResult;

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [categoryError, setCategoryError] = useState<string | null>(null);
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([]); // State to hold combined search results
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false); // State to control modal visibility

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        console.log("Fetching categories..."); // Debug log
        const data = await categoryApi.getAll();
        console.log("Categories loaded:", data); // Debug log
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategoryError("Failed to load categories. Please try again later.");
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // Effect to filter results based on search query
  useEffect(() => {
    if (search.length === 0) {
      setFilteredResults([]);
      return;
    }

    const lowerCaseSearch = search.toLowerCase();
    const results: SearchResult[] = [];

    // Filter Categories (only main categories)
    categories
      .filter((category) => !category.parentId)
      .forEach((category) => {
        if (category.name.toLowerCase().includes(lowerCaseSearch)) {
          results.push({
            type: "category",
            id: category.id,
            name: category.name,
            icon: category.icon || "Store", // Use 'Store' as default if icon is null
            description: `The best companies in the category '${category.name}'`,
          });
        }
      });

    // Filter Stores (using mock featuredStores for now)
    // In a real app, you'd fetch/search actual store data here
    featuredStores.forEach((store, index) => {
      // Assign a mock ID for now, ideally stores would have real IDs
      const mockStoreId = `mock-store-${index}`;
      if (
        store.name.toLowerCase().includes(lowerCaseSearch) ||
        store.desc.toLowerCase().includes(lowerCaseSearch) // Optionally search description
      ) {
        results.push({
          type: "store",
          id: mockStoreId,
          name: store.name,
          description: store.desc || null,
          // Include other store data needed for display (e.g., rating, link) if necessary
        });
      }
    });

    setFilteredResults(results);
  }, [search, categories, featuredStores]); // Re-run when search query or data changes

  // const filteredSuggestions =
  //   search.length > 0
  //     ? mockSuggestions.filter((s) =>
  //         s.toLowerCase().includes(search.toLowerCase())
  //       )
  //     : [];

  useEffect(() => {
    if (!showDropdown) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDropdown]);

  // Add effect to handle body scroll when modal is open
  useEffect(() => {
    if (isSearchModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset"; // Clean up on unmount
    };
  }, [isSearchModalOpen]);

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-6 sm:py-8 md:py-12">
          <div className="container mx-auto px-4 sm:px-6 flex flex-col items-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-3 sm:mb-4 md:mb-6 leading-tight">
              Your Guide to Trusted Stores
              <br className="hidden sm:block" />
              <span className="text-blue-600">StoreRankly</span>
            </h1>
            {/* Main Search Input (hidden on small screens when modal is open) */}
            <div
              className={`w-full max-w-2xl relative mb-4 sm:mb-6 ${
                isSearchModalOpen ? "hidden sm:block" : ""
              }`}
            >
              <form
                className="flex items-center relative"
                autoComplete="off"
                onSubmit={(e) => {
                  e.preventDefault();
                  setShowDropdown(false);
                }}
              >
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder="Search for stores..."
                  className="w-full h-12 sm:h-14 text-base sm:text-lg pl-4 pr-12 rounded-lg border-2 focus:border-blue-500"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setShowDropdown(true);
                  }}
                  onFocus={() => {
                    // Open modal on small screens
                    if (window.innerWidth < 640) {
                      // 640px is Tailwind's sm breakpoint
                      setIsSearchModalOpen(true);
                    } else {
                      setShowDropdown(true);
                    }
                  }}
                />
                <Button
                  type="submit"
                  className="absolute right-2 h-8 sm:h-10 w-8 sm:w-10 p-0"
                >
                  <Search className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </form>
              {/* Original Dropdown (only for larger screens when modal is not open) */}
              {showDropdown &&
                filteredResults.length > 0 &&
                !isSearchModalOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-y-auto z-50"
                  >
                    {/* Group results by type */}
                    {filteredResults.some(
                      (result) => result.type === "store"
                    ) && (
                      <>
                        <div className="px-4 py-2 text-xs text-gray-500 font-semibold">
                          Companies
                        </div>
                        {filteredResults
                          .filter((result) => result.type === "store")
                          .map((result) => {
                            // Assuming result is StoreSearchResult
                            const storeResult = result as StoreSearchResult;
                            // In a real app, link to the store's page using storeResult.id
                            return (
                              <button
                                key={storeResult.id} // Use the mock store ID
                                className="w-full px-4 py-2 sm:py-3 text-left hover:bg-gray-100 text-sm sm:text-base flex items-center justify-between"
                                onClick={() => {
                                  // Handle navigation to store page
                                  console.log(
                                    "Navigate to store:",
                                    storeResult.name
                                  );
                                  setShowDropdown(false);
                                }}
                              >
                                <div className="flex items-center">
                                  {/* Added placeholder for logo/favicon */}
                                  <div className="w-8 h-8 bg-gray-200 rounded-md flex items-center justify-center text-gray-600 text-xs font-bold mr-3">
                                    {/* You might want to use an actual logo/favicon here */}
                                    {storeResult.name.charAt(0)}
                                  </div>
                                  <div>
                                    <div className="font-medium">
                                      {storeResult.name}
                                    </div>
                                    {/* Display website and mock reviews */}
                                    <div className="text-xs text-gray-500">
                                      {/* Using description as placeholder for website/domain for now */}
                                      {featuredStores.find(
                                        (s) => s.name === storeResult.name
                                      )?.desc || "No description"}{" "}
                                      {/* Use desc for website/domain */}
                                    </div>
                                  </div>
                                </div>

                                {/* Display Rating on the right */}
                                {(featuredStores.find(
                                  (s) => s.name === storeResult.name
                                )?.rating || 0) > 0 && (
                                  <div className="ml-auto flex-shrink-0">
                                    {/* Placeholder for rating display like in the image */}
                                    <span
                                      className={`px-2 py-0.5 text-xs font-semibold rounded ${
                                        (featuredStores.find(
                                          (s) => s.name === storeResult.name
                                        )?.rating || 0) >= 4
                                          ? "bg-green-100 text-green-800"
                                          : "bg-red-100 text-red-800"
                                      }`}
                                    >
                                      {" "}
                                      {/* Basic color logic */}
                                      {(
                                        featuredStores.find(
                                          (s) => s.name === storeResult.name
                                        )?.rating || 0
                                      ).toFixed(1)}
                                    </span>
                                  </div>
                                )}
                              </button>
                            );
                          })}
                      </>
                    )}

                    {filteredResults.some(
                      (result) => result.type === "category"
                    ) && (
                      <>
                        <div className="px-4 py-2 text-xs text-gray-500 font-semibold">
                          Categories
                        </div>
                        {filteredResults
                          .filter((result) => result.type === "category")
                          .map((result) => {
                            // Assuming result is CategorySearchResult
                            const categoryResult =
                              result as CategorySearchResult;
                            const Icon = iconMap[categoryResult.icon] || Store; // Get icon component
                            return (
                              <Link
                                key={categoryResult.id}
                                href={`/stores?categoryId=${categoryResult.id}`} // Link to category stores page
                                className="flex items-center px-4 py-2 sm:py-3 hover:bg-gray-100"
                                onClick={() => {
                                  setShowDropdown(false);
                                }}
                              >
                                <Icon className="h-5 w-5 text-gray-600 mr-3" />
                                <div>
                                  <div className="text-sm sm:text-base font-medium">
                                    {categoryResult.name}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {categoryResult.description}
                                  </div>
                                </div>
                              </Link>
                            );
                          })}
                      </>
                    )}
                  </div>
                )}
            </div>
          </div>
        </section>

        {/* Full Page Search Modal for Small Screens */}
        {isSearchModalOpen && (
          <div className="fixed inset-0 bg-white z-[100] flex flex-col">
            {/* Modal Header with Input and Close Button */}
            <div className="flex items-center px-4 py-3 border-b border-gray-200">
              <div className="relative flex-1 mr-3">
                {/* Input inside modal */}
                <Input
                  autoFocus // Auto-focus the input when modal opens
                  type="text"
                  placeholder="Search for stores..."
                  className="w-full h-12 text-base pl-4 pr-10 rounded-lg border focus:border-blue-500"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)} // Link to the same search state
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
              {/* Close Button */}
              <Button
                variant="ghost"
                onClick={() => setIsSearchModalOpen(false)}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Modal Body with Search Results */}
            <div className="flex-1 overflow-y-auto p-4">
              {/* Display filtered results here - reuse the dropdown rendering logic */}
              {filteredResults.length > 0 ? (
                <div className="">
                  {/* Group results by type - reuse the dropdown rendering structure */}
                  {filteredResults.some(
                    (result) => result.type === "store"
                  ) && (
                    <>
                      <div className="px-4 py-2 text-xs text-gray-500 font-semibold">
                        Companies
                      </div>
                      {filteredResults
                        .filter((result) => result.type === "store")
                        .map((result) => {
                          const storeResult = result as StoreSearchResult;
                          return (
                            <button
                              key={storeResult.id}
                              className="w-full px-4 py-2 sm:py-3 text-left hover:bg-gray-100 text-sm sm:text-base flex items-center justify-between"
                              onClick={() => {
                                console.log(
                                  "Navigate to store from modal:",
                                  storeResult.name
                                );
                                setIsSearchModalOpen(false); // Close modal on click
                              }}
                            >
                              <div className="flex items-center">
                                <div className="w-8 h-8 bg-gray-200 rounded-md flex items-center justify-center text-gray-600 text-xs font-bold mr-3">
                                  {storeResult.name.charAt(0)}
                                </div>
                                <div>
                                  <div className="font-medium">
                                    {storeResult.name}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {featuredStores.find(
                                      (s) => s.name === storeResult.name
                                    )?.desc || "No description"}{" "}
                                    {/* Use desc for website/domain */}
                                  </div>
                                </div>
                              </div>
                              {(featuredStores.find(
                                (s) => s.name === storeResult.name
                              )?.rating || 0) > 0 && (
                                <div className="ml-auto flex-shrink-0">
                                  <span
                                    className={`px-2 py-0.5 text-xs font-semibold rounded ${
                                      (featuredStores.find(
                                        (s) => s.name === storeResult.name
                                      )?.rating || 0) >= 4
                                        ? "bg-green-100 text-green-800"
                                        : "bg-red-100 text-red-800"
                                    }`}
                                  >
                                    {" "}
                                    {/* Basic color logic */}
                                    {(
                                      featuredStores.find(
                                        (s) => s.name === storeResult.name
                                      )?.rating || 0
                                    ).toFixed(1)}
                                  </span>
                                </div>
                              )}
                            </button>
                          );
                        })}
                    </>
                  )}

                  {filteredResults.some(
                    (result) => result.type === "category"
                  ) && (
                    <>
                      <div className="px-4 py-2 text-xs text-gray-500 font-semibold">
                        Categories
                      </div>
                      {filteredResults
                        .filter((result) => result.type === "category")
                        .map((result) => {
                          const categoryResult = result as CategorySearchResult;
                          const Icon = iconMap[categoryResult.icon] || Store; // Get icon component
                          return (
                            <Link
                              key={categoryResult.id}
                              href={`/stores?categoryId=${categoryResult.id}`} // Link to category stores page
                              className="flex items-center px-4 py-2 sm:py-3 hover:bg-gray-100"
                              onClick={() => {
                                setIsSearchModalOpen(false); // Close modal on click
                              }}
                            >
                              <Icon className="h-5 w-5 text-gray-600 mr-3" />
                              <div>
                                <div className="text-sm sm:text-base font-medium">
                                  {categoryResult.name}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {categoryResult.description}
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                    </>
                  )}
                </div>
              ) : (
                search.length > 0 &&
                !loadingCategories && (
                  <div className="text-center text-gray-500 mt-8">
                    No results found.
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {/* Categories Section */}
        <section className="py-6 sm:py-8">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex justify-between items-center mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold">
                Browse Categories
              </h2>
              <Link
                href="/categories"
                className="text-blue-600 hover:underline flex items-center text-sm sm:text-base"
              >
                View All
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            {loadingCategories ? (
              <p>Loading categories...</p>
            ) : categoryError ? (
              <p className="text-red-500">{categoryError}</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                {categories
                  .filter((category) => !category.parentId)
                  .map((category) => {
                    const Icon = iconMap[category.icon] || Store;
                    return (
                      <Link
                        key={category.id}
                        href={`/stores?categoryId=${category.id}`}
                        className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-center"
                      >
                        <Icon className="h-8 w-8 mb-2 text-blue-600" />
                        <span className="text-sm font-medium">
                          {category.name}
                        </span>
                      </Link>
                    );
                  })}
              </div>
            )}
          </div>
        </section>

        {/* Featured Stores Section */}
        <section className="py-8 sm:py-12 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex justify-between items-center mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold">
                Featured Stores
              </h2>
              <Link
                href="/stores"
                className="text-blue-600 hover:underline flex items-center text-sm sm:text-base"
              >
                View All
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {featuredStores.map((store, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start mb-4">
                    {/* Placeholder for logo */}
                    <div className="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center text-gray-600 font-bold text-sm mr-4">
                      {store.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">
                        {store.name}
                      </h3>
                      <p className="text-sm text-gray-600">{store.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center mb-4">
                    <StarRating rating={store.rating} />
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
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
                      {store.category}
                    </span>
                  </div>
                  <Link
                    href={store.link}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Visit Store{" "}
                    <LinkIcon className="inline-block h-4 w-4 ml-1" />
                  </Link>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link
                href="/stores"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                View All Stores
              </Link>
            </div>
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer className="border-t py-4 text-center text-sm text-muted-foreground flex justify-center gap-6 bg-white">
        <Link href="#">About</Link>
        <Link href="#">Contact</Link>
        <Link href="#">Privacy</Link>
        <Link href="#">Terms</Link>
      </footer>
    </div>
  );
}
