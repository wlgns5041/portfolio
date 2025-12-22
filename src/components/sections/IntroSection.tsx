import { motion, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import { useRef } from "react";
import galaxyImg from "../../assets/images/galaxy.jpg";

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const IntroSection = () => {
  const visualWrapperRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: visualWrapperRef,
    offset: ["start end", "end start"],
  });

  // 사진 높이가 길어졌으므로 페이드 마스크 높이도 더 깊게 조절
  const bottomFadeHeight = useTransform(
    scrollYProgress,
    [0.6, 0.9, 1],
    ["200px", "500px", "800px"]
  );

  return (
    // TopNav에서 감지할 수 있도록 id="intro" 확인
    <section
      id="intro"
      className="bg-slate-950 text-slate-100 overflow-x-hidden"
    >
      {/* 1. 상단 히어로 섹션 */}
      <div className="min-h-screen flex items-center relative z-20">
        <motion.div
          className="w-full max-w-6xl mx-auto px-6 md:px-12 lg:px-24"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
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
            안녕하세요,
            <br />
            <span className="text-teal-400">김지훈</span>입니다.
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="mt-10 text-xl text-slate-400 max-w-2xl leading-relaxed"
          >
            사용자 경험을 중심으로 문제를 정의하고,
            <br />
            구조적으로 해결하는 프론트엔드 개발자입니다.
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="mt-16 flex flex-row gap-6"
          >
            <a
              href="/resume.pdf"
              download
              className="flex items-center gap-3 px-8 py-4 rounded-xl bg-slate-800/70 backdrop-blur-md font-semibold shadow-lg hover:bg-slate-700/70 transition"
            >
              이력서 다운로드 <span className="text-lg">↓</span>
            </a>
            <a
              href="/cover-letter.pdf"
              download
              className="flex items-center gap-3 px-8 py-4 rounded-xl bg-slate-800/70 backdrop-blur-md font-semibold shadow-lg hover:bg-slate-700/70 transition"
            >
              자기소개서 다운로드 <span className="text-lg">↓</span>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* 2. 갤럭시 사진 고정 섹션 */}
      {/* 여백 최적화를 위해 h-[150vh] 정도로 설정 */}
      <div ref={visualWrapperRef} className="relative h-[150vh]">
        <div className="sticky top-10">
          <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-24 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            {/* [수정] 테두리 제거 및 높이를 1100px로 상향 */}
            {/* LEFT IMAGE */}
            <div className="relative h-[80vh] w-full overflow-hidden rounded-3xl shadow-2xl">
              {/* ❗ background ❌ → img ✅ */}
              <img
                src={galaxyImg}
                alt="galaxy"
                className="
                  absolute inset-0
                  w-full h-full
                  object-cover
                  object-center
                  will-change-transform
                "
              />

              {/* 상단 페이드 */}
              <div className="pointer-events-none absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-slate-950 to-transparent z-10" />

              {/* 하단 마스크 (스크롤로 열림) */}
              <motion.div
                style={{ height: bottomFadeHeight }}
                className="pointer-events-none absolute bottom-0 left-0 w-full bg-gradient-to-t from-slate-950 to-transparent z-10"
              />
            </div>

            {/* 오른쪽 텍스트 (내용 유지) */}
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
                안녕하세요! 프론트엔드 개발자 김지훈입니다.
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
                어떤 일이든 온 마음을 다해 몰두하며 목표를 달성하기 위해 끝까지
                파고듭니다. 사용자 입장에서 수십 번 테스트하며 더 나은 결과를
                만들어내는 것을 중요하게 생각합니다.
              </motion.p>
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-3"
              >
                {["열정적인", "끈기있는", "섬세한", "완벽주의자"].map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-1 rounded-full text-sm bg-slate-800 text-slate-200 border border-slate-700 transition-all hover:bg-slate-700"
                  >
                    #{tag}
                  </span>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
