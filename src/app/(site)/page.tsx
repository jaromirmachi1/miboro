import { HomeAbout } from "@/components/sections/HomeAbout";
import { HomeContact } from "@/components/sections/HomeContact";
import { HomeHero } from "@/components/sections/HomeHero";
import { HomePartners } from "@/components/sections/HomePartners";
import { HomeProjects } from "@/components/sections/HomeProjects";
import { HomeServices } from "@/components/sections/HomeServices";
import { HomeStats } from "@/components/sections/HomeStats";
import { createPageMetadata } from "@/lib/seo/metadata";
import {
  getCompanyInfo,
  getProjects,
  getServices,
  getStatBarData,
} from "@/lib/sanity/queries";

export const metadata = createPageMetadata({
  title: "MIBORO — stavební firma Ostrava | Veřejné a soukromé zakázky",
  description:
    "Portfolio stavební firmy MIBORO. Reference realizací veřejných i soukromých zakázek v Ostravě a Moravskoslezském kraji.",
  path: "/",
});

export default async function HomePage() {
  const [statData, services, company, allProjects] =
    await Promise.all([
      getStatBarData(),
      getServices(),
      getCompanyInfo(),
      getProjects(),
    ]);

  // Projects left out of the homepage showcase (they stay on /reference).
  const hiddenOnHomepage = (title: string, slug: string) =>
    slug === "zatepleni-administrativni-budovy" || /^zateplení administrativní budovy/i.test(title);
  const completedProjects = allProjects
    .filter((project) => project.status === "completed")
    .filter((project) => !hiddenOnHomepage(project.title, project.slug.current))
    .slice(0, 5);

  const yearFounded = company.yearFounded ?? statData.yearFounded;

  return (
    <div className="bg-podklad">
      <HomeHero yearFounded={yearFounded} />
      <HomeStats data={statData} />
      <HomeServices services={services} />
      <HomeProjects projects={completedProjects} />
      <HomeAbout
        yearFounded={yearFounded}
        address={company.address || ""}
        ico={company.ico || ""}
        dic={company.dic || ""}
      />
      <HomePartners />
      <HomeContact
        phone={company.phone || ""}
        email={company.email || ""}
        address={company.address || ""}
      />
    </div>
  );
}
