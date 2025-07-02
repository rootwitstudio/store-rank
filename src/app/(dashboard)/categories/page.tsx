"use client";

import { useEffect, useState, useRef } from "react";
import { categoryApi } from "@/lib/api";
import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { Header } from "@/components/header";
import { Input } from "@/components/ui/input";
import { Search, ChevronDown, ChevronUp } from "lucide-react";

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

interface SearchResultItem {
  id: string;
  name: string;
  type: "category" | "subcategory";
  categoryId?: string;
}

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
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await categoryApi.getAll();
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

  const dropdownResults: SearchResultItem[] = [];
  if (searchQuery) {
    const lowerCaseQuery = searchQuery.toLowerCase();
    categories.forEach((category) => {
      if (category.name.toLowerCase().includes(lowerCaseQuery)) {
        dropdownResults.push({
          id: category.id,
          name: category.name,
          type: "category",
        });
      }
      if (category.subcategories) {
        category.subcategories.forEach((subcategory) => {
          if (subcategory.name.toLowerCase().includes(lowerCaseQuery)) {
            dropdownResults.push({
              id: subcategory.id,
              name: `${category.name} > ${subcategory.name}`,
              type: "subcategory",
              categoryId: category.id,
            });
          }
        });
      }
    });
  }

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const handleDropdownItemClick = (item: SearchResultItem) => {
    setSearchQuery(item.name);
    setShowDropdown(false);
  };

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
      <div className="bg-gray-50 min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading categories...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-red-500 text-lg">{error}</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      
      {/* Hero Section - Similar to Sitejabber */}
      <section className="bg-white py-16 border-b">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Browse Businesses
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Don't wait to stumble across what you need... Find it, stat ⚡ - from the hottest 
            in retail to must-have business tools, and beyond.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative" ref={dropdownRef}>
            <div className="relative">
              <Input
                ref={inputRef}
                type="text"
                placeholder="Search here..."
                className="w-full h-14 text-lg pl-6 pr-16 rounded-full border-2 border-gray-300 shadow-sm bg-white text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <div className="bg-blue-600 hover:bg-blue-700 rounded-full p-3 cursor-pointer transition-colors">
                  <Search className="h-5 w-5 text-white" />
                </div>
              </div>
            </div>

            {/* Search Dropdown */}
            {showDropdown && dropdownResults.length > 0 && (
              <div className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-80 overflow-y-auto">
                {dropdownResults.map((item) => (
                  <button
                    key={item.id + item.type}
                    className="block w-full text-left px-6 py-3 text-gray-700 hover:bg-blue-50 border-b border-gray-100 last:border-b-0"
                    onClick={() => handleDropdownItemClick(item)}
                  >
                    {highlightText(item.name, searchQuery)}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        {/* Categories Grid - Sitejabber Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const Icon = (LucideIcons as any)[category.icon] || LucideIcons.Store;
            const isExpanded = expandedCategories.has(category.id);
            const hasSubcategories = category.subcategories && category.subcategories.length > 0;

            return (
              <div key={category.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                {/* Category Header */}
                <div 
                  className={`p-4 flex items-center justify-between ${hasSubcategories ? 'cursor-pointer hover:bg-gray-50' : ''}`}
                  onClick={() => hasSubcategories && toggleCategory(category.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">{category.name}</h3>
                      {hasSubcategories && (
                        <p className="text-sm text-gray-500">
                          {category.subcategories.length} subcategories
                        </p>
                      )}
                    </div>
                  </div>
                  {hasSubcategories && (
                    <div className="text-gray-400">
                      {isExpanded ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </div>
                  )}
                </div>

                {/* Subcategories - Expandable */}
                {hasSubcategories && isExpanded && (
                  <div className="border-t border-gray-100 bg-gray-50">
                    <div className="p-4 space-y-2">
                      {category.subcategories.map((subcategory) => (
                        <Link
                          key={subcategory.id}
                          href={`/stores?categoryId=${subcategory.id}`}
                          className="block text-sm text-gray-700 hover:text-blue-600 hover:bg-white px-3 py-2 rounded transition-colors"
                        >
                          {subcategory.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* View All Link */}
                <div className="border-t border-gray-100 p-4">
                  <Link
                    href={`/stores?categoryId=${category.id}`}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center justify-center w-full py-2 hover:bg-blue-50 rounded transition-colors"
                  >
                    View All {category.name} Stores
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}