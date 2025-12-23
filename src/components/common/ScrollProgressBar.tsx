import { useEffect, useState } from "react";
import { SECTIONS } from "../../data/sections";

const ScrollProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState("intro");

  useEffect(() => {
    let sectionMeta: {
      id: string;
      start: number;
      end: number;
    }[] = [];

    const calculateSections = () => {
      let currentOffset = 0;
      sectionMeta = [];

      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (!el) continue;

        const height = el.offsetHeight;

        sectionMeta.push({
          id: section.id,
          start: currentOffset,
          end: currentOffset + height,
        });

        currentOffset += height;
      }
    };

    const update = () => {
      const scrollY = window.scrollY;
      const viewportCenter = scrollY + window.innerHeight / 2;

      if (sectionMeta.length === 0) return;


      // ===== progress 계산 =====
      const totalScrollable =
  document.documentElement.scrollHeight - window.innerHeight;
const nextProgress = totalScrollable > 0 ? scrollY / totalScrollable : 0;
      setProgress(Math.min(Math.max(nextProgress, 0), 1));

      // ===== active section =====
      for (const meta of sectionMeta) {
        if (
          viewportCenter >= meta.start &&
          viewportCenter < meta.end
        ) {
          setActiveId(meta.id);
          break;
        }
      }
    };

    calculateSections();
    update();

    window.addEventListener("resize", calculateSections);
    window.addEventListener("scroll", update, { passive: true });

    return () => {
      window.removeEventListener("resize", calculateSections);
      window.removeEventListener("scroll", update);
    };
  }, []);

  return (
    <div className="fixed left-8 top-1/2 -translate-y-1/2 z-40 flex gap-6">
      <div className="relative w-[2px] h-[70vh] bg-slate-700/60 rounded-full overflow-hidden">
        <div
          className="absolute inset-0 bg-teal-400 origin-top transition-transform duration-200 ease-out"
          style={{ transform: `scaleY(${progress})` }}
        />
      </div>

      <ul className="flex flex-col justify-between h-[70vh] text-xs tracking-widest">
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
                className={`w-2 h-2 rounded-full transition-transform ${
                  isActive
                    ? "bg-teal-400 scale-125"
                    : "bg-slate-500"
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
