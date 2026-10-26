import Image from "next/image";
import Link from "next/link";
import { getServiceImage } from "@/config/serviceImages";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import type { Service } from "@/lib/sanity/types";

interface HomeServicesProps {
  services: Service[];
}

export function HomeServices({ services }: HomeServicesProps) {
  return (
    <section className="bg-svetly py-16 lg:py-24">
      <Container>
        <FadeIn>
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sedy">
              Co děláme
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold uppercase text-grafit sm:text-4xl">
              Naše služby
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sedy">
              Komplexní stavební činnost pro veřejné instituce i soukromé
              investory v Moravskoslezském kraji.
            </p>
          </div>
        </FadeIn>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {services.slice(0, 5).map((service, index) => {
            const href = service.slug?.current
              ? `/sluzby#${service.slug.current}`
              : "/sluzby";
            const imageSrc = getServiceImage(service, index);

            return (
              <FadeIn key={service._id} delay={index * 0.05}>
                <Link href={href} className="group block h-full bg-bila shadow-sm transition-shadow hover:shadow-md">
                  <div className="relative aspect-[4/3] overflow-hidden bg-black">
                    <Image
                      src={imageSrc}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 20vw"
                    />
                    <span className="absolute -bottom-5 left-4 flex h-10 w-10 items-center justify-center rounded-full bg-oranzova text-[11px] font-bold tabular-nums text-grafit shadow-md">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="px-5 pb-6 pt-8">
                    <h3 className="font-display text-sm font-bold uppercase leading-snug text-grafit group-hover:text-oranzova">
                      {service.title}
                    </h3>
                    {service.shortDescription && (
                      <p className="mt-3 text-sm leading-relaxed text-sedy">
                        {service.shortDescription}
                      </p>
                    )}
                    <span className="mt-4 inline-block text-[11px] font-semibold uppercase tracking-[0.14em] text-oranzova">
                      Více informací →
                    </span>
                  </div>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
