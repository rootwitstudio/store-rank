"use client";

import { Award, Calendar, Clock, Star, Truck, HeartHandshake } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { StoreDetails } from "@/stores/storeDetailsStore";

export function StoreHighlightsCard({ store }: { store: Partial<StoreDetails> | null | undefined }) {
  // Calculate years in business if founded year is available
  const yearsInBusiness = store?.foundedYear ? new Date().getFullYear() - parseInt(store.foundedYear) : null;
  
  return (
    <div className="bg-white shadow-sm rounded-lg border">
      <div className="p-3 pb-2">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Award className="w-5 h-5 text-blue-600" />
          Store Highlights
        </h3>
      </div>
      <div className="px-3 pb-3">
        <div className="grid grid-cols-2 divide-x divide-gray-200">
          {/* Years in Business */}
          {yearsInBusiness && yearsInBusiness > 0 ? (
            <div className="text-center px-2 py-2">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Calendar className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-lg sm:text-2xl font-bold text-gray-900">{yearsInBusiness}+</div>
              <div className="text-xs text-gray-600">Years in Business</div>
            </div>
          ) : (
            <div className="text-center px-2 py-2">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Award className="w-4 h-4 text-green-600" />
              </div>
              <div className="text-lg sm:text-2xl font-bold text-gray-900">98%</div>
              <div className="text-xs text-gray-600">Trust Score</div>
            </div>
          )}

          {/* Return Policy */}
          <div className="text-center px-2 py-2">
            <div className="flex items-center justify-center gap-1 mb-1">
              <HeartHandshake className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-lg sm:text-2xl font-bold text-gray-900">30</div>
            <div className="text-xs text-gray-600">Day Returns</div>
          </div>

          {/* Shipping Speed */}
          <div className="text-center px-2 py-2">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Truck className="w-4 h-4 text-green-600" />
            </div>
            <div className="text-lg sm:text-2xl font-bold text-gray-900">1-3</div>
            <div className="text-xs text-gray-600">Days Shipping</div>
          </div>

          {/* Customer Support */}
          <div className="text-center px-2 py-2">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Clock className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-lg sm:text-2xl font-bold text-gray-900">24/7</div>
            <div className="text-xs text-gray-600">Support</div>
          </div>
        </div>

        {/* Shopping Benefits */}
        <div className="flex flex-wrap gap-2 mt-3">
          <Badge className="bg-green-50 text-green-700 border-green-200">
            <Truck className="w-3 h-3 mr-1" />
            Free Shipping
          </Badge>
          <Badge className="bg-blue-50 text-blue-700 border-blue-200">
            <HeartHandshake className="w-3 h-3 mr-1" />
            Easy Returns
          </Badge>
          <Badge className="bg-purple-50 text-purple-700 border-purple-200">
            <Award className="w-3 h-3 mr-1" />
            Quality Guaranteed
          </Badge>
        </div>
      </div>
    </div>
  );
}


