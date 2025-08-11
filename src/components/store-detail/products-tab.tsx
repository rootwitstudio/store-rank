import React from "react";
import { Package } from "lucide-react";

export interface ProductsTabProps {
  storeId: string;
}

export function ProductsTab({ storeId }: ProductsTabProps) {
  return (
    <section className="py-6">
      <div className="h-[220px] flex flex-col items-center justify-center text-center px-4 border rounded-xl bg-gray-50">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
          <Package className="w-6 h-6 text-blue-600" />
        </div>
        <h3 className="text-base font-semibold text-gray-900 mb-1">Products</h3>
        <p className="text-sm text-gray-600">
          Product list coming soon for store {storeId}.
        </p>
      </div>
    </section>
  );
}
