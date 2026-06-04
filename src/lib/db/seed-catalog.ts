import { eq, sql } from "drizzle-orm";
import { getDb, schema } from "@/lib/db";
import { themeCatalogSeed } from "@/lib/catalog/theme-catalog-seed";
import { appListingCatalog } from "@/lib/catalog/app-listing-catalog";
import { getShopifyAppStoreUrl } from "@/lib/constants/app-catalog";

const { themes, apps } = schema;

function isSchemaMismatchError(error: unknown): boolean {
  const err = error as { code?: string; errno?: number };
  return err?.code === "ER_BAD_FIELD_ERROR" || err?.errno === 1054;
}

/** True when 0002_catalog_listings migration columns exist */
export async function isCatalogSchemaReady(): Promise<boolean> {
  if (!process.env.DATABASE_URL) return false;

  try {
    const db = getDb();
    await db.execute(sql`SELECT \`is_listed\` FROM \`themes\` LIMIT 0`);
    await db.execute(sql`SELECT \`is_listed\` FROM \`apps\` LIMIT 0`);
    return true;
  } catch (error) {
    if (isSchemaMismatchError(error)) return false;
    throw error;
  }
}

export async function seedThemesCatalog() {
  const db = getDb();

  for (const theme of themeCatalogSeed) {
    await db
      .insert(themes)
      .values({
        name: theme.name,
        slug: theme.slug,
        vendor: theme.vendor,
        description: theme.description,
        themeStoreUrl: theme.themeStoreUrl,
        priceType: theme.priceType,
        priceLabel: theme.priceLabel,
        imageUrl: theme.imageUrl,
        imageAlt: theme.imageAlt,
        isListed: true,
        sortOrder: theme.sortOrder,
      })
      .onDuplicateKeyUpdate({
        set: {
          name: theme.name,
          vendor: theme.vendor,
          description: theme.description,
          themeStoreUrl: theme.themeStoreUrl,
          priceType: theme.priceType,
          priceLabel: theme.priceLabel,
          imageUrl: theme.imageUrl,
          imageAlt: theme.imageAlt,
          isListed: true,
          sortOrder: theme.sortOrder,
        },
      });
  }
}

export async function seedAppsCatalog() {
  const db = getDb();

  for (const app of appListingCatalog) {
    const officialUrl = getShopifyAppStoreUrl(app.appStoreSlug);
    await db
      .insert(apps)
      .values({
        name: app.name,
        slug: app.slug,
        vendor: app.developerName,
        category: app.category,
        officialUrl,
        listTitle: app.listTitle,
        description: app.description,
        pricingLabel: app.pricingLabel,
        rating: app.rating != null ? String(app.rating) : null,
        reviewCount: app.reviewCount,
        rankingBadge: app.rankingBadge,
        iconUrl: app.iconUrl,
        appStoreSlug: app.appStoreSlug,
        isListed: true,
        sortOrder: app.sortOrder,
      })
      .onDuplicateKeyUpdate({
        set: {
          name: app.name,
          vendor: app.developerName,
          category: app.category,
          officialUrl,
          listTitle: app.listTitle,
          description: app.description,
          pricingLabel: app.pricingLabel,
          rating: app.rating != null ? String(app.rating) : null,
          reviewCount: app.reviewCount,
          rankingBadge: app.rankingBadge,
          iconUrl: app.iconUrl,
          appStoreSlug: app.appStoreSlug,
          isListed: true,
          sortOrder: app.sortOrder,
        },
      });
  }
}

export async function seedCatalog() {
  await seedThemesCatalog();
  await seedAppsCatalog();
}

export async function ensureThemesCatalogSeeded(): Promise<boolean> {
  if (!process.env.DATABASE_URL) return false;

  try {
    if (!(await isCatalogSchemaReady())) return false;

    const db = getDb();
    const [row] = await db
      .select({ count: sql<number>`count(*)` })
      .from(themes)
      .where(eq(themes.isListed, true));

    const listedCount = Number(row?.count ?? 0);
    if (listedCount >= themeCatalogSeed.length) {
      return true;
    }

    await seedThemesCatalog();
    return true;
  } catch (error) {
    if (isSchemaMismatchError(error)) return false;
    console.error("[catalog] themes seed failed:", error);
    return false;
  }
}

export async function ensureAppsCatalogSeeded(): Promise<boolean> {
  if (!process.env.DATABASE_URL) return false;

  try {
    if (!(await isCatalogSchemaReady())) return false;

    const db = getDb();
    const [row] = await db
      .select({ count: sql<number>`count(*)` })
      .from(apps)
      .where(eq(apps.isListed, true));

    const listedCount = Number(row?.count ?? 0);
    if (listedCount >= appListingCatalog.length) {
      return true;
    }

    await seedAppsCatalog();
    return true;
  } catch (error) {
    if (isSchemaMismatchError(error)) return false;
    console.error("[catalog] apps seed failed:", error);
    return false;
  }
}

/** @deprecated Use ensureThemesCatalogSeeded / ensureAppsCatalogSeeded */
export async function ensureCatalogSeeded() {
  const themesOk = await ensureThemesCatalogSeeded();
  const appsOk = await ensureAppsCatalogSeeded();
  return themesOk && appsOk;
}
