import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { getProjectBySlug, getAllProjects } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import ScrollReveal from "@/components/ScrollReveal";

export const revalidate = 60;

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects
    .filter((p) => p?.slug?.current)
    .map((p) => ({ slug: p.slug.current }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} — TukTuk Studio`,
    description: project.shortDescription,
  };
}

const portableTextComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="font-body text-base text-silver leading-loose mb-6">{children}</p>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="font-display text-xl text-cream/80 border-l-2 border-gold pl-6 my-6 italic">{children}</blockquote>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-semibold text-pearl">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic">{children}</em>
    ),
  },
};

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [project, allProjects] = await Promise.all([
    getProjectBySlug(slug),
    getAllProjects(),
  ]);

  if (!project) notFound();

  const currentIndex = allProjects.findIndex((p) => p?.slug?.current === slug);
  const nextProject = allProjects.length > 1 ? allProjects[(currentIndex + 1) % allProjects.length] : null;
  const coverImageUrl = urlFor(project.coverImage).width(1600).height(700).url();

  return (
    <div className="pt-32 md:pt-40 pb-0">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <ScrollReveal>
          <Link href="/portfolio" className="inline-flex items-center gap-3 font-mono text-[10px] tracking-[0.3em] text-silver hover:text-gold uppercase transition-colors duration-300 mb-12">
            <span className="w-6 h-px bg-current" />
            Back to Portfolio
          </Link>
        </ScrollReveal>
        <ScrollReveal delay={50}>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.roles?.map((r: string) => (
              <span key={r} className="font-mono text-[9px] tracking-[0.2em] text-gold uppercase border border-gold/30 px-3 py-1">{r}</span>
            ))}
          </div>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <h1 className="font-display text-[clamp(2.5rem,8vw,7rem)] leading-none text-cream mb-4">{project.title}</h1>
          <p className="font-mono text-[11px] tracking-[0.3em] text-silver uppercase">
            {project.year}
            {project.genre && <> &nbsp;·&nbsp; {project.genre}</>}
            {project.director && <> &nbsp;·&nbsp; Dir. {project.director}</>}
            {project.production && <> &nbsp;·&nbsp; {project.production}</>}
          </p>
        </ScrollReveal>
      </div>

      <ScrollReveal>
        <div className="relative w-full aspect-[21/9] overflow-hidden">
          <Image src={coverImageUrl} alt={project.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent" />
        </div>
      </ScrollReveal>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-7">
            <ScrollReveal>
              <p className="font-mono text-[10px] tracking-[0.5em] text-gold uppercase mb-8">About the Project</p>
              <p className="font-display text-2xl md:text-3xl text-cream leading-relaxed mb-8">{project.shortDescription}</p>
              {project.fullDescription && project.fullDescription.length > 0 && (
                <PortableText value={project.fullDescription} components={portableTextComponents} />
              )}
            </ScrollReveal>

            {/* 外部連結按鈕 */}
            {(project as any).externalUrl && (
              <ScrollReveal delay={100}>
                <div className="mt-10">
                  <a
                    href={(project as any).externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-4 px-10 py-4 border border-gold/40 hover:border-gold transition-colors duration-500"
                  >
                    <span className="font-mono text-xs tracking-[0.3em] text-gold uppercase">
                      Watch on Instagram
                    </span>
                    <span className="w-6 h-px bg-gold" />
                  </a>
                </div>
              </ScrollReveal>
            )}
          </div>

          <div className="lg:col-span-5">
            <ScrollReveal delay={100}>
              <div className="border border-white/8 p-8">
                <p className="font-mono text-[10px] tracking-[0.4em] text-gold uppercase mb-6">Project Info</p>
                <div className="space-y-5">
                  {[
                    { label: "Year", value: String(project.year ?? "") },
                    project.genre ? { label: "Genre", value: project.genre } : null,
                    project.director ? { label: "Director", value: project.director } : null,
                    project.production ? { label: "Production", value: project.production } : null,
                    { label: "Role", value: project.roles?.join(", ") ?? "" },
                  ].filter(Boolean).map((item: any) => (
                    <div key={item.label} className="flex flex-col gap-1 border-b border-white/5 pb-5 last:border-0 last:pb-0">
                      <span className="font-mono text-[9px] tracking-[0.3em] text-silver/50 uppercase">{item.label}</span>
                      <span className="font-body text-sm text-pearl">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {project.videoUrl && (
          <div className="mt-20 md:mt-28">
            <ScrollReveal>
              <p className="font-mono text-[10px] tracking-[0.5em] text-gold uppercase mb-8">Trailer</p>
              <div className="relative aspect-video w-full bg-ash border border-white/8 overflow-hidden">
                <iframe src={project.videoUrl} title={project.title} allowFullScreen className="absolute inset-0 w-full h-full" />
              </div>
            </ScrollReveal>
          </div>
        )}

        {project.galleryImages && project.galleryImages.length > 0 && (
          <div className="mt-20 md:mt-28">
            <ScrollReveal>
              <p className="font-mono text-[10px] tracking-[0.5em] text-gold uppercase mb-8">Stills</p>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
              {project.galleryImages.map((img: any, i: number) => (
                <ScrollReveal key={i} delay={i * 100}>
                  <div className="relative aspect-video overflow-hidden bg-ash">
                    <Image src={urlFor(img).width(1200).height(675).url()} alt={img.alt ?? `Still ${i + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        )}
      </div>

      {nextProject && nextProject.slug?.current && (
        <div className="border-t border-white/5">
          <Link href={`/portfolio/${nextProject.slug.current}`}>
            <div className="group relative overflow-hidden">
              <div className="relative h-64 md:h-80">
                <Image src={urlFor(nextProject.coverImage).width(1600).height(600).url()} alt={nextProject.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-obsidian/80 group-hover:bg-obsidian/70 transition-colors duration-500" />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8">
                  <p className="font-mono text-[10px] tracking-[0.5em] text-gold uppercase mb-4">Next Project</p>
                  <h2 className="font-display text-4xl md:text-6xl text-cream group-hover:text-gold transition-colors duration-300">{nextProject.title}</h2>
                  <p className="font-mono text-[10px] tracking-[0.2em] text-silver uppercase mt-3">
                    {nextProject.year}{nextProject.genre && ` — ${nextProject.genre}`}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}
