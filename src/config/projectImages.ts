export const projectImagesByRef: Record<string, string> = {
  "fallback-manor": "/miboromanor.png",
  "fallback-zatepleni": "/images/zatepleni.jpg",
  "fallback-detmarovice": "/images/vystavba.jpg",
  "fallback-verovice": "/images/zpevneniplochy.jpg",
  "fallback-kravare-ms": "/images/kravare.jpg",
  "fallback-ongoing": "/images/reconstruction.jpg",
};

export function getProjectImageSrc(ref: string): string | null {
  return projectImagesByRef[ref] ?? null;
}
