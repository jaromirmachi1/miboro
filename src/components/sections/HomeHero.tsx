"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MaskLines } from "@/components/motion/Reveal";

interface HomeHeroProps {
  yearFounded: number;
}

const ease = [0.22, 1, 0.36, 1] as const;

/** MIBORO's own finished work, from miboro.cz. Each slide holds ~6 s and crossfades. */
const slides = [
  { src: "/images/realizace/ms-kravare-zahrada.jpg", caption: "Mateřská škola Kravaře", position: "center" },
  { src: "/images/realizace/detmarovice-elektrarna.jpg", caption: "Zateplení administrativní budovy, Elektrárna Dětmarovice", position: "center" },
  { src: "/images/realizace/opava-univerzita.jpg", caption: "Opavská univerzita, Hauerova", position: "center" },
  { src: "/images/realizace/opava-univerzita-detail.jpg", caption: "Opavská univerzita, Hauerova", position: "center 35%" },
  { src: "/images/realizace/manor-pub-bar.jpg", caption: "Restaurace The Manor Pub, Ostrava", position: "center" },
  { src: "/images/realizace/manor-pub-salonek.jpg", caption: "Restaurace The Manor Pub, Ostrava", position: "center" },
  { src: "/images/realizace/verovice-chodnik.jpg", caption: "Zpevnění plochy, Veřovice", position: "center" },
] as const;

const SLIDE_MS = 6000;

export function HomeHero({ yearFounded }: HomeHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // Advance on a timer; hold while the tab is hidden, while paused, or for reduced motion.
  useEffect(() => {
    if (reduce || paused) return;
    const id = window.setInterval(() => {
      if (document.visibilityState === "visible") setActive((i) => (i + 1) % slides.length);
    }, SLIDE_MS);
    return () => window.clearInterval(id);
  }, [reduce, paused, active]);

  // The photograph sinks and grows a little as the page leaves it; the words lift away faster.
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "22%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.05]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, reduce ? 1 : 0]);

  const carouselControl = (
    <div className="flex flex-col gap-3">
      <p className="text-small text-grafit" aria-live="polite">
        <span className="text-sedy">Na fotografii: </span>
        {slides[active].caption}
      </p>
      <div className="flex items-center gap-2" role="group" aria-label="Fotografie realizací">
        {slides.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => setActive(i)}
            aria-label={slide.caption}
            aria-current={i === active}
            className="group relative h-6 flex-1 sm:w-10 sm:flex-none"
          >
            <span className="absolute inset-x-0 top-1/2 block h-[3px] -translate-y-1/2 overflow-hidden bg-grafit/15 transition-colors group-hover:bg-grafit/30">
              {i === active && (
                <motion.span
                  key={`${active}-${paused}`}
                  className="absolute inset-y-0 left-0 block w-full origin-left bg-grafit"
                  initial={{ scaleX: reduce || paused ? 1 : 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: reduce || paused ? 0 : SLIDE_MS / 1000, ease: "linear" }}
                />
              )}
            </span>
          </button>
        ))}
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          className="ml-2 min-h-[2.75rem] px-2 text-small font-semibold text-grafit underline decoration-transparent decoration-2 underline-offset-4 hover:decoration-oranzova"
          aria-pressed={paused}
        >
          {paused ? "Přehrát" : "Pozastavit"}
        </button>
      </div>
    </div>
  );

  return (
    <section
      ref={ref}
      className="relative -mt-[var(--header-height)] h-[100svh] min-h-[640px] overflow-hidden bg-podklad text-grafit"
    >
      <motion.div className="absolute inset-0 will-change-transform" style={{ y: imageY, scale: imageScale }}>
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease }}
        >
          {/* All slides stay mounted so the next photo is already loaded when it fades in. */}
          {slides.map((slide, i) => {
            const on = i === active;
            return (
              <motion.div
                key={slide.src}
                className="absolute inset-0"
                initial={{ opacity: on ? 1 : 0, scale: 1 }}
                animate={
                  on
                    ? { opacity: 1, scale: reduce ? 1 : 1.03, transition: { opacity: { duration: 1.6, ease }, scale: { duration: reduce ? 0 : 8, ease: "linear" } } }
                    : { opacity: 0, scale: 1, transition: { opacity: { duration: 1.6, ease }, scale: { duration: 0, delay: 1.6 } } }
                }
                aria-hidden={!on}
              >
                <Image
                  src={slide.src}
                  alt={on ? `Realizace MIBORO: ${slide.caption}` : ""}
                  fill
                  priority={i === 0}
                  quality={88}
                  className="object-cover"
                  style={{ objectPosition: slide.position }}
                  sizes="100vw"
                />
              </motion.div>
            );
          })}
        </motion.div>
        {/* Neutral scrims: a light one behind the navigation, a deep one under the headline. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(to_bottom,rgba(245,245,242,0.85),rgba(245,245,242,0))]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_top,rgba(245,245,242,0.97)_0%,rgba(245,245,242,0.9)_45%,rgba(245,245,242,0)_80%)] sm:bg-[linear-gradient(to_top,rgba(245,245,242,0.97)_0%,rgba(245,245,242,0.8)_34%,rgba(245,245,242,0)_68%)]"
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
                Stavíme lepší budoucnost už od roku {yearFounded}. Jsme stavební
                firma z Ostravy pro veřejné i soukromé investory.
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

            <motion.div
              className="hidden flex-col gap-8 sm:flex lg:col-span-5 lg:max-w-sm lg:justify-self-end"
              initial={{ opacity: 0, y: reduce ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease, delay: 1.15 }}
            >
              {carouselControl}
            </motion.div>
          </div>
        </Container>
      </motion.div>
    </section>
  );
}
