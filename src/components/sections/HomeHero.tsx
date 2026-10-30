"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MaskLines } from "@/components/motion/Reveal";
import { SanityImage } from "@/components/ui/SanityImage";
import type { Project } from "@/lib/sanity/types";

interface HomeHeroProps {
  yearFounded: number;
  ongoingProject?: Project | null;
}

const ease = [0.22, 1, 0.36, 1] as const;

export function HomeHero({ yearFounded, ongoingProject }: HomeHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // The photograph sinks and grows a little as the page leaves it; the words lift away faster.
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "22%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.12]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, reduce ? 1 : 0]);

  return (
    <section
      ref={ref}
      className="relative -mt-[var(--header-height)] h-[100svh] min-h-[640px] overflow-hidden bg-podklad text-grafit"
    >
      <motion.div className="absolute inset-0 will-change-transform" style={{ y: imageY, scale: imageScale }}>
        <motion.div
          className="absolute inset-0"
          initial={{ scale: reduce ? 1 : 1.18, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.2, ease }}
        >
          <Image
            src="/images/hero-stavba.jpg"
            alt="Stavba MIBORO — od projektu k realizaci"
            fill
            priority
            quality={92}
            className="object-cover object-[68%_42%] sm:object-[center_42%] brightness-[1.02] contrast-[1.02]"
            sizes="100vw"
          />
        </motion.div>
        {/* Neutral scrims: a light one behind the navigation, a deep one under the headline. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(to_bottom,rgba(245,245,242,0.85),rgba(245,245,242,0))]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_top,rgba(245,245,242,0.97)_0%,rgba(245,245,242,0.8)_34%,rgba(245,245,242,0)_68%)]"
        />
      </motion.div>

      <motion.div className="relative z-10 h-full" style={{ y: contentY, opacity: contentOpacity }}>
        <Container className="flex h-full flex-col justify-end pb-10 sm:pb-14 lg:pb-16">
          <MaskLines
            as="h1"
            onMount
            delay={0.35}
            className="condensed text-mega"
            lines={["Stavíme pevně.", "Dodáváme spolehlivě."]}
          />
          <div className="mt-8 grid items-end gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <motion.p
                className="max-w-[46ch] text-lead text-grafit"
                initial={{ opacity: 0, y: reduce ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease, delay: 0.85 }}
              >
                Stavební firma z Ostravy. Od roku {yearFounded} stavíme školy,
                fasády, silnice a sítě pro města Moravskoslezského kraje.
              </motion.p>
              <motion.div
                className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4"
                initial={{ opacity: 0, y: reduce ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease, delay: 1 }}
              >
                <Button href="/reference">Naše reference</Button>
                <Link
                  href="/o-firme"
                  className="text-body text-grafit underline decoration-grafit/40 decoration-2 underline-offset-[6px] transition-colors hover:decoration-oranzova"
                >
                  O firmě
                </Link>
              </motion.div>
            </div>

            {ongoingProject && (
              <motion.div
                className="lg:col-span-5 lg:justify-self-end"
                initial={{ opacity: 0, y: reduce ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease, delay: 1.15 }}
              >
                <Link
                  href={`/reference/${ongoingProject.slug.current}`}
                  className="group flex max-w-sm items-center gap-5"
                >
                  <span className="relative block h-20 w-28 shrink-0 overflow-hidden bg-plocha">
                    <SanityImage
                      image={ongoingProject.coverImage}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      sizes="112px"
                    />
                  </span>
                  <span className="block text-small text-sedy">
                    <span className="flex items-center gap-2 text-grafit">
                      <span className="inline-flex h-2 w-2 rounded-full bg-oranzova" aria-hidden="true" />
                      Právě stavíme
                    </span>
                    <span className="mt-1 block text-body text-grafit underline decoration-transparent decoration-2 underline-offset-4 transition-colors group-hover:decoration-oranzova">
                      {ongoingProject.title}
                    </span>
                    {ongoingProject.investor && <span className="block">{ongoingProject.investor}</span>}
                  </span>
                </Link>
              </motion.div>
            )}
          </div>
        </Container>
      </motion.div>
    </section>
  );
}
