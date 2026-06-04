import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "./site";

interface PageMetadataOptions {
  /** Page title; brand is appended once unless includeSiteName is false. */
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
  /** Default true. Set false for tool landing pages that omit "| StoreTrace". */
  includeSiteName?: boolean;
}

function buildDocumentTitle(title: string): string {
  if (title === siteConfig.name || title.includes(siteConfig.name)) {
    return title;
  }
  return `${title} | ${siteConfig.name}`;
}

/** Google typically shows ~155–160 characters for meta descriptions. */
export function truncateMetaDescription(text: string, max = 160): string {
  const trimmed = text.trim();
  if (trimmed.length <= max) return trimmed;
  const cut = trimmed.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 120 ? cut.slice(0, lastSpace) : cut).trim()}…`;
}

export function createPageMetadata({
  title,
  description,
  path,
  noIndex = false,
  includeSiteName = true,
}: PageMetadataOptions): Metadata {
  const fullTitle = includeSiteName ? buildDocumentTitle(title) : title;
  const metaDescription = truncateMetaDescription(description);

  return {
    // absolute bypasses layout title.template — avoids "… | StoreTrace | StoreTrace"
    title: { absolute: fullTitle },
    description: metaDescription,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: absoluteUrl(path),
    },
    openGraph: {
      title: fullTitle,
      description: metaDescription,
      url: absoluteUrl(path),
      siteName: siteConfig.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: metaDescription,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
