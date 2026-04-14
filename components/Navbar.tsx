"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "navbar-blur" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex flex-col leading-none group">
              <span
                className="font-display text-lg md:text-xl tracking-wider text-cream transition-colors duration-300 group-hover:text-gold"
                style={{ letterSpacing: "0.15em" }}
              >
                TUKTUK
              </span>
              <span
                className="font-mono text-[9px] tracking-[0.4em] text-silver mt-0.5"
              >
                STUDIO
              </span>
            </Link>

            {/* Desktop nav */}
            <ul className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`font-body text-xs tracking-[0.2em] uppercase transition-colors duration-300 underline-anim ${
                      pathname === link.href
                        ? "text-gold"
                        : "text-silver hover:text-cream"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span
                className={`block w-6 h-px bg-cream transition-all duration-300 ${
                  menuOpen ? "rotate-45 translate-y-[7px]" : ""
                }`}
              />
              <span
                className={`block w-6 h-px bg-cream transition-all duration-300 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block w-4 h-px bg-cream transition-all duration-300 ${
                  menuOpen ? "-rotate-45 -translate-y-[7px] w-6" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 flex flex-col justify-center items-center transition-all duration-500 ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{ background: "rgba(8,8,8,0.97)" }}
      >
        <ul className="flex flex-col items-center gap-8">
          {navLinks.map((link, i) => (
            <li
              key={link.href}
              style={{
                transitionDelay: menuOpen ? `${i * 60}ms` : "0ms",
                transform: menuOpen ? "translateY(0)" : "translateY(20px)",
                opacity: menuOpen ? 1 : 0,
                transition:
                  "transform 0.4s ease, opacity 0.4s ease",
              }}
            >
              <Link
                href={link.href}
                className={`font-display text-4xl tracking-wide transition-colors duration-300 ${
                  pathname === link.href ? "text-gold" : "text-cream hover:text-gold"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <p className="font-mono text-[10px] tracking-[0.3em] text-silver mt-16 uppercase">
          tuktuksound.com
        </p>
      </div>
    </>
  );
}
