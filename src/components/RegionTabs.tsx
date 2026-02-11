"use client";

import { useState } from "react";
import Link from "next/link";

interface CountryData {
  slug: string;
  name: string;
  flag: string;
  incomeTax: { topRate: number };
  corporateTax: { standardRate: number };
  vat: { standardRate: number };
}

function getTaxRateColor(rate: number): string {
  if (rate <= 15) return "tax-rate-low";
  if (rate <= 30) return "tax-rate-medium";
  return "tax-rate-high";
}

export default function RegionTabs({
  regions,
  regionCountries,
}: {
  regions: string[];
  regionCountries: Record<string, CountryData[]>;
}) {
  const [activeRegion, setActiveRegion] = useState(regions[0] || "Europe");

  const countries = regionCountries[activeRegion] || [];

  return (
    <div>
      {/* Tab Buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {regions.map((region) => (
          <button
            key={region}
            type="button"
            onClick={() => setActiveRegion(region)}
            className={`btn btn-sm transition-colors ${
              activeRegion === region
                ? "bg-primary-600 text-white hover:bg-primary-700"
                : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
            }`}
          >
            {region}
            <span className="ml-1.5 text-xs opacity-70">
              ({(regionCountries[region] || []).length})
            </span>
          </button>
        ))}
      </div>

      {/* Country Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {countries.map((country) => (
          <Link
            key={country.slug}
            href={`/countries/${country.slug}`}
            className="card-hover group no-underline block"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{country.flag}</span>
              <h3 className="font-heading font-semibold text-slate-800 dark:text-slate-100 text-sm group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {country.name}
              </h3>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-xs text-slate-500 mb-0.5">Income</p>
                <span className={`text-sm ${getTaxRateColor(country.incomeTax.topRate)}`}>
                  {country.incomeTax.topRate}%
                </span>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-0.5">Corp</p>
                <span className={`text-sm ${getTaxRateColor(country.corporateTax.standardRate)}`}>
                  {country.corporateTax.standardRate}%
                </span>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-0.5">VAT</p>
                <span className={`text-sm ${getTaxRateColor(country.vat.standardRate)}`}>
                  {country.vat.standardRate}%
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* View All Link */}
      <div className="text-center mt-6">
        <Link
          href="/countries"
          className="btn-outline btn-md no-underline text-slate-700 hover:text-primary-600"
        >
          View all 50 countries &rarr;
        </Link>
      </div>
    </div>
  );
}
