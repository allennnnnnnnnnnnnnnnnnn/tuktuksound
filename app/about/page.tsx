import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { getSiteSettings } from "@/lib/sanity/queries";

export const revalidate = 60;

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

export default async function AboutPage() {
  const settings = await getSiteSettings();

  const aboutTitle = settings?.aboutTitle ?? "Allen Kang";
  const aboutRole = settings?.aboutRole ?? "Sound Designer & Re-recording Mixer";
  const aboutBody = settings?.aboutBody;
  const aboutLocation = settings?.aboutLocation ?? "Seoul, South Korea";
  const aboutFormat = settings?.aboutFormat ?? "Dolby Atmos · Stereo · 5.1";
  const aboutDaw = settings?.aboutDaw ?? "Pro Tools Ultimate";
  const expertise = settings?.aboutExpertise ?? ["Sound Design", "Re-recording Mix", "Dialogue Editing", "Foley Direction", "ADR", "Dolby Atmos"];
  const credits = settings?.aboutCredits ?? [];

  return (
    <div className="pt-32 md:pt-40 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <ScrollReveal>
          <p className="font-mono text-[10px] tracking-[0.5em] text-gold uppercase mb-6">About</p>
          <h1 className="font-display text-[clamp(3rem,8vw,7rem)] leading-none text-cream mb-2">{aboutTitle}</h1>
          <p className="font-display text-[clamp(1.5rem,4vw,3rem)] italic text-gold/70 leading-none mb-16">{aboutRole}</p>
        </ScrollReveal>

        <hr className="rule mb-20" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-7">
            {aboutBody && aboutBody.length > 0 ? (
              <ScrollReveal>
                <PortableText value={aboutBody} components={portableTextComponents} />
              </ScrollReveal>
            ) : (
              <ScrollReveal>
                <p className="font-body text-base text-silver leading-loose">
                  個人介紹尚未填寫，請至後台「網站設定」填寫「關於頁個人介紹」。
                </p>
              </ScrollReveal>
            )}
            <ScrollReveal delay={200}>
              <div className="mt-12">
                <Link href="/contact" className="group inline-flex items-center gap-4 font-mono text-xs tracking-[0.3em] text-gold uppercase">
                  <span className="underline-anim">Work together</span>
                  <span className="w-10 h-px bg-gold group-hover:w-14 transition-all duration-300" />
                </Link>
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-5">
            <ScrollReveal delay={100}>
              <div className="border border-white/8 p-8 mb-8">
                <p className="font-mono text-[10px] tracking-[0.4em] text-gold uppercase mb-6">Studio</p>
                <div className="space-y-4">
                  {[
                    { label: "Name", value: settings?.studioName ?? "TukTuk Studio" },
                    { label: "Location", value: aboutLocation },
                    { label: "Format", value: aboutFormat },
                    { label: "DAW", value: aboutDaw },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between items-baseline border-b border-white/5 pb-4 last:border-0 last:pb-0">
                      <span className="font-mono text-[10px] tracking-[0.2em] text-silver/60 uppercase">{item.label}</span>
                      <span className="font-body text-sm text-pearl">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {expertise.length > 0 && (
              <ScrollReveal delay={150}>
                <div className="border border-white/8 p-8">
                  <p className="font-mono text-[10px] tracking-[0.4em] text-gold uppercase mb-6">Expertise</p>
                  <div className="flex flex-wrap gap-2">
                    {expertise.map((skill: string) => (
                      <span key={skill} className="font-mono text-[9px] tracking-[0.15em] text-silver uppercase border border-white/10 px-3 py-1.5 hover:border-gold/30 hover:text-pearl transition-colors duration-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}
          </div>
        </div>

        {credits.length > 0 && (
          <div className="mt-28">
            <ScrollReveal>
              <p className="font-mono text-[10px] tracking-[0.5em] text-gold uppercase mb-12">Selected Credits</p>
            </ScrollReveal>
            <div className="space-y-0">
              {credits.map((credit: any, i: number) => (
                <ScrollReveal key={i} delay={i * 50}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between py-5 border-b border-white/5 group hover:border-gold/20 transition-colors duration-300">
                    <div className="flex items-baseline gap-4 sm:gap-8">
                      <span className="font-mono text-[10px] tracking-[0.2em] text-silver/40 w-10">{credit.year}</span>
                      <span className="font-display text-xl text-cream group-hover:text-gold transition-colors duration-300">{credit.title}</span>
                    </div>
                    <span className="font-mono text-[10px] tracking-[0.15em] text-silver/60 uppercase mt-2 sm:mt-0 sm:ml-4 pl-14 sm:pl-0">{credit.role}</span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
