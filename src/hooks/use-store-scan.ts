"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  storeAnalysisTabQuery,
  type StoreAnalysisTabId,
} from "@/lib/constants/store-analysis-tab";

export function useStoreScan(options?: { resultTab?: StoreAnalysisTabId }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scan = useCallback(
    async (url: string) => {
      const trimmed = url.trim();
      if (!trimmed) {
        setError("Please enter a Shopify store URL.");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/scan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: trimmed }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            typeof data.error === "string"
              ? data.error
              : "Failed to analyze store. Please check the URL."
          );
        }

        setLoading(false);
        const tabQuery = options?.resultTab
          ? storeAnalysisTabQuery(options.resultTab)
          : "";
        router.push(`${data.redirectTo}${tabQuery}`);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
        setLoading(false);
      }
    },
    [router, options?.resultTab]
  );

  return { scan, loading, error, clearError: () => setError(null) };
}
