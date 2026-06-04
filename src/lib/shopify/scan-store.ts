import { extractDomain, normalizeStoreUrl } from "@/lib/utils/url";
import { fetchStoreHtml, fetchStoreHtmlByPath, fetchTextUrl } from "./fetch-store";
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
import { fetchStoreProductStats } from "./fetch-products";
import type { StoreScanResult } from "./types";

export async function scanStore(inputUrl: string): Promise<StoreScanResult> {
  const storeUrl = normalizeStoreUrl(inputUrl);
  const domain = extractDomain(storeUrl);
  const homepageHtml = await fetchStoreHtml(storeUrl);
  const collectionHtml = await fetchStoreHtmlByPath(storeUrl, "/collections/all");

  const scriptUrls = extractSameOriginScriptUrls(storeUrl, homepageHtml).slice(0, 10);
  const scriptTexts = await Promise.all(scriptUrls.map((url) => fetchTextUrl(url)));
  const jsCorpus = scriptTexts.filter(Boolean).join("\n");
  const htmlCorpus = [homepageHtml, collectionHtml ?? ""].join("\n");
  const corpus = `${htmlCorpus}\n${jsCorpus}`;

  const shopifyDetected = detectShopify(htmlCorpus);
  const theme = detectTheme(corpus);
  const apps = detectApps(corpus);
  const currency = extractCurrency(htmlCorpus);
  const productStats = await fetchStoreProductStats(storeUrl, currency);

  return {
    domain,
    storeUrl,
    storeName: extractStoreName(htmlCorpus),
    shopifyDetected,
    shopifyDomain: extractShopifyDomain(htmlCorpus),
    shopifyPlan: extractShopifyPlan(corpus),
    country: extractCountry(htmlCorpus),
    currency,
    createdAtOnShopify: extractStoreCreatedAt(htmlCorpus),
    theme: {
      themeName: theme.themeName,
      themeVendor: theme.themeVendor,
      themeDescription: theme.themeDescription,
      themeStoreUrl: theme.themeStoreUrl,
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
