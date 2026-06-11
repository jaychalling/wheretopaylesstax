import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getComparisonSlugs,
  getComparisonBySlug,
  getRelatedComparisons,
  getRelatedGuides,
  type CountryData,
} from "@/lib/data";
import { getTaxRateColorExplicit as getTaxRateColor } from "@/lib/utils";
import AdPlaceholder from "@/components/AdPlaceholder";
import AffiliateSection from "@/components/AffiliateSection";
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
      images: [
        {
          url: `/compare/${params.slug}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${countryA.name} vs ${countryB.name} Tax Comparison 2026`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: `Income tax: ${countryA.incomeTax.topRate}% vs ${countryB.incomeTax.topRate}%. Corporate: ${countryA.corporateTax.standardRate}% vs ${countryB.corporateTax.standardRate}%. Full comparison.`,
      images: [`/compare/${params.slug}/opengraph-image`],
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
          <ComparisonDeepDive slug={params.slug} />

          {/* Ad */}
          <div className="flex justify-center">
            <AdPlaceholder size="rectangle" />
          </div>

          {/* Affiliate tools */}
          <AffiliateSection />

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
  "germany-vs-netherlands": {
    heading: "Germany vs Netherlands Tax System: What Expats Need to Know",
    paragraphs: [
      "Germany and the Netherlands are two of Europe's largest economies, but their tax systems differ in ways that matter enormously for expats, freelancers, and businesses. Germany uses a progressive income tax with rates from 14% to 45%, plus a 5.5% solidarity surcharge on tax owed. The Netherlands also uses progressive rates, reaching 49.5% on income above EUR 75,518. At first glance, the Netherlands appears more expensive, but the picture shifts dramatically when you factor in special expat regimes.",
      "The Netherlands' 30% Ruling is a game-changer for skilled expats. Qualifying employees recruited from abroad receive 30% of their gross salary tax-free for up to 5 years (reduced from the original 8 years). This effectively lowers the top marginal rate from 49.5% to about 34.65%. Germany has no equivalent broad expat incentive, making the Netherlands significantly more attractive for international talent in their first years.",
      "Corporate tax also diverges. Germany's effective corporate rate is approximately 30% when combining the 15% federal rate, 5.5% solidarity surcharge, and 14% average municipal trade tax (Gewerbesteuer). The Netherlands charges 19% on profits up to EUR 200,000 and 25.8% above that. For small and medium businesses, the Netherlands' lower rate on the first EUR 200,000 makes it more competitive.",
      "Social security contributions are another major factor. In Germany, employees pay roughly 20% of gross salary for health insurance, pension, unemployment, and long-term care, with employers matching. In the Netherlands, employee contributions are lower (about 27.65% employer-side), and the system integrates with the income tax through a combined levy on the first two brackets. Self-employed individuals face very different regimes: German freelancers (Freiberufler) can opt out of some social insurance, while Dutch ZZP-ers have more flexibility but less mandatory coverage.",
      "For digital nomads and remote workers, neither country is ideal from a pure tax perspective, but both offer strong infrastructure and quality of life. Germany's Blue Card program provides a pathway for skilled workers, while the Netherlands' startup visa and DAFT treaty (for Americans) offer entrepreneurial routes. VAT rates are close: Germany at 19% and the Netherlands at 21%, both with reduced rates on essentials.",
    ],
  },
  "japan-vs-south-korea": {
    heading: "Japan vs South Korea Tax Comparison: Living and Working in East Asia",
    paragraphs: [
      "Japan and South Korea share similar top income tax rates of 45%, but the journey to that top bracket is very different. Japan applies national income tax (5-45%) plus a flat 10% resident tax (prefectural and municipal), bringing the effective top rate to about 55%. South Korea's top rate of 45% applies only above KRW 1 billion (roughly $750,000), with a local income tax surcharge of 10% of the national rate, making the effective top rate around 49.5%. For most expats earning moderate incomes, South Korea is noticeably cheaper.",
      "Corporate taxation shows a clear winner. Japan's combined effective corporate tax rate is approximately 29.7% (national 23.2% plus local enterprise and inhabitant taxes). South Korea charges 9-24% in a progressive structure, with 9% on the first KRW 200 million of profit and 24% on income over KRW 300 billion. For startups and small businesses, South Korea's 9% initial rate is dramatically more attractive than Japan's flat ~30%.",
      "Both countries have consumption taxes: Japan's consumption tax is 10% (8% on food and non-alcoholic beverages), while South Korea's VAT is a flat 10%. Capital gains taxation differs for foreign investors. Japan taxes capital gains on securities at a flat 20.315% (income + resident tax). South Korea recently introduced capital gains tax on domestic stock holdings exceeding KRW 1 billion (delayed to 2027 for most investors), while foreign investors pay 22% on Korean stock gains or 11% on the sales price, whichever is less.",
      "Social security is a significant cost in both countries. Japan's employees contribute about 15% of salary (health insurance, pension, employment insurance), with employers matching. South Korea's total employee contribution is about 9.4% (National Pension 4.5%, Health Insurance 3.5%, Employment Insurance 0.9%, Long-term Care 0.5%), also with employer matching. Japan's higher social contributions make the total employment cost steeper.",
      "For expats, South Korea offers a flat 19% tax option for foreign workers for up to 5 years (recently extended to 20 years), making it extremely competitive for well-paid professionals. Japan has no equivalent expat tax benefit. Both countries have extensive tax treaty networks (Japan: 84 treaties, South Korea: 93), and both tax worldwide income for residents. Quality of life is excellent in both, with South Korea offering lower cost of living in most comparisons.",
    ],
  },
  "panama-vs-costa-rica": {
    heading: "Panama vs Costa Rica: Central America's Top Tax Destinations Compared",
    paragraphs: [
      "Panama and Costa Rica are both territorial tax countries, meaning they only tax income sourced within their borders. Foreign-sourced income is completely exempt in both nations, making them natural choices for remote workers and retirees. However, the similarities mask important differences in tax rates, residency programs, and overall cost of doing business.",
      "Panama's income tax rates run from 0% to 25% on locally-sourced income, with the first $11,000 (PAB) exempt. Corporate tax is a flat 25%. Costa Rica's individual rates range from 0% to 25% as well, but with narrower brackets. Costa Rica also introduced a capital gains tax in 2023 at 15% on local asset sales, while Panama has no general capital gains tax on securities (only 10% on real estate gains). This makes Panama more attractive for investors with local holdings.",
      "The Friendly Nations Visa is Panama's standout immigration program: citizens of 50+ countries can obtain permanent residency by establishing economic ties (opening a bank account with $5,000, forming a company, or getting employed). The process takes 3-6 months and grants immediate work authorization. Costa Rica offers the Rentista Visa (requiring $2,500/month income for 2 years) and the Pensionado Visa ($1,000/month pension), but the process is longer (6-12 months) and residency is initially temporary.",
      "Cost of living tilts in Costa Rica's favor outside of Panama City. While Panama City offers world-class infrastructure with higher costs (rent $800-1,500/month for a nice apartment), Costa Rica's Central Valley (San Jose, Escazu, Heredia) offers similar quality at $600-1,200/month with better access to nature and outdoor activities. Panama uses the US dollar, eliminating currency risk, while Costa Rica's colon fluctuates but has been relatively stable. Healthcare is comparable: both have good private hospitals in capital areas, and Costa Rica's public CAJA system is renowned for its universal coverage.",
      "For businesses, Panama's Free Trade Zones and the Panama Pacifico special economic zone offer additional incentives including tax holidays and simplified customs. The Panama Canal economy generates significant service-sector opportunities. Costa Rica has positioned itself as a tech hub, with companies like Intel, Amazon, and HP operating there, drawn by an educated workforce and political stability. Both countries have no tax treaties to speak of, which limits treaty planning but also means no exchange of tax information under most bilateral agreements.",
    ],
  },
  "singapore-vs-hong-kong": {
    heading: "Singapore vs Hong Kong: Asia's Two Premier Low-Tax Hubs Compared",
    paragraphs: [
      "Singapore and Hong Kong are perennial rivals for the title of Asia's most tax-friendly financial center, and as of 2026 both remain remarkably light-touch by global standards. Neither levies capital gains tax, and both apply broadly territorial principles. Hong Kong's salaries tax tops out at 17% on income above HKD 200,000, with an alternative flat standard rate of 15% on net income that effectively caps the burden for high earners. Singapore's progressive system reaches 24%, but only on income above SGD 1 million; the first SGD 20,000 is tax-free and income in the SGD 80,000-120,000 band is taxed at just 11.5%.",
      "For most income levels, Hong Kong generally comes out slightly ahead on headline rates. It also has no VAT or sales tax at all, while Singapore's GST rose to 9% in 2024. On the corporate side the gap narrows: Hong Kong's two-tiered profits tax charges 8.25% on the first HKD 2 million of profits and 16.5% thereafter, while Singapore's 17% headline rate is softened by partial exemptions (75% exemption on the first SGD 10,000 and 50% on the next SGD 190,000), which generally favors small companies in both cities.",
      "Mandatory contributions differ sharply. Hong Kong's MPF requires just 5% from employee and employer each, capped at HKD 1,500 per month, which is one of the lightest retirement levies anywhere. Singapore's CPF rates are far higher (around 20% employee and 17% employer for those covered), although they fund housing and healthcare as well as retirement. Freelancers generally face lighter mandatory contributions in Hong Kong, while self-employed persons in Singapore mainly contribute to Medisave.",
      "Neither city offers a digital nomad visa as of 2026, so residence typically runs through employment or investment routes such as Singapore's Global Investor Programme. Singapore's roughly 90 tax treaties (versus Hong Kong's 45) and its Not Ordinarily Resident concepts generally make it the stronger base for internationally structured businesses, while Hong Kong appeals to high earners focused purely on rate. Both score high on cost of living (85 vs 80 index), so the decision often comes down to where your clients, employer, and lifestyle preferences sit.",
    ],
  },
  "portugal-vs-spain": {
    heading: "Portugal vs Spain: Iberian Tax Systems for Expats Compared",
    paragraphs: [
      "Portugal and Spain attract many of the same expats, but their tax systems reward different profiles. Both are firmly progressive: Portugal's rates run from 14.5% to 48% (the top rate applies above EUR 78,834, plus a solidarity surcharge of 2.5% over EUR 80,000 and 5% over EUR 250,000), while Spain's combined state and regional rates run from 19% to 47%, with the top rate kicking in only above EUR 300,000. Portugal's brackets climb quickly — income over EUR 38,632 already faces 43.5% — whereas Spain holds at 37% up to EUR 60,000, so middle-to-upper earners on standard rules generally pay somewhat less in Spain.",
      "Special regimes can flip that conclusion. Spain's Beckham Law offers qualifying new residents a flat 24% on Spanish-source income up to EUR 600,000 for six years, and it remains one of Europe's most generous broad expat regimes as of 2026. Portugal replaced its famous NHR with the more targeted NHR 2.0 (Scientific Research Incentive), a 20% flat rate limited to qualified professionals in scientific research and innovation. If you qualify for either regime, your effective rate changes dramatically; if you qualify for neither, the standard brackets above apply.",
      "Freelancers face a meaningful social security gap. Portuguese self-employed workers pay 21.4% on 70% of declared income, while Spanish autonomos contribute around 30.6% under a progressive base system. Capital gains also differ: Portugal applies a flat 28% on investment gains, while Spain uses a progressive 19-28% scale that only reaches 28% above EUR 300,000 of gains — generally friendlier to modest investors.",
      "Both countries offer digital nomad visas (Portugal's D8 requires about EUR 3,510/month, Spain's roughly EUR 2,520/month), and Portugal additionally runs a Golden Visa residency-by-investment route. Portugal's lower cost of living index (46 vs 50) tends to favor retirees and remote workers on fixed incomes, while corporate founders may note Portugal's 21% corporate rate (17% on the first EUR 25,000 for SMEs) against Spain's 25% standard rate, softened by a 15% rate for newly created companies in their first two years.",
    ],
  },
  "uae-vs-singapore": {
    heading: "UAE vs Singapore: Zero Tax vs Low Tax for Global Professionals",
    paragraphs: [
      "On headline numbers this comparison looks one-sided: the UAE levies no personal income tax at all, while Singapore's progressive rates reach 24% above SGD 1 million. Yet Singapore's effective burden is gentler than the top rate suggests — the first SGD 20,000 is tax-free and a professional in the SGD 80,000-120,000 band pays around 11.5% marginally. Neither country taxes capital gains, and expats in the UAE are generally exempt from social security contributions entirely, whereas Singapore's CPF system takes roughly 20% from covered employees (with 17% from employers).",
      "Corporate taxation tells a more nuanced story as of 2026. The UAE introduced a 9% corporate tax in 2023, applying to taxable income above AED 375,000, with qualifying free zone income still potentially taxed at 0%. Singapore charges a 17% headline rate, reduced in practice by partial exemptions on the first SGD 200,000 of income. For small and free-zone-eligible businesses the UAE generally remains cheaper; for substance-heavy regional headquarters, Singapore's roughly 90 tax treaties and deep financial ecosystem often justify the difference (the UAE itself has built an even larger network of around 115 treaties).",
      "Consumption taxes are low in both: UAE VAT is 5%, Singapore GST is 9% as of 2024. Cost of living diverges more sharply — Singapore's index of 85 versus the UAE's 62 means day-to-day expenses, and especially housing, generally stretch further in Dubai or Abu Dhabi than in Singapore.",
      "Residency paths differ in character. The UAE offers Golden Visas of 5 or 10 years for investors and specialized talent, plus a Virtual Working Programme for remote workers earning at least USD 3,500/month. Singapore has no digital nomad visa; long-term stays typically run through employment passes or the Global Investor Programme. Pure tax minimizers — high earners, crypto and equity investors, freelancers billing internationally — generally favor the UAE. Those prioritizing rule-of-law depth, schooling, and Asia-Pacific market access often accept Singapore's modest taxes as the price of its quality of life (index 82 vs 74).",
    ],
  },
  "uk-vs-ireland": {
    heading: "UK vs Ireland Tax Comparison: Neighbours with Diverging Systems",
    paragraphs: [
      "The UK and Ireland share a language, a labour market tradition, and a land border — but not a tax philosophy. The UK's income tax reaches 45% above GBP 125,140, with a 0% personal allowance on the first GBP 12,570 that tapers away above GBP 100,000, creating elevated effective marginal rates in that band. Ireland looks simpler with just two bands — 20% and then 40% above EUR 42,000 — but the Universal Social Charge (0.5-8%) and PRSI (4%) stack on top, so Ireland's true combined top rate generally lands in the same neighbourhood as the UK's despite the lower headline figure.",
      "The bigger difference is where high rates start. An Irish earner hits the 40% band at EUR 42,000, far earlier than the UK's 40% threshold of GBP 50,270. Middle-income professionals therefore generally keep more of each additional pound in the UK than each additional euro in Ireland. Self-employed workers see the reverse on contributions: Irish PRSI Class S is 4%, against the UK's Class 4 system at around 9%.",
      "Business owners and investors face starkly different incentives. Ireland's corporate tax is 15% (12.5% still applying below the OECD Pillar Two threshold), versus the UK's 25% (19% for profits under GBP 50,000) — a structural reason so many multinationals book profits in Dublin. Ireland's Knowledge Development Box can bring qualifying IP income to an effective 6.25%. Capital gains flip the advantage: Ireland charges a flat 33%, while UK rates are 10-20% (plus 8% on residential property), generally making the UK the friendlier base for investors.",
      "For internationally mobile arrivals, the UK's reformed regime (from April 2025) offers a 4-year foreign income and gains window for new residents, replacing the old non-dom remittance basis, while Ireland's SARP provides 30% income tax relief on employment income over EUR 75,000 for assignees. With 130 tax treaties to Ireland's 76 and a lower 40% threshold, the UK generally suits employees and investors; Ireland remains the corporate and IP champion. Both carry high costs of living (75 vs 73), so neither wins on lifestyle arithmetic alone.",
    ],
  },
  "thailand-vs-malaysia": {
    heading: "Thailand vs Malaysia: Southeast Asia's Expat Tax Rivals",
    paragraphs: [
      "Thailand and Malaysia offer two of Asia's lowest costs of living (indexes of 35 and 33 respectively), but their tax treatment of foreign income has diverged notably. Malaysia operates a territorial system in which foreign-source income is generally exempt for tax residents (a policy under review as of 2026). Thailand moved the other way: from 2024, foreign income remitted to Thailand is taxable in the year of remittance, closing the loophole that once let residents bring in last year's earnings tax-free. For remote workers paid from abroad, Malaysia's regime is generally the more forgiving by default.",
      "Domestic rate structures are comparable. Thailand's personal income tax runs from 0% (first THB 150,000) to 35% above THB 5 million; Malaysia's runs from 0% to 30% above MYR 2 million, with a very gradual climb — income between MYR 70,000 and 100,000 faces just 19%. Consumption taxes are mild in both: Thailand's VAT is 7% (temporarily reduced), while Malaysia has no VAT at all, using a 5-10% sales tax and an 8% service tax instead. Malaysia also levies no capital gains tax on securities (property falls under RPGT), whereas Thailand generally taxes gains as ordinary income.",
      "Thailand's trump card is the Long-Term Resident (LTR) visa: a 10-year visa with a 17% flat tax on employment income for qualifying professionals — typically requiring USD 80,000+ annual income, or USD 40,000+ with a master's degree — plus foreign-income exemptions for wealthy pensioners and global citizens. Malaysia counters with the DE Rantau digital nomad pass (income of at least USD 24,000/year) and the MM2H long-stay programme, which has long attracted retirees.",
      "Profile by profile: high-earning remote employees generally do best on Thailand's LTR 17% flat rate; ordinary freelancers and online business owners often prefer Malaysia's territorial exemption and absence of CGT; and small companies compare Thailand's SME ladder (0% on the first THB 300,000, then 15%) against Malaysia's 15% on the first MYR 150,000 for qualifying SMEs, with standard rates of 20% and 24% respectively. Both countries maintain around 61-75 tax treaties, and both reward careful residency planning more than most destinations.",
    ],
  },
  "estonia-vs-portugal": {
    heading: "Estonia vs Portugal: Flat Tax Simplicity vs Atlantic Lifestyle",
    paragraphs: [
      "Estonia and Portugal appear together on many digital nomad shortlists, yet they could hardly be more different fiscally. Estonia taxes personal income at a flat 20%, with a basic exemption of up to EUR 7,848 that phases out above EUR 14,400. Portugal's progressive scale runs from 14.5% to 48%, hitting 43.5% already at EUR 38,632 and adding solidarity surcharges above EUR 80,000. At low incomes the two are roughly comparable; from middle incomes upward, Estonia's flat 20% generally leaves substantially more in your pocket.",
      "Estonia's most famous feature is corporate: companies pay 0% on retained and reinvested profits, with the 20% charge applying only when profits are distributed (14% for regular dividend distributions). Combined with the e-Residency programme — which lets non-residents form and run an EU company online, though it confers no tax residency — this makes Estonia a magnet for bootstrapped startups. Portugal's corporate rate is 21%, with 17% on the first EUR 25,000 for SMEs, and its NHR 2.0 regime offers a 20% flat personal rate, but only for qualified professionals in scientific research and innovation.",
      "Social contributions invert the comparison for freelancers. Estonian self-employed persons bear social tax at 33.8%, since the employer-side burden falls on them directly, while Portuguese freelancers pay 21.4% on 70% of declared income — generally the lighter load. Capital gains favor Estonia (20% as ordinary income versus Portugal's flat 28%), and VAT is close (22% vs 23%).",
      "Both countries run digital nomad visas with nearly identical income floors (about EUR 3,504/month for Estonia, EUR 3,510/month for Portugal's D8), and Portugal adds a Golden Visa route toward EU citizenship. Lifestyle metrics lean Portuguese: a quality of life index of 71 versus 64, a famously mild climate, and a similar cost of living (both around 46-50). As a rule of thumb for 2026: founders reinvesting profits and high-earning solo consultants generally favor Estonia; retirees, families, and anyone optimizing for lifestyle per euro generally favor Portugal.",
    ],
  },
  "switzerland-vs-germany": {
    heading: "Switzerland vs Germany: Alpine Tax Competition Explained",
    paragraphs: [
      "Germany and Switzerland share a border and a language, but Swiss tax bills are generally a fraction of German ones. Germany's progressive income tax runs from 14% to 45% (plus a 5.5% solidarity surcharge on the tax of high earners). Switzerland's federal tax tops out at just 13.2%, with cantonal and municipal taxes adding roughly 10-35 percentage points depending on location — total burdens of about 20-45%. In low-tax cantons like Zug or Schwyz, a high earner may pay around half of what they would owe in Germany; in high-tax cantons the gap narrows considerably.",
      "Investors see the starkest contrast. Switzerland levies no capital gains tax on private movable assets — share portfolios generally grow untaxed — while Germany applies a flat 26.375% (Abgeltungssteuer including solidarity surcharge) to investment gains. Social insurance is equally lopsided: German employees pay around 20.3% of gross salary with employers adding 20.8%, and German self-employed can face the full ~40% themselves. Swiss mandatory contributions run near 6.4% each for employee and employer (about 10% for the self-employed), though mandatory occupational pensions and private health insurance must be budgeted separately.",
      "Companies follow the same pattern. Germany's effective corporate rate is roughly 30% once the 15% federal tax, solidarity surcharge, and ~14% average trade tax are combined. Swiss effective rates range from about 12% to 22% by canton, around 14.9% in the lower-tax locations. VAT is 19% in Germany against Switzerland's 8.1% — the lowest in Europe. Switzerland also offers lump-sum taxation (forfait fiscal) in most cantons, taxing wealthy foreigners on living expenses rather than income.",
      "The catch is cost: Switzerland's cost of living index of 131 dwarfs Germany's 65, and Swiss salaries price that in. Neither country offers a digital nomad visa as of 2026. Broadly speaking, high earners, investors, and self-employed professionals generally come out far ahead in Switzerland, while average families may find Germany's lower prices, extensive social insurance, and free education offset its heavier tax wedge. Both maintain large treaty networks (around 108 for Switzerland, 96 for Germany).",
    ],
  },
  "australia-vs-new-zealand": {
    heading: "Australia vs New Zealand: Trans-Tasman Tax Comparison",
    paragraphs: [
      "Australia and New Zealand make migration between them easy, which makes their tax differences unusually actionable. Australia exempts the first AUD 18,200 entirely, then climbs to 45% above AUD 190,000, with a 2% Medicare levy bringing the effective top rate to about 47% (2024-25 rates after the Stage 3 tax cuts). New Zealand has no tax-free threshold — taxation starts at 10.5% from the first dollar — but its top rate is a lower 39%, applying above NZD 180,000, plus an ACC levy of roughly 1.6%.",
      "The headline structural difference is capital gains. New Zealand has no general capital gains tax (only a bright-line test on residential property resold within two years), while Australia taxes gains at marginal rates with a 50% discount for assets held over 12 months. For investors building wealth outside property speculation, New Zealand is generally the friendlier jurisdiction. New arrivals get a further boost: New Zealand's Transitional Tax Resident rules exempt most foreign income for four years, a regime Australia does not match.",
      "Payroll mechanics differ too. Australian employers must pay an 11.5% Superannuation Guarantee (legislated to reach 12%), with no separate employee social security contribution. New Zealand's KiwiSaver is voluntary for employees (3-10%) with a 3% employer minimum. Consumption tax favors Australia: GST is 10% with food, health, and education GST-free, versus New Zealand's flat 15% GST on most goods and services. Corporate rates are 30% in Australia (25% for entities under AUD 50 million turnover) and a flat 28% in New Zealand.",
      "Choosing between them generally comes down to profile. Middle-income employees often do better in Australia thanks to the tax-free threshold and the 30% band stretching to AUD 135,000. Investors, returning expats with offshore portfolios, and the recently retired generally do better in New Zealand with its absent CGT and four-year foreign income exemption. Quality of life and cost of living are nearly identical (78/73 for Australia, 77/72 for New Zealand), so tax can legitimately be the tiebreaker.",
    ],
  },
  "malta-vs-cyprus": {
    heading: "Malta vs Cyprus: Mediterranean Tax Planning Hubs Compared",
    paragraphs: [
      "Malta and Cyprus are the EU's two island specialists in internationally mobile money, and both pair 35% top personal rates with mechanisms that few residents actually pay in full. The thresholds differ meaningfully: Cyprus exempts the first EUR 19,500 of income entirely, while Malta's 0% band ends at EUR 9,100 — at low and middle incomes Cyprus is generally the lighter system. Both reach 35% above EUR 60,000.",
      "Corporate structures are where each shines differently. Malta's nominal 35% corporate rate converts, through its full imputation system and 6/7 shareholder refund, into an effective rate of about 5% — among the lowest effective rates in the EU. Cyprus charges a straightforward 12.5%, with an IP Box that can bring qualifying intellectual property income to an effective 2.5%. Holding-company owners often model both; trading businesses with simpler needs generally find Cyprus's flat 12.5% easier to administer than Malta's refund mechanics.",
      "For individuals, Cyprus's non-dom regime is the standout: non-domiciled tax residents pay no Special Defence Contribution on dividends, interest, and rental income — effectively 0% on passive income — and new employees earning over EUR 55,000 can exempt 50% of remuneration for 17 years. Malta answers with the Global Residence Programme, a 15% flat tax on foreign income remitted to Malta with a EUR 15,000 minimum annual tax. Neither taxes capital gains on securities for the typical international resident (Cyprus carves out 20% on Cypriot real estate; Maltese residents are taxed on worldwide gains).",
      "Both islands court remote workers: Malta's Nomad Residence Permit requires about EUR 2,700/month, Cyprus's digital nomad visa about EUR 3,500/month. Social contributions are moderate in both (self-employed: 15% Malta, 15.6% Cyprus), and costs of living are similar (56 vs 52). As of 2026 the rough rule: dividend-living investors and well-paid employees generally favor Cyprus; company owners optimizing corporate effective rates, and English-speakers wanting an Anglophone EU base, generally favor Malta.",
    ],
  },
  "france-vs-spain": {
    heading: "France vs Spain: High-Tax Europe with Expat Escape Hatches",
    paragraphs: [
      "France and Spain both sit firmly in Europe's high-tax tier, but they distribute the burden differently. France's income tax runs from 0% to 45% (above EUR 177,106), with a 3% additional contribution on very high incomes; Spain's combined state-regional scale runs 19% to 47%, though the top rate only applies above EUR 300,000. Spain's bands bite earlier — 30% from EUR 20,200 and 37% from EUR 35,200 — while France's 30% band stretches from EUR 28,797 all the way to EUR 82,341. France's family quotient system, which divides taxable income by household shares, can also cut bills substantially for families with children, an advantage Spain does not replicate.",
      "Both countries offer expat regimes worth checking before any move. Spain's Beckham Law gives qualifying new residents a flat 24% on Spanish-source income up to EUR 600,000 for six years. France's impatriate regime can exempt 30-50% of compensation from income tax for employees transferred to France. Eligibility rules differ, but broadly: employees recruited from abroad have a credible route to materially lower taxation in either country.",
      "The self-employed face a wide gap. French social contributions are among Europe's heaviest — roughly 45% for the self-employed, with employers paying around 45% on top of salaries — while Spanish autonomos pay about 30.6% under a progressive base system. Freelancers and contractors therefore generally keep more in Spain. Investment income is taxed at a flat 30% in France (the PFU) versus Spain's progressive 19-28%, which favors smaller portfolios in Spain.",
      "Practicalities round out the picture as of 2026: Spain runs a digital nomad visa (income around EUR 2,520/month), while France has no equivalent. Corporate rates are 25% in both, with France offering 15% on the first EUR 42,500 for SMEs and Spain 15% for newly created companies in their first two years. Spain's lower cost of living (50 vs 67) and nomad infrastructure generally suit freelancers and remote workers; France tends to reward salaried families and those who value its extensive public services and 121-treaty network.",
    ],
  },
  "uae-vs-switzerland": {
    heading: "UAE vs Switzerland: Where Do the Wealthy Pay Less?",
    paragraphs: [
      "This is a comparison between zero tax and negotiated tax. The UAE levies no personal income tax whatsoever, while Switzerland's combined federal, cantonal, and municipal burden ranges from roughly 20% to 45% depending on canton. Yet Switzerland offers wealthy foreigners a unique alternative: lump-sum taxation (forfait fiscal), available in most cantons, which assesses tax on living expenses rather than actual worldwide income — historically making seven-figure earners' effective rates far lower than headline scales suggest.",
      "Neither country taxes capital gains on private investments (Switzerland exempts private movable assets; real estate gains are taxed cantonally), so the rivalry plays out elsewhere. Corporate tax: the UAE's 9% applies above AED 375,000, with qualifying free zone income potentially at 0%, versus Swiss effective rates of about 12-22% by canton. VAT: 5% in the UAE against Switzerland's 8.1%, itself the lowest in Europe. Social security: expats in the UAE are exempt entirely, while Swiss employment carries modest 6.4% contributions each side plus mandatory pension and health insurance arrangements.",
      "Residency access differs more than rates. The UAE's Golden Visa grants 5-10 year residency to investors, entrepreneurs, and specialized talent, and its Virtual Working Programme admits remote workers earning USD 3,500/month — making relocation genuinely fast. Swiss residence for non-EU nationals generally requires employment, significant investment, or a lump-sum arrangement, and the bar is high. Both countries hold strong treaty networks (around 115 for the UAE, 108 for Switzerland).",
      "The trade-offs are lifestyle-shaped. Switzerland's quality of life index (84) leads the UAE's (74), but so does its cost of living (131 vs 62) — Dubai is generally far cheaper than Geneva or Zurich for an equivalent standard. As of 2026, pure tax minimizers — traders, founders post-exit, high-earning remote professionals — generally find the UAE unbeatable. Those wanting European stability, alpine surroundings, and bankable institutional depth often accept Switzerland's modest negotiated burden as the cost of admission.",
    ],
  },
  "bulgaria-vs-romania": {
    heading: "Bulgaria vs Romania: The EU's 10% Flat Tax Twins",
    paragraphs: [
      "Bulgaria and Romania both tax personal income at a flat 10% — the lowest headline rates in the European Union — so choosing between them comes down to everything around that number. Bulgaria extends the 10% to corporate profits as well, the EU's lowest corporate rate alongside Hungary. Romania charges 16% corporate tax, but counters with its microenterprise regime: companies with revenue under EUR 500,000 can pay just 1% of turnover (3% without employees), which for service businesses with healthy margins is generally one of the best small-company deals in Europe.",
      "Social contributions are where the twins diverge most. Romania loads the employee: 35% of gross salary (25% pension plus 10% health), with employers adding only 2.25%. Bulgaria splits more evenly — 13.78% employee and 18.92% employer. A salaried professional comparing net pay on the same gross will generally fare better in Bulgaria; a business owner paying themselves through a Romanian microenterprise structure may reach a very low total burden despite the contribution rates. Self-employed rates are 26.8% in Bulgaria and 25% in Romania.",
      "Capital gains are taxed at 10% in both countries, with one notable Bulgarian sweetener: gains on shares traded on EU/EEA regulated markets are exempt. VAT is 20% in Bulgaria and 19% in Romania, each with reduced rates for hospitality and essentials. Romania offers a digital nomad visa (income of at least three times the Romanian average gross salary); Bulgaria has no dedicated nomad visa as of 2026, so non-EU remote workers typically need other residence grounds.",
      "Costs of living are among Europe's lowest in both (indexes of 34 and 36), with growing tech scenes in Sofia, Bucharest, and Cluj. As a general guide: employees and stock-market investors lean Bulgaria; freelancers and agency owners who can operate through a microenterprise lean Romania; and EU citizens — who can settle in either freely — often simply pick the city they prefer, since at these rates the tax difference rarely outweighs lifestyle fit. Treaty networks are solid for the region (68 for Bulgaria, 86 for Romania).",
    ],
  },
  "colombia-vs-mexico": {
    heading: "Colombia vs Mexico: Latin America's Expat Tax Choice",
    paragraphs: [
      "Colombia and Mexico anchor Latin America's two biggest digital nomad scenes, and both pair very low living costs (indexes of 26 and 30) with tax systems that punish the unprepared. Colombia's progressive income tax, built on UVT units, reaches 39% at the top; Mexico's reaches 35%. At moderate incomes Mexico's lower-middle brackets (6.4% and 10.88% bands) are generally gentler than Colombia's, which jumps to 28% and 33% relatively quickly once the 0% band is exhausted.",
      "Mexico's standout feature is RESICO, the simplified trust regime: individuals with annual income under 3.5 million MXN can pay roughly 1-2.5% of income as tax — an extraordinarily low effective rate for freelancers and small service businesses who qualify. Colombia has no personal equivalent; its headline incentive is the free trade zone regime, which cuts corporate tax from a steep 35% to 20%. Mexico's corporate rate is 30%, plus 10% on profit distributions. For independent professionals, Mexico via RESICO is generally the clear winner; for export-oriented companies willing to locate in a zona franca, Colombia becomes competitive.",
      "Investment and consumption taxes are moderate in both. Colombia taxes occasional gains at 15% (dividends 10% for residents); Mexico taxes stock market gains at 10%. VAT is 19% in Colombia versus 16% in Mexico, with Mexico zero-rating food, medicines, and books. Social charges hit Colombian independents hard — around 28.5% for health, pension, and occupational risk — while Mexico's IMSS burden falls mostly on employers.",
      "Visa accessibility favors Colombia: its V-type digital nomad visa requires only about three times the Colombian minimum wage (roughly USD 975/month) and runs two years, one of the lowest bars anywhere. Mexico's temporary resident route requires demonstrating economic solvency but allows remote work. Treaty coverage diverges sharply — Mexico's 59 treaties versus Colombia's 16 — which matters for anyone with home-country income to shelter from double taxation. As of 2026, modest-income nomads often start in Colombia; established freelancers and anyone optimizing effective rates generally settle on Mexico.",
    ],
  },
  "usa-vs-uk": {
    heading: "USA vs UK Tax Comparison: Transatlantic Differences That Matter",
    paragraphs: [
      "The United States and the United Kingdom tax their residents through superficially similar progressive systems with very different mechanics. The US federal rate reaches 37% above $609,350, but states add anywhere from 0% (Texas, Florida, Nevada, and six others) to 13.3% (California). The UK reaches 45% above GBP 125,140, with the personal allowance tapering away above GBP 100,000 — a quirk that produces elevated effective marginal rates in that band. A high earner in a no-tax US state generally faces a meaningfully lower combined rate than a UK counterpart; a Californian generally does not.",
      "The structural divide is citizenship-based taxation: the US taxes its citizens on worldwide income wherever they live, requiring annual filings even from lifelong expats, with relief via the Foreign Earned Income Exclusion (around $126,500 as of the 2024 figure) and foreign tax credits. The UK taxes by residence, and its reform of the non-dom regime from April 2025 introduced a 4-year foreign income and gains window for new arrivals — generally a meaningful sweetener for internationally mobile high earners moving to London.",
      "Investors and the self-employed should compare carefully. US long-term capital gains rates are 0%, 15%, or 20% (plus 3.8% NIIT for high earners); UK rates are 10-20% with an extra 8% on residential property and a small annual exemption. American self-employment tax runs 15.3% (both halves of FICA), against the UK's lighter self-employed National Insurance around 9%. Employees pay 7.65% FICA in the US versus 8% Class 1 NI in the UK (dropping to 2% above the upper threshold), with UK employers paying 13.8%.",
      "Consumption and corporate taxes complete the picture: the US has no federal VAT (state sales taxes run 0-10.25%), while the UK charges 20% VAT with zero-rating on food, books, and children's clothing. Corporate tax is a flat 21% federally in the US versus the UK's 25% (19% under GBP 50,000). The UK's 130 tax treaties dwarf the US's 66. As of 2026, freelancers and new-arrival investors generally find the UK system kinder; high-salary employees who can choose a zero-tax state generally keep more in America.",
    ],
  },
  "canada-vs-australia": {
    heading: "Canada vs Australia: Commonwealth Tax Systems Head-to-Head",
    paragraphs: [
      "Canada and Australia compete for the same skilled migrants, and their top-end tax burdens are closer than their structures suggest. Canada's federal rates run 15% to 33%, but provinces add 4% to 25.75%, producing combined top rates from about 44.5% (Nunavut) to 54.8% (Nova Scotia). Australia's national scale reaches 45% above AUD 190,000, plus the 2% Medicare levy — an effective 47% with no state income taxes to layer on. A high earner's outcome in Canada therefore depends heavily on province; Alberta differs materially from Nova Scotia, while Australia is uniform nationwide.",
      "At lower incomes Australia is generally kinder: the first AUD 18,200 is tax-free and the 2024-25 Stage 3 cuts hold the 30% band all the way to AUD 135,000, while Canada's 15% federal rate starts from the first dollar (after credits) with provincial tax on top. Capital gains treatments rhyme: Canada includes 50% of gains in income (rising to a 66.7% inclusion rate for gains over CAD 250,000 from 2024), while Australia discounts gains by 50% for assets held over 12 months — both effectively halving the tax for typical long-term investors.",
      "Small business owners generally find Canada more generous: the federal small business rate of 9% on the first CAD 500,000 (combined rates around the mid-teens with provinces) undercuts Australia's 25% rate for entities under AUD 50 million turnover, and Canada's SR&ED programme offers 15-35% R&D tax credits. Australia's standard corporate rate is 30% versus Canada's combined average of roughly 26.5%. Payroll-wise, Canadians contribute to CPP/EI (about 7.2% employee, 14.4% self-employed), whereas Australia has no employee social security contribution at all — retirement is funded by the employer's 11.5% superannuation guarantee.",
      "Consumption taxes: Canada's 5% federal GST is supplemented by provincial taxes up to 15% HST (Alberta adds none), while Australia's 10% GST exempts food, health, and education. Quality of life and cost of living are nearly tied (Canada 76/68, Australia 78/73). As of 2026, incorporated consultants and R&D-heavy founders generally lean Canada (in the right province); salaried professionals and middle-income families generally keep more in Australia.",
    ],
  },
  "italy-vs-portugal": {
    heading: "Italy vs Portugal: Southern Europe's Battle for New Residents",
    paragraphs: [
      "Italy and Portugal both court foreign residents aggressively, but with different weapons. On standard rules, Italy's income tax runs 23% to 43%, with the top rate starting at just EUR 50,000 — plus regional surcharges of 1.23-3.33% and municipal surcharges up to 0.9%. Portugal's scale runs 14.5% to 48% (above EUR 78,834), with solidarity surcharges of 2.5% over EUR 80,000 and 5% over EUR 250,000. Italy taxes middle incomes harder and earlier; Portugal's top end is nominally higher but starts later.",
      "The special regimes define the real contest. Italy offers a EUR 100,000 lump-sum tax on all worldwide income for new residents (EUR 25,000 per family member) — a flat ticket that makes Italy extraordinarily attractive to high-net-worth individuals regardless of how much they earn abroad. For ordinary freelancers, Italy's Regime Forfettario applies a 15% flat tax (just 5% for the first five years of a new activity) on business income under its threshold, with simplified flat-rate expense deductions. Portugal's NHR 2.0 offers a 20% flat rate, but only for qualified professionals in scientific research and innovation, a far narrower gate than the original NHR.",
      "Outside the regimes, the numbers are close: capital gains 26% in Italy versus a flat 28% in Portugal; VAT 22% versus 23%; corporate tax around 27.9% effective in Italy (24% IRES plus 3.9% IRAP) against Portugal's 21% (17% on the first EUR 25,000 for SMEs). Social security for the self-employed runs 26.07% in Italy (Gestione Separata) versus Portugal's 21.4% applied to 70% of income — generally a lighter Portuguese load at equal earnings.",
      "Both countries now run digital nomad visas: Italy's (introduced 2024) requires about EUR 28,000 annual income; Portugal's D8 requires roughly EUR 3,510/month, and Portugal retains a Golden Visa path. Portugal's cost of living (index 46 versus Italy's 58) generally stretches a remote salary further. As of 2026 the broad pattern: wealthy individuals with large foreign income gravitate to Italy's lump-sum; eligible freelancers weigh Italy's 5-15% forfettario seriously; retirees and lifestyle movers without regime eligibility generally find Portugal cheaper to live in and slightly gentler on passive income planning.",
    ],
  },
};

function ComparisonDeepDive({ slug }: { slug: string }) {
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
