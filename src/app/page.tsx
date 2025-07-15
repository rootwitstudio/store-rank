"use client";
import { useState, useEffect, useCallback } from "react";
import { Header } from "@/components/header";
import { categoryApi } from "@/lib/api";

// Import all the new components
import { HeroSection } from "@/components/home/HeroSection";
import { CategorySection } from "@/components/home/CategorySection";
import { TopRatedStoresSection } from "@/components/home/TopRatedStoresSection";
import { RecentReviewsSection } from "@/components/home/RecentReviewsSection";
import { TrendingStoresSection } from "@/components/home/TrendingStoresSection";
import { IndustryInsightsSection } from "@/components/home/IndustryInsightsSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { SuccessStoriesSection } from "@/components/home/SuccessStoriesSection";
import { TrustSafetySection } from "@/components/home/TrustSafetySection";
import { TrustedByMillionsSection } from "@/components/home/TrustedByMillionsSection";
import { CTASection } from "@/components/home/CTASection";
import { Footer } from "@/components/home/Footer";

// Import data
import {
  featuredStores,
  recentReviews,
  trendingStores,
  howItWorks,
  industryInsights,
  successStories,
} from "@/components/home/data";

interface Category {
  id: string;
  name: string;
  description: string | null;
  icon: string;
  parentId: string | null;
}

export default function HomePage() {
  const [selectedLocation] = useState("India");
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [categoryError, setCategoryError] = useState<string | null>(null);

  const getTrustScoreColor = useCallback((score: number | string) => {
    const numericScore = typeof score === 'string' ? parseFloat(score) : score;

    if (isNaN(numericScore)) {
      switch (score) {
        case "Excellent":
          return "text-green-600 bg-green-100";
        case "Great":
          return "text-blue-600 bg-blue-100";
        case "Good":
          return "text-yellow-600 bg-yellow-100";
        default:
          return "text-gray-600 bg-gray-100";
      }
    }
    
    if (numericScore >= 4.5) return "text-green-600 bg-green-100"; // Excellent
    if (numericScore >= 4.0) return "text-green-500 bg-green-50"; // Great
    if (numericScore >= 3.5) return "text-blue-600 bg-blue-100"; // Good
    if (numericScore >= 3.0) return "text-blue-500 bg-blue-50"; // Average
    if (numericScore >= 2.5) return "text-yellow-600 bg-yellow-100"; // Fair
    if (numericScore >= 2.0) return "text-yellow-500 bg-yellow-50"; // Poor
    if (numericScore > 0) return "text-red-600 bg-red-100"; // Bad
    return "text-gray-600 bg-gray-100"; // No score
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const data = await categoryApi.getAll();
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

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection 
          selectedLocation={selectedLocation}
          getTrustScoreColor={getTrustScoreColor}
        />
        
        <CategorySection 
          categories={categories}
          loadingCategories={loadingCategories}
          categoryError={categoryError}
        />
        
        <TopRatedStoresSection 
          stores={featuredStores}
          getTrustScoreColor={getTrustScoreColor}
        />
        
        <RecentReviewsSection 
          reviews={recentReviews}
        />
        
        <TrendingStoresSection 
          stores={trendingStores}
          getTrustScoreColor={getTrustScoreColor}
        />
        
        <IndustryInsightsSection 
          insights={industryInsights}
        />
        
        <HowItWorksSection 
          steps={howItWorks}
        />
        
        <SuccessStoriesSection 
          stories={successStories}
        />
        
        <TrustSafetySection />
        
        <TrustedByMillionsSection />
        
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
