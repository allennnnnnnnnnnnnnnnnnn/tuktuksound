import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import ProjectCard from "@/components/ProjectCard";
import { getSiteSettings, getFeaturedProjects } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";

export const revalidate = 60;

export default async function HomePage() {
  const [settings, featuredProjects] = await Promise.all([
    getSiteSettings(),
    getFeaturedProjects(),
  ]);

  const title = settings?.homepageTitle ?? "TukTuk";
  const subtitle = settings?.homepageSubtitle ?? "Film Sound Design & Post-Production";
  const heroImageUrl = settings?.heroImage
    ? urlFor(settings.heroImage).width(1920).height(1080).url()
    : null;

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden">
        {heroImageUrl ? (
          <Image
            src={heroImageUrl}
            alt="Hero background"
            fill
            className="object-cover opacity-60"
            priority
          />
        ) : null}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(184,168,130,0.06) 0%, transparent 60%), linear-gradient(180deg, #0d0c0b 0%, #080808 40%, #050508 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(255,255,255,1) 79px, rgba(255,255,255,1) 80px)",
          }}
        />

        <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-6 opacity-30">
          <div className="w-px h-24 bg-gold" />
          <p className="font-mono text-[9px] tracking-[0.4em] text-silver uppercase" style={{ writingMode: "vertical-rl" }}>
            Sound Design
          </p>
        </div>
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-6 opacity-30">
          <p className="font-mono text-[9px] tracking-[0.4em] text-silver uppercase" style={{ writingMode: "vertical-rl" }}>
            Post-Production
          </p>
          <div className="w-px h-24 bg-gold" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div
            className="opacity-0 animate-fade-up"
            style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
          >
            <Image
              src="/tuktuk-title-logo.png"
              alt="TukTuk Studio"
              width={420}
              height={420}
              priority
              className="object-contain mx-auto max-h-[280px] w-auto"
            />
          </div>
          <p
            className="font-mono text-[10px] md:text-xs tracking-[0.5em] text-gold uppercase mt-8 md:mt-10 opacity-0 animate-fade-in"
            style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
          >
            Allen Kang
          </p>
          <p
            className="font-body text-sm md:text-base tracking-[0.25em] text-silver uppercase mt-8 md:mt-10 opacity-0 animate-fade-in"
            style={{ animationDelay: "0.9s", animationFillMode: "forwards" }}
          >
            {subtitle}
          </p>
          <div
            className="mt-12 md:mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 opacity-0 animate-fade-in"
            style={{ animationDelay: "1.2s", animationFillMode: "forwards" }}
          >
            <Link
              href="/portfolio"
              className="group relative inline-flex items-center gap-3 px-8 py-4 border border-gold/40 hover:border-gold transition-colors duration-500 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gold opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
              <span className="font-mono text-xs tracking-[0.3em] text-gold uppercase">View Works</span>
              <span className="w-6 h-px bg-gold transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link href="/contact" className="font-mono text-xs tracking-[0.3em] text-silver hover:text-cream uppercase transition-colors duration-300 underline-anim">
              Get in Touch
            </Link>
          </div>
        </div>

        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-0 animate-fade-in"
          style={{ animationDelay: "1.6s", animationFillMode: "forwards" }}
        >
          <span className="font-mono text-[9px] tracking-[0.4em] text-silver/50 uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-silver/30 to-transparent" />
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-28 md:py-40 px-6 md:px-12 max-w-7xl mx-auto">
        <ScrollReveal>
          <p className="font-mono text-[10px] tracking-[0.5em] text-gold uppercase mb-16">Disciplines</p>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
          {[
            { num: "01", title: "Sound Design", desc: "Crafting complete sonic worlds — from the intimate to the epic. Every texture, atmosphere, and effect serves the story." },
            { num: "02", title: "Dialogue Editing", desc: "Seamless, invisible editing that preserves performance. Clean, consistent, and emotionally truthful." },
            { num: "03", title: "Foley", desc: "Custom foley performance and recording that gives every moment physical presence and tactile weight." },
            { num: "04", title: "Re-recording Mix", desc: "Theatrical and streaming mixes that balance clarity with immersion. Dolby Atmos and stereo delivery." },
          ].map((service, i) => (
            <ScrollReveal key={service.num} delay={i * 100}>
              <div className="bg-obsidian p-8 md:p-10 h-full group hover:bg-ash transition-colors duration-500">
                <p className="font-mono text-[10px] tracking-[0.3em] text-gold/60 mb-6">{service.num}</p>
                <h3 className="font-display text-2xl md:text-3xl text-cream mb-4 group-hover:text-gold transition-colors duration-400">{service.title}</h3>
                <p className="font-body text-sm text-silver leading-relaxed">{service.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* FEATURED WORK */}
      <section className="py-28 md:py-40 px-6 md:px-12 max-w-7xl mx-auto">
        <ScrollReveal className="flex justify-between items-end mb-16">
          <div>
            <p className="font-mono text-[10px] tracking-[0.5em] text-gold uppercase mb-3">Selected Work</p>
            <h2 className="font-display text-4xl md:text-6xl text-cream">Recent Projects</h2>
          </div>
          <Link href="/portfolio" className="hidden md:flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-silver hover:text-gold uppercase transition-colors duration-300 underline-anim">
            All works <span className="w-8 h-px bg-current" />
          </Link>
        </ScrollReveal>

        {featuredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
            {featuredProjects.map((project, i) => (
              <ScrollReveal key={project._id} delay={i * 120}>
                <ProjectCard project={project} aspectRatio="3/4" />
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-white/5">
            <p className="font-display text-2xl text-silver">No featured projects yet.</p>
            <p className="font-mono text-xs text-silver/50 mt-2 tracking-wider">Mark projects as Featured in the CMS to show them here.</p>
          </div>
        )}

        <ScrollReveal className="mt-10 md:hidden text-center">
          <Link href="/portfolio" className="inline-flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-silver hover:text-gold uppercase transition-colors duration-300">
            View all works <span className="w-8 h-px bg-current" />
          </Link>
        </ScrollReveal>
      </section>

      {/* CTA BANNER */}
      <section className="border-t border-b border-white/5 py-24 md:py-32">
        <ScrollReveal className="text-center px-6">
          <p className="font-mono text-[10px] tracking-[0.5em] text-gold uppercase mb-6">Open for Collaboration</p>
          <h2 className="font-display text-4xl md:text-7xl text-cream mb-10 max-w-4xl mx-auto leading-tight">
            Let&apos;s build something <span className="italic text-gold">extraordinary</span>
          </h2>
          <Link href="/contact" className="group inline-flex items-center gap-4 px-10 py-5 border border-gold/40 hover:border-gold transition-colors duration-500 relative overflow-hidden">
            <span className="absolute inset-0 bg-gold opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
            <span className="font-mono text-xs tracking-[0.3em] text-gold uppercase">Start a Project</span>
            <span className="w-8 h-px bg-gold transform translate-x-0 group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
        </ScrollReveal>
      </section>
    </>
  );
}
