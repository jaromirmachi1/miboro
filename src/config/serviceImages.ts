import type { Service } from "@/lib/sanity/types";

export const serviceImagesBySlug: Record<string, string> = {
  "generalni-dodavka": "/images/vystavba.jpg",
  rekonstrukce: "/images/reconstruction.jpg",
  "inzenyrske-site": "/images/zemniprace.jpg",
  "dopravni-stavby": "/images/fasady.jpg",
  "verejne-zakazky": "/images/verejnezakazky.jpg",
};

export const serviceImagesByOrder = [
  "/images/vystavba.jpg",
  "/images/reconstruction.jpg",
  "/images/zemniprace.jpg",
  "/images/fasady.jpg",
  "/images/verejnezakazky.jpg",
] as const;

export function getServiceImage(service: Service, index: number): string {
  const slug = service.slug?.current;
  if (slug && serviceImagesBySlug[slug]) {
    return serviceImagesBySlug[slug];
  }
  return serviceImagesByOrder[index] ?? serviceImagesByOrder[0];
}
