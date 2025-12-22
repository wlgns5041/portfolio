import { useEffect, useState } from "react";
import { SECTIONS } from "../../data/sections";

const ScrollProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState("intro");

  /* 1️⃣ 스크롤 진행도 (실시간 동기화) */
  useEffect(() => {
    let rafId: number | null = null;

    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (docHeight > 0) {
        setProgress(scrollTop / docHeight);
      }

      rafId = null;
    };

    const onScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  /* 2️⃣ 현재 섹션 감지 */
  useEffect(() => {
    const sections = SECTIONS
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed left-8 top-1/2 -translate-y-1/2 z-40 flex gap-6">
      {/* Progress Bar */}
      <div className="relative w-[2px] h-[80vh] bg-slate-700/60 rounded-full overflow-hidden">
        <div
          className="
            absolute inset-0
            bg-teal-400
            origin-top
            will-change-transform
          "
          style={{
            transform: `scaleY(${progress})`,
          }}
        />
      </div>

      {/* Section Indicators */}
      <ul className="flex flex-col justify-between h-[80vh] text-xs tracking-widest">
        {SECTIONS.map((section) => {
          const isActive = section.id === activeId;

          return (
            <li
              key={section.id}
              className={`flex items-center gap-3 transition-colors ${
                isActive ? "text-teal-400" : "text-slate-500"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full transition-transform duration-200 ${
                  isActive ? "bg-teal-400 scale-125" : "bg-slate-500"
                }`}
              />
              {section.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ScrollProgressBar;
