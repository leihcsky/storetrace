import type { MetadataRoute } from "next";
import { getPublishedBlogPosts } from "@/lib/constants/blog-posts";
import { POPULAR_APP_SLUGS } from "@/lib/constants/popular-apps";
import { popularThemes } from "@/lib/constants/popular-themes";
import { siteConfig } from "@/lib/utils/site";

const staticRoutes = [
  "",
  "/tools",
  "/tools/theme-detector",
  "/tools/app-detector",
  "/themes",
  "/apps",
  "/stores",
  "/blog",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url.replace(/\/$/, "");
  const now = new Date();

  const themeRoutes = popularThemes.map((theme) => `/themes/${theme.slug}`);
  const appRoutes = POPULAR_APP_SLUGS.map((slug) => `/apps/${slug}`);
  const blogRoutes = getPublishedBlogPosts().map((post) => `/blog/${post.slug}`);

  return [...staticRoutes, ...themeRoutes, ...appRoutes, ...blogRoutes].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "daily" : "weekly",
    priority:
      route === ""
        ? 1
        : route.includes("theme-detector") || route.includes("app-detector")
          ? 0.9
          : route.startsWith("/themes/") || route.startsWith("/apps/")
            ? 0.8
            : 0.7,
  }));
}
