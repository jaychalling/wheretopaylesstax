import type { Metadata } from "next";
import { getAllCountries, getRegions } from "@/lib/data";
import CountriesGrid from "@/components/CountriesGrid";

export const metadata: Metadata = {
  title: "Tax Rates by Country - 50+ Countries Compared",
  description:
    "Browse and compare tax rates across 50+ countries. Filter by region, sort by income tax, corporate tax, or VAT. Find the best tax-friendly destinations for expats and digital nomads.",
  keywords: [
    "tax rates by country",
    "compare country taxes",
    "low tax countries",
    "income tax by country",
    "corporate tax rates",
    "VAT rates worldwide",
  ],
  openGraph: {
    title: "Tax Rates by Country - 50+ Countries Compared | WhereToPayLessTax",
    description:
      "Browse and compare tax rates across 50+ countries. Filter by region, sort by income tax, corporate tax, or VAT.",
  },
};

export default function CountriesPage() {
  const countries = getAllCountries();
  const regions = getRegions();

  return (
    <>
      {/* Page Header */}
      <section className="bg-gradient-to-b from-primary-50 to-white dark:from-slate-800 dark:to-slate-900 border-b border-slate-200 dark:border-slate-700">
        <div className="page-container py-10 md:py-14">
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-3">
            Tax Rates by Country
          </h1>
          <p className="text-slate-500 max-w-2xl text-lg">
            Compare income tax, corporate tax, and VAT across {countries.length}{" "}
            countries. Use filters and sorting to find your ideal destination.
          </p>
        </div>
      </section>

      {/* Countries Grid (client-side interactive) */}
      <section className="section-sm">
        <div className="page-container">
          <CountriesGrid countries={countries} regions={regions} />
        </div>
      </section>
    </>
  );
}
