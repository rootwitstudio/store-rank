"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Menu, X, Shield, User, Building2, MapPin, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/stores/authStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("IN");
  const { user, logout, accessToken } = useAuth();
  const router = useRouter();

  const handleBusinessClick = () => {
    router.push("/business/register");
  };

  const countries = [
    { code: "IN", name: "India", flag: "🇮🇳" },
    { code: "US", name: "United States", flag: "🇺🇸" },
    { code: "UK", name: "United Kingdom", flag: "🇬🇧" },
    { code: "CA", name: "Canada", flag: "🇨🇦" },
    { code: "AU", name: "Australia", flag: "🇦🇺" },
  ];

  const currentCountry = countries.find(c => c.code === selectedCountry) || countries[0];

  return (
    <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex h-14 sm:h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-lg sm:text-xl lg:text-2xl font-bold tracking-tight hover:opacity-90 transition-opacity flex-shrink-0"
          >
            <div className="relative flex h-7 w-7 sm:h-8 sm:w-8 lg:h-10 lg:w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 shadow-md">
              <Shield className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-white" />
            </div>
            <span className="hidden xs:inline text-base sm:text-lg lg:text-xl">StoreRankly</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
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

          {/* Right side: Auth Buttons and Country Selection */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Desktop Auth Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              {user && accessToken ? (
                <div className="flex items-center gap-3">
                  {user?.role === "BUSINESS" && (
                    <Link
                      href="/dashboard"
                      className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      Dashboard
                    </Link>
                  )}
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-3 w-3 text-blue-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 max-w-24 truncate">
                      {user.name || user.email}
                    </span>
                  </div>
                  <button
                    onClick={logout}
                    className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Login
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleBusinessClick}
                    className="text-xs px-3 py-1.5 h-8"
                  >
                    For Business
                  </Button>
                </>
              )}
            </div>

            {/* Country Selection */}
            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger className="w-auto border-0 shadow-none hover:bg-gray-100 px-2 py-1 h-auto gap-1 text-xs sm:text-sm">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />
                  <span className="hidden sm:inline font-medium">{currentCountry.code}</span>
                  <span className="sm:hidden text-lg">{currentCountry.flag}</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country.code} value={country.code}>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{country.flag}</span>
                      <span>{country.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-gray-700 hover:text-black transition-colors rounded-lg hover:bg-gray-100 flex-shrink-0"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              ) : (
                <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t bg-white/95 backdrop-blur-sm shadow-lg rounded-b-lg mx-[-12px] sm:mx-[-16px]">
            <nav className="flex flex-col py-2">
              {/* Navigation Links */}
              <Link
                href="/categories"
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Shield className="h-4 w-4 text-blue-600" />
                </div>
                Categories
              </Link>

              <Link
                href="/blogs"
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <Search className="h-4 w-4 text-green-600" />
                </div>
                Blogs
              </Link>

              {/* Auth Section */}
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                {user && accessToken ? (
                  <div className="space-y-3">
                    {/* User Info */}
                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {user.name || 'User'}
                        </p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>
                    </div>

                    {/* Dashboard Link for Business Users */}
                    {user?.role === "BUSINESS" && (
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-3 p-3 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Building2 className="h-4 w-4" />
                        Dashboard
                      </Link>
                    )}

                    {/* Logout Button */}
                    <button
                      className="flex items-center gap-3 p-3 w-full text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                    >
                      <X className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link
                      href="/login"
                      className="flex items-center justify-center gap-2 w-full p-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="h-4 w-4" />
                      Login
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-center gap-2 p-3 h-auto"
                      onClick={() => {
                        handleBusinessClick();
                        setIsMenuOpen(false);
                      }}
                    >
                      <Building2 className="h-4 w-4" />
                      For Business
                    </Button>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
