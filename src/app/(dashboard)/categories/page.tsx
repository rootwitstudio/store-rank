"use client";

import { useEffect, useState, useRef } from "react";
import { categoryApi } from "@/lib/api";
import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { Header } from "@/components/header";
import { Input } from "@/components/ui/input";
import { Search, ChevronRight } from "lucide-react";

interface Category {
  id: string;
  name: string;
  description: string | null;
  icon: string;
  createdAt: string;
  updatedAt: string;
  parentId: string | null;
  parent: Category | null;
  children: Category[];
}

interface SearchResultItem {
  id: string;
  name: string;
  type: "category" | "subcategory";
  categoryId?: string;
}

// Color palette for categories
const categoryColors = [
  { bg: "bg-blue-50", icon: "text-blue-600", hover: "hover:bg-blue-100", gradient: "from-blue-500 to-blue-600" },
  { bg: "bg-purple-50", icon: "text-purple-600", hover: "hover:bg-purple-100", gradient: "from-purple-500 to-purple-600" },
  { bg: "bg-green-50", icon: "text-green-600", hover: "hover:bg-green-100", gradient: "from-green-500 to-green-600" },
  { bg: "bg-orange-50", icon: "text-orange-600", hover: "hover:bg-orange-100", gradient: "from-orange-500 to-orange-600" },
  { bg: "bg-pink-50", icon: "text-pink-600", hover: "hover:bg-pink-100", gradient: "from-pink-500 to-pink-600" },
  { bg: "bg-indigo-50", icon: "text-indigo-600", hover: "hover:bg-indigo-100", gradient: "from-indigo-500 to-indigo-600" },
  { bg: "bg-red-50", icon: "text-red-600", hover: "hover:bg-red-100", gradient: "from-red-500 to-red-600" },
  { bg: "bg-teal-50", icon: "text-teal-600", hover: "hover:bg-teal-100", gradient: "from-teal-500 to-teal-600" },
  { bg: "bg-yellow-50", icon: "text-yellow-600", hover: "hover:bg-yellow-100", gradient: "from-yellow-500 to-yellow-600" },
  { bg: "bg-cyan-50", icon: "text-cyan-600", hover: "hover:bg-cyan-100", gradient: "from-cyan-500 to-cyan-600" },
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
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [mainCategories, setMainCategories] = useState<Category[]>([]);
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
        console.log("Fetched categories:", data); // Debug log
        
        // Store all categories
        setAllCategories(data);
        
        // Filter main categories (those without parentId or with parentId = null)
        const mainCats = data.filter((category: Category) => !category.parentId);
        console.log("Main categories:", mainCats); // Debug log
        
        setMainCategories(mainCats);
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
    
    // Search in main categories
    mainCategories.forEach((category) => {
      if (category.name.toLowerCase().includes(lowerCaseQuery)) {
        dropdownResults.push({
          id: category.id,
          name: category.name,
          type: "category",
        });
      }
      
      // Search in subcategories (children)
      if (category.children && category.children.length > 0) {
        category.children.forEach((subcategory) => {
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
      <div className="bg-gray-50 min-h-screen flex flex-col">
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
      
      {/* Reduced Hero Section - Clean and minimal */}
      <section className="bg-white border-b border-gray-200 py-12">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Browse Categories
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Find trusted businesses across different categories. Discover reviews and ratings to make informed decisions.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative" ref={dropdownRef}>
            <div className="relative">
              <Input
                ref={inputRef}
                type="text"
                placeholder="Search categories..."
                className="w-full h-12 text-base pl-4 pr-12 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Search Dropdown */}
            {showDropdown && dropdownResults.length > 0 && (
              <div className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-y-auto">
                {dropdownResults.map((item) => (
                  <button
                    key={item.id + item.type}
                    className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
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

      <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
        {/* Debug Info */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-6 p-4 bg-white rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600">
              Debug: Found {allCategories.length} total categories, {mainCategories.length} main categories
            </p>
          </div>
        )}

        {/* Categories Grid - Clean and organized */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mainCategories.map((category, index) => {
            const Icon = (LucideIcons as any)[category.icon] || LucideIcons.Store;
            const isExpanded = expandedCategories.has(category.id);
            const hasSubcategories = category.children && category.children.length > 0;
            const colorScheme = categoryColors[index % categoryColors.length];

            return (
              <div key={category.id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                {/* Category Header */}
                <div 
                  className={`p-6 ${hasSubcategories ? 'cursor-pointer' : ''} transition-all duration-200 ${colorScheme.hover}`}
                  onClick={() => hasSubcategories && toggleCategory(category.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1 min-w-0">
                      <div className={`h-12 w-12 ${colorScheme.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`h-6 w-6 ${colorScheme.icon}`} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-gray-900 text-lg mb-1 truncate">{category.name}</h3>
                        {hasSubcategories && (
                          <p className="text-sm text-gray-500">
                            {category.children.length} subcategories
                          </p>
                        )}
                      </div>
                    </div>
                    {hasSubcategories && (
                      <div className={`ml-3 flex-shrink-0 p-2 rounded-full ${colorScheme.bg} transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`}>
                        <ChevronRight className={`h-4 w-4 ${colorScheme.icon}`} />
                      </div>
                    )}
                  </div>
                </div>

                {/* Subcategories - Collapsible */}
                {hasSubcategories && (
                  <div 
                    className={`transition-all duration-500 ease-in-out overflow-hidden ${
                      isExpanded 
                        ? 'max-h-96 opacity-100' 
                        : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="bg-gray-50 p-4">
                      <div className="space-y-2">
                        {category.children.map((subcategory) => (
                          <Link
                            key={subcategory.id}
                            href={`/stores?categoryId=${subcategory.id}`}
                            className="block text-sm text-gray-700 hover:text-blue-600 hover:bg-white px-3 py-2 rounded-lg transition-all duration-200 font-medium border border-transparent hover:border-blue-200"
                          >
                            {subcategory.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Show message if no categories found */}
        {mainCategories.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No categories found.</p>
          </div>
        )}
      </main>
    </div>
  );
}