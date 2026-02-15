import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllCountries,
  getCountryBySlug,
  getCountriesByRegion,
  getRelatedComparisons,
} from "@/lib/data";
import { getTaxRateColor } from "@/lib/utils";
import AdPlaceholder from "@/components/AdPlaceholder";
import TaxDisclaimer from "@/components/TaxDisclaimer";

// Generate static params for all 50 countries
export function generateStaticParams() {
  return getAllCountries().map((c) => ({ slug: c.slug }));
}

// SEO metadata
export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const country = getCountryBySlug(params.slug);
  if (!country) {
    return { title: "Country Not Found" };
  }

  // CTR-optimized titles for specific countries
  let title = `${country.name} Tax Guide - Income Tax, Corporate Tax & More`;
  let description = `Complete tax guide for ${country.name} (${country.flag}). Income tax up to ${country.incomeTax.topRate}%, corporate tax ${country.corporateTax.standardRate}%, VAT ${country.vat.standardRate}%. ${country.summary.slice(0, 120)}...`;
  
  if (country.slug === 'hong-kong') {
    title = `🏙️ Hong Kong Sales Tax 2026: 0% VAT Heaven or Trap?`;
    description = `Hong Kong has 0% sales tax/VAT! 🤯 But is it really tax paradise? Real costs: income tax up to ${country.incomeTax.topRate}%, living expenses. Expat truth revealed by locals.`;
  } else if (country.slug === 'greece') {
    title = `🇬🇷 Greece Income Tax 2026: 7% Flat Rate for Nomads!`;
    description = `Greece offers 7% flat tax for digital nomads! 🔥 Plus 50% income tax exemption for new residents. Island life + low taxes = perfection? See real costs & requirements.`;
  }

  return {
    title,
    description,
    keywords: [
      `${country.name} taxes`,
      `${country.name} income tax`,
      `${country.name} corporate tax`,
      `${country.name} VAT`,
      `expat tax ${country.name}`,
      `digital nomad ${country.name}`,
    ],
    openGraph: {
      title: `${country.name} Tax Guide | WhereToPayLessTax`,
      description: `Income tax ${country.incomeTax.topRate}%, Corporate tax ${country.corporateTax.standardRate}%, VAT ${country.vat.standardRate}%. Complete ${country.name} tax profile for expats and digital nomads.`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${country.name} Tax Guide | WhereToPayLessTax`,
      description: `Income tax ${country.incomeTax.topRate}%, Corporate tax ${country.corporateTax.standardRate}%, VAT ${country.vat.standardRate}%.`,
    },
    alternates: {
      canonical: `https://wheretopaylesstax.com/countries/${params.slug}`,
    },
  };
}

function formatCurrency(amount: number): string {
  return amount.toLocaleString("en-US");
}

function TaxMetricCard({
  label,
  rate,
  sublabel,
}: {
  label: string;
  rate: number;
  sublabel?: string;
}) {
  return (
    <div className="card text-center">
      <p className="text-sm text-slate-500 mb-1">{label}</p>
      <p className={getTaxRateColor(rate)}>{rate}%</p>
      {sublabel && (
        <p className="text-xs text-slate-400 mt-1">{sublabel}</p>
      )}
    </div>
  );
}

