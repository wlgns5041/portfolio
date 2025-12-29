import { motion } from "framer-motion";
import { SectionTitle } from "../common/SectionTitle";
import { projects } from "../../data/projects";

import jsLogo from "../../assets/logos/javascript.png";
import tsLogo from "../../assets/logos/typescript.png";
import awsLogo from "../../assets/logos/aws.png";
import cssLogo from "../../assets/logos/css.png";
import dockerLogo from "../../assets/logos/docker.png";
import figmaLogo from "../../assets/logos/figma.png";
import gitLogo from "../../assets/logos/git.png";
import jenkinsLogo from "../../assets/logos/jenkins.png";
import nginxLogo from "../../assets/logos/nginx.png";
import notionLogo from "../../assets/logos/notion.png";
import reactqueryLogo from "../../assets/logos/reactquery.png";
import reactLogo from "../../assets/logos/react.png";
import slackLogo from "../../assets/logos/slack.png";
import tailwindLogo from "../../assets/logos/tailwild.png";
import vercelLogo from "../../assets/logos/vercel.png";

type SkillItem = { name: string; logo?: string };
type SkillGroup = { title: string; items: SkillItem[] };

const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    items: [
      { name: "TypeScript", logo: tsLogo },
      { name: "JavaScript", logo: jsLogo },
      { name: "React", logo: reactLogo },
      { name: "React Query", logo: reactqueryLogo },
      { name: "Tailwind CSS", logo: tailwindLogo },
      { name: "CSS (Responsive)", logo: cssLogo },
    ],
  },
  {
    title: "Deployment",
    items: [
      { name: "Nginx", logo: nginxLogo },
      { name: "Vercel", logo: vercelLogo },
      { name: "Docker", logo: dockerLogo },
      { name: "Jenkins", logo: jenkinsLogo },
      { name: "AWS", logo: awsLogo },
    ],
  },
  {
    title: "Tools",
    items: [
      { name: "Git", logo: gitLogo },
      { name: "Figma", logo: figmaLogo },
      { name: "Notion", logo: notionLogo },
      { name: "Slack", logo: slackLogo },
    ],
  },
];

const PROJECT_TECH_TO_SKILL_NAME: Record<string, string> = {
  JavaScript: "JavaScript",
  React: "React",
  "React Query": "React Query",
  CSS: "CSS (Responsive)",
  Nginx: "Nginx",
  Docker: "Docker",
  Jenkins: "Jenkins",
  AWS: "AWS",
};

const buildUsageCount = () => {
  const counts: Record<string, number> = {};

  for (const p of projects) {
    for (const tech of p.techStack ?? []) {
      const mapped = PROJECT_TECH_TO_SKILL_NAME[tech] ?? tech;
      counts[mapped] = (counts[mapped] ?? 0) + 1;
    }
  }

  return counts;
};

const INVERT_LOGO_SET = new Set(["Vercel", "Git", "Notion"]);

const SkillsSection = () => {
  const usageCount = buildUsageCount();

  return (
    <section id="skills" className="min-h-screen bg-slate-950 flex items-center">
      <div className="w-full max-w-6xl mx-auto px-6 md:px-12 lg:px-24 py-28">
        <SectionTitle
          eyebrow="Skills"
          title="기술 스택"
          description="실제 프로젝트에 적용해본 기술들입니다"
        />

        <div className="mt-16 space-y-20">
          {skillGroups.map((group) => (
            <div key={group.title}>
              <h3 className="mb-4 text-sm md:text-base font-semibold tracking-[0.08em] text-slate-100">
                # {group.title}
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
                {group.items.map((item, i) => {
                  const count = usageCount[item.name] ?? 0;

                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{
                        duration: 0.55,
                        delay: i * 0.06,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="
                        relative
                        rounded-2xl
                        bg-slate-600/70
                        border border-slate-800/60
                        shadow-[0_35px_90px_rgba(0,0,0,0.65)]
                        cursor-pointer
                        will-change-transform
                        hover:shadow-[0_45px_120px_rgba(0,0,0,0.75)]
                        transition-all duration-300
                        hover:-translate-y-2
                        hover:scale-[1.05]
                        h-[150px]
                        flex flex-col items-center justify-center
                        hover:bg-slate-700/40
                      "
                    >
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.06] to-transparent" />

                      {count > 0 && (
                        <div
                        className="
                          absolute -top-2 -right-2
                          w-7 h-7
                          rounded-full
                          bg-white
                          text-black
                          text-[14px] font-bold
                          flex items-center justify-center
                          select-none
                          z-10
                        "
                        >
                          {count}
                        </div>
                      )}

                      {/* LOGO */}
                      {item.logo && (
                      <img
                        src={item.logo}
                        alt={item.name}
                        draggable={false}
                        className={`
                          w-14 h-14 object-contain
                          ${INVERT_LOGO_SET.has(item.name) ? "invert" : ""}
                        `}
                      />
                      )}

                      {/* LABEL */}
                      <p className="mt-4 text-sm font-semibold text-slate-200">
                        {item.name}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;