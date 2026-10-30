export const siteConfig = {
  name: "MIBORO",
  description:
    "Stavební firma MIBORO — realizace veřejných i soukromých zakázek v Ostravě a Moravskoslezském kraji.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.miboro.cz",
  locale: "cs_CZ",
  areaServed: "Moravskoslezský kraj",
  defaultOgImage: "/miboromanor.png",
} as const;

export const fallbackCompanyInfo = {
  phone: "+420 123 456 789",
  email: "info@miboro.cz",
  address: "Ostrava, Moravskoslezský kraj",
  ico: "12345678",
  dic: "CZ12345678",
  yearFounded: 1998,
  employeeCount: "50+",
  annualRevenue: "200 mil. Kč",
  selfPerformedPercent: "85 %",
} as const;

export const navLinks = [
  { href: "/", label: "Domů" },
  { href: "/sluzby", label: "Služby" },
  { href: "/reference", label: "Reference" },
  { href: "/o-firme", label: "O firmě" },
  { href: "/kontakt", label: "Kontakt" },
] as const;
