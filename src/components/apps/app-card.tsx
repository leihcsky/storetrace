"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Star } from "lucide-react";
import type { FeaturedApp } from "@/lib/constants/featured-apps";

interface AppCardProps {
  app: FeaturedApp;
}

export function AppCard({ app }: AppCardProps) {
  const [iconError, setIconError] = useState(false);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-brand-muted hover:shadow-md">
      <Link
        href={`/apps/${app.slug}`}
        className="relative block shrink-0 overflow-hidden bg-gradient-to-br from-brand-light/90 via-white to-slate-50"
      >
        <div className="flex aspect-[4/3] flex-col items-center justify-center gap-3 p-6 sm:p-8">
          {app.iconUrl && !iconError ? (
            <div className="relative h-20 w-20 overflow-hidden rounded-2xl border border-white/80 bg-white shadow-[0_8px_24px_-6px_rgba(70,8,173,0.25)] ring-1 ring-slate-200/80 transition duration-500 group-hover:scale-[1.04] sm:h-24 sm:w-24">
              <Image
                src={app.iconUrl}
                alt=""
                fill
                className="object-cover"
                sizes="96px"
                unoptimized
                onError={() => setIconError(true)}
              />
            </div>
          ) : (
            <div
              className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-[#7e3af2] text-2xl font-bold text-white shadow-lg sm:h-24 sm:w-24"
              aria-hidden
            >
              {app.name.charAt(0)}
            </div>
          )}
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-slate-600 shadow-sm ring-1 ring-slate-200/80">
            {app.category}
          </span>
        </div>
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-brand/5 to-transparent"
          aria-hidden
        />
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <Link href={`/apps/${app.slug}`}>
              <h3 className="truncate text-lg font-semibold text-slate-900 transition hover:text-brand">
                {app.name}
              </h3>
            </Link>
            <p className="mt-0.5 text-sm text-slate-500">by {app.developerName}</p>
          </div>
          {app.rankingBadge && (
            <span className="inline-flex shrink-0 items-center gap-0.5 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800">
              <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
              {app.rankingBadge}
            </span>
          )}
        </div>

        {app.rating != null && (
          <p className="mt-2 flex items-center gap-1 text-sm text-slate-600">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span className="font-medium">{app.rating.toFixed(1)}</span>
            {app.reviewCount != null && (
              <span className="text-slate-400">
                ({app.reviewCount.toLocaleString()} reviews)
              </span>
            )}
          </p>
        )}

        <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
          {app.description}
        </p>

        {app.pricingLabel && (
          <p className="mt-2 text-xs font-medium text-emerald-700">
            {app.pricingLabel}
          </p>
        )}

        <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-100 pt-4">
          <Link
            href={`/apps/${app.slug}`}
            className="inline-flex items-center justify-center rounded-lg border border-slate-200 px-3.5 py-2 text-sm font-medium text-slate-700 transition hover:border-brand-muted hover:text-brand"
          >
            App details
          </Link>
          <a
            href={app.shopifyAppStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-brand px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-brand-hover sm:flex-none"
          >
            View on App Store
            <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          </a>
        </div>
      </div>
    </article>
  );
}
