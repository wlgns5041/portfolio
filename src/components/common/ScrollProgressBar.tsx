import { useEffect, useRef, useState } from "react";
import { SECTIONS } from "../../data/sections";

const ScrollProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState("intro");
  const [sectionFracs, setSectionFracs] = useState<Record<string, number>>({});

  const rafId = useRef<number | null>(null);
  const sectionMetaRef = useRef<{ id: string; start: number; end: number }[]>(
    []
  );

  useEffect(() => {
    const calculateSections = () => {
      let currentOffset = 0;
      const next: { id: string; start: number; end: number }[] = [];

      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (!el) continue;

        const height = el.offsetHeight;

        next.push({
          id: section.id,
          start: currentOffset,
          end: currentOffset + height,
        });

        currentOffset += height;
      }

      sectionMetaRef.current = next;

      const total = next.length ? next[next.length - 1].end : 1;
      const fracs: Record<string, number> = {};
      for (const meta of next) fracs[meta.id] = meta.start / total;
      setSectionFracs(fracs);
    };

    const update = () => {
      rafId.current = null;

      const scrollY = window.scrollY;
      const viewportCenter = scrollY + window.innerHeight / 2;

      // progress
      const totalScrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = totalScrollable > 0 ? scrollY / totalScrollable : 0;
      setProgress(Math.min(Math.max(nextProgress, 0), 1));

      // active section
      const metas = sectionMetaRef.current;
      for (const meta of metas) {
        if (viewportCenter >= meta.start && viewportCenter < meta.end) {
          setActiveId(meta.id);
          break;
        }
      }
    };

    const onScroll = () => {
      // 스크롤 이벤트는 많이 오니까, 프레임당 1회만 update
      if (rafId.current != null) return;
      rafId.current = window.requestAnimationFrame(update);
    };

    calculateSections();
    update();

    const resizeObserver = new ResizeObserver(() => {
      calculateSections();
      update();
    });
    resizeObserver.observe(document.body);

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (rafId.current != null) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <>
      {/* PC: 기존 세로 */}
      <div
        className="
          scroll-progress-nav
          hidden
          md:flex
          fixed
          left-8
          top-1/2
          -translate-y-1/2
          z-40
          gap-6
        "
      >
        <div
          className="
            scroll-progress-track
            relative
            w-[2px]
            h-[70vh]
            bg-slate-700/60
            rounded-full
            overflow-hidden
          "
        >
          <div
            className="
              scroll-progress-fill
              absolute
              inset-0
              bg-teal-400
              origin-top
              transition-transform
              duration-200
              ease-out
            "
            style={{ transform: `scaleY(${progress})` }}
          />
        </div>

        <ul
          className="
            scroll-progress-dots
            relative
            h-[70vh]
            text-xs
            tracking-widest
          "
        >
          {SECTIONS.map((section, i) => {
            const isActive = section.id === activeId;
            const frac = sectionFracs[section.id] ?? i / (SECTIONS.length - 1);
            return (
              <li
                key={section.id}
                style={{ top: `${frac * 100}%` }}
                className={`
                  scroll-progress-dot
                  absolute
                  left-0
                  -translate-y-1/2
                  flex
                  items-center
                  gap-3
                  whitespace-pre-line
                  transition-colors
                  ${isActive ? "text-teal-400" : "text-slate-500"}
                `}
              >
                <span
                  className={`
                    scroll-progress-dot-marker
                    w-2
                    h-2
                    rounded-full
                    transition-transform
                    ${isActive ? "bg-teal-400 scale-125" : "bg-slate-500"}
                  `}
                />
                {section.label}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Mobile: 진행바만 */}
      <div
        className="
          scroll-progress-mobile
          md:hidden
          fixed
          top-0
          left-0
          right-0
          z-50
          pointer-events-none
        "
      >
        <div
          className="
            bg-slate-950/70
            backdrop-blur-md
            px-4
            pt-2
            pb-2
          "
        >
          <div
            className="
              scroll-progress-track
              relative
              h-[3px]
              w-full
              bg-slate-700/60
              rounded-full
              overflow-hidden
            "
          >
            <div
              className="
                scroll-progress-fill
                absolute
                left-0
                top-0
                h-full
                bg-teal-400
              "
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>

        {/* 상단바 높이만큼 밀어주기 */}
        <div
          className="
            h-[44px]
          "
        />
      </div>
    </>
  );
};

export default ScrollProgressBar;