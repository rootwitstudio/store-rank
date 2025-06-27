import { Header } from "@/components/header";
import Link from "next/link";
import { Store, Grid3X3, BarChart3, Heart, Settings } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      <div className="flex">
        {/* Sidebar Navigation */}
        <nav className="w-64 bg-white shadow-sm border-r min-h-[calc(100vh-4rem)] p-4">
          <div className="space-y-2">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2">
              Explore
            </h2>

            <Link
              href="/stores"
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors group"
            >
              <Store className="h-4 w-4 group-hover:text-blue-600" />
              All Stores
            </Link>

            <Link
              href="/categories"
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors group"
            >
              <Grid3X3 className="h-4 w-4 group-hover:text-blue-600" />
              Categories
            </Link>

            <Link
              href="/trending"
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors group"
            >
              <BarChart3 className="h-4 w-4 group-hover:text-blue-600" />
              Trending
            </Link>

            <div className="pt-4 mt-4 border-t border-gray-200">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2">
                Personal
              </h2>

              <Link
                href="/favorites"
                className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors group"
              >
                <Heart className="h-4 w-4 group-hover:text-blue-600" />
                Favorites
              </Link>

              <Link
                href="/settings"
                className="flex items-center gap-2 text-xl sm:text-2xl font-bold tracking-tight hover:opacity-90 transition-opacity"
              >
                <Settings className="h-4 w-4 group-hover:text-blue-600" />
                Settings
              </Link>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
