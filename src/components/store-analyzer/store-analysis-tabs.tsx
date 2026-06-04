"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  LayoutGrid,
  Package,
  Palette,
  Puzzle,
  type LucideIcon,
} from "lucide-react";
import {
  parseStoreAnalysisTab,
  type StoreAnalysisTabId,
} from "@/lib/constants/store-analysis-tab";

interface TabConfig {
  id: StoreAnalysisTabId;
  label: string;
  icon: LucideIcon;
  badge?: number | string;
}

interface StoreAnalysisTabsProps {
  initialTab?: StoreAnalysisTabId;
  overview: React.ReactNode;
  theme: React.ReactNode;
  apps: React.ReactNode;
  products: React.ReactNode;
  appsCount?: number;
}

const TAB_CONFIG: TabConfig[] = [
  { id: "overview", label: "Overview", icon: LayoutGrid },
  { id: "theme", label: "Theme", icon: Palette },
  { id: "apps", label: "Apps", icon: Puzzle },
  { id: "products", label: "Products", icon: Package },
];

export function StoreAnalysisTabs({
  initialTab = "overview",
  overview,
  theme,
  apps,
  products,
  appsCount,
}: StoreAnalysisTabsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tabFromUrl = parseStoreAnalysisTab(searchParams.get("tab"));

  const [activeTab, setActiveTab] = useState<StoreAnalysisTabId>(
    () => initialTab ?? tabFromUrl
  );

  useEffect(() => {
    setActiveTab(tabFromUrl);
  }, [tabFromUrl]);

  const selectTab = useCallback(
    (id: StoreAnalysisTabId) => {
      setActiveTab(id);
      const params = new URLSearchParams(searchParams.toString());
      if (id === "overview") {
        params.delete("tab");
      } else {
        params.set("tab", id);
      }
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    },
    [pathname, router, searchParams]
  );

  const panels: Record<StoreAnalysisTabId, React.ReactNode> = {
    overview,
    theme,
    apps,
    products,
  };

  const tabsWithBadges = TAB_CONFIG.map((tab) =>
    tab.id === "apps" && appsCount != null && appsCount > 0
      ? { ...tab, badge: appsCount }
      : tab
  );

  const activeIndex = tabsWithBadges.findIndex((t) => t.id === activeTab);
  const tabCount = tabsWithBadges.length;

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_8px_40px_-12px_rgba(70,8,173,0.12)]">
      <div
        className="border-b border-slate-100 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-light/80 via-white to-white px-3 py-4 sm:px-5"
        role="tablist"
        aria-label="Store analysis sections"
      >
        <div className="relative rounded-2xl bg-slate-100/90 p-1 shadow-[inset_0_1px_2px_rgba(15,23,42,0.06)] ring-1 ring-slate-200/50">
          <div
            className="pointer-events-none absolute top-1 bottom-1 rounded-[14px] bg-gradient-to-br from-brand via-[#5b18c4] to-[#7e3af2] shadow-[0_6px_20px_-2px_rgba(70,8,173,0.55),inset_0_1px_0_rgba(255,255,255,0.2)] transition-[left,width] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
            style={{
              width: `calc((100% - 8px) / ${tabCount})`,
              left: `calc(4px + ${activeIndex} * ((100% - 8px) / ${tabCount}))`,
            }}
            aria-hidden
          />

          <div className="relative grid grid-cols-4 gap-0">
            {tabsWithBadges.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${tab.id}`}
                  id={`tab-${tab.id}`}
                  onClick={() => selectTab(tab.id)}
                  className={`relative z-10 flex min-w-0 flex-col items-center justify-center gap-1 rounded-[14px] px-2 py-3 transition-colors duration-200 sm:flex-row sm:gap-2 sm:px-3 ${
                    isActive
                      ? "text-white"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 shrink-0 transition-transform duration-200 sm:h-[18px] sm:w-[18px] ${
                      isActive ? "scale-110 drop-shadow-sm" : "opacity-70"
                    }`}
                    aria-hidden
                  />
                  <span
                    className={`text-xs font-semibold tracking-tight sm:text-sm ${
                      isActive ? "text-white" : ""
                    }`}
                  >
                    {tab.label}
                  </span>
                  {tab.badge != null && (
                    <span
                      className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold leading-none sm:ml-0.5 ${
                        isActive
                          ? "bg-white/25 text-white"
                          : "bg-slate-200/90 text-slate-600"
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div
        role="tabpanel"
        id={`panel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
        className="bg-gradient-to-b from-white to-slate-50/40 p-6 sm:p-8"
      >
        <div key={activeTab} className="animate-[fadeIn_0.25s_ease-out]">
          {panels[activeTab]}
        </div>
      </div>
    </div>
  );
}
