import Image from "next/image";
import Link from "next/link";

interface MiboroLogoProps {
  className?: string;
  height?: number;
  href?: string;
  priority?: boolean;
}

export function MiboroLogo({
  className = "h-7 w-auto sm:h-8",
  height,
  href = "/",
  priority = false,
}: MiboroLogoProps) {
  const image = (
    <Image
      src="/images/miborologo-dark.svg"
      alt="MIBORO"
      width={2492}
      height={829}
      unoptimized
      priority={priority}
      className={height ? undefined : className}
      style={height ? { height, width: "auto" } : undefined}
    />
  );

  if (!href) {
    return <span className="inline-flex shrink-0">{image}</span>;
  }

  return (
    <Link
      href={href}
      className="inline-flex shrink-0"
      aria-label="MIBORO — domů"
    >
      {image}
    </Link>
  );
}
