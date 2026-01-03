import type { ExperienceCase, Capability  } from "../types/types";

export const capabilities: Capability[] = [
  {
    title: "React 구조 설계 · 컴포넌트 책임 분리",
    summary:
      "확장성과 유지보수를 고려해 React 구조를 설계합니다.",
    points: [
      "페이지 / 레이아웃 / 공통 컴포넌트 분리로 재사용성과 가독성 향상",
      "UI 컴포넌트와 비즈니스 로직(Service/API) 분리",
      "기능 추가 시 기존 코드 영향 최소화하는 구조 설계",
    ],
    tags: ["React", "Component Design", "SoC"],
  },
  {
    title: "React Query · 서버 상태 관리 및 성능 최적화",
    summary:
      "서버 상태를 캐싱 중심으로 관리해 네트워크 비용과 체감 로딩을 개선합니다.",
    points: [
      "쿼리 키/캐싱 전략 표준화로 중복 요청 제거",
      "invalidate / staleTime 기반 데이터 최신성 관리",
      "로딩·에러·리트라이 흐름 일관화로 사용자 경험 안정화",
    ],
    tags: ["React Query", "Caching", "Performance"],
  },
  {
    title: "Axios · 인증 및 전역 에러 처리 구조화",
    summary:
      "Axios 인터셉터를 활용해 인증/에러 흐름을 공통화합니다.",
    points: [
      "JWT 인증 요청/응답 흐름을 전역 인터셉터로 일원화",
      "401/403/500 오류에 대한 공통 UX 처리",
      "API Service Layer 분리로 네트워크 로직 응집도 향상",
    ],
    tags: ["Axios", "JWT", "Interceptor"],
  },
  {
    title: "라우팅 · 접근 제어 및 인증 흐름 설계",
    summary:
      "사용자 상태에 따라 접근 가능한 화면을 명확히 제어합니다.",
    points: [
      "React Router 기반 보호 라우팅 구현",
      "로그인 상태에 따른 페이지 접근 제어 및 리다이렉션 처리",
      "인증 상태 변경에 따른 UI 동기화 처리",
    ],
    tags: ["React Router", "Auth", "Routing"],
  },
  {
    title: "배포 및 운영 · EC2 기반 운영 부담 개선과 Vercel 전환",
    summary:
      "프론트엔드 운영 부담을 줄이기 위해 배포 구조를 재설계하고,\n" + "자동화된 배포 환경으로 전환했습니다.",
    points: [
      "기존 EC2 인스턴스에서 Docker + Nginx + Jenkins 기반 프론트 배포",
      "Elasticsearch 등 리소스 사용 증가로 서버 용량 부담 및 응답 지연 발생",
      "백엔드는 미니 PC로 분리 구축하고, 프론트엔드는 Vercel로 이전해 자동 배포 구성",
    ],
    tags: ["Vercel", "EC2", "Docker", "Nginx", "Jenkins", "Deployment"],
  },
  {
    title: "UI / UX · 실서비스 관점의 사용자 경험 개선",
    summary:
      "실제 사용자 환경을 고려한 UI/UX 설계와 인터랙션 개선을 지향합니다.",
    points: [
      "모바일 반응형 레이아웃 및 크로스 브라우징 대응",
      "Modal 기반 멀티 스텝 입력 흐름 설계로 사용성 개선",
      "전역 테마(useTheme) 관리로 다크모드 등 환경 대응",
    ],
    tags: ["UX", "Responsive", "UI Design"],
  },

  {
  title: "포트폴리오 UI 설계 · 인터랙션 중심 프론트엔드 구현",
  summary:
    "프론트엔드 역량을 효과적으로 전달하기 위한 UI 구조와 인터랙션을 설계합니다.",
  points: [
    "섹션 단위 컴포넌트 설계로 콘텐츠 구조화",
    "Framer Motion 기반 스크롤/레이아웃 인터랙션 구현",
    "애니메이션과 성능을 동시에 고려한 렌더링 설계",
  ],
  tags: ["React", "Framer Motion", "UI Architecture"],
},
{
  title: "렌더링 성능 및 초기 로딩 최적화",
  summary:
    "시각적 완성도를 유지하면서도 성능을 고려한 UI를 구현합니다.",
  points: [
    "React.lazy/Suspense 기반 코드 스플리팅",
    "이미지/리소스 관리로 초기 번들 비용 감소",
    "불필요한 리렌더링 최소화를 위한 구조 분리",
  ],
  tags: ["Performance", "Code Splitting", "UX"],
},

];

