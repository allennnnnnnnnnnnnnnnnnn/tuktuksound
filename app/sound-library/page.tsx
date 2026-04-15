import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { getAllSoundLibraries } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import ScrollReveal from "@/components/ScrollReveal";

export const revalidate = 60;

export const metadata = {
  title: "Sound Library — TukTuk Studio",
  description: "Free sound libraries by TukTuk Studio",
};

const ptComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="font-body text-sm text-silver leading-loose mb-4">{children}</p>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="text-pearl font-semibold">{children}</strong>
    ),
  },
};

export default async function SoundLibraryPage() {
  const libraries = await getAllSoundLibraries();

  return (
    <div className="pt-32 md:pt-40 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <ScrollReveal>
          <p className="font-mono text-[10px] tracking-[0.5em] text-gold uppercase mb-6">
            TukTuk Studio
          </p>
          <h1 className="font-display text-[clamp(3rem,8vw,7rem)] leading-none text-cream mb-6">
            Sound Library
          </h1>
          <p className="font-body text-lg text-silver max-w-xl leading-relaxed mb-16">
            Free sound libraries recorded and curated by TukTuk Studio.
            Available for download.
          </p>
        </ScrollReveal>

        <hr className="rule mb-20" />

        {libraries.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-display text-2xl text-silver">Coming soon.</p>
          </div>
        ) : (
          <div className="space-y-0">
            {libraries.map((lib: any, i: number) => (
              <ScrollReveal key={lib._id} delay={i * 100}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-b border-white/5 py-16 group">
                  <div className="lg:col-span-4 mb-8 lg:mb-0 lg:pr-12">
                    <div className="relative aspect-square overflow-hidden bg-ash">
                      <Image
                        src={urlFor(lib.coverImage).width(600).height(600).url()}
                        alt={lib.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  </div>

                  <div className="lg:col-span-8 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap items-baseline gap-4 mb-4">
                        <h2 className="font-display text-3xl md:text-5xl text-cream leading-tight">
                          {lib.title}
                        </h2>
                        {lib.releaseYear && (
                          <span className="font-mono text-[10px] tracking-[0.3em] text-silver/60 uppercase">
                            {lib.releaseYear}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2 mb-8">
                        {lib.trackCount && (
                          <span className="font-mono text-[9px] tracking-[0.2em] text-gold/80 uppercase border border-gold/20 px-3 py-1">
                            {lib.trackCount} tracks
                          </span>
                        )}
                        {lib.fileFormat && (
                          <span className="font-mono text-[9px] tracking-[0.2em] text-gold/80 uppercase border border-gold/20 px-3 py-1">
                            {lib.fileFormat}
                          </span>
                        )}
                      </div>

                      {lib.description && (
                        <div className="max-w-2xl mb-10">
                          <PortableText value={lib.description} components={ptComponents} />
                        </div>
                      )}
                    </div>

                    {lib.downloadUrl && (
                      <div>
                        <a
                          href={lib.downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-4 px-10 py-4 border border-gold/40 hover:border-gold transition-colors duration-500"
                        >
                          <span className="font-mono text-xs tracking-[0.3em] text-gold uppercase">
                            Free Download
                          </span>
                          <span className="w-6 h-px bg-gold" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
