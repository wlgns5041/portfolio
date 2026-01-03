import { motion } from "framer-motion";
import { projects } from "../../data/projects";
import { SectionTitle } from "../common/SectionTitle";
import { useState } from "react";

import ProjectPdfModal from "../modals/ProjectPdfModal";
import ProjectDetailModal, {
  type ProjectItem as ModalProjectItem,
} from "../modals/ProjectDetailModal";

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
        w-10 h-10
        rounded-xl
        bg-slate-900/40
        border border-slate-800/60
        flex items-center justify-center
        shadow-[0_10px_30px_rgba(0,0,0,0.45)]
        overflow-hidden
      "
    >
      {logo ? (
        <img
          src={logo}
          alt={label}
          className={`
            w-6 h-6 object-contain
            ${label === "Vercel" ? "invert" : ""}
          `}
          draggable={false}
        />
      ) : (
        <span className="text-[11px] font-semibold text-slate-200">
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
  // ✅ PDF 모달
  const [selectedPdf, setSelectedPdf] = useState<ProjectItem | null>(null);

  // ✅ Detail 모달
  const [openDetail, setOpenDetail] = useState(false);
  const [activeProject, setActiveProject] = useState<ModalProjectItem | null>(
    null
  );

  // ✅ “카드용 Project” -> “모달용 ProjectItem” 변환 (여기서만 합치기)
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
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-28">
        <SectionTitle
          eyebrow="Projects"
          title="프로젝트"
          description={`현재까지 개발한 프로젝트입니다
            프로젝트를 클릭하면 자세히 볼 수 있습니다`}
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-14">
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
                className="
                  group
                  relative
                  w-full
                  aspect-[16/9]
                  rounded-[12px]
                  overflow-hidden
                  border border-slate-800/60
                  bg-slate-50
                  cursor-pointer
                  will-change-transform
                  transition-transform duration-300 ease-out
                  hover:-translate-y-4
                  hover:border-slate-100/100
                  flex items-center justify-center
                "
                style={{
                  backgroundColor: idx === 1 ? "#2DD4BF" : "#F8FAFC",
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") openProject(project);
                }}
              >
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    draggable={false}
                    className="
                      max-w-[55%] max-h-[55%]
                      object-contain
                      drop-shadow-[0_12px_30px_rgba(0,0,0,0.25)]
                      transition-transform duration-500 ease-out
                      group-hover:scale-[1.08]
                    "
                  />
                ) : project.status === "WIP" ? (
                  <div className="text-slate-900 font-extrabold text-lg md:text-xl">
                    준비 중
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-900/60 via-slate-950 to-fuchsia-900/30" />
                )}

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-0 bg-gradient-to-t from-black/35 to-transparent" />
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between gap-6">
                  <h3 className="text-xl md:text-1xl font-extrabold text-slate-100">
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
                      text-xs md:text-sm transition cursor-pointer
                      ${
                        project.status === "WIP"
                          ? "text-slate-600 cursor-not-allowed"
                          : "text-slate-400 hover:text-slate-200"
                      }
                    `}
                  >
                    자세히 보기 →
                  </button>
                </div>

                <div className="mt-3 flex items-center gap-3 text-sm text-slate-500">
                  <span>{project.period}</span>
                  <span className="opacity-40">|</span>
                  <span>{highlightPeople(project.people)}</span>
                </div>

                {project.role && (
                  <p className="mt-2 text-sm leading-relaxed text-slate-500 max-w-xl whitespace-pre-line">
                    {project.role}
                  </p>
                )}

                <div className="mt-4 flex items-center gap-4">
                  {project.links?.demo && (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="
                        inline-flex items-center gap-2
                        px-4 py-2
                        rounded-xl
                        bg-slate-800/60
                        text-sm text-slate-200
                        shadow-[0_10px_30px_rgba(0,0,0,0.4)]
                        transition-all
                        hover:bg-slate-700/60
                        hover:-translate-y-0.5
                      "
                    >
                      서비스 이동
                      <span className="opacity-70">↗</span>
                    </a>
                  )}

                  {project.links?.repo && (
                    <a
                      href={project.links.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="
                        inline-flex items-center gap-2
                        px-4 py-2
                        rounded-xl
                        bg-slate-800/40
                        text-sm text-slate-300
                        transition-all
                        hover:bg-slate-700/50
                        hover:-translate-y-0.5
                      "
                    >
                      GitHub
                      <span className="opacity-70">↗</span>
                    </a>
                  )}
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                  {project.techStack?.slice(0, 9).map((tech) => (
                    <TechBox key={tech} label={tech} />
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* ✅ PETORY PDF */}
      {selectedPdf?.pdfUrl && (
        <ProjectPdfModal
          open={!!selectedPdf}
          onClose={closePdf}
          title={selectedPdf.title}
          pdfUrl={selectedPdf.pdfUrl}
        />
      )}

      {/* ✅ 나머지 상세 */}
      <ProjectDetailModal
        open={openDetail}
        project={activeProject}
        onClose={closeDetail}
      />
    </section>
  );
};

export default ProjectsSection;
