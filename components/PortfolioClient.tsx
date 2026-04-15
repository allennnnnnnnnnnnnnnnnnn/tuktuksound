"use client";

import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import ProjectCard from "@/components/ProjectCard";
import type { Project } from "@/lib/sanity/types";

const ALL_ROLES = ["All", "Sound Design", "Foley", "Dialogue Edit", "Re-recording Mix"];

export default function PortfolioClient({ projects }: { projects: Project[] }) {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.roles.includes(activeFilter));

  return (
    <>
      <ScrollReveal>
        <div className="flex flex-wrap gap-2 mb-16">
          {ALL_ROLES.map((role) => (
            <button
              key={role}
              onClick={() => setActiveFilter(role)}
              className={`font-mono text-[10px] tracking-[0.2em] uppercase px-4 py-2 border transition-all duration-300 ${
                activeFilter === role
                  ? "border-gold text-gold bg-gold/5"
                  : "border-white/10 text-silver hover:border-white/30 hover:text-pearl"
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </ScrollReveal>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          {filtered.map((project, i) => (
            <ScrollReveal key={project._id} delay={i * 80}>
              <ProjectCard project={project} aspectRatio="4/5" />
            </ScrollReveal>
          ))}
        </div>
      ) : (
        <div className="text-center py-24">
          <p className="font-display text-2xl text-silver">No projects found.</p>
        </div>
      )}
    </>
  );
}
