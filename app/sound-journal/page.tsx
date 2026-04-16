import { getAllSoundJournals } from "@/lib/sanity/queries";
import { PortableText } from "@portabletext/react";
import ScrollReveal from "@/components/ScrollReveal";
import SoundPlayer from "@/components/SoundPlayer";

export const revalidate = 60;

export const metadata = {
  title: "Sound Journal — TukTuk Studio",
  description: "Sound recordings and notes by Allen Kang",
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
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic">{children}</em>
    ),
  },
};

export default async function SoundJournalPage() {
  const journals = await getAllSoundJournals();

  return (
    <div className="pt-32 md:pt-40 pb-24">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <ScrollReveal>
          <p className="font-mono text-[10px] tracking-[0.5em] text-gold uppercase mb-6">
            TukTuk Studio
          </p>
          <h1 className="font-display text-[clamp(3rem,8vw,7rem)] leading-none text-cream mb-6">
            Sound Journal
          </h1>
          <p className="font-body text-lg text-silver max-w-xl leading-relaxed mb-16">
            Field recordings, sonic sketches, and notes on sound.
          </p>
        </ScrollReveal>

        <hr className="rule mb-20" />

        {journals.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-display text-2xl text-silver">No entries yet.</p>
          </div>
        ) : (
          <div className="space-y-20">
            {journals.map((entry: any, i: number) => (
              <ScrollReveal key={entry._id} delay={i * 80}>
                <article className="border-b border-white/5 pb-20">
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-3 mb-6">
                    <h2 className="font-display text-3xl md:text-4xl text-cream leading-tight">
                      {entry.title}
                    </h2>
                    <span className="font-mono text-[10px] tracking-[0.3em] text-silver/50 uppercase">
                      {new Date(entry.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  {entry.tags && entry.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-8">
                      {entry.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="font-mono text-[9px] tracking-[0.2em] text-gold/70 uppercase border border-gold/20 px-3 py-1"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {entry.audioUrl && (
                    <div className="mb-10">
                      <SoundPlayer url={entry.audioUrl} title={entry.title} duration={entry.duration} />
                    </div>
                  )}

                  {entry.body && entry.body.length > 0 && (
                    <div className="max-w-2xl">
                      <PortableText value={entry.body} components={ptComponents} />
                    </div>
                  )}
                </article>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
