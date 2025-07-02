"use client";

import { useEffect, useState, useRef } from "react";
import { categoryApi } from "@/lib/api";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import * as LucideIcons from "lucide-react";
import { Header } from "@/components/header";
import { Input } from "@/components/ui/input";
import { Search, Plus, Minus, ArrowRight, TrendingUp, Star } from "lucide-react";

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

// Mock data for popular categories and trending stats
const popularCategories = [
  { name: "Electronics", count: "2,847 stores", trend: "+12%" },
  { name: "Fashion", count: "1,923 stores", trend: "+8%" },
  { name: "Home & Living", count: "1,456 stores", trend: "+15%" },
  { name: "Beauty & Personal Care", count: "987 stores", trend: "+22%" },
];

const featuredCategories = [
  { name: "Electronics", description: "Latest gadgets and tech", storeCount: 2847, avgRating: 4.2 },
  { name: "Fashion", description: "Trendy clothing and accessories", storeCount: 1923, avgRating: 4.1 },
  { name: "Home & Living", description: "Furniture and home decor", storeCount: 1456, avgRating: 4.3 },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedCategoryId, setExpandedCategoryId] = useState<string | null>(null);
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

  const handleCategoryClick = (categoryId: string) => {
    setExpandedCategoryId(
      categoryId === expandedCategoryId ? null : categoryId
    );
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
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Explore Store Categories
          </h1>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Discover trusted stores across all categories. Find the perfect place to shop with confidence.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative" ref={dropdownRef}>
            <div className="relative">
              <Input
                ref={inputRef}
                type="text"
                placeholder="Search categories or stores..."
                className="w-full h-14 text-lg pl-6 pr-14 rounded-xl border-0 shadow-lg bg-white text-gray-900"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
              />
              <Search className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
            </div>

            {/* Search Dropdown */}
            {showDropdown && dropdownResults.length > 0 && (
              <div className="absolute z-10 w-full mt-2 bg-white rounded-xl shadow-xl border border-gray-200 max-h-80 overflow-y-auto">
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

      <main className="flex-1 container mx-auto px-4 py-12">
        {/* Stats Section */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-gray-900">50+</p>
                  <p className="text-gray-600">Categories</p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <LucideIcons.Grid3X3 className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-gray-900">10K+</p>
                  <p className="text-gray-600">Stores</p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <LucideIcons.Store className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-gray-900">1M+</p>
                  <p className="text-gray-600">Reviews</p>
                </div>
                <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Star className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-gray-900">4.2</p>
                  <p className="text-gray-600">Avg Rating</p>
                </div>
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Categories */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured Categories</h2>
            <Link href="/stores" className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2">
              View All Stores <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredCategories.map((category, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <LucideIcons.Store className="h-6 w-6 text-white" />
                  </div>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                    ★ {category.avgRating}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{category.storeCount.toLocaleString()} stores</span>
                  <Link 
                    href={`/stores?category=${category.name.toLowerCase()}`}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    Explore →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* All Categories Grid */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">All Categories</h2>
            <p className="text-gray-600">{categories.length} categories available</p>
          </div>

          {/* Mobile Accordion View */}
          <div className="lg:hidden">
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
              {categories.map((category) => {
                const Icon = (LucideIcons as any)[category.icon] || LucideIcons.Store;
                const isExpanded = category.id === expandedCategoryId;

                return (
                  <div key={category.id} className="border-b border-gray-100 last:border-b-0">
                    <button
                      className="flex items-center justify-between w-full px-6 py-4 hover:bg-gray-50 transition-colors"
                      onClick={() => handleCategoryClick(category.id)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Icon className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="text-left">
                          <h3 className="font-semibold text-gray-900">{category.name}</h3>
                          <p className="text-sm text-gray-500">
                            {category.subcategories?.length || 0} subcategories
                          </p>
                        </div>
                      </div>
                      {isExpanded ? (
                        <Minus className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Plus className="h-5 w-5 text-gray-400" />
                      )}
                    </button>

                    {isExpanded && category.subcategories && (
                      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                        <div className="grid grid-cols-1 gap-2">
                          {category.subcategories.map((subcategory) => (
                            <Link
                              key={subcategory.id}
                              href={`/stores?categoryId=${subcategory.id}`}
                              className="block p-3 text-sm text-gray-700 hover:text-blue-600 hover:bg-white rounded-lg transition-colors"
                            >
                              {subcategory.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Desktop Grid View */}
          <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category) => {
              const Icon = (LucideIcons as any)[category.icon] || LucideIcons.Store;
              return (
                <div key={category.id} className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-all duration-200 overflow-hidden group">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {category.subcategories?.length || 0} types
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </h3>
                    
                    {category.description && (
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {category.description}
                      </p>
                    )}

                    {category.subcategories && category.subcategories.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          Popular Types
                        </h4>
                        <div className="space-y-1">
                          {category.subcategories.slice(0, 3).map((subcategory) => (
                            <Link
                              key={subcategory.id}
                              href={`/stores?categoryId=${subcategory.id}`}
                              className="block text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded transition-colors"
                            >
                              {subcategory.name}
                            </Link>
                          ))}
                          {category.subcategories.length > 3 && (
                            <Link
                              href={`/stores?categoryId=${category.id}`}
                              className="block text-sm text-blue-600 hover:text-blue-700 px-2 py-1 font-medium"
                            >
                              +{category.subcategories.length - 3} more
                            </Link>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
                    <Link
                      href={`/stores?categoryId=${category.id}`}
                      className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center justify-between group"
                    >
                      Explore Stores
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Popular Categories Section */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Trending This Week</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularCategories.map((category, index) => (
              <div key={index} className="bg-white rounded-lg p-4 shadow-sm border">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{category.name}</h3>
                  <span className="text-green-600 text-sm font-medium">{category.trend}</span>
                </div>
                <p className="text-sm text-gray-600">{category.count}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}