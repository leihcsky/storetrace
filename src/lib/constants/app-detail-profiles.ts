import type { FeaturedApp } from "./popular-apps";
import { popularApps } from "./popular-apps";

export interface AppFaqItem {
  question: string;
  answer: string;
}

export interface AppAlternative {
  name: string;
  slug: string;
}

export interface AppDetailProfile {
  overview: string[];
  features: string[];
  bestFor: string[];
  alternatives: AppAlternative[];
  faq: AppFaqItem[];
}

const CATEGORY_ALTERNATIVES: Record<string, string[]> = {
  "Email Marketing": ["omnisend", "mailchimp", "attentive"],
  Reviews: ["judge-me", "loox", "yotpo"],
  "SMS Marketing": ["klaviyo", "omnisend"],
  Tracking: ["route"],
  Upsell: ["rebuy", "vitals"],
  Personalization: ["nosto", "rebuy"],
  Support: ["tidio"],
  Loyalty: ["yotpo", "smile"],
  "Pop-ups": ["privy", "klaviyo"],
  "Page Builder": ["shogun", "pagefly"],
  Subscriptions: ["recharge", "bold"],
  Shipping: ["aftership"],
  Marketing: ["klaviyo", "pushowl"],
  Search: ["nosto", "searchanise"],
  Conversion: ["vitals", "rebuy"],
  "Sales Channels": ["facebook", "google", "tiktok"],
  "Store Optimization": ["crush-pics"],
};

