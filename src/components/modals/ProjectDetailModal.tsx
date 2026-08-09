import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import BuildRoundedIcon from "@mui/icons-material/BuildRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import BugReportRoundedIcon from "@mui/icons-material/BugReportRounded";
import CloudRoundedIcon from "@mui/icons-material/CloudRounded";

import jsLogo from "../../assets/logos/javascript.png";
import tsLogo from "../../assets/logos/typescript.png";
import awsLogo from "../../assets/logos/aws.png";
import cssLogo from "../../assets/logos/css.png";
import dockerLogo from "../../assets/logos/docker.png";
import javaLogo from "../../assets/logos/java.svg";
import jenkinsLogo from "../../assets/logos/jenkins.png";
import nginxLogo from "../../assets/logos/nginx.png";
import postgresqlLogo from "../../assets/logos/postgresql.svg";
import reactLogo from "../../assets/logos/react.png";
import springLogo from "../../assets/logos/spring.svg";
import tailwindLogo from "../../assets/logos/tailwild.png";
import vercelLogo from "../../assets/logos/vercel.png";

type ProjectIssue = {
  problem: string;
  solution: string;
};

type ProjectDetail = {
  intro?: string;

  statusLabel?: string;
  duration?: string;
  team?: string;
  contribution?: string[];

  features?: string[];
  issues?: ProjectIssue[];
  takeaway?: string;
};

export type ProjectItem = {
  id: string;
  title: string;
  period?: string;
  people?: string;
  role?: string;
  techStack?: string[];
  links?: { demo?: string; repo?: string };
  detailImages?: string[];
  detail?: ProjectDetail;
};

type Props = {
  open: boolean;
  project: ProjectItem | null;
  onClose: () => void;
};

const TECH_LOGOS: Record<string, string> = {
  JavaScript: jsLogo,
  TypeScript: tsLogo,
  React: reactLogo,
  "Tailwind CSS": tailwindLogo,
  CSS: cssLogo,
  Nginx: nginxLogo,
  Docker: dockerLogo,
  Jenkins: jenkinsLogo,
  AWS: awsLogo,
  Vercel: vercelLogo,
  Java: javaLogo,
  Spring: springLogo,
  PostgreSQL: postgresqlLogo,
};

