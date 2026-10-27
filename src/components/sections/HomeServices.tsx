"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { getServiceImage } from "@/config/serviceImages";
import { Container } from "@/components/ui/Container";
import { MaskLines, Reveal } from "@/components/motion/Reveal";
import type { Service } from "@/lib/sanity/types";

interface HomeServicesProps {
  services: Service[];
}

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * The disciplines as one list of large names. The name nearest the middle of
 * the screen (or the one pointed at or focused) lights up, the yellow corner
 * from the MIBORO mark moves to it, and the picture beside the list crossfades
 * to that discipline.
 */
export function HomeServices({ services }: HomeServicesProps) {
  const items = services.slice(0, 6);
  const [active, setActive] = useState(0);
  const rowRefs = useRef<(HTMLLIElement | null)[]>([]);
  const reduce = useReducedMotion();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number((entry.target as HTMLElement).dataset.index);
            setActive(index);
          }
        });
      },
      { rootMargin: "-48% 0px -48% 0px" }
    );
    rowRefs.current.forEach((row) => row && observer.observe(row));
    return () => observer.disconnect();
  }, [items.length]);

  const current = items[active];
  const hrefFor = (service: Service) =>
    service.slug?.current ? `/sluzby#${service.slug.current}` : "/sluzby";

  return (
    <section aria-labelledby="services-heading" className="bg-grafit pb-[clamp(7rem,14vw,13rem)] text-papir">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <MaskLines
              as="h2"
              className="condensed text-head"
              lines={["Co stavíme"]}
            />
            <Reveal as="div" className="mt-6 max-w-[44ch]">
              <Reveal.Item as="p" className="text-body text-papir">
                Od výkopu sítí po poslední vrstvu fasády. Komplexní stavební
                činnost pro veřejné instituce i soukromé investory.
              </Reveal.Item>
            </Reveal>

            <ul className="mt-14 lg:mt-20">
              {items.map((service, index) => {
                const isActive = index === active;
                return (
                  <li
                    key={service._id}
                    ref={(el) => {
                      rowRefs.current[index] = el;
                    }}
                    data-index={index}
                    className="relative"
                  >
                    <Link
                      href={hrefFor(service)}
                      onMouseEnter={() => setActive(index)}
                      onFocus={() => setActive(index)}
                      className="group relative grid grid-cols-[2rem_1fr] py-4 sm:grid-cols-[3rem_1fr] sm:py-5"
                    >
                      {/* The corner of the MIBORO mark marks the lit row. */}
                      <span
                        aria-hidden="true"
                        className={`mt-[0.35em] h-5 w-5 text-head transition-[transform,opacity] duration-500 ease-out sm:h-6 sm:w-6 ${
                          isActive ? "scale-100 opacity-100" : "scale-50 opacity-0"
                        }`}
                      >
                        <svg viewBox="0 0 24 24" className="h-full w-full" fill="none">
                          <path d="M0 0h24v24h-8V8H0z" fill="#FFD700" />
                        </svg>
                      </span>
                      <div>
                      <h3
                        className={`condensed text-head transition-[color,transform] duration-500 ease-out ${
                          isActive ? "translate-x-0 text-papir" : "text-mlha lg:-translate-x-2"
                        }`}
                      >
                        {service.title}
                      </h3>

                      {/* Phone and tablet: the description and picture sit with their name. */}
                      <div className="lg:hidden">
                        {service.shortDescription && (
                          <p className="mt-3 max-w-[40ch] text-body text-mlha">{service.shortDescription}</p>
                        )}
                        <div className="relative mt-5 aspect-[16/10] overflow-hidden bg-ocel">
                          <Image
                            src={getServiceImage(service, index)}
                            alt=""
                            fill
                            className="object-cover brightness-[0.85]"
                            sizes="100vw"
                          />
                        </div>
                      </div>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Desktop: one picture that follows the lit name. */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-[calc(var(--header-height)+2rem)]">
              <div className="relative aspect-[4/5] overflow-hidden bg-ocel">
                <AnimatePresence initial={false}>
                  {current && (
                    <motion.div
                      key={current._id}
                      className="absolute inset-0"
                      initial={{ opacity: 0, scale: reduce ? 1 : 1.08 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: reduce ? 0.2 : 1.1, ease }}
                    >
                      <Image
                        src={getServiceImage(current, active)}
                        alt={current.title}
                        fill
                        className="object-cover brightness-[0.85]"
                        sizes="40vw"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="mt-6 min-h-[6.5rem]">
                <AnimatePresence mode="wait" initial={false}>
                  {current && (
                    <motion.div
                      key={current._id}
                      initial={{ opacity: 0, y: reduce ? 0 : 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: reduce ? 0 : -8 }}
                      transition={{ duration: 0.45, ease }}
                    >
                      <p className="max-w-[40ch] text-body text-papir">{current.shortDescription}</p>
                      <Link
                        href={hrefFor(current)}
                        className="mt-3 inline-block text-body text-oranzova underline decoration-oranzova/40 underline-offset-[6px] hover:decoration-oranzova"
                      >
                        Více o oboru
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
