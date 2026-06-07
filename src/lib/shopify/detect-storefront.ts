export type StorefrontType = "liquid" | "hydrogen" | "unknown";

/** Liquid Online Store vs Hydrogen/Oxygen headless vs inconclusive. */
export function detectStorefrontType(html: string): StorefrontType {
  if (/Shopify\.theme|shopify-section/i.test(html)) {
    return "liquid";
  }

  if (
    /cdn\.shopify\.com\/oxygen-v2/i.test(html) ||
    /@shopify\/hydrogen/i.test(html) ||
    /__reactRouterContext/i.test(html)
  ) {
    return "hydrogen";
  }

  return "unknown";
}

export function isHydrogenStorefront(html: string): boolean {
  return detectStorefrontType(html) === "hydrogen";
}
