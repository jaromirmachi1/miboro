import { fallbackCompanyInfo } from "@/config/site";
import { getClient } from "./client";
import type { CompanyInfo, Project, Service, StatBarData } from "./types";
import { fallbackProjects, fallbackServices } from "./fallback";

const projectFields = `
  _id,
  title,
  slug,
  status,
  sector,
  investor,
  location,
  projectType,
  yearFrom,
  yearTo,
  budget,
  scope,
  challenge,
  solution,
  outcome,
  coverImage,
  gallery,
  featured
`;

function findFallbackProject(slug: string) {
  return fallbackProjects.find((project) => project.slug.current === slug) ?? null;
}

export async function getCompanyInfo(): Promise<CompanyInfo> {
  const client = getClient();
  if (!client) return fallbackCompanyInfo;

  const data = await client.fetch<CompanyInfo | null>(
    `*[_type == "companyInfo" && _id == "companyInfo"][0]{
      phone, email, address, ico, dic, yearFounded,
      employeeCount, annualRevenue, selfPerformedPercent
    }`
  );

  return data || fallbackCompanyInfo;
}

export async function getProjects(): Promise<Project[]> {
  const client = getClient();
  if (!client) return fallbackProjects;

  const data = await client.fetch<Project[]>(
    `*[_type == "project"] | order(yearFrom desc) { ${projectFields} }`
  );

  return data.length > 0 ? data : fallbackProjects;
}

export async function getCompletedProjects(): Promise<Project[]> {
  const projects = await getProjects();
  return projects
    .filter((project) => project.status === "completed")
    .slice(0, 5);
}

export async function getOngoingProject(): Promise<Project | null> {
  const projects = await getProjects();
  return projects.find((project) => project.status === "ongoing") ?? null;
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const client = getClient();
  if (!client) {
    return findFallbackProject(slug);
  }

  const data = await client.fetch<Project | null>(
    `*[_type == "project" && slug.current == $slug][0]{ ${projectFields} }`,
    { slug }
  );

  return data;
}

export async function getServices(): Promise<Service[]> {
  const client = getClient();
  if (!client) return fallbackServices;

  const data = await client.fetch<Service[]>(
    `*[_type == "service"] | order(order asc) {
      _id, title, slug, shortDescription, order
    }`
  );

  return data.length > 0 ? data : fallbackServices;
}

export async function getStatBarData(): Promise<StatBarData> {
  const [company, projects] = await Promise.all([
    getCompanyInfo(),
    getProjects(),
  ]);

  const currentYear = new Date().getFullYear();
  const yearsOnMarket = company.yearFounded
    ? currentYear - company.yearFounded
    : currentYear - fallbackCompanyInfo.yearFounded;

  return {
    yearsOnMarket,
    projectCount: projects.length,
    selfPerformedPercent:
      company.selfPerformedPercent || fallbackCompanyInfo.selfPerformedPercent,
    annualRevenue:
      company.annualRevenue || fallbackCompanyInfo.annualRevenue,
    employeeCount:
      company.employeeCount || fallbackCompanyInfo.employeeCount,
    yearFounded: company.yearFounded || fallbackCompanyInfo.yearFounded,
  };
}

export async function getAllProjectSlugs(): Promise<string[]> {
  const projects = await getProjects();
  return projects.map((project) => project.slug.current);
}
