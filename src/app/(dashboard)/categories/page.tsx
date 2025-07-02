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

// Color palette for categories
const categoryColors = [
  { bg: "bg-blue-100", icon: "text-blue-600", hover: "hover:bg-blue-50" },
  { bg: "bg-purple-100", icon: "text-purple-600", hover: "hover:bg-purple-50" },
  { bg: "bg-green-100", icon: "text-green-600", hover: "hover:bg-green-50" },
  { bg: "bg-orange-100", icon: "text-orange-600", hover: "hover:bg-orange-50" },
  { bg: "bg-pink-100", icon: "text-pink-600", hover: "hover:bg-pink-50" },
  { bg: "bg-indigo-100", icon: "text-indigo-600", hover: "hover:bg-indigo-50" },
  { bg: "bg-red-100", icon: "text-red-600", hover: "hover:bg-red-50" },
  { bg: "bg-teal-100", icon: "text-teal-600", hover: "hover:bg-teal-50" },
  { bg: "bg-yellow-100", icon: "text-yellow-600", hover: "hover:bg-yellow-50" },
  { bg: "bg-cyan-100", icon: "text-cyan-600", hover: "hover:bg-cyan-50" },
];

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

  const toggleCategory = (categoryId: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
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
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen flex flex-col">
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
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen flex flex-col">
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
    <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section - Colorful Sitejabber Style */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 py-20 text-white">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            Browse Businesses
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed text-blue-100">
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
                className="w-full h-16 text-lg pl-6 pr-20 rounded-full border-0 shadow-2xl bg-white text-gray-900 focus:ring-4 focus:ring-white/30 focus:outline-none"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 rounded-full p-4 cursor-pointer transition-all duration-200 shadow-lg">
                  <Search className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>

            {/* Search Dropdown */}
            {showDropdown && dropdownResults.length > 0 && (
              <div className="absolute z-10 w-full mt-3 bg-white rounded-2xl shadow-2xl border border-gray-200 max-h-80 overflow-y-auto">
                {dropdownResults.map((item) => (
                  <button
                    key={item.id + item.type}
                    className="block w-full text-left px-6 py-4 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 border-b border-gray-100 last:border-b-0 transition-all duration-200"
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

      <main className="flex-1 container mx-auto px-4 py-12 max-w-6xl">
        {/* Categories Grid - Colorful Sitejabber Style with 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => {
            const Icon = (LucideIcons as any)[category.icon] || LucideIcons.Store;
            const isExpanded = expandedCategories.has(category.id);
            const hasSubcategories = category.subcategories && category.subcategories.length > 0;
            const colorScheme = categoryColors[index % categoryColors.length];

            return (
              <div key={category.id} className="bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                {/* Category Header - Clickable to expand/collapse */}
                <div 
                  className={`p-6 ${hasSubcategories ? 'cursor-pointer' : ''} transition-all duration-200 ${colorScheme.hover}`}
                  onClick={(e) => hasSubcategories && toggleCategory(category.id, e)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`h-14 w-14 ${colorScheme.bg} rounded-xl flex items-center justify-center flex-shrink-0 shadow-md`}>
                        <Icon className={`h-7 w-7 ${colorScheme.icon}`} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-bold text-gray-900 text-xl mb-2">{category.name}</h3>
                        {category.description && (
                          <p className="text-sm text-gray-600 line-clamp-2">{category.description}</p>
                        )}
                      </div>
                    </div>
                    {hasSubcategories && (
                      <div className={`ml-3 flex-shrink-0 p-2 rounded-full ${colorScheme.bg} transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
                        <ChevronDown className={`h-5 w-5 ${colorScheme.icon}`} />
                      </div>
                    )}
                  </div>
                </div>

                {/* Subcategories - Collapsible with proper animation */}
                {hasSubcategories && (
                  <div 
                    className={`border-t border-gray-100 bg-gradient-to-br from-gray-50 to-gray-100 transition-all duration-500 ease-in-out ${
                      isExpanded 
                        ? 'max-h-96 opacity-100' 
                        : 'max-h-0 opacity-0'
                    }`}
                    style={{
                      overflow: 'hidden'
                    }}
                  >
                    <div className="p-6 space-y-2">
                      {category.subcategories.map((subcategory, subIndex) => (
                        <Link
                          key={subcategory.id}
                          href={`/stores?categoryId=${subcategory.id}`}
                          className="block text-sm text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 px-4 py-3 rounded-lg transition-all duration-200 font-medium shadow-sm hover:shadow-md transform hover:scale-105"
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
                    className={`${colorScheme.icon} hover:text-white font-bold text-sm flex items-center justify-center w-full py-3 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105`}
                  >
                    View All {category.name} →
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