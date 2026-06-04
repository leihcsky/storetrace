import Link from "next/link";
import { ThemesCatalog } from "@/components/themes/themes-catalog";
import { popularThemes } from "@/lib/constants/popular-themes";
import { createPageMetadata } from "@/lib/utils/metadata";

export const metadata = createPageMetadata({
  title: "Popular Shopify Themes",
  description:
    "Browse popular Shopify themes from the Theme Store — previews, free and premium options, and links to install.",
  path: "/themes",
});

export default function ThemesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
        Popular Shopify Themes
      </h1>
      <p className="mt-3 max-w-2xl text-slate-600">
        {popularThemes.length} themes merchants use to launch and grow on Shopify.
        Search by name or vendor, preview screenshots, and open the Theme Store.
      </p>

      <div className="mt-10">
        <ThemesCatalog themes={popularThemes} />
      </div>

      <p className="mt-12 text-center">
        <Link
          href="/tools/theme-detector"
          className="font-medium text-brand hover:underline"
        >
          Detect a theme on any store →
        </Link>
      </p>
    </div>
  );
}
