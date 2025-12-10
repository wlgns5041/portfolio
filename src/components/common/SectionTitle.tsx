type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export const SectionTitle = ({ eyebrow, title, description }: SectionTitleProps) => (
  <header className="mb-8">
    {eyebrow && (
      <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
        {eyebrow}
      </p>
    )}
    <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mt-2">
      {title}
    </h2>
    {description && (
      <p className="mt-3 text-slate-400 max-w-2xl">{description}</p>
    )}
  </header>
);