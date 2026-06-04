import Link from "next/link";
import { ExternalLink, Check } from "lucide-react";
import { ThemePreviewImage } from "@/components/themes/theme-preview-image";
import { ThemeStoresUsing } from "@/components/themes/theme-stores-using";
import {
  getThemeAffiliateUrl,
  type FeaturedTheme,
} from "@/lib/constants/featured-themes";

interface ThemeDetailContentProps {
  theme: FeaturedTheme;
  relatedThemes: FeaturedTheme[];
}

export function ThemeDetailContent({
  theme,
  relatedThemes,
}: ThemeDetailContentProps) {
  const affiliateUrl = getThemeAffiliateUrl(theme.themeStoreUrl);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
        <Link href="/themes" className="text-brand hover:underline">
          Shopify Themes
        </Link>
        <span className="mx-2 text-slate-300">/</span>
        <span className="text-slate-700">{theme.name}</span>
      </nav>

      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:items-start">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <ThemePreviewImage theme={theme} variant="detail" priority />
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand">
            Shopify Theme
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {theme.name}
          </h1>

          <dl className="mt-6 space-y-4 rounded-2xl border border-slate-200 bg-slate-50/60 p-5 sm:p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-slate-200/80 pb-4">
              <dt className="text-sm font-medium text-slate-500">Theme Name</dt>
              <dd className="text-lg font-semibold text-slate-900">{theme.name}</dd>
            </div>
            <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-slate-200/80 pb-4">
              <dt className="text-sm font-medium text-slate-500">Vendor</dt>
              <dd className="text-lg font-semibold text-slate-900">{theme.vendor}</dd>
            </div>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <dt className="text-sm font-medium text-slate-500">Price</dt>
              <dd className="flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-sm font-semibold ${
                    theme.priceType === "free"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-brand-light text-brand"
                  }`}
                >
                  {theme.priceLabel}
                </span>
                <span className="text-sm text-slate-600">{theme.priceDisplay}</span>
              </dd>
            </div>
          </dl>

          <p className="mt-5 text-slate-600">{theme.description}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={affiliateUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3 font-semibold text-white transition hover:bg-brand-hover"
            >
              Get {theme.name} on Theme Store
              <ExternalLink className="h-4 w-4" aria-hidden />
            </a>
            <Link
              href="/tools/theme-detector"
              className="inline-flex items-center rounded-xl border border-slate-200 px-6 py-3 font-semibold text-slate-700 transition hover:border-brand-muted hover:text-brand"
            >
              Detect this theme
            </Link>
          </div>
        </div>
      </div>

      <section className="mt-14" aria-labelledby="theme-features-heading">
        <h2
          id="theme-features-heading"
          className="text-2xl font-bold text-slate-900 sm:text-3xl"
        >
          {theme.name} Features
        </h2>
        <p className="mt-3 text-slate-600">
          Key capabilities merchants look for when comparing the {theme.name}{" "}
          Shopify theme.
        </p>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {theme.features.map((feature) => (
            <li
              key={feature}
              className="flex gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-700 shadow-sm"
            >
              <Check
                className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600"
                aria-hidden
              />
              {feature}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14" aria-labelledby="theme-overview-heading">
        <h2
          id="theme-overview-heading"
          className="text-2xl font-bold text-slate-900 sm:text-3xl"
        >
          Theme Overview
        </h2>
        <div className="prose prose-slate mt-6 max-w-3xl space-y-4 text-slate-600">
          {theme.overview.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <div className="mt-14 border-t border-slate-200 pt-14">
        <ThemeStoresUsing
          themeSlug={theme.slug}
          themeName={theme.name}
          exampleStoresToScan={theme.exampleStoresToScan}
        />
      </div>

      {relatedThemes.length > 0 && (
        <section className="mt-14 border-t border-slate-200 pt-14" aria-labelledby="related-themes-heading">
          <h2
            id="related-themes-heading"
            className="text-xl font-bold text-slate-900"
          >
            More Shopify Themes
          </h2>
          <ul className="mt-6 flex flex-wrap gap-3">
            {relatedThemes.map((related) => (
              <li key={related.slug}>
                <Link
                  href={`/themes/${related.slug}`}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-brand-muted hover:text-brand"
                >
                  {related.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
