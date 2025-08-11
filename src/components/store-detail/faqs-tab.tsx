import React from "react";
import { HelpCircle } from "lucide-react";

export interface FAQsTabProps {
  storeId: string;
}

export function FAQsTab({ storeId }: FAQsTabProps) {
  return (
    <section className="py-6">
      <div className="h-[220px] flex flex-col items-center justify-center text-center px-4 border rounded-xl bg-gray-50">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
          <HelpCircle className="w-6 h-6 text-blue-600" />
        </div>
        <h3 className="text-base font-semibold text-gray-900 mb-1">FAQs</h3>
        <p className="text-sm text-gray-600">
          Frequently asked questions will appear here for store {storeId}.
        </p>
      </div>
    </section>
  );
}
