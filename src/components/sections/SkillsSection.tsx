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
    <section
      id="skills"
      className="min-h-screen bg-slate-950 flex items-start md:items-center"
    >
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-6 md:px-12 lg:px-24 py-16 md:py-28">
        <SectionTitle
          eyebrow="Skills"
          title="기술 스택"
          description="실제 프로젝트에 적용해본 기술들입니다"
        />

        <div className="mt-10 md:mt-16 space-y-8 md:space-y-20">
          {skillGroups.map((group) => (
            <div key={group.title}>
              <h3 className="mb-4 text-sm md:text-base font-semibold tracking-[0.08em] text-slate-100">
                # {group.title}
              </h3>

              <div className="grid grid-cols-4 gap-2 sm:grid-cols-3 lg:grid-cols-6 sm:gap-4 md:gap-6">
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
                        rounded-lg sm:rounded-2xl
                        bg-slate-800/70
                        border border-slate-800/60
                        shadow-[0_20px_50px_rgba(0,0,0,0.6)]
                        will-change-transform
                        transition-all duration-300
                        h-[72px]
                        sm:h-[100px]
                        md:h-[150px]
                        md:shadow-[0_35px_90px_rgba(0,0,0,0.65)]
                        flex flex-col items-center justify-center
                      "
                    >
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.06] to-transparent" />

                      {count > 0 && (
                        <div
                          className="
                            absolute -top-1 -right-1 sm:-top-2 sm:-right-2
                            w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7
                            rounded-full
                            bg-white
                            text-black
                            text-[8px] sm:text-[12px] md:text-[14px]
                            font-bold
                            flex items-center justify-center
                            select-none
                            z-10
                          "
                        >
                          {count}
                        </div>
                      )}

                      {item.logo && (
                        <img
                          src={item.logo}
                          alt={item.name}
                          draggable={false}
                          className={`
                            w-6 h-6 sm:w-10 sm:h-10 md:w-14 md:h-14
                            object-contain
                            ${INVERT_LOGO_SET.has(item.name) ? "invert" : ""}
                          `}
                        />
                      )}

                      <p className="mt-2 sm:mt-3 md:mt-4 text-[7.5px] sm:text-xs md:text-sm font-semibold text-slate-200 text-center leading-none sm:leading-normal truncate w-full px-1">
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
