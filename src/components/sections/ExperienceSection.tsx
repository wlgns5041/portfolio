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
    <section
      id="problem"
      className="min-h-screen bg-slate-950"
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-28">
        <SectionTitle
          eyebrow="Capabilities & Problem Solving"
          title="역량 및 문제해결"
          description="프로젝트 경험을 통해 쌓아온 기술 역량과 문제를 해결해온 과정을 정리했습니다."
        />

        {/* ================== 1) 역량 ================== */}
        <div
          className="
            mt-14
            rounded-3xl
            border border-slate-800/70
            bg-slate-900/15
            p-8 md:p-10
            shadow-[0_20px_60px_rgba(0,0,0,0.45)]
          "
        >
          {/* 헤더 */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="mt-0.5 flex h-11 w-11 items-center justify-center rounded-2xl 0 bg-slate-950/35">
                <BoltRoundedIcon
                  sx={{ fontSize: 24 }}
                  className="text-teal-300"
                />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-extrabold text-slate-100">
                  역량
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  프로젝트를 진행하며 실제로 활용했던 기술과 적용 경험을
                  정리했습니다.
                </p>
              </div>
            </div>
          </div>

          {/* ✅ 2열 카드 */}
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {capabilities.map((cap, idx) => (
              <article
                key={idx}
                className="
                  group
                  rounded-2xl
                  border border-slate-800/70
                  bg-slate-950/25
                  p-6 md:p-7
                  h-full
                  flex flex-col
                  transition
                  hover:border-slate-700/80
                  hover:bg-slate-950/35
                  hover:shadow-[0_16px_40px_rgba(0,0,0,0.35)]
                "
              >
                {/* 제목 */}
                <h4 className="text-[15px] md:text-[16px] font-extrabold text-slate-100 leading-snug">
                  {cap.title}
                </h4>

                {/* 요약(=강조 줄) */}
                <p className="mt-2 text-sm leading-relaxed text-slate-500 whitespace-pre-line">
                  {cap.summary}
                </p>

                {/* 포인트: 기본 2개만 보여서 밀도 낮추기 */}
                <ul className="mt-4 space-y-2">
                  {cap.points.map((p, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      {/* 세로 중앙 안정 */}
                      <span className="mt-[9px] h-2 w-2 rounded-full bg-teal-400/80 shrink-0" />
                      <p className="text-sm leading-relaxed text-slate-300">
                        {p}
                      </p>
                    </li>
                  ))}
                </ul>

                {/* ✅ 태그: 기본 숨김 → hover/focus에서만 노출 */}
                {cap.tags?.length ? (
                  <div
                    className="
              mt-auto pt-5
              flex flex-wrap gap-2
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
                ) : null}
              </article>
            ))}
          </div>
        </div>

        {/* ================== 2) 문제해결 ================== */}
        <div
          className="
            mt-10
            rounded-3xl
            border border-slate-800/70
            bg-slate-900/20
            p-8 md:p-10
            shadow-[0_20px_60px_rgba(0,0,0,0.45)]
          "
        >
          {/* 헤더 */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="mt-0.5 flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950/35">
                <TroubleshootRoundedIcon
                  sx={{ fontSize: 24 }}
                  className="text-indigo-300"
                />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-extrabold text-slate-100">
                  문제해결
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  문제를 정의하고, 해결 방법을 선택하며, 결과를 검증하는 과정을
                  기록했습니다.
                </p>
              </div>
            </div>
          </div>

          {/* 내부 이슈 리스트 */}
          <div className="mt-8 grid gap-6">
            {experienceCases.map((c, idx) => (
              <div
                key={idx}
                className="
                  rounded-2xl
                  border border-slate-800/70
                  bg-slate-950/30
                  p-6 md:p-7
                "
              >
                {/* 프로젝트/타이틀 */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="min-w-0">
                    {c.project && (
                      <p className="text-xs tracking-[0.28em] uppercase text-teal-300">
                        {c.project}
                      </p>
                    )}
                    <h4 className="mt-2 text-lg md:text-xl font-extrabold text-slate-100">
                      {c.title}
                    </h4>
                  </div>
                </div>

                {/* ✅ 문제/해결/성과/배운점 */}
                <div className="mt-5 grid gap-4">
                  {c.items.map((it, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-[78px_1fr] gap-4 items-start"
                    >
                      <span
                        className={`
                          inline-flex items-center justify-center
                          h-8 px-3 rounded-[6px]
                          text-xs font-semibold
                          ${badgeTone(it.label)}
                        `}
                      >
                        {it.label}
                      </span>

                      <p className="text-sm md:text-[15px] leading-relaxed text-slate-300 whitespace-pre-line">
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
