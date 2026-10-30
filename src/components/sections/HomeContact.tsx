"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { formatPhoneHref } from "@/lib/utils/format";

interface HomeContactProps {
  phone: string;
  email: string;
  address: string;
}

/** A building site at full bleed, and on it one card: who to call. */
export function HomeContact({ phone, email, address }: HomeContactProps) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-10%", "10%"]);

  return (
    <section ref={ref} aria-labelledby="contact-heading" className="relative bg-podklad lg:h-[130svh]">
      <div className="relative h-[70svh] overflow-hidden lg:absolute lg:inset-0 lg:h-auto">
        <motion.div className="absolute inset-[-12%_0] will-change-transform" style={{ y }}>
          <Image
            src="/images/zemniprace.jpg"
            alt="Zemní práce MIBORO — výkop pro inženýrské sítě"
            fill
            className="object-cover object-left brightness-[0.95]"
            sizes="100vw"
          />
        </motion.div>
      </div>

      <div className="relative z-10 mx-4 -mt-20 lg:mx-0 lg:mt-0 lg:h-full">
        <div className="lg:sticky lg:top-[calc(var(--header-height)+2rem)] lg:ml-auto lg:mr-12 lg:w-[24rem] lg:pt-[3.75rem]">
          <div className="bg-bila p-8 text-grafit">
            <h2 id="contact-heading" className="condensed text-lead">
              Postavíme to s vámi
            </h2>
            <p className="mt-4 text-body">{address}</p>
            <dl className="mt-6 space-y-3 text-body">
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-sedy">Telefon</dt>
                <dd>
                  <a href={formatPhoneHref(phone)} className="tabular underline decoration-grafit/30 underline-offset-4 hover:decoration-grafit">
                    {phone}
                  </a>
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-sedy">E-mail</dt>
                <dd>
                  <a href={`mailto:${email}`} className="underline decoration-grafit/30 underline-offset-4 hover:decoration-grafit">
                    {email}
                  </a>
                </dd>
              </div>
            </dl>
            <Button href="/kontakt" className="mt-8 w-full">
              Poptat stavbu
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
