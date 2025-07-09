"use client";
import { Shield, Award, AlertTriangle } from "lucide-react";

export function TrustSafetySection() {
  return (
    <section className="py-12 sm:py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-end mb-8 sm:mb-12">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 text-gray-900">Trust & Safety</h2>
            <p className="text-gray-600 text-lg max-w-2xl">We&apos;re committed to helping you make safe and informed shopping decisions with verified reviews and store ratings</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-green-50 rounded-xl border border-green-100 hover:shadow-lg transition-all duration-300">
            <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-green-800">Verified Stores</h3>
            <p className="text-green-700 text-sm">
              All stores undergo verification to ensure legitimacy and trustworthiness before listing.
            </p>
          </div>

          <div className="text-center p-6 bg-blue-50 rounded-xl border border-blue-100 hover:shadow-lg transition-all duration-300">
            <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-blue-800">Authentic Reviews</h3>
            <p className="text-blue-700 text-sm">
              Only verified customers can leave reviews, ensuring authentic and helpful feedback.
            </p>
          </div>

          <div className="text-center p-6 bg-red-50 rounded-xl border border-red-100 hover:shadow-lg transition-all duration-300">
            <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-red-800">Fraud Protection</h3>
            <p className="text-red-700 text-sm">
              We actively monitor and flag suspicious stores to protect our community from scams.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 