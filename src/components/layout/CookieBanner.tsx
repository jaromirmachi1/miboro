"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const STORAGE_KEY = "miboro-cookie-consent";
const ease = [0.22, 1, 0.36, 1] as const;

/**
 * A small card in the bottom-right corner (bottom-left would cover the hero's main button) instead of a full-width bar.
 * It rises in a moment after the page settles and drops away when accepted.
 * Only technically necessary cookies are used, so one button is enough.
 */
export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    let consent: string | null = null;
    try {
      consent = localStorage.getItem(STORAGE_KEY);
    } catch {
      /* storage blocked: show the notice */
    }
    if (consent) return;
    const id = window.setTimeout(() => setVisible(true), 1200);
    return () => window.clearTimeout(id);
  }, []);

  function accept() {
    try {
      localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {
      /* ignore */
    }
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="region"
          aria-label="Cookies"
          className="fixed bottom-4 left-4 right-4 z-50 sm:bottom-6 sm:left-auto sm:right-6 sm:w-[23rem]"
          initial={{ opacity: 0, y: reduce ? 0 : 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduce ? 0 : 24 }}
          transition={{ duration: 0.7, ease }}
        >
          <div className="relative bg-ocel p-5 text-papir shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)]">
            {/* The corner of the MIBORO mark. */}
            <svg aria-hidden="true" viewBox="0 0 24 24" className="absolute right-4 top-4 h-4 w-4">
              <path d="M0 0h24v24h-8V8H0z" fill="#FFD700" />
            </svg>
            <p className="pr-8 text-small leading-relaxed text-papir">
              Používáme jen technicky nezbytné cookies, žádné sledování ani
              reklamu.
            </p>
            <div className="mt-4 flex items-center justify-between gap-4">
              <Link
                href="/gdpr"
                className="text-small text-mlha underline decoration-mlha/40 underline-offset-4 transition-colors hover:text-papir"
              >
                Zásady ochrany údajů
              </Link>
              <button
                type="button"
                onClick={accept}
                className="group relative isolate min-h-[2.75rem] overflow-hidden bg-oranzova px-5 text-small font-semibold text-grafit"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 translate-y-full bg-papir transition-transform duration-500 ease-out group-hover:translate-y-0"
                />
                Rozumím
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
