import { useEffect, useRef, useState } from "react";

const NAV_ITEMS = [
  { label: "기술 스택", href: "#skills" },
  { label: "경험", href: "#experience" },
  { label: "프로젝트", href: "#projects" },
  { label: "추가 정보", href: "#contact" },
];

const TopNav = () => {
  const [visible, setVisible] = useState(false);
  const [activeId, setActiveId] = useState<string>("skills");

  const navRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });

  /* 1️⃣ Intro 보이면 nav 숨김 */
  /* 1️⃣ Intro 보이면 nav 숨김 - 이 부분을 수정하세요 */
  useEffect(() => {
    const intro = document.getElementById("intro");
    if (!intro) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // entry.isIntersecting이 조금이라도 true면 (인트로가 화면에 있으면) nav를 숨김
        setVisible(!entry.isIntersecting);
      },
      {
        threshold: 0.1, // 0.6에서 0.1로 변경 (인트로가 10%만 보여도 감지)
        rootMargin: "0px",
      }
    );

    observer.observe(intro);
    return () => observer.disconnect();
  }, []);

  /* 2️⃣ active 섹션 추적 */
  useEffect(() => {
    const sections = NAV_ITEMS.map((i) =>
      document.getElementById(i.href.replace("#", ""))
    ).filter(Boolean) as HTMLElement[];

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

  /* 3️⃣ active pill 위치 이동 */
  useEffect(() => {
    const el = itemRefs.current[activeId];
    const nav = navRef.current;
    if (!el || !nav) return;

    const elRect = el.getBoundingClientRect();
    const navRect = nav.getBoundingClientRect();

    setPillStyle({
      left: elRect.left - navRect.left,
      width: elRect.width,
    });
  }, [activeId]);

  return (
    <nav
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500
        ${
          visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
    >
      <div
        ref={navRef}
        className="
          relative flex items-center gap-3 px-10 py-4 rounded-full
          bg-white/10
          backdrop-blur-[28px]
          border border-white/5
          shadow-[0_12px_40px_rgba(0,0,0,0.25)]
        "

      >
        {/* active pill */}
        <span
          className="absolute top-1/2 -translate-y-1/2 h-10 rounded-full
            bg-slate-950 shadow-inner transition-all duration-300 ease-out"
          style={{
            left: pillStyle.left,
            width: pillStyle.width,
          }}
        />

        {NAV_ITEMS.map((item) => {
          const id = item.href.replace("#", "");

          return (
            <a
              key={item.href}
              href={item.href}
              ref={(el) => {
                itemRefs.current[id] = el;
              }}
              className={`
                relative z-10 px-7 py-2.5 rounded-full
                text-base font-bold transition-colors
                ${
                  activeId === id
                    ? "text-white"
                    : "text-slate-300 hover:text-white"
                }
              `}
            >
              {item.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
};

export default TopNav;
