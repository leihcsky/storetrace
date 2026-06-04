import Link from "next/link";
import { AppDetectorAppsGuide } from "@/components/tools/app-detector-apps-guide";
import { AppDetectorFeatures } from "@/components/tools/app-detector-features";
import { AppDetectorHero } from "@/components/tools/app-detector-hero";
import { AppDetectorHowItWorks } from "@/components/tools/app-detector-how-it-works";
import { AppDetectorUseCases } from "@/components/tools/app-detector-use-cases";
import { PopularApps } from "@/components/home/popular-apps";
import { ToolFaq } from "@/components/tools/tool-faq";
import {
  AppDetectorJsonLd,
  WebPageJsonLd,
} from "@/components/seo/structured-data";
import { appDetectorFaqItems } from "@/lib/constants/app-detector-faq";
import { createPageMetadata } from "@/lib/utils/metadata";

export const metadata = createPageMetadata({
  title: "Free Shopify App Detector | What Apps Does This Store Use?",
  description:
    "What Shopify apps does this store use? Free app detector finds Klaviyo, reviews, email & more — with App Store links and ratings in seconds.",
  path: "/tools/app-detector",
  includeSiteName: false,
});

export default async function AppDetectorPage({
  searchParams,
}: {
  searchParams: Promise<{ url?: string }>;
}) {
  const params = await searchParams;
  const prefilledUrl = params.url ?? "";

  return (
    <>
      <WebPageJsonLd
        name="Free Shopify App Detector | What Apps Does This Store Use?"
        description="Detect Shopify apps on any store. Free app detector with app names, categories, and Shopify App Store links."
        path="/tools/app-detector"
      />
      <AppDetectorJsonLd />

      <section
        className="bg-gradient-to-b from-brand-light via-white to-slate-50 py-16 sm:py-24"
        aria-labelledby="app-detector-hero-heading"
      >
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand">
            Free tool · No login required
          </p>
          <h1
            id="app-detector-hero-heading"
            className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl"
          >
            Shopify App Detector
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Free Shopify app detector — paste any store URL and discover which
            apps power reviews, email, upsells, tracking, and more.
          </p>

          <div className="mt-10">
            <AppDetectorHero defaultUrl={prefilledUrl} />
          </div>
        </div>
      </section>

      <AppDetectorFeatures />
      <AppDetectorHowItWorks />
      <AppDetectorUseCases />

      <AppDetectorAppsGuide />

      <PopularApps />

      <ToolFaq
        heading="Shopify App Detector FAQ"
        subheading="Common questions about detecting apps on Shopify stores."
        items={appDetectorFaqItems}
        className="bg-slate-50 py-16 sm:py-20"
      />

      <section className="border-t border-slate-200 bg-white py-12">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          <Link
            href="/"
            className="inline-flex rounded-lg bg-brand px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-hover"
          >
            Analyze full store →
          </Link>
        </div>
      </section>
    </>
  );
}
