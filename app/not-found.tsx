import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center px-6">
      <p className="font-mono text-[10px] tracking-[0.5em] text-gold uppercase mb-6">
        404
      </p>
      <h1 className="font-display text-6xl md:text-8xl text-cream mb-6">
        Lost Signal
      </h1>
      <p className="font-body text-silver mb-12 max-w-md">
        The page you&apos;re looking for has gone silent. Return to the studio.
      </p>
      <Link
        href="/"
        className="group inline-flex items-center gap-4 px-8 py-4 border border-gold/40 hover:border-gold transition-colors duration-500"
      >
        <span className="font-mono text-xs tracking-[0.3em] text-gold uppercase">
          Return Home
        </span>
        <span className="w-6 h-px bg-gold group-hover:w-10 transition-all duration-300" />
      </Link>
    </div>
  );
}
