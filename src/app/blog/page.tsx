import Link from "next/link";
import { blogPosts, getPublishedBlogPosts } from "@/lib/constants/blog-posts";
import { createPageMetadata } from "@/lib/utils/metadata";

export const metadata = createPageMetadata({
  title: "Blog — Shopify Themes, Apps & Store Analysis",
  description:
    "Guides on finding Shopify themes, choosing apps, and analyzing competitor stores.",
  path: "/blog",
});

export default function BlogPage() {
  const published = getPublishedBlogPosts();
  const comingSoon = blogPosts.filter((p) => !p.published);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Blog</h1>
      <p className="mt-3 text-slate-600">
        Practical guides for Shopify merchants — themes, apps, and store research.
      </p>

      {published.length > 0 && (
        <section className="mt-10" aria-labelledby="published-posts-heading">
          <h2 id="published-posts-heading" className="sr-only">
            Published articles
          </h2>
          <ul className="space-y-4">
            {published.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="block rounded-xl border border-slate-200 bg-white px-5 py-5 shadow-sm transition hover:border-brand-muted hover:shadow-md"
                >
                  <h3 className="text-lg font-semibold text-slate-900 transition group-hover:text-brand">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">{post.description}</p>
                  <p className="mt-3 text-xs font-medium text-brand">
                    Read article →
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {comingSoon.length > 0 && (
        <section className="mt-12" aria-labelledby="coming-soon-heading">
          <h2
            id="coming-soon-heading"
            className="text-sm font-semibold uppercase tracking-wide text-slate-500"
          >
            Coming soon
          </h2>
          <ul className="mt-4 space-y-3">
            {comingSoon.map((post) => (
              <li
                key={post.slug}
                className="rounded-xl border border-dashed border-slate-200 bg-slate-50/80 px-5 py-4 text-slate-600"
              >
                {post.title}
                <span className="ml-2 text-xs text-slate-400">(coming soon)</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
