import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getAllProjectSlugs } from "@/lib/sanity/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getAllProjectSlugs();
  const baseUrl = siteConfig.url;

  const staticRoutes = ["", "/sluzby", "/reference", "/o-firme", "/kontakt", "/gdpr"];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));

  const projectEntries: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${baseUrl}/reference/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...projectEntries];
}
