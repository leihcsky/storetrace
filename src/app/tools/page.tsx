import Link from "next/link";
import { createPageMetadata } from "@/lib/utils/metadata";

export const metadata = createPageMetadata({
  title: "Shopify Analysis Tools",
  description:
    "Free Shopify store analysis tools — theme detector and app detector. Full store analysis on the homepage.",
  path: "/tools",
});

const tools = [
  {
    href: "/tools/theme-detector",
    title: "Shopify Theme Detector",
    description:
      "Free Shopify theme detector — find theme name, vendor, Theme Store link, and confidence on the shared store report.",
    status: "live",
  },
  {
    href: "/tools/app-detector",
    title: "Shopify App Detector",
    description:
      "Free Shopify app detector — find apps on any store with App Store links and ratings.",
    status: "live",
  },
];

export default function ToolsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900">Analysis Tools</h1>
      <p className="mt-3 text-slate-600">
        Free tools to analyze any Shopify store&apos;s technology stack.
      </p>
      <div className="mt-10 grid gap-6">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-brand-muted hover:shadow-md"
          >
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-semibold text-slate-900">
                {tool.title}
              </h2>
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  tool.status === "live"
                    ? "bg-green-100 text-green-700"
                    : "bg-amber-100 text-amber-700"
                }`}
              >
                {tool.status === "live" ? "Live" : "Coming Soon"}
              </span>
            </div>
            <p className="mt-2 text-slate-600">{tool.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
