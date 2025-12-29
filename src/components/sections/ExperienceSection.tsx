import { experiences } from "../../data/experiences";
import { SectionTitle } from "../common/SectionTitle";

const ExperienceSection = () => {
  return (
    <section
      id="experience"
      className="min-h-screen bg-slate-950 flex items-center"
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <SectionTitle
          eyebrow="Experience"
          title="경험"
          description="프로젝트와 학습을 통해 성장해온 과정입니다."
        />

        <ul className="border-l border-slate-800 pl-10 space-y-20">
          {experiences.map((exp, idx) => (
            <li key={idx} className="relative">
              <span className="absolute -left-[7px] top-2 w-2 h-2 bg-teal-400 rounded-full" />

              <h3 className="text-xl font-semibold text-slate-100">
                {exp.role}
              </h3>
              <p className="text-slate-400 mt-1">
                {exp.company} · {exp.period}
              </p>

              <ul className="mt-6 space-y-2 text-slate-300">
                {exp.description.map((d, i) => (
                  <li key={i}>– {d}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ExperienceSection;
