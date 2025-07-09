"use client";

export function TrustedByMillionsSection() {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-end mb-8 sm:mb-12">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 text-gray-900">Trusted by Millions</h2>
            <p className="text-gray-600 text-lg max-w-2xl">Join our growing community of smart shoppers making informed decisions every day</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">50K+</div>
            <div className="text-gray-600">Verified Stores</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-green-600 mb-2">2M+</div>
            <div className="text-gray-600">Customer Reviews</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-purple-600 mb-2">180+</div>
            <div className="text-gray-600">Countries</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-orange-600 mb-2">100K+</div>
            <div className="text-gray-600">Daily Visitors</div>
          </div>
        </div>
      </div>
    </section>
  );
} 