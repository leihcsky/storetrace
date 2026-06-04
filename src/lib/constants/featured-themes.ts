/**
 * Featured theme images come from Shopify Theme Store listing pages:
 * https://themes.shopify.com/themes/{slug}
 *
 * Each page embeds preview screenshots on cdn.shopify.com/theme-store/{id}.jpg
 * (not a public API — scrape HTML when refreshing image links).
 */
export type ThemePriceType = "free" | "premium";

export interface ThemeStoreExample {
  name: string;
  domain: string;
}

export interface FeaturedTheme {
  name: string;
  slug: string;
  vendor: string;
  /** Short blurb for cards and meta fallback */
  description: string;
  /** ~155 chars for theme detail page meta description */
  metaDescription: string;
  priceType: ThemePriceType;
  priceLabel: string;
  /** Human-readable price line on detail page */
  priceDisplay: string;
  features: string[];
  /** Paragraphs for Theme Overview section */
  overview: string[];
  /** Suggested stores to run theme detector on (not verified to use this theme) */
  exampleStoresToScan: ThemeStoreExample[];
  themeStoreUrl: string;
  imageUrl: string;
  imageAlt: string;
}

export function getFeaturedThemeBySlug(slug: string): FeaturedTheme | undefined {
  return featuredThemes.find((t) => t.slug === slug);
}

/** Build Theme Store URL with optional Shopify Partner affiliate ref */
export function getThemeAffiliateUrl(themeStoreUrl: string): string {
  const ref = process.env.NEXT_PUBLIC_SHOPIFY_THEME_AFFILIATE_REF?.trim();
  if (!ref) return themeStoreUrl;

  try {
    const url = new URL(themeStoreUrl);
    url.searchParams.set("ref", ref);
    return url.toString();
  } catch {
    return themeStoreUrl;
  }
}

