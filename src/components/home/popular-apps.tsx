import Link from "next/link";
import { AppCard } from "@/components/apps/app-card";
import { homepagePopularApps } from "@/lib/constants/popular-apps";

export function PopularApps() {
  return (
    <section
      className="bg-white py-16 sm:py-20"
      aria-labelledby="popular-apps-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <h2
            id="popular-apps-heading"
            className="text-2xl font-bold text-slate-900 sm:text-3xl"
          >
            Popular Shopify Apps
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Apps we often detect on successful stores — preview categories, ratings,
            and install from the Shopify App Store.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {homepagePopularApps.map((app) => (
            <AppCard key={app.slug} app={app} />
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 text-center">
          <Link
            href="/apps"
            className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-brand-muted hover:text-brand"
          >
            View all apps →
          </Link>
          <p className="max-w-xl text-xs text-slate-400">
            &quot;View on App Store&quot; links open the official Shopify App Store
            listing for each app.
          </p>
        </div>
      </div>
    </section>
  );
}
