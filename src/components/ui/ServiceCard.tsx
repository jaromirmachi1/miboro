import Image from "next/image";
import { getServiceImage } from "@/config/serviceImages";
import { FadeIn } from "@/components/ui/FadeIn";
import type { Service } from "@/lib/sanity/types";

interface ServiceCardProps {
  service: Service;
  index: number;
}

export function ServiceCard({ service, index }: ServiceCardProps) {
  const anchor = service.slug?.current || `sluzba-${index + 1}`;
  const imageSrc = getServiceImage(service, index);

  return (
    <FadeIn delay={index * 0.05}>
      <article
        id={anchor}
        className="scroll-mt-24 overflow-hidden border border-border bg-bila"
      >
        <div className="relative aspect-[21/9] overflow-hidden bg-black sm:aspect-[3/1]">
          <Image
            src={imageSrc}
            alt={service.title}
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="p-6 sm:p-8">
          <p className="text-sm font-semibold text-oranzova">
            {String(index + 1).padStart(2, "0")}
          </p>
          <h2 className="mt-3 text-xl font-bold text-grafit">{service.title}</h2>
          {service.shortDescription && (
            <p className="mt-3 text-base leading-relaxed text-sedy">
              {service.shortDescription}
            </p>
          )}
        </div>
      </article>
    </FadeIn>
  );
}
