import { Container } from "@/components/ui/Container";
import { MaskLines, Reveal, RevealItem } from "@/components/motion/Reveal";
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
  // Five disciplines: the first one tall on the left, four in a 2×2 beside it.
  const bento = services.length === 5;

  return (
    <section className="bg-podklad text-grafit">
      <Container className="flex flex-col gap-8 py-10 lg:h-[calc(100svh-var(--header-height))] lg:min-h-[40rem] lg:py-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <MaskLines as="h1" onMount className="condensed text-head" lines={["Co stavíme"]} />
          <Reveal className="max-w-[52ch]">
            <RevealItem as="p" className="text-body text-grafit">
              Stavíme pro veřejný i soukromý sektor. Každý obor vychází
              z ověřitelných referencí a vlastní stavební kapacity.
            </RevealItem>
          </Reveal>
        </div>

        <Reveal
          stagger={0.07}
          className={`grid flex-1 gap-3 sm:grid-cols-2 lg:min-h-0 ${
            bento ? "lg:grid-cols-[1.35fr_1fr_1fr] lg:grid-rows-2" : "lg:grid-cols-3 lg:auto-rows-fr"
          }`}
        >
          {services.map((service, index) => (
            <RevealItem
              key={service._id}
              className={`flex lg:min-h-0 [&>*]:flex-1 ${
                bento && index === 0 ? "sm:col-span-2 lg:col-span-1 lg:row-span-2" : ""
              }`}
            >
              <ServiceCard service={service} index={index} featured={bento && index === 0} />
            </RevealItem>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
