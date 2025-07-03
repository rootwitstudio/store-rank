"use client";

import { Eye, MessageSquare, Package, Building, TrendingUp } from "lucide-react";

interface MobileNavTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  reviewCount: number;
}

export function MobileNavTabs({ activeTab, onTabChange, reviewCount }: MobileNavTabsProps) {
  const tabs = [
    { id: "overview", label: "Overview", icon: Eye },
    { id: "reviews", label: "Reviews", icon: MessageSquare, count: reviewCount },
    { id: "products", label: "Products", icon: Package },
    { id: "company", label: "Company", icon: Building },
    { id: "news", label: "News", icon: TrendingUp }
  ];

  return (
    <>
      {/* Mobile Tabs - Horizontal Scroll */}
      <div className="lg:hidden">
        <div className="border-b border-gray-200 bg-white sticky top-0 z-10">
          <div className="overflow-x-auto">
            <nav className="flex space-x-6 px-4 min-w-max">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`flex flex-col items-center py-3 px-2 border-b-2 font-medium text-xs whitespace-nowrap transition-colors min-w-0 ${
                      activeTab === tab.id
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500"
                    }`}
                  >
                    <Icon className="w-5 h-5 mb-1" />
                    <span className="truncate">
                      {tab.label}
                      {tab.count && (
                        <span className="ml-1 text-xs">
                          ({tab.count > 999 ? `${Math.floor(tab.count / 1000)}k` : tab.count})
                        </span>
                      )}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Desktop Tabs */}
      <div className="hidden lg:block">
        <div className="border-b border-gray-200 overflow-x-auto">
          <nav className="flex space-x-8 min-w-max">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                  {tab.count && (
                    <span className="text-xs">
                      ({tab.count.toLocaleString()})
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}