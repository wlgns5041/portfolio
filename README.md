# 🧑‍💻 Jihoon Portfolio

> 프로덕트처럼 운영 가능한 개인 포트폴리오 웹사이트

🌐 https://www.jihoon.cloud

---

## 📸 미리보기

<p align="center">
   <img src="./src/assets/images/portfolio-logo.png" width="900" />
</p>

---

## INTRO

이 포트폴리오는 단순 소개용 웹페이지가 아닌, 실제 서비스처럼 설계·운영되는 개인 프로젝트입니다.
TypeScript · React · Tailwind CSS를 기반으로
컴포넌트 설계 → 상태 관리 → 성능 → 배포·운영까지
프론트엔드 개발 전반의 흐름을 하나의 프로덕트로 구현했습니다.

UI 구현에 그치지 않고,
구조 안정성 · 렌더링 비용 · 사용자 경험 · 운영 환경을 함께 고려하며 개발했습니다.

---

### ⏱ 개발 기간
2025.12

### 👥 구성원
개인 프로젝트

### 🛠 기여도
`개발 100%` `디자인 100%` `기획 100%`

---

### 🛠 사용된 주요 기술 스택

<p>
  <img src="https://skillicons.dev/icons?i=ts" height="36" />
  <img src="https://skillicons.dev/icons?i=react" height="36" />
  <img src="https://skillicons.dev/icons?i=tailwind" height="36" />
  <img src="https://skillicons.dev/icons?i=vercel" height="36" />
</p>

---

### ⚡ 주요 기능

- 섹션 기반 페이지 구성
- 스크롤 위치 연동 네비게이션 및 인터랙션
- 프로젝트 상세 모달 및 PDF 뷰어 제공
- 반응형 레이아웃 + 인터랙션 애니메이션 (Framer Motion)
- Vercel 배포 및 운영 환경 구성 (도메인 연결 및 환경변수 관리)

---

### ⚡ 핵심 포인트

- 🟢 도메인 타입 중심 설계로 컴포넌트 간 데이터 계약 명확화
- 🟢 motion value 기반 애니메이션 처리로 불필요한 state 업데이트 최소화
- 🟢 대용량 PDF 실패 상황까지 고려한 UX 설계 (새 탭 / 다운로드 fallback)
- 🟢 React.lazy 기반 코드 스플리팅으로 초기 진입 성능 분산
- 🟢 배포 이후 운영을 전제로 한 구조로 로컬·운영 환경 차이 최소화

---

### 💡 기술 선정 이유

**TypeScript**  
- 도메인 타입을 먼저 고정해 props 계약을 타입으로 관리  
- 리팩터링 시 런타임 오류 가능성 최소화

**React**
- 기능 단위 컴포넌트 분리로 상태 전파 범위 최소화

**Tailwind CSS**  
- 반복 UI 패턴을 유틸리티 기반으로 일관되게 관리  
- 빠른 프로토타이핑 → 고정 컴포넌트 구조 전환에 유리

**Framer Motion**  
- 애니메이션 구현 복잡도 감소 + 자연스러운 전환

**Vercel**  
- Preview 배포, 로그 확인, 환경변수 관리 등 운영 편의성

---

### 🧩 개발 이슈

🔴 **문제**  
스크롤/모달/애니메이션 결합 화면에서 렌더링 과부하 발생

🟢 **해결**  
motion value 활용으로 스크롤/애니메이션 처리

---

🔴 **문제** 
PDF 로딩 실패

🟢 **해결**  
worker 경로 고정 + 대체 UX 제공

---

🔴 **문제** 
초기 번들 증가로 첫 진입 체감 속도 저하

🟢 **해결**   
React.lazy + Suspense 기반 코드 스플리팅을 통한 체감 성능 개선

---

### ☁️ 개발 후 느낀점

기능 구현보다
구조, 상태 흐름, 렌더 비용을 먼저 설계해야
서비스가 안정적으로 유지된다는 것을 경험했습니다.

이후에는 기능 추가 시에도
확장성과 유지보수를 기준으로 설계하는 습관을 갖게 되었습니다.