"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Header } from "@/components/header";
import StoreList from "./StoreList";

// Mock data for stores
const mockStores = [
  {
    id: "1",
    name: "Store A",
    desc: "Trendy fashion for all ages.",
    tags: ["Free Shipping", "Eco-friendly"],
    categoryId: "111f70a8-f143-4b04-bbf3-309d3abc3184",
    category: "Electronics",
    logo: null,
    rating: 4.5,
    score: 8.7,
    verified: true,
    claimed: true,
    country: "United States",
    link: "#",
  },
  {
    id: "2",
    name: "Store B",
    desc: "Latest electronics and gadgets.",
    tags: ["Discounts", "Online Only"],
    categoryId: "111f70a8-f143-4b04-bbf3-309d3abc3184",
    category: "Electronics",
    logo: null,
    rating: 4.2,
    score: 8.2,
    verified: false,
    claimed: false,
    country: "United Kingdom",
    link: "#",
  },
  {
    id: "3",
    name: "Store C",
    desc: "Home essentials and decor.",
    tags: ["Local"],
    categoryId: "222f70a8-f143-4b04-bbf3-309d3abc3184",
    category: "Home",
    logo: null,
    rating: 4.8,
    score: 9.1,
    verified: true,
    claimed: true,
    country: "India",
    link: "#",
  },
  {
    id: "4",
    name: "Store D",
    desc: "Fresh food delivered to your door.",
    tags: ["Free Shipping", "Discounts"],
    categoryId: "333f70a8-f143-4b04-bbf3-309d3abc3184",
    category: "Food",
    logo: null,
    rating: 4.0,
    score: 7.9,
    verified: false,
    claimed: true,
    country: "Germany",
    link: "#",
  },
];

export default function StoresPage() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");
  const [stores, setStores] = useState(mockStores);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categoryName, setCategoryName] = useState("All Categories");

  useEffect(() => {
    setLoading(true);
    try {
      // Filter stores based on categoryId
      const filteredStores = categoryId
        ? mockStores.filter((store) => store.categoryId === categoryId)
        : mockStores;
      setStores(filteredStores);

      // Determine category name for display
      if (categoryId && filteredStores.length > 0) {
        setCategoryName(filteredStores[0].category);
      } else if (!categoryId) {
        setCategoryName("All Categories");
      }
    } catch (error) {
      console.error("Error filtering stores:", error);
      setError("Failed to load stores. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [categoryId]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Loading stores...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <StoreList stores={stores} category={categoryName} />
      </main>
    </div>
  );
}
