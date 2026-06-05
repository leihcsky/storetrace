import {
  APP_CATALOG,
  getShopifyAppStoreUrl,
  type AppCatalogEntry,
} from "@/lib/constants/app-catalog";
export interface FeaturedApp {
  slug: string;
  name: string;
  listTitle: string;
  developerName: string;
  category: string;
  description: string;
  pricingLabel: string | null;
  rating: number | null;
  reviewCount: number | null;
  rankingBadge: string | null;
  iconUrl: string | null;
  shopifyAppStoreUrl: string;
}

const POPULAR_DESCRIPTIONS: Record<string, string> = {
  klaviyo:
    "Email and SMS marketing automation — flows, segments, and revenue attribution.",
  "judge-me":
    "Product reviews with photos, Q&A, and trust badges that lift conversion.",
  loox: "Visual reviews with customer photos and videos on product pages.",
  attentive: "AI-led SMS and email with personalized lifecycle messaging.",
  aftership: "Branded tracking and post-purchase delivery updates.",
  omnisend: "Email, SMS, and push campaigns for growing Shopify brands.",
  yotpo: "Reviews, loyalty, and UGC for retention and social proof.",
  rebuy: "Upsells, cross-sells, and smart cart merchandising.",
  nosto: "AI search, recommendations, and product discovery.",
  gorgias: "Helpdesk, live chat, and AI support tied to orders.",
  smile: "Loyalty points, referrals, and VIP rewards programs.",
  privy: "Pop-ups and email capture to grow your subscriber list.",
  pagefly: "Drag-and-drop landing pages without code.",
  shogun: "Visual page builder for landing and product pages.",
  recharge: "Subscriptions and recurring billing for memberships.",
  route: "Package protection and branded tracking at checkout.",
  tidio: "Live chat and chatbots for sales and support.",
  pushowl: "Web push notifications for carts and launches.",
  searchanise: "Fast search, filters, and collection merchandising.",
  vitals: "Reviews, bundles, upsells, and conversion tools in one app.",
  tiktok: "TikTok Shop and catalog sync for social selling.",
  facebook: "Sell on Facebook and Instagram Shops.",
  google: "Google Merchant Center and YouTube Shopping listings.",
  "crush-pics": "Image compression and SEO-friendly alt text.",
  bold: "Subscriptions and custom pricing for repeat revenue.",
  mailchimp: "Sync Shopify customers with Mailchimp email campaigns.",
};

const SHORT_NAMES: Record<string, string> = {
  klaviyo: "Klaviyo",
  "judge-me": "Judge.me",
  loox: "Loox",
  attentive: "Attentive",
  aftership: "AfterShip",
  omnisend: "Omnisend",
  yotpo: "Yotpo",
  gorgias: "Gorgias",
  "crush-pics": "Crush.pics",
};

/** Slugs listed on /apps — every slug must exist in APP_CATALOG with an icon. */
export const POPULAR_APP_SLUGS = [
  "klaviyo",
  "judge-me",
  "loox",
  "attentive",
  "aftership",
  "omnisend",
  "yotpo",
  "rebuy",
  "gorgias",
  "smile",
  "privy",
  "pagefly",
  "shogun",
  "recharge",
  "route",
  "tidio",
  "pushowl",
  "searchanise",
  "vitals",
  "tiktok",
  "facebook",
  "google",
  "crush-pics",
  "bold",
  "mailchimp",
  "nosto",
  "bazaarvoice",
] as const;

function toPopularApp(entry: AppCatalogEntry): FeaturedApp {
  return {
    slug: entry.slug,
    name: SHORT_NAMES[entry.slug] ?? entry.developerName,
    listTitle: entry.listTitle,
    developerName: entry.developerName,
    category: entry.category,
    description:
      POPULAR_DESCRIPTIONS[entry.slug] ??
      `${entry.category} for Shopify stores.`,
    pricingLabel: entry.pricingLabel,
    rating: entry.rating,
    reviewCount: entry.reviewCount,
    rankingBadge: entry.rankingBadge,
    iconUrl: entry.iconUrl,
    shopifyAppStoreUrl: getShopifyAppStoreUrl(entry.appStoreSlug),
  };
}

export const popularApps: FeaturedApp[] = POPULAR_APP_SLUGS.map((slug) => {
  const entry = APP_CATALOG.find((a) => a.slug === slug);
  if (!entry) {
    throw new Error(`Popular app missing from catalog: ${slug}`);
  }
  return toPopularApp(entry);
});

export function getPopularAppBySlug(slug: string): FeaturedApp | undefined {
  return popularApps.find((a) => a.slug === slug);
}

/** Homepage hero grid — top picks */
export const homepagePopularApps = popularApps.slice(0, 6);
