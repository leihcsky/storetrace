const SHOPIFY_INDICATORS = [
  /cdn\.shopify\.com/i,
  /Shopify\.theme/i,
  /shopify-section/i,
  /myshopify\.com/i,
  /"shopify"/i,
  /window\.Shopify/i,
];

export function detectShopify(html: string): boolean {
  return SHOPIFY_INDICATORS.some((pattern) => pattern.test(html));
}

export function extractStoreName(html: string): string | null {
  const ogTitle = html.match(
    /<meta[^>]+property=["']og:site_name["'][^>]+content=["']([^"']+)["']/i
  );
  if (ogTitle?.[1]) return decodeHtmlEntities(ogTitle[1]);

  const title = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  if (title?.[1]) return decodeHtmlEntities(title[1].trim());

  return null;
}

export function extractCurrency(html: string): string | null {
  const match = html.match(/Shopify\.currency\s*=\s*["']([A-Z]{3})["']/i);
  return match?.[1] ?? null;
}

export function extractCountry(html: string): string | null {
  const match = html.match(/Shopify\.country\s*=\s*["']([A-Z]{2})["']/i);
  return match?.[1] ?? null;
}

export function extractShopifyDomain(html: string): string | null {
  const shopMeta = html.match(
    /<meta[^>]+property=["']og:url["'][^>]+content=["']https?:\/\/([^/"']+)/i
  );
  if (shopMeta?.[1]) return shopMeta[1];

  const shopifyShop = html.match(/Shopify\.shop\s*=\s*["']([^"']+)["']/i);
  return shopifyShop?.[1] ?? null;
}

export function extractShopifyPlan(html: string): string | null {
  const plan = html.match(/Shopify\.plan\s*=\s*["']([^"']+)["']/i);
  return plan?.[1] ?? null;
}

export function extractStoreCreatedAt(html: string): string | null {
  const published = html.match(
    /<meta[^>]+property=["']article:published_time["'][^>]+content=["']([^"']+)["']/i
  );
  return published?.[1] ?? null;
}

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}
