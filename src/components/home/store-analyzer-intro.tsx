import Link from "next/link";
import { BarChart3, Layers, Puzzle, Palette } from "lucide-react";

const reportItems = [
  {
    icon: Palette,
    title: "Theme detection",
    body: "See which Shopify theme powers the store — name, vendor, Theme Store link, and confidence when signals are mixed.",
  },
  {
    icon: Puzzle,
    title: "App signals",
    body: "Spot publicly visible apps for reviews, email, subscriptions, and conversion — Klaviyo, Judge.me, and more when they leave traces in code.",
  },
  {
    icon: Layers,
    title: "Store metadata",
    body: "Currency, country, and other storefront clues that help you benchmark positioning without admin access.",
  },
  {
    icon: BarChart3,
    title: "One shareable report",
    body: "Every scan opens a unified store analysis page with Theme, Apps, and Overview tabs — rescan or switch tools without starting over.",
  },
];

export function StoreAnalyzerIntro() {
  return (
    <section
      className="border-t border-slate-200 bg-white py-16 sm:py-20"
      aria-labelledby="store-analyzer-intro-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="store-analyzer-intro-heading"
            className="text-2xl font-bold text-slate-900 sm:text-3xl"
          >
            What This Shopify Store Analyzer Does
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            A Shopify store analyzer inspects a public storefront and turns it
            into actionable intelligence. Paste any store URL above — our free
            Shopify store analyzer fetches the live site, detects the theme and
            apps, and builds a store analysis report you can use for competitor
            research, client audits, or theme shopping.
          </p>
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2">
          {reportItems.map((item) => {
            const Icon = item.icon;
            return (
              <li
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-light text-brand">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.body}
                </p>
              </li>
            );
          })}
        </ul>

        <div className="mx-auto mt-14 max-w-3xl space-y-5 text-slate-600 leading-relaxed">
          <h3 className="text-center text-lg font-semibold text-slate-900">
            Who uses a Shopify store analyzer?
          </h3>
          <p>
            Dropshippers and DTC brands compare successful stores in their niche
            before choosing a theme. Agencies document a client&apos;s stack
            before a redesign. Merchants benchmark apps and layout patterns from
            competitors — faster than manual page-source checks alone.
          </p>
          <p>
            Need only the theme or only apps? Use our{" "}
            <Link
              href="/tools/theme-detector"
              className="font-medium text-brand hover:underline"
            >
              Shopify theme detector
            </Link>{" "}
            or{" "}
            <Link
              href="/tools/app-detector"
              className="font-medium text-brand hover:underline"
            >
              app detector
            </Link>
            . The homepage store analyzer is the full pass: theme, apps, and
            store insights from one URL.
          </p>
        </div>
      </div>
    </section>
  );
}
