import { enrichAppFromCatalog } from "@/lib/constants/app-catalog";
import { slugify } from "@/lib/utils/url";
import type { AppDetectionResult } from "./types";

interface AppSignature {
  name: string;
  category: string;
  vendor: string;
  officialUrl: string;
  patterns: RegExp[];
}

const APP_SIGNATURES: AppSignature[] = [
  {
    name: "Klaviyo",
    category: "Email Marketing",
    vendor: "Klaviyo",
    officialUrl: "https://www.klaviyo.com/",
    patterns: [/klaviyo/i, /static\.klaviyo\.com/i, /klaviyo\.js/i],
  },
  {
    name: "Judge.me",
    category: "Reviews",
    vendor: "Judge.me",
    officialUrl: "https://judge.me/",
    patterns: [/judge\.me/i, /jdgm/i],
  },
  {
    name: "Loox",
    category: "Reviews",
    vendor: "Loox",
    officialUrl: "https://loox.app/",
    patterns: [/loox\.io/i, /loox\.app/i, /loox-reviews/i],
  },
  {
    name: "AfterShip",
    category: "Tracking",
    vendor: "AfterShip",
    officialUrl: "https://www.aftership.com/",
    patterns: [/aftership/i, /automizely/i],
  },
  {
    name: "Omnisend",
    category: "Email Marketing",
    vendor: "Omnisend",
    officialUrl: "https://www.omnisend.com/",
    patterns: [/omnisend/i],
  },
  {
    name: "Rebuy",
    category: "Upsell",
    vendor: "Rebuy",
    officialUrl: "https://rebuyengine.com/",
    patterns: [/rebuy/i, /rebuyengine/i],
  },
  {
    name: "Yotpo",
    category: "Reviews",
    vendor: "Yotpo",
    officialUrl: "https://www.yotpo.com/",
    patterns: [/yotpo/i],
  },
  {
    name: "Nosto",
    category: "Personalization",
    vendor: "Nosto",
    officialUrl: "https://www.nosto.com/",
    patterns: [/nosto/i],
  },
  {
    name: "Attentive",
    category: "SMS Marketing",
    vendor: "Attentive",
    officialUrl: "https://www.attentive.com/",
    patterns: [/attentive/i],
  },
];

export function detectApps(html: string): AppDetectionResult[] {
  const detectedBySignature = APP_SIGNATURES.filter((app) =>
    app.patterns.some((pattern) => pattern.test(html))
  );

  const dynamicMatches = detectAppLikeVendors(html);
  const all = [...detectedBySignature];

  for (const app of dynamicMatches) {
    if (!all.some((item) => item.name.toLowerCase() === app.name.toLowerCase())) {
      all.push(app);
    }
  }

  return all.map((app) =>
    enrichAppFromCatalog({
      name: app.name,
      slug: slugify(app.name),
      category: app.category,
      vendor: app.vendor,
      officialUrl: app.officialUrl,
      confidenceScore: app.patterns.length > 0 ? 80 : 60,
    })
  );
}

function detectAppLikeVendors(html: string): AppSignature[] {
  const results: AppSignature[] = [];
  const scriptUrls = html.match(/https?:\/\/[^"'\s>]+/gi) ?? [];

  const keywordMap: Array<{ keyword: RegExp; name: string; category: string; url: string }> = [
    { keyword: /shopifycdn\/boomerang/i, name: "Boomerang", category: "Analytics", url: "https://www.shopify.com/" },
    { keyword: /searchspring/i, name: "Searchspring", category: "Search", url: "https://searchspring.com/" },
    { keyword: /gorgias/i, name: "Gorgias", category: "Support", url: "https://www.gorgias.com/" },
    { keyword: /klaviyo/i, name: "Klaviyo", category: "Email Marketing", url: "https://www.klaviyo.com/" },
    { keyword: /judge\.me|jdgm/i, name: "Judge.me", category: "Reviews", url: "https://judge.me/" },
    { keyword: /yotpo/i, name: "Yotpo", category: "Reviews", url: "https://www.yotpo.com/" },
    { keyword: /nosto/i, name: "Nosto", category: "Personalization", url: "https://www.nosto.com/" },
    { keyword: /aftership|automizely/i, name: "AfterShip", category: "Tracking", url: "https://www.aftership.com/" },
  ];

  for (const entry of keywordMap) {
    if (scriptUrls.some((u) => entry.keyword.test(u))) {
      results.push({
        name: entry.name,
        category: entry.category,
        vendor: entry.name,
        officialUrl: entry.url,
        patterns: [],
      });
    }
  }

  return results;
}
