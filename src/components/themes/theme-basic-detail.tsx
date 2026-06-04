import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { ThemePreviewImage } from "@/components/themes/theme-preview-image";
import {
  getThemeAffiliateUrl,
  type FeaturedTheme,
} from "@/lib/constants/featured-themes";

interface ThemeBasicDetailProps {
  theme: FeaturedTheme;
}

export function ThemeBasicDetail({ theme }: ThemeBasicDetailProps) {
  const affiliateUrl = getThemeAffiliateUrl(theme.themeStoreUrl);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
      <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
        <Link href="/themes" className="text-brand hover:underline">
          Shopify Themes
        </Link>
        <span className="mx-2 text-slate-300">/</span>
        <span className="text-slate-700">{theme.name}</span>
      </nav>

      <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {theme.imageUrl ? (
          <ThemePreviewImage theme={theme} variant="detail" priority />
        ) : (
          <div className="flex aspect-[4/5] items-center justify-center bg-gradient-to-br from-brand-light to-slate-100">
            <span className="text-4xl font-bold text-brand/30">{theme.name}</span>
          </div>
        )}
        <div className="p-6 sm:p-8">
          <h1 className="text-3xl font-bold text-slate-900">{theme.name}</h1>
          <p className="mt-1 text-slate-500">by {theme.vendor}</p>
          <p className="mt-4">
            <span
              className={`rounded-full px-3 py-1 text-sm font-semibold ${
                theme.priceType === "free"
                  ? "bg-emerald-100 text-emerald-800"
                  : "bg-brand-light text-brand"
              }`}
            >
              {theme.priceLabel}
            </span>
            <span className="ml-3 text-sm text-slate-600">{theme.priceDisplay}</span>
          </p>
          <p className="mt-6 leading-relaxed text-slate-600">{theme.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={affiliateUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3 font-semibold text-white hover:bg-brand-hover"
            >
              Get {theme.name} on Theme Store
              <ExternalLink className="h-4 w-4" aria-hidden />
            </a>
            <Link
              href="/tools/theme-detector"
              className="inline-flex rounded-xl border border-slate-200 px-6 py-3 font-semibold text-slate-700 hover:border-brand-muted hover:text-brand"
            >
              Detect this theme
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
