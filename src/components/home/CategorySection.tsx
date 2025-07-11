"use client";
import { Shirt, Monitor, Utensils, Sofa, BookOpen, Heart, Store, Sparkles, Dumbbell, Gamepad2, Car } from "lucide-react";
import Link from "next/link";

interface Category {
  id: string;
  name: string;
  description: string | null;
  icon: string;
  parentId: string | null;
}

interface CategorySectionProps {
  categories: Category[];
  loadingCategories: boolean;
  categoryError: string | null;
}

const iconMap: Record<string, React.ElementType> = {
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

export function CategorySection({ categories, loadingCategories, categoryError }: CategorySectionProps) {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-8 sm:mb-12 gap-4 sm:gap-0">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 text-gray-900">Browse by Category</h2>
            <p className="text-gray-600 text-lg max-w-2xl">Find stores in your favorite shopping categories</p>
          </div>
          <Link
            href="/categories"
            className="text-orange-600 hover:text-orange-700 flex items-center text-sm sm:text-base font-medium group whitespace-nowrap self-start sm:self-auto"
          >
            View all
            <svg className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        
        {loadingCategories ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 rounded-lg h-24 sm:h-28"></div>
              </div>
            ))}
          </div>
        ) : categoryError ? (
          <p className="text-red-500 text-center">{categoryError}</p>
        ) : (
          <>
            {/* Mobile: Horizontal scroll */}
            <div className="md:hidden">
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
                {categories
                  .filter((category) => !category.parentId)
                  .slice(0, 10)
                  .map((category) => {
                    const Icon = iconMap[category.icon] || iconMap.Store;
                    return (
                      <Link
                        key={category.id}
                        href={`/stores?categoryId=${category.id}`}
                        className="group flex flex-col items-center justify-center p-4 bg-white rounded-xl hover:bg-blue-50 hover:shadow-lg transition-all duration-300 text-center border border-gray-100 hover:border-blue-200 flex-shrink-0 w-[140px] h-[140px]"
                      >
                        <Icon className="h-8 w-8 mb-2 text-blue-600 group-hover:text-blue-700 transition-colors group-hover:scale-110 transform duration-300" />
                        <span className="text-sm font-medium text-gray-900 group-hover:text-blue-700 transition-colors truncate w-full">
                          {category.name}
                        </span>
                      </Link>
                    );
                  })}
              </div>
            </div>
            {/* Desktop: Grid layout */}
            <div className="hidden md:grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
              {categories
                .filter((category) => !category.parentId)
                .slice(0, 10)
                .map((category) => {
                  const Icon = iconMap[category.icon] || iconMap.Store;
                  return (
                    <Link
                      key={category.id}
                      href={`/stores?categoryId=${category.id}`}
                      className="group flex flex-col items-center justify-center p-6 bg-white rounded-xl hover:bg-blue-50 hover:shadow-lg transition-all duration-300 text-center border border-gray-100 hover:border-blue-200 h-full"
                    >
                      <Icon className="h-10 w-10 mb-3 text-blue-600 group-hover:text-blue-700 transition-colors group-hover:scale-110 transform duration-300" />
                      <span className="text-base font-medium text-gray-900 group-hover:text-blue-700 transition-colors truncate w-full">
                        {category.name}
                      </span>
                    </Link>
                  );
                })}
            </div>
          </>
        )}
      </div>
    </section>
  );
} 