import Link from "next/link";
import { getRecentStores } from "@/lib/db/repositories/store-repository";
import { domainToSlug } from "@/lib/utils/url";
import { createPageMetadata } from "@/lib/utils/metadata";

export const metadata = createPageMetadata({
  title: "Shopify Store Database",
  description:
    "Browse analyzed Shopify stores. View themes, metadata, and technology stack for each store.",
  path: "/stores",
});

export default async function StoresPage() {
  let stores: Awaited<ReturnType<typeof getRecentStores>> = [];

  if (process.env.DATABASE_URL) {
    try {
      stores = await getRecentStores(50);
    } catch {
      stores = [];
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900">Store Database</h1>
      <p className="mt-3 text-slate-600">
        Browse Shopify stores analyzed by StoreTrace.
      </p>

      {stores.length === 0 ? (
        <p className="mt-10 text-slate-500">
          No stores in the database yet.{" "}
          <Link href="/tools/theme-detector" className="text-brand hover:underline">
            Analyze your first store
          </Link>
          .
        </p>
      ) : (
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stores.map((store) => (
            <Link
              key={store.id}
              href={`/stores/${domainToSlug(store.domain)}`}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-brand-muted"
            >
              <p className="font-semibold text-slate-900">
                {store.storeName ?? store.domain}
              </p>
              <p className="text-sm text-slate-500">{store.domain}</p>
              {store.theme && (
                <p className="mt-2 text-sm text-brand">
                  {store.theme.name}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
