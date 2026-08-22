import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export type ProjectStatus = "ongoing" | "completed";
export type ProjectSector = "public" | "private";

export interface SanitySlug {
  current: string;
}

export interface Project {
  _id: string;
  title: string;
  slug: SanitySlug;
  status: ProjectStatus;
  sector?: ProjectSector;
  investor?: string;
  location?: string;
  projectType?: string;
  yearFrom?: number;
  yearTo?: number;
  budget?: string;
  scope?: string;
  challenge?: string;
  solution?: string;
  outcome?: string;
  coverImage: SanityImageSource;
  gallery?: SanityImageSource[];
  featured?: boolean;
}

export interface Service {
  _id: string;
  title: string;
  slug?: SanitySlug;
  shortDescription?: string;
  order?: number;
}

export interface CompanyInfo {
  phone?: string;
  email?: string;
  address?: string;
  ico?: string;
  dic?: string;
  yearFounded?: number;
  employeeCount?: string;
  annualRevenue?: string;
  selfPerformedPercent?: string;
}

export interface StatBarData {
  yearsOnMarket: number;
  projectCount: number;
  selfPerformedPercent: string;
  annualRevenue: string;
  employeeCount: string;
  yearFounded: number;
}
