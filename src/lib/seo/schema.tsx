import { companyDetails, fallbackCompanyInfo, siteConfig } from "@/config/site";
import type { CompanyInfo } from "@/lib/sanity/types";

export function buildLocalBusinessSchema(company: CompanyInfo) {
  const phone = company.phone || fallbackCompanyInfo.phone;
  const email = company.email || fallbackCompanyInfo.email;

  return {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: phone,
    email,
    legalName: companyDetails.legalName,
    taxID: fallbackCompanyInfo.dic,
    address: {
      "@type": "PostalAddress",
      streetAddress: companyDetails.street,
      postalCode: companyDetails.postalCode,
      addressLocality: companyDetails.city,
      addressRegion: "Moravskoslezský kraj",
      addressCountry: "CZ",
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
