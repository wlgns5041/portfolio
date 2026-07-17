import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { SectionTitle } from "../common/SectionTitle";
import { capabilities, experienceCases } from "../../data/experiences";

import BuildRoundedIcon from "@mui/icons-material/BuildRounded";
import BugReportRoundedIcon from "@mui/icons-material/BugReportRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";

const badgeTone = (label: string) => {
  switch (label) {
    case "문제":
      return "bg-rose-500/10 text-rose-200 border-rose-500/20";
    case "해결":
      return "bg-teal-500/10 text-teal-200 border-teal-500/20";
    case "성과":
      return "bg-indigo-500/10 text-indigo-200 border-indigo-500/20";
    case "배운점":
      return "bg-amber-500/10 text-amber-200 border-amber-500/20";
    default:
      return "bg-slate-500/10 text-slate-200 border-slate-500/20";
  }
};

// ✅ 모바일 감지 훅 (원하면 다른 파일로 빼도 됨)
function useIsMobile(breakpoint = 767) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const apply = () => setIsMobile(mq.matches);
    apply();

    if (mq.addEventListener) mq.addEventListener("change", apply);
    else mq.addListener(apply);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", apply);
      else mq.removeListener(apply);
    };
  }, [breakpoint]);

  return isMobile;
}

// "01 React 구조 설계 · 컴포넌트 책임 분리" -> { num, main, sub }
const CAP_TITLE_RE = /^(\d+)\s+(.+?)\s*·\s*(.+)$/;

const parseCapTitle = (title: string) => {
  const m = title.match(CAP_TITLE_RE);
  if (!m) return { num: "", main: title, sub: "" };
  return { num: m[1], main: m[2], sub: m[3] };
};

type Tab = "cap" | "case";

