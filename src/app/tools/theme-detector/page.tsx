import Link from "next/link";
import { ThemeDetectorFeatures } from "@/components/tools/theme-detector-features";
import { ThemeDetectorHero } from "@/components/tools/theme-detector-hero";
import { ThemeDetectorHowItWorks } from "@/components/tools/theme-detector-how-it-works";
import { ThemeDetectorUseCases } from "@/components/tools/theme-detector-use-cases";
import { ThemeDetectorRelatedGuide } from "@/components/tools/theme-detector-related-guide";
import { ThemeDetectorThemeGuide } from "@/components/tools/theme-detector-theme-guide";
import { PopularThemes } from "@/components/home/popular-themes";
import { ToolFaq } from "@/components/tools/tool-faq";
import { ThemeDetectorJsonLd, WebPageJsonLd } from "@/components/seo/structured-data";
import { themeDetectorFaqItems } from "@/lib/constants/theme-detector-faq";
import { createPageMetadata } from "@/lib/utils/metadata";

export const metadata = createPageMetadata({
  title: "Free Shopify Theme Detector | What Shopify Theme Is This?",
  description:
    "What Shopify theme is this store using? Paste any URL — our free theme detector shows the theme name, developer & Theme Store link in seconds.",
  path: "/tools/theme-detector",
  includeSiteName: false,
});

export default async function ThemeDetectorPage({
  searchParams,
}: {
  searchParams: Promise<{ url?: string }>;
}) {
  const params = await searchParams;
  const prefilledUrl = params.url ?? "";

  return (
    <>
      <WebPageJsonLd
        name="Free Shopify Theme Detector | What Shopify Theme Is This?"
        description="What Shopify theme is this store using? Free theme detector with theme name, developer, and Theme Store link."
        path="/tools/theme-detector"
      />
      <ThemeDetectorJsonLd />

      <section
        className="bg-gradient-to-b from-brand-light via-white to-slate-50 py-16 sm:py-24"
        aria-labelledby="theme-detector-hero-heading"
      >
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand">
            Free tool · No login required
          </p>
          <h1
            id="theme-detector-hero-heading"
            className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl"
          >
            Shopify Theme Detector
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Use this free Shopify Theme Detector to detect Shopify theme on any
            store — paste a URL and get the theme name, developer, and Theme
            Store link in seconds.
          </p>

          <div className="mt-10">
            <ThemeDetectorHero defaultUrl={prefilledUrl} />
          </div>
        </div>
      </section>

      <ThemeDetectorFeatures />
      <ThemeDetectorHowItWorks />
      <ThemeDetectorUseCases />

      <ThemeDetectorThemeGuide />

      <ThemeDetectorRelatedGuide />

      <PopularThemes />

      <ToolFaq
        heading="Shopify Theme Detector FAQ"
        subheading="Clear answers about Shopify themes, the Theme Store, and how this detector works."
        items={themeDetectorFaqItems}
        className="bg-slate-50 py-16 sm:py-20"
      />

      <section className="border-t border-slate-200 bg-white py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-3 px-4 sm:flex-row sm:px-6">
          <Link
            href="/blog/shopify-theme-detector-guide"
            className="inline-flex rounded-lg border border-slate-200 px-6 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-brand-muted hover:text-brand"
          >
            Theme detector guide →
          </Link>
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
