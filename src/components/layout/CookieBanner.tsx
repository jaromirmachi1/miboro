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
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-bila/95 px-5 py-4 backdrop-blur-md sm:px-8"
    >
      <div className="mx-auto flex max-w-site flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[13px] leading-relaxed text-sedy">
          Používáme pouze technicky nezbytné cookies.{" "}
          <Link href="/gdpr" className="text-grafit underline decoration-border underline-offset-4">
            Zásady zpracování osobních údajů
          </Link>
        </p>
        <button
          type="button"
          onClick={accept}
          className="shrink-0 self-start border border-grafit px-5 py-2 text-[13px] font-medium text-grafit transition-colors hover:bg-grafit hover:text-bila"
        >
          Rozumím
        </button>
      </div>
    </div>
  );
}
