import Link from "next/link";
import { notFound } from "next/navigation";
import { AnalyzeAnotherStore } from "@/components/store-analyzer/analyze-another-store";
import { DetectedAppsList } from "@/components/store-analyzer/detected-apps-list";
import { StoreAnalysisTabs } from "@/components/store-analyzer/store-analysis-tabs";
import { StoreAnalysisJsonLd } from "@/components/seo/structured-data";
import { getStoreByDomainSlug } from "@/lib/db/repositories/store-repository";
import { enrichAppFromCatalog } from "@/lib/constants/app-catalog";
import { createPageMetadata } from "@/lib/utils/metadata";
import { parseStoreAnalysisTab } from "@/lib/constants/store-analysis-tab";
import type { AppDetectionResult, ProductStatsSummary } from "@/lib/shopify/types";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Suspense } from "react";

interface StorePageProps {
  params: Promise<{ domain: string }>;
  searchParams: Promise<{ tab?: string }>;
}

export async function generateMetadata({
  params,
}: StorePageProps): Promise<Metadata> {
  const { domain: domainSlug } = await params;

  if (!process.env.DATABASE_URL) {
    return createPageMetadata({
      title: `Shopify Store Analysis — ${domainSlug}`,
      description: `Shopify store analysis for ${domainSlug}`,
      path: `/stores/${domainSlug}`,
    });
  }

  try {
    const store = await getStoreByDomainSlug(domainSlug);
    if (!store) {
      return createPageMetadata({
        title: "Store Not Found",
        description: "This store has not been analyzed yet.",
        path: `/stores/${domainSlug}`,
        noIndex: true,
      });
    }

    const themeName = store.theme?.name;
    return createPageMetadata({
      title: `${store.storeName ?? store.domain} — Shopify Store Analysis`,
      description: `Shopify analysis for ${store.domain}${themeName ? `. Theme: ${themeName}` : ""}. View theme, apps, and store metadata.`,
      path: `/stores/${domainSlug}`,
    });
  } catch {
    return createPageMetadata({
      title: `Shopify Store Analysis`,
      description: `Shopify store analysis`,
      path: `/stores/${domainSlug}`,
    });
  }
}

