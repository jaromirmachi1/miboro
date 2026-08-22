import type { Project } from "@/lib/sanity/types";

export function getProjectLocation(project: Project): string {
  if (project.location) {
    return project.location;
  }

  return "Moravskoslezský kraj";
}
