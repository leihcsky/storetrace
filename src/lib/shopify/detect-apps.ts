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
    patterns: [/yotpo/i, /yotpoStoreId/i],
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
    patterns: [/attn\.tv/i, /cdn\.attn\.tv/i, /attentivemobile\.com/i],
  },
  {
    name: "Elevar",
    category: "Analytics",
    vendor: "Elevar",
    officialUrl: "https://getelevar.com/",
    patterns: [/elevar/i, /getelevar/i],
  },
  {
    name: "Loop Returns",
    category: "Returns",
    vendor: "Loop",
    officialUrl: "https://www.loopreturns.com/",
    patterns: [
      /loopReturnsOnstore/i,
      /loop-returns-onstore/i,
      /loop-returns-activated/i,
      /LoopOnstore/i,
      /@loophq\/onstore-sdk/i,
      /loop-onstore-sdk/i,
      /loopreturns\.com/i,
      /Loop Returns OnStore/i,
    ],
  },
];

/**
 * Shopify app apiClientId values from webPixelsConfigList.
 * Only IDs that map to a real App Store listing — skip ad pixels / integrations
 * that competitors treat as tracking, not standalone apps.
 */
const SHOPIFY_APP_CLIENT_IDS: Record<
  string,
  Pick<AppSignature, "name" | "category" | "vendor" | "officialUrl">
> = {
  "2509311": {
    name: "Elevar",
    category: "Analytics",
    vendor: "Elevar",
    officialUrl: "https://getelevar.com/",
  },
  "70132": {
    name: "Yotpo",
    category: "Reviews",
    vendor: "Yotpo",
    officialUrl: "https://www.yotpo.com/",
  },
};

/** Map Theme App Extension handles to catalog-friendly names. */
const SHOPIFY_APP_HANDLES: Record<
  string,
  Pick<AppSignature, "name" | "category" | "vendor" | "officialUrl">
> = {
  "elevar-conversion-tracking": {
    name: "Elevar",
    category: "Analytics",
    vendor: "Elevar",
    officialUrl: "https://getelevar.com/",
  },
  attentive: {
    name: "Attentive",
    category: "SMS Marketing",
    vendor: "Attentive",
    officialUrl: "https://www.attentive.com/",
  },
  klaviyo: {
    name: "Klaviyo",
    category: "Email Marketing",
    vendor: "Klaviyo",
    officialUrl: "https://www.klaviyo.com/",
  },
  "judge-me": {
    name: "Judge.me",
    category: "Reviews",
    vendor: "Judge.me",
    officialUrl: "https://judge.me/",
  },
  loox: {
    name: "Loox",
    category: "Reviews",
    vendor: "Loox",
    officialUrl: "https://loox.app/",
  },
  rebuy: {
    name: "Rebuy",
    category: "Upsell",
    vendor: "Rebuy",
    officialUrl: "https://rebuyengine.com/",
  },
  gorgias: {
    name: "Gorgias",
    category: "Support",
    vendor: "Gorgias",
    officialUrl: "https://www.gorgias.com/",
  },
  "loop-returns": {
    name: "Loop Returns",
    category: "Returns",
    vendor: "Loop",
    officialUrl: "https://www.loopreturns.com/",
  },
};

export function detectApps(html: string): AppDetectionResult[] {
  const detectedBySignature = APP_SIGNATURES.filter((app) =>
    app.patterns.some((pattern) => pattern.test(html))
  );

  const all = [...detectedBySignature];

  for (const app of detectAppLikeVendors(html)) {
    pushUniqueApp(all, app);
  }

  for (const app of detectShopifyAppHandles(html)) {
    pushUniqueApp(all, app);
  }

  for (const app of detectWebPixelApps(html)) {
    pushUniqueApp(all, app);
  }

  return all.map((app) =>
    enrichAppFromCatalog({
      name: app.name,
      slug: slugify(app.name),
      category: app.category,
      vendor: app.vendor,
      officialUrl: app.officialUrl,
      confidenceScore: app.patterns.length > 0 ? 85 : 75,
    })
  );
}

