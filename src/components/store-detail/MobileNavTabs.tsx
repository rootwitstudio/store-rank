"use client";

import { LayoutDashboard, MessageSquare, Image, Info } from "lucide-react";

interface MobileNavTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  reviewCount: number;
  photoCount: number;
}

export function MobileNavTabs({
  activeTab,
  onTabChange,
  reviewCount,
  photoCount
}: MobileNavTabsProps) {
  const tabs = [
    {
      id: "overview",
      label: "Overview",
      icon: <LayoutDashboard className="w-4 h-4" />
    },
    {
      id: "reviews",
      label: `Reviews (${reviewCount})`,
      icon: <MessageSquare className="w-4 h-4" />
    },
    {
      id: "photos",
      label: `Photos (${photoCount})`,
      icon: <Image className="w-4 h-4" />
    },
    {
      id: "about",
      label: "About",
      icon: <Info className="w-4 h-4" />
    }
  ];

  return (
    <div className="sticky top-16 z-40 bg-white border-b lg:hidden">
      <div className="container mx-auto px-4">
        <nav className="flex overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "text-blue-600 border-blue-600"
                  : "text-gray-600 border-transparent hover:text-gray-900 hover:border-gray-200"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}