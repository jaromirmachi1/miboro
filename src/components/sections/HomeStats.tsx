"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { StatBarData } from "@/lib/sanity/types";
import { Container } from "@/components/ui/Container";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";

interface HomeStatsProps {
  data: StatBarData;
}

export function HomeStats({ data }: HomeStatsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  // The frame opens from an inset window to the full bleed as it arrives; the photo drifts inside it.
  const clip = useTransform(
    scrollYProgress,
    [0, 0.4],
    reduce ? ["inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)"] : ["inset(10% 6% 10% 6%)", "inset(0% 0% 0% 0%)"]
  );
  const imageY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-12%", "12%"]);

  const supporting = [
    { value: data.employeeCount, label: "specialistů ve vlastním týmu" },
    { value: `${data.yearsOnMarket}`, label: `let na trhu, od roku ${data.yearFounded}` },
    { value: data.annualRevenue, label: "roční obrat firmy" },
  ];

  return (
    <section aria-labelledby="stats-heading" className="bg-podklad pb-[clamp(7rem,14vw,13rem)] pt-[clamp(5rem,10vw,9rem)] text-grafit">
      <div ref={ref} className="relative h-[80svh] sm:h-[88svh]">
        <motion.div className="absolute inset-0 overflow-hidden" style={{ clipPath: clip }}>
        <motion.div className="absolute inset-[-14%_0] will-change-transform" style={{ y: imageY }}>
          <Image
            src="/images/vystavba.jpg"
            alt="Hrubá stavba MIBORO — bednění a výztuž stropu"
            fill
            className="object-cover brightness-[0.7]"
            sizes="100vw"
          />
        </motion.div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[45%] bg-[linear-gradient(to_top,rgba(14,14,12,0.85),rgba(14,14,12,0))]"
        />
        </motion.div>

        <Container className="relative flex h-full flex-col justify-between py-8 text-papir sm:py-10">
          <h2 id="stats-heading" className="condensed text-lead text-papir">
            Vlastní kapacitou
          </h2>

          <div className="flex flex-col-reverse gap-6 sm:flex-row sm:items-end sm:justify-between">
            <p className="condensed text-[clamp(7rem,19vw,19rem)] leading-[0.8] tracking-[-0.04em]">
              <CountUp value={data.selfPerformedPercent} />
            </p>
            <p className="max-w-[26ch] text-body sm:pb-4 sm:text-right">
              všech prací stavíme vlastními lidmi a technikou. Termín tak drží
              ten, kdo ho podepsal.
            </p>
          </div>
        </Container>
      </div>

      <Container>
        <Reveal as="ul" className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-8">
          {supporting.map((item) => (
            <Reveal.Item as="li" key={item.label} className="flex flex-col gap-2">
              <span className="condensed text-head">
                <CountUp value={item.value} />
              </span>
              <span className="text-body text-sedy">{item.label}</span>
            </Reveal.Item>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