function StatGrid({
  items,
}: {
  items: Array<{ label: string; value: ReactNode }>;
}) {
  return (
    <dl className="grid gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-xl border border-slate-100 bg-slate-50/80 px-4 py-3"
        >
          <dt className="text-sm text-slate-500">{item.label}</dt>
          <dd className="mt-1 font-medium text-slate-900">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export default async function StoreDetailPage({
  params,
  searchParams,
}: StorePageProps) {
  const { domain: domainSlug } = await params;
  const { tab: tabParam } = await searchParams;
  const initialTab = parseStoreAnalysisTab(tabParam);

  if (!process.env.DATABASE_URL) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
        <p className="text-slate-600">
          Database not configured. Set DATABASE_URL to view store analysis results.
        </p>
        <Link
          href="/tools/theme-detector"
          className="mt-4 inline-block text-brand hover:underline"
        >
          Analyze a store
        </Link>
      </div>
    );
  }

  const store = await getStoreByDomainSlug(domainSlug);

  if (!store) {
    notFound();
  }

  const lastScan = store.scans[0];
  const scanResult = lastScan?.scanResult as {
    shopifyPlan?: string | null;
    createdAtOnShopify?: string | null;
    productStats?: ProductStatsSummary;
    /** @deprecated legacy scan payload */
    productsCount?: number | null;
    theme?: {
      themeName?: string;
      themeVendor?: string;
      themeDescription?: string;
      themeStoreUrl?: string;
      confidenceScore?: number;
    };
    apps?: AppDetectionResult[];
  } | null;

  const theme = store.theme;
  const themeFromScan = scanResult?.theme;
  const themeStoreUrl =
    theme?.themeStoreUrl ?? themeFromScan?.themeStoreUrl ?? null;
  const themeVendorDisplay = (() => {
    const vendor = themeFromScan?.themeVendor ?? theme?.vendor ?? null;
    if (vendor) return vendor;
    if (themeStoreUrl) return "Shopify Theme Store";
    const themeName = theme?.name ?? themeFromScan?.themeName;
    if (themeName) return "Custom theme (not on Theme Store)";
    return "—";
  })();

  const appsForDisplay: AppDetectionResult[] =
    scanResult?.apps?.length
      ? scanResult.apps
      : store.storeApps.map((item) =>
          enrichAppFromCatalog({
            name: item.app.name,
            slug: item.app.slug,
            category: item.app.category,
            vendor: item.app.vendor,
            officialUrl: item.app.officialUrl,
            confidenceScore: 80,
          })
        );

  const productStats: ProductStatsSummary | null =
    scanResult?.productStats ??
    (scanResult?.productsCount != null
      ? {
          count: scanResult.productsCount,
          averagePrice: null,
          minPrice: null,
          maxPrice: null,
          priceRange: null,
          currency: store.currency,
          pricedProductCount: 0,
          isSampled: false,
        }
      : null);

  const formatStatPrice = (value: number | null) => {
    if (value == null) return "—";
    const currency = productStats?.currency ?? store.currency;
    if (currency) {
      try {
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency,
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(value);
      } catch {
        // fall through
      }
    }
    return value.toFixed(2);
  };

  const overviewPanel = (
    <div>
      <p className="mb-5 text-sm text-slate-500">
        Public storefront metadata collected during the latest scan.
      </p>
      <StatGrid
        items={[
          { label: "Store Name", value: store.storeName ?? "—" },
          {
            label: "Shopify Plan",
            value: store.shopifyPlan ?? scanResult?.shopifyPlan ?? "Unknown",
          },
          {
            label: "Shopify Detected",
            value: store.shopifyDetected ? "Yes" : "No",
          },
          { label: "Country", value: store.country ?? "—" },
          { label: "Currency", value: store.currency ?? "—" },
          {
            label: "Last Scan",
            value: store.lastScannedAt
              ? new Date(store.lastScannedAt).toLocaleString()
              : "—",
          },
          {
            label: "Created",
            value: store.createdAtOnShopify
              ? new Date(store.createdAtOnShopify).toLocaleDateString()
              : scanResult?.createdAtOnShopify
                ? new Date(scanResult.createdAtOnShopify).toLocaleDateString()
                : "Unknown",
          },
        ]}
      />
    </div>
  );

  const themePanel =
    theme || themeFromScan?.themeName ? (
      <div>
        <p className="mb-5 text-sm text-slate-500">
          Theme signals from HTML, scripts, and Shopify theme objects.
        </p>
        <StatGrid
          items={[
            {
              label: "Theme Name",
              value: (
                <>
                  {theme?.name ?? themeFromScan?.themeName}
                  {theme && (
                    <Link
                      href={`/themes/${theme.slug}`}
                      className="ml-2 text-sm font-normal text-brand hover:underline"
                    >
                      View theme →
                    </Link>
                  )}
                </>
              ),
            },
            { label: "Vendor", value: themeVendorDisplay },
            ...(themeStoreUrl
              ? [
                  {
                    label: "Theme Store",
                    value: (
                      <a
                        href={themeStoreUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand hover:underline"
                      >
                        View on Shopify Theme Store ↗
                      </a>
                    ),
                  },
                ]
              : []),
            ...(themeFromScan?.confidenceScore != null
              ? [
                  {
                    label: "Confidence Score",
                    value: `${themeFromScan.confidenceScore}%`,
                  },
                ]
              : []),
          ]}
        />
      </div>
    ) : (
      <p className="text-slate-500">No theme detected from public storefront code.</p>
    );

  const appsPanel = (
    <div>
      <p className="mb-5 text-sm text-slate-500">
        {appsForDisplay.length > 0
          ? `We found ${appsForDisplay.length} app${appsForDisplay.length === 1 ? "" : "s"} running on this store. Links open the Shopify App Store when available.`
          : "Apps are inferred from scripts and third-party assets visible on the storefront."}
      </p>
      <DetectedAppsList apps={appsForDisplay} embedded />
    </div>
  );

  const productsPanel =
    productStats?.count != null || productStats?.averagePrice != null ? (
      <div>
        {productStats.isSampled && (
          <p className="mb-5 rounded-lg border border-amber-100 bg-amber-50/80 px-3 py-2 text-xs text-amber-900">
            Product count and prices are based on a partial sample of the public
            catalog (this store does not expose a total count API).
          </p>
        )}
        <StatGrid
          items={[
            {
              label: "Product Count",
              value:
                productStats.count != null
                  ? `${productStats.count.toLocaleString()}${productStats.isSampled ? "+" : ""}`
                  : "—",
            },
            {
              label: "Average Price",
              value: formatStatPrice(productStats.averagePrice),
            },
            {
              label: "Lowest Price",
              value: formatStatPrice(productStats.minPrice),
            },
            {
              label: "Highest Price",
              value: formatStatPrice(productStats.maxPrice),
            },
            {
              label: "Price Range",
              value: productStats.priceRange ?? "—",
            },
          ]}
        />
      </div>
    ) : (
      <p className="text-slate-500">
        Product catalog is not publicly exposed on this storefront.
      </p>
    );

  return (
    <>
      <StoreAnalysisJsonLd
        domain={store.domain}
        storeName={store.storeName}
        themeName={theme?.name ?? themeFromScan?.themeName ?? null}
        path={`/stores/${domainSlug}`}
      />

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-12">
        <AnalyzeAnotherStore resultTab={initialTab} />

        <div className="mb-8 mt-8">
          <p className="text-sm font-medium text-brand">Store Analysis</p>
          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            {store.storeName ?? store.domain}
          </h1>
          <a
            href={`https://${store.domain}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-block text-slate-500 hover:text-brand"
          >
            {store.domain} ↗
          </a>
        </div>

        <Suspense
          fallback={
            <div className="h-96 animate-pulse rounded-3xl bg-slate-100" />
          }
        >
          <StoreAnalysisTabs
            initialTab={initialTab}
            overview={overviewPanel}
            theme={themePanel}
            apps={appsPanel}
            products={productsPanel}
            appsCount={appsForDisplay.length}
          />
        </Suspense>

      </div>
    </>
  );
}
