import Link from "next/link";
import type { ReactNode } from "react";

interface TextLinkProps {
  href: string;
  children: ReactNode;
  light?: boolean;
}

export function TextLink({ href, children, light = false }: TextLinkProps) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-3 text-[13px] font-medium tracking-wide ${
        light ? "text-bila" : "text-grafit"
      }`}
    >
      <span className="border-b border-current pb-px transition-colors group-hover:border-oranzova group-hover:text-oranzova">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="transition-transform duration-300 group-hover:translate-x-1 group-hover:text-oranzova"
      >
        →
      </span>
    </Link>
  );
}
