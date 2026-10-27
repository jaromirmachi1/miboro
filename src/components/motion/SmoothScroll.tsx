"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

let instance: Lenis | null = null;

/** The running Lenis instance, if smooth scrolling is active. */
export function getLenis() {
  return instance;
}

/**
 * Inertial page scrolling. Native scroll position is kept (Lenis drives
 * window.scrollTo), so position: sticky and framer-motion's useScroll keep
 * working. Disabled entirely for visitors who ask for reduced motion.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Automated browsers (screenshot and audit tools) jump with scrollTo; inertia would fight them.
    if (navigator.webdriver) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      anchors: { offset: -80 },
    });
    instance = lenis;

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      instance = null;
    };
  }, []);

  useEffect(() => {
    instance?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}
