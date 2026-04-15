"use client";

import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";

export default function ContactForm() {
  const [formState, setFormState] = useState({ name: "", email: "", project: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");

    try {
      const res = await fetch("https://formspree.io/f/xojyjqlo", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(formState),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        setError("送出失敗，請直接寄信至 Email。");
      }
    } catch {
      setError("網路錯誤，請稍後再試。");
    } finally {
      setSending(false);
    }
  };

  if (submitted) {
    return (
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
    );
  }

  return (
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

      {error && (
        <p className="font-mono text-[10px] tracking-[0.2em] text-red-400">{error}</p>
      )}

      <ScrollReveal delay={150}>
        <button
          type="submit"
          disabled={sending}
          className="group relative inline-flex items-center gap-4 px-10 py-4 border border-gold/40 hover:border-gold transition-colors duration-500 overflow-hidden disabled:opacity-50"
        >
          <span className="absolute inset-0 bg-gold opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
          <span className="font-mono text-xs tracking-[0.3em] text-gold uppercase">
            {sending ? "Sending..." : "Send Message"}
          </span>
          <span className="w-6 h-px bg-gold group-hover:w-10 transition-all duration-300" />
        </button>
      </ScrollReveal>
    </form>
  );
}
