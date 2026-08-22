import type { StatBarData } from "@/lib/sanity/types";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";

interface StatBarProps {
  data: StatBarData;
}

export function StatBar({ data }: StatBarProps) {
  const stats = [
    { value: `${data.yearsOnMarket}+`, label: "let na trhu" },
    { value: String(data.projectCount), label: "realizací" },
    { value: data.selfPerformedPercent, label: "vlastní kapacitou" },
    { value: data.annualRevenue, label: "roční obrat" },
  ];

  return (
    <section
      aria-label="Klíčové ukazatele firmy"
      className="border-b border-border bg-bila"
    >
      <Container>
        <FadeIn>
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`py-10 lg:py-14 ${
                  index % 2 === 1 ? "pl-6 sm:pl-10" : "pr-6 sm:pr-10"
                } ${
                  index >= 2 ? "border-t border-border lg:border-t-0" : ""
                } ${
                  index > 0 ? "lg:border-l lg:border-border lg:pl-10" : ""
                }`}
              >
                <p className="font-display text-4xl font-semibold text-oranzova sm:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-3 text-label">{stat.label}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
