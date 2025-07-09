"use client";
import { Monitor, Shirt, Award, Activity } from "lucide-react";

interface IndustryInsight {
  title: string;
  value: string;
  description: string;
  icon: React.ElementType;
  trend: string;
  trendColor: string;
}

interface IndustryInsightsSectionProps {
  insights: IndustryInsight[];
}

export function IndustryInsightsSection({ insights }: IndustryInsightsSectionProps) {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-end mb-8 sm:mb-12">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 text-gray-900">Industry Insights</h2>
            <p className="text-gray-600 text-lg max-w-2xl">Stay ahead with the latest shopping trends and market insights from India</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {insights.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <Icon className="h-8 w-8 text-blue-600" />
                  <span className={`text-sm font-semibold px-2 py-1 rounded-full bg-white ${insight.trendColor}`}>
                    {insight.trend}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{insight.title}</h3>
                <div className="text-2xl font-bold text-blue-600 mb-2">{insight.value}</div>
                <p className="text-gray-600 text-sm">{insight.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
} 