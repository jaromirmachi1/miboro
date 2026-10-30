import { FadeIn } from "@/components/ui/FadeIn";
import { PageShell } from "@/components/layout/PageShell";
import { fallbackCompanyInfo } from "@/config/site";
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
                <dd className="mt-1 text-lg text-sedy">{address}</dd>
              </div>

              <div>
                <dt className="text-sm font-semibold uppercase tracking-wide text-sedy">
                  Identifikace firmy
                </dt>
                <dd className="mt-1 text-lg text-sedy">
                  IČO: {ico} · DIČ: {dic}
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
                src="https://maps.google.com/maps?q=Ostrava&t=&z=12&ie=UTF8&iwloc=&output=embed"
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
