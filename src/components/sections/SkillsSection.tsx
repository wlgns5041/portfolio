import { SectionTitle } from "../common/SectionTitle";
import { coreSkills, etcSkills } from "../../data/skills";

const SkillsSection = () => {
  return (
    <section
      id="skills"
      className="min-h-screen bg-slate-950 flex items-center"
    >
      <div className="w-full max-w-6xl mx-auto px-6 md:px-12 lg:px-24">
        <SectionTitle
          eyebrow="Skills"
          title="기술 스택"
          description="실제 프로젝트에 적용해본 기술들입니다."
        />

        <div className="grid gap-16 md:grid-cols-2">
          <div>
            <h3 className="text-xl font-semibold mb-6">Frontend</h3>
            <ul className="space-y-3">
              {coreSkills.map((skill) => (
                <li key={skill.name} className="text-slate-300">
                  {skill.name}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-6">Others</h3>
            <ul className="space-y-3">
              {etcSkills.map((skill) => (
                <li key={skill.name} className="text-slate-300">
                  {skill.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
