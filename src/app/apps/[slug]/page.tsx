import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink, Star } from "lucide-react";
import {
  getPopularAppBySlug,
  POPULAR_APP_SLUGS,
  popularApps,
} from "@/lib/constants/popular-apps";
import { createPageMetadata } from "@/lib/utils/metadata";

interface AppPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return POPULAR_APP_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: AppPageProps) {
  const { slug } = await params;
  const app = getPopularAppBySlug(slug);

  if (!app) {
    return createPageMetadata({
      title: "App Not Found",
      description: "This app page is not available.",
      path: `/apps/${slug}`,
      noIndex: true,
    });
  }

  return createPageMetadata({
    title: `${app.name} Shopify App — ${app.category}`,
    description: app.description,
    path: `/apps/${slug}`,
  });
}

export default async function AppDetailPage({ params }: AppPageProps) {
  const { slug } = await params;
  const app = getPopularAppBySlug(slug);

  if (!app) {
    notFound();
  }

  const relatedApps = popularApps.filter((a) => a.slug !== slug).slice(0, 6);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
        <Link href="/apps" className="text-brand hover:underline">
          Popular Shopify Apps
        </Link>
        <span className="mx-2 text-slate-300">/</span>
        <span className="text-slate-700">{app.name}</span>
      </nav>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand">
          {app.category}
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">{app.listTitle}</h1>
        <p className="mt-1 text-slate-500">by {app.developerName}</p>

        {app.rating != null && (
          <p className="mt-4 flex items-center gap-1.5 text-slate-700">
            <Star className="h-5 w-5 fill-amber-400 text-amber-400" aria-hidden />
            <span className="font-semibold">{app.rating.toFixed(1)}</span>
            {app.reviewCount != null && (
              <span className="text-slate-500">
                ({app.reviewCount.toLocaleString()} reviews)
              </span>
            )}
            {app.rankingBadge && (
              <span className="ml-2 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800">
                {app.rankingBadge}
              </span>
            )}
          </p>
        )}

        {app.pricingLabel && (
          <p className="mt-3 text-sm font-medium text-emerald-700">
            {app.pricingLabel}
          </p>
        )}

        <p className="mt-6 leading-relaxed text-slate-600">{app.description}</p>

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
      </div>

      {relatedApps.length > 0 && (
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-slate-900">More popular apps</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
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
        </div>
      )}
    </div>
  );
}
