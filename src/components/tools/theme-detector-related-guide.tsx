import Link from "next/link";
import { BookOpen } from "lucide-react";

export function ThemeDetectorRelatedGuide() {
  return (
    <section
      className="border-y border-slate-200 bg-slate-50 py-12 sm:py-14"
      aria-labelledby="theme-detector-guide-link-heading"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-4 text-center sm:px-6 sm:flex-row sm:text-left">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-light text-brand">
          <BookOpen className="h-6 w-6" aria-hidden />
        </div>
        <div className="flex-1">
          <h2
            id="theme-detector-guide-link-heading"
            className="text-lg font-semibold text-slate-900"
          >
            Shopify Theme Detector Guide
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-slate-600">
            Learn how to detect Shopify theme accurately — signals, confidence
            scores, limits, and when to pair this Shopify Theme Detector with
            full store analysis.
          </p>
        </div>
        <Link
          href="/blog/shopify-theme-detector-guide"
          className="inline-flex shrink-0 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-brand-muted hover:text-brand"
        >
          Read the guide →
        </Link>
      </div>
    </section>
  );
}
