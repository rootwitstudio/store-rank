import React from "react";
import { Shield } from "lucide-react";

export interface PoliciesTabProps {
  storeId: string;
}

export function PoliciesTab({ storeId }: PoliciesTabProps) {
  return (
    <section className="py-6">
      <div className="h-[220px] flex flex-col items-center justify-center text-center px-4 border rounded-xl bg-gray-50">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
          <Shield className="w-6 h-6 text-blue-600" />
        </div>
        <h3 className="text-base font-semibold text-gray-900 mb-1">Policies</h3>
        <p className="text-sm text-gray-600">
          Shipping, return and warranty policies for store {storeId}.
        </p>
      </div>
    </section>
  );
}
