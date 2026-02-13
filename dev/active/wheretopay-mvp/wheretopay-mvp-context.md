# WhereToPayLessTax MVP Context

## 핵심 파일

### 데이터
- `src/data/countries.json` — 50개국 세금 데이터 (메인 데이터소스)
- `src/data/guides.json` — 15개 가이드 콘텐츠
- `src/lib/data.ts` — 타입 정의 + 데이터 접근 함수 (CountryData, GuideData 등)
- `src/lib/utils.ts` — 유틸리티 (getTaxRateColor 등)

### 페이지 (App Router)
- `src/app/page.tsx` — 홈페이지 (Hero, 비교 카드, 리전 탭, 뉴스레터)
- `src/app/countries/page.tsx` — 국가 목록
- `src/app/countries/[slug]/page.tsx` — 국가 상세 (SSG, 50개)
- `src/app/compare/page.tsx` — 비교 목록
- `src/app/compare/[slug]/page.tsx` — 비교 상세 (SSG, 20개)
- `src/app/rankings/page.tsx` — 랭킹 테이블
- `src/app/guides/page.tsx` — 가이드 목록
- `src/app/guides/[slug]/page.tsx` — 가이드 상세 (SSG, 15개)
- `src/app/about/page.tsx` — 소개
- `src/app/contact/page.tsx` — 연락처
- `src/app/privacy/page.tsx` — 개인정보 정책
- `src/app/terms/page.tsx` — 이용약관
- `src/app/not-found.tsx` — 404
- `src/app/layout.tsx` — 루트 레이아웃

### 컴포넌트
- `src/components/Header.tsx` — 네비게이션 헤더
- `src/components/Footer.tsx` — 풋터
- `src/components/HomeSearchBar.tsx` — 홈 검색바 (client, 클라이언트 사이드 필터링)
- `src/components/NewsletterForm.tsx` — 뉴스레터 폼 (client component)
- `src/components/RegionTabs.tsx` — 리전별 탭 (client component)
- `src/components/CountriesGrid.tsx` — 국가 그리드
- `src/components/RankingsTable.tsx` — 랭킹 테이블 (client component)
- `src/components/AdPlaceholder.tsx` — 광고 placeholder (invisible div, data-ad-slot)
- `src/components/TaxDisclaimer.tsx` — 공유 면책조항 (amber 스타일)

### SEO
- `src/app/sitemap.ts` — 사이트맵 (94 URLs, 고정 BUILD_DATE)
- `src/app/robots.ts` — robots.txt
- `src/app/opengraph-image.tsx` — OG 이미지 생성 (Edge runtime)

### API
- `src/app/api/search/route.ts` — 검색 API (존재하나 미사용, 검색은 클라이언트 사이드로 전환됨)

### 설정
- `vercel.json` — Vercel 배포 설정 (framework: nextjs)
- `tailwind.config.ts` — Tailwind 설정
- `public/favicon.svg` — 🌍 이모지 파비콘

## 아키텍처 결정사항
1. **JSON 데이터 방식 채택**: DB 대신 `countries.json` + `guides.json`으로 빌드 타임 SSG → 성능 최적화
2. **Prisma 제거됨**: `src/lib/db.ts` 삭제 (Vercel 빌드 에러 원인이었음)
3. **서버 컴포넌트 우선**: `'use client'`는 검색바, 뉴스레터폼, 리전탭, 랭킹테이블만
4. **20개 하드코딩 비교**: `POPULAR_COMPARISONS` 배열로 인기 비교 20쌍 정의 (동적 비교는 v1.1)
5. **AdSense placeholder**: invisible div + `data-ad-slot` 속성 (AdSense 승인 후 교체)
6. **클라이언트 사이드 검색**: API route 대신 `countries.json` import로 직접 필터링 (안정성)
7. **도메인**: `wheretopaylesstax.com` (2026-02-13 구매, Vercel 연결 완료)

## 배포
- **Vercel**: `jaychalling-1013s-projects/wheretopaylesstax`
- **Production URL**: https://wheretopaylesstax.com
- **Production Branch**: `main` (master에서 변경됨)
- **Framework**: Next.js (Vercel 설정에서 Other → nextjs로 수정됨)
- **Node.js**: 24.x
- **자동 배포**: main push → Production 배포 (33초)

## 빌드 출력 (2026-02-13)
- 총 100개 정적 페이지 (home, countries×51, compare×21, guides×16, rankings, about, contact, privacy, terms, 404)
- First Load JS: ~96-99KB
- Static (○) + SSG (●) + Dynamic (ƒ) 혼합

## SEO 현황 (2026-02-13 완료)
- **Google Search Console**: 인증 완료 + sitemap 제출
- **Sitemap**: 94 URLs (static 9 + country 50 + comparison 20 + guide 15)
- **Canonical URLs**: 전 페이지 적용
- **JSON-LD**: Organization, WebSite+SearchAction, BreadcrumbList, Country, Article
- **Twitter Cards**: 전 페이지 `summary_large_image`
- **OG Tags**: 전 페이지 적용
- **robots.txt**: /api/, /_next/ 차단
- **TaxDisclaimer**: countries, compare, guides 페이지에 면책조항
- **Data Sources**: countries 페이지에 출처 + 외부 링크 (OECD, Tax Foundation, World Bank, PwC)
- **외부 링크 보안**: 전부 `rel="noopener noreferrer"` 적용
- **404 페이지**: 검색바 + 홈/국가 링크 (이탈 방지)

## 현재 상태
- **MVP 구현 완료** (2026-02-11~12)
- **SEO/품질 개선 완료** (2026-02-13) — 8건 품질 수정 + 도메인 + 서치콘솔
- Production 배포 정상

## 다음 단계 (v1.1 후보)
1. 100개국 확장 (현재 50개 → 100개)
2. 동적 비교 페이지 (`/compare?a=X&b=Y`)
3. 실제 AdSense 연동
4. Plausible Analytics 연동
5. 뉴스레터 실제 연동 (Buttondown)
6. 법인세 데이터 강화
7. Reddit/Twitter GTM 실행
