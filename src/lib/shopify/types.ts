export interface ThemeDetectionResult {
  themeName: string | null;
  themeVendor: string | null;
  themeDescription: string | null;
  themeStoreUrl: string | null;
  /** schema_version from Shopify.theme or data-theme-version on storefront */
  themeVersion: string | null;
  confidenceScore: number;
}

export interface AppDetectionResult {
  name: string;
  slug: string;
  /** Full listing title on Shopify App Store */
  listTitle: string;
  category: string | null;
  /** App developer / partner name */
  vendor: string | null;
  developerName: string;
  /** Primary link — Shopify App Store listing */
  shopifyAppStoreUrl: string | null;
  officialUrl: string | null;
  pricingLabel: string | null;
  rating: number | null;
  reviewCount: number | null;
  rankingBadge: string | null;
  iconUrl: string | null;
  confidenceScore: number;
}

export interface ProductStatsSummary {
  /** Total products from /products/count.json */
  count: number | null;
  averagePrice: number | null;
  minPrice: number | null;
  maxPrice: number | null;
  /** Formatted range, e.g. "$12.00 – $89.00" */
  priceRange: string | null;
  currency: string | null;
  /** Products included in price calculations */
  pricedProductCount: number;
  /** When catalog is large, prices may be based on a capped sample */
  isSampled: boolean;
}

export interface StoreScanResult {
  domain: string;
  storeUrl: string;
  storeName: string | null;
  shopifyDetected: boolean;
  shopifyDomain: string | null;
  shopifyPlan: string | null;
  country: string | null;
  currency: string | null;
  createdAtOnShopify: string | null;
  theme: ThemeDetectionResult;
  apps: AppDetectionResult[];
  productStats: ProductStatsSummary;
  rawThemeId: string | null;
}
