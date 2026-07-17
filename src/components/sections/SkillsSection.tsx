import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { SectionTitle } from "../common/SectionTitle";
import { projects } from "../../data/projects";

import jsLogo from "../../assets/logos/javascript.png";
import tsLogo from "../../assets/logos/typescript.png";
import awsLogo from "../../assets/logos/aws.png";
import claudecodeLogo from "../../assets/logos/claudecode-color.svg";
import claudedesignLogo from "../../assets/logos/claudedesign.png";
import codexLogo from "../../assets/logos/codex.svg";
import cssLogo from "../../assets/logos/css.png";
import cursorLogo from "../../assets/logos/cursor.svg";
import dockerLogo from "../../assets/logos/docker.png";
import figmaLogo from "../../assets/logos/figma.png";
import gitLogo from "../../assets/logos/git.png";
import jenkinsLogo from "../../assets/logos/jenkins.png";
import nginxLogo from "../../assets/logos/nginx.png";
import notionLogo from "../../assets/logos/notion.png";
import reactqueryLogo from "../../assets/logos/reactquery.png";
import reactLogo from "../../assets/logos/react.png";
import redmineLogo from "../../assets/logos/redmine.svg";
import tailwindLogo from "../../assets/logos/tailwild.png";
import vercelLogo from "../../assets/logos/vercel.png";

type SkillItem = { name: string; logo?: string; proficiency: number };
type SkillGroup = {
  title: string;
  dot: string;
  iconBg: string;
  bar: string;
  items: SkillItem[];
};

