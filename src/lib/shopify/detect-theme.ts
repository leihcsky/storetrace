import type { ThemeDetectionResult } from "./types";

interface ThemeCandidate {
  name: string | null;
  vendor: string | null;
  description: string | null;
  themeStoreUrl: string | null;
  themeId: string | null;
  weight: number;
}

export function detectTheme(html: string): ThemeDetectionResult & {
  rawThemeId: string | null;
} {
  const candidates: ThemeCandidate[] = [];

  const themeObject = html.match(/Shopify\.theme\s*=\s*(\{[\s\S]*?\});/);
  if (themeObject?.[1]) {
    const themeJson = themeObject[1];
    const nameMatch = themeJson.match(
      /["']name["']\s*:\s*["']([^"']+)["']/i
    );
    const schemaNameMatch = themeJson.match(
      /["']schema_name["']\s*:\s*["']([^"']+)["']/i
    );
    const idMatch = themeJson.match(/["']id["']\s*:\s*([0-9]+)/i);
    const themeStoreIdMatch = themeJson.match(
      /["']theme_store_id["']\s*:\s*([0-9]+)/i
    );

    if (schemaNameMatch?.[1]) {
      const schemaName = schemaNameMatch[1].trim();
      const listedOnThemeStore = Boolean(themeStoreIdMatch?.[1]);
      const slug = schemaName.toLowerCase();
      candidates.push({
        name: formatThemeName(schemaName),
        vendor: listedOnThemeStore ? "Shopify" : null,
        description: null,
        themeStoreUrl: listedOnThemeStore
          ? `https://themes.shopify.com/themes/${slug}`
          : null,
        themeId: idMatch?.[1] ?? null,
        // schema_name is the stable theme handle on custom / enterprise themes.
        weight: 96,
      });
    }

    if (nameMatch?.[1]) {
      const themeName = nameMatch[1].trim();
      const weakName = looksLikeVersionOrBackup(themeName);
      candidates.push({
        name: themeName,
        vendor: null,
        description: null,
        themeStoreUrl: null,
        themeId: idMatch?.[1] ?? null,
        // Some stores expose backup/internal deploy names in Shopify.theme.name.
        weight: weakName ? 35 : 92,
      });
    }
  }

  const dataThemeName = html.match(
    /data-theme-name=["']([^"']+)["']/i
  );
  if (dataThemeName?.[1] && !looksLikeVersionOrBackup(dataThemeName[1])) {
    candidates.push({
      name: formatThemeName(dataThemeName[1].trim()),
      vendor: null,
      description: null,
      themeStoreUrl: null,
      themeId: null,
      weight: 90,
    });
  }

  const themeNameMeta = html.match(
    /<meta[^>]+name=["']theme-name["'][^>]+content=["']([^"']+)["']/i
  );
  if (themeNameMeta?.[1]) {
    candidates.push({
      name: themeNameMeta[1],
      vendor: null,
      description: null,
      themeStoreUrl: null,
      themeId: null,
      weight: 70,
    });
  }

  const jsonThemeMatches = [...html.matchAll(/"theme(?:Name|_name|name)"\s*:\s*"([^"]{2,80})"/gi)];
  for (const match of jsonThemeMatches.slice(0, 6)) {
    const name = match[1]?.trim();
    if (!name || looksLikeVersionOrBackup(name)) continue;
    candidates.push({
      name,
      vendor: null,
      description: null,
      themeStoreUrl: null,
      themeId: null,
      weight: 72,
    });
  }

  const gs2Match = html.match(/\bGS2\b/i);
  if (gs2Match) {
    candidates.push({
      name: "GS2",
      // Custom/private theme — vendor is unknown (not the merchant brand).
      vendor: null,
      description: null,
      themeStoreUrl: null,
      themeId: null,
      weight: 82,
    });
  }

  const assetTheme = html.match(/\/assets\/([^/"'?]+)\.css/i);
  if (
    assetTheme?.[1] &&
    !assetTheme[1].includes("theme") &&
    !looksLikeVersionOrBackup(assetTheme[1])
  ) {
    candidates.push({
      name: formatThemeName(assetTheme[1]),
      vendor: null,
      description: null,
      themeStoreUrl: null,
      themeId: null,
      // Very weak heuristic; only used when no explicit theme markers exist.
      weight: 15,
    });
  }

  const shopifyThemeLink = html.match(
    /themes\.shopify\.com\/themes\/([a-z0-9-]+)/i
  );
  if (shopifyThemeLink?.[1]) {
    candidates.push({
      name: formatThemeName(shopifyThemeLink[1]),
      vendor: "Shopify",
      description: null,
      themeStoreUrl: `https://themes.shopify.com/themes/${shopifyThemeLink[1]}`,
      themeId: null,
      weight: 85,
    });
  }

  const best = candidates.sort((a, b) => b.weight - a.weight)[0];

  const themeVersion = extractThemeVersion(html);

  if (!best) {
    return {
      themeName: null,
      themeVendor: null,
      themeDescription: null,
      themeStoreUrl: null,
      themeVersion,
      confidenceScore: 0,
      rawThemeId: null,
    };
  }

  const confidenceScore = Math.min(100, best.weight);

  return {
    themeName: best.name,
    themeVendor: best.vendor,
    themeDescription: best.description,
    themeStoreUrl: best.themeStoreUrl,
    themeVersion,
    confidenceScore,
    rawThemeId: best.themeId,
  };
}

function extractThemeVersion(html: string): string | null {
  const fromThemeObject = html.match(
    /["']schema_version["']\s*:\s*["']([^"']+)["']/i
  );
  if (fromThemeObject?.[1]) {
    return fromThemeObject[1].trim();
  }

  const fromDataAttr = html.match(/data-theme-version=["']([^"']+)["']/i);
  if (fromDataAttr?.[1]) {
    return fromDataAttr[1].trim();
  }

  return null;
}

function formatThemeName(slug: string): string {
  return slug
    .split(/[-_]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function looksLikeVersionOrBackup(value: string): boolean {
  return /(backup|bf[-_]?backup|store[-_]\d+|rc[-_]cm[-_]|update$|\d{4}-\d{2}-\d{2}[_-]\d{2}[-:]\d{2}|v?\d+\.\d+|hydra)/i.test(
    value
  );
}
