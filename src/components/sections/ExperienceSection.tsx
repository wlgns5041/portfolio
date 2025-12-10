import { experiences } from "../../data/experiences";
import { SectionTitle } from "../common/SectionTitle";

const ExperienceSection = () => {
  return (
    <section
      id="experience"
      className="min-h-screen px-6 md:px-12 lg:px-24 py-24 bg-slate-900 text-slate-50"
    >
      <SectionTitle
        eyebrow="Experience"
        title="경력 & 활동"
        description="실제로 경험하고 성과를 낸 프로젝트 기반으로 성장했습니다."
      />

      <ul className="timeline space-y-12 border-l border-slate-700 pl-8">
        {experiences.map((exp, idx) => (
          <li key={idx} className="relative">
            {/* 타임라인 동그란 점 */}
            <span className="absolute -left-[19px] top-1 w-3 h-3 bg-teal-400 rounded-full"></span>

            <h3 className="text-lg font-bold text-slate-100 mb-1">
              {exp.role} · {exp.company}
            </h3>
            <p className="text-sm text-slate-400 mb-3">{exp.period}</p>

            <ul className="space-y-1 list-disc list-inside text-slate-300">
              {exp.description.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ExperienceSection;