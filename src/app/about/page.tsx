import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { LegalPage } from "@/components/legal/legal-page";
import { SITE_LAUNCHED } from "@/lib/constants/legal";
import { createPageMetadata } from "@/lib/utils/metadata";
import { siteConfig } from "@/lib/utils/site";

export const metadata = createPageMetadata({
  title: "About",
  description:
    "Learn what StoreTrace is, who built it, and how our free Shopify store analyzer helps merchants and agencies research themes and apps.",
  path: "/about",
});

const trustPoints = [
  "Years of hands-on Shopify store operations — launches, migrations, and day-to-day growth",
  "Deep familiarity with themes, app stacks, checkout extensions, and storefront tech",
  "Regular competitor and market research for DTC and ecommerce brands",
  "Detection rules refined against real stores, not theoretical app lists",
];

export default function AboutPage() {
  return (
    <LegalPage
      title={`About ${siteConfig.name}`}
      description="Free Shopify store intelligence — built by practitioners who run and research Shopify stores every day."
      lastUpdated={SITE_LAUNCHED}
      dateLabel="Published"
    >
      <h2>Who we are</h2>
      <p>
        {siteConfig.name} is built by a small team with years of Shopify
        operations experience. We have managed Shopify stores end to end — from
        theme and app selection to conversion optimization, email flows, and
        international expansion. That work lives in admin panels, theme code, and
        the scripts that show up on live storefronts.
      </p>
      <p>
        We also work on ecommerce tooling and store research: comparing how top
        brands structure their stacks, which apps they rely on, and how themes
        are customized in production. {siteConfig.name} is the tool we wanted
        when auditing stores for clients — fast, public, and honest about what
        can and cannot be detected from the outside.
      </p>

      <div className="not-prose rounded-2xl border border-brand-muted bg-brand-light/60 p-6 sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand">
          Why you can trust our analysis
        </p>
        <ul className="mt-4 space-y-3">
          {trustPoints.map((point) => (
            <li key={point} className="flex gap-3 text-sm text-slate-700">
              <CheckCircle2
                className="mt-0.5 h-5 w-5 shrink-0 text-brand"
                aria-hidden
              />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      <h2>What we do</h2>
      <p>
        {siteConfig.name} is a free Shopify store analyzer. Enter any public
        store URL and we detect whether it runs on Shopify, identify the theme
        when possible, list apps visible on the storefront, and surface other
        public signals such as currency and product counts.
      </p>
      <p>
        Our tools — including the{" "}
        <Link href="/" className="text-brand hover:underline">
          store analyzer
        </Link>
        ,{" "}
        <Link href="/tools/theme-detector" className="text-brand hover:underline">
          theme detector
        </Link>
        , and{" "}
        <Link href="/tools/app-detector" className="text-brand hover:underline">
          app detector
        </Link>{" "}
        — are built for merchants, agencies, and researchers who want to
        understand how Shopify stores are built without signing up for an
        account.
      </p>

      <h2>How analysis works</h2>
      <p>
        We fetch publicly available storefront pages (such as the homepage,
        collection, and cart URLs) and inspect HTML, scripts, and assets that
        any visitor&apos;s browser would receive. We do not access Shopify admin
        panels, private APIs, or non-public data. Detection is based on
        fingerprints left by themes, apps, and Shopify itself on the live
        storefront — the same signals our team looks for when doing manual store
        audits.
      </p>
      <p>
        Results are estimates. Custom themes, headless storefronts, and apps
        that do not inject front-end code may not appear. We improve detection
        over time but do not guarantee completeness or accuracy for every
        store.
      </p>

      <h2>What we are not</h2>
      <ul>
        <li>
          {siteConfig.name} is not affiliated with, endorsed by, or sponsored
          by Shopify Inc.
        </li>
        <li>
          We do not sell themes or apps, and we are not a Shopify Partner
          offering implementation services through this site.
        </li>
        <li>
          Scan results are for informational and research purposes. They should
          not be treated as official statements from the analyzed store or from
          Shopify.
        </li>
      </ul>

      <h2>Responsible use</h2>
      <p>
        Please use {siteConfig.name} lawfully and respectfully. Do not use our
        service to harass store owners, scrape personal data, or attempt to
        circumvent technical protections. We analyze only what is already served
        publicly on the web.
      </p>
      <p>
        Questions or feedback? Visit our{" "}
        <Link href="/contact" className="text-brand hover:underline">
          contact page
        </Link>
        .
      </p>
    </LegalPage>
  );
}
