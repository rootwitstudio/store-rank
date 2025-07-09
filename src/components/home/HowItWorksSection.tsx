"use client";
import { Search, Eye, Shield } from "lucide-react";

interface HowItWorksStep {
  step: number;
  title: string;
  description: string;
  icon: React.ElementType;
}

interface HowItWorksSectionProps {
  steps: HowItWorksStep[];
}

export function HowItWorksSection({ steps }: HowItWorksSectionProps) {
  return (
    <section className="py-12 sm:py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-end mb-8 sm:mb-12">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 text-gray-900">How StoreRankly Works</h2>
            <p className="text-gray-600 text-lg max-w-2xl">Making online shopping safer and smarter with verified reviews and trusted store information</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.step} className="text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto">
                    <Icon className="h-10 w-10 text-blue-600" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
} 