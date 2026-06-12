import Link from "next/link";
import { ExternalLink, Check, Minus } from "lucide-react";
import { ThemePreviewImage } from "@/components/themes/theme-preview-image";
import { ThemeStoresUsing } from "@/components/themes/theme-stores-using";
import { FaqJsonLd } from "@/components/seo/structured-data";
import {
  getThemeAffiliateUrl,
  type FeaturedTheme,
} from "@/lib/constants/featured-themes";
import { resolveThemeDetailProfile } from "@/lib/constants/theme-detail-profiles";

interface ThemeDetailContentProps {
  theme: FeaturedTheme;
  relatedThemes: FeaturedTheme[];
}

export function ThemeDetailContent({
  theme,
  relatedThemes,
}: ThemeDetailContentProps) {
  const affiliateUrl = getThemeAffiliateUrl(theme.themeStoreUrl);
  const detail = resolveThemeDetailProfile(theme);
  const pageTitle = `${theme.name} Shopify Theme`;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
        <Link href="/themes" className="text-brand hover:underline">
          Shopify Themes
        </Link>
        <span className="mx-2 text-slate-300">/</span>
        <span className="text-slate-700">{theme.name}</span>
      </nav>

      {/* Hero */}
      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:items-start">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <ThemePreviewImage theme={theme} variant="detail" priority />
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand">
            Shopify Theme
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {pageTitle}
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
            <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-slate-200/80 pb-4">
              <dt className="text-sm font-medium text-slate-500">Category</dt>
              <dd className="text-lg font-semibold text-slate-900">
                {detail.category}
              </dd>
            </div>
            <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-slate-200/80 pb-4">
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
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <dt className="text-sm font-medium text-slate-500">Official Website</dt>
              <dd>
                <a
                  href={affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline"
                >
                  Shopify Theme Store
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                </a>
              </dd>
            </div>
          </dl>

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

      {/* Overview */}
      <section className="mt-14" aria-labelledby="theme-overview-heading">
        <h2
          id="theme-overview-heading"
          className="text-2xl font-bold text-slate-900 sm:text-3xl"
        >
          Overview
        </h2>
        <div className="mt-6 max-w-3xl space-y-4 text-slate-600">
          {detail.overview.map((paragraph) => (
            <p key={paragraph.slice(0, 48)} className="leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* Key Features */}
      <section className="mt-14" aria-labelledby="theme-features-heading">
        <h2
          id="theme-features-heading"
          className="text-2xl font-bold text-slate-900 sm:text-3xl"
        >
          Key Features
        </h2>
        <p className="mt-3 text-slate-600">
          Capabilities merchants evaluate when comparing the {theme.name} Shopify
          theme.
        </p>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {detail.features.map((feature) => (
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

      {/* Best For */}
      <section className="mt-14" aria-labelledby="theme-best-for-heading">
        <h2
          id="theme-best-for-heading"
          className="text-2xl font-bold text-slate-900 sm:text-3xl"
        >
          Best For
        </h2>
        <p className="mt-3 text-slate-600">
          Store types and merchants that commonly choose {theme.name}.
        </p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {detail.bestFor.map((item) => (
            <li
              key={item}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Pros & Cons */}
      <section className="mt-14" aria-labelledby="theme-pros-cons-heading">
        <h2
          id="theme-pros-cons-heading"
          className="text-2xl font-bold text-slate-900 sm:text-3xl"
        >
          Pros &amp; Cons
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/40 p-6">
            <h3 className="font-semibold text-emerald-900">Pros</h3>
            <ul className="mt-4 space-y-2.5">
              {detail.pros.map((pro) => (
                <li
                  key={pro}
                  className="flex gap-2 text-sm text-emerald-950/90"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  {pro}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6">
            <h3 className="font-semibold text-slate-900">Cons</h3>
            <ul className="mt-4 space-y-2.5">
              {detail.cons.map((con) => (
                <li key={con} className="flex gap-2 text-sm text-slate-700">
                  <Minus className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                  {con}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-14" aria-labelledby="theme-faq-heading">
        <FaqJsonLd items={detail.faq} />
        <h2
          id="theme-faq-heading"
          className="text-2xl font-bold text-slate-900 sm:text-3xl"
        >
          FAQ
        </h2>
        <dl className="mt-8 space-y-4">
          {detail.faq.map((item) => (
            <div
              key={item.question}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <dt className="text-lg font-semibold text-slate-900">
                {item.question}
              </dt>
              <dd className="mt-2 leading-relaxed text-slate-600">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="mt-14 border-t border-slate-200 pt-14">
        <ThemeStoresUsing
          themeSlug={theme.slug}
          themeName={theme.name}
          exampleStoresToScan={theme.exampleStoresToScan}
        />
      </div>

      {relatedThemes.length > 0 && (
        <section
          className="mt-14 border-t border-slate-200 pt-14"
          aria-labelledby="related-themes-heading"
        >
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
