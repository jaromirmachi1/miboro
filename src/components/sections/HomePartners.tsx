"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { partnerLogos } from "@/config/partnerLogos";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";

/**
 * The investors written out as one sentence; one name at a time is lit
 * in the full ink, moving through the list. Their marks follow below.
 */
export function HomePartners() {
  const [lit, setLit] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      if (document.visibilityState === "visible") setLit((i) => (i + 1) % partnerLogos.length);
    }, 2000);
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <section aria-labelledby="partners-heading" className="bg-podklad pb-[clamp(7rem,14vw,13rem)] text-grafit">
      <Container>
        <h2 id="partners-heading" className="sr-only">
          Pro koho stavíme
        </h2>
        <p className="condensed max-w-[64ch] text-lead">
            <span className="text-grafit">Stavěli jsme pro </span>
            {partnerLogos.map((partner, i) => (
              <span key={partner.name}>
                <span
                  className={`transition-colors duration-500 ${
                    i === lit ? "bg-oranzova text-grafit [box-decoration-break:clone]" : "text-sediva"
                  }`}
                >
                  {partner.name}
                </span>
                {i < partnerLogos.length - 1 ? ", " : " "}
              </span>
            ))}
            <span className="text-grafit">a mnoho dalších.</span>
        </p>

        <Reveal as="ul" className="mt-16 grid grid-cols-2 items-center gap-x-10 gap-y-10 sm:grid-cols-4 lg:grid-cols-7" stagger={0.06}>
          {partnerLogos.map((partner, i) => (
            <Reveal.Item as="li" key={partner.name} className="flex h-12 items-center">
              <Image
                src={partner.src}
                alt={partner.name}
                width={144}
                height={48}
                unoptimized={partner.src.endsWith(".svg")}
                className={`h-full w-auto max-w-[9rem] object-contain object-left brightness-0 transition-opacity duration-500 ${
                  i === lit ? "opacity-100" : "opacity-60"
                }`}
              />
            </Reveal.Item>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
