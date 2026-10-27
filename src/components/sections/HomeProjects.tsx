"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { getProjectLocation } from "@/lib/projects";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SanityImage } from "@/components/ui/SanityImage";
import type { Project } from "@/lib/sanity/types";
import { formatYearRange } from "@/lib/utils/format";

interface HomeProjectsProps {
  projects: Project[];
}

/**
 * Finished buildings, one per screen. Each photograph is cut down the middle;
 * while the project crosses the screen the left half rises and the right half
 * sinks, tearing the picture and its name at the seam. They meet exactly when
 * the project is centred. Under each name, the facts of the site board that
 * stands at every Czech construction site: investor, place, dates.
 */
export function HomeProjects({ projects }: HomeProjectsProps) {
  if (projects.length === 0) return null;

  return (
    <section aria-labelledby="projects-heading" className="relative bg-grafit text-papir">
      <Container className="pb-10">
        <h2 id="projects-heading" className="condensed text-head">
          Dokončené stavby
        </h2>
      </Container>

      {projects.map((project, index) => (
        <TornProject key={project._id} project={project} priority={index === 0} />
      ))}

      <Container className="flex flex-col items-start gap-6 py-[clamp(5rem,10vw,9rem)] sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-[36ch] text-lead text-papir">
          Každou referenci doložíme investorem, rozsahem a termínem.
        </p>
        <Button href="/reference">Všechny reference</Button>
      </Container>
    </section>
  );
}

function TornProject({ project, priority }: { project: Project; priority: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  // Apart while entering, joined through the middle of the hold, apart again while leaving.
  const t = reduce ? 0 : 1;
  const stops = [0, 0.4, 0.6, 1];
  const paneUp = useTransform(scrollYProgress, stops, [`${16 * t}svh`, "0svh", "0svh", `${-16 * t}svh`]);
  const paneDown = useTransform(scrollYProgress, stops, [`${-16 * t}svh`, "0svh", "0svh", `${16 * t}svh`]);
  const titleUp = useTransform(scrollYProgress, stops, [`${26 * t}svh`, "0svh", "0svh", `${-26 * t}svh`]);
  const titleDown = useTransform(scrollYProgress, stops, [`${-26 * t}svh`, "0svh", "0svh", `${26 * t}svh`]);
  const factsOpacity = useTransform(scrollYProgress, [0.3, 0.4, 0.6, 0.7], [0, 1, 1, 0]);

  const years = formatYearRange(project.yearFrom, project.yearTo);
  const long = project.title.length > 22;
  const titleSize = long ? "text-head" : "text-mega";

  return (
    <article ref={ref} className="relative h-[170svh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <Pane side="left" y={paneUp} project={project} priority={priority} />
        <Pane side="right" y={paneDown} project={project} priority={priority} />

        {/* The name, set twice and clipped to each half. Screen readers get the first copy. */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-5">
          <motion.h3
            style={{ y: titleUp }}
            className={`condensed absolute max-w-[18ch] text-balance text-center leading-[0.9] tracking-[-0.03em] text-papir [clip-path:inset(-20%_50%_-20%_-20%)] ${titleSize}`}
          >
            {project.title}
          </motion.h3>
          <motion.p
            aria-hidden="true"
            style={{ y: titleDown }}
            className={`condensed absolute max-w-[18ch] text-balance text-center leading-[0.9] tracking-[-0.03em] text-papir [clip-path:inset(-20%_-20%_-20%_50%)] ${titleSize}`}
          >
            {project.title}
          </motion.p>
        </div>

        <motion.div
          style={{ opacity: reduce ? 1 : factsOpacity }}
          className="absolute inset-x-0 bottom-0 px-5 pb-8 sm:pb-12"
        >
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
              className="pointer-events-auto inline-flex min-h-[2.75rem] items-center gap-2 text-body text-oranzova underline decoration-oranzova/40 underline-offset-[6px] transition-colors hover:decoration-oranzova"
            >
              Detail stavby
              <span className="sr-only">: {project.title}</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </article>
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
      className={`absolute top-[-18svh] h-[136svh] w-1/2 overflow-hidden ${side === "left" ? "left-0" : "left-1/2"}`}
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
