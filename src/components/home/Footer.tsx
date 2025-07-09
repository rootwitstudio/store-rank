"use client";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t py-8 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8">
          <div>
            <h3 className="font-semibold mb-3">For Shoppers</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/categories" className="hover:text-blue-600">Browse Categories</Link></li>
              <li><Link href="/trending" className="hover:text-blue-600">Trending Stores</Link></li>
              <li><Link href="/verified" className="hover:text-blue-600">Verified Stores</Link></li>
              <li><Link href="/reviews" className="hover:text-blue-600">Recent Reviews</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">For Businesses</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/business/register" className="hover:text-blue-600">List Your Store</Link></li>
              <li><Link href="/business/pricing" className="hover:text-blue-600">Pricing</Link></li>
              <li><Link href="/business/features" className="hover:text-blue-600">Features</Link></li>
              <li><Link href="/business/support" className="hover:text-blue-600">Business Support</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Support</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/help" className="hover:text-blue-600">Help Center</Link></li>
              <li><Link href="/contact" className="hover:text-blue-600">Contact Us</Link></li>
              <li><Link href="/report" className="hover:text-blue-600">Report a Store</Link></li>
              <li><Link href="/guidelines" className="hover:text-blue-600">Community Guidelines</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Company</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/about" className="hover:text-blue-600">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-blue-600">Careers</Link></li>
              <li><Link href="/press" className="hover:text-blue-600">Press</Link></li>
              <li><Link href="/blog" className="hover:text-blue-600">Blog</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
          <div className="flex items-center gap-6 mb-4 sm:mb-0">
            <Link href="/privacy" className="hover:text-blue-600">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-blue-600">Terms of Service</Link>
            <Link href="/cookies" className="hover:text-blue-600">Cookie Policy</Link>
          </div>
          <div className="text-center sm:text-right">
            © 2024 StoreRankly. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
} 