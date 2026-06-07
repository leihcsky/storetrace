import { extractDomain, normalizeStoreUrl } from "@/lib/utils/url";
import {
  fetchStoreHtml,
  fetchStoreHtmlByPath,
  fetchStoreJson,
  fetchTextUrl,
} from "./fetch-store";
import {
  detectShopify,
  extractCountry,
  extractCurrency,
  extractShopifyDomain,
  extractShopifyPlan,
  extractStoreCreatedAt,
  extractStoreName,
} from "./detect-shopify";
import { detectTheme } from "./detect-theme";
import { detectApps } from "./detect-apps";
import { detectStorefrontType } from "./detect-storefront";
import { fetchStoreProductStats } from "./fetch-products";
import type { StoreScanResult } from "./types";

export async function scanStore(inputUrl: string): Promise<StoreScanResult> {
  const storeUrl = normalizeStoreUrl(inputUrl);
  const domain = extractDomain(storeUrl);
  const [homepageHtml, collectionHtml, cartHtml] = await Promise.all([
    fetchStoreHtml(storeUrl),
    fetchStoreHtmlByPath(storeUrl, "/collections/all"),
    // Many apps (discounts, returns, upsell) inject only on cart / drawer pages.
    fetchStoreHtmlByPath(storeUrl, "/cart"),
  ]);

  const scriptUrls = extractSameOriginScriptUrls(storeUrl, homepageHtml).slice(0, 10);
  const scriptTexts = await Promise.all(scriptUrls.map((url) => fetchTextUrl(url)));
  const jsCorpus = scriptTexts.filter(Boolean).join("\n");
  const htmlCorpus = [homepageHtml, collectionHtml ?? "", cartHtml ?? ""].join(
    "\n"
  );
  const corpus = `${htmlCorpus}\n${jsCorpus}`;

  const shopMeta = await fetchStoreJson<{
    currency?: string;
    country?: string;
    name?: string;
  }>(storeUrl, "/meta.json");

  const shopifyDetected = detectShopify(htmlCorpus);
  const storefrontType = detectStorefrontType(corpus);
  const theme = detectTheme(corpus);
  const apps = detectApps(corpus);
  const currency = extractCurrency(corpus) ?? shopMeta?.currency ?? null;
  const productStats = await fetchStoreProductStats(storeUrl, currency);

  return {
    domain,
    storeUrl,
    storeName: extractStoreName(htmlCorpus) ?? shopMeta?.name ?? null,
    shopifyDetected,
    storefrontType,
    shopifyDomain: extractShopifyDomain(htmlCorpus),
    shopifyPlan: extractShopifyPlan(corpus),
    country: extractCountry(corpus) ?? shopMeta?.country ?? null,
    currency,
    createdAtOnShopify: extractStoreCreatedAt(htmlCorpus),
    theme: {
      themeName: theme.themeName,
      themeVendor: theme.themeVendor,
      themeDescription: theme.themeDescription,
      themeStoreUrl: theme.themeStoreUrl,
      themeVersion: theme.themeVersion,
      confidenceScore: theme.confidenceScore,
    },
    apps,
    productStats,
    rawThemeId: theme.rawThemeId,
  };
}

function extractSameOriginScriptUrls(baseUrl: string, html: string): string[] {
  const srcMatches = [...html.matchAll(/<script[^>]+src=["']([^"']+)["']/gi)].map(
    (m) => m[1]
  );
  const base = new URL(baseUrl);
  const urls: string[] = [];

  for (const src of srcMatches) {
    try {
      const resolved = new URL(src, baseUrl);
      if (resolved.hostname !== base.hostname) continue;
      if (!resolved.pathname.endsWith(".js")) continue;
      urls.push(resolved.toString());
    } catch {
      // ignore invalid URLs
    }
  }

  return [...new Set(urls)];
}
