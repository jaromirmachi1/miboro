"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { navLinks } from "@/config/site";
import { formatPhoneHref } from "@/lib/utils/format";
import { Container } from "@/components/ui/Container";

interface FooterProps {
  phone: string;
  email: string;
  address: string;
  ico: string;
  dic: string;
}

/** The name returns at full width, rising into place, then one quiet line. */
export function Footer({ phone, email, address, ico, dic }: FooterProps) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["40%", "0%"]);

  return (
    <footer ref={ref} className="overflow-hidden bg-podklad text-grafit">
      <Container className="pt-[clamp(6rem,12vw,10rem)]">
        <div className="grid gap-10 text-body sm:grid-cols-3">
          <div>
            <a href={formatPhoneHref(phone)} className="block underline decoration-transparent decoration-2 underline-offset-4 hover:decoration-oranzova">
              {phone}
            </a>
            <a href={`mailto:${email}`} className="block underline decoration-transparent decoration-2 underline-offset-4 hover:decoration-oranzova">
              {email}
            </a>
          </div>
          <p className="text-sedy">
            {address}
            <br />
            IČO {ico} · DIČ {dic}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 sm:justify-end">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="underline decoration-transparent decoration-2 underline-offset-4 hover:decoration-oranzova">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <motion.div style={{ y }} className="mt-[clamp(4rem,8vw,7rem)]">
          <Image
            src="/images/miborologo-dark.svg"
            alt="MIBORO"
            width={2492}
            height={829}
            unoptimized
            className="h-auto w-full"
          />
        </motion.div>

        <div className="grid gap-2 py-8 text-small text-sedy sm:grid-cols-[1fr_auto_1fr] sm:items-center">
          <p>Stavební firma, Ostrava</p>
          <p className="sm:text-center">© {new Date().getFullYear()} MIBORO</p>
          <Link href="/gdpr" className="text-grafit underline decoration-transparent decoration-2 underline-offset-4 hover:decoration-oranzova sm:justify-self-end">
            Zásady zpracování osobních údajů
          </Link>
        </div>
      </Container>
    </footer>
  );
}
