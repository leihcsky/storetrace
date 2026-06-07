import { enrichAppFromCatalog } from "@/lib/constants/app-catalog";
import { isHydrogenStorefront } from "./detect-storefront";
import { slugify } from "@/lib/utils/url";
import type { AppDetectionResult } from "./types";

interface AppSignature {
  name: string;
  category: string;
  vendor: string;
  officialUrl: string | null;
  patterns: RegExp[];
}

const APP_SIGNATURES: AppSignature[] = [
  {
    name: "Klaviyo",
    category: "Email Marketing",
    vendor: "Klaviyo",
    officialUrl: "https://www.klaviyo.com/",
    patterns: [
      /static\.klaviyo\.com/i,
      /klaviyo\.js/i,
      /_klOnsite/i,
      /window\.klaviyo/i,
    ],
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
    name: "Gorgias",
    category: "Support",
    vendor: "Gorgias",
    officialUrl: "https://www.gorgias.com/",
    patterns: [/gorgias/i, /config\.gorgias\.io/i],
  },
  {
    name: "Searchspring",
    category: "Search",
    vendor: "Searchspring",
    officialUrl: "https://searchspring.com/",
    patterns: [/searchspring/i, /searchspring\.net/i],
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
    patterns: [
      /yotpoStoreId/i,
      /cdn-widgetsrepository\.yotpo/i,
      /cdn-loyalty\.yotpo/i,
      /staticw2\.yotpo/i,
      /yotpo\.com\/loader/i,
    ],
  },
  {
    name: "Nosto",
    category: "Personalization",
    vendor: "Nosto",
    officialUrl: "https://www.nosto.com/",
    patterns: [
      /connect\.nosto\.com/i,
      /nosto\.js/i,
      /nosto_element/i,
      /nosto\.com\/script/i,
    ],
  },
  {
    name: "Attentive",
    category: "SMS Marketing",
    vendor: "Attentive",
    officialUrl: "https://www.attentive.com/",
    patterns: [
      /attentive-dtag/i,
      /attn\.tv/i,
      /cdn\.attn\.tv/i,
      /attentivemobile\.com/i,
    ],
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
  {
    name: "Recharge",
    category: "Subscriptions",
    vendor: "Recharge",
    officialUrl: "https://getrecharge.com/",
    patterns: [
      /rechargecdn\.com/i,
      /rechargepayments\.com/i,
      /recharge\.js/i,
      /subscribe-with-recharge/i,
    ],
  },
  {
    name: "Shop Sheriff",
    category: "Store Design",
    vendor: "Shop Sheriff",
    officialUrl: "https://shopsheriff.com/",
    patterns: [/useamp\.com/i, /shopsheriff\.com/i, /\/a\/s\//i],
  },
  {
    name: "Firework",
    category: "Video Commerce",
    vendor: "Firework",
    officialUrl: "https://firework.com/",
    patterns: [
      /firework-shoppable-video/i,
      /fw-embed-feed/i,
      /asset\.fwcdn/i,
      /fwn\.js/i,
      /integrations\/shopify\.js/i,
    ],
  },
  {
    name: "GOVX ID Exclusive Discounts",
    category: "Discounts",
    vendor: "GovX",
    officialUrl: "https://www.govx.com/",
    patterns: [
      /id-shop\.govx\.com/i,
      /govx\.js/i,
      /auth\.govx\.com/i,
      /GovXIdApi/i,
    ],
  },
  {
    name: "Beacon Fraud Prevention",
    category: "Fraud Prevention",
    vendor: "Beacon",
    officialUrl: "https://apps.shopify.com/beacon",
    patterns: [/beacon\.riskified\.com/i],
  },
  {
    name: "Weglot",
    category: "Translation",
    vendor: "Weglot",
    officialUrl: "https://www.weglot.com/",
    patterns: [/cdn\.weglot\.com/i, /weglot_script_tag/i],
  },
  {
    name: "Quizify",
    category: "Quizzes",
    vendor: "Quizify",
    officialUrl: "https://quizify.io/",
    patterns: [/pc-quiz\.s3/i, /quiz-loader\.min\.js/i, /quizify/i],
  },
  {
    name: "Retention.com",
    category: "Marketing",
    vendor: "Retention.com",
    officialUrl: "https://retention.com/",
    patterns: [/app\.retention\.com/i],
  },
  {
    name: "G:Spin Wheel+Gamification+Game",
    category: "Pop-ups",
    vendor: "GoodApps",
    officialUrl: "https://apps.shopify.com/ga-spin",
    patterns: [
      /jsstore\/a\/[^/]+\/ge\.js/i,
      /good-apps\.co/i,
      /ga-spin/i,
    ],
  },
  {
    name: "CSS A/B Testing",
    category: "A/B Testing",
    vendor: "Chief Software Solutions",
    officialUrl: "https://apps.shopify.com/css-ab-testing",
    patterns: [/media\.9gtb\.com/i, /chiefss\.com/i],
  },
  {
    name: "Discountly POS & Tier Discount",
    category: "Discounts",
    vendor: "Discountly",
    officialUrl: "https://apps.shopify.com/discountly-pos-tier-discount",
    patterns: [/discountly-pos-tier-discount/i, /ac-tiered-style/i],
  },
  {
    name: "Yotpo Subscriptions",
    category: "Subscriptions",
    vendor: "Yotpo",
    officialUrl: "https://www.yotpo.com/",
    patterns: [
      /yotpo-subscriptions/i,
      /d18eg7dreypte5\.cloudfront\.net\/scripts\/integrations\/subscription/i,
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
  "1540791": {
    name: "Recharge",
    category: "Subscriptions",
    vendor: "Recharge",
    officialUrl: "https://getrecharge.com/",
  },
  "4870017": {
    name: "Chargeflow",
    category: "Fraud Prevention",
    vendor: "Chargeflow",
    officialUrl: "https://www.chargeflow.io/",
  },
  "294517": {
    name: "Retention.com",
    category: "Marketing",
    vendor: "Retention.com",
    officialUrl: "https://retention.com/",
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
  "klaviyo-email-marketing-sms": {
    name: "Klaviyo",
    category: "Email Marketing",
    vendor: "Klaviyo",
    officialUrl: "https://www.klaviyo.com/",
  },
  "yotpo-loyalty-rewards": {
    name: "Yotpo",
    category: "Reviews",
    vendor: "Yotpo",
    officialUrl: "https://www.yotpo.com/",
  },
  "firework-shoppable-video-ugc": {
    name: "Firework",
    category: "Video Commerce",
    vendor: "Firework",
    officialUrl: "https://firework.com/",
  },
  "yotpo-subscriptions": {
    name: "Yotpo Subscriptions",
    category: "Subscriptions",
    vendor: "Yotpo",
    officialUrl: "https://www.yotpo.com/",
  },
  "discountly-pos-tier-discount": {
    name: "Discountly POS & Tier Discount",
    category: "Discounts",
    vendor: "Discountly",
    officialUrl: "https://apps.shopify.com/discountly-pos-tier-discount",
  },
};

/** Match extension handles like `klaviyo-email-marketing-sms` to a known app. */
const HANDLE_PREFIXES: Array<{
  prefix: string;
  app: Pick<AppSignature, "name" | "category" | "vendor" | "officialUrl">;
}> = [
  {
    prefix: "klaviyo",
    app: {
      name: "Klaviyo",
      category: "Email Marketing",
      vendor: "Klaviyo",
      officialUrl: "https://www.klaviyo.com/",
    },
  },
  {
    prefix: "yotpo",
    app: {
      name: "Yotpo",
      category: "Reviews",
      vendor: "Yotpo",
      officialUrl: "https://www.yotpo.com/",
    },
  },
  {
    prefix: "firework",
    app: {
      name: "Firework",
      category: "Video Commerce",
      vendor: "Firework",
      officialUrl: "https://firework.com/",
    },
  },
  {
    prefix: "recharge",
    app: {
      name: "Recharge",
      category: "Subscriptions",
      vendor: "Recharge",
      officialUrl: "https://getrecharge.com/",
    },
  },
  {
    prefix: "attentive",
    app: {
      name: "Attentive",
      category: "SMS Marketing",
      vendor: "Attentive",
      officialUrl: "https://www.attentive.com/",
    },
  },
  {
    prefix: "elevar",
    app: {
      name: "Elevar",
      category: "Analytics",
      vendor: "Elevar",
      officialUrl: "https://getelevar.com/",
    },
  },
  {
    prefix: "loop-returns",
    app: {
      name: "Loop Returns",
      category: "Returns",
      vendor: "Loop",
      officialUrl: "https://www.loopreturns.com/",
    },
  },
];

export function detectApps(html: string): AppDetectionResult[] {
  const headless = isHydrogenStorefront(html);
  const corpus = buildAppDetectionCorpus(html, headless);

  const detectedBySignature = APP_SIGNATURES.filter((app) =>
    app.patterns.some((pattern) => pattern.test(corpus))
  );

  const all = [...detectedBySignature];

  for (const app of detectShopifyAppHandles(html)) {
    pushUniqueApp(all, app);
  }

  for (const app of detectThemeAppExtensions(html)) {
    pushUniqueApp(all, app);
  }

  for (const app of detectWebPixelApps(html)) {
    pushUniqueApp(all, app);
  }

  const enriched = all.map((app) =>
    enrichAppFromCatalog({
      name: app.name,
      slug: slugify(app.name),
      category: app.category,
      vendor: app.vendor,
      officialUrl: app.officialUrl,
      confidenceScore: app.patterns.length > 0 ? 85 : 75,
    })
  );

  return dedupeEnrichedApps(enriched);
}

function dedupeEnrichedApps(apps: AppDetectionResult[]): AppDetectionResult[] {
  const bySlug = new Map<string, AppDetectionResult>();

  for (const app of apps) {
    const existing = bySlug.get(app.slug);
    if (!existing || app.confidenceScore > existing.confidenceScore) {
      bySlug.set(app.slug, app);
    }
  }

  return [...bySlug.values()];
}

function resolveAppFromHandle(handle: string): AppSignature | null {
  const exact = SHOPIFY_APP_HANDLES[handle];
  if (exact) {
    return { ...exact, patterns: [] };
  }

  for (const { prefix, app } of HANDLE_PREFIXES) {
    if (handle === prefix || handle.startsWith(`${prefix}-`)) {
      return { ...app, patterns: [] };
    }
  }

  return null;
}

function pushUniqueApp(target: AppSignature[], app: AppSignature) {
  if (
    !target.some((item) => item.name.toLowerCase() === app.name.toLowerCase())
  ) {
    target.push(app);
  }
}

/** Unescape JSON-escaped slashes (`https:\/\/…`) from Shopify inline script tags. */
function normalizeEscapedUrls(text: string): string {
  return text.replace(/\\+\//g, "/");
}

/**
 * Build a single corpus for signature matching.
 * Liquid stores: full normalized HTML + every extractable URL.
 * Headless stores: external script URLs only (avoids RSC env false positives).
 */
function buildAppDetectionCorpus(html: string, headless: boolean): string {
  const normalized = normalizeEscapedUrls(html);
  const parts: string[] = [];

  if (headless) {
    parts.push(extractExternalScriptCorpus(html));
    parts.push(extractExternalScriptCorpus(normalized));
  } else {
    parts.push(normalized);
  }

  parts.push(extractPageUrls(headless ? parts.join("\n") : normalized));
  return parts.join("\n");
}

/** Collect script src, inline URLs, and Shopify script-tag loader injections. */
function extractPageUrls(html: string): string {
  const urls: string[] = [];

  for (const match of html.matchAll(/(?:https?:)?\/\/[^"'\s<>]+/gi)) {
    urls.push(match[0].startsWith("//") ? `https:${match[0]}` : match[0]);
  }

  // Shopify Online Store script tags (asyncLoad var urls = [...])
  for (const block of html.matchAll(/var\s+urls\s*=\s*\[([\s\S]*?)\]/gi)) {
    for (const match of block[1].matchAll(/["']((?:https?:)?\/\/[^"']+)["']/gi)) {
      const raw = match[1];
      urls.push(raw.startsWith("//") ? `https:${raw}` : raw);
    }
  }

  return urls.join("\n");
}

/** Theme app extensions hosted on cdn.shopify.com/extensions/{uuid}/{handle}-{version}/ */
function detectThemeAppExtensions(html: string): AppSignature[] {
  const results: AppSignature[] = [];
  const handles = [
    ...html.matchAll(
      /cdn\.shopify\.com\/extensions\/[a-f0-9-]+\/([a-z0-9-]+)-\d+\//gi
    ),
  ]
    .map((match) => match[1]?.toLowerCase())
    .filter(Boolean);

  for (const handle of new Set(handles)) {
    const mapped = resolveAppFromHandle(handle);
    if (mapped) {
      results.push(mapped);
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

function extractExternalScriptCorpus(html: string): string {
  const chunks: string[] = [];

  for (const match of html.matchAll(/<script[^>]+src=["']([^"']+)["']/gi)) {
    chunks.push(match[1]);
  }

  for (const match of html.matchAll(/<script[^>]+id=["']([^"']+)["']/gi)) {
    chunks.push(match[1]);
  }

  for (const match of html.matchAll(/shopify:\/\/apps\/[^\s"']+/gi)) {
    chunks.push(match[0]);
  }

  for (const match of html.matchAll(/\/a\/[a-z0-9-]+\//gi)) {
    chunks.push(match[0]);
  }

  return chunks.join("\n");
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
    const mapped = resolveAppFromHandle(handle);
    if (mapped) {
      results.push(mapped);
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
