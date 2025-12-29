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
  problem: string; // 문제
  solution: string; // 해결
};

type ProjectDetail = {
  intro?: string;

  // 화면 상단 정보
  statusLabel?: string; // 예: "서비스 중", "준비 중"
  duration?: string; // 예: "2024.04 ~ 2024.08 (5개월)"
  team?: string; // 예: "개인 프로젝트", "2명 (BE 1, FE 1)"
  contribution?: string[]; // 예: ["개발 100%", "디자인 100%", "기획 100%"]

  // 내용 섹션
  features?: string[]; // 주요 기능 (bullet)
  techReasons?: string; // 기술 선정 이유 (문장/문단)
  issues?: ProjectIssue[]; // 개발 이슈 (문제/해결)
  takeaway?: string; // 개발 후 느낀점 (문장/문단)
  highlights?: string[]; // (선택) 핵심 성과/포인트
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
  // ✅ 프로젝트별로 activeIdx 기억(없으면 0)
  const [activeByProject, setActiveByProject] = useState<
    Record<string, number>
  >({});

  const images = useMemo(() => project?.detailImages ?? [], [project]);
  const activeIdx = project ? activeByProject[project.id] ?? 0 : 0;
  const mainImage = images[activeIdx];

  // ✅ 배경 스크롤 잠금만 effect로 (setState 없음)
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // ✅ ESC 닫기
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
              relative w-[92vw] max-w-6xl max-h-[88vh]
              rounded-2xl border border-white/10
              bg-slate-950 overflow-hidden
              shadow-[0_40px_160px_rgba(0,0,0,0.85)]
            "
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
          >
            <button
              type="button"
              onClick={onClose}
              className="
                absolute right-4 top-4 z-10
                w-10 h-10 rounded-xl
                bg-black/40 border border-white/10
                text-white/80 hover:text-white hover:bg-black/55
              "
              aria-label="닫기"
            >
              ✕
            </button>

            {/* ✅ project.id가 바뀌면 이 아래는 전부 리마운트 => hasScrolled 자동 초기화 */}
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
  // ✅ 리마운트 될 때마다 자동으로 true (effect 필요 없음)
  const [showHint, setShowHint] = useState(true);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // ✅ 스크롤로 소개 영역 진입 시 힌트 제거
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
      <div className="p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-50">
          {project.title}
        </h2>

        <div className="mt-6 rounded-2xl overflow-hidden border border-white/10 bg-black/20">
          <div className="aspect-[16/9] w-full flex items-center justify-center">
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
          <div className="mt-4 grid grid-cols-4 gap-3">
            {images.slice(0, 4).map((src, i) => (
              <button
                key={src + i}
                type="button"
                onClick={() => onThumbClick(i)}
                className={`
                  aspect-[16/9] rounded-xl overflow-hidden border
                  ${
                    i === activeIdx
                      ? "border-indigo-400/70 ring-2 ring-indigo-500/25"
                      : "border-white/10 hover:border-white/25"
                  }
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
        rounded-full px-9 py-4
        bg-slate-900/90 border border-white/10
        text-sm text-slate-200
        animate-float
      "
          >
            스크롤을 내리면 프로젝트 정보를 확인할 수 있어요
          </div>
        </div>
      )}

      {/* --- 상세 정보 --- */}
      <div className="px-6 md:px-8 pb-10">
        {/* INTRO */}
        {(project.detail?.intro || project.role) && (
          <div className="mt-10 rounded-2xl border border-white/10 bg-slate-900/25 p-6 md:p-8">
            <h3 className="text-lg font-extrabold text-slate-50">INTRO.</h3>
            <p className="mt-3 text-sm md:text-[15px] leading-relaxed text-slate-300 whitespace-pre-line">
              {project.detail?.intro ?? project.role ?? ""}
            </p>
          </div>
        )}

        {/* META (개발기간/구성원/기여도) */}
        {(project.detail?.duration ||
          project.detail?.team ||
          project.detail?.contribution?.length) && (
          <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/15 p-6 md:p-8">
            <div className="grid gap-5">
              {project.detail?.duration && (
                <div>
                  <div className="text-sm font-bold text-slate-100 flex items-center gap-2">
                    <ScheduleRoundedIcon fontSize="small" />
                    개발 기간
                  </div>
                  <div className="mt-1 text-sm text-slate-300">
                    {project.detail.duration}
                  </div>
                </div>
              )}

              {project.detail?.team && (
                <div>
                  <div className="text-sm font-bold text-slate-100 flex items-center gap-2">
                    <GroupRoundedIcon fontSize="small" />
                    구성원
                  </div>
                  <div className="mt-1 text-sm text-slate-300">
                    {project.detail.team}
                  </div>
                </div>
              )}

              {project.detail?.contribution?.length ? (
                <div>
                  <div className="text-sm font-bold text-slate-100 flex items-center gap-2">
                    <BuildRoundedIcon fontSize="small" />
                    기여도
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.detail.contribution.map((c) => (
                      <span
                        key={c}
                        className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-200/15 text-rose-100 border border-rose-200/20"
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
  <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/15 p-6 md:p-8">
    <div className="text-sm font-bold text-slate-100 flex items-center gap-2">
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
              flex items-center gap-3
              px-4 py-2
              rounded-xl
              bg-slate-900/60
              border border-white/10
              shadow-[0_10px_30px_rgba(0,0,0,0.35)]
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
            <span className="text-sm font-semibold text-slate-200">
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
          <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/15 p-6 md:p-8">
            <div className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <BoltRoundedIcon fontSize="small" />
              주요 기능
            </div>
            <ul className="mt-3 space-y-2 text-sm text-slate-300 list-disc pl-5">
              {project.detail.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {/* 기술 선정 이유 */}
        {project.detail?.techReasons ? (
          <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/15 p-6 md:p-8">
            <div className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <EmojiObjectsRoundedIcon fontSize="small" />
              기술 선정 이유
            </div>
            <p className="mt-3 text-sm text-slate-300 leading-relaxed whitespace-pre-line">
              {project.detail.techReasons}
            </p>
          </div>
        ) : null}

        {/* 개발 이슈 (문제/해결) */}
        {project.detail?.issues?.length ? (
          <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/15 p-6 md:p-8">
            <div className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <BugReportRoundedIcon fontSize="small" />
              개발 이슈
            </div>

            <div className="mt-4 space-y-5">
              {project.detail.issues.map((it, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-white/10 bg-black/20 p-4"
                >
                  <div className="text-sm font-semibold text-rose-200">
                    문제
                  </div>
                  <div className="mt-1 text-sm text-slate-300 whitespace-pre-line">
                    {it.problem}
                  </div>

                  <div className="mt-3 text-sm font-semibold text-emerald-200">
                    해결
                  </div>
                  <div className="mt-1 text-sm text-slate-300 whitespace-pre-line">
                    {it.solution}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {/* 느낀점 */}
        {project.detail?.takeaway ? (
          <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/15 p-6 md:p-8">
            <div className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <CloudRoundedIcon fontSize="small" />
              개발 후 느낀점
            </div>
            <p className="mt-3 text-sm text-slate-300 leading-relaxed whitespace-pre-line">
              {project.detail.takeaway}
            </p>
          </div>
        ) : null}

        <div className="h-10" />
      </div>
    </div>
  );
}
