"use client";

import { Shield, CheckCircle, Users, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function WhyTrustReviewsCard() {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
          <Shield className="w-5 h-5 text-blue-600" />
          Why Trust Our Reviews?
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="flex-shrink-0 text-blue-600">
              <CheckCircle className="w-5 h-5" />
            </div>
            <p className="text-sm text-gray-700">Only verified purchases can leave reviews</p>
          </div>
          <div className="flex gap-3">
            <div className="flex-shrink-0 text-blue-600">
              <Users className="w-5 h-5" />
            </div>
            <p className="text-sm text-gray-700">Reviews are collected from real customers across multiple platforms</p>
          </div>
          <div className="flex gap-3">
            <div className="flex-shrink-0 text-blue-600">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <p className="text-sm text-gray-700">Advanced AI system detects and prevents fake reviews</p>
          </div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg mt-4">
          <p className="text-sm text-blue-800">
            Want to learn more about our review verification process?{' '}
            <a href="/faq" className="text-blue-600 hover:underline">Read our FAQ</a>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}


