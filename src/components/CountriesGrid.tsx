"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { CountryData } from "@/lib/data";
import { getTaxRateColorExplicit as getTaxRateColor } from "@/lib/utils";

type SortField = "name" | "incomeTax" | "corporateTax" | "vat";
type SortOrder = "asc" | "desc";

export default function CountriesGrid({
  countries,
  regions,
}: {
  countries: CountryData[];
  regions: string[];
}) {
  const [search, setSearch] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const filtered = useMemo(() => {
    let result = [...countries];

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.slug.includes(q) ||
          c.region.toLowerCase().includes(q)
      );
    }

    // Region filter
    if (selectedRegion !== "all") {
      result = result.filter((c) => c.region === selectedRegion);
    }

    // Sort
    result.sort((a, b) => {
      let valA: string | number;
      let valB: string | number;

      switch (sortField) {
        case "name":
          valA = a.name;
          valB = b.name;
          return sortOrder === "asc"
            ? valA.localeCompare(valB)
            : valB.localeCompare(valA);
        case "incomeTax":
          valA = a.incomeTax.topRate;
          valB = b.incomeTax.topRate;
          break;
        case "corporateTax":
          valA = a.corporateTax.standardRate;
          valB = b.corporateTax.standardRate;
          break;
        case "vat":
          valA = a.vat.standardRate;
          valB = b.vat.standardRate;
          break;
        default:
          return 0;
      }
      return sortOrder === "asc"
        ? (valA as number) - (valB as number)
        : (valB as number) - (valA as number);
    });

    return result;
  }, [countries, search, selectedRegion, sortField, sortOrder]);

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return (
        <svg className="w-3.5 h-3.5 text-slate-400 ml-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
        </svg>
      );
    }
    return sortOrder === "asc" ? (
      <svg className="w-3.5 h-3.5 text-primary-600 ml-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
      </svg>
    ) : (
      <svg className="w-3.5 h-3.5 text-primary-600 ml-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
      </svg>
    );
  };

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        {/* Search */}
        <div className="relative flex-1">
          <label htmlFor="country-search" className="sr-only">
            Search countries
          </label>
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            id="country-search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by country name..."
            className="w-full pl-9 pr-4 py-2.5 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 rounded-md text-sm font-body text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Region filter */}
        <div>
          <label htmlFor="region-filter" className="sr-only">
            Filter by region
          </label>
          <select
            id="region-filter"
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="w-full sm:w-auto px-4 py-2.5 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 rounded-md text-sm font-body text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All Regions</option>
            {regions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <div>
          <label htmlFor="sort-select" className="sr-only">
            Sort by
          </label>
          <select
            id="sort-select"
            value={`${sortField}-${sortOrder}`}
            onChange={(e) => {
              const [f, o] = e.target.value.split("-") as [SortField, SortOrder];
              setSortField(f);
              setSortOrder(o);
            }}
            className="w-full sm:w-auto px-4 py-2.5 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 rounded-md text-sm font-body text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="name-asc">Name A-Z</option>
            <option value="name-desc">Name Z-A</option>
            <option value="incomeTax-asc">Income Tax (Low to High)</option>
            <option value="incomeTax-desc">Income Tax (High to Low)</option>
            <option value="corporateTax-asc">Corporate Tax (Low to High)</option>
            <option value="corporateTax-desc">Corporate Tax (High to Low)</option>
            <option value="vat-asc">VAT (Low to High)</option>
            <option value="vat-desc">VAT (High to Low)</option>
          </select>
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-slate-500 mb-4">
        Showing {filtered.length} of {countries.length} countries
      </p>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
        <table className="comparison-table">
          <thead>
            <tr>
              <th className="w-8">#</th>
              <th>
                <button
                  onClick={() => toggleSort("name")}
                  className="flex items-center text-white hover:text-accent-400 transition-colors"
                >
                  Country
                  <SortIcon field="name" />
                </button>
              </th>
              <th>Region</th>
              <th>
                <button
                  onClick={() => toggleSort("incomeTax")}
                  className="flex items-center text-white hover:text-accent-400 transition-colors"
                >
                  Income Tax
                  <SortIcon field="incomeTax" />
                </button>
              </th>
              <th>
                <button
                  onClick={() => toggleSort("corporateTax")}
                  className="flex items-center text-white hover:text-accent-400 transition-colors"
                >
                  Corporate Tax
                  <SortIcon field="corporateTax" />
                </button>
              </th>
              <th>
                <button
                  onClick={() => toggleSort("vat")}
                  className="flex items-center text-white hover:text-accent-400 transition-colors"
                >
                  VAT
                  <SortIcon field="vat" />
                </button>
              </th>
              <th className="text-center">Nomad Visa</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((country, index) => (
              <tr key={country.slug}>
                <td className="text-slate-400 text-xs">{index + 1}</td>
                <td>
                  <Link
                    href={`/countries/${country.slug}`}
                    className="flex items-center gap-2 no-underline hover:text-primary-600"
                  >
                    <span className="text-lg" aria-hidden="true">
                      {country.flag}
                    </span>
                    <span className="font-medium text-slate-800 dark:text-slate-100">
                      {country.name}
                    </span>
                  </Link>
                </td>
                <td>
                  <span className="badge-neutral">{country.region}</span>
                </td>
                <td>
                  <span className={`font-heading font-bold ${getTaxRateColor(country.incomeTax.topRate)}`}>
                    {country.incomeTax.topRate}%
                  </span>
                </td>
                <td>
                  <span className={`font-heading font-bold ${getTaxRateColor(country.corporateTax.standardRate)}`}>
                    {country.corporateTax.standardRate}%
                  </span>
                </td>
                <td>
                  <span className={`font-heading font-bold ${getTaxRateColor(country.vat.standardRate)}`}>
                    {country.vat.standardRate}%
                  </span>
                </td>
                <td className="text-center">
                  {country.digitalNomadVisa ? (
                    <span className="badge-success">Yes</span>
                  ) : (
                    <span className="text-slate-400 text-xs">No</span>
                  )}
                </td>
                <td>
                  <Link
                    href={`/countries/${country.slug}`}
                    className="btn-ghost btn-sm no-underline text-sm"
                  >
                    Details &rarr;
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filtered.map((country) => (
          <Link
            key={country.slug}
            href={`/countries/${country.slug}`}
            className="card-hover no-underline block"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl" aria-hidden="true">
                {country.flag}
              </span>
              <div>
                <p className="font-heading font-semibold text-slate-800 dark:text-slate-100">
                  {country.name}
                </p>
                <div className="flex items-center gap-2">
                  <span className="badge-neutral text-[10px]">{country.region}</span>
                  {country.digitalNomadVisa && (
                    <span className="badge-info text-[10px]">Nomad Visa</span>
                  )}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-slate-50 dark:bg-slate-700/50 rounded p-2">
                <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">
                  Income
                </p>
                <p className={`font-heading font-bold text-sm ${getTaxRateColor(country.incomeTax.topRate)}`}>
                  {country.incomeTax.topRate}%
                </p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-700/50 rounded p-2">
                <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">
                  Corporate
                </p>
                <p className={`font-heading font-bold text-sm ${getTaxRateColor(country.corporateTax.standardRate)}`}>
                  {country.corporateTax.standardRate}%
                </p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-700/50 rounded p-2">
                <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">
                  VAT
                </p>
                <p className={`font-heading font-bold text-sm ${getTaxRateColor(country.vat.standardRate)}`}>
                  {country.vat.standardRate}%
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* No results */}
      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-400 text-lg mb-2">No countries found</p>
          <p className="text-slate-400 text-sm">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      )}
    </div>
  );
}
