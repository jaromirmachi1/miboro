export const siteConfig = {
  name: "MIBORO",
  description:
    "Stavební firma MIBORO — realizace veřejných i soukromých zakázek v Ostravě a Moravskoslezském kraji.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.miboro.cz",
  locale: "cs_CZ",
  areaServed: "Moravskoslezský kraj",
  defaultOgImage: "/miboromanor.png",
} as const;

// Real company details, taken from miboro.cz (Kontakt) and the ARES company register.
// Sanity's "companyInfo" document overrides these when it is filled in.
export const fallbackCompanyInfo = {
  phone: "+420 773 264 136",
  email: "miboro@miboro.cz",
  address: "28. října 3388/111, 702 00 Ostrava – Moravská Ostrava",
  ico: "25871986",
  dic: "CZ25871986",
  yearFounded: 2001,
  // Not published on miboro.cz — confirm with the client before launch.
  employeeCount: "50+",
  annualRevenue: "200 mil. Kč",
  selfPerformedPercent: "85 %",
} as const;

export const companyDetails = {
  legalName: "MIBORO s.r.o.",
  vatNote: "Jsme plátci DPH.",
  street: "28. října 3388/111",
  district: "Moravská Ostrava",
  postalCode: "702 00",
  city: "Ostrava",
  bankAccounts: ["55586555/0600", "55586555/5500"],
  people: [
    {
      name: "Tomáš Hnilka",
      role: "Majitel společnosti, prokurista",
      phone: "+420 773 663 277",
      email: "hnilka@miboro.cz",
    },
    {
      name: "Petra Pěnkavová",
      role: "Administrativa a informace",
      phone: "+420 773 264 136",
      email: "miboro@miboro.cz",
    },
  ],
} as const;

export const navLinks = [
  { href: "/", label: "Domů" },
  { href: "/sluzby", label: "Služby" },
  { href: "/reference", label: "Reference" },
  { href: "/o-firme", label: "O firmě" },
  { href: "/kontakt", label: "Kontakt" },
] as const;
