"use client";

import { useState } from "react";
import { useStoreScan } from "@/hooks/use-store-scan";
import type { StoreAnalysisTabId } from "@/lib/constants/store-analysis-tab";

interface StoreUrlFormProps {
  defaultUrl?: string;
  buttonLabel?: string;
  placeholder?: string;
  /** Open this tab on the store result page after scan */
  resultTab?: StoreAnalysisTabId;
}

export function StoreUrlForm({
  defaultUrl = "",
  buttonLabel = "Analyze Store",
  placeholder = "https://your-store.myshopify.com",
  resultTab,
}: StoreUrlFormProps) {
  const [url, setUrl] = useState(defaultUrl);
  const { scan, loading, error } = useStoreScan({ resultTab });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    void scan(url);
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          inputMode="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder={placeholder}
          disabled={loading}
          className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:ring-2 focus:ring-brand-ring disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-brand px-6 py-3 font-semibold text-white transition hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Analyzing..." : buttonLabel}
        </button>
      </div>
      {error && (
        <p className="mt-3 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
