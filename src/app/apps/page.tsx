import Link from "next/link";
import { AppsCatalog } from "@/components/apps/apps-catalog";
import { popularApps } from "@/lib/constants/popular-apps";
import { createPageMetadata } from "@/lib/utils/metadata";

export const metadata = createPageMetadata({
  title: "Popular Shopify Apps",
  description:
    "Browse popular Shopify apps — reviews, email, subscriptions, page builders, and more with App Store links.",
  path: "/apps",
});

export default function AppsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
        Popular Shopify Apps
      </h1>
      <p className="mt-3 max-w-2xl text-slate-600">
        {popularApps.length} apps we often see on successful stores — from Klaviyo
        and Judge.me to Recharge and PageFly. Search and open any listing on the
        Shopify App Store.
      </p>

      <div className="mt-10">
        <AppsCatalog apps={popularApps} />
      </div>

      <p className="mt-12 text-center">
        <Link
          href="/tools/app-detector"
          className="font-medium text-brand hover:underline"
        >
          Detect apps on any store →
        </Link>
      </p>
    </div>
  );
}
