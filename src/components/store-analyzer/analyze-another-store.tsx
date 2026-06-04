"use client";

import { useState } from "react";
import { Globe, Loader2, Search } from "lucide-react";
import { useStoreScan } from "@/hooks/use-store-scan";
import type { StoreAnalysisTabId } from "@/lib/constants/store-analysis-tab";

interface AnalyzeAnotherStoreProps {
  /** Keep the same result tab after scanning another store */
  resultTab?: StoreAnalysisTabId;
}

export function AnalyzeAnotherStore({ resultTab }: AnalyzeAnotherStoreProps) {
  const [url, setUrl] = useState("");
  const { scan, loading, error } = useStoreScan({ resultTab });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    void scan(url);
  }

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-md shadow-slate-200/40 sm:p-5">
      <p className="text-sm font-semibold text-slate-900">Analyze Another Store</p>
      <form onSubmit={handleSubmit} className="mt-3">
        <label htmlFor="analyze-another-url" className="sr-only">
          Shopify store URL
        </label>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
          <div className="relative flex-1">
            <Globe
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
              aria-hidden
            />
            <input
              id="analyze-another-url"
              type="text"
              inputMode="url"
              autoComplete="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="e.g. gymshark.com or https://your-store.com"
              disabled={loading}
              className="w-full rounded-xl border border-slate-300 bg-slate-50/50 py-3 pl-12 pr-4 text-base text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand-ring disabled:opacity-60"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-60 sm:min-w-[160px]"
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
        <p
          className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}
