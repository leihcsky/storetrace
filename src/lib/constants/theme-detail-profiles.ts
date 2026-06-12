import type { FeaturedTheme } from "./featured-themes";

export interface ThemeFaqItem {
  question: string;
  answer: string;
}

export interface ThemeDetailProfile {
  category: string;
  bestFor: string[];
  pros: string[];
  cons: string[];
  faq: ThemeFaqItem[];
  /** Extra overview paragraphs appended after base overview */
  overviewExtra?: string[];
}

export const THEME_DETAIL_PROFILES: Record<string, ThemeDetailProfile> = {
  dawn: {
    category: "Free",
    bestFor: [
      "New Shopify merchants",
      "General retail and CPG",
      "Brands prioritizing speed and simplicity",
      "Catalogs of any size",
    ],
    pros: [
      "Free and maintained by Shopify",
      "Excellent performance and mobile UX",
      "Full Online Store 2.0 section flexibility",
      "Wide app compatibility",
    ],
    cons: [
      "Common look without customization",
      "Less editorial flair than premium themes",
      "May need apps for advanced merchandising",
    ],
    faq: [
      {
        question: "Is Dawn worth it for a new store?",
        answer:
          "Yes — Dawn is Shopify's default free theme and a strong starting point. It is fast, well supported, and easy to customize with sections. Most merchants can launch professionally without buying a premium theme.",
      },
      {
        question: "How much does Dawn cost?",
        answer:
          "Dawn is completely free on the Shopify Theme Store. There is no monthly fee — only your standard Shopify plan.",
      },
      {
        question: "Who should use Dawn?",
        answer:
          "Dawn suits new stores, lean DTC brands, and merchants who want reliability over luxury editorial layouts. It works for small catalogs and large ones alike.",
      },
    ],
  },
  prestige: {
    category: "Premium",
    bestFor: [
      "Fashion and apparel",
      "Jewelry and accessories",
      "Luxury and lifestyle brands",
      "Beauty with editorial lookbooks",
    ],
    pros: [
      "Premium, luxury-forward design",
      "Strong storytelling and lookbook sections",
      "Mega menu and advanced navigation",
      "High-resolution media support",
    ],
    cons: [
      "Higher one-time purchase price",
      "Heavier creative asset requirements",
      "May be overkill for small catalogs",
    ],
    faq: [
      {
        question: "Is Prestige worth the price?",
        answer:
          "Prestige is worth it if brand presentation is central to your strategy — fashion, beauty, and lifestyle brands that invest in photography and editorial pacing often see a strong return from the premium layout.",
      },
      {
        question: "How much does Prestige cost?",
        answer:
          "Prestige is a one-time premium purchase on the Shopify Theme Store (typically around $400 USD; confirm current pricing on the listing).",
      },
      {
        question: "Who should use Prestige?",
        answer:
          "Merchants positioning as premium or luxury — fashion, jewelry, beauty, and home decor brands that need lookbooks, large imagery, and refined typography.",
      },
    ],
  },
  impulse: {
    category: "Premium",
    bestFor: [
      "Large catalogs and many SKUs",
      "Fashion and beauty with frequent sales",
      "Promotion-driven DTC brands",
      "Flash sale and campaign traffic",
    ],
    pros: [
      "Built for merchandising and promotions",
      "Advanced collection filtering",
      "Strong homepage campaign modules",
      "Quick buy and urgency features",
    ],
    cons: [
      "Busy layouts if over-merchandised",
      "Less minimalist than editorial themes",
      "Premium one-time cost",
    ],
    faq: [
      {
        question: "Is Impulse good for large catalogs?",
        answer:
          "Yes — Impulse is designed for stores with many products and collections. Filtering, promotional tiles, and homepage tabs help shoppers discover SKUs quickly.",
      },
      {
        question: "How much does Impulse cost?",
        answer:
          "Impulse is a premium one-time purchase on the Shopify Theme Store. Check the official listing for the current price.",
      },
      {
        question: "Impulse vs Dawn — which should I choose?",
        answer:
          "Choose Dawn for a free, minimal base. Choose Impulse when you run frequent promotions, have a large catalog, and need merchandising tools that support paid traffic and email campaigns.",
      },
    ],
  },
  refresh: {
    category: "Free",
    bestFor: [
      "Growing DTC brands",
      "Product storytelling",
      "Wellness and lifestyle",
      "Merchants upgrading from a bare starter look",
    ],
    pros: [
      "Free with more visual storytelling than Dawn",
      "Flexible OS 2.0 sections",
      "Clean typography and spacing",
      "Good balance of polish and cost",
    ],
    cons: [
      "Still a free theme — less unique than premium",
      "Fewer luxury modules than Prestige",
      "May need apps for advanced features",
    ],
    faq: [
      {
        question: "Refresh vs Dawn — what's the difference?",
        answer:
          "Both are free Shopify themes. Refresh offers more room for brand storytelling and campaign sections, while Dawn is more minimal and catalog-focused.",
      },
      {
        question: "Is Refresh free?",
        answer:
          "Yes. Refresh is available at no cost on the Shopify Theme Store.",
      },
      {
        question: "Who should use Refresh?",
        answer:
          "Brands that want a free theme with warmer layouts and product narrative — wellness, accessories, and growing catalogs that have outgrown a bare starter aesthetic.",
      },
    ],
  },
  motion: {
    category: "Premium",
    bestFor: [
      "Apparel and activewear",
      "Outdoor and fitness lifestyle",
      "Video-first marketing",
      "UGC and influencer-led brands",
    ],
    pros: [
      "Video heroes and motion-friendly sections",
      "Lifestyle editorial layouts",
      "Strong for campaign landing pages",
      "Instagram-style content blocks",
    ],
    cons: [
      "Requires quality video and photo assets",
      "Premium price point",
      "Can feel heavy without strong creative",
    ],
    faq: [
      {
        question: "Is Motion good for video-heavy brands?",
        answer:
          "Yes — Motion is Archetype's creative theme built for autoplay video, full-bleed photography, and lifestyle storytelling. It pairs well with paid social and UGC campaigns.",
      },
      {
        question: "How much does Motion cost?",
        answer:
          "Motion is a one-time premium purchase on the Shopify Theme Store. See the listing for the current price.",
      },
      {
        question: "Who should use Motion?",
        answer:
          "Apparel, outdoor, and fitness brands whose marketing is already video-first and who want homepage motion that matches ad creative.",
      },
    ],
  },
  impact: {
    category: "Premium",
    bestFor: [
      "Scaling DTC brands",
      "Paid social and TikTok traffic",
      "Conversion-focused product pages",
      "Beauty and consumer goods",
    ],
    pros: [
      "Bold, high-contrast conversion layout",
      "Trust and social proof modules",
      "Promo bars and announcement sections",
      "Optimized for landing-page tests",
    ],
    cons: [
      "Less editorial than Prestige",
      "Bold style may not suit luxury positioning",
      "Premium purchase required",
    ],
    faq: [
      {
        question: "Is Impact good for paid traffic?",
        answer:
          "Impact is built for merchants scaling Meta, TikTok, and Google ads. Product pages and homepage modules emphasize conversion, trust badges, and promotional messaging.",
      },
      {
        question: "Impact vs Prestige — which is better?",
        answer:
          "Prestige leans editorial and luxury. Impact leans direct response and conversion. Choose based on whether your brand leads with magazine-style storytelling or campaign-driven sales.",
      },
      {
        question: "How much does Impact cost?",
        answer:
          "Impact is sold as a one-time premium theme on the Shopify Theme Store. Confirm the latest price on the official listing.",
      },
    ],
  },
};

