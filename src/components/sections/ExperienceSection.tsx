import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { SectionTitle } from "../common/SectionTitle";
import { capabilities, experienceCases } from "../../data/experiences";

import BuildRoundedIcon from "@mui/icons-material/BuildRounded";
import BugReportRoundedIcon from "@mui/icons-material/BugReportRounded";

const badgeTone = (label: string) => {
  switch (label) {
    case "문제":
      return "bg-rose-500/10 text-rose-200";
    case "해결":
      return "bg-teal-500/10 text-teal-200";
    case "성과":
      return "bg-indigo-500/10 text-indigo-200";
    case "배운점":
      return "bg-amber-500/10 text-amber-200";
    default:
      return "bg-slate-500/10 text-slate-200";
  }
};

// "01 React 구조 설계 · 컴포넌트 책임 분리" -> { num, main, sub }
const CAP_TITLE_RE = /^(\d+)\s+(.+?)\s*·\s*(.+)$/;

const parseCapTitle = (title: string) => {
  const m = title.match(CAP_TITLE_RE);
  if (!m) return { num: "", main: title, sub: "" };
  return { num: m[1], main: m[2], sub: m[3] };
};

type Tab = "cap" | "case";

const ExperienceSection = () => {
  const [activeTab, setActiveTab] = useState<Tab>("cap");

  // ✅ 히어로(대표 카드) + 하단 요약 렬(rail) 패턴: 선택된 인덱스만 보관
  const [selectedCapIdx, setSelectedCapIdx] = useState(0);
  const [selectedCaseIdx, setSelectedCaseIdx] = useState(0);

  const activeCap = capabilities[selectedCapIdx];
  const { num: activeCapNum, main: activeCapMain, sub: activeCapSub } =
    parseCapTitle(activeCap.title);
  const activeCase = experienceCases[selectedCaseIdx];

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
              px-3
              md:px-8
              py-1.5
              md:py-2.5
              rounded-xl
              text-[11px]
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
              px-3
              md:px-8
              py-1.5
              md:py-2.5
              rounded-xl
              text-[11px]
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
                text-xs
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
              "
            >
              아래 목록에서 대표 카드를 변경할 수 있습니다.
            </p>

            <div
              className="
                experience-capability-hero
                mt-4
                md:mt-6
              "
            >
              <AnimatePresence mode="wait">
                <motion.article
                  key={selectedCapIdx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="
                    experience-capability-card
                    no-scrollbar
                    rounded-xl
                    md:rounded-2xl
                    bg-slate-900
                    shadow-lg
                    shadow-black/20
                    p-3
                    sm:p-6
                    md:p-8
                    sm:min-h-[250px]
                    md:min-h-[280px]
                  "
                >
                  <div
                    className="
                      experience-capability-header
                      flex
                      items-start
                      gap-3
                      md:gap-4
                    "
                  >
                    <span
                      className="
                        experience-card-number
                        shrink-0
                        w-8
                        h-8
                        md:w-14
                        md:h-14
                        flex
                        items-center
                        justify-center
                        rounded-lg
                        md:rounded-xl
                        bg-slate-800
                        text-teal-300
                        font-extrabold
                        text-sm
                        md:text-xl
                      "
                    >
                      {activeCapNum || String(selectedCapIdx + 1).padStart(2, "0")}
                    </span>

                    <div
                      className="
                        min-w-0
                      "
                    >
                      <h4
                        className="
                          experience-capability-title
                          text-xs
                          sm:text-base
                          md:text-xl
                          font-extrabold
                          text-slate-100
                          leading-snug
                        "
                      >
                        {activeCapMain}
                      </h4>

                      {activeCapSub && (
                        <p
                          className="
                            experience-capability-summary
                            mt-1
                            md:mt-1.5
                            text-[11px]
                            sm:text-sm
                            leading-relaxed
                            text-slate-500
                          "
                        >
                          {activeCapSub}
                        </p>
                      )}
                    </div>
                  </div>

                  <ul
                    className="
                      experience-capability-points
                      mt-4
                      md:mt-6
                      space-y-2
                      md:space-y-3
                    "
                  >
                    {activeCap.points.map((p, i) => (
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
                            md:text-base
                            leading-relaxed
                            text-slate-300
                          "
                        >
                          {p}
                        </p>
                      </li>
                    ))}
                  </ul>

                  {activeCap.tags?.length ? (
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
                      {activeCap.tags.map((t) => (
                        <span
                          key={t}
                          className="
                            experience-capability-tag
                            inline-flex
                            items-center
                            h-5
                            md:h-7
                            px-1.5
                            md:px-3
                            rounded-full
                            text-[9px]
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
                </motion.article>
              </AnimatePresence>
            </div>

            {/* ✅ 하단 요약 렬 — 클릭하면 위 대표 카드 교체 */}
            <div
              className="
                experience-capability-rail
                mt-4
                md:mt-5
                grid
                grid-cols-2
                sm:grid-cols-3
                gap-2
                md:gap-2.5
              "
            >
              {capabilities.map((cap, idx) => {
                const { num, main } = parseCapTitle(cap.title);
                const active = idx === selectedCapIdx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedCapIdx(idx)}
                    className={`
                      experience-capability-rail-item
                      min-w-0
                      flex
                      items-center
                      gap-1.5
                      rounded-xl
                      px-2.5
                      py-1.5
                      md:px-4
                      md:py-2.5
                      text-[10px]
                      md:text-sm
                      font-semibold
                      transition-colors
                      duration-200
                      ${
                        active
                          ? "bg-slate-100 text-slate-900"
                          : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                      }
                    `}
                  >
                    <span
                      className={`
                        shrink-0
                        ${active ? "text-slate-500" : "text-teal-300"}
                      `}
                    >
                      {num || String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="truncate">{main}</span>
                  </button>
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
                text-xs
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
              "
            >
              아래 목록에서 대표 카드를 변경할 수 있습니다.
            </p>

            {/* 대표(히어로) 카드 */}
            <div
              className="
                experience-case-hero
                mt-4
                md:mt-6
              "
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedCaseIdx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="
                    experience-case-card
                    rounded-xl
                    md:rounded-2xl
                    bg-slate-900
                    shadow-lg
                    shadow-black/20
                    p-3
                    sm:p-6
                    md:p-8
                  "
                >
                  {/* ✅ 번호 + 타이틀 */}
                  <div
                    className="
                      experience-case-header
                      flex
                      items-start
                      gap-3
                      md:gap-4
                    "
                  >
                    <span
                      className="
                        experience-card-number
                        shrink-0
                        w-8
                        h-8
                        md:w-14
                        md:h-14
                        flex
                        items-center
                        justify-center
                        rounded-lg
                        md:rounded-xl
                        bg-slate-800
                        text-indigo-300
                        font-extrabold
                        text-sm
                        md:text-xl
                      "
                    >
                      {String(selectedCaseIdx + 1).padStart(2, "0")}
                    </span>

                    <div
                      className="
                        min-w-0
                      "
                    >
                      {activeCase.project && (
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
                          {activeCase.project}
                        </p>
                      )}
                      <h4
                        className="
                          experience-case-title
                          mt-1
                          text-xs
                          sm:text-base
                          md:text-xl
                          font-extrabold
                          text-slate-100
                          leading-snug
                        "
                      >
                        {activeCase.title}
                      </h4>
                    </div>
                  </div>

                  <div
                    className="
                      experience-case-items
                      mt-4
                      md:mt-6
                      grid
                      gap-3
                      md:gap-4
                    "
                  >
                    {activeCase.items.map((it, i) => (
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
                            md:text-base
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
              </AnimatePresence>
            </div>

            {/* ✅ 하단 요약 렬 — 클릭하면 위 대표 카드 교체 */}
            <div
              className="
                experience-case-rail
                mt-4
                md:mt-5
                grid
                grid-cols-2
                sm:grid-cols-4
                gap-2
                md:gap-2.5
              "
            >
              {experienceCases.map((c, idx) => {
                const active = idx === selectedCaseIdx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedCaseIdx(idx)}
                    className={`
                      experience-case-rail-item
                      min-w-0
                      flex
                      items-center
                      gap-1.5
                      rounded-xl
                      px-2.5
                      py-1.5
                      md:px-4
                      md:py-2.5
                      text-[10px]
                      md:text-sm
                      font-semibold
                      transition-colors
                      duration-200
                      ${
                        active
                          ? "bg-slate-100 text-slate-900"
                          : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                      }
                    `}
                  >
                    <span
                      className={`
                        shrink-0
                        ${active ? "text-slate-500" : "text-indigo-300"}
                      `}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="truncate">{c.title}</span>
                  </button>
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
