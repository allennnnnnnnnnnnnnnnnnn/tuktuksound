import ScrollReveal from "@/components/ScrollReveal";
import { getSiteSettings } from "@/lib/sanity/queries";
import ContactForm from "@/components/ContactForm";

export const revalidate = 60;

export default async function ContactPage() {
  const settings = await getSiteSettings();

  const contactEmail = settings?.contactEmail ?? "hello@tuktuksound.com";
  const instagramUrl = settings?.instagramUrl ?? "https://instagram.com";
  const facebookUrl = settings?.facebookUrl ?? "https://facebook.com";

  return (
    <div className="pt-32 md:pt-40 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <ScrollReveal>
          <p className="font-mono text-[10px] tracking-[0.5em] text-gold uppercase mb-6">Contact</p>
          <h1 className="font-display text-[clamp(3rem,8vw,7rem)] leading-none text-cream mb-6">
            Let&apos;s Work<br /><span className="italic text-gold">Together</span>
          </h1>
          <p className="font-body text-lg text-silver max-w-xl leading-relaxed mb-16">
            TukTuk Studio is open for feature films, short films, documentaries, and experimental projects.
          </p>
        </ScrollReveal>

        <hr className="rule mb-20" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          <div className="lg:col-span-5 space-y-10">
            <ScrollReveal delay={100}>
              <div>
                <p className="font-mono text-[10px] tracking-[0.4em] text-gold uppercase mb-5">Direct Contact</p>
                <a href={`mailto:${contactEmail}`} className="font-display text-2xl md:text-3xl text-cream hover:text-gold transition-colors duration-300 block underline-anim">
                  {contactEmail}
                </a>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <div className="border-t border-white/5 pt-10">
                <p className="font-mono text-[10px] tracking-[0.4em] text-gold uppercase mb-5">Studio</p>
                <p className="font-body text-silver leading-loose">
                  TukTuk Studio<br />Taipei, Taiwan<br />
                  <span className="font-mono text-xs text-silver/50 tracking-wider">tuktuksound.com</span>
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="border-t border-white/5 pt-10">
                <p className="font-mono text-[10px] tracking-[0.4em] text-gold uppercase mb-5">Follow</p>
                <div className="flex flex-col gap-4">
                  <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4">
                    <span className="font-mono text-[10px] tracking-[0.25em] text-silver group-hover:text-gold uppercase transition-colors duration-300 underline-anim">Instagram</span>
                    <span className="w-4 h-px bg-silver/30 group-hover:bg-gold group-hover:w-8 transition-all duration-300" />
                  </a>
                  <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4">
                    <span className="font-mono text-[10px] tracking-[0.25em] text-silver group-hover:text-gold uppercase transition-colors duration-300 underline-anim">Facebook</span>
                    <span className="w-4 h-px bg-silver/30 group-hover:bg-gold group-hover:w-8 transition-all duration-300" />
                  </a>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={250}>
              <div className="border-t border-white/5 pt-10">
                <div className="border border-gold/20 p-6">
                  <p className="font-mono text-[9px] tracking-[0.3em] text-gold uppercase mb-3">Currently available</p>
                  <p className="font-body text-sm text-silver leading-relaxed">
                    TukTuk Studio is accepting new projects. Feature and short film submissions welcome.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
}
