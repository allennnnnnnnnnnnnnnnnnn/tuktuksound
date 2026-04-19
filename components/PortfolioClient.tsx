"use client";

import { useState } from "react";
import Image from "next/image";
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

function getYouTubeId(url: string): string | null {
  if (!url) return null;
  const embedMatch = url.match(/youtube\.com\/embed\/([^?&]+)/);
  if (embedMatch) return embedMatch[1];
  const watchMatch = url.match(/youtube\.com\/watch\?v=([^&]+)/);
  if (watchMatch) return watchMatch[1];
  const shortMatch = url.match(/youtu\.be\/([^?]+)/);
  if (shortMatch) return shortMatch[1];
  return null;
}

function AdVideoCard({ project, onClick }: { project: any; onClick: () => void }) {
  const videoId = getYouTubeId(project.videoUrl ?? "");
  const thumbUrl = videoId
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : null;

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer relative aspect-video overflow-hidden bg-ash"
    >
      {thumbUrl ? (
        <Image
          src={thumbUrl}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      ) : (
        <div className="w-full h-full bg-ash flex items-center justify-center">
          <span className="font-mono text-[10px] text-silver/40 uppercase tracking-widest">No Preview</span>
        </div>
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-obsidian/40 group-hover:bg-obsidian/20 transition-colors duration-300" />

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-14 h-14 border border-gold/60 group-hover:border-gold flex items-center justify-center transition-all duration-300 group-hover:scale-110">
          <div
            className="ml-1"
            style={{
              width: 0,
              height: 0,
              borderTop: "9px solid transparent",
              borderBottom: "9px solid transparent",
              borderLeft: "15px solid #b8a882",
            }}
          />
        </div>
      </div>

      {/* Title */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-obsidian to-transparent">
        <h3 className="font-display text-lg text-cream leading-tight">{project.title}</h3>
        {project.year && (
          <p className="font-mono text-[9px] tracking-[0.2em] text-silver mt-1">{project.year}</p>
        )}
      </div>
    </div>
  );
}

function VideoModal({ project, onClose }: { project: any; onClose: () => void }) {
  const videoId = getYouTubeId(project.videoUrl ?? "");

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12"
      style={{ background: "rgba(8,8,8,0.95)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="font-display text-2xl md:text-3xl text-cream">{project.title}</h2>
            {project.year && (
              <p className="font-mono text-[10px] tracking-[0.3em] text-silver uppercase mt-1">
                {project.year}{project.genre ? ` — ${project.genre}` : ""}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="font-mono text-[10px] tracking-[0.3em] text-silver hover:text-gold uppercase transition-colors duration-300 flex items-center gap-3"
          >
            Close <span className="text-lg">×</span>
          </button>
        </div>

        {/* Video */}
        <div className="relative aspect-video w-full bg-ash border border-white/8">
          {videoId ? (
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title={project.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="font-mono text-[10px] text-silver/40 uppercase tracking-widest">No video available</p>
            </div>
          )}
        </div>

        {project.shortDescription && (
          <p className="font-body text-sm text-silver mt-4 leading-relaxed max-w-2xl">
            {project.shortDescription}
          </p>
        )}
      </div>
    </div>
  );
}

export default function PortfolioClient({ projects }: { projects: Project[] }) {
  const [activeCategory, setActiveCategory] = useState<string>("劇情片");
  const [activeRole, setActiveRole] = useState<string | null>(null);
  const [selectedAd, setSelectedAd] = useState<any>(null);

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

      {/* 第二層：角色篩選 */}
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

      {/* 廣告：影片 Grid */}
      {activeCategory === "廣告" ? (
        filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
            {filtered.map((project, i) => (
              <ScrollReveal key={project._id} delay={i * 80}>
                <AdVideoCard
                  project={project}
                  onClick={() => setSelectedAd(project)}
                />
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 border border-white/5">
            <p className="font-display text-2xl text-silver">No ads found.</p>
            <p className="font-mono text-xs text-silver/40 mt-3 tracking-wider">
              Add projects with category &quot;廣告&quot; in the CMS.
            </p>
          </div>
        )
      ) : (
        /* 其他分類：一般作品卡片 */
        filtered.length > 0 ? (
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
        )
      )}

      {/* 影片 Modal */}
      {selectedAd && (
        <VideoModal
          project={selectedAd}
          onClose={() => setSelectedAd(null)}
        />
      )}
    </>
  );
}
