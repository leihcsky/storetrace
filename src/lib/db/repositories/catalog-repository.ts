import { asc, eq } from "drizzle-orm";
import { getDb, schema } from "@/lib/db";
import {
  ensureAppsCatalogSeeded,
  ensureThemesCatalogSeeded,
  isCatalogSchemaReady,
} from "@/lib/db/seed-catalog";
import {
  appListingCatalog,
  appListingToFeaturedShape,
} from "@/lib/catalog/app-listing-catalog";
import { themeCatalogSeed } from "@/lib/catalog/theme-catalog-seed";
import { getShopifyAppStoreUrl } from "@/lib/constants/app-catalog";
import type { FeaturedApp } from "@/lib/constants/featured-apps";

const { themes, apps } = schema;

export interface CatalogThemeListItem {
  slug: string;
  name: string;
  vendor: string;
  description: string;
  priceType: "free" | "premium";
  priceLabel: string;
  themeStoreUrl: string;
  imageUrl: string;
  imageAlt: string;
}

function seedThemeToListItem(
  theme: (typeof themeCatalogSeed)[number]
): CatalogThemeListItem {
  return {
    slug: theme.slug,
    name: theme.name,
    vendor: theme.vendor,
    description: theme.description,
    priceType: theme.priceType,
    priceLabel: theme.priceLabel,
    themeStoreUrl: theme.themeStoreUrl,
    imageUrl: theme.imageUrl ?? "",
    imageAlt: theme.imageAlt,
  };
}

function rowToThemeListItem(row: typeof themes.$inferSelect): CatalogThemeListItem {
  return {
    slug: row.slug,
    name: row.name,
    vendor: row.vendor ?? "Unknown",
    description: row.description ?? "",
    priceType: (row.priceType === "premium" ? "premium" : "free") as "free" | "premium",
    priceLabel: row.priceLabel ?? "Unknown",
    themeStoreUrl: row.themeStoreUrl ?? `https://themes.shopify.com/themes/${row.slug}`,
    imageUrl: row.imageUrl ?? "",
    imageAlt: row.imageAlt ?? `${row.name} Shopify theme preview`,
  };
}

function rowToFeaturedApp(row: typeof apps.$inferSelect): FeaturedApp {
  const appStoreSlug = row.appStoreSlug ?? row.slug;
  return {
    slug: row.slug,
    name: row.name,
    listTitle: row.listTitle ?? row.name,
    developerName: row.vendor ?? row.name,
    category: row.category ?? "Shopify App",
    description: row.description ?? `${row.name} for Shopify stores.`,
    pricingLabel: row.pricingLabel,
    rating: row.rating ? parseFloat(row.rating) : null,
    reviewCount: row.reviewCount,
    rankingBadge: row.rankingBadge,
    iconUrl: row.iconUrl ?? "",
    shopifyAppStoreUrl:
      row.officialUrl ?? getShopifyAppStoreUrl(appStoreSlug),
  };
}

export async function getCatalogThemes(): Promise<CatalogThemeListItem[]> {
  const fallback = themeCatalogSeed.map(seedThemeToListItem);

  if (!process.env.DATABASE_URL) {
    return fallback;
  }

  try {
    if (!(await isCatalogSchemaReady())) {
      return fallback;
    }

    await ensureThemesCatalogSeeded();
    const db = getDb();
    const rows = await db.query.themes.findMany({
      where: eq(themes.isListed, true),
      orderBy: [asc(themes.sortOrder), asc(themes.name)],
    });

    if (rows.length === 0) {
      return fallback;
    }

    return rows.map(rowToThemeListItem);
  } catch {
    return fallback;
  }
}

export async function getCatalogApps(): Promise<FeaturedApp[]> {
  const fallback = appListingCatalog.map(appListingToFeaturedShape);

  if (!process.env.DATABASE_URL) {
    return fallback;
  }

  try {
    if (!(await isCatalogSchemaReady())) {
      return fallback;
    }

    await ensureAppsCatalogSeeded();
    const db = getDb();
    const rows = await db.query.apps.findMany({
      where: eq(apps.isListed, true),
      orderBy: [asc(apps.sortOrder), asc(apps.name)],
    });

    if (rows.length === 0) {
      return fallback;
    }

    return rows.map(rowToFeaturedApp);
  } catch {
    return fallback;
  }
}

export async function getCatalogAppBySlug(
  slug: string
): Promise<FeaturedApp | null> {
  const fallback = appListingCatalog.find((a) => a.slug === slug);
  if (fallback) {
    return appListingToFeaturedShape(fallback);
  }

  if (!process.env.DATABASE_URL) {
    return null;
  }

  try {
    if (!(await isCatalogSchemaReady())) {
      return appListingToFeaturedShape(fallback);
    }

    await ensureAppsCatalogSeeded();
    const db = getDb();
    const row = await db.query.apps.findFirst({
      where: eq(apps.slug, slug),
    });

    if (!row || !row.isListed) {
      return appListingToFeaturedShape(fallback);
    }

    return rowToFeaturedApp(row);
  } catch {
    return appListingToFeaturedShape(fallback);
  }
}
