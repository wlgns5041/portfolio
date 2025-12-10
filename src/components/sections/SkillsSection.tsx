import { SectionTitle } from "../common/SectionTitle";
import { coreSkills, etcSkills } from "../../data/skills";

const SkillsSection = () => {
  return (
    <section
      id="skills"
      className="min-h-screen px-6 md:px-12 lg:px-24 py-24 bg-slate-900 text-slate-50"
    >
      <SectionTitle
        eyebrow="Skills"
        title="핵심 역량 & 기술 스택"
        description="실제 프로젝트에 적용해본 기술들을 중심으로 정리했습니다."
      />

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h3 className="text-lg font-semibold mb-3">핵심 프론트엔드</h3>
          <ul className="flex flex-wrap gap-2">
            {coreSkills.map((skill) => (
              <li
                key={skill.name}
                className="px-3 py-1 rounded-full bg-slate-800 text-sm text-slate-100"
              >
                {skill.name}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">그 외</h3>
          <ul className="flex flex-wrap gap-2">
            {etcSkills.map((skill) => (
              <li
                key={skill.name}
                className="px-3 py-1 rounded-full bg-slate-800 text-sm text-slate-100"
              >
                {skill.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;