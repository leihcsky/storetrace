const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36";

const ICON_PATTERN =
  /https:\/\/cdn\.shopify\.com\/app-store\/listing_images\/[^"'\s]+\/icon\/[^"'\s]+\.png/i;

export interface AppStoreListingMeta {
  appStoreSlug: string;
  shopifyAppStoreUrl: string;
  iconUrl: string | null;
  listTitle: string | null;
}

/**
 * Fetches icon + title from a verified Shopify App Store listing page.
 */
export async function fetchAppStoreListingMeta(
  appStoreSlug: string
): Promise<AppStoreListingMeta | null> {
  const shopifyAppStoreUrl = `https://apps.shopify.com/${appStoreSlug}`;

  try {
    const response = await fetch(shopifyAppStoreUrl, {
      headers: { "User-Agent": USER_AGENT, Accept: "text/html" },
      next: { revalidate: 86400 },
    });

    if (!response.ok) return null;

    const html = await response.text();
    const iconMatch = html.match(ICON_PATTERN);
    const titleMatch = html.match(/<title>([^<]+)<\/title>/i);

    let listTitle: string | null = null;
    if (titleMatch?.[1]) {
      listTitle = titleMatch[1]
        .replace(/\s*[|\-–].*Shopify App Store.*$/i, "")
        .trim();
    }

    return {
      appStoreSlug,
      shopifyAppStoreUrl,
      iconUrl: iconMatch?.[0] ?? null,
      listTitle: listTitle || null,
    };
  } catch {
    return null;
  }
}
