export default function PageHero({ eyebrow, title, subtitle }) {
  return (
    <section className="relative overflow-hidden border-b border-white/5">
      <div className="absolute inset-0 ruled-bg opacity-40"></div>
      <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-marigold/20 blur-3xl float-blob"></div>
      <div className="absolute -left-10 bottom-0 w-72 h-72 rounded-full bg-terracotta/15 blur-3xl float-blob" style={{ animationDelay: "2s" }}></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {eyebrow && (
          <p className="text-marigold font-semibold text-sm uppercase tracking-widest mb-3">
            {eyebrow}
          </p>
        )}
        <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl max-w-3xl text-ink">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-ink-light max-w-2xl text-base md:text-lg">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
