/**
 * Curated metadata for known Shopify apps.
 * `appStoreSlug` is verified against https://apps.shopify.com/{slug}
 * Icons are from cdn.shopify.com/app-store/listing_images (App Store listing assets).
 */
export interface AppCatalogEntry {
  matchNames: string[];
  slug: string;
  /** Verified path segment on apps.shopify.com */
  appStoreSlug: string;
  listTitle: string;
  developerName: string;
  category: string;
  pricingLabel: string | null;
  rating: number | null;
  reviewCount: number | null;
  rankingBadge: string | null;
  iconUrl: string | null;
}

export function getShopifyAppStoreUrl(appStoreSlug: string): string {
  return `https://apps.shopify.com/${appStoreSlug}`;
}

export function getShopifyAppStoreSearchUrl(query: string): string {
  return `https://apps.shopify.com/search?q=${encodeURIComponent(query)}`;
}

export const APP_CATALOG: AppCatalogEntry[] = [
  {
    matchNames: ["elevar", "elevar-conversion-tracking"],
    slug: "elevar",
    appStoreSlug: "gtm-datalayer-by-elevar",
    listTitle: "Elevar Conversion Tracking",
    developerName: "Elevar",
    category: "Analytics",
    pricingLabel: "Free to install",
    rating: 4.9,
    reviewCount: 120,
    rankingBadge: null,
    iconUrl: null,
  },
  {
    matchNames: ["attentive"],
    slug: "attentive",
    appStoreSlug: "attentive",
    listTitle: "Attentive: AI-led SMS & Email",
    developerName: "Attentive",
    category: "SMS Marketing",
    pricingLabel: "Free to install",
    rating: 4.7,
    reviewCount: 111,
    rankingBadge: "Top 50",
    iconUrl:
      "https://cdn.shopify.com/app-store/listing_images/5da194592c59cd145b825b53019db33c/icon/CIKipOGl7-8CEAE=.png",
  },
  {
    matchNames: ["klaviyo"],
    slug: "klaviyo",
    appStoreSlug: "klaviyo-email-marketing",
    listTitle: "Klaviyo: Email Marketing & SMS",
    developerName: "Klaviyo",
    category: "Email Marketing",
    pricingLabel: "Free to install",
    rating: 4.6,
    reviewCount: 2500,
    rankingBadge: "Top 10",
    iconUrl:
      "https://cdn.shopify.com/app-store/listing_images/5edd9000b933a8fa88c152d1e498531f/icon/CP6B2OOv3PYCEAE=.png",
  },
  {
    matchNames: ["judge.me", "judgeme"],
    slug: "judge-me",
    appStoreSlug: "judgeme",
    listTitle: "Judge.me Product Reviews",
    developerName: "Judge.me",
    category: "Reviews",
    pricingLabel: "Free plan available",
    rating: 5.0,
    reviewCount: 32000,
    rankingBadge: "Top 10",
    iconUrl:
      "https://cdn.shopify.com/app-store/listing_images/8cada0f5da411a64e756606bb036f1ed/icon/CIfp9fWd34sDEAE=.png",
  },
  {
    matchNames: ["loox"],
    slug: "loox",
    appStoreSlug: "loox",
    listTitle: "Loox ‑ Visual Product Reviews",
    developerName: "Loox",
    category: "Reviews",
    pricingLabel: "Free trial available",
    rating: 4.9,
    reviewCount: 8000,
    rankingBadge: "Top 50",
    iconUrl:
      "https://cdn.shopify.com/app-store/listing_images/d38e6e87a153baa1131d676e4b750e49/icon/CLfFw6C1r40DEAE=.png",
  },
  {
    matchNames: ["yotpo"],
    slug: "yotpo",
    appStoreSlug: "yotpo-social-reviews",
    listTitle: "Yotpo: Product Reviews & UGC",
    developerName: "Yotpo",
    category: "Reviews",
    pricingLabel: "Free plan available",
    rating: 4.8,
    reviewCount: 4000,
    rankingBadge: "Top 50",
    iconUrl:
      "https://cdn.shopify.com/app-store/listing_images/659062da3dcade1068da9e28c3d120c5/icon/CIzTtYS0i4cDEAE=.png",
  },
  {
    matchNames: ["loop returns", "loop returns & exchanges", "loop-returns"],
    slug: "loop-returns",
    appStoreSlug: "loop-returns",
    listTitle: "Loop Returns & Exchanges",
    developerName: "Loop",
    category: "Returns",
    pricingLabel: "Free plan available",
    rating: 4.7,
    reviewCount: 426,
    rankingBadge: null,
    iconUrl: null,
  },
  {
    matchNames: ["aftership"],
    slug: "aftership",
    appStoreSlug: "aftership",
    listTitle: "AfterShip Order Tracking",
    developerName: "AfterShip",
    category: "Tracking",
    pricingLabel: "Free plan available",
    rating: 4.8,
    reviewCount: 5000,
    rankingBadge: "Top 50",
    iconUrl:
      "https://cdn.shopify.com/app-store/listing_images/2b1e15082bfdc3b29c516461be6bd261/icon/CL6z7PWxkv8CEAE=.png",
  },
  {
    matchNames: ["omnisend"],
    slug: "omnisend",
    appStoreSlug: "omnisend",
    listTitle: "Omnisend Email Marketing & SMS",
    developerName: "Omnisend",
    category: "Email Marketing",
    pricingLabel: "Free plan available",
    rating: 4.7,
    reviewCount: 5000,
    rankingBadge: "Top 100",
    iconUrl:
      "https://cdn.shopify.com/app-store/listing_images/9b0c952ebdfd9d278f559665ecf48f5c/icon/CODw6NWe6_YCEAE=.png",
  },
  {
    matchNames: ["rebuy"],
    slug: "rebuy",
    appStoreSlug: "rebuy",
    listTitle: "Rebuy Personalization Engine",
    developerName: "Rebuy",
    category: "Upsell",
    pricingLabel: "Free trial available",
    rating: 4.9,
    reviewCount: 600,
    rankingBadge: null,
    iconUrl:
      "https://cdn.shopify.com/app-store/listing_images/9a87fc6fa46c1e06f03627e9ef094b51/icon/CLHN0M2Pi_wCEAE=.png",
  },
  {
    matchNames: ["nosto"],
    slug: "nosto",
    appStoreSlug: "nosto-personalization-for-shopify",
    listTitle: "Nosto | AI Search & Discovery",
    developerName: "Nosto Solutions Ltd",
    category: "Personalization",
    pricingLabel: "Free to install",
    rating: 4.5,
    reviewCount: 80,
    rankingBadge: null,
    iconUrl:
      "https://cdn.shopify.com/app-store/listing_images/7dcd5d67bc1a80f90a95094296d29d71/icon/CIDO29HXloUDEAE=.png",
  },
  {
    matchNames: ["gorgias"],
    slug: "gorgias",
    appStoreSlug: "helpdesk",
    listTitle: "Gorgias: AI, Helpdesk & Chat",
    developerName: "Gorgias",
    category: "Support",
    pricingLabel: "Free trial available",
    rating: 4.6,
    reviewCount: 900,
    rankingBadge: "Top 100",
    iconUrl:
      "https://cdn.shopify.com/app-store/listing_images/d783d0d0ded4ab7a13c20f47533819a3/icon/CNOe1Y-4vocDEAE=.png",
  },
  {
    matchNames: ["bazaarvoice"],
    slug: "bazaarvoice",
    appStoreSlug: "bazaarvoice-reviews-photos-social",
    listTitle: "Bazaarvoice Reviews & Photos",
    developerName: "Bazaarvoice Inc.",
    category: "Reviews",
    pricingLabel: "Free to install",
    rating: 3.4,
    reviewCount: 12,
    rankingBadge: null,
    iconUrl:
      "https://cdn.shopify.com/app-store/listing_images/16e28f7698fddac56db2a803783cf974/icon/CN_DsfeR8voCEAE=.png",
  },
  {
    matchNames: ["smile", "smile.io"],
    slug: "smile",
    appStoreSlug: "smile-io",
    listTitle: "Smile: Rewards & Loyalty",
    developerName: "Smile.io",
    category: "Loyalty",
    pricingLabel: "Free plan available",
    rating: 4.9,
    reviewCount: 4000,
    rankingBadge: "Top 50",
    iconUrl:
      "https://cdn.shopify.com/app-store/listing_images/439617d93d452f065b8cd6122493ccc3/icon/CPHVlb70lu8CEAE=.png",
  },
  {
    matchNames: ["privy"],
    slug: "privy",
    appStoreSlug: "privy",
    listTitle: "Privy Pop Ups, Email, & SMS",
    developerName: "Privy",
    category: "Pop-ups",
    pricingLabel: "Free plan available",
    rating: 4.6,
    reviewCount: 3000,
    rankingBadge: null,
    iconUrl:
      "https://cdn.shopify.com/app-store/listing_images/f3d61c764a54b22aed51cd1cc31b5a74/icon/CPKy8p_drY4CEAE=.png",
  },
  {
    matchNames: ["pagefly"],
    slug: "pagefly",
    appStoreSlug: "pagefly",
    listTitle: "PageFly Landing Page Builder",
    developerName: "PageFly",
    category: "Page Builder",
    pricingLabel: "Free plan available",
    rating: 4.9,
    reviewCount: 6000,
    rankingBadge: "Top 50",
    iconUrl:
      "https://cdn.shopify.com/app-store/listing_images/f85ee597169457da8ee70b6652cae768/icon/CKmsycCOx_YCEAE=.png",
  },
  {
    matchNames: ["shogun"],
    slug: "shogun",
    appStoreSlug: "shogun",
    listTitle: "Shogun Landing Page Builder",
    developerName: "Shogun",
    category: "Page Builder",
    pricingLabel: "Free trial available",
    rating: 4.7,
    reviewCount: 800,
    rankingBadge: null,
    iconUrl:
      "https://cdn.shopify.com/app-store/listing_images/0ca2c1526ec07b9f52021bd42651b1fd/icon/CIPT6ti6u5MCEAE=.png",
  },
  {
    matchNames: ["recharge"],
    slug: "recharge",
    appStoreSlug: "recharge",
    listTitle: "Recharge Subscriptions",
    developerName: "Recharge",
    category: "Subscriptions",
    pricingLabel: "Free trial available",
    rating: 4.2,
    reviewCount: 200,
    rankingBadge: "Top 100",
    iconUrl:
      "https://cdn.shopify.com/app-store/listing_images/6a602c408a660391c638089933fb5ad7/icon/CIbv3des_5MDEAE=.png",
  },
  {
    matchNames: ["route"],
    slug: "route",
    appStoreSlug: "route",
    listTitle: "Route Protection & Tracking",
    developerName: "Route",
    category: "Shipping",
    pricingLabel: "Free to install",
    rating: 4.5,
    reviewCount: 300,
    rankingBadge: null,
    iconUrl:
      "https://cdn.shopify.com/app-store/listing_images/7115601f61e3feae998d828bd6f6ecf3/icon/CNal4f7ZwZMCEAE=.png",
  },
  {
    matchNames: ["tidio"],
    slug: "tidio",
    appStoreSlug: "tidio-chat",
    listTitle: "Tidio Live Chat & AI",
    developerName: "Tidio",
    category: "Support",
    pricingLabel: "Free plan available",
    rating: 4.7,
    reviewCount: 1200,
    rankingBadge: null,
    iconUrl:
      "https://cdn.shopify.com/app-store/listing_images/c9308d01d0e596807cd697bab16009a1/icon/COXAs-O_ioQCEAE=.png",
  },
  {
    matchNames: ["pushowl"],
    slug: "pushowl",
    appStoreSlug: "pushowl",
    listTitle: "PushOwl Web Push Notifications",
    developerName: "PushOwl",
    category: "Marketing",
    pricingLabel: "Free plan available",
    rating: 4.6,
    reviewCount: 900,
    rankingBadge: null,
    iconUrl:
      "https://cdn.shopify.com/app-store/listing_images/62a4f829cd277d0296259f678226ae19/icon/CMTe68iT-5ECEAE=.png",
  },
  {
    matchNames: ["searchanise"],
    slug: "searchanise",
    appStoreSlug: "searchanise",
    listTitle: "Searchanise Search & Filter",
    developerName: "Searchanise",
    category: "Search",
    pricingLabel: "Free trial available",
    rating: 4.8,
    reviewCount: 600,
    rankingBadge: null,
    iconUrl:
      "https://cdn.shopify.com/app-store/listing_images/543e5094f4dc166bd6de54ff98c7e80e/icon/CPTl8uCS3v0CEAE=.png",
  },
  {
    matchNames: ["vitals"],
    slug: "vitals",
    appStoreSlug: "vitals",
    listTitle: "Vitals: Reviews, Bundles & More",
    developerName: "Vitals",
    category: "Conversion",
    pricingLabel: "Free trial available",
    rating: 4.8,
    reviewCount: 2000,
    rankingBadge: "Top 100",
    iconUrl:
      "https://cdn.shopify.com/app-store/listing_images/90600ebf22ca801b5fc543ad9b7553f0/icon/CPGxj-7H6IcCEAE=.png",
  },
  {
    matchNames: ["tiktok"],
    slug: "tiktok",
    appStoreSlug: "tiktok",
    listTitle: "TikTok Shop & Catalog",
    developerName: "TikTok",
    category: "Sales Channels",
    pricingLabel: "Free to install",
    rating: 4.4,
    reviewCount: 500,
    rankingBadge: null,
    iconUrl:
      "https://cdn.shopify.com/app-store/listing_images/ca1f1238d808935b77771b399df6e9ab/icon/CLe6nrP0lu8CEAE=.png",
  },
  {
    matchNames: ["facebook", "meta"],
    slug: "facebook",
    appStoreSlug: "facebook",
    listTitle: "Facebook & Instagram",
    developerName: "Meta",
    category: "Sales Channels",
    pricingLabel: "Free to install",
    rating: 4.3,
    reviewCount: 2000,
    rankingBadge: null,
    iconUrl:
      "https://cdn.shopify.com/app-store/listing_images/21d07b9a03ab6e538a053381def7b15d/icon/COCYpcCE9fwCEAE=.png",
  },
  {
    matchNames: ["google", "youtube"],
    slug: "google",
    appStoreSlug: "google",
    listTitle: "Google & YouTube",
    developerName: "Google",
    category: "Sales Channels",
    pricingLabel: "Free to install",
    rating: 4.2,
    reviewCount: 1500,
    rankingBadge: null,
    iconUrl:
      "https://cdn.shopify.com/app-store/listing_images/a78e004f44cded1b6998e7a6e081a230/icon/COng2Lf0lu8CEAE=.png",
  },
  {
    matchNames: ["crush.pics", "crushpics"],
    slug: "crush-pics",
    appStoreSlug: "crush-pics",
    listTitle: "Crush.pics Image Optimizer",
    developerName: "Crush.pics",
    category: "Store Optimization",
    pricingLabel: "Free plan available",
    rating: 4.7,
    reviewCount: 400,
    rankingBadge: null,
    iconUrl:
      "https://cdn.shopify.com/app-store/listing_images/8cada0f5da411a64e756606bb036f1ed/icon/CIfp9fWd34sDEAE=.png",
  },
  {
    matchNames: ["bold"],
    slug: "bold",
    appStoreSlug: "bold-subscriptions",
    listTitle: "Bold Subscriptions",
    developerName: "Bold",
    category: "Subscriptions",
    pricingLabel: "Free trial available",
    rating: 4.1,
    reviewCount: 300,
    rankingBadge: null,
    iconUrl:
      "https://cdn.shopify.com/app-store/listing_images/30abf5874699cb1609bd85dafb7f6aca/icon/CPKloLP0lu8CEAE=.png",
  },
  {
    matchNames: ["mailchimp"],
    slug: "mailchimp",
    appStoreSlug: "mailchimp",
    listTitle: "Mailchimp Email & SMS",
    developerName: "Mailchimp",
    category: "Email Marketing",
    pricingLabel: "Free plan available",
    rating: 4.4,
    reviewCount: 700,
    rankingBadge: null,
    iconUrl:
      "https://cdn.shopify.com/app-store/listing_images/5a5385cf8a756c3fc55c4fb80706f9f6/icon/CLa98_yf6PMCEAE=.png",
  },
];

