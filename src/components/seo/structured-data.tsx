import { absoluteUrl, siteConfig } from "@/lib/utils/site";

interface WebPageJsonLdProps {
  name: string;
  description: string;
  path: string;
}

export function WebPageJsonLd({ name, description, path }: WebPageJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url: absoluteUrl(path),
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

interface FaqItem {
  question: string;
  answer: string;
}

export function FaqJsonLd({ items }: { items: FaqItem[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

interface StoreAnalysisJsonLdProps {
  domain: string;
  storeName: string | null;
  themeName: string | null;
  path: string;
}

export function StoreAnalysisJsonLd({
  domain,
  storeName,
  themeName,
  path,
}: StoreAnalysisJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "AnalysisNewsArticle",
    headline: `${storeName ?? domain} Shopify Store Analysis`,
    description: `Theme and technology analysis for ${domain}${themeName ? ` — detected theme: ${themeName}` : ""}`,
    url: absoluteUrl(path),
    about: {
      "@type": "Organization",
      name: storeName ?? domain,
      url: `https://${domain}`,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function WebsiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/?url={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function ThemeDetectorJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Free Shopify Theme Detector",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: absoluteUrl("/tools/theme-detector"),
    description:
      "Free tool to answer what Shopify theme a store uses. Theme name, developer, Theme Store link, and confidence score.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Shopify theme name detection",
      "Theme vendor identification",
      "Shopify Theme Store link",
      "Detection confidence score",
    ],
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

interface ThemeDetailJsonLdProps {
  name: string;
  slug: string;
  vendor: string;
  description: string;
  priceType: "free" | "premium";
  themeStoreUrl: string;
  imageUrl: string;
}

export function ThemeDetailJsonLd({
  name,
  slug,
  vendor,
  description,
  priceType,
  themeStoreUrl,
  imageUrl,
}: ThemeDetailJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${name} Shopify Theme`,
    applicationCategory: "DesignApplication",
    operatingSystem: "Web",
    description,
    url: absoluteUrl(`/themes/${slug}`),
    image: imageUrl,
    author: {
      "@type": "Organization",
      name: vendor,
    },
    offers: {
      "@type": "Offer",
      ...(priceType === "free" ? { price: "0", priceCurrency: "USD" } : {}),
      url: themeStoreUrl,
      availability: "https://schema.org/InStock",
    },
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function AppDetectorJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Free Shopify App Detector",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: absoluteUrl("/tools/app-detector"),
    description:
      "Free Shopify app detector. Identify apps installed on any Shopify store from public storefront code.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Shopify app detection",
      "App Store listing links",
      "Ratings and categories",
      "Competitor app research",
    ],
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function HomePageJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Shopify Store Analyzer",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: siteConfig.url,
    description: siteConfig.description,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
