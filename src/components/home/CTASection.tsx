"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-12 sm:py-16 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Join Our Community of Smart Shoppers
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Share your shopping experiences, help others make better decisions, and discover new trusted stores in India.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" variant="outline" className="bg-white text-blue-600 hover:bg-gray-100 border-white">
                Write a Review
              </Button>
            </Link>
            <Link href="/business/register">
              <Button size="lg" className="bg-blue-700 hover:bg-blue-800 text-white">
                List Your Store
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
} 