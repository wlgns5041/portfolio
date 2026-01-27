# 🧑‍💻 Jihoon Portfolio

> 프로덕트처럼 운영 가능한 개인 포트폴리오 웹사이트

🌐 https://www.jihoon.cloud

---

## 📸 미리보기

<p align="center">
  <img src="./portfolio-logo.png" width="900" />
</p>

---

## INTRO.

TypeScript + React + Tailwind CSS로 개발한 웹 기반 개인 포트폴리오입니다.  
단순 정적 페이지가 아니라 **“프로덕트처럼 운영 가능한 포트폴리오”**를 목표로,
컴포넌트 단위 설계 / 타입 안정성 / 성능 / 배포까지 전체 흐름을 직접 구성했습니다.

---

<table>
<tr>
<td>

### ⏱ 개발 기간  
**2025.12**

### 👥 구성원  
개인 프로젝트

### 🛠 기여도  
`개발 100%` `디자인 100%` `기획 100%`

</td>
</tr>
</table>

---

<table>
<tr>
<td>

### 🛠 사용된 기술 스택

<p>
  <img src="https://skillicons.dev/icons?i=ts" height="36" />
  <img src="https://skillicons.dev/icons?i=react" height="36" />
  <img src="https://skillicons.dev/icons?i=tailwind" height="36" />
  <img src="https://skillicons.dev/icons?i=vercel" height="36" />
</p>

</td>
</tr>
</table>

---

<table>
<tr>
<td>

### ⚡ 주요 기능

- 섹션 기반 구성(소개/스킬/경험/프로젝트/연락처) + 스크롤 네비게이션
- 프로젝트 상세 모달(이미지 갤러리 + PDF 뷰어/다운로드) 제공
- 반응형 레이아웃 + 인터랙션 애니메이션(Framer Motion)으로 몰입감 강화
- Vercel 배포 및 운영 환경 구성(도메인 연결 / 빌드 파이프라인)

</td>
</tr>
</table>

---

<table>
<tr>
<td>

### ⚡ 핵심 포인트

- 🟢 **도메인 타입(ProjectItem/Detail) 기반 설계**로 리팩터링 안정성 확보  
- 🟢 **스크롤/애니메이션 처리에서 motion value 중심**으로 state 업데이트 최소화  
- 🟢 **PDF 로딩/worker 이슈 트러블슈팅 + 대용량 파일 UX fallback 구성**  
- 🟢 **코드 스플리팅/리소스 로딩 전략**으로 초기 진입 비용 분산  
- 🟢 **Vercel 배포/도메인 연결**로 운영 가능한 형태로 서비스화  

</td>
</tr>
</table>

---

<table>
<tr>
<td>

### 💡 기술 선정 이유

**TypeScript**  
- 섹션/데이터 구조 변경이 잦은 포트폴리오 특성상, 도메인 타입을 먼저 정의해 **props 계약을 타입으로 고정**하고 리팩터링 안정성을 확보했습니다.  
- 모달/상세 화면처럼 UI 상태가 복잡한 영역에서도 **타입 기반으로 오류를 컴파일 단계에서 차단**했습니다.

**Tailwind CSS**  
- 카드/배지/버튼/모달 등 공통 UI 패턴이 반복되는 구조에서 스타일 관리 비용을 줄이고, **디자인 토큰을 일관되게 유지**하기 위해 선택했습니다.

**React + Framer Motion**  
- 섹션/모달/탭/스크롤 기반 인터랙션을 컴포넌트로 분리해 관리하기 적합했고,  
- Framer Motion으로 복잡한 애니메이션을 안정적으로 구성했습니다.

**Vercel**  
- 정적 배포 최적화 + Preview 배포 + 빌드 로그 확인 + 환경변수 관리가 간편해 운영 관점에서 효율적이었습니다.

</td>
</tr>
</table>

---

<table>
<tr>
<td>

### 🧩 개발 이슈

**문제**  
스크롤/모달/애니메이션이 결합된 화면에서 잦은 state 업데이트로 일부 구간 렌더링 과부하 발생

**해결**  
scroll position을 state로 저장하기보다 **Framer Motion의 motion value(useScroll/useTransform)**로 UI 변화를 처리해 state 업데이트를 최소화했습니다.  
또한 모달을 key 기반으로 리마운트해 불필요한 상태 누적을 차단했습니다.

---

**문제**  
프로젝트 상세에서 PDF 렌더링 시 worker 버전 불일치 및 대용량(PDF 66MB)에서 흰 화면/로딩 실패 발생

**해결**  
react-pdf / pdfjs-dist 버전 정합을 맞추고 worker 경로를 안정적으로 제공했습니다.  
추가로 대용량 파일 대응을 위해 **새 탭 열기/다운로드 경로를 함께 제공하는 UX fallback**을 구성했습니다.

---

**문제**  
초기 번들 크기 증가(이미지/아이콘/모달/애니메이션 포함)로 첫 진입 체감 속도 저하 가능성

**해결**  
섹션/모달 단위로 **React.lazy/Suspense 코드 스플리팅**을 적용하고,
이미지 리소스는 lazy loading 및 적절한 크기로 관리해 초기 렌더 비용을 분산했습니다.

</td>
</tr>
</table>

---

<table>
<tr>
<td>

### ☁️ 개발 후 느낀점

실무에서 자주 겪는 “기능 추가 → 구조 복잡도 증가 → 성능/유지보수 리스크 증가” 흐름을  
작은 규모의 포트폴리오에서도 동일하게 경험했습니다.  
기능 구현뿐 아니라 **상태 흐름 / 렌더 비용 / 배포 운영까지 함께 설계해야 결과물이 안정적으로 유지**된다는 점을 체감했습니다.

</td>
</tr>
</table>

---

