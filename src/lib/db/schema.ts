import {
  mysqlTable,
  varchar,
  text,
  int,
  boolean,
  timestamp,
  json,
  index,
} from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";

export const themes = mysqlTable(
  "themes",
  {
    id: int("id").primaryKey().autoincrement(),
    name: varchar("name", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    vendor: varchar("vendor", { length: 255 }),
    description: text("description"),
    themeStoreUrl: varchar("theme_store_url", { length: 512 }),
    priceType: varchar("price_type", { length: 16 }),
    priceLabel: varchar("price_label", { length: 64 }),
    imageUrl: varchar("image_url", { length: 1024 }),
    imageAlt: varchar("image_alt", { length: 255 }),
    isListed: boolean("is_listed").default(false).notNull(),
    sortOrder: int("sort_order").default(0).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("themes_slug_idx").on(table.slug),
    index("themes_listed_idx").on(table.isListed),
  ]
);

export const apps = mysqlTable(
  "apps",
  {
    id: int("id").primaryKey().autoincrement(),
    name: varchar("name", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    vendor: varchar("vendor", { length: 255 }),
    category: varchar("category", { length: 128 }),
    officialUrl: varchar("official_url", { length: 512 }),
    listTitle: varchar("list_title", { length: 255 }),
    description: text("description"),
    pricingLabel: varchar("pricing_label", { length: 128 }),
    rating: varchar("rating", { length: 8 }),
    reviewCount: int("review_count"),
    rankingBadge: varchar("ranking_badge", { length: 32 }),
    iconUrl: varchar("icon_url", { length: 1024 }),
    appStoreSlug: varchar("app_store_slug", { length: 128 }),
    isListed: boolean("is_listed").default(false).notNull(),
    sortOrder: int("sort_order").default(0).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("apps_slug_idx").on(table.slug),
    index("apps_listed_idx").on(table.isListed),
  ]
);

export const stores = mysqlTable(
  "stores",
  {
    id: int("id").primaryKey().autoincrement(),
    domain: varchar("domain", { length: 255 }).notNull().unique(),
    storeName: varchar("store_name", { length: 255 }),
    themeId: int("theme_id").references(() => themes.id),
    shopifyDomain: varchar("shopify_domain", { length: 255 }),
    shopifyPlan: varchar("shopify_plan", { length: 64 }),
    country: varchar("country", { length: 64 }),
    currency: varchar("currency", { length: 16 }),
    createdAtOnShopify: timestamp("created_at_on_shopify"),
    shopifyDetected: boolean("shopify_detected").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    lastScannedAt: timestamp("last_scanned_at"),
  },
  (table) => [index("stores_domain_idx").on(table.domain)]
);

export const products = mysqlTable(
  "products",
  {
    id: int("id").primaryKey().autoincrement(),
    storeId: int("store_id")
      .notNull()
      .references(() => stores.id, { onDelete: "cascade" }),
    title: varchar("title", { length: 255 }).notNull(),
    handle: varchar("handle", { length: 255 }).notNull(),
    productUrl: varchar("product_url", { length: 512 }).notNull(),
    imageUrl: varchar("image_url", { length: 1024 }),
    price: varchar("price", { length: 64 }),
    currency: varchar("currency", { length: 16 }),
    detectedAt: timestamp("detected_at").defaultNow().notNull(),
  },
  (table) => [
    index("products_store_idx").on(table.storeId),
    index("products_handle_idx").on(table.handle),
  ]
);

export const storeApps = mysqlTable(
  "store_apps",
  {
    id: int("id").primaryKey().autoincrement(),
    storeId: int("store_id")
      .notNull()
      .references(() => stores.id, { onDelete: "cascade" }),
    appId: int("app_id")
      .notNull()
      .references(() => apps.id, { onDelete: "cascade" }),
    detectedAt: timestamp("detected_at").defaultNow().notNull(),
  },
  (table) => [
    index("store_apps_store_idx").on(table.storeId),
    index("store_apps_app_idx").on(table.appId),
  ]
);

export const scans = mysqlTable(
  "scans",
  {
    id: int("id").primaryKey().autoincrement(),
    storeId: int("store_id")
      .notNull()
      .references(() => stores.id, { onDelete: "cascade" }),
    scanResult: json("scan_result").$type<Record<string, unknown>>(),
    scanTime: timestamp("scan_time").defaultNow().notNull(),
  },
  (table) => [index("scans_store_idx").on(table.storeId)]
);

export const themesRelations = relations(themes, ({ many }) => ({
  stores: many(stores),
}));

export const appsRelations = relations(apps, ({ many }) => ({
  storeApps: many(storeApps),
}));

export const storesRelations = relations(stores, ({ one, many }) => ({
  theme: one(themes, {
    fields: [stores.themeId],
    references: [themes.id],
  }),
  storeApps: many(storeApps),
  products: many(products),
  scans: many(scans),
}));

export const storeAppsRelations = relations(storeApps, ({ one }) => ({
  store: one(stores, {
    fields: [storeApps.storeId],
    references: [stores.id],
  }),
  app: one(apps, {
    fields: [storeApps.appId],
    references: [apps.id],
  }),
}));

export const scansRelations = relations(scans, ({ one }) => ({
  store: one(stores, {
    fields: [scans.storeId],
    references: [stores.id],
  }),
}));

export const productsRelations = relations(products, ({ one }) => ({
  store: one(stores, {
    fields: [products.storeId],
    references: [stores.id],
  }),
}));

export type Theme = typeof themes.$inferSelect;
export type NewTheme = typeof themes.$inferInsert;
export type App = typeof apps.$inferSelect;
export type Store = typeof stores.$inferSelect;
export type Scan = typeof scans.$inferSelect;
export type Product = typeof products.$inferSelect;
