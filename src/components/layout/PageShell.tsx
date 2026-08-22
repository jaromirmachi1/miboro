import { Container } from "@/components/ui/Container";

interface PageShellProps {
  children: React.ReactNode;
}

export function PageShell({ children }: PageShellProps) {
  return <Container className="py-16 lg:py-20">{children}</Container>;
}
