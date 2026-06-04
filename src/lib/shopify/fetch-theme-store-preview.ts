/**
 * Fetch a theme listing preview image from themes.shopify.com HTML.
 * Shopify does not expose theme thumbnails via public API — previews live in
 * the Theme Store page source as cdn.shopify.com/theme-store/{hash}.jpg URLs.
 */
const THEME_STORE_IMAGE =
  /https:\/\/cdn\.shopify\.com\/theme-store\/[a-z0-9]+\.jpg(?:\?[^"'\s]*)?/gi;

export async function fetchThemeStorePreviewUrl(
  themeSlug: string
): Promise<string | null> {
  const pageUrl = `https://themes.shopify.com/themes/${themeSlug}`;

  const response = await fetch(pageUrl, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; StoreTrace/1.0)",
      Accept: "text/html",
    },
    next: { revalidate: 86400 },
  });

  if (!response.ok) {
    return null;
  }

  const html = await response.text();
  const matches = [...html.matchAll(THEME_STORE_IMAGE)].map((m) => m[0]);

  if (!matches.length) {
    return null;
  }

  const preferred =
    matches.find(
      (m) => m.includes("width=1200") || m.includes("width=1368")
    ) ?? matches[0];

  const base = preferred.split("?")[0];
  return `${base}?width=1200&quality=80`;
}
