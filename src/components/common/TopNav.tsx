import { useEffect, useMemo, useRef, useState } from "react";

const NAV_ITEMS = [
  { label: "기술 스택", href: "#skills" },
  { label: "역량 및 문제해결", href: "#problem" },
  { label: "프로젝트", href: "#projects" },
  { label: "추가 정보", href: "#contact" },
];

type SectionMeta = { id: string; top: number; bottom: number };

const TopNav = () => {
  const [visible, setVisible] = useState(false);
  const [activeId, setActiveId] = useState("skills");

  const navRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });

  const ids = useMemo(() => NAV_ITEMS.map((i) => i.href.replace("#", "")), []);

  useEffect(() => {
    let meta: SectionMeta[] = [];
    let ticking = false;

    const calcMeta = () => {
      meta = ids
        .map((id) => {
          const el = document.getElementById(id);
          if (!el) return null;

          const rect = el.getBoundingClientRect();
          const top = rect.top + window.scrollY;
          const bottom = top + rect.height;

          return { id, top, bottom };
        })
        .filter(Boolean) as SectionMeta[];
    };

    const update = () => {
      ticking = false;

      // ✅ 스크롤/애니메이션으로 높이 바뀌는 케이스 대비: 매번 최신 meta로
      calcMeta();

      // intro 보이면 nav 숨김
      const introEl = document.getElementById("intro");
      if (introEl) {
        const r = introEl.getBoundingClientRect();
        const inView = r.bottom > 0 && r.top < window.innerHeight;
        setVisible(!inView);
      } else {
        setVisible(true);
      }

      if (!meta.length) return;

      const anchorY = window.scrollY + window.innerHeight * 0.35;

      let current = meta.find((s) => anchorY >= s.top && anchorY < s.bottom);

      if (!current) {
        const last = meta[meta.length - 1];
        if (anchorY >= last.top) current = last;
      }

      if (current) setActiveId(current.id);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    const onResize = () => {
      calcMeta();
      update();
    };

    // 초기
    calcMeta();
    update();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    // 폰트/이미지 로딩 후 안정화
    const t1 = window.setTimeout(update, 200);
    const t2 = window.setTimeout(update, 800);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <span
          className="absolute top-1/2 -translate-y-1/2 h-10 rounded-full
            bg-slate-950 shadow-inner transition-all duration-300 ease-out"
          style={{ left: pillStyle.left, width: pillStyle.width }}
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
                ${activeId === id ? "text-white" : "text-slate-300 hover:text-white"}
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