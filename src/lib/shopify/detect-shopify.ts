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
  const objectMatch = html.match(
    /Shopify\.currency\s*=\s*\{[^}]*["']active["']\s*:\s*["']([A-Z]{3})["']/i
  );
  if (objectMatch?.[1]) return objectMatch[1];

  const stringMatch = html.match(/Shopify\.currency\s*=\s*["']([A-Z]{3})["']/i);
  if (stringMatch?.[1]) return stringMatch[1];

  const analyticsMatch = html.match(
    /ShopifyAnalytics\.meta\.currency\s*=\s*['"]([A-Z]{3})['"]/i
  );
  if (analyticsMatch?.[1]) return analyticsMatch[1];

  const paymentMatch = html.match(/"currencyCode"\s*:\s*"([A-Z]{3})"/i);
  if (paymentMatch?.[1]) return paymentMatch[1];

  return null;
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
  const direct = html.match(/Shopify\.plan\s*=\s*["']([^"']+)["']/i);
  if (direct?.[1]) return formatShopifyPlan(direct[1]);

  const planName = html.match(/["']plan_name["']\s*:\s*["']([^"']+)["']/i);
  if (planName?.[1]) return formatShopifyPlan(planName[1]);

  const planObject = html.match(/["']plan["']\s*:\s*\{[^}]*["']name["']\s*:\s*["']([^"']+)["']/i);
  if (planObject?.[1]) return formatShopifyPlan(planObject[1]);

  if (/shopify\.com\/plus|shopify_plus|Shopify\.plus/i.test(html)) {
    return "Shopify Plus";
  }

  return null;
}

function formatShopifyPlan(raw: string): string {
  const normalized = raw.trim().toLowerCase().replace(/_/g, " ");
  const labels: Record<string, string> = {
    basic: "Basic",
    professional: "Shopify",
    unlimited: "Advanced",
    shopify: "Shopify",
    advanced: "Advanced",
    plus: "Shopify Plus",
    "shopify plus": "Shopify Plus",
    retail: "Retail",
    trial: "Trial",
    frozen: "Frozen",
    cancelled: "Cancelled",
    dormant: "Dormant",
  };
  return labels[normalized] ?? raw.trim();
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
