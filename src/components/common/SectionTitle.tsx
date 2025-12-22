type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export const SectionTitle = ({ eyebrow, title, description }: SectionTitleProps) => (
  <header className="mb-16 max-w-3xl">
    {eyebrow && (
      <p className="text-xs tracking-[0.25em] uppercase text-slate-500 mb-4">
        {eyebrow}
      </p>
    )}

    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-100 leading-tight">
      {title}
    </h2>

    {description && (
      <p className="mt-6 text-lg text-slate-400 leading-relaxed">
        {description}
      </p>
    )}
  </header>
);
