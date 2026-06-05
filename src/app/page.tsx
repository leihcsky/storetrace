import { HeroAnalyzer } from "@/components/home/hero-analyzer";
import { StoreAnalyzerIntro } from "@/components/home/store-analyzer-intro";
import { HowItWorks } from "@/components/home/how-it-works";
import { PopularTools } from "@/components/home/popular-tools";
import { PopularThemes } from "@/components/home/popular-themes";
import { PopularApps } from "@/components/home/popular-apps";
import { RecentAnalyses } from "@/components/home/recent-analyses";
import { FAQ } from "@/components/home/faq";
import { HomePageJsonLd, WebPageJsonLd } from "@/components/seo/structured-data";
import { createPageMetadata } from "@/lib/utils/metadata";
import { siteConfig } from "@/lib/utils/site";

export const metadata = createPageMetadata({
  title: "Shopify Store Analyzer - Themes, Apps & Store Insights",
  description:
    "Free Shopify store analyzer — analyze any Shopify store for themes, apps, and store insights. Instant Shopify store analysis from one URL, no login.",
  path: "/",
  includeSiteName: false,
});

export default function HomePage() {
  return (
    <>
      <WebPageJsonLd
        name="Shopify Store Analyzer"
        description={siteConfig.description}
        path="/"
      />
      <HomePageJsonLd />

      <section
        id="analyze"
        className="bg-gradient-to-b from-brand-light to-slate-50 py-20 sm:py-28"
        aria-labelledby="hero-heading"
      >
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand">
            {siteConfig.name} · Shopify Store Intelligence
          </p>
          <h1
            id="hero-heading"
            className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl"
          >
            {siteConfig.heroTitle}
          </h1>
          <p className="mt-4 text-lg text-slate-600">{siteConfig.tagline}</p>
          <HeroAnalyzer />
        </div>
      </section>

      <StoreAnalyzerIntro />
      <HowItWorks />
      <PopularTools />
      <PopularThemes />
      <PopularApps />
      <RecentAnalyses />
      <FAQ />
    </>
  );
}
