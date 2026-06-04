import { eq } from "drizzle-orm";
import { getDb, schema } from "@/lib/db";
import { domainToSlug, slugify, slugToDomain } from "@/lib/utils/url";
import type { StoreScanResult } from "@/lib/shopify/types";

const { stores, themes, scans, apps, storeApps, products } = schema;

export async function saveScanResult(result: StoreScanResult) {
  const db = getDb();

  let themeId: number | null = null;

  if (result.theme.themeName) {
    const themeSlug = slugify(result.theme.themeName);
    const existingTheme = await db.query.themes.findFirst({
      where: eq(themes.slug, themeSlug),
    });

    if (existingTheme) {
      themeId = existingTheme.id;
    } else {
      const insertResult = await db.insert(themes).values({
        name: result.theme.themeName,
        slug: themeSlug,
        vendor: result.theme.themeVendor,
        description: result.theme.themeDescription,
        themeStoreUrl: result.theme.themeStoreUrl,
      });
      themeId = Number(insertResult[0].insertId);
    }
  }

  const existingStore = await db.query.stores.findFirst({
    where: eq(stores.domain, result.domain),
  });

  let storeId: number;

  if (existingStore) {
    await db
      .update(stores)
      .set({
        storeName: result.storeName,
        themeId,
        shopifyDomain: result.shopifyDomain,
        shopifyPlan: result.shopifyPlan,
        country: result.country,
        currency: result.currency,
        createdAtOnShopify: result.createdAtOnShopify
          ? new Date(result.createdAtOnShopify)
          : null,
        shopifyDetected: result.shopifyDetected,
        lastScannedAt: new Date(),
      })
      .where(eq(stores.id, existingStore.id));
    storeId = existingStore.id;
  } else {
    const insertResult = await db.insert(stores).values({
      domain: result.domain,
      storeName: result.storeName,
      themeId,
      shopifyDomain: result.shopifyDomain,
      shopifyPlan: result.shopifyPlan,
      country: result.country,
      currency: result.currency,
      createdAtOnShopify: result.createdAtOnShopify
        ? new Date(result.createdAtOnShopify)
        : null,
      shopifyDetected: result.shopifyDetected,
      lastScannedAt: new Date(),
    });
    storeId = Number(insertResult[0].insertId);
  }

  await db.delete(storeApps).where(eq(storeApps.storeId, storeId));
  // Clear legacy per-product rows; stats live in scan_result JSON only.
  await db.delete(products).where(eq(products.storeId, storeId));

  for (const app of result.apps) {
    const existingApp = await db.query.apps.findFirst({
      where: eq(apps.slug, app.slug),
    });

    let appId: number;
    if (existingApp) {
      appId = existingApp.id;
    } else {
      const insertResult = await db.insert(apps).values({
        name: app.name,
        slug: app.slug,
        vendor: app.developerName ?? app.vendor,
        category: app.category,
        officialUrl: app.shopifyAppStoreUrl ?? app.officialUrl,
      });
      appId = Number(insertResult[0].insertId);
    }

    await db.insert(storeApps).values({
      storeId,
      appId,
    });
  }

  await db.insert(scans).values({
    storeId,
    scanResult: result as unknown as Record<string, unknown>,
  });

  return {
    storeId,
    domainSlug: domainToSlug(result.domain),
  };
}

export async function getStoreByDomainSlug(domainSlug: string) {
  const db = getDb();
  const domain = slugToDomain(domainSlug);

  return db.query.stores.findFirst({
    where: eq(stores.domain, domain),
    with: {
      theme: true,
      storeApps: {
        with: { app: true },
      },
      scans: {
        orderBy: (scansTable, { desc: descFn }) => [descFn(scansTable.scanTime)],
        limit: 1,
      },
    },
  });
}

export async function getRecentStores(limit = 6) {
  const db = getDb();
  return db.query.stores.findMany({
    with: { theme: true },
    orderBy: (stores, { desc }) => [desc(stores.lastScannedAt)],
    limit,
  });
}
