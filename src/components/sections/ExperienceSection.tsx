import { SectionTitle } from "../common/SectionTitle";
import { capabilities, experienceCases } from "../../data/experiences";

import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import TroubleshootRoundedIcon from "@mui/icons-material/TroubleshootRounded";

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

const ExperienceSection = () => {
  return (
    <section id="problem" className="min-h-screen bg-slate-950">
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-6 md:px-12 lg:px-24 py-16 md:py-28">
        <SectionTitle
          eyebrow="Capabilities & Problem Solving"
          title="역량 및 문제해결"
          description={`프로젝트 경험을 통해 쌓아온 기술 역량과\n문제를 해결해온 과정을 정리했습니다.`}
        />

        {/* ================== 1) 역량 ================== */}
        <div
          className="
            mt-4 md:mt-14
            rounded-2xl md:rounded-3xl
            p-0 sm:p-0 md:p-0
            shadow-[0_16px_40px_rgba(0,0,0,0.38)]
            md:shadow-[0_20px_60px_rgba(0,0,0,0.45)]
          "
        >
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-9 w-9 md:h-11 md:w-11 items-center justify-center rounded-xl md:rounded-2xl bg-slate-950/35">
                <BoltRoundedIcon
                  sx={{ fontSize: 22 }}
                  className="text-teal-300"
                />
              </div>

              <div className="min-w-0">
                <h3 className="text-lg md:text-2xl font-extrabold text-slate-100">
                  역량
                </h3>
                <p className="mt-0 md:mt-1 text-[10px] sm:text-sm text-slate-500 leading-relaxed">
                  프로젝트를 진행하며 실제로 활용했던 기술과 적용 경험을
                  정리했습니다.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 md:mt-8 grid gap-4 sm:gap-4 md:gap-6 md:grid-cols-2">
            {capabilities.map((cap, idx) => (
              <article
                key={idx}
                className="
                  group
                  rounded-xl md:rounded-2xl
                  border border-slate-800/70
                  bg-slate-950/25
                  p-4 sm:p-5 md:p-7
                  h-full
                  flex flex-col
                  transition
                  md:hover:border-slate-700/80
                  md:hover:bg-slate-950/35
                  md:hover:shadow-[0_16px_40px_rgba(0,0,0,0.35)]
                "
              >
                <h4 className="text-[12px] sm:text-[14px] md:text-[16px] font-extrabold text-slate-100 leading-snug">
                  {cap.title}
                </h4>

                <p className="mt-1 md:mt-2 text-[9px] sm:text-sm leading-relaxed text-slate-500 whitespace-pre-line">
                  {cap.summary}
                </p>

                <ul className="mt-3 md:mt-4 space-y-2">
                  {cap.points.map((p, i) => (
                    <li key={i} className="flex gap-2 sm:gap-3 items-start">
                      <span className="mt-[7px] md:mt-[9px] h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-teal-400/80 shrink-0" />
                      <p className="text-[10px] sm:text-sm leading-relaxed text-slate-300">
                        {p}
                      </p>
                    </li>
                  ))}
                </ul>
                {cap.tags?.length ? (
                  <>
                    <div className="mt-4 flex flex-wrap gap-1.5 sm:gap-2 md:hidden">
                      {cap.tags.slice(0, 6).map((t) => (
                        <span
                          key={t}
                          className="
                            inline-flex items-center
                            h-6 px-2 rounded-full
                            text-[10px] font-semibold
                            bg-slate-900/50
                            border border-slate-800/60
                            text-slate-300
                          "
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div
                      className="
                        mt-auto pt-5
                        hidden md:flex flex-wrap gap-2
                        opacity-0 translate-y-1
                        transition
                        group-hover:opacity-100 group-hover:translate-y-0
                        group-focus-within:opacity-100 group-focus-within:translate-y-0
                      "
                    >
                      {cap.tags.slice(0, 7).map((t) => (
                        <span
                          key={t}
                          className="
                            inline-flex items-center
                            h-7 px-3 rounded-full
                            text-xs font-semibold
                            bg-slate-900/50
                            border border-slate-800/60
                            text-slate-300
                          "
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </>
                ) : null}
              </article>
            ))}
          </div>
        </div>

        {/* ================== 2) 문제해결 ================== */}
        <div
          className="
            mt-12 md:mt-24
            rounded-2xl md:rounded-3xl
            p-0 sm:p-0 md:p-0
            shadow-[0_16px_40px_rgba(0,0,0,0.38)]
            md:shadow-[0_20px_60px_rgba(0,0,0,0.45)]
          "
        >
          {/* 헤더 */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-9 w-9 md:h-11 md:w-11 items-center justify-center rounded-xl md:rounded-2xl bg-slate-950/35">
                <TroubleshootRoundedIcon
                  sx={{ fontSize: 22 }}
                  className="text-indigo-300"
                />
              </div>

              <div className="min-w-0">
                <h3 className="text-lg md:text-2xl font-extrabold text-slate-100">
                  문제해결
                </h3>
                <p className="mt-0 md:mt-1 text-[10px] sm:text-sm text-slate-500 leading-relaxed">
                  문제를 정의하고, 해결 방법을 통해 결과를 검증하는 과정을
                  기록했습니다.
                </p>
              </div>
            </div>
          </div>

          {/* 내부 이슈 리스트 */}
          <div className="mt-5 md:mt-8 grid gap-3 sm:gap-4 md:gap-6">
            {experienceCases.map((c, idx) => (
              <div
                key={idx}
                className="
                  rounded-xl md:rounded-2xl
                  border border-slate-800/70
                  bg-slate-950/30
                  p-4 sm:p-5 md:p-7
                "
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="min-w-0">
                    {c.project && (
                      <p className="text-[10px] md:text-xs tracking-[0.24em] uppercase text-teal-300">
                        {c.project}
                      </p>
                    )}
                    <h4 className="mt-2 text-[12px] md:text-xl font-extrabold text-slate-100">
                      {c.title}
                    </h4>
                  </div>
                </div>

                <div className="mt-4 md:mt-5 grid gap-3 md:gap-4">
                  {c.items.map((it, i) => (
                  <div
                    key={i}
                    className="
                      grid grid-cols-[52px_1fr] gap-3
                      md:grid-cols-[78px_1fr] md:gap-4
                      items-center
                    "
                  >
                    {/* 라벨 */}
                    <span
                      className={`
                        inline-flex items-center justify-center
                        h-8 sm:h-7 md:h-8
                        px-1.5 md:px-3
                        rounded-md md:rounded-[6px]
                        text-[10px] md:text-xs font-semibold
                        border
                        ${badgeTone(it.label)}
                      `}
                    >
                      {it.label}
                    </span>

                    {/* 텍스트 */}
                    <p className="text-[10px] sm:text-sm md:text-[15px] leading-relaxed text-slate-300 whitespace-pre-line">
                      {it.text}
                    </p>
                  </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
