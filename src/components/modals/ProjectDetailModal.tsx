import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import BuildRoundedIcon from "@mui/icons-material/BuildRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import EmojiObjectsRoundedIcon from "@mui/icons-material/EmojiObjectsRounded";
import BugReportRoundedIcon from "@mui/icons-material/BugReportRounded";
import CloudRoundedIcon from "@mui/icons-material/CloudRounded";

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
  techReasons?: string; 
  issues?: ProjectIssue[]; 
  takeaway?: string; 
  highlights?: string[]; 
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
  "React Query": reactqueryLogo,
  "Tailwind CSS": tailwindLogo,
  CSS: cssLogo,
  Nginx: nginxLogo,
  Docker: dockerLogo,
  Jenkins: jenkinsLogo,
  AWS: awsLogo,
  Vercel: vercelLogo,
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
          className="fixed inset-0 z-[999] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
        >
          <div className="absolute inset-0 bg-black/70" onClick={onClose} />

          <motion.div
            className="
              relative
              w-[90vw] md:w-[92vw]
              max-w-6xl
              max-h-[80vh] md:max-h-[88vh]
              rounded-xl md:rounded-2xl
              border border-white/10
              bg-slate-950 overflow-hidden
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
                absolute right-3 top-3 md:right-4 md:top-4 z-10
                w-8 h-8 md:w-10 md:h-10 rounded-xl
                bg-black/40 border border-white/10
                text-white/80 hover:text-white hover:bg-black/55
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

  return (
    <div
      ref={scrollRef}
      className="max-h-[88vh] overflow-y-auto relative no-scrollbar"
    >
      {/* --- 위 갤러리 --- */}
    <div className="p-4 md:p-8">
      <h2 className="text-lg md:text-3xl font-extrabold text-slate-50">
        {project.title}
      </h2>

        <div className="mt-4 md:mt-6 rounded-xl md:rounded-2xl overflow-hidden border border-white/10 bg-black/20">
          <div className="aspect-[16/12] md:aspect-[16/9] w-full flex items-center justify-center">
            {mainImage ? (
              <img
                src={mainImage}
                alt={`${project.title} ${activeIdx + 1}`}
                className="w-full h-full object-contain"
                draggable={false}
              />
            ) : (
              <div className="text-slate-200">이미지 없음</div>
            )}
          </div>
        </div>

        {images.length > 0 && (
          <div className="mt-3 md:mt-4 grid grid-cols-4 md:grid-cols-4 gap-2 md:gap-3">
            {images.slice(0, 7).map((src, i) => (
              <button
                key={src + i}
                type="button"
                onClick={() => onThumbClick(i)}
                className={`
                    aspect-[16/12] md:aspect-[16/9]
                    rounded-lg md:rounded-xl
                    overflow-hidden border
                    ${i === activeIdx
                      ? "border-indigo-400/70 ring-2 ring-indigo-500/25"
                      : "border-white/10"}
                  `}
              >
                <img
                  src={src}
                  alt={`thumb ${i + 1}`}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* --- 스크롤 힌트 --- */}
      {showHint && (
        <div className="sticky bottom-10 flex justify-center px-6 pointer-events-none">
          <div
            className="
              rounded-full
              px-5 md:px-9
              py-2.5 md:py-4
              bg-slate-900/90
              border border-white/10
              text-[11px] md:text-sm
              text-slate-200
              animate-float
            "
          >
            스크롤을 내리면 프로젝트 정보를 확인할 수 있어요
          </div>
        </div>
      )}

      {/* --- 상세 정보 --- */}
      <div className="px-4 md:px-8 pb-10">
        {/* INTRO */}
        {(project.detail?.intro || project.role) && (
          <div className="mt-4 rounded-2xl border border-white/10 bg-slate-900/25 p-4 md:p-8">
            <h3 className="text-lg font-extrabold text-slate-50">INTRO.</h3>
            <p className="mt-3 text-[11px] md:text-[15px] leading-relaxed text-slate-300 whitespace-pre-line">
              {project.detail?.intro ?? project.role ?? ""}
            </p>
          </div>
        )}

        {/* META (개발기간/구성원/기여도) */}
        {(project.detail?.duration ||
          project.detail?.team ||
          project.detail?.contribution?.length) && (
          <div className="
            mt-4 md:mt-6
            rounded-xl md:rounded-2xl
            border border-white/10
            bg-slate-900/15
            p-4 md:p-8
          ">
            <div className="grid gap-5">
              {project.detail?.duration && (
                <div>
                  <div className="text-sm md:text-sm font-bold text-slate-100 flex items-center gap-2">
                    <ScheduleRoundedIcon fontSize="small" />
                    개발 기간
                  </div>
                  <div className="mt-1 text-[12px] md:text-sm text-slate-300">
                    {project.detail.duration}
                  </div>
                </div>
              )}

              {project.detail?.team && (
                <div>
                  <div className="text-sm md:text-sm font-bold text-slate-100 flex items-center gap-2">
                    <GroupRoundedIcon fontSize="small" />
                    구성원
                  </div>
                  <div className="mt-1 text-[12px] md:text-sm text-slate-300">
                    {project.detail.team}
                  </div>
                </div>
              )}

              {project.detail?.contribution?.length ? (
                <div>
                  <div className="text-sm md:text-sm font-bold text-slate-100 flex items-center gap-2">
                    <BuildRoundedIcon fontSize="small" />
                    기여도
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.detail.contribution.map((c) => (
                      <span
                        key={c}
                          className="
                            px-2.5 md:px-3
                            py-1 md:py-1
                            rounded-full
                            text-[11px] md:text-xs
                            font-semibold
                            bg-rose-200/15
                            text-rose-100
                            border border-rose-200/20
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

        {/* 사용 기술 스택(텍스트 배지) */}
        {project.techStack?.length ? (
          <div className="mt-4 md:mt-6 rounded-2xl border border-white/10 bg-slate-900/15 p-4 md:p-8">
            <div className="text-sm md:text-sm font-bold text-slate-100 flex items-center gap-2">
              <BuildRoundedIcon fontSize="small" />
              사용된 기술 스택
            </div>

            <div className="mt-4 flex flex-wrap gap-4">
              {project.techStack.map((tech) => {
                const logo = TECH_LOGOS[tech];

                return (
                  <div
                    key={tech}
                    className="
                      flex items-center gap-2
                      px-3 md:px-4
                      py-1.5 md:py-2
                      rounded-lg md:rounded-xl
                      bg-slate-900/60
                      border border-white/10
                    "
                  >
                    {logo && (
                      <img
                        src={logo}
                        alt={tech}
                        className={`
                  w-6 h-6 object-contain
                  ${tech === "Vercel" ? "invert" : ""}
                `}
                        draggable={false}
                      />
                    )}
                    <span className="text-[12px] md:text-sm font-semibold text-slate-200">
                      {tech}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}

        {/* 주요 기능 */}
        {project.detail?.features?.length ? (
          <div className="mt-4 md:mt-6 rounded-2xl border border-white/10 bg-slate-900/15 p-4 md:p-8">
            <div className="text-sm md:text-sm font-bold text-slate-100 flex items-center gap-2">
              <BoltRoundedIcon fontSize="small" />
              주요 기능
            </div>
            <ul className="mt-3 space-y-2 text-[11px] md:text-sm text-slate-300 list-disc pl-5">
              {project.detail.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {/* ✅ 핵심 하이라이트 */}
        {project.detail?.highlights?.length ? (
          <div className="mt-4 md:mt-6 rounded-2xl border border-white/10 bg-slate-900/15 p-4 md:p-8">
            <div className="text-sm md:text-sm font-bold text-slate-100 flex items-center gap-2">
              <BoltRoundedIcon fontSize="small" />
              핵심 포인트
            </div>

            <div className="mt-4 grid gap-3">
              {project.detail.highlights.map((h) => (
                <div
                  key={h}
                  className="
                    flex items-start gap-3
                    rounded-xl border border-white/10
                    bg-black/20 p-4
                  "
                >
                  <span className="mt-[6px] h-2 w-2 rounded-full bg-teal-400/80 shrink-0" />
                  <p className="text-[11px] md:text-sm text-slate-300 leading-relaxed">{h}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {/* 기술 선정 이유 */}
        {project.detail?.techReasons ? (
          <div className="mt-4 md:mt-6 rounded-2xl border border-white/10 bg-slate-900/15 p-4 md:p-8">
            <div className="text-sm md:text-sm font-bold text-slate-100 flex items-center gap-2">
              <EmojiObjectsRoundedIcon fontSize="small" />
              기술 선정 이유
            </div>
              <p className="mt-3 text-[11px] md:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                {project.detail.techReasons}
              </p>
          </div>
        ) : null}

        {/* 개발 이슈 (문제/해결) */}
        {project.detail?.issues?.length ? (
          <div className="mt-4 md:mt-6 rounded-2xl border border-white/10 bg-slate-900/15 p-4 md:p-8">
            <div className="text-sm md:text-sm font-bold text-slate-100 flex items-center gap-2">
              <BugReportRoundedIcon fontSize="small" />
              개발 이슈
            </div>

            <div className="mt-4 space-y-5">
              {project.detail.issues.map((it, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-white/10 bg-black/20 p-4"
                >
                  <div className="text-[13px] md:text-sm font-semibold text-rose-200">
                    문제
                  </div>
                  <div className="mt-1 text-[11px] md:text-sm text-slate-300 whitespace-pre-line">
                    {it.problem}
                  </div>

                  <div className="mt-4 text-[13px] md:text-sm font-semibold text-emerald-200">
                    해결
                  </div>
                  <div className="mt-1 text-[11px] md:text-sm text-slate-300 whitespace-pre-line">
                    {it.solution}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {/* 느낀점 */}
        {project.detail?.takeaway ? (
          <div className="mt-4 md:mt-6 rounded-2xl border border-white/10 bg-slate-900/15 p-4 md:p-8">
            <div className="text-sm md:text-sm font-bold text-slate-100 flex items-center gap-2">
              <CloudRoundedIcon fontSize="small" />
              개발 후 느낀점
            </div>
            <p className="mt-3 text-[11px] md:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
              {project.detail.takeaway}
            </p>
          </div>
        ) : null}

        <div className="h-10" />
      </div>
    </div>
  );
}
