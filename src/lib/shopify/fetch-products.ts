import { fetchStoreJson } from "./fetch-store";
import type { ProductStatsSummary } from "./types";

interface ShopifyProductsResponse {
  products: Array<{
    variants?: Array<{ price?: string }>;
  }>;
}

interface ShopifyProductsCountResponse {
  count?: number;
}

const PAGE_LIMIT = 250;
/** Cap pages to keep scan time reasonable on large catalogs */
const MAX_PAGES = 12;

export async function fetchStoreProductStats(
  storeUrl: string,
  currency: string | null
): Promise<ProductStatsSummary> {
  const countJson = await fetchStoreJson<ShopifyProductsCountResponse>(
    storeUrl,
    "/products/count.json"
  );
  const countFromApi =
    typeof countJson?.count === "number" ? countJson.count : null;

  /** Each product's lowest variant price (typical storefront "from" price) */
  const productPrices: number[] = [];
  let productsFetched = 0;
  let catalogFullyFetched = false;

  for (let page = 1; page <= MAX_PAGES; page++) {
    const productsJson = await fetchStoreJson<ShopifyProductsResponse>(
      storeUrl,
      `/products.json?limit=${PAGE_LIMIT}&page=${page}`
    );

    const batch = productsJson?.products ?? [];
    if (batch.length === 0) {
      catalogFullyFetched = page === 1 ? false : true;
      break;
    }

    productsFetched += batch.length;

    for (const product of batch) {
      const variantPrices = (product.variants ?? [])
        .map((v) => parseFloat(v.price ?? ""))
        .filter((p) => !Number.isNaN(p) && p >= 0);
      if (variantPrices.length > 0) {
        productPrices.push(Math.min(...variantPrices));
      }
    }

    if (batch.length < PAGE_LIMIT) {
      catalogFullyFetched = true;
      break;
    }
  }

  // Many stores disable /products/count.json (404); fall back to paginated count.
  const count =
    countFromApi ??
    (productsFetched > 0 ? productsFetched : null);

  const isSampled =
    countFromApi !== null
      ? productsFetched > 0 && productsFetched < countFromApi
      : productsFetched > 0 && !catalogFullyFetched;

  if (productPrices.length === 0) {
    return {
      count,
      averagePrice: null,
      minPrice: null,
      maxPrice: null,
      priceRange: null,
      currency,
      pricedProductCount: 0,
      isSampled: false,
    };
  }

  const minPrice = Math.min(...productPrices);
  const maxPrice = Math.max(...productPrices);
  const averagePrice =
    productPrices.reduce((sum, p) => sum + p, 0) / productPrices.length;

  return {
    count,
    averagePrice: roundPrice(averagePrice),
    minPrice: roundPrice(minPrice),
    maxPrice: roundPrice(maxPrice),
    priceRange: formatPriceRange(minPrice, maxPrice, currency),
    currency,
    pricedProductCount: productsFetched,
    isSampled,
  };
}

function roundPrice(value: number): number {
  return Math.round(value * 100) / 100;
}

function formatPriceRange(
  min: number,
  max: number,
  currency: string | null
): string {
  const minStr = formatMoney(min, currency);
  const maxStr = formatMoney(max, currency);
  return min === max ? minStr : `${minStr} – ${maxStr}`;
}

function formatMoney(amount: number, currency: string | null): string {
  if (currency) {
    try {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(amount);
    } catch {
      // invalid currency code
    }
  }
  return amount.toFixed(2);
}
