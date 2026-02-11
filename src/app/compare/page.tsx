import type { Metadata } from "next";
import Link from "next/link";
import {
  getPopularComparisons,
  getCountryBySlug,
  type CountryData,
} from "@/lib/data";

export const metadata: Metadata = {
  title: "Compare Tax Rates Between Countries",
  description:
    "Side-by-side tax comparison between 20 popular country pairs. Compare income tax, corporate tax, VAT, capital gains, and special tax regimes.",
  keywords: [
    "compare tax rates",
    "country tax comparison",
    "income tax comparison",
    "corporate tax comparison",
    "expat tax comparison",
  ],
  openGraph: {
    title: "Compare Tax Rates Between Countries | WhereToPayLessTax",
    description:
      "Side-by-side tax comparison between 20 popular country pairs.",
  },
};

function getTaxRateColor(rate: number): string {
  if (rate <= 15) return "text-success-600 dark:text-success-500";
  if (rate <= 30) return "text-warning-600 dark:text-warning-500";
  return "text-danger-600 dark:text-danger-500";
}

function ComparisonListCard({
  countryA,
  countryB,
  slug,
}: {
  countryA: CountryData;
  countryB: CountryData;
  slug: string;
}) {
  const categories = [
    {
      label: "Income Tax",
      a: countryA.incomeTax.topRate,
      b: countryB.incomeTax.topRate,
    },
    {
      label: "Corporate Tax",
      a: countryA.corporateTax.standardRate,
      b: countryB.corporateTax.standardRate,
    },
    {
      label: "VAT",
      a: countryA.vat.standardRate,
      b: countryB.vat.standardRate,
    },
    {
      label: "Capital Gains",
      a: countryA.capitalGainsTax.rate,
      b: countryB.capitalGainsTax.rate,
    },
  ];

  return (
    <Link
      href={`/compare/${slug}`}
      className="card-hover group no-underline block"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-700">
        <div className="flex items-center gap-2">
          <span className="text-2xl" aria-hidden="true">
            {countryA.flag}
          </span>
          <span className="font-heading font-semibold text-slate-800 dark:text-slate-100">
            {countryA.name}
          </span>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 text-xs font-bold uppercase tracking-wider">
          vs
        </span>
        <div className="flex items-center gap-2">
          <span className="font-heading font-semibold text-slate-800 dark:text-slate-100">
            {countryB.name}
          </span>
          <span className="text-2xl" aria-hidden="true">
            {countryB.flag}
          </span>
        </div>
      </div>

      {/* Tax Rates Grid */}
      <div className="space-y-2">
        {categories.map((cat) => {
          const winner =
            cat.a < cat.b ? "A" : cat.b < cat.a ? "B" : "tie";
          return (
            <div key={cat.label} className="flex items-center text-sm">
              <span
                className={`font-heading font-bold w-12 text-right ${
                  winner === "A"
                    ? "text-success-600 dark:text-success-500"
                    : getTaxRateColor(cat.a)
                }`}
              >
                {cat.a}%
              </span>
              <div className="flex-1 mx-3 text-center">
                <span className="text-xs text-slate-400">{cat.label}</span>
              </div>
              <span
                className={`font-heading font-bold w-12 ${
                  winner === "B"
                    ? "text-success-600 dark:text-success-500"
                    : getTaxRateColor(cat.b)
                }`}
              >
                {cat.b}%
              </span>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700 text-center">
        <span className="text-primary-600 dark:text-primary-400 text-sm font-medium group-hover:underline">
          Full comparison &rarr;
        </span>
      </div>
    </Link>
  );
}

export default function ComparePage() {
  const comparisons = getPopularComparisons();

  const comparisonData = comparisons
    .map((pair) => {
      const a = getCountryBySlug(pair.countryA);
      const b = getCountryBySlug(pair.countryB);
      if (!a || !b) return null;
      return { countryA: a, countryB: b, slug: pair.slug };
    })
    .filter(Boolean) as {
    countryA: CountryData;
    countryB: CountryData;
    slug: string;
  }[];

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-b from-primary-50 to-white dark:from-slate-800 dark:to-slate-900 border-b border-slate-200 dark:border-slate-700">
        <div className="page-container py-10 md:py-14">
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-3">
            Compare Tax Rates
          </h1>
          <p className="text-slate-500 max-w-2xl text-lg">
            Side-by-side tax comparisons between {comparisons.length} popular
            country pairs. Click any pair to see the full breakdown.
          </p>
        </div>
      </section>

      {/* Comparisons Grid */}
      <section className="section-sm">
        <div className="page-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {comparisonData.map((c) => (
              <ComparisonListCard
                key={c.slug}
                countryA={c.countryA}
                countryB={c.countryB}
                slug={c.slug}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