const APP_DETAIL_PROFILES: Record<string, Omit<AppDetailProfile, "alternatives">> = {
  klaviyo: {
    overview: [
      "Klaviyo is a leading email and SMS marketing platform built specifically for ecommerce. Shopify merchants use it to send abandoned cart flows, welcome series, post-purchase messages, and segmented campaigns tied to real purchase behavior.",
      "Unlike generic email tools, Klaviyo syncs deeply with Shopify order and product data so segments update automatically — VIP customers, first-time buyers, and lapsed purchasers can each receive tailored messaging without manual list exports.",
      "Klaviyo is one of the most commonly detected apps on Shopify storefronts. If you are researching competitor retention stacks, spotting Klaviyo signals a serious investment in owned marketing channels.",
    ],
    features: [
      "Email automation and visual flow builder",
      "SMS marketing with compliance tooling",
      "RFM and behavioral segmentation",
      "Revenue attribution per campaign",
      "Product and catalog sync from Shopify",
      "Pop-ups and signup forms",
    ],
    bestFor: [
      "DTC brands scaling retention",
      "Fashion and beauty stores",
      "Subscription and repeat-purchase businesses",
      "Merchants investing in email + SMS",
    ],
    faq: [
      {
        question: "Is Klaviyo worth it for Shopify?",
        answer:
          "Klaviyo is worth it when email and SMS drive meaningful revenue. It is especially strong for stores with repeat purchase potential and enough traffic to segment meaningfully.",
      },
      {
        question: "How much does Klaviyo cost?",
        answer:
          "Klaviyo uses a freemium model based on contact count and messages sent. Check the Shopify App Store listing for current plans.",
      },
      {
        question: "Klaviyo vs Omnisend — which is better?",
        answer:
          "Klaviyo excels at deep Shopify data and advanced flows. Omnisend offers competitive omnichannel features at approachable pricing. Choose based on budget, team size, and automation complexity.",
      },
    ],
  },
  "judge-me": {
    overview: [
      "Judge.me is a popular Shopify reviews app known for affordable plans, photo reviews, and widgets that lift conversion on product pages. It is widely used by growing DTC brands that want social proof without enterprise pricing.",
      "The app collects star ratings, text reviews, and customer photos, then displays them on product pages, snippets for Google, and optional all-reviews pages. Merchants often pair Judge.me with Klaviyo or Meta ads once review volume grows.",
      "Judge.me frequently appears in storefront HTML via cdn.judge.me and jdgm scripts — one of the easier apps for our detector to confirm on competitor stores.",
    ],
    features: [
      "Product reviews with photos and video",
      "Star ratings and review widgets",
      "Q&A on product pages",
      "Google Shopping review snippets",
      "Coupons for photo reviews",
      "Import and migration tools",
    ],
    bestFor: [
      "Growing Shopify stores",
      "DTC brands building social proof",
      "Stores with visual products",
      "Merchants wanting affordable reviews",
    ],
    faq: [
      {
        question: "Is Judge.me free?",
        answer:
          "Judge.me offers a free plan with core review features. Paid plans unlock advanced widgets, SEO, and customization.",
      },
      {
        question: "Judge.me vs Loox — which should I use?",
        answer:
          "Judge.me is strong for all-around reviews at competitive pricing. Loox emphasizes visual UGC and photo-first layouts. Choose based on how important customer photos are to your category.",
      },
      {
        question: "Does Judge.me affect page speed?",
        answer:
          "Like any review widget, Judge.me adds scripts to product pages. Use lazy loading and monitor Core Web Vitals after install.",
      },
    ],
  },
  yotpo: {
    overview: [
      "Yotpo is an enterprise-grade reviews, loyalty, and UGC platform used by many mid-market and large Shopify brands. It combines product reviews, loyalty points, referrals, and SMS in a unified suite.",
      "Stores running Yotpo often invest heavily in retention — loyalty tiers, review generation campaigns, and syndicated UGC across ads and email. Detection usually involves Yotpo CDN scripts or loyalty loaders on the storefront.",
      "If competitor research surfaces Yotpo, expect a mature marketing stack rather than a bare-bones startup setup.",
    ],
    features: [
      "Product reviews and ratings",
      "Loyalty and rewards programs",
      "Referral marketing",
      "Visual UGC galleries",
      "SMS (Yotpo suite)",
      "Google and social syndication",
    ],
    bestFor: [
      "Mid-market and scaling brands",
      "Beauty and fashion retention",
      "Stores with loyalty programs",
      "Merchants consolidating reviews + loyalty",
    ],
    faq: [
      {
        question: "Is Yotpo worth the cost?",
        answer:
          "Yotpo fits brands that will use multiple modules — reviews, loyalty, and SMS — together. Smaller stores may prefer lighter tools like Judge.me or Loox until volume justifies the suite.",
      },
      {
        question: "Yotpo vs Judge.me?",
        answer:
          "Yotpo targets broader retention suites and larger merchants. Judge.me focuses on reviews with approachable pricing for growing stores.",
      },
      {
        question: "Can I detect Yotpo on any store?",
        answer:
          "Usually yes when review or loyalty widgets load on the storefront. Some headless setups may hide scripts — use our app detector to confirm.",
      },
    ],
  },
  omnisend: {
    overview: [
      "Omnisend is an email, SMS, and push marketing platform tailored to ecommerce brands. It competes with Klaviyo on automation while often appealing to merchants who want omnichannel campaigns in one dashboard.",
      "Shopify integration syncs customers, orders, and products for abandoned cart, welcome, and post-purchase workflows. Pop-ups and signup forms help grow lists from paid traffic.",
      "Omnisend is a common alternative when stores want strong automation without Klaviyo's pricing at smaller list sizes.",
    ],
    features: [
      "Email automation workflows",
      "SMS and push notifications",
      "Segmentation by behavior",
      "Pop-ups and landing forms",
      "Product picker in emails",
      "Campaign reporting",
    ],
    bestFor: [
      "Growing ecommerce brands",
      "Merchants wanting email + SMS together",
      "Stores comparing Klaviyo alternatives",
      "Campaign-driven DTC",
    ],
    faq: [
      {
        question: "Omnisend vs Klaviyo?",
        answer:
          "Both are strong for Shopify. Klaviyo leads on depth and ecosystem; Omnisend competes on bundled channels and pricing for many mid-size stores.",
      },
      {
        question: "Does Omnisend have a free plan?",
        answer:
          "Omnisend offers a free tier with limits. See the App Store listing for current contact and send allowances.",
      },
      {
        question: "Who should use Omnisend?",
        answer:
          "Brands that want email, SMS, and push in one tool and need solid automation without managing multiple apps.",
      },
    ],
  },
  recharge: {
    overview: [
      "Recharge is the most recognized subscription billing app on Shopify. It powers subscribe-and-save offers, membership boxes, and recurring revenue models with customer portals and dunning management.",
      "Merchants selling consumables, supplements, coffee, pet food, and beauty refills frequently adopt Recharge. Storefront detection often includes rechargecdn.com scripts or subscription widgets on product pages.",
      "If a competitor uses Recharge, they are optimizing for LTV and repeat orders — not one-time purchase only.",
    ],
    features: [
      "Subscription products on Shopify",
      "Customer subscription portal",
      "Dunning and failed payment recovery",
      "Bundle and prepaid plans",
      "Analytics and churn insights",
      "Checkout and storefront widgets",
    ],
    bestFor: [
      "Consumable products",
      "Subscription boxes",
      "Beauty and wellness refills",
      "Brands optimizing LTV",
    ],
    faq: [
      {
        question: "Is Recharge the best Shopify subscription app?",
        answer:
          "Recharge is the most established option with broad compatibility. Alternatives like Skio and Bold exist — choose based on checkout needs, pricing, and feature set.",
      },
      {
        question: "How much does Recharge cost?",
        answer:
          "Recharge typically charges a monthly fee plus transaction fees. Check the App Store for current pricing tiers.",
      },
      {
        question: "Can I detect Recharge on a competitor store?",
        answer:
          "Often yes — subscription widgets and rechargecdn.com assets appear on product and cart pages. Our app detector checks these signatures.",
      },
    ],
  },
  gorgias: {
    overview: [
      "Gorgias is a helpdesk and live chat platform built for ecommerce. It pulls Shopify order data into support tickets so agents see tracking, refunds, and customer history without switching tabs.",
      "High-growth DTC brands use Gorgias to handle support volume from paid social, reduce response time, and automate common questions with macros and rules. AI features help draft replies and deflect repetitive tickets.",
      "Gorgias chat widgets and config.gorgias.io scripts are common detection signals on Shopify storefronts.",
    ],
    features: [
      "Live chat and helpdesk inbox",
      "Shopify order sidebar in tickets",
      "Macros, rules, and automation",
      "AI suggested replies",
      "Social and SMS channel support",
      "Revenue attribution from support",
    ],
    bestFor: [
      "High-volume DTC support",
      "Fashion and beauty brands",
      "Stores with heavy chat traffic",
      "Teams replacing generic helpdesks",
    ],
    faq: [
      {
        question: "Gorgias vs Zendesk for Shopify?",
        answer:
          "Gorgias is purpose-built for Shopify merchants with order context in every ticket. Zendesk is broader but less ecommerce-native out of the box.",
      },
      {
        question: "Is Gorgias worth it?",
        answer:
          "Worth it when support volume is high enough that agent efficiency and automation save real labor cost — especially for stores driving traffic from ads.",
      },
      {
        question: "Does Gorgias slow down my store?",
        answer:
          "The chat widget loads asynchronously. Monitor performance after install and defer loading if needed.",
      },
    ],
  },
  rebuy: {
    overview: [
      "Rebuy is an AI-powered personalization engine for upsells, cross-sells, and smart cart experiences. It surfaces recommended products in cart, on product pages, and post-purchase based on rules and machine learning.",
      "Merchants scaling AOV use Rebuy to replace manual related-product blocks with dynamic merchandising. It integrates with Shopify checkout extensions and common subscription apps.",
      "rebuyengine.com scripts on the storefront are a reliable indicator when researching competitor monetization tactics.",
    ],
    features: [
      "Cart upsells and cross-sells",
      "Product page recommendations",
      "Post-purchase one-click offers",
      "Smart collections merchandising",
      "A/B testing for offers",
      "Integration with subscriptions",
    ],
    bestFor: [
      "Stores optimizing AOV",
      "Large catalogs",
      "Paid traffic with slim margins",
      "Merchants testing upsell funnels",
    ],
    faq: [
      {
        question: "Rebuy vs manual related products?",
        answer:
          "Rebuy automates recommendations with rules and data. Manual blocks work for small catalogs; Rebuy scales when SKU count and traffic grow.",
      },
      {
        question: "Is Rebuy hard to set up?",
        answer:
          "Rebuy provides templates for cart and product widgets. Most merchants launch basic upsells quickly, then refine rules over time.",
      },
      {
        question: "Who should use Rebuy?",
        answer:
          "Brands with enough traffic and SKU depth that incremental AOV gains justify a personalization app.",
      },
    ],
  },
  loox: {
    overview: [
      "Loox is a visual reviews app focused on customer photos and videos displayed in galleries on product pages. Beauty, fashion, and lifestyle brands use it to turn UGC into conversion assets.",
      "Loox includes referral incentives for photo reviews, on-brand widgets, and integrations with ads and email tools. It competes with Judge.me and Yotpo on the social proof layer.",
      "Detection typically involves loox.io or loox.app assets in storefront HTML.",
    ],
    features: [
      "Photo and video reviews",
      "Review request automations",
      "On-site review galleries",
      "Referral discounts for UGC",
      "Google Shopping integration",
      "Social ad integrations",
    ],
    bestFor: [
      "Visual product categories",
      "Beauty and fashion DTC",
      "Brands leaning on UGC ads",
      "Stores prioritizing photo reviews",
    ],
    faq: [
      {
        question: "Loox vs Judge.me?",
        answer:
          "Loox emphasizes visual UGC galleries. Judge.me is a broader reviews platform at competitive pricing. Pick based on how central customer photos are to your PDP strategy.",
      },
      {
        question: "Does Loox offer a free trial?",
        answer:
          "Loox typically offers trial periods on paid plans. Confirm on the Shopify App Store listing.",
      },
      {
        question: "Can Loox reviews feed Meta ads?",
        answer:
          "Loox supports UGC workflows that pair with paid social. Exact integrations change over time — verify on the app listing.",
      },
    ],
  },
  attentive: {
    overview: [
      "Attentive is a leading SMS marketing platform for ecommerce, known for high-intent list growth and personalized text campaigns. Shopify merchants use it for welcome offers, cart recovery, and product launches via SMS.",
      "Attentive pairs signup units on the storefront with compliance tooling and segmentation tied to purchase behavior. It often appears alongside Klaviyo or replaces SMS modules in smaller stacks.",
      "attn.tv and attentive-dtag scripts are common fingerprints on stores running aggressive SMS programs.",
    ],
    features: [
      "SMS list growth units",
      "Two-tap mobile signup",
      "Segmented text campaigns",
      "Cart abandonment SMS",
      "Compliance and opt-out management",
      "Integrations with Shopify and ESPs",
    ],
    bestFor: [
      "US-focused DTC brands",
      "High-traffic mobile stores",
      "Fashion and beauty SMS programs",
      "Brands scaling owned SMS",
    ],
    faq: [
      {
        question: "Attentive vs Klaviyo SMS?",
        answer:
          "Attentive specializes in SMS at scale. Klaviyo offers SMS within a broader email-first platform. Many enterprises use both; smaller brands often consolidate.",
      },
      {
        question: "Is Attentive only for large brands?",
        answer:
          "Attentive historically targeted larger merchants but now serves a wider range. Evaluate minimum spend and fit with your traffic.",
      },
      {
        question: "How do I detect Attentive on a store?",
        answer:
          "Look for attn.tv or attentive-dtag scripts, or run our Shopify app detector on the store URL.",
      },
    ],
  },
  pagefly: {
    overview: [
      "PageFly is a drag-and-drop landing page builder for Shopify. Merchants create campaign pages, product detail variants, and content pages without editing theme code directly.",
      "Paid social and email campaigns often land on PageFly pages rather than default product templates. The app suits teams without developers who need fast iteration on landing creative.",
      "PageFly is common in stores that run frequent seasonal campaigns or influencer landing pages.",
    ],
    features: [
      "Visual drag-and-drop editor",
      "Landing and campaign templates",
      "Product page sections",
      "Mobile-responsive layouts",
      "Analytics and conversion tracking",
      "SEO controls for pages",
    ],
    bestFor: [
      "Campaign-driven marketing",
      "Teams without developers",
      "Influencer landing pages",
      "Seasonal promotions",
    ],
    faq: [
      {
        question: "PageFly vs Shogun?",
        answer:
          "Both are leading Shopify page builders. Compare pricing, template libraries, and whether you need A/B testing (Shogun emphasizes testing).",
      },
      {
        question: "Does PageFly slow down my store?",
        answer:
          "Heavy pages with many sections can affect speed. Keep layouts lean and monitor Core Web Vitals on key landing URLs.",
      },
      {
        question: "Is PageFly good for SEO?",
        answer:
          "PageFly includes SEO fields for custom pages. Ensure canonical URLs and metadata match your content strategy.",
      },
    ],
  },
};

