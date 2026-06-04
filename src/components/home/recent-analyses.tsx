import Link from "next/link";
import { getRecentStores } from "@/lib/db/repositories/store-repository";
import { domainToSlug } from "@/lib/utils/url";

const PLACEHOLDER_STORES = [
  { name: "Gymshark", domain: "gymshark.com" },
  { name: "Allbirds", domain: "allbirds.com" },
  { name: "Fashion Nova", domain: "fashionnova.com" },
];

export async function RecentAnalyses() {
  let recent: Awaited<ReturnType<typeof getRecentStores>> = [];

  if (process.env.DATABASE_URL) {
    try {
      recent = await getRecentStores(20);
    } catch {
      recent = [];
    }
  }

  const displayStores = recent.slice(0, 8);

  return (
    <section
      className="py-16 sm:py-20"
      aria-labelledby="recent-analyses-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2
          id="recent-analyses-heading"
          className="text-center text-2xl font-bold text-slate-900 sm:text-3xl"
        >
          Recent Store Analyses
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
          See the latest Shopify stores analyzed with our store analyzer.
        </p>

        {displayStores.length > 0 ? (
          <>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {displayStores.map((store) => (
                <Link
                  key={store.id}
                  href={`/stores/${domainToSlug(store.domain)}`}
                  className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-brand-muted hover:shadow-md"
                >
                  <p className="font-semibold text-slate-900">
                    {store.storeName ?? store.domain}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">{store.domain}</p>
                  {store.theme && (
                    <p className="mt-2 text-sm text-brand">
                      {store.theme.name}
                    </p>
                  )}
                </Link>
              ))}
            </div>
            {recent.length > 8 && (
              <p className="mt-6 text-center text-sm text-slate-500">
                Showing 8 of {recent.length} recent analyses
              </p>
            )}
          </>
        ) : (
          <div className="mt-10">
            <p className="text-center text-slate-500">
              No store analyses yet. Analyze a Shopify store above to get started.
            </p>
            <p className="mt-4 text-center text-sm text-slate-400">
              Popular examples:{" "}
              {PLACEHOLDER_STORES.map((s, i) => (
                <span key={s.domain}>
                  {i > 0 && " · "}
                  {s.name}
                </span>
              ))}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
