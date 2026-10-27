import { CookieBanner } from "@/components/layout/CookieBanner";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { getCompanyInfo } from "@/lib/sanity/queries";
import { buildLocalBusinessSchema, JsonLd } from "@/lib/seo/schema";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const company = await getCompanyInfo();

  return (
    <>
      <JsonLd data={buildLocalBusinessSchema(company)} />
      <SmoothScroll />
      <Header phone={company.phone || ""} />
      <main className="pt-[var(--header-height)]">{children}</main>
      <Footer
        phone={company.phone || ""}
        email={company.email || ""}
        address={company.address || ""}
        ico={company.ico || ""}
        dic={company.dic || ""}
      />
      <CookieBanner />
    </>
  );
}
