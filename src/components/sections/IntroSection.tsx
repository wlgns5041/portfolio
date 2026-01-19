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

import { useEffect, useRef, useState} from "react";
import galaxyImg from "../../assets/images/galaxy.jpg";
import LogoLottie from "../common/LogoLottie";

import { createPortal } from "react-dom";

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

  const [isMobile, setIsMobile] = useState(false);

  const [isAnyModalOpen, setIsAnyModalOpen] = useState(false);

useEffect(() => {
  const el = document.body;

  const update = () => {
    setIsAnyModalOpen(el.getAttribute("data-modal-open") === "true");
  };

  update();

  const mo = new MutationObserver(update);
  mo.observe(el, { attributes: true, attributeFilter: ["data-modal-open"] });

  return () => mo.disconnect();
}, []);

    useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");

    const apply = () => setIsMobile(mq.matches);
    apply();

    if (mq.addEventListener) mq.addEventListener("change", apply);
    else mq.addListener(apply);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", apply);
      else mq.removeListener(apply);
    };
  }, []);

  useMotionValueEvent(heroProgress, "change", (v) => {
    if (!isMobile) setIsDocked(v > 0.02);
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

 useEffect(() => {
    if (!isMobile) return;

    const onScroll = () => {
      const y = window.scrollY || 0;
      setIsDocked(y > 10);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobile]);

  return (
    <LayoutGroup>
      <section
        id="intro"
        className="bg-slate-950 text-slate-100 [overflow-x:clip] pb-20 md:pb-80"
      >
        {/* ================== INTRO HERO ================== */}
        <div
          ref={introHeroRef}
          className={`
            flex relative z-20
            ${
              isMobile
                ? "min-h-[54svh] items-start pt-12 pb-10"
                : "min-h-screen items-center"
            }
          `}
        >
          <motion.div
            className="
              w-full max-w-7xl mx-auto
              px-6 md:px-12 lg:px-24
              grid grid-cols-1 lg:grid-cols-2
              gap-10 md:gap-20
              items-center
            "
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* LEFT : TEXT */}
            <div className="relative">
              <motion.p
                variants={itemVariants}
                className="text-xs tracking-[0.05em] md:tracking-[0.3em] uppercase text-slate-500 mb-2 md:mb-8"
              >
                Frontend Developer
              </motion.p>

              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-7xl font-black md:font-extrabold leading-tight"
              >
                안녕하세요
                <br />
                <span className="text-teal-400">김지훈</span>입니다
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="mt-2 md:mt-10 text-[9px] md:text-xl text-slate-400 max-w-2xl leading-relaxed pr-[140px] md:pr-0"
              >
                사용자 경험을 중심으로 문제를 정의하고,
                <br />
                배움과 개선을 멈추지 않는 책임감 있는 개발자입니다
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="
                  mt-8 md:mt-16
                  grid grid-cols-2 gap-3
                  md:flex md:flex-row md:gap-6
                "
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
                    w-full
                    px-4 md:px-8 py-3.5 md:py-4 rounded-xl
                    bg-slate-800/70 hover:bg-slate-700/70
                    cursor-pointer
                    transition-all duration-200 ease-out
                    hover:-translate-y-1 hover:shadow-lg
                    active:translate-y-0
                    text-[12px] md:text-base
                    whitespace-nowrap
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
                    w-full
                    px-4 md:px-8 py-3.5 md:py-4 rounded-xl
                    bg-slate-800/70 hover:bg-slate-700/70
                    cursor-pointer
                    transition-all duration-200 ease-out
                    hover:-translate-y-1 hover:shadow-lg
                    active:translate-y-0
                    text-[12px] md:text-base
                    whitespace-nowrap
                  "
                >
                  자기소개서 다운로드 ↓
                </button>
              </motion.div>
            </div>

            {/* RIGHT : LOGO (인트로 위치) */}
            {!isAnyModalOpen &&
              createPortal(
                <motion.div
                  className="logo-lottie-wrapper fixed pointer-events-none z-[2147483647]"
                  style={{ isolation: "isolate" }}
                  initial={false}
                  animate={
                    isMobile
                      ? isDocked
                        ? {
                            top: -2,
                            left: -12,
                            width: 100,
                            height: 100,
                            opacity: 0.9,
                            x: 0,
                            y: 0,
                          }
                        : {
                            top: 64,
                            left: "calc(100vw - 24px - 130px)",
                            width: 130,
                            height: 130,
                            opacity: 1,
                            x: 0,
                            y: 0,
                          }
                      : isDocked
                      ? {
                          top: 12,
                          left: 24,
                          width: 120,
                          height: 120,
                          opacity: 0.9,
                          x: 0,
                          y: 0,
                        }
                      : {
                          top: "50%",
                          left: "50%",
                          width: 320,
                          height: 320,
                          opacity: 1,
                          x: "10vw",
                          y: "-50%",
                        }
                  }
                  transition={{ type: "spring", stiffness: 260, damping: 25 }}
                >
                  <motion.div
                    animate={{ scale: isDocked ? (isMobile ? 0.45 : 1) : 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 25 }}
                    style={{ transformOrigin: "center" }}
                    className="w-full h-full"
                  >
                    <LogoLottie />
                  </motion.div>
                </motion.div>,
                document.body
              )}
          </motion.div>
        </div>

        {/* ================== ABOUT ME ================== */}
        <div className="relative z-20">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-0 md:py-24">
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center"
            >
              <div className="flex items-center gap-4">
                <h2 className="text-3xl md:text-6xl font-extrabold tracking-tight text-slate-100">
                  ABOUT ME
                </h2>
              </div>

              <div className="mt-2 md:mt-6 w-40 md:w-80 max-w-xl h-px bg-slate-800" />
            </motion.div>

            {/* Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-120px" }}
              className="
                mt-8 md:mt-16
                mb-20 md:mb-72
                ml-2 md:ml-12
                mr-2 md:mr-0
                grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3
                gap-x-2 gap-y-6 md:gap-10
              "
            >
              {/* 1 */}
              <motion.div
                variants={itemVariants}
                className="flex gap-3 md:gap-5"
              >
                <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-slate-900 flex items-center justify-center text-slate-200">
                  <PersonRoundedIcon sx={{ fontSize: 22 }} />
                </div>

                <div>
                  <p className="text-sm md:text-lg font-semibold text-slate-100">
                    이름
                  </p>
                  <p className="mt-1 md:mt-2 text-xs md:text-base text-slate-400">
                    김지훈
                  </p>
                </div>
              </motion.div>

              {/* 2 */}
              <motion.div
                variants={itemVariants}
                className="flex gap-3 md:gap-5"
              >
                <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-slate-900 flex items-center justify-center text-slate-200">
                  <CalendarMonthRoundedIcon sx={{ fontSize: 22 }} />
                </div>
                <div>
                  <p className="text-sm md:text-lg font-semibold text-slate-100">
                    생년월일
                  </p>
                  <p className="mt-1 md:mt-2 text-xs md:text-base text-slate-400">
                    2001.01.20
                  </p>
                </div>
              </motion.div>

              {/* 3 */}
              <motion.div
                variants={itemVariants}
                className="flex gap-3 md:gap-5"
              >
                <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-slate-900 flex items-center justify-center text-slate-200">
                  <LocationOnRoundedIcon sx={{ fontSize: 22 }} />
                </div>
                <div>
                  <p className="text-sm md:text-lg font-semibold text-slate-100">
                    위치
                  </p>
                  <p className="mt-1 md:mt-2 text-xs md:text-base text-slate-400">
                    인천광역시 서구
                  </p>
                </div>
              </motion.div>

              {/* 4 */}
              <motion.div
                variants={itemVariants}
                className="flex gap-3 md:gap-5"
              >
                <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-slate-900 flex items-center justify-center text-slate-200">
                  <PhoneRoundedIcon sx={{ fontSize: 22 }} />
                </div>
                <div>
                  <p className="text-sm md:text-lg font-semibold text-slate-100">
                    연락처
                  </p>
                  <p className="mt-1 md:mt-2 text-xs md:text-base text-slate-400">
                    010-5664-5041
                  </p>
                </div>
              </motion.div>

              {/* 5 */}
              <motion.div
                variants={itemVariants}
                className="flex gap-3 md:gap-5 items-start"
              >
                <div className="w-10 h-10 md:w-14 md:h-14 shrink-0 rounded-xl md:rounded-2xl bg-slate-900 flex items-center justify-center text-slate-200">
                  <EmailRoundedIcon sx={{ fontSize: 22 }} />
                </div>

                <div className="min-w-0">
                  <p className="text-sm md:text-lg font-semibold text-slate-100">
                    이메일
                  </p>
                  <p className="mt-1 md:mt-2 text-[9px] md:text-base text-slate-400 break-all">
                    wlgns6921@gmail.com
                  </p>
                </div>
              </motion.div>

              {/* 6 */}
              <motion.div
                variants={itemVariants}
                className="flex gap-3 md:gap-5 items-start"
              >
                <div className="w-10 h-10 md:w-14 md:h-14 shrink-0 rounded-xl md:rounded-2xl bg-slate-900 mt-0.5 md:mt-1 flex items-center justify-center text-slate-200">
                  <EditNoteRoundedIcon sx={{ fontSize: 22, opacity: 0.85 }} />
                </div>

                <div className="min-w-0">
                  <p className="text-sm md:text-lg font-semibold text-slate-100 leading-none">
                    학력
                  </p>
                  <div className="mt-1 md:mt-2 text-[9px] md:text-base text-slate-400 leading-snug break-words">
                    <div>성결대학교 정보통신공학과</div>
                    <div>2025.02 졸업</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* ================== SCROLL SECTION ================== */}
        <div ref={visualWrapperRef} className="relative h-[150vh] md:h-[150vh]">
          <div className="relative top-6 md:top-10">
            <div
              ref={detailGridRef}
              className="
                max-w-7xl mx-auto px-6 md:px-12 lg:px-24
                grid grid-cols-1 lg:grid-cols-2
                gap-10 md:gap-24
                items-start lg:items-center
              "
            >
              <div className="hidden lg:block sticky top-20 md:top-10 h-[100vh] md:h-[1800px] w-full rounded-3xl bg-black shadow-2xl overflow-hidden">
                <div
                  className="absolute inset-0 w-full h-full"
                  style={{
                    backgroundImage: `url(${galaxyImg})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    backgroundPosition: "25% center",
                    backgroundAttachment: "fixed",
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
                className="text-slate-300 leading-relaxed pb-24 md:pb-0 relative z-20"
              >
                <motion.p
                  variants={itemVariants}
                  className="text-sm md:text-xl text-slate-100 font-extrabold mb-4"
                >
                  안녕하세요. 책임감 있는{" "}
                  <span className="font-extrabold text-teal-400">
                    프론트엔드 개발자 김지훈
                  </span>
                  입니다.
                </motion.p>

                {/* 섹션 카드들 */}
                <div className="mt-4 md:mt-8 grid gap-0 md:gap-2">
                  {/* 지원 동기 */}
                  <motion.section
                    variants={itemVariants}
                    className="relative pl-1 md:pl-0 bg-slate-950/35 p-4 md:p-6 border-t border-dashed border-slate-700 backdrop-blur-sm"
                  >
                    <p className="text-[9px] md:text-sm tracking-[0.12em] md:tracking-[0.18em] uppercase text-slate-500">
                      <span className="font-extrabold text-slate-300">01</span>{" "}
                      Motivation
                    </p>
                    <h4 className="mt-2 text-[12px] md:text-xl font-extrabold text-slate-100 text-teal-400">
                      사용자의 경험을 가치를 만드는 일에 보람을 느꼈습니다
                    </h4>
                    <p className="mt-3 text-[9px] md:text-sm  text-slate-300 leading-relaxed">
                      웹은 서비스의 첫 인상이며, 사용자가 일상에서 가장 많이
                      접하는 공간이라 생각합니다.
                      <br />
                      <br />
                      눈에 보이는 UI/UX로 직접적인 만족을 전달하고,
                      <br />
                      웹사이트마다 다른 경험을 설계하는 과정에 큰 흥미를
                      느꼈습니다.
                      <br />
                      <br />
                      협업을 통해{" "}
                      <span className="font-semibold text-slate-100">
                        문제를 정의하고 해결하는 과정
                      </span>{" "}
                      또한 제 성향과 잘 맞아,
                      <br />
                      <span className="font-semibold text-slate-100">
                        프론트엔드 개발자의 매력
                      </span>
                      을 확신하게 되었습니다.
                    </p>
                  </motion.section>

                  {/* 역량/프로젝트 */}
                  <motion.section
                    variants={itemVariants}
                    className="relative pl-1 md:pl-0 bg-slate-950/35 p-4 md:p-6 border-t border-dashed border-slate-700 backdrop-blur-sm"
                  >
                    <p className="text-[9px] md:text-sm tracking-[0.12em] md:tracking-[0.18em] uppercase text-slate-500">
                      <span className="font-extrabold text-slate-300">02</span>{" "}
                      Capability & Projects
                    </p>
                    <h4 className="mt-2 text-[12px] md:text-xl font-extrabold text-slate-100 text-teal-400">
                      작은 개선을 통해 큰 사용자 경험을 만듭니다
                    </h4>

                    <ul className="mt-4 space-y-3 text-[9px] md:text-sm text-slate-300">
                      <li className="flex items-start gap-3">
                        <span className="mt-1.5 md:mt-2 h-2 w-2 rounded-full bg-teal-400/80 shrink-0" />
                        <span>
                          프로젝트를 진행하며{" "}
                          <span className="font-semibold text-slate-100">
                            컴포넌트 구조 분리, 상태 관리, 인증 흐름, 에러 처리
                          </span>{" "}
                          등 프론트엔드 서비스의 핵심 동작을 직접 설계·구현하며,{" "}
                          <span className="font-semibold text-slate-100">
                            안정적인 애플리케이션 구조
                          </span>
                          에 대한 이해를 쌓았습니다.
                        </span>
                      </li>

                      <li className="flex items-start gap-3">
                        <span className="mt-1.5 md:mt-2 h-2 w-2 rounded-full bg-teal-400/80 shrink-0" />
                        <span>
                          <span className="font-semibold text-slate-100">
                            React Query
                          </span>
                          로 불필요한 네트워크 요청을 줄이고 화면 응답성을
                          개선하며,
                          <br />
                          <span className="font-semibold text-slate-100">
                            작은 기술적 개선이 UX 차이를 만든다
                          </span>
                          는 점을 체감했습니다.
                        </span>
                      </li>

                      <li className="flex items-start gap-3">
                        <span className="mt-1.5 md:mt-2 h-2 w-2 rounded-full bg-teal-400/80 shrink-0" />
                        <span>
                          다양한 브라우저와 디바이스 환경에서 발생하는{" "}
                          <span className="font-semibold text-slate-100">
                            렌더링·레이아웃 차이
                          </span>
                          를 분석하고,
                          <br />
                          <span className="font-semibold text-slate-100">
                            뷰포트·스크롤·주소창 동작까지 고려한 UI 대응
                          </span>
                          으로 일관된 사용자 경험을 구현했습니다.
                        </span>
                      </li>
                    </ul>
                  </motion.section>

                  {/* 문제 해결 */}
                  <motion.section
                    variants={itemVariants}
                    className="relative pl-1 md:pl-0 bg-slate-950/35 p-4 md:p-6 border-t border-dashed border-slate-700 backdrop-blur-sm"
                  >
                    <p className="text-[9px] md:text-sm tracking-[0.12em] md:tracking-[0.18em] uppercase text-slate-500">
                      <span className="font-extrabold text-slate-300">03</span>{" "}
                      Problem Solving
                    </p>

                    <h4 className="mt-2 text-[12px] md:text-xl font-extrabold text-slate-100 text-teal-400">
                      해결할 때 까지 절대 포기하지 않는 책임감
                    </h4>

                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div className="rounded-xl bg-slate-900/40 border border-slate-800/60 p-3 md:p-4">
                        <p className="text-[9px] md:text-xs text-slate-400">
                          불필요한 API 호출 감소
                        </p>
                        <p className="mt-1 text-sm md:text-lg font-extrabold text-slate-100">
                          70~80%
                        </p>
                      </div>

                      <div className="rounded-xl bg-slate-900/40 border border-slate-800/60 p-3 md:p-4">
                        <p className="text-[9px] md:text-xs text-slate-400">
                          재방문 로딩 시간
                        </p>
                        <p className="mt-1 text-sm md:text-lg font-extrabold text-slate-100">
                          35~40ms 개선
                        </p>
                      </div>
                    </div>

                    <p className="mt-4 text-[9px] md:text-sm text-slate-300 leading-relaxed">
                      <span className="font-semibold text-slate-100">
                        React Query
                      </span>
                      의 쿼리 키 규칙과 캐싱·무효화 기준을 정리해 중복 요청을
                      줄이고,
                      <br /> 화면 전환과 재방문 UX를 수치적으로 개선했습니다.
                    </p>

                    <ul className="mt-4 space-y-3 text-[9px] md:text-sm text-slate-300">
                      <li className="flex items-start gap-3">
                        <span className="mt-1.5 md:mt-2 h-2 w-2 rounded-full bg-teal-400/80 shrink-0" />
                        <span>
                          <span className="font-semibold text-slate-100">
                            Axios 응답 인터셉터
                          </span>
                          로 네트워크/서버 오류를 한 곳에서 처리하고,
                          <br />
                          <span className="font-semibold text-slate-100">
                            Alert·Toast 패턴을 표준화
                          </span>
                          하여 에러 대응 UX와 디버깅 흐름을 안정화했습니다.
                        </span>
                      </li>

                      <li className="flex items-start gap-3">
                        <span className="mt-1.5 md:mt-2 h-2 w-2 rounded-full bg-teal-400/80 shrink-0" />
                        <span>
                          401/403 등 에러를 전역에서 감지하고{" "}
                          <span className="font-semibold text-slate-100">
                            보호 라우팅
                          </span>
                          을 통해 미인증 접근을 차단해,
                          <br />
                          인증 처리와 사용자 화면 전환 과정에서 불필요한 접근을
                          줄였습니다.
                        </span>
                      </li>

                      <li className="flex items-start gap-3">
                        <span className="mt-1.5 md:mt-2 h-2 w-2 rounded-full bg-teal-400/80 shrink-0" />
                        <span>
                          Safari/Chrome/인앱 브라우저의{" "}
                          <span className="font-semibold text-slate-100">
                            주소창 뷰포트 차이
                          </span>
                          로 레이아웃이 일관되지 않는 문제를{" "}
                          <span className="font-semibold text-slate-100">
                            CSS 변수 기반 실시간 높이 계산
                          </span>
                          으로 통일해 크로스 브라우징을 안정화했습니다.
                        </span>
                      </li>

                      <li className="flex items-start gap-3">
                        <span className="mt-1.5 md:mt-2 h-2 w-2 rounded-full bg-teal-400/80 shrink-0" />
                        <span>
                          EC2 단일 인스턴스에서{" "}
                          <span className="font-semibold text-slate-100">
                            Docker·Nginx·Jenkins
                          </span>
                          로 프론트 배포를 운영하며 리소스 사용 증가로 한계를
                          경험했고,{" "}
                          <span className="font-semibold text-slate-100">
                            프론트엔드 배포환경을 Vercel로 이전
                          </span>
                          해 자동 배포 구조로 전환했습니다.
                        </span>
                      </li>
                    </ul>
                  </motion.section>

                  {/* 협업 */}
                  <motion.section
                    variants={itemVariants}
                    className="relative pl-1 md:pl-0 bg-slate-950/35 p-4 md:p-6 border-t border-dashed border-slate-700 backdrop-blur-sm"
                  >
                    <p className="text-[9px] md:text-sm tracking-[0.12em] md:tracking-[0.18em] uppercase text-slate-500">
                      <span className="font-extrabold text-slate-300">04</span>{" "}
                      Collaboration
                    </p>
                    <h4 className="mt-2 text-[12px] md:text-xl font-extrabold text-slate-100 text-teal-400">
                      팀의 성공을 위해, 제가 먼저 움직입니다
                    </h4>
                    <p className="mt-3 text-[9px] md:text-sm text-slate-300 leading-relaxed">
                      프론트엔드를 맡아 구현 과정에서 발생할 수 있는{" "}
                      <span className="font-semibold text-slate-100">
                        예외와 영향 범위
                      </span>
                      를 먼저 점검하며,
                      <br />
                      팀원들의 작업에 문제가 생기지 않도록{" "}
                      <span className="font-semibold text-slate-100">
                        적극적으로 소통하며 조율
                      </span>
                      해 왔습니다.
                      <br />
                      <br />
                      이슈가 발생하면 문제를 점검하고{" "}
                      <span className="font-semibold text-slate-100">
                        능동적으로 해결책을 찾고,
                        <br />
                      </span>
                      원인과 대응 과정을 공유해{" "}
                      <span className="font-semibold text-slate-100">
                        같은 문제가 반복되지 않도록{" "}
                      </span>
                      했습니다.
                    </p>
                  </motion.section>

                  {/* 포부 */}
                  <motion.section
                    variants={itemVariants}
                    className="relative pl-1 md:pl-0 bg-slate-950/35 p-4 md:p-6 border-t border-dashed border-slate-700 backdrop-blur-sm"
                  >
                    <p className="text-[9px] md:text-sm tracking-[0.12em] md:tracking-[0.18em] uppercase text-slate-500">
                      <span className="font-extrabold text-slate-300">05</span>{" "}
                      Goal
                    </p>
                    <h4 className="mt-2 text-[12px] md:text-xl font-extrabold text-slate-100 text-teal-400">
                      믿고 맡길 수 있는 동료로 성장하겠습니다
                    </h4>
                    <p className="mt-3 text-[9px] md:text-sm text-slate-300 leading-relaxed">
                      회사의{" "}
                      <span className="font-semibold text-slate-100">
                        서비스 구조를 빠르게 이해
                      </span>
                      하고,
                      <br />
                      <span className="font-semibold text-slate-100">
                        사용자 경험을 향상시키는 방향
                      </span>
                      으로 능동적으로 기여하겠습니다.
                      <br />
                      <br />
                      <span className="font-semibold text-slate-100">
                        사용자 친화적인 UI/UX, 성능 최적화, 접근성
                      </span>
                      과 같은 기본기를 탄탄히 다지고,
                      <br />
                      <span className="font-semibold text-slate-100">
                        필요한 일을 먼저 찾아 움직
                      </span>
                      이며{" "}
                      <span className="font-semibold text-slate-100">
                        신뢰를 주는, 믿고 맡길 수 있는 동료
                      </span>
                      가 되겠습니다.
                    </p>
                  </motion.section>
                </div>

                <div className="border-t border-dashed border-slate-700 my-0 md:my-2" />

                <motion.div
                  variants={itemVariants}
                  className="mt-4 flex flex-wrap gap-2 md:gap-4 justify-end"
                >
                  {["열정적인", "끈기있는", "섬세한", "책임감"].map((tag) => (
                    <span
                      key={tag}
                      className="
                        px-2 md:px-4 py-1 rounded-full text-[10px] md:text-sm
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
