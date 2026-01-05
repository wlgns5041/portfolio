type Props = {
  eyebrow: string;
  title: string;
  description?: string;
};

export const SectionTitle = ({ eyebrow, title, description }: Props) => {
  return (
    <div className="mb-10 md:mb-16 text-left">
      <p className="text-xs tracking-[0.05em] md:tracking-[0.3em] uppercase text-slate-500 mb-2 md:mb-4">
        {eyebrow}
      </p>

      <h2 className="text-4xl md:text-5xl font-black md:font-extrabold leading-tight">
        {title}
      </h2>

      {description && (
        <p className="mt-2 md:mt-4 text-[9px] md:text-lg text-slate-400 leading-relaxed whitespace-pre-line">
          {description}
        </p>
      )}
    </div>
  );
};