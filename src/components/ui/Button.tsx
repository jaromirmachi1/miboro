import Link from "next/link";
import type { ReactNode } from "react";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "outline-light";
  className?: string;
}

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const styles = {
    primary:
      "bg-oranzova text-bila hover:bg-[#E6C200]",
    outline:
      "border border-grafit text-grafit hover:bg-grafit hover:text-bila",
    "outline-light":
      "border border-bila/40 text-bila hover:border-bila hover:bg-bila/10",
  };

  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center px-6 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] transition-colors ${styles[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
