import { desc, eq } from "drizzle-orm";
import { getDb, schema } from "@/lib/db";

const { stores, apps, storeApps } = schema;

export async function getStoresUsingAppSlug(appSlug: string, limit = 12) {
  const db = getDb();

  const appRecord = await db.query.apps.findFirst({
    where: eq(apps.slug, appSlug),
  });

  if (!appRecord) {
    return [];
  }

  const links = await db.query.storeApps.findMany({
    where: eq(storeApps.appId, appRecord.id),
    limit: limit * 3,
    with: { store: true },
  });

  const seen = new Set<number>();
  const results: (typeof stores.$inferSelect)[] = [];

  for (const link of links) {
    if (!link.store || seen.has(link.store.id)) continue;
    seen.add(link.store.id);
    results.push(link.store);
    if (results.length >= limit) break;
  }

  return results.sort((a, b) => {
    const aTime = a.lastScannedAt?.getTime() ?? 0;
    const bTime = b.lastScannedAt?.getTime() ?? 0;
    return bTime - aTime;
  });
}
