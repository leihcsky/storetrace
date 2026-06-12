import Link from "next/link";
import { getStoresUsingThemeSlug } from "@/lib/db/repositories/theme-repository";
import type { ThemeStoreExample } from "@/lib/constants/featured-themes";
import { domainToSlug } from "@/lib/utils/url";

interface ThemeStoresUsingProps {
  themeSlug: string;
  themeName: string;
  exampleStoresToScan: ThemeStoreExample[];
}

export async function ThemeStoresUsing({
  themeSlug,
  themeName,
  exampleStoresToScan,
}: ThemeStoresUsingProps) {
  let scanned: Awaited<ReturnType<typeof getStoresUsingThemeSlug>> = [];

  if (process.env.DATABASE_URL) {
    try {
      scanned = await getStoresUsingThemeSlug(themeSlug, 12);
    } catch {
      scanned = [];
    }
  }

  return (
    <section aria-labelledby="theme-stores-heading">
      <h2
        id="theme-stores-heading"
        className="text-2xl font-bold text-slate-900 sm:text-3xl"
      >
        Stores Using {themeName}
      </h2>

      {scanned.length > 0 ? (
        <>
          <p className="mt-3 max-w-2xl text-slate-600">
            Shopify stores analyzed with StoreTrace where we detected the{" "}
            {themeName} theme.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {scanned.map((store) => (
              <li key={store.id}>
                <Link
                  href={`/stores/${domainToSlug(store.domain)}?tab=theme`}
                  className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-brand-muted hover:shadow-md"
                >
                  <p className="font-semibold text-slate-900">
                    {store.storeName ?? store.domain}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">{store.domain}</p>
                  <span className="mt-3 text-sm font-medium text-brand">
                    View theme analysis →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="mt-3 max-w-2xl text-slate-600">
          Detected stores will appear here as our database grows. Run the theme
          detector on any Shopify URL — confirmed {themeName} matches will show
          up on this page over time.
        </p>
      )}

      <div className="mt-10">
        <h3 className="text-lg font-semibold text-slate-900">
          Check a popular Shopify store
        </h3>
        <p className="mt-2 text-sm text-slate-600">
          Run the theme detector on any URL to see if it uses {themeName}.
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {exampleStoresToScan.map((store) => (
            <li key={store.domain}>
              <Link
                href={`/tools/theme-detector?url=${encodeURIComponent(`https://${store.domain}`)}`}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-brand-muted hover:text-brand"
              >
                {store.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-6 text-sm text-slate-500">
        <Link
          href="/tools/theme-detector"
          className="font-medium text-brand hover:underline"
        >
          Open Shopify theme detector
        </Link>
      </p>
    </section>
  );
}
