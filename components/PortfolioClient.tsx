"use client";

import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import ProjectCard from "@/components/ProjectCard";
import type { Project } from "@/lib/sanity/types";

const CATEGORIES = ["劇情片", "紀錄片", "節目", "廣告"] as const;

const ROLES_FOR_CATEGORY: Record<string, string[]> = {
  "劇情片": ["Sound Design", "SFX Design", "Foley", "Re-recording Mix", "Dialogue Edit"],
  "紀錄片": ["Sound Design", "SFX Design", "Foley", "Re-recording Mix", "Dialogue Edit"],
  "節目": [],
  "廣告": [],
};

export default function PortfolioClient({ projects }: { projects: Project[] }) {
  const [activeCategory, setActiveCategory] = useState<string>("劇情片");
  const [activeRole, setActiveRole] = useState<string | null>(null);

  const availableRoles = ROLES_FOR_CATEGORY[activeCategory] ?? [];

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setActiveRole(null);
  };

  const filtered = projects.filter((p) => {
    const catMatch = (p as any).category === activeCategory;
    if (!catMatch) return false;
    if (!activeRole) return true;
    return p.roles.includes(activeRole);
  });

  return (
    <>
      {/* 第一層：大分類 */}
      <ScrollReveal>
        <div className="flex flex-wrap gap-0 mb-10 border-b border-white/10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`font-mono text-[10px] tracking-[0.2em] uppercase px-6 py-3 border-b-2 transition-all duration-300 ${
                activeCategory === cat
                  ? "border-gold text-gold"
                  : "border-transparent text-silver hover:text-pearl"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </ScrollReveal>

      {/* 第二層：角色篩選（只有劇情片和紀錄片才顯示） */}
      {availableRoles.length > 0 && (
        <ScrollReveal>
          <div className="flex flex-wrap gap-2 mb-16">
            {availableRoles.map((role) => (
              <button
                key={role}
                onClick={() => setActiveRole(activeRole === role ? null : role)}
                className={`font-mono text-[10px] tracking-[0.2em] uppercase px-4 py-2 border transition-all duration-300 ${
                  activeRole === role
                    ? "border-gold text-gold bg-gold/5"
                    : "border-white/10 text-silver hover:border-white/30 hover:text-pearl"
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </ScrollReveal>
      )}

      {/* 作品網格 */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          {filtered.map((project, i) => (
            <ScrollReveal key={project._id} delay={i * 80}>
              <ProjectCard project={project} aspectRatio="4/5" />
            </ScrollReveal>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 border border-white/5">
          <p className="font-display text-2xl text-silver">No projects found.</p>
          <p className="font-mono text-xs text-silver/40 mt-3 tracking-wider">
            Add projects with category &quot;{activeCategory}&quot; in the CMS.
          </p>
        </div>
      )}
    </>
  );
}
