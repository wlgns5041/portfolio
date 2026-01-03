import type { ProjectItem } from "../components/modals/ProjectDetailModal";

export const projectDetails: Record<string, ProjectItem["detail"]> = {
  portfolio: {
    statusLabel: "서비스 중",
    duration: "2025.12",
    team: "개인 프로젝트",
    contribution: ["개발 100%", "디자인 100%", "기획 100%"],

    intro: `TypeScript + React + Tailwind CSS로 개발한 웹 기반 개인 포트폴리오입니다.
프로젝트 경험과 개발 역량을 한눈에 전달하는 것을 목표로, 컴포넌트 구조를 분리하고 타입 안정성을 강화했습니다.`,

    features: [
      "섹션 기반 구성(소개/스킬/경험/프로젝트/연락처) 및 스크롤 네비게이션",
      "프로젝트 상세 모달(PDF / 이미지 갤러리) 제공",
      "반응형 레이아웃 및 인터랙션 애니메이션(Framer Motion)",
      "배포 자동화/운영 환경 구성(Vercel)",
    ],

    techReasons: `TypeScript는 컴포넌트 props/상태의 타입 안전성을 확보하고 유지보수성을 높이기 위해 도입했습니다.
Tailwind CSS는 유틸리티 기반 스타일로 UI 일관성을 빠르게 맞추고 컴포넌트 단위로 확장하기에 적합해 선택했습니다.
React는 섹션 단위 컴포넌트 분리와 상태 관리가 용이하고, Framer Motion과 결합해 인터랙션을 깔끔하게 만들 수 있어 사용했습니다.`,

    issues: [
      {
        problem: "섹션이 많아질수록 스크롤 이벤트/렌더링 처리로 체감 성능 저하",
        solution:
          "입력/상태 갱신을 분리하고(필요 시 useTransition/useDeferredValue), 불필요한 리렌더를 줄이도록 컴포넌트 책임을 분리해 최적화",
      },
      {
        problem: "초기 로딩 리소스가 커지며 첫 화면 진입 비용 증가",
        solution:
          "React.lazy/Suspense 기반 코드 스플리팅과 이미지 지연 로딩으로 초기 번들 비용을 줄여 체감 로딩 개선",
      },
    ],

    takeaway: `포트폴리오를 제품처럼 다듬는 과정에서 “보여주는 UI”뿐 아니라
성능/구조/운영(배포)까지 함께 고려하는 습관을 만들었습니다.
작은 개선(렌더링/번들/인터랙션)이 사용자 경험을 크게 바꾼다는 것을 체감했습니다.`,

    highlights: [
      "타입 기반 설계로 컴포넌트 안정성 강화",
      "코드 스플리팅/지연 로딩으로 초기 로딩 개선",
      "Tailwind + Motion으로 UI 일관성과 인터랙션 품질 확보",
    ],
  },
};