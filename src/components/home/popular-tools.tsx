import Link from "next/link";
import { Palette, Puzzle } from "lucide-react";

const tools = [
  {
    href: "/tools/theme-detector",
    title: "Shopify Theme Detector",
    description:
      "Find which Shopify theme a store uses. Detect theme name, vendor, and theme store link.",
    icon: Palette,
  },
  {
    href: "/tools/app-detector",
    title: "Shopify App Detector",
    description:
      "Identify Shopify apps installed on any store — Klaviyo, Judge.me, Loox, and more.",
    icon: Puzzle,
  },
];

export function PopularTools() {
  return (
    <section
      className="bg-white py-16 sm:py-20"
      aria-labelledby="popular-tools-heading"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <h2
          id="popular-tools-heading"
          className="text-center text-2xl font-bold text-slate-900 sm:text-3xl"
        >
          Specialized Detection Tools
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
          Need a focused check? Use theme or app detectors — or run the full
          Shopify store analyzer at the top for everything in one scan.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.href}
                href={tool.href}
                className="group flex flex-col rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm transition hover:border-brand-muted hover:bg-white hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-light text-brand">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <h3 className="text-lg font-semibold text-slate-900 group-hover:text-brand">
                      {tool.title}
                    </h3>
                  </div>
                  {tool.comingSoon && (
                    <span className="shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
                      Soon
                    </span>
                  )}
                </div>
                <p className="mt-4 flex-1 text-sm text-slate-600">
                  {tool.description}
                </p>
                <span className="mt-4 text-sm font-medium text-brand">
                  Open tool →
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
