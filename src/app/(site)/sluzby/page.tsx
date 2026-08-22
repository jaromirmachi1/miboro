import { FadeIn } from "@/components/ui/FadeIn";
import { PageShell } from "@/components/layout/PageShell";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { createPageMetadata } from "@/lib/seo/metadata";
import { getServices } from "@/lib/sanity/queries";

export const metadata = createPageMetadata({
  title: "Služby — generální dodávka staveb Ostrava",
  description:
    "Služby stavební firmy MIBORO: generální dodávka, rekonstrukce, inženýrské sítě, dopravní stavby a veřejné zakázky v Moravskoslezském kraji.",
  path: "/sluzby",
});

export default async function SluzbyPage() {
  const services = await getServices();

  return (
    <PageShell>
      <FadeIn>
        <h1 className="text-3xl font-bold text-grafit sm:text-4xl">Služby</h1>
        <p className="mt-4 max-w-2xl text-lg text-sedy">
          Realizujeme stavební projekty pro veřejný i soukromý sektor. Každý
          obor vychází z ověřitelných referencí a vlastní stavební kapacity.
        </p>
      </FadeIn>

      <div className="mt-12 space-y-6">
        {services.map((service, index) => (
          <ServiceCard key={service._id} service={service} index={index} />
        ))}
      </div>
    </PageShell>
  );
}
