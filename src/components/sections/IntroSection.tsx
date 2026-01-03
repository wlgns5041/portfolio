import {
  motion,
  useScroll,
  useTransform,
  LayoutGroup,
  useMotionValueEvent,
} from "framer-motion";
import type { Variants } from "framer-motion";

import ProjectPdfModal from "../modals/ProjectPdfModal";

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

    const [pdfOpen, setPdfOpen] = useState(false);
  const [pdfTitle, setPdfTitle] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [pdfFileName, setPdfFileName] = useState("");

  const openPdf = (opts: { title: string; url: string; fileName: string }) => {
    setPdfTitle(opts.title);
    setPdfUrl(opts.url);
    setPdfFileName(opts.fileName);
    setPdfOpen(true);
  };

  const closePdf = () => setPdfOpen(false);

  const RESUME_PDF = "/pdfs/resume.pdf";
  const COVERLETTER_PDF = "/pdfs/coverletter.pdf"; 

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
 {/* ✅ 이력서 버튼 */}
                <button
                  type="button"
                  onClick={() =>
                    openPdf({
                      title: "이력서",
                      url: RESUME_PDF,
                      fileName: "김지훈_이력서.pdf",
                    })
                  }
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
                </button>


                {/* ✅ 자기소개서 버튼 */}
                <button
                  type="button"
                  onClick={() =>
                    openPdf({
                      title: "자기소개서",
                      url: COVERLETTER_PDF,
                      fileName: "김지훈_자기소개서.pdf",
                    })
                  }
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
                </button>
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
              <div className="sticky top-10 h-[1400px] w-full rounded-3xl bg-black shadow-2xl overflow-hidden">
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
                {/* 상단 인사/한줄 */}
                <motion.p
                  variants={itemVariants}
                  className="text-xl text-slate-100 font-extrabold mb-4"
                >
                  안녕하세요. 책임감 있는 프론트엔드 개발자 김지훈입니다.
                </motion.p>

                <div className="border-t border-dashed border-slate-700 my-6" />

                {/* 섹션 카드들 */}
                <div className="mt-8 grid gap-4">
                  {/* 지원 동기 */}
                  <motion.section
                    variants={itemVariants}
                    className="relative pl-8 rounded-2xl bg-slate-950/35 p-6"
                  >
                    <span className="absolute left-1 top-6 bottom-6 w-[4px] bg-slate-700/70" />
                    <p className="text-sm tracking-[0.18em] uppercase text-slate-500">
                      Motivation
                    </p>
                    <h4 className="mt-2 text-xl font-extrabold text-slate-100">
                      사용자의 경험을 가치를 만드는 일에 보람을 느꼈습니다
                    </h4>
                    <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                      웹은 서비스의 첫 인상이며, 사용자가 일상에서 가장 많이
                      접하는 공간이라 생각합니다. 눈에 보이는 UI/UX로 직접적인
                      만족을 전달하고, 웹사이트마다 다른 경험을 설계하는 과정에
                      큰 흥미를 느꼈습니다. 협업을 통해 문제를 정의하고 해결하는
                      과정 또한 제 성향과 잘 맞아 프론트엔드 개발자의 매력을
                      확신하게 되었습니다.
                    </p>
                  </motion.section>

                  {/* 역량/프로젝트 */}
                  <motion.section
                    variants={itemVariants}
                    className="relative pl-8 rounded-2xl bg-slate-950/35 p-6"
                  >
                    <span className="absolute left-1 top-6 bottom-6 w-[4px] bg-slate-700/70" />
                    <p className="text-sm tracking-[0.18em] uppercase text-slate-500">
                      Capability & Projects
                    </p>
                    <h4 className="mt-2 text-xl font-extrabold text-slate-100">
                      작은 개선을 통해 큰 사용자 경험을 만듭니다
                    </h4>

                    <ul className="mt-4 space-y-3 text-sm text-slate-300">
                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 rounded-full bg-teal-400/80 shrink-0" />
                        <span>
                          <b className="text-slate-100">PETORY</b>에서 컴포넌트
                          구조 분리, 상태 관리, 인증 구조, 에러 처리 등 서비스의
                          기본 동작을 설계하고 적용하며 기초를 다졌습니다.
                        </span>
                      </li>

                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 rounded-full bg-teal-400/80 shrink-0" />
                        <span>
                          React Query로 불필요한 네트워크 요청을 줄이고 화면
                          응답성을 개선하며 “작은 기술적 개선이 UX 차이를
                          만든다”는 점을 체감했습니다.
                        </span>
                      </li>

                      <li className="flex items-center gap-3">
                        <span className="h-2 w-2 rounded-full bg-teal-400/80 shrink-0" />
                        <span>
                          AWS 환경에서 Nginx 기반 배포와 Docker 자동 배포
                          파이프라인에 참여하며 운영/배포 프로세스 이해를
                          넓혔습니다.
                        </span>
                      </li>
                    </ul>
                  </motion.section>

                  {/* 문제 해결 */}
                  <motion.section
                    variants={itemVariants}
                    className="relative pl-8 rounded-2xl bg-slate-950/35 p-6"
                  >
                    <span className="absolute left-1 top-6 bottom-6 w-[4px] bg-slate-700/70" />
                    <p className="text-sm tracking-[0.18em] uppercase text-slate-500">
                      Problem Solving
                    </p>
                    <h4 className="mt-2 text-xl font-extrabold text-slate-100">
                      해결할 때까지 절대 포기하지 않는 책임감
                    </h4>

                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div className="rounded-xl bg-slate-900/40 border border-slate-800/60 p-4">
                        <p className="text-xs text-slate-400">
                          불필요한 API 호출 감소
                        </p>
                        <p className="mt-1 text-lg font-extrabold text-teal-300">
                          70~80%
                        </p>
                      </div>

                      <div className="rounded-xl bg-slate-900/40 border border-slate-800/60 p-4">
                        <p className="text-xs text-slate-400">
                          재방문 로딩 시간
                        </p>
                        <p className="mt-1 text-lg font-extrabold text-teal-300">
                          35~40ms
                        </p>
                      </div>
                    </div>

                    <p className="mt-4 text-sm text-slate-300 leading-relaxed">
                      또한 반응형 구현 과정에서 브라우저별 주소창/뷰포트 동작
                      차이로 레이아웃이 잘리거나 빈 공간이 생기는 문제를
                      겪었습니다. 각 환경의 뷰포트를 비교 분석하고 CSS 변수를
                      활용해 실시간 높이를 계산하는 방식으로 안정적인 UI를
                      제공했습니다.
                    </p>
                  </motion.section>

                  {/* 협업 */}
                  <motion.section
                    variants={itemVariants}
                    className="relative pl-8 rounded-2xl bg-slate-950/35 p-6"
                  >
                    <span className="absolute left-1 top-6 bottom-6 w-[4px] bg-slate-700/70" />
                    <p className="text-sm tracking-[0.18em] uppercase text-slate-500">
                      Collaboration
                    </p>
                    <h4 className="mt-2 text-xl font-extrabold text-slate-100">
                      팀의 성공을 위해, 제가 먼저 움직입니다
                    </h4>
                    <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                      프론트엔드를 전담하며 기능 구현뿐만 아니라 데이터 구조
                      협의, 예외 처리 방식 제안 등 서비스 흐름을 먼저 고려해
                      조율해 왔습니다. 문제가 발견되면 먼저 해결하고 과정을
                      투명하게 공유해 팀 효율을 높이고자 노력했습니다.
                    </p>
                  </motion.section>

                  {/* 포부 */}
                  <motion.section
                    variants={itemVariants}
                    className="relative pl-8 rounded-2xl bg-slate-950/35 p-6"
                  >
                    <span className="absolute left-1 top-6 bottom-6 w-[4px] bg-slate-700/70" />
                    <p className="text-sm tracking-[0.18em] uppercase text-slate-500">
                      Goal
                    </p>
                    <h4 className="mt-2 text-xl font-extrabold text-slate-100">
                      믿고 맡길 수 있는 동료로 성장하겠습니다
                    </h4>
                    <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                      회사의 서비스 구조를 빠르게 이해하고, 사용자 경험을
                      향상시키는 방향으로 능동적으로 기여하겠습니다. 반응형 UI,
                      성능 최적화, 접근성 같은 기본기를 탄탄히 다지고, 필요한
                      일을 먼저 찾아 실행하며 팀에 신뢰를 주는 개발자가
                      되겠습니다.
                    </p>
                  </motion.section>
                </div>
                <div className="border-t border-dashed border-slate-700 my-6" />
                <motion.div
                  variants={itemVariants}
                  className="mt-4 flex flex-wrap gap-4 justify-end"
                >
                  {["열정적인", "끈기있는", "섬세한", "책임감"].map((tag) => (
                    <span
                      key={tag}
                      className="
                        px-3 py-1 rounded-full text-sm
                        bg-slate-800 text-slate-200
                        border border-slate-700
                        transition-all hover:bg-slate-700
                      "
                    >
                      #{tag}
                    </span>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
        <ProjectPdfModal
          open={pdfOpen}
          onClose={closePdf}
          title={pdfTitle}
          pdfUrl={pdfUrl}
          fileName={pdfFileName}
        />
      </section>
    </LayoutGroup>
  );
};

export default IntroSection;
