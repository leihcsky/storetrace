import Link from "next/link";
import { getStoresUsingAppSlug } from "@/lib/db/repositories/app-repository";
import { domainToSlug } from "@/lib/utils/url";

interface AppStoresUsingProps {
  appSlug: string;
  appName: string;
}

export async function AppStoresUsing({ appSlug, appName }: AppStoresUsingProps) {
  let scanned: Awaited<ReturnType<typeof getStoresUsingAppSlug>> = [];

  if (process.env.DATABASE_URL) {
    try {
      scanned = await getStoresUsingAppSlug(appSlug, 12);
    } catch {
      scanned = [];
    }
  }

  return (
    <section aria-labelledby="app-stores-heading">
      <h2
        id="app-stores-heading"
        className="text-2xl font-bold text-slate-900 sm:text-3xl"
      >
        Stores Using {appName}
      </h2>

      {scanned.length > 0 ? (
        <>
          <p className="mt-3 max-w-2xl text-slate-600">
            Shopify stores analyzed with StoreTrace where we detected {appName}.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {scanned.map((store) => (
              <li key={store.id}>
                <Link
                  href={`/stores/${domainToSlug(store.domain)}?tab=apps`}
                  className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-brand-muted hover:shadow-md"
                >
                  <p className="font-semibold text-slate-900">
                    {store.storeName ?? store.domain}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">{store.domain}</p>
                  <span className="mt-3 text-sm font-medium text-brand">
                    View app analysis →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="mt-3 max-w-2xl text-slate-600">
          Detected stores will appear here as our database grows. Analyze any
          Shopify store with our app detector — confirmed matches will show up
          on this page over time.
        </p>
      )}

      <p className="mt-8 text-sm text-slate-500">
        <Link
          href="/tools/app-detector"
          className="font-medium text-brand hover:underline"
        >
          Open Shopify app detector
        </Link>
      </p>
    </section>
  );
}
