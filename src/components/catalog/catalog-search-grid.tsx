"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

interface CatalogSearchGridProps<T> {
  items: T[];
  searchPlaceholder: string;
  emptyMessage: string;
  getSearchText: (item: T) => string;
  getItemKey: (item: T) => string;
  renderItem: (item: T) => React.ReactNode;
  resultLabel?: string;
}

export function CatalogSearchGrid<T>({
  items,
  searchPlaceholder,
  emptyMessage,
  getSearchText,
  getItemKey,
  renderItem,
  resultLabel = "items",
}: CatalogSearchGridProps<T>) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) => getSearchText(item).toLowerCase().includes(q));
  }, [items, query, getSearchText]);

  return (
    <div>
      <div className="relative max-w-xl">
        <Search
          className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
          aria-hidden
        />
        <label htmlFor="catalog-search" className="sr-only">
          Search catalog
        </label>
        <input
          id="catalog-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={searchPlaceholder}
          className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-4 text-base text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand-ring"
        />
      </div>

      <p className="mt-4 text-sm text-slate-500">
        {filtered.length} {resultLabel}
        {query.trim() ? ` matching "${query.trim()}"` : ""}
        {items.length !== filtered.length ? ` · ${items.length} total` : ""}
      </p>

      {filtered.length > 0 ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <div key={getItemKey(item)}>{renderItem(item)}</div>
          ))}
        </div>
      ) : (
        <p className="mt-10 rounded-xl border border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center text-slate-600">
          {emptyMessage}
        </p>
      )}
    </div>
  );
}