const VENDOR_BEST_FOR: Record<string, string[]> = {
  Shopify: ["New merchants", "Growing brands", "Cost-conscious stores"],
  Maestrooo: ["Fashion", "Beauty", "Lifestyle brands"],
  "Archetype Themes": ["Large catalogs", "Fashion", "Promotion-heavy stores"],
  "Clean Canvas": ["Fashion", "Home decor", "Minimalist brands"],
  "Pixel Union": ["Large catalogs", "Merchandising-heavy stores"],
  "Fuel Themes": ["Modern DTC", "Bold typography lovers"],
  Invisible: ["Content-led brands", "Editorial ecommerce"],
  Groupthought: ["Single-product launches", "Hero SKU brands"],
  RoarTheme: ["Gift shops", "Seasonal campaigns"],
};

export function inferThemeBestFor(theme: FeaturedTheme): string[] {
  const fromVendor = VENDOR_BEST_FOR[theme.vendor];
  if (fromVendor) return fromVendor;

  if (theme.priceType === "free") {
    return ["New Shopify stores", "Small to mid-size catalogs", "Budget-conscious merchants"];
  }

  return ["Growing ecommerce brands", "DTC merchants", "Stores investing in design"];
}

export function defaultThemePros(theme: FeaturedTheme): string[] {
  const base = [
    `Developed by ${theme.vendor}`,
    "Online Store 2.0 compatible",
    "Mobile-responsive layouts",
  ];

  if (theme.priceType === "free") {
    return [...base, "No theme license cost", "Regular Shopify updates (official themes)"];
  }

  return [...base, "Premium design and sections", "Theme Store support and updates"];
}

