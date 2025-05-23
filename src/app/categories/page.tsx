"use client";

import { useEffect, useState, useRef } from "react";
import { categoryApi } from "@/lib/api";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import * as LucideIcons from "lucide-react";
import { Header } from "@/components/header";
import { Input } from "@/components/ui/input";
import { Search, Plus, Minus } from "lucide-react"; // Import Minus icon

interface SubCategory {
  id: string;
  name: string;
  description: string | null;
  icon: string;
  createdAt: string;
  updatedAt: string;
}

interface Category {
  id: string;
  name: string;
  description: string | null;
  icon: string;
  createdAt: string;
  updatedAt: string;
  subcategories: SubCategory[];
}

// Define a type for items to display in the dropdown
interface SearchResultItem {
  id: string;
  name: string;
  type: "category" | "subcategory";
  categoryId?: string; // For subcategories, reference to parent category
}

// Helper function to highlight text
const highlightText = (text: string, query: string) => {
  if (!query) return <span>{text}</span>;

  const lowerCaseText = text.toLowerCase();
  const lowerCaseQuery = query.toLowerCase();
  const parts = [];
  let lastIndex = 0;
  let index;

  while ((index = lowerCaseText.indexOf(lowerCaseQuery, lastIndex)) !== -1) {
    parts.push(text.substring(lastIndex, index));
    parts.push(
      <span key={index} className="bg-yellow-200">
        {text.substring(index, index + query.length)}
      </span>
    );
    lastIndex = index + query.length;
  }

  parts.push(text.substring(lastIndex));

  return <>{parts}</>;
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedCategoryId, setExpandedCategoryId] = useState<string | null>(
    null
  ); // State for expanded category
  const [showDropdown, setShowDropdown] = useState(false); // State for dropdown visibility
  const inputRef = useRef<HTMLInputElement>(null); // Ref for search input
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref for dropdown container

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await categoryApi.getAll();
        // Assuming the backend now returns the nested structure
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Failed to load categories.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Filter categories and subcategories for dropdown
  const dropdownResults: SearchResultItem[] = [];
  if (searchQuery) {
    const lowerCaseQuery = searchQuery.toLowerCase();
    categories.forEach((category) => {
      // Check if category name matches
      if (category.name.toLowerCase().includes(lowerCaseQuery)) {
        dropdownResults.push({
          id: category.id,
          name: category.name,
          type: "category",
        });
      }
      // Check if any subcategory name matches
      if (category.subcategories) {
        category.subcategories.forEach((subcategory) => {
          if (subcategory.name.toLowerCase().includes(lowerCaseQuery)) {
            dropdownResults.push({
              id: subcategory.id,
              name: `${category.name} > ${subcategory.name}`, // Show parent category for context
              type: "subcategory",
              categoryId: category.id,
            });
          }
        });
      }
    });
  }

  // Handle category click to expand/collapse
  const handleCategoryClick = (categoryId: string) => {
    setExpandedCategoryId(
      categoryId === expandedCategoryId ? null : categoryId
    );
  };

  // Handle click on a dropdown item
  const handleDropdownItemClick = (item: SearchResultItem) => {
    setSearchQuery(item.name); // Set search query to the selected item's name
    setShowDropdown(false); // Hide dropdown
    // You might want to navigate based on item type here, or let the main list handle navigation
    // For now, just updating the search query

    // Optional: if you want to navigate directly from dropdown
    // if (item.type === 'category') {
    //   // Navigate to main category stores page
    //   window.location.href = `/categories/${item.name.toLowerCase()}/stores`;
    // } else if (item.type === 'subcategory' && item.categoryId) {
    //   // Navigate to subcategory stores page
    //   window.location.href = `/categories/${item.name.split(' > ')[1].toLowerCase()}/stores`; // Need to extract subcategory name
    // }
  };

  // Effect to close dropdown on outside clicks
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

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Loading categories...</p>
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
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-screen-xl relative">
        {/* Header section like in the image */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-4">What are you looking for?</h1>
          {/* Search Input and Dropdown */}
          <div className="w-full relative" ref={dropdownRef}>
            <Input
              ref={inputRef}
              type="text"
              placeholder="Search..."
              className="w-full pr-10 py-2 text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowDropdown(true)}
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />

            {/* Dropdown Menu */}
            {showDropdown && dropdownResults.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200 max-h-60 overflow-y-auto">
                {dropdownResults.map((item) => (
                  <button
                    key={item.id + item.type}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => handleDropdownItemClick(item)}
                  >
                    {highlightText(item.name, searchQuery)}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <h2 className="text-xl font-bold mb-4">Explore stores by category</h2>

        {/* Categories List (displayed below search or dropdown) - Mobile */}
        {(!showDropdown || !searchQuery) && (
          <div className="bg-white rounded-lg shadow overflow-hidden divide-y divide-gray-200 lg:hidden">
            {categories.map((category) => {
              // Get the icon component dynamically
              const Icon =
                (LucideIcons as any)[category.icon] || LucideIcons.Store;
              const isExpanded = category.id === expandedCategoryId;

              return (
                <div key={category.id} className="">
                  {/* Main Category Item */}
                  <button
                    className="flex items-center justify-between w-full px-4 py-3 hover:bg-gray-50 transition-colors focus:outline-none"
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    <div className="flex items-center space-x-4">
                      <Icon className="h-6 w-6 text-gray-600" />
                      <span className="text-base font-medium text-gray-800 text-left">
                        {/* Highlight category name (only if no search query in main list) */}
                        {searchQuery
                          ? highlightText(category.name, searchQuery)
                          : category.name}
                      </span>
                    </div>
                    {isExpanded ? (
                      <Minus className="h-5 w-5 text-gray-500" />
                    ) : (
                      <Plus className="h-5 w-5 text-gray-500" />
                    )}
                  </button>

                  {/* Subcategories List (shown when expanded) */}
                  {isExpanded && category.subcategories && (
                    <div className="px-4 py-2 bg-gray-100 border-t border-gray-200">
                      <ul className="space-y-1">
                        {category.subcategories.map((subcategory) => (
                          <li key={subcategory.id}>
                            <Link
                              href={`/stores?categoryId=${subcategory.id}`}
                              className="block text-sm text-gray-700 hover:text-blue-600 hover:underline transition-colors"
                            >
                              {/* Highlight subcategory name (only if no search query in main list) */}
                              {searchQuery
                                ? highlightText(subcategory.name, searchQuery)
                                : subcategory.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Categories Grid - Desktop */}
        {(!showDropdown || !searchQuery) && (
          <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => {
              const Icon =
                (LucideIcons as any)[category.icon] || LucideIcons.Store;
              return (
                <Card key={category.id} className="flex flex-col shadow-md">
                  {/* Updated CardHeader with reduced vertical padding and no background color */}
                  <Link
                    href={`/stores?categoryId=${category.id}`}
                    className="block"
                  >
                    <CardHeader className="flex flex-row items-center space-x-2 text-gray-800 px-4 py-2 rounded-t-md">
                      <Icon className="h-6 w-6 text-gray-600" />
                      <CardTitle className="text-lg font-semibold text-gray-800">
                        {category.name}
                      </CardTitle>
                    </CardHeader>
                  </Link>
                  {/* CardContent with padding and adjusted subcategory list spacing */}
                  <CardContent className="flex-grow p-4">
                    {category.subcategories &&
                      category.subcategories.length > 0 && (
                        <ul className="space-y-2">
                          {category.subcategories.map((subcategory, index) => (
                            <li
                              key={subcategory.id}
                              className={
                                index < category.subcategories.length - 1
                                  ? "border-b border-gray-200 pb-2"
                                  : "pb-2"
                              }
                            >
                              <Link
                                href={`/stores?categoryId=${subcategory.id}`}
                                className="block text-sm text-gray-700 hover:text-blue-600 hover:underline transition-colors"
                              >
                                {subcategory.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
