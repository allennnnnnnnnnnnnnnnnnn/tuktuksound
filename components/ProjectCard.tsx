import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/lib/sanity/image";
import type { Project } from "@/lib/sanity/types";

interface ProjectCardProps {
  project: Project;
  aspectRatio?: "3/4" | "4/5";
}

export default function ProjectCard({ project, aspectRatio = "4/5" }: ProjectCardProps) {
  const imageUrl = urlFor(project.coverImage).width(800).height(1000).url();

  return (
    <Link href={`/portfolio/${project.slug.current}`}>
      <div
        className="project-card bg-ash relative"
        style={{ aspectRatio }}
      >
        <Image
          src={imageUrl}
          alt={project.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="overlay" />

        {project.genre && (
          <div className="absolute top-5 right-5 z-10">
            <span className="font-mono text-[9px] tracking-[0.2em] text-silver/70 uppercase">
              {project.genre}
            </span>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.roles.map((r) => (
              <span
                key={r}
                className="font-mono text-[8px] tracking-[0.15em] text-gold/80 uppercase border border-gold/20 px-2 py-1"
              >
                {r}
              </span>
            ))}
          </div>
          <h2 className="font-display text-2xl md:text-3xl text-cream leading-tight">
            {project.title}
          </h2>
          <p className="font-mono text-[10px] tracking-[0.2em] text-silver mt-1.5">
            {project.year}
          </p>
          <p className="font-body text-sm text-silver/70 mt-3 leading-relaxed line-clamp-2">
            {project.shortDescription}
          </p>
        </div>
      </div>
    </Link>
  );
}
