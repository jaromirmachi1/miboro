import createImageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { dataset, projectId } from "./client";

const builder = projectId
  ? createImageUrlBuilder({ projectId, dataset })
  : null;

export function urlFor(source: SanityImageSource) {
  if (!builder) {
    throw new Error("Sanity project ID is not configured");
  }
  return builder.image(source);
}
