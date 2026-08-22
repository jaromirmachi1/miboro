import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { formatPhoneHref } from "@/lib/utils/format";

interface HomeAboutProps {
  yearFounded: number;
  phone: string;
  email: string;
}

const values = [
  {
    title: "Zkušený tým",
    description:
      "Projektoví manažeři, stavbyvedoucí a řemeslníci s praxí ve veřejných zakázkách.",
  },
  {
    title: "Vlastní technologie",
    description:
      "Disponujeme vlastními stavebními kapacitami a technickým vybavením.",
  },
  {
    title: "Kvalita a bezpečnost",
    description: "Certifikace ISO a důraz na BOZP na každé stavbě.",
  },
  {
    title: "Férové jednání",
    description:
      "Transparentní reference, smluvní termíny a ověřitelná data pro tendry.",
  },
];

export function HomeAbout({ yearFounded, phone, email }: HomeAboutProps) {
  return (
    <section className="py-16 lg:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <FadeIn className="lg:col-span-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sedy">
              O nás
            </p>
            <h2 className="mt-3 font-display text-2xl font-bold uppercase text-grafit">
              Stavební firma s tradicí
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-sedy">
              MIBORO působí na trhu od roku {yearFounded}. Realizujeme veřejné
              i soukromé zakázky v Moravskoslezském kraji — s důrazem na
              ověřitelnost referencí a vlastní stavební kapacity.
            </p>
            <div className="mt-6">
              <Button href="/o-firme" variant="outline">
                Více o nás
              </Button>
            </div>
          </FadeIn>

          <FadeIn delay={0.08} className="lg:col-span-5">
            <Link
              href="/reference"
              className="group relative block aspect-[16/10] overflow-hidden bg-ocel"
            >
              <Image
                src="/miboromanor.png"
                alt="Realizace MIBORO"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/25 transition-colors group-hover:bg-black/40">
                <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-bila bg-bila/10 text-bila backdrop-blur-sm">
                  <svg width="20" height="24" viewBox="0 0 20 24" fill="currentColor" aria-hidden="true">
                    <path d="M4 2l14 10L4 22V2z" />
                  </svg>
                </span>
              </div>
            </Link>
          </FadeIn>

          <FadeIn delay={0.12} className="lg:col-span-4">
            <ul className="space-y-5">
              {values.map((value, index) => (
                <li key={value.title} className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-oranzova/15 font-display text-sm font-bold text-oranzova">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="font-display text-sm font-bold uppercase text-grafit">
                      {value.title}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-sedy">
                      {value.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 bg-grafit p-6 text-bila lg:mt-10">
              <p className="font-display text-lg font-bold uppercase">
                Potřebujete ověřit firmu?
              </p>
              <p className="mt-2 text-sm text-bila/90">
                Kontaktujte nás přímo — bez formuláře, stejně jako v tendru.
              </p>
              <div className="mt-5 space-y-2">
                <a
                  href={formatPhoneHref(phone)}
                  className="block font-display text-lg font-semibold text-oranzova hover:text-bila"
                >
                  {phone}
                </a>
                <a
                  href={`mailto:${email}`}
                  className="block text-sm text-bila/90 hover:text-bila"
                >
                  {email}
                </a>
              </div>
              <div className="mt-5">
                <Button href="/kontakt" variant="primary" className="w-full sm:w-auto">
                  Kontakt
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
