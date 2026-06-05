export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME ?? "StoreTrace",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://storetrace.link",
  description:
    "Free Shopify store analyzer ? analyze any Shopify store for themes, apps, and store insights in seconds. Instant Shopify store analysis, no login.",
  tagline: "Discover themes, apps, and store insights instantly.",
  heroTitle: "Analyze Any Shopify Store",
} as const;

export function absoluteUrl(path: string): string {
  const base = siteConfig.url.replace(/\/$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}