export function defaultThemeCons(theme: FeaturedTheme): string[] {
  if (theme.priceType === "free") {
    return [
      "Widely used — less unique without customization",
      "Fewer advanced modules than premium themes",
      "May require apps for specialized features",
    ];
  }

  return [
    "One-time premium purchase",
    "May need quality brand assets to shine",
    "Can be more than small catalogs need",
  ];
}

export function defaultThemeFaq(theme: FeaturedTheme): ThemeFaqItem[] {
  const priceAnswer =
    theme.priceType === "free"
      ? `${theme.name} is free on the Shopify Theme Store.`
      : `${theme.name} is a one-time premium purchase on the Shopify Theme Store. Check the official listing for the current price.`;

  return [
    {
      question: `How much does ${theme.name} cost?`,
      answer: priceAnswer,
    },
    {
      question: `Who should use ${theme.name}?`,
      answer: `${theme.name} by ${theme.vendor} is a ${theme.priceLabel.toLowerCase()} theme suited to merchants who want ${theme.description.charAt(0).toLowerCase()}${theme.description.slice(1)} Use our theme detector to see if competitors run it.`,
    },
    {
      question: `Is ${theme.name} worth it?`,
      answer:
        theme.priceType === "free"
          ? `As a free Theme Store option, ${theme.name} is a low-risk choice for merchants validating product-market fit. Compare features and demos on the Theme Store before customizing.`
          : `${theme.name} is worth evaluating if its layout matches your brand and catalog. Compare screenshots, reviews on the Theme Store, and run our detector on competitor stores before purchasing.`,
    },
  ];
}

export function expandThemeOverview(theme: FeaturedTheme): string[] {
  if (theme.overview.length >= 2) return theme.overview;

  const priceLine =
    theme.priceType === "free"
      ? `${theme.name} is a free Shopify theme from ${theme.vendor}.`
      : `${theme.name} is a premium Shopify theme from ${theme.vendor}.`;

  return [
    `${priceLine} ${theme.description}`,
    `${theme.name} follows Online Store 2.0 conventions, so merchants can customize templates with drag-and-drop sections and app embeds. It is a solid option when you want a Theme Store–supported foundation without building a custom theme from scratch.`,
    `Researchers and merchants use ${theme.name} when benchmarking competitors. Paste any store URL into our free Shopify theme detector to see whether this theme (or a close variant) appears on the live storefront.`,
  ];
}

export function defaultThemeFeatures(theme: FeaturedTheme): string[] {
  if (theme.features.length > 0) return theme.features;

  const base = [
    "Online Store 2.0 sections",
    "Mobile-optimized layouts",
    "Product and collection templates",
    "App embed compatible",
  ];

  if (theme.priceType === "premium") {
    return [...base, "Premium homepage modules", "Advanced merchandising sections"];
  }

  return [...base, "Free Theme Store license", "Shopify-maintained updates"];
}

export function resolveThemeDetailProfile(
  theme: FeaturedTheme
): ThemeDetailProfile & {
  overview: string[];
  features: string[];
} {
  const manual = THEME_DETAIL_PROFILES[theme.slug];

  return {
    category: manual?.category ?? (theme.priceType === "free" ? "Free" : "Premium"),
    bestFor: manual?.bestFor ?? inferThemeBestFor(theme),
    pros: manual?.pros ?? defaultThemePros(theme),
    cons: manual?.cons ?? defaultThemeCons(theme),
    faq: manual?.faq ?? defaultThemeFaq(theme),
    overview: [
      ...expandThemeOverview(theme),
      ...(manual?.overviewExtra ?? []),
    ],
    features: defaultThemeFeatures(theme),
  };
}
