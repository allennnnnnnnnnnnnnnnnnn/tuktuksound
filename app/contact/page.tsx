"use client";

import { useState, useEffect } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { getSiteSettings } from "@/lib/sanity/queries";
import type { SiteSettings } from "@/lib/sanity/types";

export default function ContactPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [formState, setFormState] = useState({ name: "", email: "", project: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    getSiteSettings().then(setSettings);
  }, []);

  const contactEmail = settings?.contactEmail ?? "hello@tuktuksound.com";
  const instagramUrl = settings?.instagramUrl ?? "https://instagram.com";
  const imdbUrl = settings?.imdbUrl ?? "https://imdb.com";
  const vimeoUrl = settings?.vimeoUrl ?? "https://vimeo.com";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
            {submitted ? (
              <ScrollReveal>
                <div className="border border-gold/30 p-12 text-center">
                  <div className="w-16 h-px bg-gold mx-auto mb-8" />
                  <p className="font-display text-3xl md:text-4xl text-cream mb-4">Message received.</p>
                  <p className="font-body text-silver">Thank you for reaching out. Allen will be in touch shortly.</p>
                  <button
                    onClick={() => { setSubmitted(false); setFormState({ name: "", email: "", project: "", message: "" }); }}
                    className="mt-8 font-mono text-[10px] tracking-[0.3em] text-gold uppercase underline-anim"
                  >
                    Send another message
                  </button>
                </div>
              </ScrollReveal>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <ScrollReveal>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="font-mono text-[9px] tracking-[0.3em] text-silver/60 uppercase block mb-2">Name *</label>
                      <input type="text" name="name" value={formState.name} onChange={handleChange} required placeholder="Your name" className="form-input w-full px-4 py-3 text-sm font-body" />
                    </div>
                    <div>
                      <label className="font-mono text-[9px] tracking-[0.3em] text-silver/60 uppercase block mb-2">Email *</label>
                      <input type="email" name="email" value={formState.email} onChange={handleChange} required placeholder="your@email.com" className="form-input w-full px-4 py-3 text-sm font-body" />
                    </div>
                  </div>
                </ScrollReveal>
                <ScrollReveal delay={50}>
                  <div>
                    <label className="font-mono text-[9px] tracking-[0.3em] text-silver/60 uppercase block mb-2">Project Type</label>
                    <select name="project" value={formState.project} onChange={handleChange} className="form-input w-full px-4 py-3 text-sm font-body appearance-none cursor-pointer">
                      <option value="" style={{ background: "#111" }}>Select a service</option>
                      <option value="sound-design" style={{ background: "#111" }}>Sound Design</option>
                      <option value="dialogue" style={{ background: "#111" }}>Dialogue Editing</option>
                      <option value="foley" style={{ background: "#111" }}>Foley</option>
                      <option value="mix" style={{ background: "#111" }}>Re-recording Mix</option>
                      <option value="full" style={{ background: "#111" }}>Full Post-Production</option>
                    </select>
                  </div>
                </ScrollReveal>
                <ScrollReveal delay={100}>
                  <div>
                    <label className="font-mono text-[9px] tracking-[0.3em] text-silver/60 uppercase block mb-2">Message *</label>
                    <textarea name="message" value={formState.message} onChange={handleChange} required placeholder="Tell us about your project — its story, format, timeline, and what you're looking for." rows={7} className="form-input w-full px-4 py-3 text-sm font-body resize-none" />
                  </div>
                </ScrollReveal>
                <ScrollReveal delay={150}>
                  <button type="submit" className="group relative inline-flex items-center gap-4 px-10 py-4 border border-gold/40 hover:border-gold transition-colors duration-500 overflow-hidden">
                    <span className="absolute inset-0 bg-gold opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
                    <span className="font-mono text-xs tracking-[0.3em] text-gold uppercase">Send Message</span>
                    <span className="w-6 h-px bg-gold group-hover:w-10 transition-all duration-300" />
                  </button>
                </ScrollReveal>
              </form>
            )}
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
                  TukTuk Studio<br />Seoul, South Korea<br />
                  <span className="font-mono text-xs text-silver/50 tracking-wider">tuktuksound.com</span>
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="border-t border-white/5 pt-10">
                <p className="font-mono text-[10px] tracking-[0.4em] text-gold uppercase mb-5">Follow</p>
                <div className="flex flex-col gap-4">
                  {[
                    { label: "Instagram", url: instagramUrl },
                    { label: "IMDb", url: imdbUrl },
                    { label: "Vimeo", url: vimeoUrl },
                  ].map(({ label, url }) => (
                    <a key={label} href={url} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4">
                      <span className="font-mono text-[10px] tracking-[0.25em] text-silver group-hover:text-gold uppercase transition-colors duration-300 underline-anim">{label}</span>
                      <span className="w-4 h-px bg-silver/30 group-hover:bg-gold group-hover:w-8 transition-all duration-300" />
                    </a>
                  ))}
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
