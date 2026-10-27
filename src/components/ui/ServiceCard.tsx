import Image from "next/image";
import { getServiceImage } from "@/config/serviceImages";
import type { Service } from "@/lib/sanity/types";

interface ServiceCardProps {
  service: Service;
  index: number;
  featured?: boolean;
}

/**
 * One discipline as a photographic tile. The name sits bottom-left on a
 * neutral scrim; on hover (or focus) the photo pushes in, the description
 * rises and the yellow corner from the MIBORO mark appears top-right.
 * On phones the description is always shown.
 */
export function ServiceCard({ service, index, featured = false }: ServiceCardProps) {
  const anchor = service.slug?.current || `sluzba-${index + 1}`;

  return (
    <article
      id={anchor}
      tabIndex={0}
      className="group relative isolate flex min-h-[18rem] scroll-mt-28 flex-col justify-end overflow-hidden bg-ocel outline-none lg:min-h-0"
    >
      <Image
        src={getServiceImage(service, index)}
        alt=""
        fill
        priority={index < 2}
        className="-z-10 object-cover brightness-[0.72] transition-transform duration-[1.2s] ease-out group-hover:scale-105 group-focus-visible:scale-105"
        sizes={featured ? "(max-width: 1024px) 100vw, 34vw" : "(max-width: 1024px) 100vw, 33vw"}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(14,14,12,0.9)_0%,rgba(14,14,12,0.35)_45%,rgba(14,14,12,0)_75%)]"
      />

      <span
        aria-hidden="true"
        className="absolute right-5 top-5 h-6 w-6 scale-50 opacity-0 transition-[transform,opacity] duration-500 ease-out group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100"
      >
        <svg viewBox="0 0 24 24" className="h-full w-full">
          <path d="M0 0h24v24h-8V8H0z" fill="#FFD700" />
        </svg>
      </span>

      <div className="p-6 sm:p-7">
        <h2 className={`condensed text-papir ${featured ? "text-head" : "text-lead"}`}>
          {service.title}
        </h2>
        {service.shortDescription && (
          <div className="grid transition-[grid-template-rows] duration-500 ease-out lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr] lg:group-focus-visible:grid-rows-[1fr]">
            <p className="max-w-[44ch] overflow-hidden text-body text-papir lg:opacity-0 lg:transition-opacity lg:duration-500 lg:group-hover:opacity-100 lg:group-focus-visible:opacity-100">
              <span className="block pt-3">{service.shortDescription}</span>
            </p>
          </div>
        )}
      </div>
    </article>
  );
}
