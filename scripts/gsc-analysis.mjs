/**
 * GSC (Google Search Console) Performance Analysis Script
 *
 * Usage:
 *   GSC_KEY_PATH=/path/to/key.json node scripts/gsc-analysis.mjs
 *   GSC_KEY_PATH=/path/to/key.json node scripts/gsc-analysis.mjs --days 30
 *
 * Environment:
 *   GSC_KEY_PATH  — Path to Google service account JSON key file (required)
 *   GSC_SITE_URL  — GSC property URL (default: https://wheretopaylesstax.com/)
 */
import { google } from "googleapis";
import fs from "fs";

const KEY_PATH = process.env.GSC_KEY_PATH;
if (!KEY_PATH) {
  console.error("Error: GSC_KEY_PATH environment variable is required.");
  console.error("Usage: GSC_KEY_PATH=/path/to/key.json node scripts/gsc-analysis.mjs");
  process.exit(1);
}
if (!fs.existsSync(KEY_PATH)) {
  console.error(`Error: Key file not found: ${KEY_PATH}`);
  process.exit(1);
}

const SITE_URL = process.env.GSC_SITE_URL || "https://wheretopaylesstax.com/";

// Parse --days argument (default: 90)
const daysArg = process.argv.indexOf("--days");
const DAYS = daysArg !== -1 ? parseInt(process.argv[daysArg + 1], 10) : 90;

const endDate = new Date();
endDate.setDate(endDate.getDate() - 3); // GSC data has ~3 day delay
const startDate = new Date(endDate);
startDate.setDate(startDate.getDate() - DAYS);

const formatDate = (d) => d.toISOString().split("T")[0];

async function getAuth() {
  const keyFile = JSON.parse(fs.readFileSync(KEY_PATH, "utf8"));
  const auth = new google.auth.GoogleAuth({
    credentials: keyFile,
    scopes: ["https://www.googleapis.com/auth/webmasters.readonly"],
  });
  return auth;
}

async function queryGSC(webmasters, siteUrl, params) {
  const res = await webmasters.searchanalytics.query({
    siteUrl,
    requestBody: {
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      ...params,
    },
  });
  return res.data.rows || [];
}

