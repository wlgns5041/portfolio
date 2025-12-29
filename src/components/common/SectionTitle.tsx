type Props = {
  eyebrow: string;
  title: string;
  description?: string;
};

export const SectionTitle = ({ eyebrow, title, description }: Props) => {
  return (
    <div className="mb-16">
      <p className="mb-3 text-sm tracking-[0.25em] text-slate-500 uppercase">
        {eyebrow}
      </p>

      <h2 className="text-4xl md:text-5xl font-extrabold text-slate-100">
        {title}
      </h2>

      {description && (
        <p className="mt-6 text-slate-400 whitespace-pre-line leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};