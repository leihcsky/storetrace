import Link from "next/link";
import type { ReactNode } from "react";

interface LegalPageProps {
  title: string;
  description: string;
  lastUpdated: string;
  /** Defaults to "Last updated". Use e.g. "Published" on About. */
  dateLabel?: string;
  children: ReactNode;
}

export function LegalPage({
  title,
  description,
  lastUpdated,
  dateLabel = "Last updated",
  children,
}: LegalPageProps) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 text-lg text-slate-600">{description}</p>
        <p className="mt-4 text-sm text-slate-500">
          {dateLabel}: {lastUpdated}
        </p>
      </header>

      <div className="mt-10 space-y-8 text-slate-600 [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-slate-900 [&_h2:first-child]:mt-0 [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-slate-900 [&_li]:leading-relaxed [&_p]:leading-relaxed [&_ul]:my-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
        {children}
      </div>

      <footer className="mt-14 border-t border-slate-200 pt-8 text-sm text-slate-500">
        <p>
          Related:{" "}
          <Link href="/privacy" className="text-brand hover:underline">
            Privacy Policy
          </Link>
          {" · "}
          <Link href="/terms" className="text-brand hover:underline">
            Terms of Service
          </Link>
          {" · "}
          <Link href="/contact" className="text-brand hover:underline">
            Contact
          </Link>
        </p>
      </footer>
    </article>
  );
}
