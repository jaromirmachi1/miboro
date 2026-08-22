import { fallbackCompanyInfo, siteConfig } from "@/config/site";
import type { CompanyInfo } from "@/lib/sanity/types";

export function buildLocalBusinessSchema(company: CompanyInfo) {
  const phone = company.phone || fallbackCompanyInfo.phone;
  const email = company.email || fallbackCompanyInfo.email;
  const address = company.address || fallbackCompanyInfo.address;

  return {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: phone,
    email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ostrava",
      addressRegion: "Moravskoslezský kraj",
      addressCountry: "CZ",
      streetAddress: address,
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: siteConfig.areaServed,
    },
    foundingDate: company.yearFounded
      ? String(company.yearFounded)
      : String(fallbackCompanyInfo.yearFounded),
  };
}

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
