export const projectImagesByRef: Record<string, string> = {
  "fallback-manor": "/miboromanor.png",
  "fallback-zatepleni": "/images/realizace/detmarovice-elektrarna.jpg",
  "fallback-detmarovice": "/images/realizace/detmarovice-elektrarna.jpg",
  "fallback-verovice": "/images/zpevneniplochy.jpg",
  "fallback-kravare-ms": "/images/kravare.jpg",
  "fallback-ongoing": "/images/reconstruction.jpg",
};

export function getProjectImageSrc(ref: string): string | null {
  return projectImagesByRef[ref] ?? null;
}