function resolveAlternatives(app: FeaturedApp): AppAlternative[] {
  const slugs = CATEGORY_ALTERNATIVES[app.category] ?? [];
  const alts: AppAlternative[] = [];

  for (const slug of slugs) {
    if (slug === app.slug) continue;
    const match = popularApps.find((a) => a.slug === slug);
    if (match) {
      alts.push({ name: match.name, slug: match.slug });
    }
    if (alts.length >= 4) break;
  }

  return alts;
}

function defaultAppOverview(app: FeaturedApp): string[] {
  return [
    `${app.listTitle} is a ${app.category.toLowerCase()} app for Shopify stores, developed by ${app.developerName}. ${app.description}`,
    `Merchants install ${app.name} from the Shopify App Store to extend storefront or admin functionality. Many apps in this category leave detectable scripts on the live site — use our free app detector to see if a competitor runs ${app.name}.`,
    `Before adopting ${app.name}, compare pricing on the App Store listing, read recent merchant reviews, and test on a development store when possible.`,
  ];
}

function defaultAppFeatures(app: FeaturedApp): string[] {
  const byCategory: Record<string, string[]> = {
    "Email Marketing": [
      "Email campaigns and automations",
      "Shopify customer sync",
      "Segmentation",
      "Signup forms",
    ],
    Reviews: [
      "Product review collection",
      "On-site review widgets",
      "Star ratings",
      "Social proof on PDPs",
    ],
    Subscriptions: [
      "Recurring billing",
      "Customer portal",
      "Subscription management",
      "Shopify checkout integration",
    ],
    Support: [
      "Live chat widget",
      "Ticket inbox",
      "Shopify order context",
      "Automation rules",
    ],
  };

  return (
    byCategory[app.category] ?? [
      `${app.category} features for Shopify`,
      "App Store installation",
      "Shopify admin integration",
      "Storefront or checkout extensions",
    ]
  );
}

