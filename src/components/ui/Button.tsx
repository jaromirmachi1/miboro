import Link from "next/link";
import type { ReactNode } from "react";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "outline-light";
  className?: string;
}

/**
 * Square-cornered action. On hover a second fill wipes up from the bottom
 * and the arrow steps right; both are transform-only.
 */
export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const styles = {
    primary: "bg-oranzova text-grafit",
    outline: "bg-transparent text-grafit ring-1 ring-inset ring-grafit hover:text-bila",
    "outline-light": "bg-transparent text-papir ring-1 ring-inset ring-papir/50 hover:text-grafit",
  };
  const wipe = {
    primary: "bg-papir",
    outline: "bg-grafit",
    "outline-light": "bg-papir",
  };

  return (
    <Link
      href={href}
      className={`group relative isolate inline-flex min-h-[3.25rem] items-center justify-center gap-3 overflow-hidden px-7 text-body font-semibold transition-[color,transform] duration-300 ease-out active:scale-[0.98] ${styles[variant]} ${className}`}
    >
      <span
        aria-hidden="true"
        className={`absolute inset-0 -z-10 translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0 group-focus-visible:translate-y-0 ${wipe[variant]}`}
      />
      {children}
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
        className="transition-transform duration-500 ease-out group-hover:translate-x-1"
      >
        <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </Link>
  );
}
