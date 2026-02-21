import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getComparisonSlugs,
  getComparisonBySlug,
  getRelatedComparisons,
  getRelatedGuides,
  getAllGuides,
  type CountryData,
} from "@/lib/data";
import { getTaxRateColorExplicit as getTaxRateColor } from "@/lib/utils";
import AdPlaceholder from "@/components/AdPlaceholder";
import TaxDisclaimer from "@/components/TaxDisclaimer";

// Generate static params for all 20 comparison slugs
export function generateStaticParams() {
  return getComparisonSlugs().map((slug) => ({ slug }));
}

// CTR-optimized titles for high-volume comparison queries (from GSC data)
const COMPARE_CTR_TITLES: Record<string, { title: string; description: string }> = {
  "usa-vs-canada": {
    title: "USA vs Canada Taxes 2026: Which Country Taxes You More?",
    description: "USA vs Canada tax showdown! Income tax: up to 37% vs 33%. Compare federal + state/provincial rates, capital gains, sales tax & more. See which country wins.",
  },
  "italy-vs-portugal": {
    title: "Italy vs Portugal Tax Rates 2026: Expat Tax Comparison",
    description: "Italy vs Portugal for expats: compare flat tax schemes, NHR program, income tax brackets & cost of living. Which Mediterranean country saves you more?",
  },
  "panama-vs-costa-rica": {
    title: "Panama vs Costa Rica Taxes 2026: Territorial Tax Showdown",
    description: "Panama's territorial tax vs Costa Rica's rates compared. Income tax, corporate tax, VAT & nomad visas side by side. Best Central American tax haven?",
  },
  "germany-vs-netherlands": {
    title: "Germany vs Netherlands Tax Rates 2026: Full Comparison",
    description: "Germany vs Netherlands taxes compared: income tax up to 45% vs 49.5%, but the 30% ruling changes everything. Corporate tax, VAT & expat benefits.",
  },
  "singapore-vs-hong-kong": {
    title: "Singapore vs Hong Kong Tax 2026: Asia's Top Tax Havens Compared",
    description: "Singapore vs Hong Kong: 22% vs 17% income tax, 0% capital gains in both. Which Asian financial hub offers better tax benefits for expats?",
  },
  "france-vs-spain": {
    title: "France vs Spain Tax Rates 2026: Expat Comparison Guide",
    description: "France vs Spain taxes: income tax up to 45% vs 47%, plus Beckham Law benefits. Compare VAT, social security & expat tax regimes side by side.",
  },
  "bulgaria-vs-romania": {
    title: "Bulgaria vs Romania Taxes 2026: EU's Lowest Tax Countries",
    description: "Bulgaria 10% flat tax vs Romania 10% income tax. Compare corporate rates, VAT, social security & cost of living in EU's most affordable countries.",
  },
  "japan-vs-south-korea": {
    title: "Japan vs South Korea Tax Rates 2026: East Asia Compared",
    description: "Japan vs South Korea taxes: income tax up to 45% vs 45%, but brackets differ. Compare corporate tax, consumption tax & expat benefits.",
  },
};

// SEO metadata
export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const comparison = getComparisonBySlug(params.slug);
  if (!comparison) {
    return { title: "Comparison Not Found" };
  }

  const { countryA, countryB } = comparison;
  const ctrOverride = COMPARE_CTR_TITLES[params.slug];

  const title = ctrOverride?.title
    ?? `${countryA.name} vs ${countryB.name} Tax Rates 2026: Full Comparison`;
  const description = ctrOverride?.description
    ?? `Compare taxes: ${countryA.name} vs ${countryB.name}. Income tax ${countryA.incomeTax.topRate}% vs ${countryB.incomeTax.topRate}%, corporate ${countryA.corporateTax.standardRate}% vs ${countryB.corporateTax.standardRate}%, VAT ${countryA.vat.standardRate}% vs ${countryB.vat.standardRate}%. Full 2026 breakdown.`;

  return {
    title,
    description,
    keywords: [
      `${countryA.name} vs ${countryB.name} taxes`,
      `${countryA.name} vs ${countryB.name} tax comparison`,
      `${countryA.name} tax rates 2026`,
      `${countryB.name} tax rates 2026`,
      `${countryA.name} vs ${countryB.name} income tax`,
      "tax comparison",
      "expat taxes",
    ],
    openGraph: {
      title: `${countryA.name} vs ${countryB.name} Tax Comparison 2026 | WhereToPayLessTax`,
      description: `Side-by-side tax comparison: ${countryA.name} (${countryA.flag}) vs ${countryB.name} (${countryB.flag}). Income, corporate, VAT & more.`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: `Income tax: ${countryA.incomeTax.topRate}% vs ${countryB.incomeTax.topRate}%. Corporate: ${countryA.corporateTax.standardRate}% vs ${countryB.corporateTax.standardRate}%. Full comparison.`,
    },
    alternates: {
      canonical: `https://wheretopaylesstax.com/compare/${params.slug}`,
    },
  };
}