function defaultAppBestFor(app: FeaturedApp): string[] {
  const byCategory: Record<string, string[]> = {
    "Email Marketing": ["DTC brands", "Retention-focused stores", "Growing lists"],
    Reviews: ["Social proof seekers", "Product-heavy catalogs", "DTC merchants"],
    Subscriptions: ["Consumables", "Membership models", "LTV-focused brands"],
    "Sales Channels": ["Multi-channel sellers", "Social commerce", "Marketplace expansion"],
  };

  return byCategory[app.category] ?? ["Shopify merchants", "Growing ecommerce brands"];
}

function defaultAppFaq(app: FeaturedApp): AppFaqItem[] {
  return [
    {
      question: `What does ${app.name} do on Shopify?`,
      answer: `${app.description} It is listed in the ${app.category} category on the Shopify App Store.`,
    },
    {
      question: `How much does ${app.name} cost?`,
      answer:
        app.pricingLabel ??
        `See the official Shopify App Store listing for ${app.name} for current pricing.`,
    },
    {
      question: `Can I detect ${app.name} on a competitor store?`,
      answer: `Many ${app.category.toLowerCase()} apps inject scripts on the storefront. Run our free Shopify app detector with the store URL to check for ${app.name} and related tools.`,
    },
  ];
}

export function resolveAppDetailProfile(app: FeaturedApp): AppDetailProfile {
  const manual = APP_DETAIL_PROFILES[app.slug];

  return {
    overview: manual?.overview ?? defaultAppOverview(app),
    features: manual?.features ?? defaultAppFeatures(app),
    bestFor: manual?.bestFor ?? defaultAppBestFor(app),
    alternatives: resolveAlternatives(app),
    faq: manual?.faq ?? defaultAppFaq(app),
  };
}
