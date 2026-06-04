import { desc, eq } from "drizzle-orm";
import { getDb, schema } from "@/lib/db";

const { stores, themes } = schema;

export async function getStoresUsingThemeSlug(themeSlug: string, limit = 12) {
  const db = getDb();

  const themeRecord = await db.query.themes.findFirst({
    where: eq(themes.slug, themeSlug),
  });

  if (!themeRecord) {
    return [];
  }

  return db.query.stores.findMany({
    where: eq(stores.themeId, themeRecord.id),
    orderBy: [desc(stores.lastScannedAt)],
    limit,
    with: { theme: true },
  });
}
