"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "miboro-cookie-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY);
    if (!consent) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Souhlas s cookies"
      className="fixed inset-x-0 bottom-0 z-50 bg-papir px-5 py-4 sm:px-8"
    >
      <div className="mx-auto flex max-w-site flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-small leading-relaxed text-grafit">
          Používáme pouze technicky nezbytné cookies.{" "}
          <Link href="/gdpr" className="text-grafit underline decoration-grafit/30 underline-offset-4">
            Zásady zpracování osobních údajů
          </Link>
        </p>
        <button
          type="button"
          onClick={accept}
          className="min-h-[2.75rem] shrink-0 self-start bg-grafit px-5 text-small font-semibold text-papir sm:self-auto transition-colors hover:bg-oranzova hover:text-grafit"
        >
          Rozumím
        </button>
      </div>
    </div>
  );
}
