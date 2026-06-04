export type StoreAnalysisTabId = "overview" | "theme" | "apps" | "products";

const VALID_TABS: StoreAnalysisTabId[] = [
  "overview",
  "theme",
  "apps",
  "products",
];

export function parseStoreAnalysisTab(
  value: string | null | undefined
): StoreAnalysisTabId {
  if (value && VALID_TABS.includes(value as StoreAnalysisTabId)) {
    return value as StoreAnalysisTabId;
  }
  return "overview";
}

export function storeAnalysisTabQuery(tab: StoreAnalysisTabId): string {
  return tab === "overview" ? "" : `?tab=${tab}`;
}
