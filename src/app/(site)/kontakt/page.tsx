import { FadeIn } from "@/components/ui/FadeIn";
import { PageShell } from "@/components/layout/PageShell";
import { companyDetails, fallbackCompanyInfo } from "@/config/site";
import { createPageMetadata } from "@/lib/seo/metadata";
import { getCompanyInfo } from "@/lib/sanity/queries";
import { formatPhoneHref } from "@/lib/utils/format";

export const metadata = createPageMetadata({
  title: "Kontakt — MIBORO stavební firma Ostrava",
  description:
    "Kontaktní údaje stavební firmy MIBORO: telefon, e-mail, adresa sídla, IČO a DIČ. Bez poptávkového formuláře.",
  path: "/kontakt",
});

export default async function KontaktPage() {
  const company = await getCompanyInfo();
  const phone = company.phone || fallbackCompanyInfo.phone;
  const email = company.email || fallbackCompanyInfo.email;
  const address = company.address || fallbackCompanyInfo.address;
  const ico = company.ico || fallbackCompanyInfo.ico;
  const dic = company.dic || fallbackCompanyInfo.dic;

  return (
    <PageShell>
      <FadeIn>
        <h1 className="text-3xl font-bold text-grafit sm:text-4xl">Kontakt</h1>
        <p className="mt-4 max-w-2xl text-lg text-sedy">
          Pro ověření firmy nebo dotazy k probíhajícím výběrovým řízením nás
          kontaktujte přímo. Nepoužíváme poptávkové formuláře.
        </p>
      </FadeIn>

      <FadeIn>
        <section aria-labelledby="people-heading" className="mt-12">
          <h2 id="people-heading" className="sr-only">
            Kontaktní osoby
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2">
            {companyDetails.people.map((person) => (
              <li key={person.email + person.name} className="bg-svetly p-6 sm:p-8">
                <p className="text-sm text-sedy">{person.role}</p>
                <p className="condensed mt-1 text-lead text-grafit">{person.name}</p>
                <p className="mt-4 flex flex-col gap-1">
                  <a
                    href={formatPhoneHref(person.phone)}
                    className="text-lg font-semibold text-grafit underline decoration-oranzova decoration-2 underline-offset-4 hover:decoration-grafit"
                  >
                    {person.phone}
                  </a>
                  <a
                    href={`mailto:${person.email}`}
                    className="text-base text-grafit underline decoration-transparent decoration-2 underline-offset-4 hover:decoration-oranzova"
                  >
                    {person.email}
                  </a>
                </p>
              </li>
            ))}
          </ul>
        </section>
      </FadeIn>

      <div className="mt-12 grid gap-12 lg:grid-cols-2">
        <FadeIn>
          <section aria-label="Kontaktní údaje">
            <dl className="space-y-6">
              <div>
                <dt className="text-sm font-semibold uppercase tracking-wide text-sedy">
                  Telefon
                </dt>
                <dd className="mt-1">
                  <a
                    href={formatPhoneHref(phone)}
                    className="text-xl font-bold text-grafit underline decoration-oranzova decoration-2 underline-offset-4 hover:decoration-grafit"
                  >
                    {phone}
                  </a>
                </dd>
              </div>

              <div>
                <dt className="text-sm font-semibold uppercase tracking-wide text-sedy">
                  E-mail
                </dt>
                <dd className="mt-1">
                  <a
                    href={`mailto:${email}`}
                    className="text-xl font-bold text-grafit underline decoration-transparent decoration-2 underline-offset-4 hover:decoration-oranzova"
                  >
                    {email}
                  </a>
                </dd>
              </div>

              <div>
                <dt className="text-sm font-semibold uppercase tracking-wide text-sedy">
                  Adresa sídla
                </dt>
                <dd className="mt-1 text-lg text-grafit">
                  {companyDetails.legalName}
                  <br />
                  {address}
                </dd>
              </div>

              <div>
                <dt className="text-sm font-semibold uppercase tracking-wide text-sedy">
                  Identifikace firmy
                </dt>
                <dd className="mt-1 text-lg text-grafit">
                  IČO: {ico} · DIČ: {dic}
                  <span className="block text-base text-sedy">{companyDetails.vatNote}</span>
                </dd>
              </div>

              <div>
                <dt className="text-sm font-semibold uppercase tracking-wide text-sedy">
                  Bankovní účty
                </dt>
                <dd className="tabular mt-1 text-lg text-grafit">
                  {companyDetails.bankAccounts.map((account) => (
                    <span key={account} className="block">
                      {account}
                    </span>
                  ))}
                </dd>
              </div>

              <div>
                <dt className="text-sm font-semibold uppercase tracking-wide text-sedy">
                  Obchodní rejstřík
                </dt>
                <dd className="mt-1">
                  <a
                    href={`https://or.justice.cz/ias/ui/rejstrik-$firma?ico=${ico}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-medium text-grafit underline decoration-oranzova decoration-2 underline-offset-4 hover:decoration-grafit"
                  >
                    Ověřit profil firmy na justice.cz →
                  </a>
                </dd>
              </div>
            </dl>
          </section>
        </FadeIn>

        <FadeIn delay={0.1}>
          <section aria-label="Mapa sídla">
            <h2 className="sr-only">Mapa</h2>
            <div className="aspect-[4/3] overflow-hidden border border-border bg-svetly">
              <iframe
                title="Mapa sídla MIBORO"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(`${companyDetails.street}, ${companyDetails.postalCode} ${companyDetails.city}`)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <p className="mt-3 text-xs text-sedy">
              Statická mapa bez sledování uživatele. Pro navigaci použijte
              externí mapovou aplikaci.
            </p>
          </section>
        </FadeIn>
      </div>
    </PageShell>
  );
}
