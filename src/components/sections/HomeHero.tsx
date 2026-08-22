import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { SanityImage } from "@/components/ui/SanityImage";
import type { Project } from "@/lib/sanity/types";

interface HomeHeroProps {
  yearFounded: number;
  ongoingProject?: Project | null;
}

const trustItems = [
  {
    label: "Vlastní kapacity",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M3 21h18M5 21V9l7-4 7 4v12M9 21v-6h6v6" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    label: "Zkušený tým",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="17" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3 20c0-3 2.5-5 6-5s6 2 6 5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    label: "Kvalita a termíny",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3l2.4 4.8 5.4.8-3.9 3.8.9 5.3L12 15.8 7.2 17.7l.9-5.3L4.2 8.6l5.4-.8L12 3z" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
];

export function HomeHero({ yearFounded, ongoingProject }: HomeHeroProps) {
  return (
    <section className="relative -mt-[var(--header-height)] min-h-svh overflow-hidden bg-black text-bila">
      <div className="absolute inset-0">
        <Image
          src="/miboromanor.png"
          alt="Realizace MIBORO — The Manor Pub"
          fill
          priority
          className="object-cover object-[center_45%]"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, #000000 0%, #000000 36%, rgba(0,0,0,0.72) 48%, rgba(0,0,0,0.28) 56%, transparent 66%)",
          }}
          aria-hidden="true"
        />
      </div>

      <Container className="relative z-10 grid min-h-svh lg:grid-cols-12 lg:gap-x-12">
        <FadeIn className="mt-[var(--header-height)] flex min-h-[calc(100svh-var(--header-height))] flex-col justify-center lg:col-span-7">
          <h1 className="font-display text-[clamp(2.25rem,6vw,4.5rem)] font-bold uppercase leading-[1.05] tracking-tight">
            Stavíme pevně.
            <br />
            <span className="text-oranzova">Dodáváme spolehlivě.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-bila/95 sm:text-lg">
            Komplexní stavební řešení pro veřejný i soukromý sektor. Od roku{" "}
            {yearFounded} realizujeme zakázky s důrazem na ověřitelnost,
            kapacity a termíny.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/reference" variant="primary">
              Naše reference
            </Button>
            <Button href="/o-firme" variant="outline-light">
              O firmě
            </Button>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
            {trustItems.map((item) => (
              <li
                key={item.label}
                className="flex items-center gap-3 text-sm text-bila"
              >
                <span className="text-oranzova">{item.icon}</span>
                {item.label}
              </li>
            ))}
          </ul>
        </FadeIn>

        {ongoingProject && (
          <FadeIn
            delay={0.1}
            className="flex items-end pb-16 lg:col-span-5 lg:mt-[var(--header-height)] lg:min-h-[calc(100svh-var(--header-height))] lg:items-center lg:pb-0"
          >
            <Link
              href={`/reference/${ongoingProject.slug.current}`}
              className="group ml-auto block w-full max-w-md border border-bila/15 bg-black/80 p-4 backdrop-blur-sm transition-colors hover:border-oranzova/50 lg:ml-auto"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-oranzova">
                Aktuálně realizujeme
              </p>
              <div className="mt-3 flex gap-4">
                <div className="relative h-16 w-24 shrink-0 overflow-hidden bg-black">
                  <SanityImage
                    image={ongoingProject.coverImage}
                    alt={ongoingProject.title}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
                <div>
                  <p className="font-display text-base font-semibold text-bila group-hover:text-oranzova">
                    {ongoingProject.title}
                  </p>
                  {ongoingProject.investor && (
                    <p className="mt-1 text-sm text-bila">
                      {ongoingProject.investor}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          </FadeIn>
        )}
      </Container>
    </section>
  );
}
