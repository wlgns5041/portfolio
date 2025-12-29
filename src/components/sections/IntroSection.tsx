import {
  motion,
  useScroll,
  useTransform,
  LayoutGroup,
  useMotionValueEvent,
} from "framer-motion";
import type { Variants } from "framer-motion";

import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";

import { useRef, useState } from "react";
import galaxyImg from "../../assets/images/galaxy.jpg";
import LogoLottie from "../common/LogoLottie";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const IntroSection = () => {
  const visualWrapperRef = useRef<HTMLDivElement>(null);

  const introHeroRef = useRef<HTMLDivElement>(null);
  const detailGridRef = useRef<HTMLDivElement>(null);

const { scrollYProgress: heroProgress } = useScroll({
  target: introHeroRef,
  offset: ["end end", "end start"],
});

  const bottomFadeHeight = useTransform(
    heroProgress,
    [0.6, 0.9, 1],
    ["200px", "500px", "800px"]
  );

  const [isDocked, setIsDocked] = useState(false);

useMotionValueEvent(heroProgress, "change", (v) => {
  setIsDocked(v > 0.02);
});

  return (
    <LayoutGroup>
      <section
        id="intro"
        className="bg-slate-950 text-slate-100 overflow-x-hidden"
      >
        {/* ================== INTRO HERO ================== */}
        <div
          ref={introHeroRef}
          className="min-h-screen flex items-center relative z-20"
        >
          <motion.div
            className="
              w-full max-w-7xl mx-auto
              px-6 md:px-12 lg:px-24
              grid grid-cols-1 lg:grid-cols-2
              gap-20 items-center
            "
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* LEFT : TEXT */}
            <div>
              <motion.p
                variants={itemVariants}
                className="text-xs tracking-[0.3em] uppercase text-slate-500 mb-8"
              >
                Frontend Developer
              </motion.p>

              <motion.h1
                variants={itemVariants}
                className="text-5xl md:text-7xl font-extrabold leading-tight"
              >
                안녕하세요
                <br />
                <span className="text-teal-400">김지훈</span>입니다
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="mt-10 text-xl text-slate-400 max-w-2xl leading-relaxed"
              >
                사용자 경험을 중심으로 문제를 정의하고,
                <br />
                배움과 개선을 멈추지 않는 책임감 있는 개발자입니다
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="mt-16 flex flex-row gap-6"
              >
                <a
                  className="
                    px-8 py-4 rounded-xl
                    bg-slate-800/70 hover:bg-slate-700/70
                    cursor-pointer
                    transition-all duration-200 ease-out
                    hover:-translate-y-1 hover:shadow-lg
                    active:translate-y-0
                  "
                >
                  이력서 다운로드 ↓
                </a>
                <a
                  className="
                    px-8 py-4 rounded-xl
                    bg-slate-800/70 hover:bg-slate-700/70
                    cursor-pointer
                    transition-all duration-200 ease-out
                    hover:-translate-y-1 hover:shadow-lg
                    active:translate-y-0
                  "
                >
                  자기소개서 다운로드 ↓
                </a>
              </motion.div>
            </div>

            {/* RIGHT : LOGO (인트로 위치) */}
            <motion.div
              className="fixed z-[999] pointer-events-none"
              animate={
                isDocked
                  ? {
                      top: 12,
                      left: 12,
                      width: 56,
                      height: 56,
                      opacity: 1,
                    }
                  : {
                      top: "50%",
                      left: "50%",
                      width: 320,
                      height: 320,
                      opacity: 0.9,
                    }
              }
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
              style={{
                transform: isDocked
                  ? "translate(0, 0)"
                  : "translate(10vw, -40%)",
              }}
            >
              <motion.div
                animate={{ scale: isDocked ? 0.4 : 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 25 }}
                style={{ transformOrigin: "center" }}
                className="w-full h-full"
              >
                <LogoLottie />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* ================== ABOUT ME ================== */}
        <div className="relative z-20">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-24">
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center"
            >
              <div className="flex items-center gap-4">
                <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-100">
                  ABOUT ME
                </h2>
              </div>

              <div className="mt-6 w-80 max-w-xl h-px bg-slate-800" />
            </motion.div>

            {/* Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-120px" }}
              className="mt-16 mb-72 ml-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
            >
              {/* 1 */}
              <motion.div variants={itemVariants} className="flex gap-5">
                <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center text-slate-200">
                  <PersonRoundedIcon sx={{ fontSize: 28 }} />
                </div>
                <div>
                  <p className="text-lg font-semibold text-slate-100">이름</p>
                  <p className="mt-2 text-slate-400">김지훈</p>
                </div>
              </motion.div>

              {/* 2 */}
              <motion.div variants={itemVariants} className="flex gap-5">
                <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center text-slate-200">
                  <CalendarMonthRoundedIcon sx={{ fontSize: 28 }} />
                </div>
                <div>
                  <p className="text-lg font-semibold text-slate-100">
                    생년월일
                  </p>
                  <p className="mt-2 text-slate-400">01.01.20</p>
                </div>
              </motion.div>

              {/* 3 */}
              <motion.div variants={itemVariants} className="flex gap-5">
                <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center text-slate-200">
                  <LocationOnRoundedIcon sx={{ fontSize: 28 }} />
                </div>
                <div>
                  <p className="text-lg font-semibold text-slate-100">위치</p>
                  <p className="mt-2 text-slate-400">인천광역시 서구</p>
                </div>
              </motion.div>

              {/* 4 */}
              <motion.div variants={itemVariants} className="flex gap-5">
                <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center text-slate-200">
                  <PhoneRoundedIcon sx={{ fontSize: 26 }} />
                </div>
                <div>
                  <p className="text-lg font-semibold text-slate-100">연락처</p>
                  <p className="mt-2 text-slate-400">010-5664-5041</p>
                </div>
              </motion.div>

              {/* 5 */}
              <motion.div variants={itemVariants} className="flex gap-5">
                <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center text-slate-200">
                  <EmailRoundedIcon sx={{ fontSize: 26 }} />
                </div>
                <div>
                  <p className="text-lg font-semibold text-slate-100">이메일</p>
                  <p className="mt-2 text-slate-400 break-all">
                    wlgns6921@gmail.com
                  </p>
                </div>
              </motion.div>

              {/* 6 */}
              <motion.div className="grid grid-cols-[56px_1fr] gap-5 items-start">
                <div className="w-14 h-14 rounded-2xl bg-slate-900 mt-1 flex items-center justify-center">
                  <EditNoteRoundedIcon sx={{ fontSize: 26, opacity: 0.85 }} />
                </div>

                <div className="min-w-0">
                  <p className="text-lg font-semibold text-slate-100 leading-none">
                    학력
                  </p>
                  <div className="mt-2 text-slate-400 leading-snug">
                    <div>성결대학교 정보통신공학과</div>
                    <div>2025.02 졸업</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* ================== SCROLL SECTION ================== */}
        <div ref={visualWrapperRef} className="relative h-[150vh]">
          <div className="relative top-10">
            <div
              ref={detailGridRef}
              className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center"
            >
              <div className="sticky top-10 h-[1100px] w-full rounded-3xl bg-black shadow-2xl overflow-hidden">
                <div
                  className="absolute inset-0 w-full h-full"
                  style={{
                    backgroundImage: `url(${galaxyImg})`,
                    backgroundSize: "contain",
                    backgroundPosition: "25% center",
                    backgroundAttachment: "fixed",
                    backgroundRepeat: "no-repeat",
                  }}
                />

                <div className="pointer-events-none absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-slate-950 to-transparent z-10" />

                <motion.div
                  style={{ height: bottomFadeHeight }}
                  className="pointer-events-none absolute bottom-0 left-0 w-full bg-gradient-to-t from-slate-950 to-transparent z-10"
                />
              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="text-slate-300 leading-relaxed"
              >
                <motion.p
                  variants={itemVariants}
                  className="text-lg text-slate-100 font-semibold mb-4"
                >
                  안녕하세요. 프론트엔드 개발자 김지훈입니다.
                </motion.p>

                <div className="border-t border-dashed border-slate-700 my-6" />

                <motion.p variants={itemVariants} className="mb-4">
                  이 단어는 저의 성향을 가장 잘 표현한다고 생각합니다.
                </motion.p>

                <motion.p
                  variants={itemVariants}
                  className="text-teal-400 font-medium mb-4 uppercase tracking-wider"
                >
                  “몰두하다: 어떤 일에 온 정신을 다 기울여 열중하다.”
                </motion.p>

                <motion.p variants={itemVariants} className="mb-6">
                  어떤 일이든 온 마음을 다해 몰두하며 목표를 달성하기 위해
                  끝까지 파고듭니다. 사용자 입장에서 수십 번 테스트하며 더 나은
                  결과를 만들어내는 것을 중요하게 생각합니다.
                </motion.p>

                <motion.div
                  variants={itemVariants}
                  className="flex flex-wrap gap-3"
                >
                  {["열정적인", "끈기있는", "섬세한", "완벽주의자"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="
                        px-4 py-1
                        rounded-full
                        text-sm
                        bg-slate-800
                        text-slate-200
                        border border-slate-700
                        transition-all
                        hover:bg-slate-700
                      "
                      >
                        #{tag}
                      </span>
                    )
                  )}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </LayoutGroup>
  );
};

export default IntroSection;
