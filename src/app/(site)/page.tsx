import { HomeAbout } from "@/components/sections/HomeAbout";
import { HomeHero } from "@/components/sections/HomeHero";
import { HomePartners } from "@/components/sections/HomePartners";
import { HomeProjects } from "@/components/sections/HomeProjects";
import { HomeServices } from "@/components/sections/HomeServices";
import { HomeStats } from "@/components/sections/HomeStats";
import { createPageMetadata } from "@/lib/seo/metadata";
import {
  getCompanyInfo,
  getCompletedProjects,
  getOngoingProject,
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
  const [statData, services, company, ongoingProject, completedProjects] =
    await Promise.all([
      getStatBarData(),
      getServices(),
      getCompanyInfo(),
      getOngoingProject(),
      getCompletedProjects(),
    ]);

  const yearFounded =
    company.yearFounded ?? statData.yearFounded;

  return (
    <>
      <HomeHero yearFounded={yearFounded} ongoingProject={ongoingProject} />
      <HomeStats data={statData} />
      <HomeServices services={services} />
      <HomeProjects projects={completedProjects} />
      <HomeAbout
        yearFounded={yearFounded}
        phone={company.phone || ""}
        email={company.email || ""}
      />
      <HomePartners />
    </>
  );
}
