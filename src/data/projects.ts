import type { Project } from "../types/types";
import rtnetLogo from "../assets/images/logo_rtnetsol.svg";
import petoryThumb from "../assets/images/petory-logo.png";
import portfolioThumb from "../assets/images/portfolio-logo.png";

import p1 from "../assets/images/portfolio_1.png";
import p2 from "../assets/images/portfolio_2.png";
import p3 from "../assets/images/portfolio_3.png";
import p4 from "../assets/images/portfolio_4.png";
import p5 from "../assets/images/portfolio_5.png";
import p6 from "../assets/images/portfolio_6.png";
import p7 from "../assets/images/portfolio_7.png";
import p8 from "../assets/images/portfolio_8.png";
import p9 from "../assets/images/portfolio_9.png";

export const projects: Project[] = [
  {
    id: "rtnet-solution",
    title: "알티넷솔루션 · 웹 개발자(풀스택)",
    period: "2026.03 ~ 재직 중 (5개월)",
    people: "사원 / 웹 개발자(풀스택)",
    techStack: ["JavaScript", "React", "Java", "Spring", "PostgreSQL", "Docker"],
    summary:
      "레거시 jQuery 화면의 React 전환, 운영 중인 솔루션의 기능 개선·이슈 해결, AI 활용 자동화 워크플로우 신규 솔루션 기획을 담당하고 있습니다.",
    role:
      "jQuery 기반 레거시 화면의 React 전환\n기존 솔루션 기능 개선 및 운영 이슈 해결\nAI 활용 기반 자동화 워크플로우 신규 솔루션 제품 기획",
    image: rtnetLogo,
    status: "READY",
    thumbnailBg: "#0B1220",
  },

  {
    id: "petory",
    title: "PETORY - 반려동물 공유돌봄 웹서비스",
    period: "2025.02 ~ 2025.11",
    people: "2명 (Backend 1, Frontend 1)",
    techStack: [
      "JavaScript",
      "React",
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
    techStack: ["JavaScript", "TypeScript", "React", "Tailwind CSS", "Vercel"],
    summary:
      "프론트엔드 개발 역량과 프로젝트 경험을 정리해 보여주는 웹 기반 포트폴리오.",
    role:
      "프론트엔드 단독 개발 (UI/UX 설계, React 구조 설계, 배포)",
    image: portfolioThumb,
    links: {
      demo: "https://jihoon.cloud",
      repo: "https://github.com/wlgns5041/portfolio",
    },
    detailImages: [p1, p2, p3, p4, p5, p6, p7, p8, p9],
    status: "READY",
  },
];