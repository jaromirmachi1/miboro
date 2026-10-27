"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ElementType, ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Lines that rise out of a mask, one after another. Pass the lines already
 * broken where they should break; each is clipped by its own overflow box.
 */
export function MaskLines({
  lines,
  as: Tag = "h2",
  className = "",
  delay = 0,
  stagger = 0.08,
  onMount = false,
}: {
  lines: ReactNode[];
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  /** Animate on mount instead of when scrolled into view (for the first screen). */
  onMount?: boolean;
}) {
  const reduce = useReducedMotion();

  const line: Variants = {
    hidden: { y: reduce ? 0 : "105%" },
    shown: (i: number) => ({
      y: 0,
      transition: { duration: 1.05, ease, delay: delay + i * stagger },
    }),
  };

  const trigger = onMount
    ? { initial: "hidden", animate: "shown" }
    : { initial: "hidden", whileInView: "shown", viewport: { once: true, margin: "-12% 0px" } };

  return (
    <Tag className={className}>
      <motion.span className="block" {...trigger}>
        {lines.map((content, i) => (
          <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
            <motion.span className="block will-change-transform" variants={line} custom={i}>
              {content}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

/**
 * The parts of a section entering in order: wrap each part in <Reveal.Item>.
 * Content is visible without script (framer renders the final state on the server
 * only after hydration starts, so the initial style is applied inline).
 */
export function Reveal({
  children,
  className = "",
  as: Tag = "div",
  stagger = 0.08,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "ul" | "ol" | "article";
  stagger?: number;
  delay?: number;
}) {
  const MotionTag = motion[Tag];
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({
  children,
  className = "",
  as: Tag = "div",
  distance = 28,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "p" | "span";
  distance?: number;
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[Tag];
  return (
    <MotionTag
      className={className}
      variants={{
        hidden: { opacity: 0, y: reduce ? 0 : distance },
        shown: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
      }}
    >
      {children}
    </MotionTag>
  );
}

Reveal.Item = RevealItem;
