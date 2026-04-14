import Link from "next/link";
import { getSiteSettings } from "@/lib/sanity/queries";

export default async function Footer() {
  const settings = await getSiteSettings();
  const studioName = settings?.studioName ?? "TukTuk Studio";
  const email = settings?.contactEmail ?? "hello@tuktuksound.com";
  const instagramUrl = settings?.instagramUrl ?? "https://instagram.com";
  const imdbUrl = settings?.imdbUrl ?? "https://imdb.com";

  return (
    <footer className="border-t border-white/5 mt-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-14">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <p className="font-display text-2xl text-cream tracking-widest" style={{ letterSpacing: "0.15em" }}>
              {studioName.toUpperCase()}
            </p>
            <p className="font-mono text-[10px] tracking-[0.35em] text-silver mt-1 uppercase">
              Film Sound Design & Post-Production
            </p>
          </div>
          <div className="flex flex-col md:items-end gap-3">
            <a href={`mailto:${email}`} className="font-body text-sm text-silver hover:text-gold transition-colors duration-300 underline-anim">
              {email}
            </a>
            <div className="flex gap-6">
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] tracking-[0.2em] text-silver hover:text-gold transition-colors duration-300 uppercase">
                Instagram
              </a>
              <a href={imdbUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] tracking-[0.2em] text-silver hover:text-gold transition-colors duration-300 uppercase">
                IMDb
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-[10px] tracking-[0.2em] text-silver/50 uppercase">
            © {new Date().getFullYear()} Allen Kang — {studioName}
          </p>
          <nav className="flex gap-6">
            {[{ href: "/", label: "Home" }, { href: "/about", label: "About" }, { href: "/portfolio", label: "Portfolio" }, { href: "/contact", label: "Contact" }].map((link) => (
              <Link key={link.href} href={link.href} className="font-mono text-[10px] tracking-[0.2em] text-silver/50 hover:text-silver transition-colors duration-300 uppercase">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