const ExperienceSection = () => {
  const isMobile = useIsMobile(767);

  const [activeTab, setActiveTab] = useState<Tab>("cap");

  // ✅ 단일 openKey → 다중 openKeys(Set)
  const [openKeys, setOpenKeys] = useState<Set<string>>(() => new Set());

  // ✅ stable key 생성 (idx 기반이어도 ok / project+title이면 더 안전)
  const caseKey = (idx: number) => `case-${idx}`;

  // ✅ 토글: 모바일에서만 작동 + 여러 개 유지
  const toggle = (key: string) => {
    if (!isMobile) return;
    setOpenKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <section
      id="problem"
      className="
        experience-section
        min-h-screen
        bg-slate-950
      "
    >
      <div
        className="
          w-full
          max-w-[1480px]
          mx-auto
          px-5
          sm:px-6
          md:px-10
          lg:px-[4rem]
          py-16
          md:py-28
        "
      >
        <SectionTitle
          eyebrow="Capabilities & Problem Solving"
          title="역량 및 문제해결"
          description={`프로젝트 경험을 통해 쌓아온 기술 역량과\n문제를 해결해온 과정을 정리했습니다.`}
        />

        {/* ================== TABS ================== */}
        <div
          className="
            experience-tabs
            -mt-10
            md:-mt-16
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
          <button
            type="button"
            onClick={() => setActiveTab("cap")}
            className={`
              experience-tab
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
                activeTab === "cap"
                  ? "bg-slate-100 text-slate-900"
                  : "bg-transparent text-slate-400 hover:text-slate-200"
              }
            `}
          >
            역량
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("case")}
            className={`
              experience-tab
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
                activeTab === "case"
                  ? "bg-slate-100 text-slate-900"
                  : "bg-transparent text-slate-400 hover:text-slate-200"
              }
            `}
          >
            문제해결
          </button>
        </div>

        {/* ================== 1) 역량 ================== */}
        {activeTab === "cap" && (
          <div
            className="
              experience-capabilities-panel
              mt-8
              md:mt-12
            "
          >
            <h3
              className="
                experience-panel-heading
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
              <BuildRoundedIcon
                sx={{ fontSize: 18 }}
                className="
                  text-teal-300
                "
              />
              역량
              <span
                className="
                  text-xs
                  md:text-sm
                  font-normal
                  text-slate-500
                "
              >
                {capabilities.length}
              </span>
            </h3>

            <p
              className="
                mt-2
                text-[10px]
                sm:text-xs
                text-slate-500
                leading-relaxed
                md:hidden
              "
            >
              각 카드를 클릭해 상세하게 볼 수 있습니다.
            </p>

            <div
              className="
                experience-capabilities-grid
                mt-4
                md:mt-6
                grid
                gap-4
                sm:gap-4
                md:gap-6
                md:grid-cols-2
              "
            >
              {capabilities.map((cap, idx) => {
                const key = `cap:${idx}`;
                const opened = !isMobile ? true : openKeys.has(key);
                const { num, main, sub } = parseCapTitle(cap.title);

                return (
                  <article
                    key={idx}
                    onClick={() => toggle(key)}
                    role={isMobile ? "button" : undefined}
                    tabIndex={isMobile ? 0 : -1}
                    onKeyDown={(e) => {
                      if (!isMobile) return;
                      if (e.key === "Enter" || e.key === " ") toggle(key);
                    }}
                    className={`
                      experience-capability-card
                      group
                      rounded-xl
                      md:rounded-2xl
                      border
                      border-slate-800/70
                      bg-slate-950/25
                      p-4
                      sm:p-5
                      md:p-7
                      h-full
                      flex
                      flex-col
                      transition
                      ${
                        !isMobile
                          ? "md:hover:border-slate-700/80 md:hover:bg-slate-950/35"
                          : ""
                      }
                      ${isMobile ? "cursor-pointer" : "cursor-default"}
                      select-none
                    `}
                  >
                    {/* ✅ 헤더(번호 + 타이틀 + 우측 아이콘) */}
                    <div
                      className="
                        experience-capability-header
                        flex
                        items-start
                        justify-between
                        gap-3
                      "
                    >
                      <div
                        className="
                          flex
                          items-start
                          gap-3
                          md:gap-4
                          min-w-0
                        "
                      >
                        <span
                          className="
                            experience-card-number
                            shrink-0
                            rounded-lg
                            md:rounded-xl
                            bg-slate-900/60
                            text-teal-300
                            font-extrabold
                            text-base
                            md:text-xl
                            px-2.5
                            py-1
                            md:px-3.5
                            md:py-1.5
                          "
                        >
                          {num || String(idx + 1).padStart(2, "0")}
                        </span>

                        <div
                          className="
                            min-w-0
                          "
                        >
                          <h4
                            className="
                              experience-capability-title
                              text-[12px]
                              sm:text-[14px]
                              md:text-[16px]
                              font-extrabold
                              text-slate-100
                              leading-snug
                            "
                          >
                            {main}
                          </h4>

                          {sub && (
                            <p
                              className="
                                experience-capability-summary
                                mt-1
                                md:mt-1.5
                                text-[9px]
                                sm:text-xs
                                leading-relaxed
                                text-slate-500
                              "
                            >
                              {sub}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* ✅ 우측 끝 토글 표시 */}
                      <div
                        className="
                          shrink-0
                          pt-0.5
                        "
                      >
                        {isMobile && (
                          <motion.div
                            animate={{
                              rotate: opened ? 180 : 0,
                              opacity: isMobile ? 1 : 0.35,
                            }}
                            transition={{ duration: 0.18, ease: "easeOut" }}
                            className="
                              experience-capability-toggle
                              w-8
                              h-8
                              rounded-lg
                              bg-slate-900/40
                              flex
                              items-center
                              justify-center
                              text-slate-200
                            "
                            aria-hidden="true"
                          >
                            <ExpandMoreRoundedIcon fontSize="small" />
                          </motion.div>
                        )}
                      </div>
                    </div>

                    {/* ✅ 상세(모바일은 토글, PC는 항상 노출) */}
                    <AnimatePresence initial={false}>
                      {opened && (
                        <motion.div
                          key="cap-detail"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                          className="
                            experience-capability-detail
                            overflow-hidden
                          "
                        >
                          <ul
                            className="
                              experience-capability-points
                              mt-3
                              md:mt-4
                              space-y-2
                            "
                          >
                            {cap.points.map((p, i) => (
                              <li
                                key={i}
                                className="
                                  experience-capability-point
                                  flex
                                  gap-2
                                  sm:gap-3
                                  items-start
                                "
                              >
                                <span
                                  className="
                                    mt-[7px]
                                    md:mt-[9px]
                                    h-1.5
                                    w-1.5
                                    md:h-2
                                    md:w-2
                                    rounded-full
                                    bg-teal-400/80
                                    shrink-0
                                  "
                                />
                                <p
                                  className="
                                    text-[10px]
                                    sm:text-sm
                                    leading-relaxed
                                    text-slate-300
                                  "
                                >
                                  {p}
                                </p>
                              </li>
                            ))}
                          </ul>

                          {cap.tags?.length ? (
                            <div
                              className="
                                experience-capability-tags
                                mt-4
                                md:mt-6
                                flex
                                flex-wrap
                                gap-1.5
                                sm:gap-2
                              "
                            >
                              {cap.tags.slice(0, isMobile ? 6 : 7).map((t) => (
                                <span
                                  key={t}
                                  className="
                                    experience-capability-tag
                                    inline-flex
                                    items-center
                                    h-6
                                    md:h-7
                                    px-2
                                    md:px-3
                                    rounded-full
                                    text-[10px]
                                    md:text-xs
                                    font-semibold
                                    bg-slate-900/50
                                    border
                                    border-slate-800/60
                                    text-slate-300
                                  "
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          ) : null}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </article>
                );
              })}
            </div>
          </div>
        )}

        {/* ================== 2) 문제해결 ================== */}
        {activeTab === "case" && (
          <div
            className="
              experience-problem-panel
              mt-8
              md:mt-12
            "
          >
            <h3
              className="
                experience-panel-heading
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
              <BugReportRoundedIcon
                sx={{ fontSize: 18 }}
                className="
                  text-indigo-300
                "
              />
              문제해결
              <span
                className="
                  text-xs
                  md:text-sm
                  font-normal
                  text-slate-500
                "
              >
                {experienceCases.length}
              </span>
            </h3>

            <p
              className="
                mt-2
                text-[10px]
                sm:text-xs
                text-slate-500
                leading-relaxed
                md:hidden
              "
            >
              각 카드를 클릭해 상세하게 볼 수 있습니다.
            </p>

            {/* 내부 이슈 리스트 */}
            <div
              className="
                experience-cases-grid
                mt-4
                md:mt-6
                grid
                gap-3
                sm:gap-4
                md:gap-6
                md:grid-cols-2
              "
            >
              {experienceCases.map((c, idx) => {
                const key = caseKey(idx);
                const opened = !isMobile ? true : openKeys.has(key);

                return (
                  <div
                    key={idx}
                    onClick={() => toggle(key)}
                    role={isMobile ? "button" : undefined}
                    tabIndex={isMobile ? 0 : -1}
                    onKeyDown={(e) => {
                      if (!isMobile) return;
                      if (e.key === "Enter" || e.key === " ") toggle(key);
                    }}
                    className={`
                      experience-case-card
                      rounded-xl
                      md:rounded-2xl
                      border
                      border-slate-800/70
                      bg-slate-950/30
                      p-4
                      sm:p-5
                      md:p-7
                      ${isMobile ? "cursor-pointer" : "cursor-default"}
                      select-none
                    `}
                  >
                    {/* ✅ 번호 + 타이틀 + 우측 아이콘 */}
                    <div
                      className="
                        experience-case-header
                        flex
                        items-start
                        justify-between
                        gap-3
                      "
                    >
                      <div
                        className="
                          flex
                          items-start
                          gap-3
                          md:gap-4
                          min-w-0
                        "
                      >
                        <span
                          className="
                            experience-card-number
                            shrink-0
                            rounded-lg
                            md:rounded-xl
                            bg-slate-900/60
                            text-indigo-300
                            font-extrabold
                            text-base
                            md:text-xl
                            px-2.5
                            py-1
                            md:px-3.5
                            md:py-1.5
                          "
                        >
                          {String(idx + 1).padStart(2, "0")}
                        </span>

                        <div
                          className="
                            min-w-0
                          "
                        >
                          {c.project && (
                            <p
                              className="
                                experience-case-project
                                text-[10px]
                                md:text-xs
                                tracking-[0.24em]
                                uppercase
                                text-teal-300
                              "
                            >
                              {c.project}
                            </p>
                          )}
                          <h4
                            className="
                              experience-case-title
                              mt-1
                              text-[12px]
                              sm:text-[14px]
                              md:text-[16px]
                              font-extrabold
                              text-slate-100
                              leading-snug
                            "
                          >
                            {c.title}
                          </h4>
                        </div>
                      </div>

                      <div
                        className="
                          shrink-0
                          pt-0.5
                        "
                      >
                        {isMobile && (
                          <motion.div
                            animate={{
                              rotate: opened ? 180 : 0,
                              opacity: isMobile ? 1 : 0.35,
                            }}
                            transition={{ duration: 0.18, ease: "easeOut" }}
                            className="
                              experience-case-toggle
                              w-8
                              h-8
                              rounded-lg
                              bg-slate-900/40
                              flex
                              items-center
                              justify-center
                              text-slate-200
                            "
                            aria-hidden="true"
                          >
                            <ExpandMoreRoundedIcon fontSize="small" />
                          </motion.div>
                        )}
                      </div>
                    </div>

                    {/* ✅ 상세(모바일 토글 / PC 항상 노출) */}
                    <AnimatePresence initial={false}>
                      {opened && (
                        <motion.div
                          key="case-detail"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                          className="
                            experience-case-detail
                            overflow-hidden
                          "
                        >
                          <div
                            className="
                              experience-case-items
                              mt-3
                              md:mt-4
                              grid
                              gap-3
                              md:gap-4
                            "
                          >
                            {c.items.map((it, i) => (
                              <div
                                key={i}
                                className="
                                  experience-case-item
                                  flex
                                  items-start
                                  gap-3
                                  md:gap-4
                                "
                              >
                                <span
                                  className={`
                                    experience-case-badge
                                    inline-flex
                                    items-center
                                    justify-center
                                    shrink-0
                                    h-6
                                    md:h-7
                                    px-2
                                    md:px-3
                                    rounded-md
                                    md:rounded-[6px]
                                    text-[10px]
                                    md:text-xs
                                    font-semibold
                                    border
                                    ${badgeTone(it.label)}
                                  `}
                                >
                                  {it.label}
                                </span>

                                <p
                                  className="
                                    experience-case-item-text
                                    text-[10px]
                                    sm:text-sm
                                    leading-relaxed
                                    text-slate-300
                                    whitespace-pre-line
                                  "
                                >
                                  {it.text}
                                </p>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ExperienceSection;
