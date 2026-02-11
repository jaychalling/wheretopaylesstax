import Link from "next/link";
import {
  getPopularComparisons,
  getCountryBySlug,
  getRegions,
  getCountriesByRegion,
  type CountryData,
} from "@/lib/data";
import AdPlaceholder from "@/components/AdPlaceholder";
import NewsletterForm from "@/components/NewsletterForm";
import HomeSearchBar from "@/components/HomeSearchBar";
import RegionTabs from "@/components/RegionTabs";

function getTaxRateColor(rate: number): string {
  if (rate <= 15) return "tax-rate-low";
  if (rate <= 30) return "tax-rate-medium";
  return "tax-rate-high";
}

function ComparisonCard({
  countryA,
  countryB,
  slug,
}: {
  countryA: CountryData;
  countryB: CountryData;
  slug: string;
}) {
  return (
    <Link href={`/compare/${slug}`} className="card-hover group no-underline block">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl" aria-hidden="true">
            {countryA.flag}
          </span>
          <span className="font-heading font-semibold text-slate-800 dark:text-slate-100 text-sm">
            {countryA.name}
          </span>
        </div>
        <span className="text-slate-400 font-heading font-bold text-xs uppercase tracking-wider">
          vs
        </span>
        <div className="flex items-center gap-2">
          <span className="font-heading font-semibold text-slate-800 dark:text-slate-100 text-sm">
            {countryB.name}
          </span>
          <span className="text-2xl" aria-hidden="true">
            {countryB.flag}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 text-center">
        <div>
          <p className="text-xs text-slate-500 mb-1">Income Tax</p>
          <div className="flex items-center justify-between px-1">
            <span className={getTaxRateColor(countryA.incomeTax.topRate)}>
              {countryA.incomeTax.topRate}%
            </span>
            <span className={getTaxRateColor(countryB.incomeTax.topRate)}>
              {countryB.incomeTax.topRate}%
            </span>
          </div>
        </div>
        <div>
          <p className="text-xs text-slate-500 mb-1">Corporate</p>
          <div className="flex items-center justify-between px-1">
            <span className={getTaxRateColor(countryA.corporateTax.standardRate)}>
              {countryA.corporateTax.standardRate}%
            </span>
            <span className={getTaxRateColor(countryB.corporateTax.standardRate)}>
              {countryB.corporateTax.standardRate}%
            </span>
          </div>
        </div>
        <div>
          <p className="text-xs text-slate-500 mb-1">VAT</p>
          <div className="flex items-center justify-between px-1">
            <span className={getTaxRateColor(countryA.vat.standardRate)}>
              {countryA.vat.standardRate}%
            </span>
            <span className={getTaxRateColor(countryB.vat.standardRate)}>
              {countryB.vat.standardRate}%
            </span>
          </div>
        </div>
      </div>
      <div className="mt-4 text-center">
        <span className="text-primary-600 dark:text-primary-400 text-sm font-medium group-hover:underline">
          Compare details &rarr;
        </span>
      </div>
    </Link>
  );
}

export default function Home() {
  const comparisons = getPopularComparisons().slice(0, 6);
  const regions = getRegions();
  const regionCountries: Record<string, CountryData[]> = {};
  for (const region of regions) {
    regionCountries[region] = getCountriesByRegion(region);
  }

  const comparisonData = comparisons
    .map((pair) => {
      const a = getCountryBySlug(pair.countryA);
      const b = getCountryBySlug(pair.countryB);
      if (!a || !b) return null;
      return { countryA: a, countryB: b, slug: pair.slug };
    })
    .filter(Boolean) as { countryA: CountryData; countryB: CountryData; slug: string }[];

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: "radial-gradient(circle at 25% 50%, rgba(255,255,255,0.15) 0%, transparent 50%), radial-gradient(circle at 75% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
          }} />
        </div>
        <div className="page-container relative z-10 py-16 md:py-24 lg:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-display font-heading font-bold text-white mb-4 tracking-tight">
              Compare taxes.{" "}
              <span className="text-accent-400">Move smarter.</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-100 mb-8 max-w-2xl mx-auto font-body">
              Compare income tax, corporate tax, and cost of living across 50+
              countries. Make data-driven decisions about where to live and work.
            </p>

            {/* Search Bar */}
            <HomeSearchBar />

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
              <Link
                href="/compare"
                className="btn-primary btn-lg no-underline text-slate-900 hover:text-slate-900 w-full sm:w-auto"
              >
                Compare Countries
              </Link>
              <Link
                href="/rankings"
                className="btn-outline btn-lg no-underline border-white/30 text-white hover:bg-white/10 hover:border-white/50 hover:text-white w-full sm:w-auto"
              >
                View Rankings
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-primary-200">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                50+ Countries
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Updated 2024
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Free to Use
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Banner */}
      <div className="page-container py-4 flex justify-center">
        <AdPlaceholder size="banner" />
      </div>

      {/* Popular Comparisons */}
      <section className="section-sm">
        <div className="page-container">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-2">
              Popular Tax Comparisons
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              See how the most searched country pairs stack up on income tax,
              corporate tax, and VAT.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {comparisonData.map((c) => (
              <ComparisonCard
                key={c.slug}
                countryA={c.countryA}
                countryB={c.countryB}
                slug={c.slug}
              />
            ))}
          </div>
          <div className="text-center mt-6">
            <Link
              href="/compare"
              className="btn-outline btn-md no-underline text-slate-700 hover:text-primary-600"
            >
              View all 20 comparisons &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Browse Countries by Region */}
      <section className="section-sm bg-white dark:bg-slate-800">
        <div className="page-container">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-2">
              Browse Countries by Region
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Explore tax rates across every continent. Find tax-friendly
              destinations in your preferred region.
            </p>
          </div>
          <RegionTabs regions={regions} regionCountries={regionCountries} />
        </div>
      </section>

      {/* Ad Rectangle */}
      <div className="page-container py-6 flex justify-center">
        <AdPlaceholder size="rectangle" />
      </div>

      {/* Value Propositions */}
      <section className="section-sm">
        <div className="page-container">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-2">
              Why WhereToPayLessTax?
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              We make complex international tax data simple, accessible, and
              actionable.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" /></svg>
                ),
                title: "Side-by-Side Comparison",
                desc: "Compare income tax, corporate tax, VAT, and more between any two countries instantly.",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" /></svg>
                ),
                title: "50+ Countries",
                desc: "Comprehensive tax data covering Europe, Asia, Americas, Oceania, Africa, and Caribbean.",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" /></svg>
                ),
                title: "Special Regimes & Visas",
                desc: "Discover digital nomad visas, golden visas, and special tax regimes for expats.",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>
                ),
                title: "Rankings & Insights",
                desc: "Sortable rankings by income tax, corporate tax, VAT, and capital gains across all countries.",
              },
            ].map((item) => (
              <div key={item.title} className="text-center p-6">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary-50 dark:bg-primary-950/30 text-primary-600 dark:text-primary-400 mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-heading font-semibold mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section-sm bg-primary-50 dark:bg-primary-950/20">
        <div className="page-container">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-2xl font-heading font-bold mb-2">
              Get Weekly Tax Insights
            </h2>
            <p className="text-slate-500 mb-6">
              Stay updated on tax changes, new nomad visas, and optimization
              strategies delivered to your inbox.
            </p>
            <NewsletterForm variant="card" />
          </div>
        </div>
      </section>

      {/* Bottom Ad */}
      <div className="page-container py-6 flex justify-center">
        <AdPlaceholder size="leaderboard" />
      </div>
    </>
  );
}
