"use client";

import { AppCard } from "@/components/apps/app-card";
import { CatalogSearchGrid } from "@/components/catalog/catalog-search-grid";
import type { FeaturedApp } from "@/lib/constants/featured-apps";

interface AppsCatalogProps {
  apps: FeaturedApp[];
}

export function AppsCatalog({ apps }: AppsCatalogProps) {
  return (
    <CatalogSearchGrid
      items={apps}
      searchPlaceholder="Search apps…"
      emptyMessage="No apps match your search. Try another keyword."
      resultLabel="apps"
      getItemKey={(a) => a.slug}
      getSearchText={(a) =>
        `${a.name} ${a.developerName} ${a.category} ${a.description} ${a.listTitle}`
      }
      renderItem={(app) => <AppCard app={app} />}
    />
  );
}
