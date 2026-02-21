import type { Metadata } from "next";
import Link from "next/link";
import { getAllCountries } from "@/lib/data";
import RankingsTable from "@/components/RankingsTable";

export const metadata: Metadata = {
  title: "Lowest Tax Countries 2026 - Tax Rankings Worldwide",
  description:
    "Ranked: lowest tax countries in the world for 2026. Sort 50+ countries by income tax, corporate tax, VAT & capital gains. Find your ideal tax-friendly destination.",
  keywords: [
    "lowest tax countries 2026",
    "tax rankings",
    "lowest income tax countries",
    "lowest corporate tax",
    "tax-friendly countries",
    "zero tax countries",
    "low tax destinations 2026",
  ],
  openGraph: {
    title: "Lowest Tax Countries 2026 - Rankings | WhereToPayLessTax",
    description:
      "Ranked: lowest tax countries in the world for 2026 across income tax, corporate tax, VAT, and capital gains.",
  },
  alternates: {
    canonical: "https://wheretopaylesstax.com/rankings",
  },
};

export default function RankingsPage() {
  const countries = getAllCountries();

  const rankingsJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Lowest Tax Countries 2026",
    description: "Ranking of countries by tax rates worldwide, sortable by income tax, corporate tax, VAT, and capital gains.",
    url: "https://wheretopaylesstax.com/rankings",
    numberOfItems: countries.length,
    itemListElement: countries
      .sort((a, b) => a.incomeTax.topRate - b.incomeTax.topRate)
      .slice(0, 20)
      .map((country, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: `${country.name} - Income Tax ${country.incomeTax.topRate}%`,
        url: `https://wheretopaylesstax.com/countries/${country.slug}`,
      })),
  };

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
        name: "Tax Rankings",
        item: "https://wheretopaylesstax.com/rankings",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(rankingsJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
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
              <li className="text-slate-800 dark:text-slate-200 font-medium">
                Tax Rankings
              </li>
            </ol>
          </nav>

          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-3">
            Lowest Tax Countries 2026 &mdash; Global Rankings
          </h1>
          <p className="text-slate-500 max-w-2xl text-lg">
            Discover the most tax-friendly countries in the world for 2026. Sort by
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
