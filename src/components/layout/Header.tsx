"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { navLinks } from "@/config/site";
import { formatPhoneHref } from "@/lib/utils/format";
import { MiboroLogo } from "@/components/ui/MiboroLogo";
import { getLenis } from "@/components/motion/SmoothScroll";

interface HeaderProps {
  phone: string;
}

const ease = [0.22, 1, 0.36, 1] as const;

/** The picture shown beside each link in the open menu. */
const menuImages: Record<string, string> = {
  "/sluzby": "/images/vystavba.jpg",
  "/reference": "/images/kravare.jpg",
  "/o-firme": "/images/svarovac.jpg",
  "/kontakt": "/images/zemniprace.jpg",
};

function isActiveLink(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header({ phone }: HeaderProps) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [preview, setPreview] = useState<string>(navLinks[0].href);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setOpen(false), [pathname]);

  // Compact, solid bar once the page moves; slides away reading down, returns on the way up.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (y > 240 && y > last + 2) setHidden(true);
      if (y < last - 2) setHidden(false);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const lenis = getLenis();
    if (open) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const overHero = pathname === "/" && !scrolled && !open;
  const activeHref = navLinks.find((l) => isActiveLink(pathname, l.href))?.href ?? null;
  const indicatorHref = hovered ?? activeHref;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color] duration-500 ease-out ${
          overHero || open ? "bg-transparent" : "bg-grafit"
        } ${hidden && !open ? "-translate-y-full" : "translate-y-0"}`}
      >
        <div
          className={`mx-auto grid max-w-site grid-cols-[1fr_auto] items-center gap-6 px-5 transition-[height] duration-500 ease-out sm:px-8 lg:grid-cols-[1fr_auto_1fr] lg:px-12 ${
            scrolled && !open ? "h-16" : "h-[var(--header-height)]"
          }`}
        >
          <MiboroLogo priority className="h-7 w-auto sm:h-8" />

          {/* Desktop links: one yellow bar glides to the link under the pointer, and rests on the current page. */}
          <nav
            aria-label="Hlavní navigace"
            className={`hidden transition-opacity duration-300 lg:block ${open ? "pointer-events-none opacity-0" : "opacity-100"}`}
            onMouseLeave={() => setHovered(null)}
          >
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => {
                const active = isActiveLink(pathname, link.href);
                return (
                  <li key={link.href} className="relative">
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      onMouseEnter={() => setHovered(link.href)}
                      onFocus={() => setHovered(link.href)}
                      onBlur={() => setHovered(null)}
                      className="relative block px-4 py-2.5 text-small text-papir"
                    >
                      {link.label}
                      {indicatorHref === link.href && (
                        <motion.span
                          layoutId="nav-indicator"
                          aria-hidden="true"
                          className="absolute inset-x-4 bottom-1 h-[2px] bg-oranzova"
                          transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 36 }}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center justify-end gap-2 sm:gap-3">
            <Link
              href="/kontakt"
              className={`group relative isolate hidden min-h-[2.75rem] items-center overflow-hidden bg-oranzova px-5 text-small font-semibold text-grafit transition-opacity duration-300 sm:inline-flex ${
                open ? "pointer-events-none opacity-0" : "opacity-100"
              }`}
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 -z-10 translate-y-full bg-papir transition-transform duration-500 ease-out group-hover:translate-y-0"
              />
              Poptat stavbu
            </Link>

            <button
              ref={toggleRef}
              type="button"
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpen((v) => !v)}
              className="group inline-flex min-h-[2.75rem] items-center gap-3 px-3 text-small font-semibold text-papir"
            >
              <span className="relative block h-[1.2em] overflow-hidden">
                <span aria-hidden="true" className={`block transition-transform duration-500 ease-out ${open ? "-translate-y-full" : ""}`}>
                  Menu
                </span>
                <span
                  aria-hidden="true"
                  className={`absolute inset-0 block transition-transform duration-500 ease-out ${open ? "translate-y-0" : "translate-y-full"}`}
                >
                  Zavřít
                </span>
                <span className="sr-only">{open ? "Zavřít menu" : "Otevřít menu"}</span>
              </span>
              <span aria-hidden="true" className="relative block h-3 w-6">
                <span
                  className={`absolute left-0 top-0 block h-[2px] w-full bg-current transition-transform duration-500 ease-out ${
                    open ? "translate-y-[5px] rotate-45" : "group-hover:scale-x-75"
                  } origin-center`}
                />
                <span
                  className={`absolute bottom-0 left-0 block h-[2px] w-full bg-current transition-transform duration-500 ease-out ${
                    open ? "-translate-y-[5px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen menu: the pages as large names, a photo of each beside them, contact at the foot. */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="site-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-40 overflow-y-auto bg-grafit text-papir"
            initial={reduce ? { opacity: 0 } : { clipPath: "inset(0% 0% 100% 0%)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0%)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: reduce ? 0.2 : 0.8, ease }}
            data-lenis-prevent
          >
            <div className="mx-auto grid min-h-full max-w-site gap-10 px-5 pb-8 pt-[calc(var(--header-height)+2.5rem)] sm:px-8 lg:grid-cols-12 lg:gap-8 lg:px-12 lg:pb-12">
              <nav aria-label="Menu" className="lg:col-span-7 lg:self-center">
                <ul>
                  {navLinks.map((link, i) => {
                    const active = isActiveLink(pathname, link.href);
                    return (
                      <li key={link.href} className="overflow-hidden">
                        <motion.div
                          initial={{ y: reduce ? 0 : "110%" }}
                          animate={{ y: 0 }}
                          exit={{ y: reduce ? 0 : "-40%", opacity: 0 }}
                          transition={{ duration: 0.9, ease, delay: reduce ? 0 : 0.25 + i * 0.07 }}
                        >
                          <Link
                            href={link.href}
                            aria-current={active ? "page" : undefined}
                            onMouseEnter={() => setPreview(link.href)}
                            onFocus={() => setPreview(link.href)}
                            onClick={() => setOpen(false)}
                            className={`condensed group flex items-center gap-4 py-1 text-[clamp(3rem,1.6rem+6vw,7.5rem)] leading-[1.02] tracking-[-0.03em] transition-colors duration-300 ${
                              active ? "text-oranzova" : "text-papir hover:text-oranzova"
                            }`}
                          >
                            <span className="transition-transform duration-500 ease-out group-hover:translate-x-3">
                              {link.label}
                            </span>
                          </Link>
                        </motion.div>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <motion.div
                className="relative hidden aspect-[4/5] max-h-[68svh] overflow-hidden bg-ocel lg:col-span-4 lg:col-start-9 lg:block lg:self-center"
                initial={{ opacity: 0, scale: reduce ? 1 : 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease, delay: reduce ? 0 : 0.35 }}
              >
                <AnimatePresence initial={false}>
                  <motion.div
                    key={preview}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: reduce ? 1 : 1.08 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease }}
                  >
                    <Image
                      src={menuImages[preview] ?? "/images/vystavba.jpg"}
                      alt=""
                      fill
                      className="object-cover brightness-[0.85]"
                      sizes="33vw"
                    />
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              <motion.div
                className="flex flex-col gap-4 self-end text-body sm:flex-row sm:items-end sm:justify-between lg:col-span-12"
                initial={{ opacity: 0, y: reduce ? 0 : 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease, delay: reduce ? 0 : 0.55 }}
              >
                <div>
                  <a href={formatPhoneHref(phone)} className="block hover:text-oranzova">
                    {phone}
                  </a>
                  <p className="text-mlha">Ostrava, Moravskoslezský kraj</p>
                </div>
                <Link
                  href="/kontakt"
                  onClick={() => setOpen(false)}
                  className="inline-flex min-h-[3.25rem] items-center justify-center bg-oranzova px-7 font-semibold text-grafit transition-colors hover:bg-papir"
                >
                  Poptat stavbu
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
