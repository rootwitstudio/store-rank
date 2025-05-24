"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/app/stores/page";

interface Store {
  id: string;
  name: string;
  desc: string;
  tags: string[];
  rating: number;
  link: string;
  country: string;
}

interface StoreCardProps {
  store: Store;
}

export function StoreCard({ store }: StoreCardProps) {
  const router = useRouter();

  return (
    <div className="bg-white rounded-lg p-6 mb-8 shadow-sm border-t border-gray-200">
      <div className="flex items-start mb-4">
        <div className="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center text-gray-600 font-bold text-sm mr-4">
          {store.name.charAt(0)}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-lg font-semibold">{store.name}</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push(`/stores/${store.id}`)}
            >
              View Details
            </Button>
          </div>
          <a
            href={store.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:text-blue-800 hover:underline mb-1 block"
          >
            {store.link.replace(/^https?:\/\//, "")}
          </a>
          <p className="text-sm text-gray-600 mb-2">{store.desc}</p>
          <div className="flex items-center mb-2">
            <StarRating rating={store.rating} />
            <span className="ml-2 text-sm text-gray-600">
              ({store.rating.toFixed(1)})
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {store.tags.map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
