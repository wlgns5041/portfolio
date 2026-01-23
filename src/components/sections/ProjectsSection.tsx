import { motion } from "framer-motion";
import { projects } from "../../data/projects";
import { SectionTitle } from "../common/SectionTitle";
import { useState, lazy, Suspense } from "react";

import { projectDetails } from "../../data/projectDetails";

import jsLogo from "../../assets/logos/javascript.png";
import tsLogo from "../../assets/logos/typescript.png";
import awsLogo from "../../assets/logos/aws.png";
import cssLogo from "../../assets/logos/css.png";
import dockerLogo from "../../assets/logos/docker.png";
import jenkinsLogo from "../../assets/logos/jenkins.png";
import nginxLogo from "../../assets/logos/nginx.png";
import reactqueryLogo from "../../assets/logos/reactquery.png";
import reactLogo from "../../assets/logos/react.png";
import tailwindLogo from "../../assets/logos/tailwild.png";
import vercelLogo from "../../assets/logos/vercel.png";

type ProjectItem = (typeof projects)[number];

const ProjectPdfModal = lazy(() => import("../modals/ProjectPdfModal"));
const ProjectDetailModal = lazy(() => import("../modals/ProjectDetailModal"));
import type { ProjectItem as ModalProjectItem } from "../modals/ProjectDetailModal";

const TECH_LOGOS: Record<string, string> = {
  JavaScript: jsLogo,
  TypeScript: tsLogo,
  React: reactLogo,
  "React Query": reactqueryLogo,
  "Tailwind CSS": tailwindLogo,
  CSS: cssLogo,
  Nginx: nginxLogo,
  Docker: dockerLogo,
  Jenkins: jenkinsLogo,
  AWS: awsLogo,
  Vercel: vercelLogo,
};

const TechBox = ({ label }: { label: string }) => {
  const logo = TECH_LOGOS[label];

  return (
    <div
      title={label}
      className="
        w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10
        rounded-lg md:rounded-xl
        bg-slate-900/40
        border border-slate-800/60
        flex items-center justify-center
        shadow-[0_8px_18px_rgba(0,0,0,0.38)]
        md:shadow-[0_10px_30px_rgba(0,0,0,0.45)]
        overflow-hidden
      "
    >
      {logo ? (
        <img
          src={logo}
          alt={label}
          className={`
            w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 object-contain
            ${label === "Vercel" ? "invert" : ""}
          `}
          draggable={false}
        />
      ) : (
        <span className="text-[9px] md:text-[11px] font-semibold text-slate-200">
          {label.slice(0, 2).toUpperCase()}
        </span>
      )}
    </div>
  );
};

