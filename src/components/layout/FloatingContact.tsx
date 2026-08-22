"use client";

import Link from "next/link";
import { formatPhoneHref } from "@/lib/utils/format";

interface FloatingContactProps {
  phone: string;
}

export function FloatingContact({ phone }: FloatingContactProps) {
  return (
    <aside
      aria-label="Rychlý kontakt"
      className="fixed bottom-24 right-0 z-40 hidden flex-col lg:flex"
    >
      <a
        href={formatPhoneHref(phone)}
        className="flex h-12 w-12 items-center justify-center bg-grafit text-bila transition-colors hover:bg-oranzova"
        title="Telefon"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M6.5 4h3l1.5 4-2 1.5a12 12 0 005 5L17 12.5l4 1.5v3a2 2 0 01-2 2C9.6 19 5 14.4 5 7.5A2 2 0 016.5 4z" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </a>
      <Link
        href="/kontakt"
        className="flex h-12 w-12 items-center justify-center bg-oranzova text-bila transition-colors hover:bg-grafit"
        title="Kontakt"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 6h16v12H4V6zM4 6l8 6 8-6" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </Link>
    </aside>
  );
}
