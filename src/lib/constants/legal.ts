import { siteConfig } from "@/lib/utils/site";

/** Shown on legal pages; update when policies change materially. */
export const LEGAL_LAST_UPDATED = "June 12, 2026";

/** Public launch date for the site and About page. */
export const SITE_LAUNCHED = "June 12, 2026";

export const legalContact = {
  general: `contact@${new URL(siteConfig.url).hostname}`,
  privacy: `privacy@${new URL(siteConfig.url).hostname}`,
} as const;
