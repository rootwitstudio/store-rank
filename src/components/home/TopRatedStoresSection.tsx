"use client";
import { CheckCircle, Star, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
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
        <div className="flex justify-between items-end mb-8 sm:mb-12">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 text-gray-900">Top Rated Stores</h2>
            <p className="text-gray-600 text-lg max-w-2xl">Discover the most trusted online stores with excellent reviews</p>
          </div>
          <Link
            href="/stores"
            className="text-blue-600 hover:text-blue-700 flex items-center text-sm sm:text-base font-medium group"
          >
            View All
            <svg className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stores.map((store) => (
            <div key={store.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center text-blue-600 text-lg font-bold mr-3">
                    {store.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{store.name}</h3>
                    <p className="text-sm text-gray-500">{store.country}</p>
                  </div>
                </div>
                {store.verified && (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{store.desc}</p>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < store.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm font-medium">{store.rating}</span>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getTrustScoreColor(store.trustScore)}`}>
                  {store.trustScore}
                </span>
              </div>

              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500">{store.reviewCount} reviews</span>
                <span className="text-sm text-gray-500">{store.monthlyVisitors} monthly</span>
              </div>

              <div className="flex items-center justify-between">
                <a
                  href={store.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Visit Store
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
                <Link href={`/stores/${store.id}`}>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 