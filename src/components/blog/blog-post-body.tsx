import Link from "next/link";
import type { BlogBlock } from "@/lib/constants/blog-posts";
import { getPopularAppBySlug } from "@/lib/constants/popular-apps";
import { getPopularThemeBySlug } from "@/lib/constants/popular-themes";

export function BlogPostBody({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <div className="prose prose-slate mt-10 max-w-none prose-headings:scroll-mt-24 prose-a:text-brand prose-a:no-underline hover:prose-a:underline">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p key={index} className="leading-relaxed text-slate-600">
                {block.text}
              </p>
            );
          case "heading2":
            return (
              <h2
                key={index}
                className="mt-12 text-2xl font-bold text-slate-900 first:mt-0"
              >
                {block.text}
              </h2>
            );
          case "heading3":
            return (
              <h3 key={index} className="mt-8 text-xl font-semibold text-slate-900">
                {block.text}
              </h3>
            );
          case "list": {
            const ListTag = block.ordered ? "ol" : "ul";
            return (
              <ListTag
                key={index}
                className={`my-4 space-y-2 pl-6 text-slate-600 ${
                  block.ordered ? "list-decimal" : "list-disc"
                }`}
              >
                {block.items.map((item, i) => (
                  <li key={i} className="leading-relaxed">
                    {item}
                  </li>
                ))}
              </ListTag>
            );
          }
          case "themePick": {
            const theme = getPopularThemeBySlug(block.slug);
            if (!theme) return null;
            return (
              <div
                key={index}
                className="my-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      <Link
                        href={`/themes/${theme.slug}`}
                        className="hover:text-brand"
                      >
                        {theme.name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      by {theme.vendor} · {theme.priceLabel}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      theme.priceType === "free"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-brand-light text-brand"
                    }`}
                  >
                    {theme.priceLabel}
                  </span>
                </div>
                <p className="mt-4 text-sm font-medium text-slate-800">
                  Best for: {block.bestFor}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {block.summary}
                </p>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-600">
                  {block.highlights.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                <Link
                  href={`/themes/${theme.slug}`}
                  className="mt-4 inline-block text-sm font-semibold text-brand hover:underline"
                >
                  View {theme.name} details →
                </Link>
              </div>
            );
          }
          case "appPick": {
            const app = getPopularAppBySlug(block.slug);
            if (!app) return null;
            return (
              <div
                key={index}
                className="my-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      <Link
                        href={`/apps/${app.slug}`}
                        className="hover:text-brand"
                      >
                        {app.name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      by {app.developerName} · {app.category}
                    </p>
                  </div>
                  {app.rankingBadge && (
                    <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
                      {app.rankingBadge}
                    </span>
                  )}
                </div>
                {app.pricingLabel && (
                  <p className="mt-2 text-xs font-medium text-emerald-700">
                    {app.pricingLabel}
                  </p>
                )}
                <p className="mt-4 text-sm font-medium text-slate-800">
                  Best for: {block.bestFor}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {block.summary}
                </p>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-600">
                  {block.highlights.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                <Link
                  href={`/apps/${app.slug}`}
                  className="mt-4 inline-block text-sm font-semibold text-brand hover:underline"
                >
                  View {app.name} details →
                </Link>
              </div>
            );
          }
          case "cta":
            return (
              <div
                key={index}
                className="my-10 rounded-2xl border border-brand-muted bg-brand-light/40 p-6 sm:p-8"
              >
                <h3 className="text-lg font-semibold text-slate-900">
                  {block.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {block.text}
                </p>
                <Link
                  href={block.href}
                  className="mt-4 inline-flex rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-hover"
                >
                  {block.buttonLabel}
                </Link>
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
