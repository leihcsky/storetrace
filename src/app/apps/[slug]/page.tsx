import { notFound } from "next/navigation";
import { AppDetailContent } from "@/components/apps/app-detail-content";
import { WebPageJsonLd } from "@/components/seo/structured-data";
import {
  getPopularAppBySlug,
  POPULAR_APP_SLUGS,
  popularApps,
} from "@/lib/constants/popular-apps";
import { createPageMetadata, truncateMetaDescription } from "@/lib/utils/metadata";

interface AppPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return POPULAR_APP_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: AppPageProps) {
  const { slug } = await params;
  const app = getPopularAppBySlug(slug);

  if (!app) {
    return createPageMetadata({
      title: "App Not Found",
      description: "This app page is not available.",
      path: `/apps/${slug}`,
      noIndex: true,
    });
  }

  const description = truncateMetaDescription(
    `${app.listTitle} for Shopify — ${app.description} Features, alternatives, FAQ, and stores using ${app.name}.`
  );

  return createPageMetadata({
    title: `${app.name} Shopify App — ${app.category}`,
    description,
    path: `/apps/${slug}`,
  });
}

export default async function AppDetailPage({ params }: AppPageProps) {
  const { slug } = await params;
  const app = getPopularAppBySlug(slug);

  if (!app) {
    notFound();
  }

  const relatedApps = popularApps.filter((a) => a.slug !== slug).slice(0, 6);
  const metaDescription = `${app.listTitle} — ${app.description}`;

  return (
    <>
      <WebPageJsonLd
        name={`${app.name} Shopify App — Overview & Alternatives`}
        description={metaDescription}
        path={`/apps/${slug}`}
      />
      <AppDetailContent app={app} relatedApps={relatedApps} />
    </>
  );
}
