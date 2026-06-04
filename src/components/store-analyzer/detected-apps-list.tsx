import Image from "next/image";
import {
  ChevronRight,
  Code2,
  Info,
  Puzzle,
  Star,
  Tag,
} from "lucide-react";
import type { AppDetectionResult } from "@/lib/shopify/types";
import { enrichAppFromCatalog } from "@/lib/constants/app-catalog";

interface DetectedAppsListProps {
  /** Hide marketing header when embedded in store result tabs */
  embedded?: boolean;
  apps: Array<{
    name: string;
    slug?: string;
    category?: string | null;
    vendor?: string | null;
    officialUrl?: string | null;
    listTitle?: string;
    developerName?: string;
    shopifyAppStoreUrl?: string | null;
    pricingLabel?: string | null;
    rating?: number | null;
    reviewCount?: number | null;
    rankingBadge?: string | null;
    iconUrl?: string | null;
    confidenceScore?: number;
  }>;
}

function normalizeApps(apps: DetectedAppsListProps["apps"]): AppDetectionResult[] {
  return apps.map((app) =>
    enrichAppFromCatalog({
      name: app.name,
      slug: app.slug ?? app.name.toLowerCase().replace(/\s+/g, "-"),
      category: app.category ?? null,
      vendor: app.vendor ?? null,
      officialUrl: app.officialUrl ?? null,
      confidenceScore: app.confidenceScore ?? 80,
    })
  );
}

function AppIcon({
  name,
  iconUrl,
}: {
  name: string;
  iconUrl: string | null;
}) {
  const initial = name.charAt(0).toUpperCase();

  if (iconUrl) {
    return (
      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-white">
        <Image
          src={iconUrl}
          alt={`${name} icon`}
          fill
          className="object-cover"
          sizes="48px"
          unoptimized
        />
      </div>
    );
  }

  return (
    <div
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-gradient-to-br from-emerald-50 to-slate-100 text-lg font-bold text-emerald-700"
      aria-hidden
    >
      {initial}
    </div>
  );
}

export function DetectedAppsList({ apps, embedded = false }: DetectedAppsListProps) {
  const enriched = normalizeApps(apps);

  if (enriched.length === 0) {
    return (
      <p className={embedded ? "text-slate-500" : "mt-4 text-slate-500"}>
        No apps detected from public storefront code.
      </p>
    );
  }

  return (
    <div className={embedded ? "" : "mt-4"}>
      {!embedded && (
        <div className="mb-4 flex items-start gap-2">
          <Puzzle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
          <div>
            <p className="font-medium text-slate-900">Detected Shopify Apps</p>
            <p className="text-sm text-slate-500">
              We found {enriched.length} app{enriched.length === 1 ? "" : "s"}{" "}
              running on this store
            </p>
          </div>
        </div>
      )}

      <ul className="space-y-3">
        {enriched.map((app) => {
          const storeUrl =
            app.shopifyAppStoreUrl ?? app.officialUrl ?? null;

          return (
            <li key={app.slug}>
              <a
                href={storeUrl ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/80 p-3 transition hover:border-emerald-200 hover:bg-white hover:shadow-sm ${
                  !storeUrl ? "pointer-events-none opacity-60" : ""
                }`}
              >
                <AppIcon name={app.name} iconUrl={app.iconUrl} />

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="truncate font-semibold text-slate-900">
                      {app.listTitle}
                    </p>
                    {app.rankingBadge && (
                      <span className="inline-flex items-center gap-0.5 rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-semibold text-amber-800">
                        <Star className="h-2.5 w-2.5 fill-amber-500 text-amber-500" />
                        {app.rankingBadge}
                      </span>
                    )}
                  </div>

                  {app.rating != null && (
                    <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-600">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      <span className="font-medium">{app.rating.toFixed(2)}</span>
                      {app.reviewCount != null && (
                        <span className="text-slate-500">
                          ({app.reviewCount.toLocaleString()})
                        </span>
                      )}
                    </p>
                  )}

                  <p className="mt-1 flex items-center gap-1 text-xs text-brand">
                    <Code2 className="h-3 w-3 shrink-0" />
                    <span className="truncate">{app.developerName}</span>
                  </p>

                  {app.pricingLabel && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-emerald-700">
                      <Tag className="h-3 w-3 shrink-0" />
                      {app.pricingLabel}
                    </p>
                  )}

                  <p className="mt-1 text-[11px] text-slate-400">
                    {app.category}
                  </p>
                </div>

                {storeUrl && (
                  <ChevronRight className="h-5 w-5 shrink-0 text-emerald-600 transition group-hover:translate-x-0.5" />
                )}
              </a>
            </li>
          );
        })}
      </ul>

      <p
        className={`flex items-start gap-2 text-xs text-slate-500 ${embedded ? "mt-4" : "mt-4"}`}
      >
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        Detection based on publicly visible code. Some apps may not be detected.
        Links open the app&apos;s listing on the Shopify App Store when available.
      </p>
    </div>
  );
}