function WinnerBadge() {
  return (
    <span className="inline-flex items-center gap-1 badge-success">
      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
      </svg>
      Lower
    </span>
  );
}

interface ComparisonRow {
  category: string;
  valueA: number;
  valueB: number;
  format?: "percent" | "number" | "boolean";
  noteA?: string;
  noteB?: string;
}

function ComparisonTable({
  countryA,
  countryB,
  rows,
}: {
  countryA: CountryData;
  countryB: CountryData;
  rows: ComparisonRow[];
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
      <table className="comparison-table">
        <thead>
          <tr>
            <th className="w-1/3">Category</th>
            <th className="w-1/3">
              <div className="flex items-center gap-2">
                <span className="text-lg">{countryA.flag}</span>
                {countryA.name}
              </div>
            </th>
            <th className="w-1/3">
              <div className="flex items-center gap-2">
                <span className="text-lg">{countryB.flag}</span>
                {countryB.name}
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const winner =
              row.valueA < row.valueB
                ? "A"
                : row.valueB < row.valueA
                ? "B"
                : "tie";
            const suffix = row.format === "percent" || !row.format ? "%" : "";

            return (
              <tr key={row.category}>
                <td className="font-medium text-slate-700 dark:text-slate-200">
                  {row.category}
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-heading font-bold ${getTaxRateColor(row.valueA)}`}
                    >
                      {row.valueA}
                      {suffix}
                    </span>
                    {winner === "A" && <WinnerBadge />}
                  </div>
                  {row.noteA && (
                    <p className="text-xs text-slate-400 mt-0.5">
                      {row.noteA}
                    </p>
                  )}
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-heading font-bold ${getTaxRateColor(row.valueB)}`}
                    >
                      {row.valueB}
                      {suffix}
                    </span>
                    {winner === "B" && <WinnerBadge />}
                  </div>
                  {row.noteB && (
                    <p className="text-xs text-slate-400 mt-0.5">
                      {row.noteB}
                    </p>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function WinnerSummary({
  countryA,
  countryB,
  rows,
}: {
  countryA: CountryData;
  countryB: CountryData;
  rows: ComparisonRow[];
}) {
  let winsA = 0;
  let winsB = 0;
  let ties = 0;

  for (const row of rows) {
    if (row.valueA < row.valueB) winsA++;
    else if (row.valueB < row.valueA) winsB++;
    else ties++;
  }

  const overall =
    winsA > winsB ? countryA : winsB > winsA ? countryB : null;

  return (
    <div className="card bg-gradient-to-br from-primary-50 to-white dark:from-primary-950/20 dark:to-slate-800 border-primary-200 dark:border-primary-800">
      <h3 className="font-heading font-bold text-lg mb-3 text-center">
        Summary
      </h3>
      <div className="grid grid-cols-3 gap-4 text-center mb-4">
        <div>
          <p className="text-2xl font-heading font-bold text-primary-600">
            {winsA}
          </p>
          <p className="text-xs text-slate-500">
            {countryA.flag} {countryA.name}
          </p>
        </div>
        <div>
          <p className="text-2xl font-heading font-bold text-slate-400">
            {ties}
          </p>
          <p className="text-xs text-slate-500">Ties</p>
        </div>
        <div>
          <p className="text-2xl font-heading font-bold text-primary-600">
            {winsB}
          </p>
          <p className="text-xs text-slate-500">
            {countryB.flag} {countryB.name}
          </p>
        </div>
      </div>
      {overall ? (
        <div className="text-center p-3 bg-success-50 dark:bg-success-700/10 rounded-md">
          <p className="text-sm font-medium text-success-700 dark:text-success-500">
            {overall.flag} {overall.name} has lower tax rates in more
            categories
          </p>
        </div>
      ) : (
        <div className="text-center p-3 bg-slate-50 dark:bg-slate-700/50 rounded-md">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
            Both countries are evenly matched across tax categories
          </p>
        </div>
      )}
    </div>
  );
}

export default function CompareDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const comparison = getComparisonBySlug(params.slug);
  if (!comparison) {
    notFound();
  }

  const { countryA, countryB } = comparison;

  const taxRows: ComparisonRow[] = [
    {
      category: "Top Income Tax Rate",
      valueA: countryA.incomeTax.topRate,
      valueB: countryB.incomeTax.topRate,
    },
    {
      category: "Corporate Tax Rate",
      valueA: countryA.corporateTax.standardRate,
      valueB: countryB.corporateTax.standardRate,
    },
    {
      category: "VAT / Sales Tax",
      valueA: countryA.vat.standardRate,
      valueB: countryB.vat.standardRate,
    },
    {
      category: "Capital Gains Tax",
      valueA: countryA.capitalGainsTax.rate,
      valueB: countryB.capitalGainsTax.rate,
    },
    {
      category: "Employee Social Security",
      valueA: countryA.socialSecurity.employeeRate,
      valueB: countryB.socialSecurity.employeeRate,
    },
    {
      category: "Employer Social Security",
      valueA: countryA.socialSecurity.employerRate,
      valueB: countryB.socialSecurity.employerRate,
    },
    {
      category: "Self-Employed Social Security",
      valueA: countryA.socialSecurity.selfEmployedRate,
      valueB: countryB.socialSecurity.selfEmployedRate,
    },
  ];

  const livingRows: ComparisonRow[] = [
    {
      category: "Cost of Living Index",
      valueA: countryA.costOfLivingIndex,
      valueB: countryB.costOfLivingIndex,
      format: "number",
    },
    {
      category: "Quality of Life Index",
      valueA: countryA.qualityOfLifeIndex,
      valueB: countryB.qualityOfLifeIndex,
      format: "number",
    },
    {
      category: "Tax Treaties",
      valueA: countryA.taxTreaties,
      valueB: countryB.taxTreaties,
      format: "number",
    },
  ];

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://wheretopaylesstax.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Compare",
        item: "https://wheretopaylesstax.com/compare",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${countryA.name} vs ${countryB.name}`,
        item: `https://wheretopaylesstax.com/compare/${params.slug}`,
      },
    ],
  };

  // Determine tax winner for intro text
  let taxWinsA = 0;
  let taxWinsB = 0;
  for (const row of taxRows) {
    if (row.valueA < row.valueB) taxWinsA++;
    else if (row.valueB < row.valueA) taxWinsB++;
  }
  const overallWinner = taxWinsA > taxWinsB ? countryA.name : taxWinsB > taxWinsA ? countryB.name : null;

  // FAQ structured data for compare pages
  const compareFaqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Which has lower taxes, ${countryA.name} or ${countryB.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: overallWinner
            ? `${overallWinner} has lower tax rates in more categories. ${countryA.name} has a top income tax of ${countryA.incomeTax.topRate}% vs ${countryB.name}'s ${countryB.incomeTax.topRate}%, corporate tax of ${countryA.corporateTax.standardRate}% vs ${countryB.corporateTax.standardRate}%, and VAT of ${countryA.vat.standardRate}% vs ${countryB.vat.standardRate}%.`
            : `${countryA.name} and ${countryB.name} are evenly matched across tax categories. Income tax: ${countryA.incomeTax.topRate}% vs ${countryB.incomeTax.topRate}%. Corporate: ${countryA.corporateTax.standardRate}% vs ${countryB.corporateTax.standardRate}%. VAT: ${countryA.vat.standardRate}% vs ${countryB.vat.standardRate}%.`,
        },
      },
      {
        "@type": "Question",
        name: `What is the income tax rate in ${countryA.name} vs ${countryB.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${countryA.name} has a top income tax rate of ${countryA.incomeTax.topRate}%, while ${countryB.name} has ${countryB.incomeTax.topRate}%. ${countryA.incomeTax.topRate < countryB.incomeTax.topRate ? countryA.name : countryB.name} has the lower rate.`,
        },
      },
      {
        "@type": "Question",
        name: `What is the corporate tax rate in ${countryA.name} vs ${countryB.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${countryA.name}'s corporate tax rate is ${countryA.corporateTax.standardRate}%, compared to ${countryB.name}'s ${countryB.corporateTax.standardRate}%. ${countryA.corporateTax.standardRate < countryB.corporateTax.standardRate ? countryA.name : countryB.name} offers lower corporate taxation.`,
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(compareFaqJsonLd) }}
      />

      {/* Header */}
      <section className="bg-gradient-to-b from-primary-50 to-white dark:from-slate-800 dark:to-slate-900 border-b border-slate-200 dark:border-slate-700">
        <div className="page-container py-10 md:py-14">
          {/* Breadcrumb */}
          <nav className="mb-4 text-sm" aria-label="Breadcrumb">
            <ol className="flex items-center gap-1.5 text-slate-500">
              <li>
                <Link href="/" className="hover:text-primary-600 no-underline text-slate-500">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/compare" className="hover:text-primary-600 no-underline text-slate-500">
                  Compare
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-slate-800 dark:text-slate-200 font-medium">
                {countryA.name} vs {countryB.name}
              </li>
            </ol>
          </nav>

          {/* Title */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            <div className="text-center">
              <span className="text-5xl mb-2 block" aria-hidden="true">
                {countryA.flag}
              </span>
              <h2 className="font-heading font-bold text-xl">
                {countryA.name}
              </h2>
              <span className="badge-neutral mt-1">{countryA.region}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-[2px] bg-slate-300 dark:bg-slate-600" />
              <span className="font-heading font-bold text-xl text-slate-400 uppercase">
                VS
              </span>
              <div className="w-12 h-[2px] bg-slate-300 dark:bg-slate-600" />
            </div>
            <div className="text-center">
              <span className="text-5xl mb-2 block" aria-hidden="true">
                {countryB.flag}
              </span>
              <h2 className="font-heading font-bold text-xl">
                {countryB.name}
              </h2>
              <span className="badge-neutral mt-1">{countryB.region}</span>
            </div>
          </div>

          <h1 className="sr-only">
            {countryA.name} vs {countryB.name} Tax Comparison 2026
          </h1>
        </div>
      </section>

      <div className="page-container py-8 md:py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* SEO intro paragraph */}
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-center max-w-2xl mx-auto">
            Comparing tax rates between {countryA.name} and {countryB.name} for 2026.
            {" "}{countryA.name} has a top income tax rate of {countryA.incomeTax.topRate}% vs {countryB.name}&apos;s {countryB.incomeTax.topRate}%,
            corporate tax of {countryA.corporateTax.standardRate}% vs {countryB.corporateTax.standardRate}%,
            and VAT of {countryA.vat.standardRate}% vs {countryB.vat.standardRate}%.
            {overallWinner && ` Overall, ${overallWinner} offers lower tax rates in more categories.`}
          </p>

          {/* Country Profile Links */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={`/countries/${countryA.slug}`}
              className="inline-flex items-center gap-2 text-sm no-underline text-primary-600 hover:text-primary-700 font-medium"
            >
              {countryA.flag} View {countryA.name} full profile &rarr;
            </Link>
            <Link
              href={`/countries/${countryB.slug}`}
              className="inline-flex items-center gap-2 text-sm no-underline text-primary-600 hover:text-primary-700 font-medium"
            >
              {countryB.flag} View {countryB.name} full profile &rarr;
            </Link>
          </div>

          {/* Winner Summary */}
          <WinnerSummary
            countryA={countryA}
            countryB={countryB}
            rows={taxRows}
          />

          {/* Tax Rates Comparison */}
          <section>
            <h2 className="text-xl font-heading font-bold mb-4">
              Tax Rates Comparison
            </h2>
            <ComparisonTable
              countryA={countryA}
              countryB={countryB}
              rows={taxRows}
            />
          </section>

          {/* Ad */}
          <div className="flex justify-center">
            <AdPlaceholder size="leaderboard" />
          </div>

          {/* Living Indicators */}
          <section>
            <h2 className="text-xl font-heading font-bold mb-4">
              Living Indicators
            </h2>
            <ComparisonTable
              countryA={countryA}
              countryB={countryB}
              rows={livingRows}
            />
          </section>

          {/* Income Tax Brackets Side-by-Side */}
          <section>
            <h2 className="text-xl font-heading font-bold mb-4">
              Income Tax Brackets
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[countryA, countryB].map((country) => (
                <div key={country.slug} className="card">
                  <h3 className="font-heading font-semibold mb-3 flex items-center gap-2">
                    <span className="text-xl" aria-hidden="true">
                      {country.flag}
                    </span>
                    {country.name}
                  </h3>
                  <div className="space-y-1.5">
                    {country.incomeTax.brackets.map((bracket, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-slate-500 font-mono text-xs">
                          {bracket.min.toLocaleString()}
                          {bracket.max !== null
                            ? ` - ${bracket.max.toLocaleString()}`
                            : "+"}
                        </span>
                        <span
                          className={`font-heading font-bold ${getTaxRateColor(bracket.rate)}`}
                        >
                          {bracket.rate}%
                        </span>
                      </div>
                    ))}
                  </div>
                  {country.incomeTax.notes && (
                    <p className="text-xs text-slate-400 mt-2 italic">
                      {country.incomeTax.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Special Regimes */}
          {(countryA.specialRegimes.length > 0 ||
            countryB.specialRegimes.length > 0) && (
            <section>
              <h2 className="text-xl font-heading font-bold mb-4">
                Special Tax Regimes
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[countryA, countryB].map((country) => (
                  <div key={country.slug} className="space-y-3">
                    <h3 className="font-heading font-semibold flex items-center gap-2">
                      <span className="text-xl" aria-hidden="true">
                        {country.flag}
                      </span>
                      {country.name}
                    </h3>
                    {country.specialRegimes.length > 0 ? (
                      country.specialRegimes.map((regime, i) => (
                        <div key={i} className="card text-sm">
                          <p className="font-semibold text-primary-600 dark:text-primary-400 mb-1">
                            {regime.name}
                          </p>
                          <p className="text-slate-500 text-xs">
                            {regime.description}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-slate-400 italic">
                        No special tax regimes available.
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Digital Nomad Visa */}
          <section>
            <h2 className="text-xl font-heading font-bold mb-4">
              Digital Nomad Visa
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[countryA, countryB].map((country) => (
                <div key={country.slug} className="card">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl" aria-hidden="true">
                      {country.flag}
                    </span>
                    <span className="font-heading font-semibold">
                      {country.name}
                    </span>
                    {country.digitalNomadVisa ? (
                      <span className="badge-success ml-auto">Available</span>
                    ) : (
                      <span className="badge-neutral ml-auto">
                        Not Available
                      </span>
                    )}
                  </div>
                  {country.digitalNomadVisaDetails && (
                    <p className="text-sm text-slate-500">
                      {country.digitalNomadVisaDetails}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Slug-specific deep-dive content for high-value comparisons */}
          <ComparisonDeepDive slug={params.slug} countryA={countryA} countryB={countryB} />

          {/* Ad */}
          <div className="flex justify-center">
            <AdPlaceholder size="rectangle" />
          </div>

          {/* Related Comparisons & Guides */}
          <RelatedLinks countryASlug={countryA.slug} countryBSlug={countryB.slug} currentSlug={params.slug} />

          {/* Disclaimer */}
          <TaxDisclaimer />

          {/* Last Updated */}
          <div className="text-center text-xs text-slate-400">
            <p>
              Data last updated: {countryA.name} ({countryA.lastUpdated}) &middot;{" "}
              {countryB.name} ({countryB.lastUpdated})
            </p>
          </div>

          {/* View country details links */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={`/countries/${countryA.slug}`}
              className="btn-outline btn-md no-underline text-slate-700 hover:text-primary-600 text-center"
            >
              {countryA.flag} View {countryA.name} Details
            </Link>
            <Link
              href={`/countries/${countryB.slug}`}
              className="btn-outline btn-md no-underline text-slate-700 hover:text-primary-600 text-center"
            >
              {countryB.flag} View {countryB.name} Details
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

// Deep-dive content for high-value comparisons (improves rankings for thin pages)
const COMPARISON_DEEP_CONTENT: Record<string, { heading: string; paragraphs: string[] }> = {
  "usa-vs-canada": {
    heading: "USA vs Canada Tax System: Key Differences Explained",
    paragraphs: [
      "The United States and Canada both use progressive federal income tax systems, but the similarities end there. The US federal income tax tops out at 37% (for income over $609,350 in 2026), while Canada's federal rate reaches 33% (for income over CAD $235,675). However, both countries add state/provincial taxes on top, which can dramatically change the picture.",
      "In the US, state income tax ranges from 0% (in states like Texas, Florida, and Nevada) to 13.3% (California). Canada's provincial taxes range from 4% (Nunavut) to 21% (Nova Scotia's top bracket). This means an American in Texas could pay a combined top rate of 37%, while a Canadian in Nova Scotia faces up to 54%.",
      "Capital gains treatment differs significantly. The US taxes long-term capital gains (assets held over 1 year) at preferential rates of 0%, 15%, or 20% depending on income. Canada includes only 50% of capital gains in taxable income (effectively halving the rate), but recent changes in 2024 increased the inclusion rate to 66.7% for gains over CAD $250,000.",
      "For self-employed workers and freelancers, the US imposes a 15.3% self-employment tax (Social Security + Medicare), while Canada's CPP contribution rate for self-employed is 11.9% (2026). Both countries tax worldwide income for their residents, and the US uniquely taxes citizens abroad. Americans living in Canada can use the Foreign Tax Credit or Foreign Earned Income Exclusion to avoid double taxation.",
      "Sales tax comparison: the US has no federal sales tax but states charge 0-10.25%, while Canada has a federal GST of 5% plus provincial sales taxes (HST) reaching up to 15% combined in some provinces. For businesses, Canada's lower corporate tax rate (combined federal/provincial average of ~26.5%) is competitive against the US flat 21% federal rate.",
    ],
  },
};

function ComparisonDeepDive({ slug, countryA, countryB }: { slug: string; countryA: CountryData; countryB: CountryData }) {
  const content = COMPARISON_DEEP_CONTENT[slug];
  if (!content) return null;

  return (
    <section>
      <h2 className="text-xl font-heading font-bold mb-4">
        {content.heading}
      </h2>
      <div className="space-y-4">
        {content.paragraphs.map((p, i) => (
          <p key={i} className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
            {p}
          </p>
        ))}
      </div>
    </section>
  );
}

// Related comparisons and guides for internal linking
function RelatedLinks({ countryASlug, countryBSlug, currentSlug }: { countryASlug: string; countryBSlug: string; currentSlug: string }) {
  const relatedA = getRelatedComparisons(countryASlug).filter(p => p.slug !== currentSlug);
  const relatedB = getRelatedComparisons(countryBSlug).filter(p => p.slug !== currentSlug && !relatedA.find(r => r.slug === p.slug));
  const allRelated = [...relatedA, ...relatedB].slice(0, 4);

  const guidesA = getRelatedGuides(countryASlug);
  const guidesB = getRelatedGuides(countryBSlug).filter(g => !guidesA.find(ga => ga.slug === g.slug));
  const allGuides = [...guidesA, ...guidesB].slice(0, 3);

  if (allRelated.length === 0 && allGuides.length === 0) return null;

  return (
    <section>
      <h2 className="text-xl font-heading font-bold mb-4">
        Related Comparisons &amp; Guides
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {allRelated.length > 0 && (
          <div>
            <h3 className="text-sm font-heading font-semibold text-slate-500 uppercase tracking-wider mb-3">More Comparisons</h3>
            <ul className="space-y-2">
              {allRelated.map((pair) => (
                <li key={pair.slug}>
                  <Link
                    href={`/compare/${pair.slug}`}
                    className="text-sm text-primary-600 dark:text-primary-400 hover:underline no-underline font-medium"
                  >
                    {pair.countryA.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())} vs {pair.countryB.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())} Tax Comparison
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        {allGuides.length > 0 && (
          <div>
            <h3 className="text-sm font-heading font-semibold text-slate-500 uppercase tracking-wider mb-3">Tax Guides</h3>
            <ul className="space-y-2">
              {allGuides.map((guide) => (
                <li key={guide.slug}>
                  <Link
                    href={`/guides/${guide.slug}`}
                    className="text-sm text-primary-600 dark:text-primary-400 hover:underline no-underline font-medium"
                  >
                    {guide.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
