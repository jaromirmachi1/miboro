import { FadeIn } from "@/components/ui/FadeIn";
import { PageShell } from "@/components/layout/PageShell";
import { StatBar } from "@/components/sections/StatBar";
import { fallbackCompanyInfo } from "@/config/site";
import { createPageMetadata } from "@/lib/seo/metadata";
import { getCompanyInfo, getStatBarData } from "@/lib/sanity/queries";

export const metadata = createPageMetadata({
  title: "O firmě MIBORO — historie, tým a certifikace",
  description:
    "Informace o stavební firmě MIBORO: historie, kapacity, certifikace, IČO a DIČ. Ověřitelná data pro investory a tendrové komise.",
  path: "/o-firme",
});

export default async function OFirmePage() {
  const [company, statData] = await Promise.all([
    getCompanyInfo(),
    getStatBarData(),
  ]);

  const yearFounded = company.yearFounded || fallbackCompanyInfo.yearFounded;

  return (
    <>
      <PageShell>
        <FadeIn>
          <h1 className="text-3xl font-bold text-grafit sm:text-4xl">O firmě</h1>
          <p className="mt-4 max-w-2xl text-lg text-sedy">
            MIBORO působí na trhu od roku {yearFounded}. Zaměřujeme se na
            veřejné zakázky a projekty realizované na doporučení — důraz
            klademe na ověřitelnost, termíny a vlastní stavební kapacity.
          </p>
        </FadeIn>

        <FadeIn>
          <section className="mt-14">
            <h2 className="text-2xl font-bold text-grafit">Historie</h2>
            <p className="mt-4 max-w-3xl leading-relaxed text-sedy">
              Firma vznikla v Moravskoslezském kraji a postupně rozšířila
              působnost o generální dodávky staveb, rekonstrukce veřejných
              budov a inženýrské sítě. Reference dokumentujeme v tendrovém
              formátu s uvedením investora, rozsahu a výsledku.
            </p>
          </section>
        </FadeIn>

        <FadeIn>
          <section className="mt-14">
            <h2 className="text-2xl font-bold text-grafit">Tým a kapacity</h2>
            <p className="mt-4 max-w-3xl leading-relaxed text-sedy">
              Disponujeme vlastními stavebními kapacitami a stabilním týmem
              projektových manažerů, stavbyvedoucích a řemeslníků. Aktuální
              počet zaměstnanců:{" "}
              {company.employeeCount || fallbackCompanyInfo.employeeCount}.
            </p>
          </section>
        </FadeIn>

        <FadeIn>
          <section className="mt-14">
            <h2 className="text-2xl font-bold text-grafit">
              Identifikační údaje
            </h2>
            <dl className="mt-6 max-w-xl space-y-3 text-sedy">
              <div className="flex justify-between border-b border-border py-2">
                <dt className="font-medium text-grafit">IČO</dt>
                <dd>{company.ico || fallbackCompanyInfo.ico}</dd>
              </div>
              <div className="flex justify-between border-b border-border py-2">
                <dt className="font-medium text-grafit">DIČ</dt>
                <dd>{company.dic || fallbackCompanyInfo.dic}</dd>
              </div>
              <div className="flex justify-between border-b border-border py-2">
                <dt className="font-medium text-grafit">Sídlo</dt>
                <dd>{company.address || fallbackCompanyInfo.address}</dd>
              </div>
            </dl>
          </section>
        </FadeIn>

        <FadeIn>
          <section className="mt-14">
            <h2 className="text-2xl font-bold text-grafit">Certifikáty</h2>
            <p className="mt-4 max-w-3xl leading-relaxed text-sedy">
              Certifikáty a doklady kvalifikace spravujeme v CMS a zveřejňujeme
              na vyžádání v rámci výběrových řízení. Pro ověření firmy v
              registru využijte{" "}
              <a
                href={`https://or.justice.cz/ias/ui/rejstrik-$firma?ico=${company.ico || fallbackCompanyInfo.ico}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-grafit underline decoration-oranzova decoration-2 underline-offset-4 hover:decoration-grafit"
              >
                obchodní rejstřík
              </a>
              .
            </p>
          </section>
        </FadeIn>
      </PageShell>

      <StatBar data={statData} />
    </>
  );
}