function pushUniqueApp(target: AppSignature[], app: AppSignature) {
  if (
    !target.some((item) => item.name.toLowerCase() === app.name.toLowerCase())
  ) {
    target.push(app);
  }
}

function detectAppLikeVendors(html: string): AppSignature[] {
  const results: AppSignature[] = [];
  const scriptUrls = html.match(/https?:\/\/[^"'\s>]+/gi) ?? [];

  const keywordMap: Array<{
    keyword: RegExp;
    name: string;
    category: string;
    url: string;
  }> = [
    {
      keyword: /searchspring/i,
      name: "Searchspring",
      category: "Search",
      url: "https://searchspring.com/",
    },
    {
      keyword: /gorgias/i,
      name: "Gorgias",
      category: "Support",
      url: "https://www.gorgias.com/",
    },
    {
      keyword: /klaviyo/i,
      name: "Klaviyo",
      category: "Email Marketing",
      url: "https://www.klaviyo.com/",
    },
    {
      keyword: /judge\.me|jdgm/i,
      name: "Judge.me",
      category: "Reviews",
      url: "https://judge.me/",
    },
    {
      keyword: /yotpo/i,
      name: "Yotpo",
      category: "Reviews",
      url: "https://www.yotpo.com/",
    },
    {
      keyword: /nosto/i,
      name: "Nosto",
      category: "Personalization",
      url: "https://www.nosto.com/",
    },
    {
      keyword: /aftership|automizely/i,
      name: "AfterShip",
      category: "Tracking",
      url: "https://www.aftership.com/",
    },
    {
      keyword: /elevar/i,
      name: "Elevar",
      category: "Analytics",
      url: "https://getelevar.com/",
    },
    {
      keyword: /attn\.tv|attentivemobile\.com/i,
      name: "Attentive",
      category: "SMS Marketing",
      url: "https://www.attentive.com/",
    },
    {
      keyword: /@loophq\/onstore-sdk|loop-onstore-sdk|loopreturns\.com/i,
      name: "Loop Returns",
      category: "Returns",
      url: "https://www.loopreturns.com/",
    },
  ];

  for (const entry of keywordMap) {
    if (scriptUrls.some((url) => entry.keyword.test(url))) {
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

function detectShopifyAppHandles(html: string): AppSignature[] {
  const results: AppSignature[] = [];

  const blockHandles = [
    ...html.matchAll(/shopify:\/\/apps\/([a-z0-9-]+)\//gi),
  ].map((match) => match[1]?.toLowerCase());
  const proxyHandles = [...html.matchAll(/\/a\/([a-z0-9-]+)\//gi)].map((match) =>
    match[1]?.toLowerCase()
  );

  for (const handle of [...blockHandles, ...proxyHandles]) {
    if (!handle) continue;
    const mapped = SHOPIFY_APP_HANDLES[handle];
    if (mapped) {
      results.push({ ...mapped, patterns: [] });
      continue;
    }

    const readable = handle
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
    results.push({
      name: readable,
      category: "Shopify App",
      vendor: readable,
      officialUrl: null,
      patterns: [],
    });
  }

  return results;
}

function detectWebPixelApps(html: string): AppSignature[] {
  const results: AppSignature[] = [];

  for (const match of html.matchAll(/"type":"APP"[\s\S]*?"apiClientId":(\d+)/g)) {
    const clientId = match[1];
    const mapped = SHOPIFY_APP_CLIENT_IDS[clientId];
    if (mapped) {
      results.push({ ...mapped, patterns: [] });
    }
  }

  if (/yotpoStoreId/i.test(html)) {
    results.push({
      name: "Yotpo",
      category: "Reviews",
      vendor: "Yotpo",
      officialUrl: "https://www.yotpo.com/",
      patterns: [],
    });
  }

  if (/\/a\/elevar\//i.test(html)) {
    results.push({
      name: "Elevar",
      category: "Analytics",
      vendor: "Elevar",
      officialUrl: "https://getelevar.com/",
      patterns: [],
    });
  }

  return results;
}
