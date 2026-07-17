# Dark/Light 모드 토글 설계

## 배경

포트폴리오 전체가 다크 팔레트로 하드코딩됨 (`bg-slate-950`, `text-slate-300`, `border-indigo-400` 등, 11개 파일). 우측 상단에 토글 스위치(첨부 이미지 스타일)를 추가해 라이트 모드로 전환 가능하게 만든다. 배경/카드/글자색/강조색 전부 라이트 팔레트로 바뀌어야 한다. 기본값은 현재와 동일한 다크.

MUI는 아이콘(`@mui/icons-material`)만 사용 중이고 `ThemeProvider`/`createTheme` 없음 — MUI 자체 테마는 손댈 필요 없음.

## 대상 파일 (색상 하드코딩 있는 곳)

- `src/App.tsx`
- `src/components/common/ScrollProgressBar.tsx`
- `src/components/common/SectionTitle.tsx`
- `src/components/common/TopNav.tsx`
- `src/components/modals/ProjectDetailModal.tsx`
- `src/components/modals/ProjectPdfModal.tsx`
- `src/components/sections/ContactSection.tsx`
- `src/components/sections/ExperienceSection.tsx`
- `src/components/sections/IntroSection.tsx`
- `src/components/sections/ProjectsSection.tsx`
- `src/components/sections/SkillsSection.tsx`

## 방식

Tailwind 내장 `dark:` variant + `darkMode: "class"` 전략 사용. 커스텀 CSS 변수 토큰 시스템은 만들지 않는다 (Tailwind가 이미 그 역할).

- `tailwind.config.js`: `darkMode: "class"` 추가.
- `<html>` 엘리먼트에 `class="dark"`가 있으면 다크, 없으면 라이트. 기본값 다크.
- 기존 색상 유틸 클래스는 `dark:` 접두사를 붙이고, 라이트용 값을 새로 추가하는 방식으로 각 파일을 수정.

### 색상 매핑 (slate 스케일 반전)

| 다크(기존) | 라이트(신규) | 용도 |
|---|---|---|
| `slate-950` | `slate-50` | 페이지 배경 |
| `slate-900` | `white` | 카드/서피스 배경 |
| `slate-800` | `slate-100` | 서브 서피스 |
| `slate-700` | `slate-300` | 보더 |
| `slate-500` | `slate-500` | 보조 텍스트(중간톤, 양쪽 다 무난) |
| `slate-400` | `slate-600` | 보조 텍스트 |
| `slate-300` | `slate-700` | 보조 텍스트(진함) |
| `slate-200` | `slate-800` | - |
| `slate-100` | `slate-900` | 본문 텍스트 |

강조색(indigo/emerald/amber/purple 등)은 라이트 배경에서 옅은 톤(`-200`~`-400`)이 대비가 부족하므로, 라이트 모드에서는 한 단계 진한 톤(`-600`~`-700`)으로 대체. 다크 모드 값은 기존 그대로 유지.

## FOUC 방지

`index.html` `<head>`에 React 마운트 전 실행되는 인라인 스크립트 추가:
- `localStorage.getItem("theme")` 확인
- 값 없으면 다크가 기본 → `dark` 클래스 부여
- `"light"`면 클래스 미부여

## 토글 컴포넌트

새 파일 `src/components/common/ThemeToggle.tsx`.

- 화면 우측 상단 고정 위치 (`fixed`, TopNav 파이앙과 별개, 인트로 포함 항상 노출).
- 첨부 이미지 스타일: 알약형(pill) 트랙 + 원형 손잡이, 클릭 시 손잡이가 좌우로 슬라이드하는 애니메이션(framer-motion 또는 CSS transition, 이미 설치된 framer-motion 사용).
- 상태는 컴포넌트 로컬 `useState` + `useEffect`로 관리. 전역 Context/상태관리 라이브러리 도입하지 않음 — 다른 컴포넌트들은 전부 CSS `dark:` variant로만 반응하므로 React 상태 공유가 필요 없음.
- 클릭 시:
  1. `document.documentElement.classList.toggle("dark")`
  2. `localStorage.setItem("theme", isDark ? "dark" : "light")`
- 초기 상태는 `document.documentElement.classList.contains("dark")`로 읽어 결정 (FOUC 방지 스크립트와 일관성 유지).
- `App.tsx`에 렌더 추가.

## 범위 밖

- 시스템 다크모드 설정(`prefers-color-scheme`) 자동 감지 — 요청 안 됨, 기본값은 항상 다크.
- MUI 컴포넌트 테마 — 아이콘만 쓰므로 해당 없음.
