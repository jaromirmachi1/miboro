import type { StatBarData } from "@/lib/sanity/types";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";

interface HomeStatsProps {
  data: StatBarData;
}

export function HomeStats({ data }: HomeStatsProps) {
  const stats = [
    {
      value: `${data.projectCount}+`,
      label: "realizovaných projektů",
      icon: BuildingIcon,
    },
    {
      value: data.employeeCount,
      label: "specialistů v týmu",
      icon: TeamIcon,
    },
    {
      value: data.selfPerformedPercent,
      label: "realizace vlastní kapacitou",
      icon: CapacityIcon,
    },
    {
      value: `${data.yearsOnMarket}+`,
      label: `let zkušeností (od ${data.yearFounded})`,
      icon: CalendarIcon,
    },
    {
      value: data.annualRevenue,
      label: "roční obrat firmy",
      icon: RevenueIcon,
    },
  ];

  return (
    <section
      aria-label="Klíčové ukazatele firmy"
      className="border-y border-bila/10 bg-grafit py-10 lg:py-12"
    >
      <Container>
        <FadeIn>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5 lg:gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center lg:text-left">
                <stat.icon className="mx-auto mb-3 text-oranzova lg:mx-0" />
                <p className="font-display text-2xl font-bold text-oranzova sm:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-[11px] font-medium uppercase leading-snug tracking-[0.14em] text-bila">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}

function BuildingIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 21V8l8-4 8 4v13M8 21v-6h8v6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function TeamIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 20c0-3 2.5-5 6-5s6 2 6 5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function CapacityIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3v18M3 12h18M7 7l10 10M17 7L7 17" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function RevenueIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 18V6M8 18V10M12 18V4M16 18V12M20 18V8" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
