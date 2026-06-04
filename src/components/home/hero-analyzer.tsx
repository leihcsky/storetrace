"use client";

import { useState } from "react";
import { Globe, Loader2, Search } from "lucide-react";
import { useStoreScan } from "@/hooks/use-store-scan";
import { exampleStores } from "@/lib/constants/example-stores";

export function HeroAnalyzer() {
  const [url, setUrl] = useState("");
  const { scan, loading, error } = useStoreScan();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    void scan(url);
  }

  function tryExample(storeUrl: string) {
    setUrl(storeUrl);
    void scan(storeUrl);
  }

  return (
    <div className="mx-auto mt-10 w-full max-w-5xl">
      <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-lg shadow-slate-200/50 sm:p-7 lg:p-8">
        <form onSubmit={handleSubmit}>
          <label htmlFor="store-url" className="sr-only">
            Shopify store URL
          </label>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
            <div className="relative flex-1">
              <Globe
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                aria-hidden
              />
              <input
                id="store-url"
                type="text"
                inputMode="url"
                autoComplete="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="e.g. gymshark.com or https://your-store.com"
                disabled={loading}
                className="w-full rounded-xl border border-slate-300 bg-slate-50/50 py-3.5 pl-12 pr-4 text-base text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand-ring disabled:opacity-60"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-brand px-8 py-3.5 text-base font-semibold text-white transition hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-60 sm:min-w-[160px]"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
                  Analyzing...
                </>
              ) : (
                <>
                  <Search className="h-5 w-5" aria-hidden />
                  Analyze Store
                </>
              )}
            </button>
          </div>
        </form>

        {error && (
          <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
            {error}
          </p>
        )}

        <div className="mt-5 border-t border-slate-100 pt-5">
          <p className="text-center text-sm font-medium text-slate-500">
            Try these stores
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-2 sm:gap-2.5">
            {exampleStores.map((store) => (
              <button
                key={store.url}
                type="button"
                disabled={loading}
                onClick={() => tryExample(store.url)}
                className="rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-sm font-medium text-slate-700 transition hover:border-brand-muted hover:bg-brand-light hover:text-brand disabled:cursor-not-allowed disabled:opacity-50"
              >
                {store.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-slate-500">
        Free Shopify store analyzer — detect themes, apps, and store metadata
        from any public URL.
      </p>
    </div>
  );
}
