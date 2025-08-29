"use client";
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { blogApi } from "@/lib/api";

interface BlogPost {
  id: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  content: string;
  slug: string;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  publishedAt?: string;
  readTime: number;
  featured: boolean;
  image?: string;
  categoryId?: string;
  authorId?: string;
  createdAt: string;
  updatedAt: string;
}

interface IndustryInsightsSectionProps {
  insights?: BlogPost[]; // Optional prop for initial data
}

export function IndustryInsightsSection({
  insights: initialInsights,
}: IndustryInsightsSectionProps) {
  const [insights, setInsights] = useState<BlogPost[]>(initialInsights || []);
  const [isLoading, setIsLoading] = useState(!initialInsights);

  // Fetch featured blog posts from API if no initial data provided
  useEffect(() => {
    const fetchInsights = async () => {
      try {
        setIsLoading(true);
        const data = await blogApi.getFeatured(4);
        setInsights(data);
      } catch (error) {
        console.error("Failed to fetch blog posts:", error);
        // Fallback to empty array if API fails
        setInsights([]);
      } finally {
        setIsLoading(false);
      }
    };

    // Only fetch if no initial insights provided
    if (!initialInsights || initialInsights.length === 0) {
      fetchInsights();
    }
  }, [initialInsights]);

  // Update insights when initialInsights prop changes
  useEffect(() => {
    if (initialInsights && initialInsights.length > 0) {
      setInsights(initialInsights);
      setIsLoading(false);
    }
  }, [initialInsights]);

  if (isLoading) {
    return (
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-end mb-8 sm:mb-12">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 text-gray-900">
                Blog & News
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl">
                Stay updated with the latest shopping trends, market insights,
                and e-commerce innovations
              </p>
            </div>
          </div>

          <div className="md:hidden">
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse flex-shrink-0 w-[280px]"
                >
                  <div className="bg-gray-200 rounded-xl p-6 h-48"></div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 rounded-xl p-6 h-48"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-end mb-8 sm:mb-12">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 text-gray-900">
              Blog & News
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl">
              Stay updated with the latest shopping trends, market insights, and
              e-commerce innovations
            </p>
          </div>
          <Link
            href="/insights"
            className="text-blue-600 hover:text-blue-700 flex items-center text-sm sm:text-base font-medium group whitespace-nowrap"
          >
            View all articles
            <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="md:hidden">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
            {insights.map((insight) => {
              return (
                <Link
                  key={insight.id}
                  href={`/insights/${insight.slug}`}
                  className="flex-shrink-0 w-[280px] bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100 hover:shadow-lg transition-all duration-300 group"
                >
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {insight.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                    {insight.subtitle}
                  </p>
                  <p className="text-gray-700 text-sm line-clamp-3">
                    {insight.excerpt}
                  </p>
                  <div className="mt-4 text-sm font-medium text-blue-600 group-hover:text-blue-700">
                    Read more →
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {insights.map((insight) => {
            return (
              <Link
                key={insight.id}
                href={`/insights/${insight.slug}`}
                className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100 hover:shadow-lg transition-all duration-300 group"
              >
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {insight.title}
                </h3>
                <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                  {insight.subtitle}
                </p>
                <p className="text-gray-700 text-sm line-clamp-3">
                  {insight.excerpt}
                </p>
                <div className="mt-4 text-sm font-medium text-blue-600 group-hover:text-blue-700">
                  Read more →
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