export const experienceCases: ExperienceCase[] = [
  // 1) 이미 있던 것 (강력)
  {
    project: "PETORY",
    title: "React Query 캐싱/무효화로 로딩 지연 개선",
    items: [
      {
        label: "문제",
        text: "화면 전환/재방문 시 동일 API가 반복 호출되어 체감 로딩 지연이 발생",
      },
      {
        label: "해결",
        text: "쿼리 키 규칙과 캐싱·무효화(invalidateQueries) 기준을 정리하고, staleTime/리패치 조건을 조정해 중복 요청을 최소화",
      },
      {
        label: "성과",
        text: "API 호출 70~80% 감소, 재방문 로딩 35~40ms 수준으로 단축",
      },
      {
        label: "배운점",
        text: "서버 상태 관리는 기능 구현보다 먼저 ‘전략’이 필요하며, 작은 구조 개선이 UX에 직접적인 차이를 만든다",
      },
    ],
  },

  // 2) 전역 에러 처리 (PETORY에서 이미 했던 흐름)
  {
    project: "PETORY",
    title: "Axios 인터셉터 기반 전역 에러 처리로 UX/디버깅 안정화",
    items: [
      {
        label: "문제",
        text: "페이지마다 에러 처리 방식이 달라 사용자 경험이 끊기고, 동일 이슈가 중복 구현되어 유지보수가 어려움",
      },
      {
        label: "해결",
        text: "Axios 응답 인터셉터로 네트워크/서버 오류를 한 곳에서 처리하고 AlertModal/Toast 패턴을 표준화(중복 모달 방지 포함)",
      },
      {
        label: "성과",
        text: "에러 대응 UX를 일원화해 사용자 혼란 감소, 예외 처리 코드 중복 제거로 유지보수 효율 향상",
      },
      {
        label: "배운점",
        text: "에러 처리는 ‘부가 기능’이 아니라 서비스 신뢰도를 좌우하는 핵심 경험이며, 공통화가 곧 생산성이다",
      },
    ],
  },

  // 3) 인증 만료/접근 제어 (실무에서 매우 어필됨)
  {
    project: "PETORY",
    title: "인증 만료/미인증 상태에서의 접근 제어 및 리다이렉션 흐름 정리",
    items: [
      {
        label: "문제",
        text: "토큰 만료나 미로그인 상태에서 일부 화면이 ‘중간까지 렌더링’되거나 API 에러만 발생해 사용자가 원인을 알기 어려움",
      },
      {
        label: "해결",
        text: "401/403을 전역에서 감지해 로그인 페이지로 유도하고, 보호 라우팅(Private Route/withAuth)으로 미인증 접근을 차단",
      },
      {
        label: "성과",
        text: "비정상 접근 시나리오에서 화면 깨짐과 불필요한 요청을 줄이고, 사용자가 즉시 행동(재로그인)할 수 있는 UX 제공",
      },
      {
        label: "배운점",
        text: "인증 흐름은 ‘API 성공’이 아니라 ‘사용자 행동’까지 설계해야 완성된다",
      },
    ],
  },

  // 4) 배포 전환 + 도메인 + DNS (최근 네가 실제로 한 것)
  {
    project: "PETORY",
    title: "EC2 기반 프론트 운영 한계 인식 후 Vercel 전환으로 배포 구조 개선",
    items: [
      {
        label: "문제",
        text: "프론트엔드와 백엔드를 EC2 단일 인스턴스에서 함께 운영하며 Docker, Nginx, Jenkins 기반 자동 배포를 구성했으나, \n" + "Elasticsearch 등 리소스 사용 증가로 서버 용량 부담이 커지고 응답 시간이 점차 지연됨",
      },
      {
        label: "해결",
        text: "서버 리소스 부담을 줄이기 위해 백엔드는 미니 PC로 분리 구축하고, 프론트엔드는 Vercel로 이전해 빌드·배포를 전담하도록 구조를 재설계",
      },
      {
        label: "성과",
        text: "프론트 배포/운영 부담 감소 및 서버 리소스 안정화, HTTPS/도메인 관리 단순화로 배포 안정성과 응답 속도 개선",
      },
      {
        label: "배운점",
        text: "모든 것을 직접 운영하는 것이 항상 최선은 아니며, 서비스 특성에 맞는 배포 플랫폼 선택이 개발 효율과 운영 안정성에 큰 영향을 준다는 점을 체감",
      },
    ],
  },

  // 5) 모바일 뷰포트(크로스브라우징) — 네가 실제로 강하게 말할 수 있는 포인트
  {
    project: "PETORY",
    title: "모바일 주소창(브라우저별) 뷰포트 차이로 깨지는 레이아웃 안정화",
    items: [
      {
        label: "문제",
        text: "Safari/Chrome/네이버 앱 등에서 주소창 노출 방식이 달라 동일한 화면이 잘리거나 과도한 여백이 생김",
      },
      {
        label: "해결",
        text: "CSS 변수로 실시간 viewport 높이를 계산해 레이아웃 기준을 통일하고, 기기/브라우저별 렌더링 차이를 흡수",
      },
      {
        label: "성과",
        text: "다양한 모바일 환경에서 동일한 UI 높이/스크롤 경험을 제공해 사용성 안정화",
      },
      {
        label: "배운점",
        text: "반응형은 ‘크기 대응’이 아니라 ‘환경 차이 대응’이며, 실기기 검증이 필수다",
      },
    ],
  },

  // 6) (포트폴리오)
  {
    project: "Portfolio",
    title: "코드 스플리팅을 통한 초기 로딩 성능 개선",
    items: [
      { label: "문제", text: "초기 로딩 리소스가 커지며 첫 화면 진입 비용 증가" },
      {
        label: "해결",
        text: "React.lazy/Suspense 기반 코드 스플리팅 + 이미지 지연 로딩 적용",
      },
      { label: "성과", text: "초기 로딩 부담 감소로 체감 속도 개선" },
      {
        label: "배운점",
        text: "디자인/애니메이션을 유지하면서도 성능을 동시에 설계할 수 있다",
      },
    ],
  },
];