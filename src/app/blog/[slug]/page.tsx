import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogPostBody } from "@/components/blog/blog-post-body";
import { WebPageJsonLd } from "@/components/seo/structured-data";
import {
  blogPosts,
  getBlogPostBySlug,
} from "@/lib/constants/blog-posts";
import { createPageMetadata } from "@/lib/utils/metadata";
import { absoluteUrl } from "@/lib/utils/site";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts
    .filter((p) => p.published)
    .map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post?.published) {
    return createPageMetadata({
      title: "Article Not Found",
      description: "This blog post is not available.",
      path: `/blog/${slug}`,
      noIndex: true,
    });
  }

  return createPageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${slug}`,
  });
}

function BlogPostingJsonLd({
  title,
  description,
  slug,
  publishedAt,
}: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    datePublished: publishedAt,
    url: absoluteUrl(`/blog/${slug}`),
    author: {
      "@type": "Organization",
      name: "StoreTrace",
    },
    publisher: {
      "@type": "Organization",
      name: "StoreTrace",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post?.published) {
    notFound();
  }

  const publishedLabel = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <WebPageJsonLd
        name={post.title}
        description={post.description}
        path={`/blog/${slug}`}
      />
      <BlogPostingJsonLd
        title={post.title}
        description={post.description}
        slug={slug}
        publishedAt={post.publishedAt}
      />

      <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
        <Link href="/blog" className="text-brand hover:underline">
          Blog
        </Link>
        <span className="mx-2 text-slate-300">/</span>
        <span className="line-clamp-1 text-slate-700">{post.title}</span>
      </nav>

      <header className="mt-8 border-b border-slate-200 pb-8">
        <p className="text-sm font-medium text-brand">Shopify guides</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-4 text-lg text-slate-600">{post.description}</p>
        <p className="mt-4 text-sm text-slate-500">
          {publishedLabel} · {post.readTimeMinutes} min read
        </p>
      </header>

      <BlogPostBody blocks={post.blocks} />

      <footer className="mt-14 border-t border-slate-200 pt-8">
        <p className="text-sm text-slate-600">
          Want to check a store right now?{" "}
          <Link href="/tools/theme-detector" className="font-medium text-brand hover:underline">
            Use our free theme detector
          </Link>{" "}
          or{" "}
          <Link href="/" className="font-medium text-brand hover:underline">
            analyze the full store
          </Link>
          .
        </p>
        <Link
          href="/blog"
          className="mt-6 inline-block text-sm font-medium text-brand hover:underline"
        >
          ← Back to blog
        </Link>
      </footer>
    </article>
  );
}
