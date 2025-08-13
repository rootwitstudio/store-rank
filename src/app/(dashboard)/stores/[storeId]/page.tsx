"use client";

import { use, useEffect, useState } from "react";
import { Star, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useStoreDetails } from "@/stores/storeDetailsStore";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { OverviewTab } from "@/components/store-detail/overview-tab";
import { ReviewsTab } from "@/components/store-detail/reviews-tab";
import { ProductsTab } from "@/components/store-detail/products-tab";
import { FAQsTab } from "@/components/store-detail/faqs-tab";
import { PoliciesTab } from "@/components/store-detail/policies-tab";

function ensureHttps(url: string) {
  if (!url) return url;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `https://${url}`;
}

function formatFollowers(count: number): string {
  if (count >= 10000000) return `${(count / 10000000).toFixed(1)}Cr`; // Crore
  if (count >= 100000) return `${(count / 100000).toFixed(1)}L`; // Lakh
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
  return `${count}`;
}

export default function StoreDetailPage({
  params,
}: {
  params: Promise<{ storeId: string }>;
}) {
  const { storeId } = use(params);
  const { storeDetails, fetchStore } = useStoreDetails();
  const { data: store } = storeDetails;

  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (storeId) fetchStore(storeId);
  }, [storeId, fetchStore]);

  const followersCount: number = (store as any)?.followers ?? 532000; // fallback example
  const followersDisplay = formatFollowers(followersCount);

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-0 md:px-4 py-0 md:py-6">
        {/* Store Header (Top Section Only) */}
        <div className="mb-8 md:mb-8">
          {/* Mobile Layout */}
          <div className="block sm:hidden">
            {/* Company Information Section */}
            <div className="bg-white p-4">
              <div className="text-center">
                {/* Company Logo - Above name */}
                <div className="flex justify-center mb-3">
                  <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center shadow-sm border border-gray-100">
                    {store?.logo ? (
                      <img
                        src={store.logo}
                        alt={`${store?.name} logo`}
                        className="w-12 h-12 object-contain rounded-md"
                      />
                    ) : (
                      <span className="text-xl font-bold text-blue-600">
                        {store?.name?.charAt(0) || "S"}
                      </span>
                    )}
                  </div>
                </div>

                {/* Company Name */}
                <h1 className="text-lg font-bold text-gray-900 mb-2">
                  {store?.name}
                </h1>

                {/* Rating and Review Count */}
                <div className="flex items-center justify-center gap-2 text-gray-700 mb-3">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="font-bold text-gray-900">
                    {(store?.rating || 0).toFixed(1)}
                  </span>
                  <span className="text-sm text-gray-900">
                    ({(store?.totalRatings || 0).toLocaleString()} reviews)
                  </span>
                </div>

                {/* Tags/Categories */}
                <div className="flex flex-wrap justify-center gap-1.5 mb-4">
                  {store?.storeCategories?.slice(0, 2).map((category) => (
                    <Badge
                      key={category.id}
                      variant="outline"
                      className="px-2 py-1 text-xs rounded-full text-gray-700 border-gray-200 bg-gray-50"
                    >
                      {category?.category?.name}
                    </Badge>
                  ))}
                  {Array.isArray(store?.tags) &&
                    store!.tags!.slice(0, 1).map((tag, idx) => (
                      <Badge
                        key={`tag-${idx}`}
                        variant="outline"
                        className="px-2 py-1 text-xs rounded-full text-gray-700 border-gray-200 bg-gray-50"
                      >
                        {tag}
                      </Badge>
                    ))}
                </div>

                {/* Website link if available */}
                {store?.website && (
                  <div className="mb-3">
                    <a
                      href={ensureHttps(store.website)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 underline"
                    >
                      {store.website}
                    </a>
                  </div>
                )}

                {/* Description preview */}
                {store?.description && (
                  <p className="text-xs text-gray-600 mb-4">
                    {store.description}
                  </p>
                )}

                {/* Action Buttons - Two horizontal buttons */}
                <div className="flex gap-2">
                  <Button className="flex-1 rounded-lg bg-blue-600 hover:bg-blue-700 h-9 px-4 text-white text-sm font-medium">
                    Write a Review
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 rounded-lg h-9 px-4 text-sm border-blue-600 text-blue-600 hover:bg-blue-50"
                    onClick={() => setIsFollowing((v) => !v)}
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Follow ({followersDisplay})
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:block">
            <div className="flex flex-col lg:flex-row gap-6 justify-between">
              {/* Left: Logo + Store Info */}
              <div className="flex flex-col sm:flex-row gap-6 flex-1">
                <div className="flex-shrink-0 self-center sm:self-start">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center shadow-lg">
                    {store?.logo ? (
                      <img
                        src={store.logo}
                        alt={`${store?.name} logo`}
                        className="w-20 h-20 sm:w-24 sm:h-24 object-contain rounded-xl"
                      />
                    ) : (
                      <span className="text-2xl sm:text-4xl font-bold text-blue-600">
                        {store?.name?.charAt(0) || "S"}
                      </span>
                    )}
                  </div>
                </div>

                {/* Store Details */}
                <div className="flex-1">
                  <div className="flex flex-col gap-2">
                    <div className="flex-1 flex flex-col space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-baseline gap-3">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
                          {store?.name}
                        </h1>
                        <div className="flex items-center gap-1.5 text-gray-700 text-sm sm:text-base leading-tight">
                          <Star className="w-4 h-4 text-yellow-400 fill-current relative top-[1px]" />
                          <span className="font-medium">
                            {(store?.rating || 0).toFixed(1)}
                          </span>
                          <span className="text-gray-500">
                            ({store?.totalRatings || 0} reviews)
                          </span>
                        </div>
                      </div>
                      {store?.website && (
                        <a
                          href={ensureHttps(store.website)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-md text-blue-600 hover:underline break-all"
                        >
                          {store.website}
                        </a>
                      )}

                      {/* Optional description preview */}
                      {store?.description && (
                        <p className="text-gray-600 leading-relaxed text-sm sm:text-base line-clamp-2">
                          {store.description}
                        </p>
                      )}

                      <div className="flex flex-wrap items-center gap-2">
                        {store?.storeCategories?.map((category) => (
                          <Badge
                            key={category.id}
                            variant="outline"
                            className="px-3 py-1 text-xs rounded-full text-gray-700 border-gray-200"
                          >
                            {category?.category?.name}
                          </Badge>
                        ))}
                        {Array.isArray(store?.tags) &&
                          store!.tags!.slice(0, 3).map((tag, idx) => (
                            <Badge
                              key={`tag-${idx}`}
                              variant="outline"
                              className="px-3 py-1 text-xs rounded-full text-gray-700 border-gray-200"
                            >
                              {tag}
                            </Badge>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: CTA buttons */}
              <div className="w-full lg:w-auto flex-shrink-0">
                <div className="flex items-center justify-start lg:justify-end gap-4">
                  <Button className="rounded-full bg-blue-600 hover:bg-blue-700 h-9 px-4 text-white text-sm font-semibold">
                    Write a Review
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-full h-9 px-4 text-sm border-blue-600 text-blue-600 hover:bg-blue-50"
                    onClick={() => setIsFollowing((v) => !v)}
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    {isFollowing ? "Following" : `Follow (${followersDisplay})`}
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {/* Tabs */}
          <div className="mt-6 md:mt-8">
            <Tabs defaultValue="overview">
              <div className="overflow-x-auto scrollbar-hide">
                <TabsList className="bg-transparent p-0 gap-1 border-b w-max rounded-none h-auto min-w-full">
                  <TabsTrigger
                    value="overview"
                    className="relative rounded-none border-b-2 border-transparent px-3 py-2 text-sm text-gray-600 hover:text-gray-900 data-[state=active]:text-blue-700 data-[state=active]:font-semibold data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:-bottom-[1px] data-[state=active]:after:h-0.5 data-[state=active]:after:bg-blue-600 whitespace-nowrap"
                  >
                    Overview
                  </TabsTrigger>
                  <TabsTrigger
                    value="reviews"
                    className="relative rounded-none border-b-2 border-transparent px-3 py-2 text-sm text-gray-600 hover:text-gray-900 data-[state=active]:text-blue-700 data-[state=active]:font-semibold data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:-bottom-[1px] data-[state=active]:after:h-0.5 data-[state=active]:after:bg-blue-600 whitespace-nowrap"
                  >
                    Reviews
                  </TabsTrigger>
                  <TabsTrigger
                    value="products"
                    className="relative rounded-none border-b-2 border-transparent px-3 py-2 text-sm text-gray-600 hover:text-gray-900 data-[state=active]:text-blue-700 data-[state=active]:font-semibold data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:-bottom-[1px] data-[state=active]:after:h-0.5 data-[state=active]:after:bg-blue-600 whitespace-nowrap"
                  >
                    Products
                  </TabsTrigger>
                  <TabsTrigger
                    value="faqs"
                    className="relative rounded-none border-b-2 border-transparent px-3 py-2 text-sm text-gray-600 hover:text-gray-900 data-[state=active]:text-blue-700 data-[state=active]:font-semibold data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:-bottom-[1px] data-[state=active]:after:h-0.5 data-[state=active]:after:bg-blue-600 whitespace-nowrap"
                  >
                    FAQs
                  </TabsTrigger>
                  <TabsTrigger
                    value="policies"
                    className="relative rounded-none border-b-2 border-transparent px-3 py-2 text-sm text-gray-600 hover:text-gray-900 data-[state=active]:text-blue-700 data-[state=active]:font-semibold data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:-bottom-[1px] data-[state=active]:after:h-0.5 data-[state=active]:after:bg-blue-600 whitespace-nowrap"
                  >
                    Policies
                  </TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="overview">
                <OverviewTab storeId={storeId} />
              </TabsContent>
              <TabsContent value="reviews">
                <ReviewsTab storeId={storeId} />
              </TabsContent>
              <TabsContent value="products">
                <ProductsTab storeId={storeId} />
              </TabsContent>
              <TabsContent value="faqs">
                <FAQsTab storeId={storeId} />
              </TabsContent>
              <TabsContent value="policies">
                <PoliciesTab storeId={storeId} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}
