import { SanityImage } from "@/components/ui/SanityImage";
import type { Project } from "@/lib/sanity/types";
import {
  formatYearRange,
  sectorLabels,
  statusLabels,
} from "@/lib/utils/format";

interface ReferenceSheetProps {
  project: Project;
}

interface DetailRowProps {
  label: string;
  value?: string | number;
}

function DetailRow({ label, value }: DetailRowProps) {
  if (!value) return null;

  return (
    <div className="grid gap-1 border-b border-border py-4 sm:grid-cols-[200px_1fr]">
      <dt className="text-sm font-semibold text-grafit">{label}</dt>
      <dd className="text-sm text-sedy">{value}</dd>
    </div>
  );
}

interface TextSectionProps {
  title: string;
  content?: string;
}

function TextSection({ title, content }: TextSectionProps) {
  if (!content) return null;

  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold text-grafit">{title}</h2>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-sedy whitespace-pre-line">
        {content}
      </p>
    </section>
  );
}

export function ReferenceSheet({ project }: ReferenceSheetProps) {
  return (
    <article>
      <div className="relative aspect-[21/9] w-full overflow-hidden bg-ocel">
        <SanityImage
          image={project.coverImage}
          alt={project.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-2">
          <span className="inline-block bg-svetly px-2.5 py-1 text-xs font-medium text-grafit">
            {statusLabels[project.status]}
          </span>
          {project.sector && (
            <span className="inline-block bg-svetly px-2.5 py-1 text-xs font-medium text-sedy">
              {sectorLabels[project.sector]}
            </span>
          )}
        </div>

        <h1 className="mt-4 text-3xl font-bold text-grafit sm:text-4xl">
          {project.title}
        </h1>

        <dl className="mt-8">
          <DetailRow label="Investor" value={project.investor} />
          <DetailRow label="Typ projektu" value={project.projectType} />
          <DetailRow
            label="Období realizace"
            value={formatYearRange(project.yearFrom, project.yearTo)}
          />
          <DetailRow label="Rozpočet" value={project.budget} />
          <DetailRow label="Rozsah prací" value={project.scope} />
        </dl>

        <TextSection title="Výzva" content={project.challenge} />
        <TextSection title="Řešení" content={project.solution} />
        <TextSection title="Výsledek" content={project.outcome} />

        {project.gallery && project.gallery.length > 0 && (
          <section className="mt-14">
            <h2 className="text-xl font-bold text-grafit">Fotogalerie</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {project.gallery.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-[4/3] overflow-hidden bg-ocel"
                >
                  <SanityImage
                    image={image}
                    alt={`${project.title} — fotografie ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
