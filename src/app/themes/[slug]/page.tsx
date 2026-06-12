import { notFound } from "next/navigation";
import { ThemeDetailContent } from "@/components/themes/theme-detail-content";
import {
  ThemeDetailJsonLd,
  WebPageJsonLd,
} from "@/components/seo/structured-data";
import { featuredThemes } from "@/lib/constants/featured-themes";
import {
  getPopularThemeBySlug,
  popularThemes,
} from "@/lib/constants/popular-themes";
import { createPageMetadata, truncateMetaDescription } from "@/lib/utils/metadata";

interface ThemePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return popularThemes.map((theme) => ({ slug: theme.slug }));
}

export async function generateMetadata({ params }: ThemePageProps) {
  const { slug } = await params;
  const theme = getPopularThemeBySlug(slug);

  if (!theme) {
    return createPageMetadata({
      title: "Theme Not Found",
      description: "This theme page is not available.",
      path: `/themes/${slug}`,
      noIndex: true,
    });
  }

  const title = `${theme.name} Shopify Theme`;
  const description = truncateMetaDescription(
    theme.metaDescription || theme.description
  );

  return createPageMetadata({
    title,
    description,
    path: `/themes/${slug}`,
  });
}

export default async function ThemeDetailPage({ params }: ThemePageProps) {
  const { slug } = await params;
  const theme = getPopularThemeBySlug(slug);

  if (!theme) {
    notFound();
  }

  const relatedThemes = featuredThemes
    .filter((t) => t.slug !== slug)
    .slice(0, 5);

  const pageTitle = `${theme.name} Shopify Theme`;
  const metaDescription =
    theme.metaDescription.length > 80
      ? theme.metaDescription
      : `${theme.name} Shopify theme by ${theme.vendor} — overview, features, pros & cons, FAQ, and stores using ${theme.name}.`;

  return (
    <>
      <WebPageJsonLd
        name={`${pageTitle} — Review, Features & Price`}
        description={metaDescription}
        path={`/themes/${slug}`}
      />
      <ThemeDetailJsonLd
        name={theme.name}
        slug={theme.slug}
        vendor={theme.vendor}
        description={metaDescription}
        priceType={theme.priceType}
        themeStoreUrl={theme.themeStoreUrl}
        imageUrl={theme.imageUrl}
      />
      <ThemeDetailContent theme={theme} relatedThemes={relatedThemes} />
    </>
  );
}