async function main() {
  const auth = await getAuth();
  const webmasters = google.webmasters({ version: "v3", auth });

  // Check which sites are available
  console.log("=== GSC 연결 확인 ===");
  try {
    const sites = await webmasters.sites.list();
    console.log("등록된 사이트:");
    (sites.data.siteEntry || []).forEach((s) => {
      console.log(`  - ${s.siteUrl} (${s.permissionLevel})`);
    });
  } catch (e) {
    console.log("사이트 목록 조회 실패:", e.message);
  }

  // 1. Top Queries by Clicks
  console.log("\n=== 1. 상위 검색어 (클릭 기준 Top 50) ===");
  const topQueries = await queryGSC(webmasters, SITE_URL, {
    dimensions: ["query"],
    rowLimit: 50,
    dataState: "final",
  });
  if (topQueries.length) {
    console.log(
      "순위 | 검색어 | 클릭 | 노출 | CTR | 평균순위"
    );
    console.log("-".repeat(90));
    topQueries.forEach((r, i) => {
      console.log(
        `${(i + 1).toString().padStart(3)} | ${r.keys[0].padEnd(45)} | ${String(r.clicks).padStart(5)} | ${String(r.impressions).padStart(7)} | ${(r.ctr * 100).toFixed(1).padStart(5)}% | ${r.position.toFixed(1).padStart(5)}`
      );
    });
  } else {
    console.log("데이터 없음");
  }

  // 2. Top Pages by Clicks
  console.log("\n=== 2. 상위 페이지 (클릭 기준 Top 30) ===");
  const topPages = await queryGSC(webmasters, SITE_URL, {
    dimensions: ["page"],
    rowLimit: 30,
    dataState: "final",
  });
  if (topPages.length) {
    console.log(
      "순위 | 페이지 URL | 클릭 | 노출 | CTR | 평균순위"
    );
    console.log("-".repeat(110));
    topPages.forEach((r, i) => {
      const url = r.keys[0].replace("https://wheretopaylesstax.com", "");
      console.log(
        `${(i + 1).toString().padStart(3)} | ${(url || "/").padEnd(55)} | ${String(r.clicks).padStart(5)} | ${String(r.impressions).padStart(7)} | ${(r.ctr * 100).toFixed(1).padStart(5)}% | ${r.position.toFixed(1).padStart(5)}`
      );
    });
  }

  // 3. CTR Opportunity: High impressions, low CTR
  console.log("\n=== 3. CTR 개선 기회 (노출 높지만 CTR 낮은 검색어) ===");
  const ctrOpportunity = await queryGSC(webmasters, SITE_URL, {
    dimensions: ["query"],
    rowLimit: 1000,
    dataState: "final",
  });
  const lowCTR = ctrOpportunity
    .filter((r) => r.impressions >= 10 && r.ctr < 0.03 && r.position <= 20)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 30);

  if (lowCTR.length) {
    console.log(
      "순위 | 검색어 | 클릭 | 노출 | CTR | 평균순위"
    );
    console.log("-".repeat(90));
    lowCTR.forEach((r, i) => {
      console.log(
        `${(i + 1).toString().padStart(3)} | ${r.keys[0].padEnd(45)} | ${String(r.clicks).padStart(5)} | ${String(r.impressions).padStart(7)} | ${(r.ctr * 100).toFixed(1).padStart(5)}% | ${r.position.toFixed(1).padStart(5)}`
      );
    });
  } else {
    console.log("해당 검색어 없음");
  }

  // 4. Position Opportunity: Queries ranked 4-20 (close to page 1 top)
  console.log("\n=== 4. 순위 개선 기회 (평균 4~20위, 개선 여지 큼) ===");
  const posOpportunity = ctrOpportunity
    .filter((r) => r.position >= 4 && r.position <= 20 && r.impressions >= 5)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 30);

  if (posOpportunity.length) {
    console.log(
      "순위 | 검색어 | 클릭 | 노출 | CTR | 평균순위"
    );
    console.log("-".repeat(90));
    posOpportunity.forEach((r, i) => {
      console.log(
        `${(i + 1).toString().padStart(3)} | ${r.keys[0].padEnd(45)} | ${String(r.clicks).padStart(5)} | ${String(r.impressions).padStart(7)} | ${(r.ctr * 100).toFixed(1).padStart(5)}% | ${r.position.toFixed(1).padStart(5)}`
      );
    });
  }

  // 5. Quick wins: Queries at position 5-15 with decent impressions
  console.log("\n=== 5. Quick Wins (5~15위, 노출 10+, 1페이지 상단 진입 가능) ===");
  const quickWins = ctrOpportunity
    .filter((r) => r.position >= 5 && r.position <= 15 && r.impressions >= 10)
    .sort((a, b) => {
      // Score: impressions * (1/position) - higher is better opportunity
      const scoreA = a.impressions / a.position;
      const scoreB = b.impressions / b.position;
      return scoreB - scoreA;
    })
    .slice(0, 20);

  if (quickWins.length) {
    console.log(
      "순위 | 검색어 | 클릭 | 노출 | CTR | 평균순위 | 기회점수"
    );
    console.log("-".repeat(100));
    quickWins.forEach((r, i) => {
      const score = (r.impressions / r.position).toFixed(1);
      console.log(
        `${(i + 1).toString().padStart(3)} | ${r.keys[0].padEnd(45)} | ${String(r.clicks).padStart(5)} | ${String(r.impressions).padStart(7)} | ${(r.ctr * 100).toFixed(1).padStart(5)}% | ${r.position.toFixed(1).padStart(5)} | ${score.padStart(7)}`
      );
    });
  }

  // 6. Page-Query matrix: which queries lead to which pages
  console.log("\n=== 6. 페이지별 상위 검색어 (Top 10 페이지) ===");
  const pageQuery = await queryGSC(webmasters, SITE_URL, {
    dimensions: ["page", "query"],
    rowLimit: 500,
    dataState: "final",
  });

  if (pageQuery.length) {
    // Group by page
    const pageMap = {};
    pageQuery.forEach((r) => {
      const page = r.keys[0].replace("https://wheretopaylesstax.com", "") || "/";
      if (!pageMap[page]) pageMap[page] = [];
      pageMap[page].push({
        query: r.keys[1],
        clicks: r.clicks,
        impressions: r.impressions,
        ctr: r.ctr,
        position: r.position,
      });
    });

    // Sort pages by total clicks
    const sortedPages = Object.entries(pageMap)
      .map(([page, queries]) => ({
        page,
        totalClicks: queries.reduce((s, q) => s + q.clicks, 0),
        totalImpressions: queries.reduce((s, q) => s + q.impressions, 0),
        queries: queries.sort((a, b) => b.clicks - a.clicks).slice(0, 5),
      }))
      .sort((a, b) => b.totalClicks - a.totalClicks)
      .slice(0, 10);

    sortedPages.forEach((p) => {
      console.log(
        `\n  ${p.page} (클릭: ${p.totalClicks}, 노출: ${p.totalImpressions})`
      );
      p.queries.forEach((q) => {
        console.log(
          `    - "${q.query}" | 클릭: ${q.clicks} | 노출: ${q.impressions} | CTR: ${(q.ctr * 100).toFixed(1)}% | 순위: ${q.position.toFixed(1)}`
        );
      });
    });
  }

  // 7. Device breakdown
  console.log("\n=== 7. 디바이스별 성과 ===");
  const deviceData = await queryGSC(webmasters, SITE_URL, {
    dimensions: ["device"],
    dataState: "final",
  });
  if (deviceData.length) {
    console.log("디바이스 | 클릭 | 노출 | CTR | 평균순위");
    console.log("-".repeat(60));
    deviceData.forEach((r) => {
      console.log(
        `${r.keys[0].padEnd(10)} | ${String(r.clicks).padStart(6)} | ${String(r.impressions).padStart(8)} | ${(r.ctr * 100).toFixed(1).padStart(5)}% | ${r.position.toFixed(1).padStart(5)}`
      );
    });
  }

  // 8. Country breakdown
  console.log("\n=== 8. 국가별 성과 (Top 15) ===");
  const countryData = await queryGSC(webmasters, SITE_URL, {
    dimensions: ["country"],
    rowLimit: 15,
    dataState: "final",
  });
  if (countryData.length) {
    console.log("국가코드 | 클릭 | 노출 | CTR | 평균순위");
    console.log("-".repeat(60));
    countryData.forEach((r) => {
      console.log(
        `${r.keys[0].padEnd(10)} | ${String(r.clicks).padStart(6)} | ${String(r.impressions).padStart(8)} | ${(r.ctr * 100).toFixed(1).padStart(5)}% | ${r.position.toFixed(1).padStart(5)}`
      );
    });
  }

  // 9. Date trend (weekly)
  console.log("\n=== 9. 주간 트렌드 ===");
  const dateData = await queryGSC(webmasters, SITE_URL, {
    dimensions: ["date"],
    dataState: "final",
  });
  if (dateData.length) {
    // Group by week
    const weeks = {};
    dateData.forEach((r) => {
      const d = new Date(r.keys[0]);
      const weekStart = new Date(d);
      weekStart.setDate(d.getDate() - d.getDay());
      const weekKey = formatDate(weekStart);
      if (!weeks[weekKey]) {
        weeks[weekKey] = { clicks: 0, impressions: 0, ctrSum: 0, posSum: 0, count: 0 };
      }
      weeks[weekKey].clicks += r.clicks;
      weeks[weekKey].impressions += r.impressions;
      weeks[weekKey].ctrSum += r.ctr;
      weeks[weekKey].posSum += r.position;
      weeks[weekKey].count++;
    });

    console.log("주 시작일 | 클릭 | 노출 | 평균CTR | 평균순위");
    console.log("-".repeat(60));
    Object.entries(weeks)
      .sort(([a], [b]) => a.localeCompare(b))
      .forEach(([week, data]) => {
        const avgCtr = data.impressions > 0 ? (data.clicks / data.impressions) * 100 : 0;
        const avgPos = data.posSum / data.count;
        console.log(
          `${week} | ${String(data.clicks).padStart(6)} | ${String(data.impressions).padStart(8)} | ${avgCtr.toFixed(1).padStart(6)}% | ${avgPos.toFixed(1).padStart(5)}`
        );
      });
  }

  // Summary stats
  console.log("\n=== 전체 요약 ===");
  const totalClicks = topQueries.reduce((s, r) => s + r.clicks, 0);
  const totalImpressions = topQueries.reduce((s, r) => s + r.impressions, 0);
  const allQueries = ctrOpportunity.length;
  console.log(`총 검색어 수: ${allQueries}`);
  console.log(`상위 50 검색어 클릭 합계: ${totalClicks}`);
  console.log(`상위 50 검색어 노출 합계: ${totalImpressions}`);
  console.log(`Quick Win 기회: ${quickWins.length}개`);
  console.log(`CTR 개선 대상: ${lowCTR.length}개`);
  console.log(`분석 기간: ${formatDate(startDate)} ~ ${formatDate(endDate)}`);
}

main().catch((e) => {
  console.error("Error:", e.message);
  if (e.response) {
    console.error("Response:", JSON.stringify(e.response.data, null, 2));
  }
  process.exit(1);
});
