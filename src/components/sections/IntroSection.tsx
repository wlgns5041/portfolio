import {
  motion,
  AnimatePresence,
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
import PaletteRoundedIcon from "@mui/icons-material/PaletteRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import UpgradeRoundedIcon from "@mui/icons-material/UpgradeRounded";

import { useEffect, useRef, useState} from "react";
import galaxyImg from "../../assets/images/galaxy.jpg";
import strengthImgPetoryFigma from "../../assets/images/펫토리 피그마.png";
import strengthImgLayer from "../../assets/images/레이어.png";
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

const STRENGTH_HIGHLIGHT_RE =
  /(Figma|Claude Design|Playwright MCP 기반 E2E 테스트|Git 브랜치 관리|PR 정책|문서화|jQuery|React 컴포넌트 구조|80개|\d+(?:\.\d+)?%|\d+시간|\d+건)/g;

const highlightStrengthDetail = (text: string) =>
  text.split(STRENGTH_HIGHLIGHT_RE).map((part, i) =>
    i % 2 === 1 ? (
      <strong
        key={i}
        className="
          font-bold
          text-teal-300
        "
      >
        {part}
      </strong>
    ) : (
      part
    )
  );

const StrengthImageStack = ({
  images,
  alt,
  onOpen,
}: {
  images: (string | undefined)[];
  alt: string;
  onOpen: (images: string[], index: number) => void;
}) => {
  const [frontIdx, setFrontIdx] = useState(0);
  const validImages = images.filter((s): s is string => !!s);

  if (images.length <= 1) {
    return (
      <div
        onClick={() => images[0] && onOpen(validImages, 0)}
        className="
          intro-strength-image
          hidden
          sm:block
          self-stretch
          shrink-0
          ml-auto
          w-28
          md:w-40
          rounded-xl
          bg-slate-800/60
          overflow-hidden
          cursor-pointer
        "
      >
        {images[0] && (
          <img
            src={images[0]}
            alt={alt}
            className="
              w-full
              h-full
              object-cover
            "
          />
        )}
      </div>
    );
  }

  return (
    <div
      className="
        intro-strength-image-stack
        hidden
        sm:block
        relative
        self-stretch
        shrink-0
        ml-auto
        mr-3
        md:mr-4
        w-28
        md:w-40
      "
    >
      {images.map((src, i) => {
        const isFront = i === frontIdx;

        return (
          <div
            key={i}
            onClick={() => {
              if (!isFront) {
                setFrontIdx(i);
                return;
              }
              if (src) onOpen(validImages, validImages.indexOf(src));
            }}
            className="
              intro-strength-image-stack-item
              absolute
              inset-0
              rounded-xl
              bg-slate-800/60
              overflow-hidden
              cursor-pointer
              transition-transform
              duration-300
              ease-out
            "
            style={{
              zIndex: isFront ? 2 : 1,
              transform: isFront
                ? "translate(0px, 0px) rotate(0deg)"
                : "translate(10px, 10px) rotate(-3deg)",
            }}
          >
            {src && (
              <img
                src={src}
                alt={alt}
                className="
                  w-full
                  h-full
                  object-cover
                "
                draggable={false}
              />
            )}
          </div>
        );
      })}
    </div>
  );
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

  const [lightbox, setLightbox] = useState<{
    images: string[];
    index: number;
  } | null>(null);

  const openLightbox = (images: string[], index: number) =>
    setLightbox({ images, index });

  const closeLightbox = () => setLightbox(null);

  const showPrevImage = () =>
    setLightbox((prev) =>
      prev
        ? {
            ...prev,
            index: (prev.index - 1 + prev.images.length) % prev.images.length,
          }
        : prev
    );

  const showNextImage = () =>
    setLightbox((prev) =>
      prev ? { ...prev, index: (prev.index + 1) % prev.images.length } : prev
    );

  useEffect(() => {
    if (!lightbox) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrevImage();
      if (e.key === "ArrowRight") showNextImage();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightbox]);

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
        className="
          bg-slate-950
          text-slate-100
          [overflow-x:clip]
          pb-20
          md:pb-80
        "
      >
        {/* ================== INTRO HERO ================== */}
        <div
          ref={introHeroRef}
          className={`
            intro-hero-root
            flex
            relative
            z-20
            ${
              isMobile
                ? "min-h-[54svh] items-start pt-12 pb-10"
                : "min-h-screen items-center"
            }
          `}
        >
          <motion.div
            className="
              intro-hero-container
              w-full
              max-w-[1480px]
              mx-auto
              px-6
              md:px-10
              lg:px-[4rem]
              grid
              grid-cols-1
              lg:grid-cols-2
              gap-10
              md:gap-20
              items-center
            "
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* LEFT : TEXT */}
            <div
              className="
                intro-hero-text
                relative
              "
            >
              <motion.p
                variants={itemVariants}
                className="
                  text-xs
                  tracking-[0.05em]
                  md:tracking-[0.3em]
                  uppercase
                  text-slate-500
                  mb-2
                  md:mb-8
                "
              >
                Frontend Developer
              </motion.p>

              <motion.h1
                variants={itemVariants}
                className="
                  text-4xl
                  md:text-7xl
                  font-black
                  md:font-extrabold
                  leading-tight
                "
              >
                안녕하세요
                <br />
                <span
                  className="
                    text-teal-400
                  "
                >
                  김지훈
                </span>
                입니다
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="
                  mt-2
                  md:mt-10
                  text-[9px]
                  md:text-xl
                  text-slate-400
                  max-w-2xl
                  leading-relaxed
                  pr-[140px]
                  md:pr-0
                "
              >
                사용자 경험을 중심으로 문제를 정의하고,
                <br />
                배움과 개선을 멈추지 않는 책임감 있는 개발자입니다
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="
                  intro-hero-actions
                  mt-8
                  md:mt-16
                  grid
                  grid-cols-2
                  gap-3
                  md:flex
                  md:flex-row
                  md:gap-6
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
                    intro-hero-resume-btn
                    w-full
                    px-4
                    md:px-8
                    py-3.5
                    md:py-4
                    rounded-xl
                    bg-slate-800/70
                    hover:bg-slate-700/70
                    cursor-pointer
                    transition-all
                    duration-200
                    ease-out
                    hover:-translate-y-1
                    hover:shadow-lg
                    active:translate-y-0
                    text-[12px]
                    md:text-base
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
                    intro-hero-coverletter-btn
                    w-full
                    px-4
                    md:px-8
                    py-3.5
                    md:py-4
                    rounded-xl
                    bg-slate-800/70
                    hover:bg-slate-700/70
                    cursor-pointer
                    transition-all
                    duration-200
                    ease-out
                    hover:-translate-y-1
                    hover:shadow-lg
                    active:translate-y-0
                    text-[12px]
                    md:text-base
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
                  className="
                    logo-lottie-wrapper
                    fixed
                    pointer-events-none
                    z-[2147483647]
                  "
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
                    className="
                      w-full
                      h-full
                    "
                  >
                    <LogoLottie />
                  </motion.div>
                </motion.div>,
                document.body
              )}
          </motion.div>
        </div>

        {/* ================== ABOUT ME ================== */}
        <div
          className="
            intro-about-root
            relative
            z-20
          "
        >
          <div
            className="
              max-w-[1480px]
              mx-auto
              px-6
              md:px-10
              lg:px-[4rem]
              py-0
              md:py-24
            "
          >
            {/* Title */}
            <div
              className="
                intro-about-header
              "
            >
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="
                  text-xs
                  md:text-sm
                  font-extrabold
                  tracking-[0.12em]
                  md:tracking-[0.18em]
                  uppercase
                  text-teal-400
                "
              >
                Profile
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
                className="
                  mt-2
                  md:mt-4
                  text-3xl
                  md:text-6xl
                  font-extrabold
                  tracking-tight
                  text-slate-100
                "
              >
                ABOUT ME
              </motion.h2>
            </div>

            {/* Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-120px" }}
              className="
                intro-about-grid
                mt-8
                md:mt-16
                mb-20
                md:mb-72
                grid
                grid-cols-2
                md:grid-cols-2
                lg:grid-cols-3
                gap-2
                md:gap-5
              "
            >
              {/* 1 */}
              <motion.div
                variants={itemVariants}
                className="
                  intro-about-card
                  group
                  rounded-2xl
                  bg-white/[0.09]
                  shadow-[0_20px_45px_-12px_rgba(0,0,0,0.55),inset_0_1px_0_0_rgba(255,255,255,0.06)]
                  p-2.5
                  md:p-6
                  transition-all
                  duration-200
                  hover:-translate-y-1
                  hover:bg-white/[0.14]
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-2
                    md:gap-3
                  "
                >
                  <div
                    className="
                      w-6
                      h-7
                      md:w-10
                      md:h-10
                      rounded-lg
                      md:rounded-xl
                      bg-slate-900
                      flex
                      items-center
                      justify-center
                      text-slate-300
                      shrink-0
                      transition-transform
                      duration-200
                      group-hover:scale-110
                    "
                  >
                    <PersonRoundedIcon sx={{ fontSize: 18 }} />
                  </div>
                  <p
                    className="
                      text-[10px]
                      md:text-sm
                      text-slate-500
                    "
                  >
                    이름
                  </p>
                </div>

                <p
                  className="
                    mt-2
                    md:mt-4
                    text-[11px]
                    md:text-xl
                    font-bold
                    text-slate-100
                  "
                >
                  김지훈
                </p>
              </motion.div>

              {/* 2 */}
              <motion.div
                variants={itemVariants}
                className="
                  intro-about-card
                  group
                  rounded-2xl
                  bg-white/[0.09]
                  shadow-[0_20px_45px_-12px_rgba(0,0,0,0.55),inset_0_1px_0_0_rgba(255,255,255,0.06)]
                  p-2.5
                  md:p-6
                  transition-all
                  duration-200
                  hover:-translate-y-1
                  hover:bg-white/[0.14]
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-2
                    md:gap-3
                  "
                >
                  <div
                    className="
                      w-6
                      h-7
                      md:w-10
                      md:h-10
                      rounded-lg
                      md:rounded-xl
                      bg-slate-900
                      flex
                      items-center
                      justify-center
                      text-slate-300
                      shrink-0
                      transition-transform
                      duration-200
                      group-hover:scale-110
                    "
                  >
                    <CalendarMonthRoundedIcon sx={{ fontSize: 18 }} />
                  </div>
                  <p
                    className="
                      text-[10px]
                      md:text-sm
                      text-slate-500
                    "
                  >
                    생년월일
                  </p>
                </div>

                <p
                  className="
                    mt-2
                    md:mt-4
                    text-[11px]
                    md:text-xl
                    font-bold
                    text-slate-100
                  "
                >
                  2001.01.20
                </p>
              </motion.div>

              {/* 3 */}
              <motion.div
                variants={itemVariants}
                className="
                  intro-about-card
                  group
                  rounded-2xl
                  bg-white/[0.09]
                  shadow-[0_20px_45px_-12px_rgba(0,0,0,0.55),inset_0_1px_0_0_rgba(255,255,255,0.06)]
                  p-2.5
                  md:p-6
                  transition-all
                  duration-200
                  hover:-translate-y-1
                  hover:bg-white/[0.14]
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-2
                    md:gap-3
                  "
                >
                  <div
                    className="
                      w-6
                      h-7
                      md:w-10
                      md:h-10
                      rounded-lg
                      md:rounded-xl
                      bg-slate-900
                      flex
                      items-center
                      justify-center
                      text-slate-300
                      shrink-0
                      transition-transform
                      duration-200
                      group-hover:scale-110
                    "
                  >
                    <LocationOnRoundedIcon sx={{ fontSize: 18 }} />
                  </div>
                  <p
                    className="
                      text-[10px]
                      md:text-sm
                      text-slate-500
                    "
                  >
                    주소
                  </p>
                </div>

                <p
                  className="
                    mt-2
                    md:mt-4
                    text-[11px]
                    md:text-xl
                    font-bold
                    text-slate-100
                  "
                >
                  인천광역시 서해구
                </p>
              </motion.div>

              {/* 4 */}
              <motion.div
                variants={itemVariants}
                className="
                  intro-about-card
                  group
                  rounded-2xl
                  bg-white/[0.09]
                  shadow-[0_20px_45px_-12px_rgba(0,0,0,0.55),inset_0_1px_0_0_rgba(255,255,255,0.06)]
                  p-2.5
                  md:p-6
                  transition-all
                  duration-200
                  hover:-translate-y-1
                  hover:bg-white/[0.14]
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-2
                    md:gap-3
                  "
                >
                  <div
                    className="
                      w-6
                      h-7
                      md:w-10
                      md:h-10
                      rounded-lg
                      md:rounded-xl
                      bg-slate-900
                      flex
                      items-center
                      justify-center
                      text-slate-300
                      shrink-0
                      transition-transform
                      duration-200
                      group-hover:scale-110
                    "
                  >
                    <PhoneRoundedIcon sx={{ fontSize: 18 }} />
                  </div>
                  <p
                    className="
                      text-[10px]
                      md:text-sm
                      text-slate-500
                    "
                  >
                    연락처
                  </p>
                </div>

                <p
                  className="
                    mt-2
                    md:mt-4
                    text-[11px]
                    md:text-xl
                    font-bold
                    text-slate-100
                  "
                >
                  010-5664-5041
                </p>
              </motion.div>

              {/* 5 */}
              <motion.div
                variants={itemVariants}
                className="
                  intro-about-card
                  group
                  rounded-2xl
                  bg-white/[0.09]
                  shadow-[0_20px_45px_-12px_rgba(0,0,0,0.55),inset_0_1px_0_0_rgba(255,255,255,0.06)]
                  p-2.5
                  md:p-6
                  min-w-0
                  transition-all
                  duration-200
                  hover:-translate-y-1
                  hover:bg-white/[0.14]
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-2
                    md:gap-3
                  "
                >
                  <div
                    className="
                      w-6
                      h-7
                      md:w-10
                      md:h-10
                      rounded-lg
                      md:rounded-xl
                      bg-slate-900
                      flex
                      items-center
                      justify-center
                      text-slate-300
                      shrink-0
                      transition-transform
                      duration-200
                      group-hover:scale-110
                    "
                  >
                    <EmailRoundedIcon sx={{ fontSize: 18 }} />
                  </div>
                  <p
                    className="
                      text-[10px]
                      md:text-sm
                      text-slate-500
                    "
                  >
                    이메일
                  </p>
                </div>

                <p
                  className="
                    mt-2
                    md:mt-4
                    text-[11px]
                    md:text-xl
                    font-bold
                    text-slate-100
                    break-all
                  "
                >
                  wlgns6921@gmail.com
                </p>
              </motion.div>

              {/* 6 */}
              <motion.div
                variants={itemVariants}
                className="
                  intro-about-card
                  group
                  rounded-2xl
                  bg-white/[0.09]
                  shadow-[0_20px_45px_-12px_rgba(0,0,0,0.55),inset_0_1px_0_0_rgba(255,255,255,0.06)]
                  p-2.5
                  md:p-6
                  min-w-0
                  transition-all
                  duration-200
                  hover:-translate-y-1
                  hover:bg-white/[0.14]
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-2
                    md:gap-3
                  "
                >
                  <div
                    className="
                      w-6
                      h-7
                      md:w-10
                      md:h-10
                      rounded-lg
                      md:rounded-xl
                      bg-slate-900
                      flex
                      items-center
                      justify-center
                      text-slate-300
                      shrink-0
                      transition-transform
                      duration-200
                      group-hover:scale-110
                    "
                  >
                    <EditNoteRoundedIcon sx={{ fontSize: 18, opacity: 0.85 }} />
                  </div>
                  <p
                    className="
                      text-[10px]
                      md:text-sm
                      text-slate-500
                    "
                  >
                    학력
                  </p>
                </div>

                <p
                  className="
                    mt-2
                    md:mt-4
                    text-[11px]
                    md:text-xl
                    font-bold
                    text-slate-100
                    break-words
                  "
                >
                  성결대학교 정보통신공학과
                </p>
                <p
                  className="
                    mt-1
                    text-[9px]
                    md:text-sm
                    text-slate-500
                  "
                >
                  2025.02 졸업 · 학점 3.71
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* ================== STRENGTHS ================== */}
        <div
          className="
            intro-strength-root
            relative
            z-20
          "
        >
          <div
            className="
              max-w-[1480px]
              mx-auto
              px-6
              md:px-10
              lg:px-[4rem]
              pt-0
              md:pt-0
              pb-24
              md:pb-[20rem]
            "
          >
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="
                text-xs
                md:text-sm
                font-extrabold
                tracking-[0.12em]
                md:tracking-[0.18em]
                uppercase
                text-teal-400
              "
            >
              Strengths
            </motion.p>

            <motion.h3
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
              className="
                mt-1
                md:mt-4
                text-base
                md:text-4xl
                font-extrabold
                text-slate-100
              "
            >
              저를 대표하는 3가지 강점입니다
            </motion.h3>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-120px" }}
              className="
                intro-strength-grid
                mt-6
                md:mt-12
                grid
                gap-3
                md:gap-5
              "
            >
              {[
                {
                  icon: <PaletteRoundedIcon sx={{ fontSize: 22 }} />,
                  title: "디자인 감각을 갖춘 개발자",
                  images: [strengthImgPetoryFigma, strengthImgLayer] as (
                    | string
                    | undefined
                  )[],
                  details: [
                    "Figma 기반 와이어프레임 시안 및 프로젝트 제작",
                    "반응형 레이아웃을 통해 다양한 기기의 화면 대응 경험",
                    "디자인 시안·기존 UI를 바탕으로 Claude Design을 활용해 노후 UI/UX 개선 경험",
                  ],
                },
                {
                  icon: <AutoAwesomeRoundedIcon sx={{ fontSize: 22 }} />,
                  title: "AI를 활용하는 개발자 - 개발 워크플로우 설계 경험",
                  images: [] as (string | undefined)[],
                  details: [
                    "AI 활용 워크플로우로 개발 프로세스 개선, Playwright MCP 기반 E2E 테스트 개발·운영",
                    "Git 브랜치 관리, PR 정책, 문서화 등 반복 작업을 커맨드화해 소요 시간 80% 이상 단축",
                    "AI 기반 코드 리뷰 및 에러 분석으로 원인 파악 및 디버깅 시간 단축",
                  ],
                },
                {
                  icon: <UpgradeRoundedIcon sx={{ fontSize: 22 }} />,
                  title: "유지보수와 확장성을 우선하는 개발자",
                  images: [] as (string | undefined)[],
                  details: [
                    "jQuery 기반 노후 프로젝트를 React 컴포넌트 구조로 단계적으로 전환한 마이그레이션 경험",
                    "반복되는 UI와 라이브러리 사용 로직을 공통 컴포넌트·유틸리티로 분리해 변경 범위를 축소",
                    "화면별로 분산된 API 예외 처리 약 80개 유형을 공통 정책으로 통합",
                  ],
                },
              ].map((item, idx) => (
                <motion.div
                  key={item.title}
                  variants={itemVariants}
                  className="
                    intro-strength-card
                    relative
                    overflow-hidden
                    rounded-2xl
                    bg-slate-900
                    shadow-lg
                    shadow-black/20
                    p-3
                    md:p-7
                    flex
                    items-center
                    gap-2
                    md:gap-6
                    transition-all
                    duration-200
                    hover:-translate-y-1
                    hover:bg-slate-800/80
                  "
                >
                  <span
                    aria-hidden
                    className="
                      intro-strength-card-index
                      absolute
                      -top-2
                      -left-1
                      md:-top-6
                      md:left-1
                      text-[40px]
                      md:text-[110px]
                      font-extrabold
                      leading-none
                      text-slate-100/[0.05]
                      pointer-events-none
                      select-none
                    "
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>

                  <div
                    className="
                      intro-strength-icon
                      w-8
                      h-8
                      md:w-14
                      md:h-14
                      shrink-0
                      rounded-xl
                      bg-slate-800
                      flex
                      items-center
                      justify-center
                      text-teal-400
                    "
                  >
                    {item.icon}
                  </div>

                  <div
                    className="
                      w-px
                      self-stretch
                      bg-slate-700/70
                    "
                  />

                  <div
                    className="
                      min-w-0
                    "
                  >
                    <p
                      className="
                        text-xs
                        md:text-xl
                        font-bold
                        text-slate-100
                      "
                    >
                      {item.title}
                    </p>
                    {item.details && (
                      <ul
                        className="
                          intro-strength-details-list
                          mt-1
                          md:mt-3
                          space-y-0.5
                          md:space-y-1.5
                        "
                      >
                        {item.details.map((d) => (
                          <li
                            key={d}
                            className="
                              intro-strength-details-item
                              flex
                              items-start
                              gap-1.5
                              text-[9px]
                              md:text-base
                              text-slate-300
                            "
                          >
                            <span
                              className="
                                mt-1.5
                                md:mt-2.5
                                h-1.5
                                w-1.5
                                rounded-full
                                bg-teal-400/80
                                shrink-0
                              "
                            />
                            <span>{highlightStrengthDetail(d)}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {item.images.length > 0 && (
                    <StrengthImageStack
                      images={item.images}
                      alt={item.title}
                      onOpen={openLightbox}
                    />
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ================== SCROLL SECTION ================== */}
        <div
          ref={visualWrapperRef}
          className="
            intro-story-root
            relative
            h-[150vh]
            md:h-[150vh]
          "
        >
          <div
            className="
              relative
              top-6
              md:top-10
            "
          >
            <div
              ref={detailGridRef}
              className="
                intro-story-grid
                max-w-[1480px]
                mx-auto
                px-6
                md:px-10
                lg:px-[4rem]
                grid
                grid-cols-1
                lg:grid-cols-2
                gap-10
                md:gap-24
                items-start
                lg:items-center
              "
            >
              <div
                className="
                  intro-story-galaxy-panel
                  hidden
                  lg:block
                  sticky
                  top-20
                  md:top-10
                  h-[100vh]
                  md:h-[1800px]
                  w-full
                  rounded-3xl
                  bg-black
                  shadow-2xl
                  overflow-hidden
                "
              >
                <div
                  className="
                    absolute
                    inset-0
                    w-full
                    h-full
                  "
                  style={{
                    backgroundImage: `url(${galaxyImg})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    backgroundPosition: "25% center",
                    backgroundAttachment: "fixed",
                  }}
                />
                <div
                  className="
                    pointer-events-none
                    absolute
                    top-0
                    left-0
                    w-full
                    h-40
                    bg-gradient-to-b
                    from-slate-950
                    to-transparent
                    z-10
                  "
                />
                <motion.div
                  style={{ height: bottomFadeHeight }}
                  className="
                    pointer-events-none
                    absolute
                    bottom-0
                    left-0
                    w-full
                    bg-gradient-to-t
                    from-slate-950
                    to-transparent
                    z-10
                  "
                />
              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="
                  intro-story-content
                  text-slate-300
                  leading-relaxed
                  pb-24
                  md:pb-0
                  relative
                  z-20
                "
              >
                <motion.p
                  variants={itemVariants}
                  className="
                    text-sm
                    md:text-xl
                    text-slate-100
                    font-extrabold
                    mb-4
                  "
                >
                  안녕하세요. 책임감 있는{" "}
                  <span
                    className="
                      font-extrabold
                      text-teal-400
                    "
                  >
                    프론트엔드 개발자 김지훈
                  </span>
                  입니다.
                </motion.p>

                {/* 섹션 카드들 */}
                <div
                  className="
                    intro-story-sections
                    mt-4
                    md:mt-8
                    grid
                    gap-0
                    md:gap-2
                  "
                >
                  {/* 지원 동기 */}
                  <motion.section
                    variants={itemVariants}
                    className="
                      intro-story-section-motivation
                      relative
                      pl-1
                      md:pl-0
                      bg-slate-950/35
                      p-4
                      md:p-6
                      border-t
                      border-dashed
                      border-slate-700
                      backdrop-blur-sm
                    "
                  >
                    <p
                      className="
                        text-[9px]
                        md:text-sm
                        tracking-[0.12em]
                        md:tracking-[0.18em]
                        uppercase
                        text-slate-500
                      "
                    >
                      <span
                        className="
                          font-extrabold
                          text-slate-300
                        "
                      >
                        01
                      </span>{" "}
                      Motivation
                    </p>
                    <h4
                      className="
                        mt-2
                        text-[12px]
                        md:text-xl
                        font-extrabold
                        text-slate-100
                        text-teal-400
                      "
                    >
                      사용자의 경험을 가치를 만드는 일에 보람을 느꼈습니다
                    </h4>
                    <p
                      className="
                        mt-3
                        text-[9px]
                        md:text-sm
                        text-slate-300
                        leading-relaxed
                      "
                    >
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
                      <span
                        className="
                          font-semibold
                          text-slate-100
                        "
                      >
                        문제를 정의하고 해결하는 과정
                      </span>{" "}
                      또한 제 성향과 잘 맞아,
                      <br />
                      <span
                        className="
                          font-semibold
                          text-slate-100
                        "
                      >
                        프론트엔드 개발자의 매력
                      </span>
                      을 확신하게 되었습니다.
                    </p>
                  </motion.section>

                  {/* 문제 해결 */}
                  <motion.section
                    variants={itemVariants}
                    className="
                      intro-story-section-problem
                      relative
                      pl-1
                      md:pl-0
                      bg-slate-950/35
                      p-4
                      md:p-6
                      border-t
                      border-dashed
                      border-slate-700
                      backdrop-blur-sm
                    "
                  >
                    <p
                      className="
                        text-[9px]
                        md:text-sm
                        tracking-[0.12em]
                        md:tracking-[0.18em]
                        uppercase
                        text-slate-500
                      "
                    >
                      <span
                        className="
                          font-extrabold
                          text-slate-300
                        "
                      >
                        02
                      </span>{" "}
                      Problem Solving
                    </p>

                    <h4
                      className="
                        mt-2
                        text-[12px]
                        md:text-xl
                        font-extrabold
                        text-slate-100
                        text-teal-400
                      "
                    >
                      원인을 구조적으로 파고드는 문제 해결력
                    </h4>

                    <div
                      className="
                        intro-story-stat-grid
                        mt-4
                        grid
                        grid-cols-3
                        gap-3
                      "
                    >
                      <div
                        className="
                          intro-story-stat-card
                          rounded-xl
                          bg-slate-900
                          shadow-md
                          shadow-black/20
                          p-3
                          md:p-4
                        "
                      >
                        <p
                          className="
                            text-[9px]
                            md:text-xs
                            text-slate-400
                          "
                        >
                          jQuery → React 전환 경험
                        </p>
                        <p
                          className="
                            mt-1
                            text-sm
                            md:text-lg
                            font-extrabold
                            text-slate-100
                          "
                        >
                          10 페이지 +
                        </p>
                      </div>

                      <div
                        className="
                          intro-story-stat-card
                          rounded-xl
                          bg-slate-900
                          shadow-md
                          shadow-black/20
                          p-3
                          md:p-4
                        "
                      >
                        <p
                          className="
                            text-[9px]
                            md:text-xs
                            text-slate-400
                          "
                        >
                          API 호출 감소
                        </p>
                        <p
                          className="
                            mt-1
                            text-sm
                            md:text-lg
                            font-extrabold
                            text-slate-100
                          "
                        >
                          70~80%
                        </p>
                      </div>

                      <div
                        className="
                          intro-story-stat-card
                          rounded-xl
                          bg-slate-900
                          shadow-md
                          shadow-black/20
                          p-3
                          md:p-4
                        "
                      >
                        <p
                          className="
                            text-[9px]
                            md:text-xs
                            text-slate-400
                          "
                        >
                          페이지 렌더링 속도 개선
                        </p>
                        <p
                          className="
                            mt-1
                            text-sm
                            md:text-lg
                            font-extrabold
                            text-slate-100
                          "
                        >
                          30s → 약 1s
                        </p>
                      </div>
                    </div>

                    <ul
                      className="
                        intro-story-problem-list
                        mt-4
                        space-y-3
                        text-[9px]
                        md:text-sm
                        text-slate-300
                      "
                    >
                      <li
                        className="
                          intro-story-problem-item
                          flex
                          items-start
                          gap-3
                        "
                      >
                        <span
                          className="
                            mt-1.5
                            md:mt-2
                            h-2
                            w-2
                            rounded-full
                            bg-teal-400/80
                            shrink-0
                          "
                        />
                        <span>
                          jQuery 기반으로 실제 운영되던 노후 프로젝트를
                          {" "}
                          <span
                            className="
                              font-semibold
                              text-slate-100
                            "
                          >
                            React 컴포넌트 구조
                          </span>
                          로 단계적으로 전환하며,
                          <br />
                          유지보수 가능한 애플리케이션 구조로 개선했습니다.
                        </span>
                      </li>

                      <li
                        className="
                          intro-story-problem-item
                          flex
                          items-start
                          gap-3
                        "
                      >
                        <span
                          className="
                            mt-1.5
                            md:mt-2
                            h-2
                            w-2
                            rounded-full
                            bg-teal-400/80
                            shrink-0
                          "
                        />
                        <span>
                          데이터가 지속적으로 누적되는{" "}
                          <span
                            className="
                              font-semibold
                              text-slate-100
                            "
                          >
                            대시보드 화면
                          </span>
                          에서 페이지 진입과 렌더링에 30초 이상 소요되던
                          문제를,
                          <br />
                          <span
                            className="
                              font-semibold
                              text-slate-100
                            "
                          >
                            중복 API 호출을 단일 요청으로 통합하여{" "}
                          </span>
                          <span
                            className="
                              font-semibold
                              text-slate-100
                            "
                          >
                            약 1초 수준
                          </span>
                          으로 단축했습니다.
                        </span>
                      </li>

                      <li
                        className="
                          intro-story-problem-item
                          flex
                          items-start
                          gap-3
                        "
                      >
                        <span
                          className="
                            mt-1.5
                            md:mt-2
                            h-2
                            w-2
                            rounded-full
                            bg-teal-400/80
                            shrink-0
                          "
                        />
                        <span>
                          <span
                            className="
                              font-semibold
                              text-slate-100
                            "
                          >
                            React Query
                          </span>
                          의 쿼리 키 규칙과 캐싱·무효화 기준을 정리해 중복
                          요청을 줄이고,
                          <br />
                          화면 전환과 재방문 UX를 수치적으로 개선했습니다.
                        </span>
                      </li>

                      <li
                        className="
                          intro-story-problem-item
                          flex
                          items-start
                          gap-3
                        "
                      >
                        <span
                          className="
                            mt-1.5
                            md:mt-2
                            h-2
                            w-2
                            rounded-full
                            bg-teal-400/80
                            shrink-0
                          "
                        />
                        <span>
                          Safari/Chrome/인앱 브라우저의{" "}
                          <span
                            className="
                              font-semibold
                              text-slate-100
                            "
                          >
                            주소창 뷰포트 차이
                          </span>
                          로 레이아웃이 일관되지 않는 문제를{" "}
                          <span
                            className="
                              font-semibold
                              text-slate-100
                            "
                          >
                            CSS 변수 기반 실시간 높이 계산
                          </span>
                          으로 통일해 크로스 브라우징을 안정화했습니다.
                        </span>
                      </li>
                    </ul>
                  </motion.section>

                  {/* 경험 */}
                  <motion.section
                    variants={itemVariants}
                    className="
                      intro-story-section-experience
                      relative
                      pl-1
                      md:pl-0
                      bg-slate-950/35
                      p-4
                      md:p-6
                      border-t
                      border-dashed
                      border-slate-700
                      backdrop-blur-sm
                    "
                  >
                    <p
                      className="
                        text-[9px]
                        md:text-sm
                        tracking-[0.12em]
                        md:tracking-[0.18em]
                        uppercase
                        text-slate-500
                      "
                    >
                      <span
                        className="
                          font-extrabold
                          text-slate-300
                        "
                      >
                        03
                      </span>{" "}
                      Experience
                    </p>
                    <h4
                      className="
                        mt-2
                        text-[12px]
                        md:text-xl
                        font-extrabold
                        text-slate-100
                        text-teal-400
                      "
                    >
                      프론트엔드에 머무르지 않고 경험을 넓힙니다
                    </h4>

                    <ul
                      className="
                        intro-story-experience-list
                        mt-4
                        space-y-3
                        text-[9px]
                        md:text-sm
                        text-slate-300
                      "
                    >
                      <li
                        className="
                          intro-story-experience-item
                          flex
                          items-start
                          gap-3
                        "
                      >
                        <span
                          className="
                            mt-1.5
                            md:mt-2
                            h-2
                            w-2
                            rounded-full
                            bg-teal-400/80
                            shrink-0
                          "
                        />
                        <span>
                          Spring, Java 기반{" "}
                          <span
                            className="
                              font-semibold
                              text-slate-100
                            "
                          >
                            백엔드 개발
                          </span>
                          에 참여해 API를 설계·구현하고, 간단한{" "}
                          <span
                            className="
                              font-semibold
                              text-slate-100
                            "
                          >
                            SQL 쿼리
                          </span>{" "}
                          작성 능력을 키우며 프론트-백엔드 전 구간에 대한
                          이해를 넓혔습니다.
                        </span>
                      </li>

                      <li
                        className="
                          intro-story-experience-item
                          flex
                          items-start
                          gap-3
                        "
                      >
                        <span
                          className="
                            mt-1.5
                            md:mt-2
                            h-2
                            w-2
                            rounded-full
                            bg-teal-400/80
                            shrink-0
                          "
                        />
                        <span>
                          <span
                            className="
                              font-semibold
                              text-slate-100
                            "
                          >
                            데이터베이스 설계 및 운영
                          </span>
                          에 참여해 테이블 구조를 설계하고 직접 운영하며,
                          데이터 관점에서 서비스를 이해하는 시야를
                          넓혔습니다.
                        </span>
                      </li>

                      <li
                        className="
                          intro-story-experience-item
                          flex
                          items-start
                          gap-3
                        "
                      >
                        <span
                          className="
                            mt-1.5
                            md:mt-2
                            h-2
                            w-2
                            rounded-full
                            bg-teal-400/80
                            shrink-0
                          "
                        />
                        <span>
                          AI 워크플로우 도구로 Git 브랜치 관리·PR 정책·문서화 등
                          반복 작업을 커맨드화하고,{" "}
                          <span
                            className="
                              font-semibold
                              text-slate-100
                            "
                          >
                            Playwright MCP 기반 E2E 테스트
                          </span>
                          를 직접 설계·운영하며 개발 프로세스를
                          개선했습니다.
                        </span>
                      </li>

                      <li
                        className="
                          intro-story-experience-item
                          flex
                          items-start
                          gap-3
                        "
                      >
                        <span
                          className="
                            mt-1.5
                            md:mt-2
                            h-2
                            w-2
                            rounded-full
                            bg-teal-400/80
                            shrink-0
                          "
                        />
                        <span>
                          협업 툴 기반으로 기능 개선·버그 요청이{" "}
                          <span
                            className="
                              font-semibold
                              text-slate-100
                            "
                          >
                            체계화된 요구사항 처리 프로세스
                          </span>
                          로 관리되는 흐름을 경험했습니다.
                        </span>
                      </li>
                    </ul>
                  </motion.section>

                  {/* 포부 */}
                  <motion.section
                    variants={itemVariants}
                    className="
                      intro-story-section-goal
                      relative
                      pl-1
                      md:pl-0
                      bg-slate-950/35
                      p-4
                      md:p-6
                      border-t
                      border-dashed
                      border-slate-700
                      backdrop-blur-sm
                    "
                  >
                    <p
                      className="
                        text-[9px]
                        md:text-sm
                        tracking-[0.12em]
                        md:tracking-[0.18em]
                        uppercase
                        text-slate-500
                      "
                    >
                      <span
                        className="
                          font-extrabold
                          text-slate-300
                        "
                      >
                        04
                      </span>{" "}
                      Goal
                    </p>
                    <h4
                      className="
                        mt-2
                        text-[12px]
                        md:text-xl
                        font-extrabold
                        text-slate-100
                        text-teal-400
                      "
                    >
                      믿고 맡길 수 있는 동료로 성장하겠습니다
                    </h4>
                    <p
                      className="
                        mt-3
                        text-[9px]
                        md:text-sm
                        text-slate-300
                        leading-relaxed
                      "
                    >
                      회사의{" "}
                      <span
                        className="
                          font-semibold
                          text-slate-100
                        "
                      >
                        서비스 구조를 빠르게 이해
                      </span>
                      하고,
                      <br />
                      <span
                        className="
                          font-semibold
                          text-slate-100
                        "
                      >
                        사용자 경험을 향상시키는 방향
                      </span>
                      으로 능동적으로 기여하겠습니다.
                      <br />
                      <br />
                      <span
                        className="
                          font-semibold
                          text-slate-100
                        "
                      >
                        사용자 친화적인 UI/UX, 성능 최적화, 접근성
                      </span>
                      과 같은 기본기를 탄탄히 다지고,
                      <br />
                      <span
                        className="
                          font-semibold
                          text-slate-100
                        "
                      >
                        필요한 일을 먼저 찾아 움직
                      </span>
                      이며{" "}
                      <span
                        className="
                          font-semibold
                          text-slate-100
                        "
                      >
                        신뢰를 주는, 믿고 맡길 수 있는 동료
                      </span>
                      가 되겠습니다.
                    </p>
                  </motion.section>
                </div>

                <div
                  className="
                    border-t
                    border-dashed
                    border-slate-700
                    my-0
                    md:my-2
                  "
                />

                <motion.div
                  variants={itemVariants}
                  className="
                    intro-story-tag-list
                    mt-4
                    flex
                    flex-wrap
                    gap-2
                    md:gap-4
                    justify-end
                  "
                >
                  {["열정적인", "끈기있는", "섬세한", "책임감"].map((tag) => (
                    <span
                      key={tag}
                      className="
                        intro-story-tag
                        px-2
                        md:px-4
                        py-1
                        rounded-full
                        text-[10px]
                        md:text-sm
                        bg-slate-800
                        text-slate-200
                        border
                        border-slate-700
                        transition-all
                        hover:bg-slate-700
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

        <AnimatePresence>
          {lightbox && (
            <motion.div
              key="strength-lightbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeLightbox}
              className="
                fixed
                inset-0
                z-[9999]
                flex
                items-center
                justify-center
                bg-black/80
                p-6
              "
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
                className="
                  relative
                  flex
                  flex-col
                  items-center
                  max-w-3xl
                  md:max-w-5xl
                  max-h-[90vh]
                "
              >
                <button
                  type="button"
                  onClick={closeLightbox}
                  aria-label="닫기"
                  className="
                    absolute
                    -top-4
                    -right-4
                    w-9
                    h-9
                    rounded-full
                    bg-slate-100
                    text-slate-900
                    flex
                    items-center
                    justify-center
                    text-lg
                    font-bold
                    shadow-lg
                    cursor-pointer
                    z-10
                  "
                >
                  ×
                </button>

                {lightbox.images.length > 1 && (
                  <button
                    type="button"
                    onClick={showPrevImage}
                    aria-label="이전 이미지"
                    className="
                      absolute
                      top-1/2
                      -left-2
                      md:-left-16
                      -translate-y-1/2
                      w-9
                      h-9
                      md:w-11
                      md:h-11
                      rounded-full
                      bg-slate-100
                      text-slate-900
                      flex
                      items-center
                      justify-center
                      text-xl
                      font-bold
                      shadow-lg
                      cursor-pointer
                    "
                  >
                    ‹
                  </button>
                )}

                {lightbox.images.length > 1 && (
                  <button
                    type="button"
                    onClick={showNextImage}
                    aria-label="다음 이미지"
                    className="
                      absolute
                      top-1/2
                      -right-2
                      md:-right-16
                      -translate-y-1/2
                      w-9
                      h-9
                      md:w-11
                      md:h-11
                      rounded-full
                      bg-slate-100
                      text-slate-900
                      flex
                      items-center
                      justify-center
                      text-xl
                      font-bold
                      shadow-lg
                      cursor-pointer
                    "
                  >
                    ›
                  </button>
                )}

                <img
                  src={lightbox.images[lightbox.index]}
                  alt=""
                  className="
                    max-w-full
                    max-h-[90vh]
                    rounded-xl
                    object-contain
                  "
                />

                {lightbox.images.length > 1 && (
                  <div
                    className="
                      mt-4
                      flex
                      gap-2
                    "
                  >
                    {lightbox.images.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() =>
                          setLightbox((prev) => (prev ? { ...prev, index: i } : prev))
                        }
                        aria-label={`${i + 1}번째 이미지`}
                        className={`
                          w-2
                          h-2
                          rounded-full
                          transition-colors
                          cursor-pointer
                          ${
                            i === lightbox.index
                              ? "bg-teal-400"
                              : "bg-slate-500/60 hover:bg-slate-300/80"
                          }
                        `}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </LayoutGroup>
  );
};

export default IntroSection;
