"use client";

import { TrendingUp } from "lucide-react";

export function StoreAnalyticsCard() {
  return (
    <div className="bg-white shadow-sm rounded-lg border">
      <div className="p-3 pb-2">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          Store Analytics
        </h3>
      </div>
      <div className="px-3 pb-3">
        <div className="grid grid-cols-3 divide-x divide-gray-200">
          <div className="text-center px-2">
            <div className="text-lg sm:text-2xl font-bold text-gray-900">98%</div>
            <div className="text-xs text-gray-600">Trust Score</div>
          </div>
          <div className="text-center px-2">
            <div className="text-lg sm:text-2xl font-bold text-gray-900">95%</div>
            <div className="text-xs text-gray-600">Response Rate</div>
          </div>
          <div className="text-center px-2">
            <div className="text-lg sm:text-2xl font-bold text-gray-900">2h</div>
            <div className="text-xs text-gray-600">Avg. Response Time</div>
          </div>
        </div>
      </div>
    </div>
  );
}


