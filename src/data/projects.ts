import type { Project } from "../types/types";
import petoryThumb from "../assets/images/petory.svg";
import portfolioThumb from "../assets/images/portfolio.svg";

import p1 from "../assets/images/portfolio_1.png";
import p2 from "../assets/images/portfolio_2.png";
import p3 from "../assets/images/portfolio_3.png";
import p4 from "../assets/images/portfolio_4.png";
import p5 from "../assets/images/portfolio_5.png";
import p6 from "../assets/images/portfolio_6.png";
import p7 from "../assets/images/portfolio_7.png";

export const projects: Project[] = [
  {
    id: "petory",
    title: "PETORY - 반려동물 일정 / 공유돌봄 플랫폼",
    period: "2025.02 ~ 2025.11",
    people: "2명 (Backend 1, Frontend 1)",
    techStack: [
      "JavaScript",
      "React",
      "React Query",
      "CSS",
      "Nginx",
      "Docker",
      "Jenkins",
      "AWS",
      "Vercel"
    ],
    summary: "반려동물 일정 관리, 공유 돌봄, 커뮤니티 기능을 제공하는 웹 서비스.",
    role: "프론트엔드 단독 개발 (기획, UI/UX 설계, React 구조 설계, 배포)",
    image: petoryThumb,
    links: {
      demo: "https://petory.site",
      repo: "https://github.com/wlgns5041/Petroy-FrontEnd",
    },
    pdfUrl: "/pdfs/petory.pdf",
    status: "READY",
  },

  {
    id: "portfolio",
    title: "개인 포트폴리오 웹사이트",
    period: "2025.12",
    people: "개인 프로젝트",
    techStack: ["TypeScript", "React", "Tailwind CSS", "Vercel"],
    summary:
      "프론트엔드 개발 역량과 프로젝트 경험을 정리해 보여주는 웹 기반 포트폴리오.",
    role:
      "프론트엔드 단독 개발 (UI/UX 설계, 컴포넌트 구조 설계, 애니메이션 구현, 배포)",
    image: portfolioThumb,
    links: {
      demo: "https://jihoon.cloud",
      repo: "https://github.com/wlgns5041/portfolio",
    },
    detailImages: [p1, p2, p3, p4, p5, p6, p7], 
    status: "READY",
  },

  {
    id: "ai-platform",
    title: "AI 코딩테스트 플랫폼 (준비 중)",
    period: "2026 예정",
    people: "3명 (Backend 2, Frontend 2)",
    techStack: ["TypeScript", "React", "React Query", "Tailwind CSS"],
    summary:
      "언어/레벨별로 하루 1문제 코딩테스트를 제공하고, 개발자 전용 채팅 기반으로 풀이·피드백이 가능한 웹 플랫폼.",
    role:
      "AI 문제 생성 · 정답/피드백 평가 · 정답률/통계 시스템\n프롬프트 기반 풀이 경험 설계 · 랭킹 및 출석체크/코인 시스템",
    status: "WIP",
    thumbnailBg: "#0B1220",
  },
];