const highlightPeople = (text?: string) => {
  if (!text) return null;

  const targets = ["Frontend 1", "Frontend 2", "개인 프로젝트"];

  return text.split(/(Frontend 1|개인 프로젝트)/g).map((part, i) =>
    targets.includes(part) ? (
      <strong key={i} className="text-slate-300 font-semibold">
        {part}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
};

const ProjectsSection = () => {
  const [selectedPdf, setSelectedPdf] = useState<ProjectItem | null>(null);

  const [openDetail, setOpenDetail] = useState(false);
  const [activeProject, setActiveProject] = useState<ModalProjectItem | null>(
    null
  );

  const toModalProject = (p: ProjectItem): ModalProjectItem => {
    return {
      id: p.id,
      title: p.title,
      period: p.period,
      people: p.people,
      role: p.role,
      techStack: p.techStack,
      links: p.links,
      detailImages: p.detailImages ?? [],
      detail: projectDetails?.[p.id] ?? undefined,
    };
  };

  const openProject = (project: ProjectItem) => {
    // (선택) WIP는 클릭 막기
    if (project.status === "WIP") return;

    // 1) pdfUrl 있으면 PDF 모달(펫토리)
    if (project.pdfUrl) {
      setSelectedPdf(project);
      return;
    }

    // 2) 아니면 상세 모달(개인 포폴 등)
    setActiveProject(toModalProject(project));
    setOpenDetail(true);
  };

  const closePdf = () => setSelectedPdf(null);

  const closeDetail = () => {
    setOpenDetail(false);
    setActiveProject(null);
  };

  return (
    <section id="projects" className="min-h-screen bg-slate-950">
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-6 md:px-12 lg:px-24 py-16 md:py-28">
        <SectionTitle
          eyebrow="Projects"
          title="프로젝트"
          description={`현재까지 개발한 프로젝트입니다\n프로젝트를 클릭하면 자세히 볼 수 있습니다`}
        />

        <div className="mt-10 md:mt-16 grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-14">
          {projects.map((project, idx) => (
            <motion.article
              key={project.id ?? idx}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{
                duration: 0.6,
                delay: idx * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div
                onClick={() => openProject(project)}
                role="button"
                tabIndex={0}
                className="
                  group relative w-full aspect-[16/12]
                  rounded-[10px] md:rounded-[12px]
                  overflow-hidden

                  bg-slate-50
                  cursor-pointer
                  will-change-transform
                  transition-transform duration-300 ease-out
                  hover:-translate-y-1 md:hover:-translate-y-4
                  hover:ring-slate-100/100
                  flex items-center justify-center
                  [transform:translateZ(0)] [backface-visibility:hidden]
                "
                style={{ backgroundColor: idx === 1 ? "#2DD4BF" : "#F8FAFC" }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") openProject(project);
                }}
                onMouseEnter={() => {
                  if (project.status === "WIP") return;
                  if (project.pdfUrl) import("../modals/ProjectPdfModal");
                  else import("../modals/ProjectDetailModal");
                }}
              >
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    draggable={false}
                    className="
                      max-w-[40%] max-h-[40%] sm:max-w-[58%] sm:max-h-[58%] md:max-w-[50%] md:max-h-[50%]
                      object-contain
                      backface-visibility-hidden
                      transition-transform duration-500 ease-out
                    "
                  />
                ) : project.status === "WIP" ? (
                  <div className="text-slate-900 font-extrabold text-[12px] sm:text-sm md:text-xl">
                    준비 중
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-900/60 via-slate-950 to-fuchsia-900/30" />
                )}

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent" />
              </div>

              <div className="mt-2.5 md:mt-4">
                <div className="flex items-start justify-between gap-2 md:gap-6">
                  <h3 className="text-[12px] sm:text-[15px] md:text-xl font-extrabold text-slate-100 leading-snug">
                    {project.title}
                  </h3>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      openProject(project);
                    }}
                    disabled={project.status === "WIP"}
                    className={`
                      shrink-0
                      text-[8px] sm:text-xs md:text-sm
                      font-bold
                      transition
                      ${
                        project.status === "WIP"
                          ? "text-slate-600 cursor-not-allowed"
                          : "text-slate-400 hover:text-slate-200"
                      }
                    `}
                    onMouseEnter={() => {
                      if (project.status === "WIP") return;
                      if (project.pdfUrl) import("../modals/ProjectPdfModal");
                      else import("../modals/ProjectDetailModal");
                    }}
                  >
                    자세히 보기 →
                  </button>
                </div>

                <div className="mt-1 md:mt-3 flex flex-wrap items-center gap-1 md:gap-2 text-[10px] sm:text-xs md:text-sm text-slate-500">
                  <span>{project.period}</span>
                  <span className="opacity-40">|</span>
                  <span>{highlightPeople(project.people)}</span>
                </div>

                {project.role && (
                  <p className="mt-1.5 md:mt-2 text-[9px] sm:text-xs md:text-sm leading-relaxed text-slate-400 whitespace-pre-line">
                    {project.role}
                  </p>
                )}

                <div className="mt-3 md:mt-4 flex flex-wrap items-center gap-2 md:gap-4">
                  {project.links?.demo && (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="
                        inline-flex items-center gap-1
                        px-3 py-2 md:px-4 md:py-2
                        rounded-lg md:rounded-xl
                        bg-slate-800/60
                        text-[11px] sm:text-xs md:text-sm text-slate-200
                        shadow-[0_8px_20px_rgba(0,0,0,0.35)]
                        md:shadow-[0_10px_30px_rgba(0,0,0,0.4)]
                        transition-all
                        hover:bg-slate-700/60
                        md:hover:-translate-y-0.5
                      "
                    >
                      서비스 <span className="opacity-70">↗</span>
                    </a>
                  )}

                  {project.links?.repo && (
                    <a
                      href={project.links.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="
                        inline-flex items-center gap-1
                        px-3 py-2 md:px-4 md:py-2
                        rounded-lg md:rounded-xl
                        bg-slate-800/40
                        text-[11px] sm:text-xs md:text-sm text-slate-300
                        transition-all
                        hover:bg-slate-700/50
                        md:hover:-translate-y-0.5
                      "
                    >
                      GitHub <span className="opacity-70">↗</span>
                    </a>
                  )}
                </div>

                <div className="mt-3 md:mt-4 flex flex-wrap gap-1.5 sm:gap-2 md:gap-3">
                  {project.techStack?.slice(0, 9).map((tech) => (
                    <TechBox key={tech} label={tech} />
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <Suspense
        fallback={
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40">
            <div className="rounded-xl bg-slate-900/80 px-4 py-3 text-sm font-semibold text-slate-100">
              불러오는 중...
            </div>
          </div>
        }
      >
        {selectedPdf?.pdfUrl && (
          <ProjectPdfModal
            open={!!selectedPdf}
            onClose={closePdf}
            title={selectedPdf.title}
            pdfUrl={selectedPdf.pdfUrl}
          />
        )}

        <ProjectDetailModal
          open={openDetail}
          project={activeProject}
          onClose={closeDetail}
        />
      </Suspense>
    </section>
  );
};

export default ProjectsSection;