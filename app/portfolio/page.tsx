import ScrollReveal from "@/components/ScrollReveal";
import ProjectCard from "@/components/ProjectCard";
import { getAllProjects } from "@/lib/sanity/queries";
import PortfolioClient from "@/components/PortfolioClient";

export const revalidate = 60;

export default async function PortfolioPage() {
  const projects = await getAllProjects();

  return (
    <div className="pt-32 md:pt-40 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <ScrollReveal>
          <p className="font-mono text-[10px] tracking-[0.5em] text-gold uppercase mb-6">Portfolio</p>
          <h1 className="font-display text-[clamp(3rem,8vw,7rem)] leading-none text-cream mb-16">
            Selected Works
          </h1>
        </ScrollReveal>

        <PortfolioClient projects={projects} />
      </div>
    </div>
  );
}
