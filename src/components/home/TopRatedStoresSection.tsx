"use client";
import { StoreCard } from "@/components/ui/StoreCard";
import Link from "next/link";

interface Store {
  id: string;
  name: string;
  desc: string;
  tags: string[];
  category: string;
  logo: string | null;
  rating: number;
  score: number;
  verified: boolean;
  claimed: boolean;
  country: string;
  link: string;
  reviewCount: number;
  trustScore: string;
  monthlyVisitors: string;
  founded: string;
}

interface TopRatedStoresSectionProps {
  stores: Store[];
  getTrustScoreColor: (score: string) => string;
}

export function TopRatedStoresSection({ stores, getTrustScoreColor }: TopRatedStoresSectionProps) {
  return (
    <section className="py-12 sm:py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-8 sm:mb-12 gap-4 sm:gap-0">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 text-gray-900">Top Rated Stores</h2>
            <p className="text-gray-600 text-lg max-w-2xl">Discover the most trusted online stores with excellent reviews</p>
          </div>
          <Link
            href="/stores"
            className="text-orange-600 hover:text-orange-700 flex items-center text-sm sm:text-base font-medium group whitespace-nowrap self-start sm:self-auto"
          >
            View all
            <svg className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        
        {/* Mobile: Horizontal scroll */}
        <div className="md:hidden">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
            {stores.map((store) => (
              <div key={store.id} className="flex-shrink-0 w-[280px]">
                <StoreCard
                  id={store.id}
                  name={store.name}
                  description={store.desc}
                  category={store.country}
                  rating={store.rating}
                  reviewCount={store.reviewCount}
                  trustScore={store.trustScore}
                  link={store.link}
                  isVerified={store.verified}
                  isClaimed={store.claimed}
                  getTrustScoreColor={getTrustScoreColor}
                  avatarGradient="from-blue-100 to-purple-100 text-blue-600"
                  showFullLink={true}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: Grid layout */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {stores.map((store) => (
            <div key={store.id} className="h-full">
                <StoreCard
                  id={store.id}
                  name={store.name}
                  description={store.desc}
                  category={store.country}
                  rating={store.rating}
                  reviewCount={store.reviewCount}
                  trustScore={store.trustScore}
                  link={store.link}
                  isVerified={store.verified}
                  isClaimed={store.claimed}
                  getTrustScoreColor={getTrustScoreColor}
                  avatarGradient="from-blue-100 to-purple-100 text-blue-600"
                  showFullLink={true}
                />
              </div>
          ))}
        </div>
      </div>
    </section>
  );
} 