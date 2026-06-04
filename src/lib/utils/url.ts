const DOMAIN_SLUG_SEPARATOR = "-";

export function normalizeStoreUrl(input: string): string {
  let url = input.trim();
  if (!url) {
    throw new Error("URL is required");
  }
  if (!/^https?:\/\//i.test(url)) {
    url = `https://${url}`;
  }
  const parsed = new URL(url);
  return parsed.origin;
}

export function extractDomain(url: string): string {
  const normalized = normalizeStoreUrl(url);
  const hostname = new URL(normalized).hostname;
  return hostname.replace(/^www\./i, "");
}

export function domainToSlug(domain: string): string {
  return domain.replace(/\./g, DOMAIN_SLUG_SEPARATOR);
}

export function slugToDomain(slug: string): string {
  const normalized = slug.trim().toLowerCase();

  // *.myshopify.com — subdomain can contain hyphens (e.g. shella-jewelry-skin)
  const myshopifySuffix = `${DOMAIN_SLUG_SEPARATOR}myshopify${DOMAIN_SLUG_SEPARATOR}com`;
  if (normalized.endsWith(myshopifySuffix)) {
    const shop = normalized.slice(0, -myshopifySuffix.length);
    return shop ? `${shop}.myshopify.com` : "myshopify.com";
  }

  const parts = normalized.split(DOMAIN_SLUG_SEPARATOR);
  if (parts.length < 2) {
    return normalized;
  }

  const tld = parts[parts.length - 1]!;
  const sld = parts[parts.length - 2]!;
  const prefix = parts.slice(0, -2);

  if (prefix.length === 0) {
    return `${sld}.${tld}`;
  }

  return `${prefix.join(".")}.${sld}.${tld}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}
