import { FadeIn } from "@/components/ui/FadeIn";
import { PageShell } from "@/components/layout/PageShell";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Zásady zpracování osobních údajů",
  description:
    "Informace o zpracování osobních údajů na webu stavební firmy MIBORO.",
  path: "/gdpr",
});

export default function GdprPage() {
  return (
    <PageShell>
      <div className="max-w-3xl">
      <FadeIn>
        <h1 className="text-3xl font-bold text-grafit">
          Zásady zpracování osobních údajů
        </h1>
        <div className="mt-8 space-y-6 text-base leading-relaxed text-sedy">
          <p>
            Tento web neobsahuje poptávkové formuláře ani registrační prvky.
            Osobní údaje nejsou aktivně shromažďovány kromě technicky nezbytných
            cookies a standardních serverových logů poskytovatele hostingu.
          </p>
          <p>
            Pokud nás kontaktujete e-mailem nebo telefonicky, zpracováváme pouze
            údaje, které nám sami poskytnete, a to výhradně za účelem vyřízení
            vašeho dotazu.
          </p>
          <p>
            V případě dotazů k ochraně osobních údajů nás kontaktujte na adrese
            uvedené na stránce Kontakt.
          </p>
        </div>
      </FadeIn>
      </div>
    </PageShell>
  );
}
