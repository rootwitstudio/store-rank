"use client";

import { Globe } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { StoreDetails } from "@/stores/storeDetailsStore";

function ensureHttps(url: string) {
  if (!url) return url as unknown as string;
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  return `https://${url}`;
}

export function OnTheWebCard({ store }: { store: Partial<StoreDetails> | null | undefined }) {
  const hasSocial = !!(store?.socialMedia && Object.entries(store.socialMedia || {}).some(([, v]) => !!v));
  const hasMarketplaces = !!(store?.marketplaces && Object.entries(store.marketplaces || {}).some(([, v]) => !!v));
  const hasAppStores = !!(store?.appStores && Object.entries(store.appStores || {}).some(([, v]) => !!v));

  if (!store?.website && !hasSocial && !hasMarketplaces && !hasAppStores) return null;

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
          <Globe className="w-5 h-5 text-blue-600" />
          On the Web
        </CardTitle>
      </CardHeader>
      <CardContent>
        {store?.website && (
          <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 mb-3">
            <div className="flex-shrink-0">
              <Globe className="w-5 h-5 text-gray-400" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Website</div>
              <a
                href={ensureHttps(String(store.website))}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-medium text-sm sm:text-base break-all"
              >
                {store.website}
              </a>
            </div>
          </div>
        )}

        {hasSocial && (
          <div className="mb-3">
            <div className="text-sm text-gray-500 mb-2">Social Media</div>
            <div className="flex flex-wrap gap-2">
              {Object.entries(store?.socialMedia || {}).map(([key, value]) =>
                value ? (
                  <a key={key} href={ensureHttps(String(value))} target="_blank" rel="noopener noreferrer">
                    <Badge variant="secondary" className="px-2 py-1 bg-blue-50 text-blue-700 border-blue-200 capitalize">
                      {key}
                    </Badge>
                  </a>
                ) : null
              )}
            </div>
          </div>
        )}

        {hasMarketplaces && (
          <div className="mb-3">
            <div className="text-sm text-gray-500 mb-2">Marketplaces</div>
            <div className="flex flex-wrap gap-2">
              {Object.entries(store?.marketplaces || {}).map(([key, value]) =>
                value ? (
                  <a key={key} href={ensureHttps(String(value))} target="_blank" rel="noopener noreferrer">
                    <Badge variant="outline" className="px-2 py-1 capitalize">{key}</Badge>
                  </a>
                ) : null
              )}
            </div>
          </div>
        )}

        {hasAppStores && (
          <div>
            <div className="text-sm text-gray-500 mb-2">App Stores</div>
            <div className="flex flex-wrap gap-2">
              {Object.entries(store?.appStores || {}).map(([key, value]) =>
                value ? (
                  <a key={key} href={ensureHttps(String(value))} target="_blank" rel="noopener noreferrer">
                    <Badge variant="outline" className="px-2 py-1 capitalize">{key}</Badge>
                  </a>
                ) : null
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}


