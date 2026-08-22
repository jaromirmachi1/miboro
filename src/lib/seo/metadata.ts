import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

interface PageMetaOptions {
  title: string;
  description?: string;
  path?: string;
  ogImage?: string;
}

export function createPageMetadata({
  title,
  description = siteConfig.description,
  path = "",
  ogImage,
}: PageMetaOptions): Metadata {
  const url = `${siteConfig.url}${path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
      images: [{ url: ogImage ?? siteConfig.defaultOgImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage ?? siteConfig.defaultOgImage],
    },
  };
}
