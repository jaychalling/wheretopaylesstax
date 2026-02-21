# WhereToPayLessTax MVP Tasks

## MVP (v1.0) — 완료

### 프로젝트 셋업
- [x] Next.js 14 보일러플레이트
- [x] TypeScript + Tailwind CSS 설정
- [x] Vercel 배포 설정 (`vercel.json`)

### 데이터 수집
- [x] 50개국 세금 데이터 수집 → `countries.json`
- [x] 15개 가이드 콘텐츠 작성 → `guides.json`
- [x] 20개 인기 비교 조합 선정

### 페이지 구현
- [x] 홈페이지 (Hero, 비교 카드, 리전 탭, 뉴스레터)
- [x] 국가 목록 (`/countries`)
- [x] 국가 상세 (`/countries/[slug]`) — 50개
- [x] 비교 목록 (`/compare`)
- [x] 비교 상세 (`/compare/[slug]`) — 20개
- [x] 랭킹 (`/rankings`)
- [x] 가이드 목록 (`/guides`)
- [x] 가이드 상세 (`/guides/[slug]`) — 15개
- [x] About 페이지
- [x] Contact 페이지
- [x] Privacy 페이지
- [x] Terms 페이지
- [x] 404 페이지

### 컴포넌트
- [x] Header (네비게이션)
- [x] Footer
- [x] HomeSearchBar (검색)
- [x] NewsletterForm (뉴스레터 UI)
- [x] RegionTabs (리전별 국가 필터)
- [x] CountriesGrid (국가 그리드)
- [x] RankingsTable (정렬 가능한 랭킹)
- [x] AdPlaceholder (광고 자리)

### SEO
- [x] 메타데이터 (모든 페이지)
- [x] sitemap.xml
- [x] robots.txt
- [x] OG 이미지 생성

### API
- [x] 검색 API (`/api/search`)

### 배포
- [x] Vercel Production 배포
- [x] 빌드 에러 해결
- [x] 데이터 품질 개선

---

## SEO/품질 개선 (2026-02-13) — 완료

### 품질 수정 8건
- [x] Homepage metadata export 추가
- [x] AdPlaceholder invisible div 전환 (data-ad-slot)
- [x] TaxDisclaimer 공유 컴포넌트 생성 + 적용 (countries, compare, guides)
- [x] Compare 페이지 last updated 날짜 표시
- [x] JSON-LD 구조화 데이터 (Organization, WebSite, BreadcrumbList, Country)
- [x] Data Sources 섹션 추가 (countries 페이지)
- [x] Compare 페이지 상단 국가 프로필 링크
- [x] Canonical URLs 전 페이지

### 추가 SEO 수정
- [x] Google Search Console 인증 메타태그
- [x] 🌍 파비콘 (SVG emoji)
- [x] Vercel Production Branch → main 수정
- [x] Vercel Framework → nextjs 수정
- [x] 미사용 db.ts 제거 (Vercel 빌드 에러 원인)
- [x] Sitemap: /contact, /privacy, /terms 추가 (86 → 94 URLs)
- [x] Sitemap: lastModified 고정일 (new Date() → BUILD_DATE)
- [x] 도메인 전환: wheretopayless.tax → wheretopaylesstax.com (10개 파일)
- [x] 검색: API route → 클라이언트 사이드 필터링 전환
- [x] Twitter Cards: country, compare 페이지 추가
- [x] Search Console sitemap 제출

### Google SEO 스타터 가이드 기반 개선
- [x] Data Sources 외부 링크 추가 (OECD, Tax Foundation, World Bank, PwC) — E-E-A-T
- [x] 외부 링크 rel="noopener noreferrer" 보안 속성
- [x] 404 페이지 검색바 추가 (이탈 방지)

---

## GSC 기반 SEO 최적화 (2026-02-21) — 완료

### GSC 데이터 분석
- [x] GSC API 연결 (서비스 계정 인증)
- [x] 검색어 성과 분석 (150개 쿼리, 90일)
- [x] 페이지별 성과 분석 (노출, 클릭, CTR, 순위)
- [x] 디바이스/국가별 분석
- [x] 검색어 클러스터 식별 (canada-vs-us, digital nomad, greece 등)

### CTR 최적화 타이틀 (GSC 고노출 페이지)
- [x] 비교 페이지 8개 맞춤 CTR 타이틀 (usa-vs-canada, italy-vs-portugal 등)
- [x] 국가 페이지 10개 맞춤 CTR 타이틀 (germany, malta, georgia, panama 등)
- [x] 모든 타이틀에 "2026" 연도 추가 (신선도 신호)
- [x] 메타 디스크립션 검색의도 매칭 (구체적 세율 수치 포함)

### FAQ 구조화 데이터 (리치 결과)
- [x] 국가 페이지 FAQPage JSON-LD (소득세, 법인세, VAT + 조건부 노마드비자/특별세제/자본이득세)
- [x] 비교 페이지 FAQPage JSON-LD (세금 비교 3개 FAQ)

### 사이트맵 우선순위 조정
- [x] GSC 고노출 국가 10개 → priority 0.9 + weekly 크롤링
- [x] GSC 고노출 비교 7개 → priority 0.85 + weekly 크롤링

### 비교 페이지 콘텐츠 강화
- [x] SEO 인트로 문단 추가 (세율 요약 + 승자 표시)
- [x] H1에 "2026" 연도 추가

---

## v1.1 (Week 3-4) — 미착수

### 데이터 확장
- [ ] 50개국 추가 (총 100개국)
- [ ] 법인세 데이터 강화 (세부 항목)

### 기능
- [ ] 동적 비교 페이지 (`/compare?a=X&b=Y` — 임의 국가 조합)
- [ ] 비교 페이지 SEO 강화 (더 많은 long-tail 키워드)

### 수익화
- [ ] Google AdSense 실제 연동 (placeholder 교체)
- [ ] 제휴 마케팅 링크 삽입 (세금 관련 서비스)

### 분석/마케팅
- [ ] Plausible Analytics 연동
- [ ] 뉴스레터 실제 연동 (Buttondown)
- [ ] Reddit GTM 실행 (r/digitalnomad, r/expats)
- [ ] Twitter/X 계정 생성 + 콘텐츠

---

## v1.2 (Month 2) — 미착수

- [ ] 상위 10개국 세금 계산기
- [ ] 노마드 가이드 확장 (20개 추가)

---

## v2.0 (Month 3-4) — 미착수

- [ ] Tax Destination Finder (필터 기반 추천)
- [ ] 유저 계정 + 저장 기능
- [ ] 다국어 지원 (스페인어, 독일어)
- [ ] Tax API (B2B)
- [ ] AI 세금 어드바이저 (mock → 실제)
