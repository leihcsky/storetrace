"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import {
  getThemeAffiliateUrl,
  type FeaturedTheme,
} from "@/lib/constants/featured-themes";
import { ThemePreviewImage } from "@/components/themes/theme-preview-image";

interface ThemeCardProps {
  theme: FeaturedTheme;
}

export function ThemeCard({ theme }: ThemeCardProps) {
  const affiliateUrl = getThemeAffiliateUrl(theme.themeStoreUrl);
  const hasAffiliate = Boolean(
    process.env.NEXT_PUBLIC_SHOPIFY_THEME_AFFILIATE_REF?.trim()
  );

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-brand-muted hover:shadow-md">
      <Link href={`/themes/${theme.slug}`} className="block shrink-0">
        <ThemePreviewImage theme={theme} variant="card" />
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <Link href={`/themes/${theme.slug}`}>
              <h3 className="text-lg font-semibold text-slate-900 transition hover:text-brand">
                {theme.name}
              </h3>
            </Link>
            <p className="mt-0.5 text-sm text-slate-500">by {theme.vendor}</p>
          </div>
          <span
            className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
              theme.priceType === "free"
                ? "bg-emerald-100 text-emerald-800"
                : "bg-brand-light text-brand"
            }`}
          >
            {theme.priceLabel}
          </span>
        </div>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
          {theme.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-100 pt-4">
          <Link
            href={`/themes/${theme.slug}`}
            className="inline-flex items-center justify-center rounded-lg border border-slate-200 px-3.5 py-2 text-sm font-medium text-slate-700 transition hover:border-brand-muted hover:text-brand"
          >
            Theme details
          </Link>
          <a
            href={affiliateUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-brand px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-brand-hover sm:flex-none"
          >
            Get theme
            <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          </a>
        </div>
        {hasAffiliate && (
          <p className="mt-2 text-[10px] text-slate-400">Affiliate link</p>
        )}
      </div>
    </article>
  );
}
