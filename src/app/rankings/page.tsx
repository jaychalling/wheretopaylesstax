import type { Metadata } from "next";
import { getAllCountries } from "@/lib/data";
import RankingsTable from "@/components/RankingsTable";

export const metadata: Metadata = {
  title: "Tax Rankings - Lowest Tax Countries in the World",
  description:
    "Ranking of the lowest tax countries worldwide. Compare income tax, corporate tax, VAT, and capital gains rates. Find the most tax-friendly destinations for expats, freelancers, and businesses.",
  keywords: [
    "lowest tax countries",
    "tax rankings",
    "lowest income tax",
    "lowest corporate tax",
    "tax-friendly countries",
    "zero tax countries",
    "low tax destinations",
  ],
  openGraph: {
    title: "Tax Rankings - Lowest Tax Countries | WhereToPayLessTax",
    description:
      "Ranking of the lowest tax countries worldwide across income tax, corporate tax, VAT, and capital gains.",
  },
};

export default function RankingsPage() {
  const countries = getAllCountries();

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-b from-primary-50 to-white dark:from-slate-800 dark:to-slate-900 border-b border-slate-200 dark:border-slate-700">
        <div className="page-container py-10 md:py-14">
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-3">
            Tax Rankings
          </h1>
          <p className="text-slate-500 max-w-2xl text-lg">
            Discover the most tax-friendly countries in the world. Sort by
            income tax, corporate tax, VAT, or capital gains to find the best
            fit for your situation.
          </p>
        </div>
      </section>

      {/* Rankings Table (client-side interactive) */}
      <section className="section-sm">
        <div className="page-container">
          <RankingsTable countries={countries} />
        </div>
      </section>
    </>
  );
}
