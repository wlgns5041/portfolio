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

  // ✅ 모바일에서 클릭 시 직접 스크롤 (상단 고정 UI 높이만큼 오프셋)
  const handleJump = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();

    const el = document.getElementById(id);
    if (!el) return;

    // 모바일 상단에 프로그레스바 + nav가 있어서 가려짐 방지 (필요하면 숫자 조절)
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const headerOffset = isMobile ? 120 : 90;

    const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.scrollTo({ top, behavior: "smooth" });

    // 해시도 반영 (뒤로가기/공유 대응)
    history.replaceState(null, "", `#${id}`);

    // active도 즉시 갱신 (UX)
    setActiveId(id);
  };

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

    // ✅ active 흔들림 방지용: 직전 active를 ref로 들고 있음
    const activeRef = { current: "skills" as string };

    const update = () => {
      ticking = false;

      // ❗️스크롤 중 meta 재계산을 계속하면 값이 미세하게 흔들릴 수 있으니
      //    기본은 resize/초기에서만 meta를 계산하도록 유지
      //    (초기/리사이즈에서 calcMeta 호출됨)
      // calcMeta();

      const introEl = document.getElementById("intro");
      if (introEl) {
        const r = introEl.getBoundingClientRect();
        const inView = r.bottom > 0 && r.top < window.innerHeight;
        setVisible(!inView);
      } else {
        setVisible(true);
      }

      if (!meta.length) return;

      // ✅ 기준점을 약간 위로 (경계 흔들림 감소)
      const anchorY = window.scrollY + window.innerHeight * 0.28;

      let current = meta.find((s) => anchorY >= s.top && anchorY < s.bottom);

      if (!current) {
        const last = meta[meta.length - 1];
        if (anchorY >= last.top) current = last;
      }

      if (!current) return;

      // ✅ 히스테리시스(완충 구간): 섹션 경계 근처 깜빡임 방지
      const prevId = activeRef.current;
      if (prevId && prevId !== current.id) {
        const prev = meta.find((m) => m.id === prevId);
        if (prev) {
          const buffer = Math.min(120, window.innerHeight * 0.08);
          const stillPrev =
            anchorY >= prev.top + buffer && anchorY < prev.bottom - buffer;

          if (stillPrev) return;
        }
      }

      // ✅ ref + state 동시 업데이트 (불필요한 setState 방지)
      if (activeRef.current !== current.id) {
        activeRef.current = current.id;
        setActiveId(current.id);
      }
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

    calcMeta();
    update();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    const t1 = window.setTimeout(() => {
      calcMeta();
      update();
    }, 200);
    const t2 = window.setTimeout(() => {
      calcMeta();
      update();
    }, 800);

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

    nav.scrollTo({
      left: elRect.left - navRect.left - navRect.width / 2 + elRect.width / 2,
      behavior: "smooth",
    });
  }, [activeId]);

  return (
<nav
  className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500
    top-6 md:top-6
    max-md:ml-[20px]
    ${
      visible
        ? "opacity-100 translate-y-0"
        : "opacity-0 -translate-y-3 pointer-events-none"
    }`}
>
      <div
        ref={navRef}
        className="
          relative flex items-center gap-1 md:gap-3
          px-1.5 py-2 md:px-10 md:py-4
          rounded-full
          bg-white/10
          backdrop-blur-[28px]
          border border-white/5
          shadow-[0_8px_28px_rgba(0,0,0,0.22)]
          max-w-[94vw] md:max-w-none
          overflow-x-auto whitespace-nowrap scrollbar-hide
        "
      >
        <span
          className="
            pointer-events-none
            absolute top-1/2 -translate-y-1/2 rounded-full
            bg-slate-950 shadow-inner
            transition-all duration-300 ease-out
            h-8 md:h-12
          "
          style={{ left: pillStyle.left, width: pillStyle.width }}
        />

        {NAV_ITEMS.map((item) => {
          const id = item.href.replace("#", "");
          const isActive = activeId === id;

          return (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleJump(e, id)}
              ref={(el) => {
                itemRefs.current[id] = el;
              }}
              className={`
                relative z-10 rounded-full
                px-2.5 py-2 md:px-7 md:py-2.5
                text-[10px] md:text-base
                font-black md:font-extrabold
                tracking-normal
                transition-colors
                ${isActive ? "text-white" : "text-slate-300 hover:text-white"}
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