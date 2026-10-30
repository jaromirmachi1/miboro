import Link from "next/link";
import { getProjectLocation } from "@/lib/projects";
import { SanityImage } from "@/components/ui/SanityImage";
import type { Project } from "@/lib/sanity/types";
import { formatYearRange, sectorLabels, statusLabels } from "@/lib/utils/format";

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const yearLabel = formatYearRange(project.yearFrom, project.yearTo);

  return (
    <article>
      <Link
        href={`/reference/${project.slug.current}`}
        className="group block"
      >
        <div
          className={`relative overflow-hidden bg-black ${
            featured ? "aspect-[16/10] lg:aspect-[21/9]" : "aspect-[4/5]"
          }`}
        >
          <SanityImage
            image={project.coverImage}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            sizes={
              featured
                ? "(max-width: 1024px) 100vw, 66vw"
                : "(max-width: 768px) 100vw, 33vw"
            }
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/10 transition-opacity duration-300 group-hover:from-black/95" />

          <div className="absolute left-4 top-4 flex flex-wrap gap-2 sm:left-5 sm:top-5">
            <span className="rounded-full bg-oranzova px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-grafit">
              {statusLabels[project.status]}
            </span>
            {project.sector && (
              <span className="rounded-full border border-bila/25 bg-black/30 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-bila backdrop-blur-sm">
                {sectorLabels[project.sector]}
              </span>
            )}
          </div>

          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
            {project.projectType && (
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-oranzova">
                {project.projectType}
              </p>
            )}
            <h2
              className={`mt-1 font-display font-bold uppercase leading-tight text-bila transition-colors group-hover:text-oranzova ${
                featured ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl"
              }`}
            >
              {project.title}
            </h2>
            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-bila/75">
              <span>{getProjectLocation(project)}</span>
              {yearLabel !== "—" && (
                <>
                  <span aria-hidden="true" className="text-bila/30">
                    ·
                  </span>
                  <span>{yearLabel}</span>
                </>
              )}
            </div>
            {project.investor && (
              <p className="mt-2 text-sm text-bila/60">{project.investor}</p>
            )}
          </div>
        </div>

        <span className="mt-3 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-sedy transition-colors group-hover:text-grafit">
          Detail projektu
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          >
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </Link>
    </article>
  );
}
