"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { CountryData } from "@/lib/data";
import { getTaxRateColorExplicit as getTaxRateColor } from "@/lib/utils";

type SortField = "incomeTax" | "corporateTax" | "vat" | "capitalGains" | "costOfLiving";

const SORT_OPTIONS: { label: string; field: SortField }[] = [
  { label: "Income Tax", field: "incomeTax" },
  { label: "Corporate Tax", field: "corporateTax" },
  { label: "VAT", field: "vat" },
  { label: "Capital Gains", field: "capitalGains" },
  { label: "Cost of Living", field: "costOfLiving" },
];

function getRateValue(country: CountryData, field: SortField): number {
  switch (field) {
    case "incomeTax":
      return country.incomeTax.topRate;
    case "corporateTax":
      return country.corporateTax.standardRate;
    case "vat":
      return country.vat.standardRate;
    case "capitalGains":
      return country.capitalGainsTax.rate;
    case "costOfLiving":
      return country.costOfLivingIndex;
  }
}

export default function RankingsTable({ countries }: { countries: CountryData[] }) {
  const [sortField, setSortField] = useState<SortField>("incomeTax");
  const [showCount, setShowCount] = useState(20);

  const sorted = useMemo(() => {
    return [...countries].sort(
      (a, b) => getRateValue(a, sortField) - getRateValue(b, sortField)
    );
  }, [countries, sortField]);

  const displayed = sorted.slice(0, showCount);

  return (
    <div>
      {/* Sort Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {SORT_OPTIONS.map((opt) => (
          <button
            key={opt.field}
            type="button"
            onClick={() => setSortField(opt.field)}
            className={`btn btn-sm transition-colors ${
              sortField === opt.field
                ? "bg-primary-600 text-white hover:bg-primary-700"
                : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
        <table className="comparison-table">
          <thead>
            <tr>
              <th className="w-12">#</th>
              <th>Country</th>
              <th>Income Tax</th>
              <th>Corporate Tax</th>
              <th>VAT</th>
              <th>Capital Gains</th>
              <th className="hidden md:table-cell">Nomad Visa</th>
            </tr>
          </thead>
          <tbody>
            {displayed.map((country, i) => (
              <tr key={country.slug}>
                <td className="font-mono text-xs text-slate-400">{i + 1}</td>
                <td>
                  <Link
                    href={`/countries/${country.slug}`}
                    className="flex items-center gap-2 no-underline text-slate-800 dark:text-slate-100 hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    <span className="text-lg">{country.flag}</span>
                    <span className="font-medium text-sm">{country.name}</span>
                  </Link>
                </td>
                <td>
                  <span className={`font-heading font-bold text-sm ${getTaxRateColor(country.incomeTax.topRate)}`}>
                    {country.incomeTax.topRate}%
                  </span>
                </td>
                <td>
                  <span className={`font-heading font-bold text-sm ${getTaxRateColor(country.corporateTax.standardRate)}`}>
                    {country.corporateTax.standardRate}%
                  </span>
                </td>
                <td>
                  <span className={`font-heading font-bold text-sm ${getTaxRateColor(country.vat.standardRate)}`}>
                    {country.vat.standardRate}%
                  </span>
                </td>
                <td>
                  <span className={`font-heading font-bold text-sm ${getTaxRateColor(country.capitalGainsTax.rate)}`}>
                    {country.capitalGainsTax.rate}%
                  </span>
                </td>
                <td className="hidden md:table-cell">
                  {country.digitalNomadVisa ? (
                    <span className="badge-success">Yes</span>
                  ) : (
                    <span className="text-xs text-slate-400">No</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Show More */}
      {showCount < sorted.length && (
        <div className="text-center mt-6">
          <button
            type="button"
            onClick={() => setShowCount(sorted.length)}
            className="btn-outline btn-md"
          >
            Show all {sorted.length} countries
          </button>
        </div>
      )}
    </div>
  );
}
