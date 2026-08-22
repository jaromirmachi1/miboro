import Image from "next/image";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { ArchitecturalPlate } from "@/components/ui/ArchitecturalPlate";
import { getProjectImageSrc } from "@/config/projectImages";
import { isSanityConfigured } from "@/lib/sanity/client";
import { urlFor } from "@/lib/sanity/image";

interface SanityImageProps {
  image: SanityImageSource;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

function isFallbackImage(image: SanityImageSource): boolean {
  return (
    typeof image === "object" &&
    image !== null &&
    "asset" in image &&
    typeof image.asset === "object" &&
    image.asset !== null &&
    "_ref" in image.asset &&
    typeof image.asset._ref === "string" &&
    image.asset._ref.startsWith("fallback")
  );
}

function getFallbackSrc(image: SanityImageSource): string | null {
  if (
    typeof image === "object" &&
    image !== null &&
    "asset" in image &&
    typeof image.asset === "object" &&
    image.asset !== null &&
    "_ref" in image.asset &&
    typeof image.asset._ref === "string"
  ) {
    return getProjectImageSrc(image.asset._ref);
  }

  return null;
}

export function SanityImage({
  image,
  alt,
  fill,
  width = 1200,
  height = 800,
  className,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority,
}: SanityImageProps) {
  if (!isSanityConfigured || isFallbackImage(image)) {
    const fallbackSrc = getFallbackSrc(image);
    if (fallbackSrc) {
      if (fill) {
        return (
          <Image
            src={fallbackSrc}
            alt={alt}
            fill
            className={className}
            sizes={sizes}
            priority={priority}
          />
        );
      }
      return (
        <Image
          src={fallbackSrc}
          alt={alt}
          width={width}
          height={height}
          className={className}
          sizes={sizes}
          priority={priority}
        />
      );
    }

    return (
      <ArchitecturalPlate
        seed={alt}
        className={`${fill ? "!absolute inset-0 h-full w-full" : ""} ${className || ""}`}
      />
    );
  }

  const src = urlFor(image).width(width).height(height).auto("format").url();

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={className}
        sizes={sizes}
        priority={priority}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      sizes={sizes}
      priority={priority}
    />
  );
}
