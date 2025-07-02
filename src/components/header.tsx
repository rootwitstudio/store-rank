"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Menu, X, Shield, User, Building2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/stores/authStore";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, accessToken } = useAuth();
  const router = useRouter();
  
  const handleBusinessClick = () => {
    router.push("/business/register");
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.1)]">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-xl sm:text-2xl font-bold tracking-tight hover:opacity-90 transition-opacity"
          >
            <div className="relative flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 shadow-md">
              <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <span className="hidden sm:inline">StoreRankly</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/categories"
              className="relative text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-blue-600 after:transition-all hover:after:w-full"
            >
              Categories
            </Link>
            <Link
              href="/blogs"
              className="relative text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-blue-600 after:transition-all hover:after:w-full"
            >
              Blogs
            </Link>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user && accessToken ? (
              <>
                {user?.role === "BUSINESS" && (
                  <Link
                    href="/dashboard"
                    className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-blue-600 after:transition-all hover:after:w-full"
                  >
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-blue-600 after:transition-all hover:after:w-full"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-blue-600 after:transition-all hover:after:w-full"
                >
                  Login
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  className="ml-4"
                  onClick={handleBusinessClick}
                >
                  For Business
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-700 hover:text-black transition-colors rounded-lg hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-white/95 backdrop-blur-sm shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
            <nav className="flex flex-col py-4">
              <Link
                href="/categories"
                className="px-6 py-3 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 border-b border-gray-100 transition-colors"
              >
                Categories
              </Link>
              <Link
                href="/blogs"
                className="px-6 py-3 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 border-b border-gray-100 transition-colors"
              >
                Blogs
              </Link>
              <div className="px-6 py-3 border-b border-gray-100 space-y-2">
                {user && accessToken ? (
                  <>
                    {user?.role === "BUSINESS" && (
                      <Link href="/dashboard" className="w-full justify-start">
                        <Building2 className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    )}
                    <button
                      className="w-full justify-start shadow-sm hover:shadow"
                      onClick={logout}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="w-full justify-start">
                      Login
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start shadow-sm hover:shadow"
                      onClick={handleBusinessClick}
                    >
                      For Business
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
