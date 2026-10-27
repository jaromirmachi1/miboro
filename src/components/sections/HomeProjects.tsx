"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { getProjectLocation } from "@/lib/projects";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SanityImage } from "@/components/ui/SanityImage";
import type { Project } from "@/lib/sanity/types";
import { formatYearRange } from "@/lib/utils/format";

interface HomeProjectsProps {
  projects: Project[];
}

/** Scroll distance per project, in screen heights. */
const PER_PROJECT = 1.1;

/**
 * Finished buildings on one pinned stage. Each next project wipes up over the
 * previous one while its photograph settles from a slight zoom. The photo and
 * the name are cut down the middle: the halves arrive offset, glide together,
 * hold aligned for most of the project's turn, then part as the next arrives.
 * Under each name, the facts of a Czech site board: investor, place, dates.
 */
export function HomeProjects({ projects }: HomeProjectsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const n = projects.length;
  // s runs 0 → n across the pinned run: project i owns s ∈ [i, i + 1].
  const s = useTransform(scrollYProgress, [0, 1], [0, n]);

  if (n === 0) return null;

  return (
    <section aria-labelledby="projects-heading" className="relative bg-grafit text-papir">
      <div ref={ref} className="relative" style={{ height: `calc(${n * PER_PROJECT} * 100svh + 100svh)` }}>
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          {projects.map((project, index) => (
            <ProjectLayer
              key={project._id}
              project={project}
              index={index}
              count={n}
              s={s}
            />
          ))}

          <Container className="pointer-events-none absolute inset-x-0 top-0 z-30 pt-[calc(var(--header-height)+1rem)]">
            <h2 id="projects-heading" className="condensed text-lead text-papir">
              Dokončené stavby
            </h2>
          </Container>
        </div>
      </div>

      <Container className="flex flex-col items-start gap-6 py-[clamp(5rem,10vw,9rem)] sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-[36ch] text-lead text-papir">
          Každou referenci doložíme investorem, rozsahem a termínem.
        </p>
        <Button href="/reference">Všechny reference</Button>
      </Container>
    </section>
  );
}

function ProjectLayer({
  project,
  index: i,
  count,
  s,
}: {
  project: Project;
  index: number;
  count: number;
  s: MotionValue<number>;
}) {
  const reduce = useReducedMotion();
  const first = i === 0;
  const last = i === count - 1;
  const k = reduce ? 0 : 1;

  // Wipe in from the bottom over the previous project (the first is already there).
  const clip = useTransform(
    s,
    [i - 0.35, i + 0.05],
    first || reduce ? ["inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)"] : ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]
  );
  const opacity = useTransform(s, [i - 0.35, i - 0.05], first || !reduce ? [1, 1] : [0, 1]);
  const zoom = useTransform(s, [i - 0.35, i + 0.5], first ? [1, 1] : [1 + 0.12 * k, 1]);

  // The split: offset on arrival, joined through the middle of the turn, parting at the end.
  const stops = first ? [i, i + 0.75, i + 1.15] : last ? [i - 0.3, i + 0.25, i + 1] : [i - 0.3, i + 0.25, i + 0.75, i + 1.15];
  const shape = (amount: number) =>
    first ? ["0svh", "0svh", `${-amount * k}svh`] : last ? [`${amount * k}svh`, "0svh", "0svh"] : [`${amount * k}svh`, "0svh", "0svh", `${-amount * k}svh`];
  const invert = (v: string[]) => v.map((x) => (x.startsWith("-") ? x.slice(1) : x === "0svh" ? x : `-${x}`));

  const paneUp = useTransform(s, stops, shape(8));
  const paneDown = useTransform(s, stops, invert(shape(8)));
  const titleUp = useTransform(s, stops, shape(14));
  const titleDown = useTransform(s, stops, invert(shape(14)));

  const factsOpacity = useTransform(
    s,
    first ? [i, i + 0.7, i + 0.85] : last ? [i + 0.05, i + 0.25, i + 1] : [i + 0.05, i + 0.25, i + 0.7, i + 0.85],
    first ? [1, 1, 0] : last ? [0, 1, 1] : [0, 1, 1, 0]
  );

  const years = formatYearRange(project.yearFrom, project.yearTo);
  const titleSize = project.title.length > 22 ? "text-head" : "text-mega";
  const titleClass = `condensed absolute max-w-[18ch] text-balance text-center leading-[0.9] tracking-[-0.03em] text-papir ${titleSize}`;

  return (
    <motion.article
      className="absolute inset-0"
      style={{ clipPath: clip, opacity, zIndex: i + 1 }}
      aria-roledescription="reference"
    >
      <motion.div className="absolute inset-0" style={{ scale: zoom }}>
        <Pane side="left" y={paneUp} project={project} priority={first} />
        <Pane side="right" y={paneDown} project={project} priority={first} />
      </motion.div>

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-5">
        <motion.h3 style={{ y: titleUp }} className={`${titleClass} [clip-path:inset(-20%_50%_-20%_-20%)]`}>
          {project.title}
        </motion.h3>
        <motion.p aria-hidden="true" style={{ y: titleDown }} className={`${titleClass} [clip-path:inset(-20%_-20%_-20%_50%)]`}>
          {project.title}
        </motion.p>
      </div>

      <motion.div style={{ opacity: factsOpacity }} className="absolute inset-x-0 bottom-0 px-5 pb-8 sm:pb-12">
        <dl className="mx-auto flex max-w-3xl flex-wrap justify-center gap-x-8 gap-y-2 text-center text-small text-papir sm:text-body">
          {project.investor && (
            <div className="flex gap-2">
              <dt className="text-mlha">Investor</dt>
              <dd>{project.investor}</dd>
            </div>
          )}
          <div className="flex gap-2">
            <dt className="text-mlha">Místo</dt>
            <dd>{getProjectLocation(project)}</dd>
          </div>
          {years !== "—" && (
            <div className="flex gap-2">
              <dt className="text-mlha">Termín</dt>
              <dd className="tabular">{years}</dd>
            </div>
          )}
        </dl>
        <div className="mt-4 flex justify-center">
          <Link
            href={`/reference/${project.slug.current}`}
            className="inline-flex min-h-[2.75rem] items-center gap-2 text-body text-oranzova underline decoration-oranzova/40 underline-offset-[6px] transition-colors hover:decoration-oranzova"
          >
            Detail stavby
            <span className="sr-only">: {project.title}</span>
          </Link>
        </div>
      </motion.div>
    </motion.article>
  );
}

function Pane({
  side,
  y,
  project,
  priority,
}: {
  side: "left" | "right";
  y: MotionValue<string>;
  project: Project;
  priority: boolean;
}) {
  return (
    <motion.div
      style={{ y }}
      className={`absolute top-[-10svh] h-[120svh] w-1/2 overflow-hidden will-change-transform ${side === "left" ? "left-0" : "left-1/2"}`}
      aria-hidden="true"
    >
      <div className={`absolute inset-y-0 w-[100vw] ${side === "left" ? "left-0" : "-left-[50vw]"}`}>
        <SanityImage
          image={project.coverImage}
          alt=""
          fill
          priority={priority}
          className="object-cover brightness-[0.55]"
          sizes="100vw"
        />
      </div>
    </motion.div>
  );
}
