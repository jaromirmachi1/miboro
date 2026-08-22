import { createClient, type SanityClient } from "next-sanity";

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-08-22";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

export const isSanityConfigured = Boolean(projectId);

export function getClient(): SanityClient | null {
  if (!isSanityConfigured) return null;

  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: process.env.NODE_ENV === "production",
  });
}
