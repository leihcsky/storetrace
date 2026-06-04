import Link from "next/link";
import { ThemeCard } from "@/components/themes/theme-card";
import { popularThemes } from "@/lib/constants/popular-themes";

const homepageThemes = popularThemes.slice(0, 6);

export function PopularThemes() {
  return (
    <section
      className="bg-slate-50 py-16 sm:py-20"
      aria-labelledby="popular-themes-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <h2
            id="popular-themes-heading"
            className="text-2xl font-bold text-slate-900 sm:text-3xl"
          >
            Popular Shopify Themes
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Themes we often detect on successful stores — preview, compare, and
            install from the Shopify Theme Store.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {homepageThemes.map((theme) => (
            <ThemeCard key={theme.slug} theme={theme} />
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 text-center">
          <Link
            href="/themes"
            className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-brand-muted hover:text-brand"
          >
            View all themes →
          </Link>
          <p className="max-w-xl text-xs text-slate-400">
            &quot;Get theme&quot; links go to the Shopify Theme Store.
            {process.env.NEXT_PUBLIC_SHOPIFY_THEME_AFFILIATE_REF
              ? " Some links are affiliate links — we may earn a commission at no extra cost to you."
              : " Configure NEXT_PUBLIC_SHOPIFY_THEME_AFFILIATE_REF to enable partner affiliate tracking."}
          </p>
        </div>
      </div>
    </section>
  );
}
