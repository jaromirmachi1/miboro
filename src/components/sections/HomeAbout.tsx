"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { MaskLines, Reveal } from "@/components/motion/Reveal";

interface HomeAboutProps {
  yearFounded: number;
  address: string;
  ico: string;
  dic: string;
}

const values = ["Zkušený tým", "Vlastní technika", "Certifikace ISO a BOZP", "Smluvní termíny"];

export function HomeAbout({ yearFounded, address, ico, dic }: HomeAboutProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 95%", "start 45%"] });
  const clip = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? ["inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)"] : ["inset(0% 0% 100% 0%)", "inset(0% 0% 0% 0%)"]
  );
  const scale = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 1.25, 1]);

  const facts = [
    { label: "Sídlo", value: address },
    { label: "Na trhu od", value: String(yearFounded) },
    { label: "IČO", value: ico },
    { label: "DIČ", value: dic },
  ];

  return (
    <section aria-labelledby="about-heading" className="bg-podklad pb-[clamp(7rem,14vw,13rem)] text-grafit">
      <Container>
        <MaskLines as="h2" className="condensed text-head" lines={["Stavební firma s tradicí"]} />
        <Reveal className="mt-6 max-w-[52ch]">
          <Reveal.Item as="p" className="text-lead text-grafit">
            MIBORO působí v Moravskoslezském kraji od roku {yearFounded}. Stavíme
            pro města, školy i soukromé investory a každou referenci umíme doložit.
          </Reveal.Item>
        </Reveal>

        <div className="mt-[4.5rem] grid gap-4 lg:grid-cols-12">
          <div ref={ref} className="relative lg:col-span-8">
            <motion.div className="relative aspect-[4/3] overflow-hidden bg-plocha sm:aspect-[16/10]" style={{ clipPath: clip }}>
              <motion.div className="absolute inset-0" style={{ scale }}>
                <Image
                  src="/images/fasady.jpg"
                  alt="Zateplení fasády — tým MIBORO na lešení"
                  fill
                  className="object-cover brightness-[0.9]"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
              </motion.div>
            </motion.div>
            <div className="bg-bila p-5 text-body text-grafit sm:absolute sm:right-0 sm:top-0 sm:w-[22rem]">
              <p>
                Potřebujete firmu ověřit? Kontaktujte nás přímo — bez formuláře,
                stejně jako v tendru.
              </p>
              <Link
                href="/o-firme"
                className="mt-3 inline-block font-semibold underline decoration-grafit/30 underline-offset-[6px] hover:decoration-grafit"
              >
                Více o firmě
              </Link>
            </div>
          </div>

          <div className="lg:col-span-4">
            <Reveal className="flex aspect-[3/2] flex-col justify-between bg-oranzova p-6 text-grafit lg:aspect-auto lg:h-[60%]">
              <Reveal.Item as="p" className="condensed text-lead">
                Na čem stavíme
              </Reveal.Item>
              <ul className="space-y-1 text-body font-semibold">
                {values.map((value) => (
                  <Reveal.Item as="li" key={value}>
                    {value}
                  </Reveal.Item>
                ))}
              </ul>
            </Reveal>
            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 text-small">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-sedy">{fact.label}</dt>
                  <dd className="tabular mt-1 text-body text-grafit">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Container>
    </section>
  );
}