export default function CountryDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const country = getCountryBySlug(params.slug);
  if (!country) {
    notFound();
  }

  const relatedCountries = getCountriesByRegion(country.region)
    .filter((c) => c.slug !== country.slug)
    .slice(0, 5);
  const relatedComparisons = getRelatedComparisons(country.slug);

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
        name: "Countries",
        item: "https://wheretopaylesstax.com/countries",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: country.name,
        item: `https://wheretopaylesstax.com/countries/${country.slug}`,
      },
    ],
  };

  const countryJsonLd = {
    "@context": "https://schema.org",
    "@type": "Country",
    name: country.name,
    url: `https://wheretopaylesstax.com/countries/${country.slug}`,
    description: country.summary,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(countryJsonLd) }}
      />

      {/* Hero / Header */}
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
                <Link href="/countries" className="hover:text-primary-600 no-underline text-slate-500">
                  Countries
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-slate-800 dark:text-slate-200 font-medium">
                {country.name}
              </li>
            </ol>
          </nav>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl" aria-hidden="true">
                  {country.flag}
                </span>
                <h1 className="text-3xl md:text-4xl font-heading font-bold">
                  {country.name}
                </h1>
              </div>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className="badge-neutral">{country.region}</span>
                <span className="badge-neutral">{country.currency}</span>
                {country.digitalNomadVisa && (
                  <span className="badge-info">Digital Nomad Visa</span>
                )}
                <span className="badge-neutral">
                  {country.taxTreaties} Tax Treaties
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Link
                href="/compare"
                className="btn-primary btn-md no-underline text-slate-900 hover:text-slate-900"
              >
                Compare with...
              </Link>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
            <TaxMetricCard
              label="Top Income Tax"
              rate={country.incomeTax.topRate}
              sublabel="Marginal rate"
            />
            <TaxMetricCard
              label="Corporate Tax"
              rate={country.corporateTax.standardRate}
              sublabel="Standard rate"
            />
            <TaxMetricCard
              label="VAT / Sales Tax"
              rate={country.vat.standardRate}
              sublabel="Standard rate"
            />
            <TaxMetricCard
              label="Capital Gains"
              rate={country.capitalGainsTax.rate}
              sublabel="Standard rate"
            />
          </div>
        </div>
      </section>

      <div className="page-container py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Summary */}
            <section>
              <h2 className="text-xl font-heading font-bold mb-3">Overview</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {country.summary}
              </p>
            </section>

            {/* Income Tax Brackets */}
            <section>
              <h2 className="text-xl font-heading font-bold mb-3">
                Income Tax Brackets
              </h2>
              <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
                <table className="comparison-table">
                  <thead>
                    <tr>
                      <th>Income Range ({country.currency})</th>
                      <th>Tax Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {country.incomeTax.brackets.map((bracket, i) => (
                      <tr key={i}>
                        <td className="font-mono text-sm">
                          {formatCurrency(bracket.min)}
                          {bracket.max !== null
                            ? ` - ${formatCurrency(bracket.max)}`
                            : "+"}
                        </td>
                        <td>
                          <span
                            className={`font-heading font-bold ${getTaxRateColor(bracket.rate)}`}
                          >
                            {bracket.rate}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {country.incomeTax.notes && (
                <p className="text-sm text-slate-500 mt-2 italic">
                  {country.incomeTax.notes}
                </p>
              )}
            </section>

            {/* Corporate Tax */}
            <section>
              <h2 className="text-xl font-heading font-bold mb-3">
                Corporate Tax
              </h2>
              <div className="card">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Standard Rate</p>
                    <p className={getTaxRateColor(country.corporateTax.standardRate)}>
                      {country.corporateTax.standardRate}%
                    </p>
                  </div>
                  {country.corporateTax.smallBusinessRate !== undefined && (
                    <div>
                      <p className="text-sm text-slate-500 mb-1">
                        Small Business Rate
                      </p>
                      <p className={getTaxRateColor(country.corporateTax.smallBusinessRate)}>
                        {country.corporateTax.smallBusinessRate}%
                      </p>
                    </div>
                  )}
                </div>
                <p className="text-sm text-slate-500 mt-3">
                  {country.corporateTax.notes}
                </p>
              </div>
            </section>

            {/* VAT */}
            <section>
              <h2 className="text-xl font-heading font-bold mb-3">
                VAT / Sales Tax
              </h2>
              <div className="card">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Standard Rate</p>
                    <p className={getTaxRateColor(country.vat.standardRate)}>
                      {country.vat.standardRate}%
                    </p>
                  </div>
                  {country.vat.reducedRates.length > 0 && (
                    <div>
                      <p className="text-sm text-slate-500 mb-1">
                        Reduced Rates
                      </p>
                      <p className="font-heading font-bold text-slate-700 dark:text-slate-200">
                        {country.vat.reducedRates.join("%, ")}%
                      </p>
                    </div>
                  )}
                </div>
                <p className="text-sm text-slate-500 mt-3">
                  {country.vat.notes}
                </p>
              </div>
            </section>

            {/* Capital Gains Tax */}
            <section>
              <h2 className="text-xl font-heading font-bold mb-3">
                Capital Gains Tax
              </h2>
              <div className="card">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Standard Rate</p>
                    <p className={getTaxRateColor(country.capitalGainsTax.rate)}>
                      {country.capitalGainsTax.rate}%
                    </p>
                  </div>
                  {country.capitalGainsTax.longTermRate !== undefined && (
                    <div>
                      <p className="text-sm text-slate-500 mb-1">
                        Long-Term Rate
                      </p>
                      <p className={getTaxRateColor(country.capitalGainsTax.longTermRate)}>
                        {country.capitalGainsTax.longTermRate}%
                      </p>
                    </div>
                  )}
                </div>
                <p className="text-sm text-slate-500 mt-3">
                  {country.capitalGainsTax.notes}
                </p>
              </div>
            </section>

            {/* Social Security */}
            <section>
              <h2 className="text-xl font-heading font-bold mb-3">
                Social Security Contributions
              </h2>
              <div className="card">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Employee</p>
                    <p className="font-heading font-bold text-lg text-slate-800 dark:text-slate-100">
                      {country.socialSecurity.employeeRate}%
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Employer</p>
                    <p className="font-heading font-bold text-lg text-slate-800 dark:text-slate-100">
                      {country.socialSecurity.employerRate}%
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Self-Employed</p>
                    <p className="font-heading font-bold text-lg text-slate-800 dark:text-slate-100">
                      {country.socialSecurity.selfEmployedRate}%
                    </p>
                  </div>
                </div>
                <p className="text-sm text-slate-500 mt-3">
                  {country.socialSecurity.notes}
                </p>
              </div>
            </section>

            {/* Ad placement */}
            <div className="flex justify-center">
              <AdPlaceholder size="leaderboard" />
            </div>

            {/* Special Regimes */}
            {country.specialRegimes.length > 0 && (
              <section>
                <h2 className="text-xl font-heading font-bold mb-3">
                  Special Tax Regimes
                </h2>
                <div className="space-y-4">
                  {country.specialRegimes.map((regime, i) => (
                    <div key={i} className="card-highlighted">
                      <div className="flex items-start gap-3">
                        <div className="shrink-0 w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                          <svg className="w-4 h-4 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-heading font-semibold text-lg mb-1">
                            {regime.name}
                          </h3>
                          <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
                            {regime.description}
                          </p>
                          <p className="text-xs text-slate-500">
                            <span className="font-semibold">Eligibility:</span>{" "}
                            {regime.eligibility}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Digital Nomad Visa */}
            {country.digitalNomadVisa && country.digitalNomadVisaDetails && (
              <section>
                <h2 className="text-xl font-heading font-bold mb-3">
                  Digital Nomad Visa
                </h2>
                <div className="card bg-gradient-to-br from-primary-50 to-white dark:from-primary-950/20 dark:to-slate-800 border-primary-200 dark:border-primary-800">
                  <div className="flex items-start gap-3">
                    <span className="badge-info text-sm">Nomad Visa</span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-3">
                    {country.digitalNomadVisaDetails}
                  </p>
                </div>
              </section>
            )}

            {/* Pros & Cons */}
            <section>
              <h2 className="text-xl font-heading font-bold mb-3">
                Pros & Cons
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="card">
                  <h3 className="font-heading font-semibold text-success-600 dark:text-success-500 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Pros
                  </h3>
                  <ul className="space-y-2">
                    {country.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <svg className="w-4 h-4 text-success-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="card">
                  <h3 className="font-heading font-semibold text-danger-600 dark:text-danger-500 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                    Cons
                  </h3>
                  <ul className="space-y-2">
                    {country.cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <svg className="w-4 h-4 text-danger-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Cost of Living & Quality of Life */}
            <section>
              <h2 className="text-xl font-heading font-bold mb-3">
                Living Indicators
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="card">
                  <p className="text-sm text-slate-500 mb-2">
                    Cost of Living Index
                  </p>
                  <div className="flex items-end gap-2">
                    <span className="font-heading font-bold text-2xl text-slate-800 dark:text-slate-100">
                      {country.costOfLivingIndex}
                    </span>
                    <span className="text-xs text-slate-400 mb-1">/ 100</span>
                  </div>
                  <div className="mt-2 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary-500 rounded-full transition-all"
                      style={{ width: `${country.costOfLivingIndex}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    {country.costOfLivingIndex < 40
                      ? "Very affordable"
                      : country.costOfLivingIndex < 60
                      ? "Moderate"
                      : country.costOfLivingIndex < 80
                      ? "Above average"
                      : "Expensive"}
                  </p>
                </div>
                <div className="card">
                  <p className="text-sm text-slate-500 mb-2">
                    Quality of Life Index
                  </p>
                  <div className="flex items-end gap-2">
                    <span className="font-heading font-bold text-2xl text-slate-800 dark:text-slate-100">
                      {country.qualityOfLifeIndex}
                    </span>
                    <span className="text-xs text-slate-400 mb-1">/ 100</span>
                  </div>
                  <div className="mt-2 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-success-500 rounded-full transition-all"
                      style={{ width: `${country.qualityOfLifeIndex}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    {country.qualityOfLifeIndex >= 80
                      ? "Excellent"
                      : country.qualityOfLifeIndex >= 60
                      ? "Good"
                      : country.qualityOfLifeIndex >= 40
                      ? "Average"
                      : "Below average"}
                  </p>
                </div>
              </div>
            </section>

            {/* Best For */}
            <section>
              <h2 className="text-xl font-heading font-bold mb-3">Best For</h2>
              <div className="flex flex-wrap gap-2">
                {country.bestFor.map((item, i) => (
                  <span key={i} className="badge-info capitalize">
                    {item}
                  </span>
                ))}
              </div>
            </section>

            {/* Data Sources */}
            <section>
              <h2 className="text-xl font-heading font-bold mb-3">
                Data Sources
              </h2>
              <div className="card text-sm text-slate-600 dark:text-slate-300 space-y-2">
                <p>
                  Tax rate data for {country.name} is compiled from the following
                  authoritative sources:
                </p>
                <ul className="list-disc list-inside space-y-1 text-slate-500">
                  <li>
                    <a href="https://www.oecd.org/tax/tax-policy/tax-database/" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                      OECD Tax Database
                    </a>
                  </li>
                  <li>
                    <a href="https://taxfoundation.org/research/all/global/international-tax-competitiveness-index/" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                      Tax Foundation International Tax Competitiveness Index
                    </a>
                  </li>
                  <li>
                    <a href="https://www.worldbank.org/en/programs/business-enabling-environment" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                      World Bank Business Enabling Environment
                    </a>
                  </li>
                  <li>{country.name} government tax authority publications</li>
                  <li>
                    <a href="https://taxsummaries.pwc.com/" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                      PwC Worldwide Tax Summaries
                    </a>
                  </li>
                </ul>
                <p className="text-xs text-slate-400">
                  Last verified: {country.lastUpdated}
                </p>
              </div>
            </section>

            {/* Disclaimer */}
            <TaxDisclaimer />
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Compare CTA */}
            <div className="card bg-primary-50 dark:bg-primary-950/20 border-primary-100 dark:border-primary-800">
              <h3 className="font-heading font-semibold mb-2">
                Compare {country.name}
              </h3>
              <p className="text-sm text-slate-500 mb-3">
                See how {country.name} stacks up against other countries.
              </p>
              {relatedComparisons.length > 0 ? (
                <div className="space-y-2">
                  {relatedComparisons.slice(0, 4).map((comp) => (
                    <Link
                      key={comp.slug}
                      href={`/compare/${comp.slug}`}
                      className="block text-sm no-underline hover:text-primary-600 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 rounded p-2 transition-colors"
                    >
                      {comp.slug.replace(/-vs-/g, " vs ").replace(/-/g, " ")}
                      <span className="text-primary-500 ml-1">&rarr;</span>
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  href="/compare"
                  className="btn-secondary btn-sm no-underline w-full text-center"
                >
                  Browse Comparisons
                </Link>
              )}
            </div>

            {/* Ad */}
            <div className="flex justify-center">
              <AdPlaceholder size="rectangle" />
            </div>

            {/* Related Countries */}
            <div className="card">
              <h3 className="font-heading font-semibold mb-3">
                More in {country.region}
              </h3>
              <div className="space-y-2">
                {relatedCountries.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/countries/${c.slug}`}
                    className="flex items-center gap-2 text-sm no-underline text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 p-1.5 rounded transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/50"
                  >
                    <span className="text-lg" aria-hidden="true">
                      {c.flag}
                    </span>
                    <span>{c.name}</span>
                    <span className={`ml-auto font-mono text-xs ${getTaxRateColor(c.incomeTax.topRate)}`}>
                      {c.incomeTax.topRate}%
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Last Updated */}
            <div className="text-center text-xs text-slate-400">
              <p>Data last updated: {country.lastUpdated}</p>
              <p className="mt-1">
                Always consult a qualified tax professional.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
