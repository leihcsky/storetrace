import Link from "next/link";
import { ExternalLink, Star, Check } from "lucide-react";
import { AppStoresUsing } from "@/components/apps/app-stores-using";
import { FaqJsonLd } from "@/components/seo/structured-data";
import { resolveAppDetailProfile } from "@/lib/constants/app-detail-profiles";
import type { FeaturedApp } from "@/lib/constants/popular-apps";

interface AppDetailContentProps {
  app: FeaturedApp;
  relatedApps: FeaturedApp[];
}

export function AppDetailContent({ app, relatedApps }: AppDetailContentProps) {
  const detail = resolveAppDetailProfile(app);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
        <Link href="/apps" className="text-brand hover:underline">
          Popular Shopify Apps
        </Link>
        <span className="mx-2 text-slate-300">/</span>
        <span className="text-slate-700">{app.name}</span>
      </nav>

      {/* Hero */}
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-start">
        <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          {app.iconUrl ? (
            <img
              src={app.iconUrl}
              alt=""
              width={72}
              height={72}
              className="h-[72px] w-[72px] shrink-0 rounded-2xl border border-slate-100 object-cover"
            />
          ) : (
            <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-2xl bg-brand-light text-2xl font-bold text-brand">
              {app.name.charAt(0)}
            </div>
          )}
          <div className="min-w-0">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand">
              {app.category}
            </p>
            <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
              {app.listTitle}
            </h1>
            <p className="mt-1 text-slate-500">by {app.developerName}</p>

            {app.rating != null && (
              <p className="mt-3 flex flex-wrap items-center gap-1.5 text-slate-700">
                <Star
                  className="h-5 w-5 fill-amber-400 text-amber-400"
                  aria-hidden
                />
                <span className="font-semibold">{app.rating.toFixed(1)}</span>
                {app.reviewCount != null && (
                  <span className="text-slate-500">
                    ({app.reviewCount.toLocaleString()} reviews)
                  </span>
                )}
                {app.rankingBadge && (
                  <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800">
                    {app.rankingBadge}
                  </span>
                )}
              </p>
            )}
          </div>
        </div>

        <dl className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50/60 p-5 sm:p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-slate-200/80 pb-4">
            <dt className="text-sm font-medium text-slate-500">Category</dt>
            <dd className="font-semibold text-slate-900">{app.category}</dd>
          </div>
          <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-slate-200/80 pb-4">
            <dt className="text-sm font-medium text-slate-500">Developer</dt>
            <dd className="font-semibold text-slate-900">{app.developerName}</dd>
          </div>
          <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-slate-200/80 pb-4">
            <dt className="text-sm font-medium text-slate-500">Pricing</dt>
            <dd className="font-semibold text-emerald-700">
              {app.pricingLabel ?? "See App Store listing"}
            </dd>
          </div>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <dt className="text-sm font-medium text-slate-500">Official Website</dt>
            <dd>
              <a
                href={app.shopifyAppStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline"
              >
                Shopify App Store
                <ExternalLink className="h-3.5 w-3.5" aria-hidden />
              </a>
            </dd>
          </div>
        </dl>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href={app.shopifyAppStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3 font-semibold text-white transition hover:bg-brand-hover"
        >
          View on Shopify App Store
          <ExternalLink className="h-4 w-4" aria-hidden />
        </a>
        <Link
          href="/tools/app-detector"
          className="inline-flex items-center rounded-xl border border-slate-200 px-6 py-3 font-semibold text-slate-700 transition hover:border-brand-muted hover:text-brand"
        >
          Detect this app on a store
        </Link>
      </div>

      {/* Overview */}
      <section className="mt-14" aria-labelledby="app-overview-heading">
        <h2
          id="app-overview-heading"
          className="text-2xl font-bold text-slate-900 sm:text-3xl"
        >
          App Overview
        </h2>
        <div className="mt-6 max-w-3xl space-y-4 text-slate-600">
          {detail.overview.map((paragraph) => (
            <p key={paragraph.slice(0, 48)} className="leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mt-14" aria-labelledby="app-features-heading">
        <h2
          id="app-features-heading"
          className="text-2xl font-bold text-slate-900 sm:text-3xl"
        >
          Features
        </h2>
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
      <section className="mt-14" aria-labelledby="app-best-for-heading">
        <h2
          id="app-best-for-heading"
          className="text-2xl font-bold text-slate-900 sm:text-3xl"
        >
          Best For
        </h2>
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

      {/* Alternatives */}
      {detail.alternatives.length > 0 && (
        <section className="mt-14" aria-labelledby="app-alternatives-heading">
          <h2
            id="app-alternatives-heading"
            className="text-2xl font-bold text-slate-900 sm:text-3xl"
          >
            Alternatives
          </h2>
          <p className="mt-3 text-slate-600">
            Other popular Shopify apps merchants compare with {app.name}.
          </p>
          <ul className="mt-6 flex flex-wrap gap-3">
            {detail.alternatives.map((alt) => (
              <li key={alt.slug}>
                <Link
                  href={`/apps/${alt.slug}`}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-brand-muted hover:text-brand"
                >
                  {alt.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* FAQ */}
      <section className="mt-14" aria-labelledby="app-faq-heading">
        <FaqJsonLd items={detail.faq} />
        <h2
          id="app-faq-heading"
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
        <AppStoresUsing appSlug={app.slug} appName={app.name} />
      </div>

      {relatedApps.length > 0 && (
        <section
          className="mt-14 border-t border-slate-200 pt-14"
          aria-labelledby="related-apps-heading"
        >
          <h2
            id="related-apps-heading"
            className="text-xl font-bold text-slate-900"
          >
            More Popular Apps
          </h2>
          <ul className="mt-6 flex flex-wrap gap-3">
            {relatedApps.map((related) => (
              <li key={related.slug}>
                <Link
                  href={`/apps/${related.slug}`}
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