export const featuredThemes: FeaturedTheme[] = [
  {
    name: "Dawn",
    slug: "dawn",
    vendor: "Shopify",
    description:
      "Shopify's free flagship theme — minimal, fast, and ideal for most catalog sizes.",
    metaDescription:
      "Dawn Shopify theme by Shopify — free, fast, and flexible. Features, overview, and stores using Dawn. Install from the Theme Store.",
    priceType: "free",
    priceLabel: "Free",
    priceDisplay: "Free on the Shopify Theme Store",
    features: [
      "OS 2.0 sections on every template",
      "Fast, mobile-first product pages",
      "Built-in media galleries and video",
      "Quick view and sticky cart drawer",
      "SEO-friendly markup and performance",
      "Ideal for catalogs of any size",
    ],
    overview: [
      "Dawn is Shopify's reference free theme and the default starting point for thousands of new stores. It pairs a clean, editorial layout with Online Store 2.0 flexibility so merchants can build homepages, collection pages, and product detail pages from drag-and-drop sections without touching code.",
      "Because Dawn is maintained by Shopify, it receives regular performance and accessibility updates and stays compatible with core checkout and app embed features. It works well for general retail, CPG, and starter brands that want a professional look without a premium theme purchase.",
      "When you analyze a competitor and our theme detector reports Dawn, you are often looking at a lean, conversion-focused stack — sometimes lightly customized, sometimes paired with custom CSS but still running Dawn's underlying structure.",
    ],
    exampleStoresToScan: [
      { name: "Gymshark", domain: "gymshark.com" },
      { name: "Allbirds", domain: "allbirds.com" },
      { name: "Brooklinen", domain: "brooklinen.com" },
    ],
    themeStoreUrl: "https://themes.shopify.com/themes/dawn",
    imageUrl:
      "https://cdn.shopify.com/theme-store/ugjeeggg4c9s4b3po70wla2gnmwz.jpg?width=1200&quality=80",
    imageAlt: "Dawn Shopify theme preview screenshot",
  },
  {
    name: "Prestige",
    slug: "prestige",
    vendor: "Maestrooo",
    description:
      "Luxury brand aesthetic with editorial layouts built for high-end fashion and lifestyle.",
    metaDescription:
      "Prestige Shopify theme by Maestrooo — luxury layouts for fashion and lifestyle brands. Price, features, overview, and example stores.",
    priceType: "premium",
    priceLabel: "Premium",
    priceDisplay: "One-time purchase on the Shopify Theme Store (premium)",
    features: [
      "Editorial lookbooks and storytelling layouts",
      "Mega menu and collection filtering",
      "Promotional sections and countdown timers",
      "High-resolution image and video sections",
      "EU-friendly localization options",
      "Built for fashion, beauty, and lifestyle",
    ],
    overview: [
      "Prestige is one of Maestrooo's flagship paid themes, designed for premium fashion, beauty, and lifestyle merchants who need editorial pacing on the homepage and collection pages. Large imagery, serif accents, and spacious product grids signal luxury positioning.",
      "The theme ships with advanced navigation, promotional blocks, and content sections that support lookbooks, press features, and brand narrative — common requirements for DTC brands scaling beyond a minimal free theme.",
      "Stores running Prestige often invest heavily in photography and paid social. If you are researching competitors in apparel or accessories, spotting Prestige is a signal they prioritized brand presentation over a bare-bones catalog layout.",
    ],
    exampleStoresToScan: [
      { name: "Fashion Nova", domain: "fashionnova.com" },
      { name: "Kotn", domain: "kotn.com" },
      { name: "Rothy's", domain: "rothys.com" },
    ],
    themeStoreUrl: "https://themes.shopify.com/themes/prestige",
    imageUrl:
      "https://cdn.shopify.com/theme-store/kldoxe56tz0bufjgrlez22f1jvpl.jpg?width=1200&quality=80",
    imageAlt: "Prestige Shopify theme preview screenshot",
  },
  {
    name: "Impulse",
    slug: "impulse",
    vendor: "Archetype Themes",
    description:
      "Conversion-focused design with bold promotions — popular for large catalogs and flash sales.",
    metaDescription:
      "Impulse Shopify theme by Archetype — built for large catalogs and promotions. See features, pricing, overview, and stores using Impulse.",
    priceType: "premium",
    priceLabel: "Premium",
    priceDisplay: "One-time purchase on the Shopify Theme Store (premium)",
    features: [
      "Promotion tiles and sale messaging",
      "Advanced collection filtering",
      "Quick buy and cart upsells",
      "Inventory urgency and badges",
      "Optimized for large SKU counts",
      "Strong homepage merchandising",
    ],
    overview: [
      "Impulse targets merchants with broad catalogs — fashion retailers, beauty brands with many SKUs, and stores that run frequent promotions. The layout emphasizes bold banners, collection highlights, and paths to best sellers.",
      "Archetype Themes built Impulse as a sibling to Motion and Expanse, sharing a focus on merchandising tools that help shoppers discover products quickly. Expect prominent sale callouts, collection tabs, and homepage modules designed for campaign-driven traffic.",
      "When Impulse appears in a theme scan, the store is often optimizing for conversion rate on paid ads and email blasts rather than minimalist brand storytelling alone.",
    ],
    exampleStoresToScan: [
      { name: "Fashion Nova", domain: "fashionnova.com" },
      { name: "Princess Polly", domain: "princesspolly.com" },
      { name: "Showpo", domain: "showpo.com" },
    ],
    themeStoreUrl: "https://themes.shopify.com/themes/impulse",
    imageUrl:
      "https://cdn.shopify.com/theme-store/47qovs939p5pb6k304fyyg904l1x.jpg?width=1200&quality=80",
    imageAlt: "Impulse Shopify theme preview screenshot",
  },
  {
    name: "Refresh",
    slug: "refresh",
    vendor: "Shopify",
    description:
      "Clean, modern free theme with flexible sections for product storytelling.",
    metaDescription:
      "Refresh Shopify theme — free from Shopify with flexible sections for product storytelling. Features, overview, and example stores.",
    priceType: "free",
    priceLabel: "Free",
    priceDisplay: "Free on the Shopify Theme Store",
    features: [
      "Free Online Store 2.0 theme",
      "Flexible product storytelling sections",
      "Clean typography and spacing",
      "Collection and blog templates",
      "App embed compatible",
      "Good for growing catalogs",
    ],
    overview: [
      "Refresh is Shopify's second-generation free theme aimed at merchants who want more visual storytelling than Dawn's ultra-minimal default, while staying on a zero-cost theme license. Section groups make it easy to highlight collections, testimonials, and brand copy.",
      "It suits growing DTC brands that have outgrown a bare starter layout but are not ready to invest in a premium Theme Store purchase. Refresh balances whitespace with room for campaign banners and featured products.",
      "Theme detection may report Refresh on mid-size catalogs in home, wellness, and accessories niches where the merchant customized colors and fonts but kept Shopify's section structure intact.",
    ],
    exampleStoresToScan: [
      { name: "Pura Vida", domain: "puravidabracelets.com" },
      { name: "Beardbrand", domain: "beardbrand.com" },
      { name: "Chubbies", domain: "chubbiesshorts.com" },
    ],
    themeStoreUrl: "https://themes.shopify.com/themes/refresh",
    imageUrl:
      "https://cdn.shopify.com/theme-store/l1tbhpgw3g5x6zbvl4h2t7gjufaz.jpg?width=1200&quality=80",
    imageAlt: "Refresh Shopify theme preview screenshot",
  },
  {
    name: "Motion",
    slug: "motion",
    vendor: "Archetype Themes",
    description:
      "Dynamic visuals and video-friendly layouts for lifestyle and apparel brands.",
    metaDescription:
      "Motion Shopify theme by Archetype — video-friendly layouts for lifestyle brands. Features, price, overview, and stores using Motion.",
    priceType: "premium",
    priceLabel: "Premium",
    priceDisplay: "One-time purchase on the Shopify Theme Store (premium)",
    features: [
      "Video heroes and autoplay sections",
      "Lifestyle-focused collection grids",
      "Story-driven homepage modules",
      "Quick shop and size options",
      "Instagram-style content blocks",
      "Built for apparel and outdoor",
    ],
    overview: [
      "Motion is Archetype's creative theme for brands that lead with video, motion graphics, and full-bleed photography. Homepage sections support autoplay video backgrounds and editorial transitions between collections.",
      "It is especially popular with apparel, outdoor, and fitness lifestyle companies whose marketing assets are already video-first. Motion pairs well with UGC-heavy ad creative and influencer landing pages.",
      "Detecting Motion on a competitor store suggests they invested in a premium visual theme to match brand campaigns — useful context when benchmarking creative and merchandising strategy.",
    ],
    exampleStoresToScan: [
      { name: "Gymshark", domain: "gymshark.com" },
      { name: "Outdoor Voices", domain: "outdoorvoices.com" },
      { name: "Alphalete", domain: "alphaleteathletics.com" },
    ],
    themeStoreUrl: "https://themes.shopify.com/themes/motion",
    imageUrl:
      "https://cdn.shopify.com/theme-store/4d01hxs86ft6hzdwtlmp2jos4ru5.jpg?width=1200&quality=80",
    imageAlt: "Motion Shopify theme preview screenshot",
  },
  {
    name: "Impact",
    slug: "impact",
    vendor: "Maestrooo",
    description:
      "Bold, high-converting layouts designed for modern DTC brands scaling paid traffic.",
    metaDescription:
      "Impact Shopify theme by Maestrooo — bold DTC layouts for paid traffic. Features, pricing, overview, and example stores using Impact.",
    priceType: "premium",
    priceLabel: "Premium",
    priceDisplay: "One-time purchase on the Shopify Theme Store (premium)",
    features: [
      "Bold typography and contrast",
      "Conversion-focused product pages",
      "Promo bars and announcement sections",
      "Trust badges and social proof blocks",
      "Optimized for paid social landing",
      "Flexible color and font presets",
    ],
    overview: [
      "Impact is Maestrooo's answer to modern DTC brands scaling Meta, TikTok, and Google traffic. The theme uses strong typography, high-contrast sections, and product page modules that surface reviews, guarantees, and upsells.",
      "Merchants choose Impact when they want a premium look without the editorial pacing of Prestige — more direct response, less magazine layout. It supports rapid homepage tests for campaign seasons.",
      "If your Shopify theme detector flags Impact, the merchant likely prioritizes conversion optimization and frequent homepage merchandising updates tied to ad creative.",
    ],
    exampleStoresToScan: [
      { name: "ColourPop", domain: "colourpop.com" },
      { name: "Glossier", domain: "glossier.com" },
      { name: "Ridge", domain: "ridge.com" },
    ],
    themeStoreUrl: "https://themes.shopify.com/themes/impact",
    imageUrl:
      "https://cdn.shopify.com/theme-store/9ukrh8b4ruvxdri5fyqwc2e2narx.jpg?width=1200&quality=80",
    imageAlt: "Impact Shopify theme preview screenshot",
  },
];
