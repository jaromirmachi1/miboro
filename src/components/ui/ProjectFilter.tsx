"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/ui/ProjectCard";
import type { Project, ProjectSector, ProjectStatus } from "@/lib/sanity/types";

type StatusFilter = ProjectStatus | "all";
type SectorFilter = ProjectSector | "all";

interface ProjectFilterProps {
  projects: Project[];
}

const statusOptions: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "Všechny" },
  { value: "ongoing", label: "Probíhající" },
  { value: "completed", label: "Dokončené" },
];

const sectorOptions: { value: SectorFilter; label: string }[] = [
  { value: "all", label: "Všechny sektory" },
  { value: "public", label: "Veřejné" },
  { value: "private", label: "Soukromé" },
];

function FilterPills<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div>
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-grafit/45">
        {label}
      </p>
      <div className="flex flex-wrap gap-2" role="group" aria-label={label}>
        {options.map((option) => {
          const active = value === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              aria-pressed={active}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                active
                  ? "bg-grafit text-bila shadow-sm"
                  : "bg-black/[0.04] text-grafit hover:bg-black/[0.08]"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function ProjectFilter({ projects }: ProjectFilterProps) {
  const [status, setStatus] = useState<StatusFilter>("all");
  const [sector, setSector] = useState<SectorFilter>("all");

  const filtered = useMemo(() => {
    return projects.filter((project) => {
      const statusMatch = status === "all" || project.status === status;
      const sectorMatch = sector === "all" || project.sector === sector;
      return statusMatch && sectorMatch;
    });
  }, [projects, status, sector]);

  const featuredOngoing = useMemo(
    () => filtered.find((project) => project.status === "ongoing"),
    [filtered]
  );

  const showFeatured = Boolean(
    featuredOngoing && (status === "all" || status === "ongoing")
  );

  const gridProjects = useMemo(() => {
    if (!showFeatured || !featuredOngoing) return filtered;
    return filtered.filter((project) => project._id !== featuredOngoing._id);
  }, [filtered, featuredOngoing, showFeatured]);

  return (
    <div>
      <div className="flex flex-col gap-8 border-b border-black/8 pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col gap-8 sm:flex-row sm:gap-12">
          <FilterPills
            label="Stav"
            options={statusOptions}
            value={status}
            onChange={setStatus}
          />
          <FilterPills
            label="Sektor"
            options={sectorOptions}
            value={sector}
            onChange={setSector}
          />
        </div>

        <p className="text-sm text-grafit/50">
          {filtered.length}{" "}
          {filtered.length === 1 ? "realizace" : "realizací"}
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-16 rounded-2xl border border-dashed border-black/10 px-6 py-16 text-center">
          <p className="font-display text-lg font-semibold text-grafit">
            Žádné realizace v tomto výběru
          </p>
          <p className="mt-2 text-sm text-grafit/50">
            Zkuste upravit filtry stavu nebo sektoru.
          </p>
        </div>
      ) : (
        <>
          {showFeatured && featuredOngoing && (
            <div className="mt-10">
              <ProjectCard project={featuredOngoing} featured />
            </div>
          )}
          <div
            className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-8 ${
              showFeatured ? "mt-8" : "mt-10"
            }`}
          >
            {gridProjects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
