import { notFound } from "next/navigation";
import Link from "next/link";
import { ReferenceSheet } from "@/components/ui/ReferenceSheet";
import { isSanityConfigured } from "@/lib/sanity/client";
import { urlFor } from "@/lib/sanity/image";
import { createPageMetadata } from "@/lib/seo/metadata";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/sanity/queries";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return createPageMetadata({
      title: "Realizace nenalezena",
      path: `/reference/${slug}`,
    });
  }

  let ogImage: string | undefined;
  if (isSanityConfigured) {
    try {
      ogImage = urlFor(project.coverImage).width(1200).height(630).url();
    } catch {
      ogImage = undefined;
    }
  }

  return createPageMetadata({
    title: `${project.title} — reference MIBORO`,
    description:
      project.scope ||
      `Reference stavební firmy MIBORO: ${project.title}.`,
    path: `/reference/${slug}`,
    ogImage,
  });
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <>
      <div className="border-b border-border bg-svetly">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/reference"
            className="text-sm font-medium text-sedy hover:text-oranzova"
          >
            ← Zpět na reference
          </Link>
        </div>
      </div>
      <ReferenceSheet project={project} />
    </>
  );
}