export function findAppCatalogEntry(
  appName: string
): AppCatalogEntry | undefined {
  const normalized = appName.toLowerCase().trim();
  return APP_CATALOG.find((entry) =>
    entry.matchNames.some(
      (name) =>
        normalized === name ||
        normalized.includes(name) ||
        name.includes(normalized)
    )
  );
}

export function enrichAppFromCatalog(detected: {
  name: string;
  slug: string;
  category: string | null;
  vendor: string | null;
  officialUrl: string | null;
  confidenceScore: number;
}) {
  const catalog = findAppCatalogEntry(detected.name);
  if (!catalog) {
    const searchUrl = `https://apps.shopify.com/search?q=${encodeURIComponent(detected.name)}`;
    return {
      ...detected,
      listTitle: detected.name,
      developerName: detected.vendor ?? detected.name,
      shopifyAppStoreUrl: searchUrl,
      officialUrl: searchUrl,
      pricingLabel: null,
      rating: null,
      reviewCount: null,
      rankingBadge: null,
      iconUrl: null,
    };
  }

  const shopifyAppStoreUrl = getShopifyAppStoreUrl(catalog.appStoreSlug);

  return {
    ...detected,
    slug: catalog.slug,
    category: catalog.category,
    vendor: catalog.developerName,
    listTitle: catalog.listTitle,
    developerName: catalog.developerName,
    shopifyAppStoreUrl,
    officialUrl: shopifyAppStoreUrl,
    pricingLabel: catalog.pricingLabel,
    rating: catalog.rating,
    reviewCount: catalog.reviewCount,
    rankingBadge: catalog.rankingBadge,
    iconUrl: catalog.iconUrl,
  };
}
