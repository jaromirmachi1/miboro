import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { PageShell } from "@/components/layout/PageShell";
import { ProjectFilter } from "@/components/ui/ProjectFilter";
import { createPageMetadata } from "@/lib/seo/metadata";
import { getProjects } from "@/lib/sanity/queries";

export const metadata = createPageMetadata({
  title: "Reference — realizace stavební firmy MIBORO",
  description:
    "Seznam realizací MIBORO: probíhající i dokončené projekty ve veřejném a soukromém sektoru v Ostravě a Moravskoslezském kraji.",
  path: "/reference",
});

export default async function ReferencePage() {
  const projects = await getProjects();
  const completedCount = projects.filter(
    (project) => project.status === "completed"
  ).length;
  const ongoingCount = projects.filter(
    (project) => project.status === "ongoing"
  ).length;

  return (
    <>
      <section className="bg-grafit text-bila">
        <Container className="py-14 lg:py-20">
          <FadeIn>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-bila/60">
              Portfolio
            </p>
            <h1 className="mt-3 font-display text-4xl font-bold uppercase leading-[1.05] sm:text-5xl lg:text-6xl">
              Reference
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-bila/75 sm:text-lg">
              Ověřitelné realizace pro veřejné instituce i soukromé investory.
              Každý projekt dokumentujeme v tendrovém formátu — investor, rozsah,
              termín a výsledek.
            </p>

            <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-6 border-t border-bila/10 pt-8 sm:gap-x-14">
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-bila/50">
                  Realizací celkem
                </dt>
                <dd className="mt-1 font-display text-3xl font-bold text-oranzova">
                  {projects.length}
                </dd>
              </div>
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-bila/50">
                  Dokončených
                </dt>
                <dd className="mt-1 font-display text-3xl font-bold text-bila">
                  {completedCount}
                </dd>
              </div>
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-bila/50">
                  Probíhajících
                </dt>
                <dd className="mt-1 font-display text-3xl font-bold text-bila">
                  {ongoingCount}
                </dd>
              </div>
            </dl>
          </FadeIn>
        </Container>
      </section>

      <PageShell>
        <ProjectFilter projects={projects} />
      </PageShell>
    </>
  );
}
