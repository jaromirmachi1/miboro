import Link from "next/link";
import { getProjectLocation } from "@/lib/projects";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { SanityImage } from "@/components/ui/SanityImage";
import type { Project } from "@/lib/sanity/types";

interface HomeProjectsProps {
  projects: Project[];
}

export function HomeProjects({ projects }: HomeProjectsProps) {
  if (projects.length === 0) return null;

  return (
    <section className="bg-grafit py-16 text-bila lg:py-24">
      <Container>
        <FadeIn>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-bila/95">
                Reference
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold uppercase sm:text-4xl">
                Dokončené projekty
              </h2>
            </div>
            <Link
              href="/reference"
              className="text-[13px] font-semibold uppercase tracking-[0.12em] text-oranzova hover:text-bila"
            >
              Zobrazit vše →
            </Link>
          </div>
        </FadeIn>

        <div className="-mx-5 mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 lg:mx-0 lg:grid lg:grid-cols-5 lg:gap-4 lg:overflow-visible lg:px-0 lg:pb-0">
          {projects.map((project, index) => (
            <FadeIn
              key={project._id}
              delay={index * 0.05}
              className="w-[72vw] shrink-0 snap-start sm:w-[45vw] lg:w-auto"
            >
              <Link
                href={`/reference/${project.slug.current}`}
                className="group block"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-ocel">
                  <SanityImage
                    image={project.coverImage}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 45vw, 20vw"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="font-display text-sm font-bold uppercase leading-snug group-hover:text-oranzova">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.16em] text-bila/95">
                    {getProjectLocation(project)}
                  </p>
                  {project.projectType && (
                    <span className="mt-3 inline-block border border-bila/25 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-bila/90">
                      {project.projectType}
                    </span>
                  )}
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