const ProjectDetailModal = ({ open, project, onClose }: Props) => {
  const [activeByProject, setActiveByProject] = useState<
    Record<string, number>
  >({});

  const images = useMemo(() => project?.detailImages ?? [], [project]);
  const activeIdx = project ? activeByProject[project.id] ?? 0 : 0;
  const mainImage = images[activeIdx];

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
  if (!open) return;

  // ✅ 모달 열리면 로고 숨김 플래그 ON
  document.body.setAttribute("data-modal-open", "true");

  return () => {
    // ✅ 모달 닫히면 플래그 OFF
    document.body.removeAttribute("data-modal-open");
  };
}, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!project) return null;

  const setActiveIdx = (nextIdx: number) => {
    setActiveByProject((prev) => ({
      ...prev,
      [project.id]: nextIdx,
    }));
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="
            project-detail-modal-overlay
            fixed
            inset-0
            z-[999]
            flex
            items-center
            justify-center
          "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="
              project-detail-modal-backdrop
              absolute
              inset-0
              bg-black/70
            "
            onClick={onClose}
          />

          <motion.div
            className="
              project-detail-modal-panel
              relative
              w-[90vw]
              md:w-[92vw]
              max-w-6xl
              max-h-[80vh]
              md:max-h-[88vh]
              rounded-xl
              md:rounded-2xl
              border
              border-white/10
              bg-slate-950
              overflow-hidden
              shadow-[0_30px_120px_rgba(0,0,0,0.85)]
            "
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
          >
            <button
              type="button"
              onClick={onClose}
              className="
                project-detail-modal-close-button
                absolute
                right-3
                top-3
                md:right-4
                md:top-4
                z-10
                w-8
                h-8
                md:w-10
                md:h-10
                rounded-xl
                bg-black/40
                border
                border-white/10
                text-white/80
                hover:text-white
                hover:bg-black/55
              "
              aria-label="닫기"
            >
              ✕
            </button>

            <ModalBody
              key={project.id}
              project={project}
              images={images}
              mainImage={mainImage}
              activeIdx={activeIdx}
              onThumbClick={setActiveIdx}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetailModal;

function ModalBody({
  project,
  images,
  mainImage,
  activeIdx,
  onThumbClick,
}: {
  project: ProjectItem;
  images: string[];
  mainImage?: string;
  activeIdx: number;
  onThumbClick: (idx: number) => void;
}) {
  const [showHint, setShowHint] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "issues">(
    "overview"
  );
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onScroll = () => {
      if (el.scrollTop > 180) setShowHint(false);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const hasOverview = Boolean(
    project.detail?.intro ||
      project.role ||
      project.detail?.duration ||
      project.detail?.team ||
      project.detail?.contribution?.length ||
      project.techStack?.length ||
      project.detail?.features?.length
  );
  const hasIssues = Boolean(
    project.detail?.issues?.length || project.detail?.takeaway
  );

  return (
    <div
      ref={scrollRef}
      className="
        project-detail-modal-body
        max-h-[88vh]
        overflow-y-auto
        relative
        no-scrollbar
      "
    >
      {/* --- 위 갤러리 --- */}
    <div
      className="
        project-detail-gallery
        p-4
        md:p-8
      "
    >
      <h2
        className="
          text-lg
          md:text-3xl
          font-extrabold
          text-slate-50
        "
      >
        {project.title}
      </h2>

        {images.length > 0 && (
        <div
          className="
            project-detail-main-image
            relative
            mt-4
            md:mt-6
            rounded-xl
            md:rounded-2xl
            overflow-hidden
            border
            border-white/10
            bg-black/20
          "
        >
          <div
            className="
              aspect-[16/12]
              md:aspect-[16/9]
              w-full
              flex
              items-center
              justify-center
            "
          >
            <img
              src={mainImage}
              alt={`${project.title} ${activeIdx + 1}`}
              className="
                w-full
                h-full
                object-contain
              "
              draggable={false}
            />
          </div>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={() =>
                  onThumbClick((activeIdx - 1 + images.length) % images.length)
                }
                className="
                  project-detail-image-prev
                  absolute
                  left-2
                  md:left-4
                  top-1/2
                  -translate-y-1/2
                  w-8
                  h-8
                  md:w-10
                  md:h-10
                  rounded-full
                  bg-black/50
                  text-white/80
                  hover:text-white
                  hover:bg-black/70
                  flex
                  items-center
                  justify-center
                  transition
                "
                aria-label="이전 이미지"
              >
                <ChevronLeftRoundedIcon fontSize="small" />
              </button>

              <button
                type="button"
                onClick={() => onThumbClick((activeIdx + 1) % images.length)}
                className="
                  project-detail-image-next
                  absolute
                  right-2
                  md:right-4
                  top-1/2
                  -translate-y-1/2
                  w-8
                  h-8
                  md:w-10
                  md:h-10
                  rounded-full
                  bg-black/50
                  text-white/80
                  hover:text-white
                  hover:bg-black/70
                  flex
                  items-center
                  justify-center
                  transition
                "
                aria-label="다음 이미지"
              >
                <ChevronRightRoundedIcon fontSize="small" />
              </button>

              <div
                className="
                  project-detail-image-counter
                  absolute
                  right-2
                  bottom-2
                  md:right-4
                  md:bottom-4
                  px-2.5
                  py-1
                  rounded-full
                  bg-black/50
                  text-white/80
                  text-[11px]
                  md:text-xs
                  font-semibold
                "
              >
                {activeIdx + 1} / {images.length}
              </div>
            </>
          )}
        </div>
        )}
      </div>

      {/* --- 스크롤 힌트 --- */}
      {showHint && (
        <div
          className="
            project-detail-scroll-hint
            sticky
            bottom-10
            flex
            justify-center
            px-6
            pointer-events-none
          "
        >
          <div
            className="
              rounded-full
              px-5
              md:px-9
              py-2.5
              md:py-4
              bg-slate-900/90
              border
              border-white/10
              text-[11px]
              md:text-sm
              text-slate-200
              animate-float
            "
          >
            스크롤을 내리면 프로젝트 정보를 확인할 수 있어요
          </div>
        </div>
      )}

      {/* --- 탭 + 상세 정보 --- */}
      <div
        className="
          project-detail-info
          px-4
          md:px-8
          pb-10
        "
      >
        {/* 탭 스위처 */}
        <div
          className="
            project-detail-tabs
            mt-4
            inline-flex
            w-full
            sm:w-auto
            gap-1
            p-1.5
            rounded-2xl
            bg-slate-900/60
            border
            border-slate-800/60
          "
        >
          {(
            [
              { key: "overview" as const, label: "개요" },
              { key: "issues" as const, label: "이슈 및 해결" },
            ]
          ).map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`
                flex-1
                sm:flex-none
                px-4
                md:px-8
                py-2
                md:py-2.5
                rounded-xl
                text-xs
                md:text-sm
                font-semibold
                transition-colors
                duration-200
                ${
                  activeTab === tab.key
                    ? "bg-slate-100 text-slate-900"
                    : "bg-transparent text-slate-400 hover:text-slate-200"
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 개요: INTRO + 개발기간·구성원·기여도 + 기술스택 + 주요기능 */}
        {activeTab === "overview" && (
          <div
            className="
              mt-4
              md:mt-6
              space-y-4
              md:space-y-6
            "
          >
            {(project.detail?.intro || project.role) && (
              <div
                className="
                  project-detail-intro
                  rounded-2xl
                  bg-white/[0.08]
                  shadow-[0_20px_45px_-12px_rgba(0,0,0,0.55),inset_0_1px_0_0_rgba(255,255,255,0.06)]
                  p-3
                  md:p-8
                "
              >
                <h3
                  className="
                    text-lg
                    font-extrabold
                    text-slate-50
                  "
                >
                  INTRO.
                </h3>
                <p
                  className="
                    mt-3
                    text-[11px]
                    md:text-[15px]
                    leading-relaxed
                    text-slate-300
                    whitespace-pre-line
                  "
                >
                  {project.detail?.intro ?? project.role ?? ""}
                </p>
              </div>
            )}

            {(project.detail?.duration ||
              project.detail?.team ||
              project.detail?.contribution?.length) && (
              <div
                className="
                  project-detail-meta
                  rounded-xl
                  md:rounded-2xl
                  bg-white/[0.08]
                  shadow-[0_20px_45px_-12px_rgba(0,0,0,0.55),inset_0_1px_0_0_rgba(255,255,255,0.06)]
                  p-3
                  md:p-8
                "
              >
                <div
                  className="
                    grid
                    gap-5
                  "
                >
                  {project.detail?.duration && (
                    <div>
                      <div
                        className="
                          text-xs
                          md:text-sm
                          font-bold
                          text-slate-100
                          flex
                          items-center
                          gap-2
                        "
                      >
                        <ScheduleRoundedIcon
                          fontSize="small"
                          className="text-teal-300"
                        />
                        개발 기간
                      </div>
                      <div
                        className="
                          mt-1
                          text-[11px]
                          md:text-sm
                          text-slate-300
                        "
                      >
                        {project.detail.duration}
                      </div>
                    </div>
                  )}

                  {project.detail?.team && (
                    <div>
                      <div
                        className="
                          text-xs
                          md:text-sm
                          font-bold
                          text-slate-100
                          flex
                          items-center
                          gap-2
                        "
                      >
                        <GroupRoundedIcon
                          fontSize="small"
                          className="text-teal-300"
                        />
                        구성원
                      </div>
                      <div
                        className="
                          mt-1
                          text-[11px]
                          md:text-sm
                          text-slate-300
                        "
                      >
                        {project.detail.team}
                      </div>
                    </div>
                  )}

                  {project.detail?.contribution?.length ? (
                    <div>
                      <div
                        className="
                          text-xs
                          md:text-sm
                          font-bold
                          text-slate-100
                          flex
                          items-center
                          gap-2
                        "
                      >
                        <BuildRoundedIcon
                          fontSize="small"
                          className="text-teal-300"
                        />
                        기여도
                      </div>
                      <div
                        className="
                          project-detail-contribution-list
                          mt-2
                          flex
                          flex-wrap
                          gap-2
                        "
                      >
                        {project.detail.contribution.map((c) => (
                          <span
                            key={c}
                            className="
                              project-detail-contribution-chip
                              px-2.5
                              md:px-3
                              py-1
                              md:py-1
                              rounded-full
                              text-[11px]
                              md:text-xs
                              font-semibold
                              bg-rose-200/15
                              text-rose-100
                              border
                              border-rose-200/20
                            "
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            )}

            {project.techStack?.length ? (
              <div
                className="
                  project-detail-tech-stack
                  rounded-2xl
                  bg-white/[0.08]
                  shadow-[0_20px_45px_-12px_rgba(0,0,0,0.55),inset_0_1px_0_0_rgba(255,255,255,0.06)]
                  p-3
                  md:p-8
                "
              >
                <div
                  className="
                    text-xs
                    md:text-sm
                    font-bold
                    text-slate-100
                    flex
                    items-center
                    gap-2
                  "
                >
                  <BuildRoundedIcon
                    fontSize="small"
                    className="text-teal-300"
                  />
                  사용된 기술 스택
                </div>

                <div
                  className="
                    mt-4
                    flex
                    flex-wrap
                    gap-4
                  "
                >
                  {project.techStack.map((tech) => {
                    const logo = TECH_LOGOS[tech];

                    return (
                      <div
                        key={tech}
                        className="
                          project-detail-tech-chip
                          flex
                          items-center
                          gap-2
                          px-2.5
                          md:px-4
                          py-1
                          md:py-2
                          rounded-lg
                          md:rounded-xl
                          bg-slate-800
                        "
                      >
                        {logo && (
                          <img
                            src={logo}
                            alt={tech}
                            className={`
                              w-5
                              h-5
                              object-contain
                              ${tech === "Vercel" ? "invert" : ""}
                            `}
                            draggable={false}
                          />
                        )}
                        <span
                          className="
                            text-[11px]
                            md:text-sm
                            font-semibold
                            text-slate-200
                          "
                        >
                          {tech}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null}

            {project.detail?.features?.length ? (
              <div
                className="
                  project-detail-features
                  rounded-2xl
                  bg-white/[0.08]
                  shadow-[0_20px_45px_-12px_rgba(0,0,0,0.55),inset_0_1px_0_0_rgba(255,255,255,0.06)]
                  p-3
                  md:p-8
                "
              >
                <div
                  className="
                    text-xs
                    md:text-sm
                    font-bold
                    text-slate-100
                    flex
                    items-center
                    gap-2
                  "
                >
                  <BoltRoundedIcon fontSize="small" className="text-teal-300" />
                  주요 기능
                </div>
                <ul
                  className="
                    project-detail-feature-list
                    mt-3
                    space-y-2
                    text-[10px]
                    md:text-sm
                    text-slate-300
                    list-disc
                    pl-5
                  "
                >
                  {project.detail.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            {!hasOverview && (
              <p className="text-sm text-slate-500">표시할 정보가 없습니다.</p>
            )}
          </div>
        )}

        {/* 문제해결: 개발 이슈 + 느낀점 */}
        {activeTab === "issues" && (
          <div
            className="
              mt-4
              md:mt-6
              space-y-4
              md:space-y-6
            "
          >
            {project.detail?.issues?.length ? (
              <div
                className="
                  project-detail-issues
                  rounded-2xl
                  bg-white/[0.08]
                  shadow-[0_20px_45px_-12px_rgba(0,0,0,0.55),inset_0_1px_0_0_rgba(255,255,255,0.06)]
                  p-4
                  md:p-8
                "
              >
                <div
                  className="
                    text-sm
                    md:text-sm
                    font-bold
                    text-slate-100
                    flex
                    items-center
                    gap-2
                  "
                >
                  <BugReportRoundedIcon
                    fontSize="small"
                    className="text-teal-300"
                  />
                  개발 이슈
                </div>

                <div
                  className="
                    mt-4
                    space-y-5
                  "
                >
                  {project.detail.issues.map((it, idx) => (
                    <div
                      key={idx}
                      className="
                        project-detail-issue-item
                        relative
                        rounded-xl
                        bg-black/25
                        p-4
                        md:p-5
                        space-y-3
                      "
                    >
                      <span
                        className="
                          hidden
                          md:block
                          absolute
                          right-4
                          top-4
                          text-[11px]
                          md:text-xs
                          font-bold
                          text-slate-600
                        "
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </span>

                      <div
                        className="
                          flex
                          items-start
                          gap-3
                        "
                      >
                        <span
                          className="
                            inline-flex
                            items-center
                            justify-center
                            shrink-0
                            h-6
                            md:h-7
                            px-2
                            md:px-3
                            rounded-md
                            text-[10px]
                            md:text-xs
                            font-semibold
                            border
                            bg-rose-500/10
                            text-rose-200
                            border-rose-500/20
                          "
                        >
                          문제
                        </span>
                        <p
                          className="
                            text-[9px]
                            md:text-sm
                            text-slate-300
                            leading-relaxed
                            whitespace-pre-line
                          "
                        >
                          {it.problem}
                        </p>
                      </div>

                      <div
                        className="
                          flex
                          items-start
                          gap-3
                        "
                      >
                        <span
                          className="
                            inline-flex
                            items-center
                            justify-center
                            shrink-0
                            h-6
                            md:h-7
                            px-2
                            md:px-3
                            rounded-md
                            text-[10px]
                            md:text-xs
                            font-semibold
                            border
                            bg-teal-500/10
                            text-teal-200
                            border-teal-500/20
                          "
                        >
                          해결
                        </span>
                        <p
                          className="
                            text-[9px]
                            md:text-sm
                            text-slate-300
                            leading-relaxed
                            whitespace-pre-line
                          "
                        >
                          {it.solution}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {project.detail?.takeaway ? (
              <div
                className="
                  project-detail-takeaway
                  rounded-2xl
                  bg-white/[0.08]
                  shadow-[0_20px_45px_-12px_rgba(0,0,0,0.55),inset_0_1px_0_0_rgba(255,255,255,0.06)]
                  p-4
                  md:p-8
                "
              >
                <div
                  className="
                    text-sm
                    md:text-sm
                    font-bold
                    text-slate-100
                    flex
                    items-center
                    gap-2
                  "
                >
                  <CloudRoundedIcon fontSize="small" className="text-teal-300" />
                  개발 후 느낀점
                </div>
                <p
                  className="
                    mt-3
                    text-[9px]
                    md:text-sm
                    text-slate-300
                    leading-relaxed
                    whitespace-pre-line
                  "
                >
                  {project.detail.takeaway}
                </p>
              </div>
            ) : null}

            {!hasIssues && (
              <p className="text-sm text-slate-500">표시할 정보가 없습니다.</p>
            )}
          </div>
        )}

        <div
          className="
            h-10
          "
        />
      </div>
    </div>
  );
}
