"use client";

import { ThemeCard } from "@/components/themes/theme-card";
import { CatalogSearchGrid } from "@/components/catalog/catalog-search-grid";
import type { FeaturedTheme } from "@/lib/constants/featured-themes";

interface ThemesCatalogProps {
  themes: FeaturedTheme[];
}

export function ThemesCatalog({ themes }: ThemesCatalogProps) {
  return (
    <CatalogSearchGrid
      items={themes}
      searchPlaceholder="Search themes…"
      emptyMessage="No themes match your search. Try another name or vendor."
      resultLabel="themes"
      getItemKey={(t) => t.slug}
      getSearchText={(t) => `${t.name} ${t.vendor} ${t.description} ${t.priceLabel}`}
      renderItem={(theme) => <ThemeCard theme={theme} />}
    />
  );
}
