"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * Counts the leading number of a figure ("85 %", "50+", "200 mil. Kč") up from
 * zero when it enters the screen. The full value is rendered on the server,
 * so the figure is correct without script.
 */
export function CountUp({ value, className = "" }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduce = useReducedMotion();
  const match = value.match(/^(\D*)(\d+(?:[\s ]\d{3})*)(.*)$/);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!match || !inView || reduce) return;
    const [, prefix, digits, suffix] = match;
    const target = Number(digits.replace(/\s/g, ""));
    const controls = animate(0, target, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(`${prefix}${Math.round(v)}${suffix}`),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, value]);

  return (
    <span ref={ref} className={`tabular ${className}`} aria-label={value}>
      <span aria-hidden="true">{display}</span>
    </span>
  );
}
