import Image from "next/image";
import { partnerLogos } from "@/config/partnerLogos";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";

export function HomePartners() {
  return (
    <section className="border-y border-border bg-bila py-12 lg:py-14">
      <Container>
        <FadeIn>
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-sedy">
            Důvěřují nám
          </p>
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-8 lg:gap-x-14">
            {partnerLogos.map((partner) => (
              <li
                key={partner.name}
                className="flex h-14 w-36 items-center justify-center"
              >
                <Image
                  src={partner.src}
                  alt={partner.name}
                  width={144}
                  height={56}
                  unoptimized={partner.src.endsWith(".svg")}
                  className={`h-full w-full object-contain object-center grayscale${partner.invert ? " invert" : ""}`}
                />
              </li>
            ))}
          </ul>
        </FadeIn>
      </Container>
    </section>
  );
}