const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    dot: "bg-blue-400",
    iconBg: "bg-blue-400/10",
    bar: "bg-blue-400",
    items: [
      { name: "TypeScript", logo: tsLogo, proficiency: 50 },
      { name: "JavaScript", logo: jsLogo, proficiency: 90 },
      { name: "React", logo: reactLogo, proficiency: 80 },
      { name: "React Query", logo: reactqueryLogo, proficiency: 40 },
      { name: "Tailwind CSS", logo: tailwindLogo, proficiency: 60 },
      { name: "CSS (Responsive)", logo: cssLogo, proficiency: 80 },
    ],
  },
  {
    title: "Deployment",
    dot: "bg-orange-400",
    iconBg: "bg-orange-400/10",
    bar: "bg-orange-400",
    items: [
      { name: "Nginx", logo: nginxLogo, proficiency: 90 },
      { name: "Vercel", logo: vercelLogo, proficiency: 80 },
      { name: "Docker", logo: dockerLogo, proficiency: 70 },
      { name: "Jenkins", logo: jenkinsLogo, proficiency: 60 },
      { name: "AWS", logo: awsLogo, proficiency: 50 },
    ],
  },
  {
    title: "Tools",
    dot: "bg-emerald-400",
    iconBg: "bg-emerald-400/10",
    bar: "bg-emerald-400",
    items: [
      { name: "Git", logo: gitLogo, proficiency: 90 },
      { name: "Figma", logo: figmaLogo, proficiency: 80 },
      { name: "Notion", logo: notionLogo, proficiency: 70 },
      { name: "Redmine", logo: redmineLogo, proficiency: 60 },
    ],
  },
  {
    title: "AI",
    dot: "bg-violet-400",
    iconBg: "bg-violet-400/10",
    bar: "bg-violet-400",
    items: [
      { name: "Claude Code", logo: claudecodeLogo, proficiency: 90 },
      { name: "Claude Design", logo: claudedesignLogo, proficiency: 80 },
      { name: "Codex", logo: codexLogo, proficiency: 70 },
      { name: "Cursor", logo: cursorLogo, proficiency: 60 },
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

const INVERT_LOGO_SET = new Set(["Vercel", "Git", "Notion", "Cursor"]);

const ALL_FILTER = "전체";

const SkillBar = ({
  proficiency,
  barColor,
}: {
  proficiency: number;
  barColor: string;
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [tooltipX, setTooltipX] = useState(50);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setTooltipX(Math.min(100, Math.max(0, x)));
  };

  return (
    <div
      ref={trackRef}
      onMouseMove={handleMouseMove}
      className="
        skill-chip-bar-track
        group/bar
        relative
        mt-2
        sm:mt-3
        h-1
        sm:h-1.5
        w-full
        rounded-full
        bg-slate-800
        overflow-visible
        cursor-default
      "
    >
      <div
        className="
          h-full
          w-full
          rounded-full
          overflow-hidden
        "
      >
        <div
          className={`
            h-full
            rounded-full
            origin-left
            transition-transform
            duration-200
            group-hover/bar:scale-y-150
            ${barColor}
          `}
          style={{ width: `${proficiency}%` }}
        />
      </div>

      <div
        className="
          skill-chip-bar-tooltip
          pointer-events-none
          absolute
          -top-7
          -translate-x-1/2
          px-2
          py-1
          rounded-md
          bg-slate-100
          text-slate-900
          text-[9px]
          sm:text-[11px]
          font-bold
          whitespace-nowrap
          opacity-0
          scale-90
          transition-all
          duration-200
          group-hover/bar:opacity-100
          group-hover/bar:scale-100
        "
        style={{ left: `${tooltipX}%` }}
      >
        {proficiency}%
      </div>
    </div>
  );
};

const SkillsSection = () => {
  const usageCount = buildUsageCount();
  const [activeFilter, setActiveFilter] = useState<string>(ALL_FILTER);

  const filterTabs = [ALL_FILTER, ...skillGroups.map((g) => g.title)];
  const visibleGroups =
    activeFilter === ALL_FILTER
      ? skillGroups
      : skillGroups.filter((g) => g.title === activeFilter);

  return (
    <section
      id="skills"
      className="
        skills-section
        min-h-screen
        bg-slate-950
        flex
        items-start
        md:items-center
      "
    >
      <div
        className="
          w-full
          max-w-7xl
          mx-auto
          px-5
          sm:px-6
          md:px-12
          lg:px-24
          py-16
          md:py-28
        "
      >
        <SectionTitle
          eyebrow="Skills"
          title="기술 스택"
          description={`실제 프로젝트에 적용해본 기술들입니다\n하단의 막대 그래프는 숙련도를 나타냅니다`}
        />

        <div
          className="
            skill-filter-tabs
            mt-6
            md:mt-10
            flex
            flex-wrap
            gap-2
            md:gap-3
          "
        >
          {filterTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveFilter(tab)}
              className={`
                skill-filter-tab
                px-3
                md:px-5
                py-1.5
                md:py-2.5
                rounded-full
                text-xs
                md:text-sm
                font-semibold
                transition-colors
                duration-200
                ${
                  activeFilter === tab
                    ? "bg-teal-400 text-slate-950"
                    : "bg-slate-800/60 text-slate-300 hover:bg-slate-800"
                }
              `}
            >
              {tab}
            </button>
          ))}
        </div>

        <div
          className="
            mt-8
            md:mt-16
            space-y-8
            md:space-y-16
          "
        >
          {visibleGroups.map((group) => (
            <div
              key={group.title}
              className="
                skill-category-group
              "
            >
              <h3
                className="
                  skill-category-title
                  mb-4
                  flex
                  items-center
                  gap-2
                  text-sm
                  md:text-base
                  font-semibold
                  tracking-[0.08em]
                  text-slate-100
                "
              >
                <span
                  className={`
                    w-2
                    h-2
                    rounded-full
                    ${group.dot}
                  `}
                />
                {group.title.toUpperCase()}
                <span
                  className="
                    text-xs
                    md:text-sm
                    font-normal
                    text-slate-500
                  "
                >
                  {group.items.length} skills
                </span>
              </h3>

              <div
                className="
                  skill-category-grid
                  grid
                  grid-cols-2
                  gap-3
                  sm:grid-cols-3
                  lg:grid-cols-4
                  sm:gap-4
                  md:gap-6
                "
              >
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
                        skill-chip
                        relative
                        rounded-xl
                        sm:rounded-2xl
                        bg-slate-900/60
                        border
                        border-slate-800/60
                        shadow-[0_20px_50px_rgba(0,0,0,0.6)]
                        will-change-transform
                        transition-all
                        duration-300
                        p-3
                        sm:p-4
                        md:p-5
                        flex
                        flex-col
                        gap-3
                        md:gap-4
                      "
                    >
                      <div
                        className="
                          flex
                          items-start
                          justify-between
                          gap-2
                        "
                      >
                        <div
                          className={`
                            w-9
                            h-9
                            sm:w-11
                            sm:h-11
                            md:w-14
                            md:h-14
                            rounded-xl
                            flex
                            items-center
                            justify-center
                            shrink-0
                            ${group.iconBg}
                          `}
                        >
                          {item.logo && (
                            <img
                              src={item.logo}
                              alt={item.name}
                              draggable={false}
                              className={`
                                w-5
                                h-5
                                sm:w-6
                                sm:h-6
                                md:w-8
                                md:h-8
                                object-contain
                                ${INVERT_LOGO_SET.has(item.name) ? "invert" : ""}
                              `}
                            />
                          )}
                        </div>

                        {count > 0 && (
                          <span
                            className="
                              skill-chip-count-badge
                              px-2
                              py-0.5
                              rounded-full
                              bg-slate-800
                              text-slate-300
                              text-[9px]
                              sm:text-[11px]
                              md:text-xs
                              font-semibold
                              select-none
                              whitespace-nowrap
                            "
                          >
                            {count}회
                          </span>
                        )}
                      </div>

                      <div>
                        <p
                          className="
                            text-[10px]
                            sm:text-sm
                            md:text-base
                            font-semibold
                            text-slate-100
                            truncate
                          "
                        >
                          {item.name}
                        </p>

                        <SkillBar
                          proficiency={item.proficiency}
                          barColor={group.bar}
                        />
                      </div>
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
