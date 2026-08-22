"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks } from "@/config/site";
import { formatPhoneHref } from "@/lib/utils/format";
import { MiboroLogo } from "@/components/ui/MiboroLogo";

interface HeaderProps {
  phone: string;
}

function isActiveLink(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header({ phone }: HeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-grafit">
        <div className="mx-auto flex h-16 max-w-site items-center justify-between gap-6 px-5 sm:px-8 lg:h-[4.5rem] lg:px-12">
          <MiboroLogo priority />

          <nav
            className="hidden items-center gap-1 lg:flex"
            aria-label="Hlavní navigace"
          >
            {navLinks.map((link) => {
              const active = isActiveLink(pathname, link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group relative px-3.5 py-2 text-[14px] font-medium transition-colors ${
                    active ? "text-bila" : "text-bila/75 hover:text-bila"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute inset-x-3.5 -bottom-px h-px origin-left transition-transform duration-300 ${
                      active ? "scale-x-100 bg-oranzova" : "scale-x-0 bg-oranzova"
                    } ${!active ? "group-hover:scale-x-100" : ""}`}
                    aria-hidden="true"
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href={formatPhoneHref(phone)}
              className="hidden items-center gap-2 text-[14px] font-medium text-bila/90 transition-colors hover:text-bila md:inline-flex"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="shrink-0 opacity-80"
              >
                <path
                  d="M5 4h4l2 5-2 1.5a11 11 0 0 0 5 5L15.5 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
              {phone}
            </a>

            <Link
              href="/kontakt"
              className="hidden rounded-full bg-oranzova px-4 py-2 text-[13px] font-semibold text-bila transition-colors hover:bg-[#E6C200] sm:inline-flex"
            >
              Kontakt
            </Link>

            <button
              type="button"
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-bila transition-colors hover:bg-bila/10 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Zavřít menu" : "Otevřít menu"}
              onClick={() => setOpen((value) => !value)}
            >
              <span className="sr-only">{open ? "Zavřít menu" : "Otevřít menu"}</span>
              <span className="flex w-5 flex-col gap-[5px]">
                <span
                  className={`block h-px w-full bg-current transition-transform duration-300 ${
                    open ? "translate-y-[6px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`block h-px w-full bg-current transition-opacity duration-300 ${
                    open ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block h-px w-full bg-current transition-transform duration-300 ${
                    open ? "-translate-y-[6px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-nav"
        className={`fixed inset-0 z-40 lg:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          aria-label="Zavřít menu"
          onClick={() => setOpen(false)}
        />

        <nav
          className={`absolute right-0 top-0 flex h-full w-full max-w-sm flex-col bg-bila px-6 pb-8 pt-20 shadow-2xl transition-transform duration-300 ease-out sm:px-8 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
          aria-label="Mobilní navigace"
        >
          <ul className="flex flex-col gap-1">
            {navLinks.map((link, index) => {
              const active = isActiveLink(pathname, link.href);

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`flex items-center justify-between border-b border-black/5 py-4 text-lg font-medium transition-colors ${
                      active ? "text-oranzova" : "text-grafit hover:text-oranzova"
                    }`}
                    onClick={() => setOpen(false)}
                    style={{ transitionDelay: open ? `${index * 40}ms` : "0ms" }}
                  >
                    {link.label}
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                      className="opacity-30"
                    >
                      <path
                        d="M3 8h10M9 4l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-auto space-y-4 border-t border-black/5 pt-8">
            <a
              href={formatPhoneHref(phone)}
              className="flex items-center gap-3 text-base font-semibold text-grafit"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-oranzova/10 text-oranzova">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M5 4h4l2 5-2 1.5a11 11 0 0 0 5 5L15.5 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              {phone}
            </a>
            <Link
              href="/kontakt"
              className="flex w-full items-center justify-center rounded-full bg-grafit py-3.5 text-sm font-semibold text-bila transition-colors hover:bg-oranzova"
              onClick={() => setOpen(false)}
            >
              Kontakt
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
