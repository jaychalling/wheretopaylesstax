"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

interface CountryOption {
  slug: string;
  name: string;
  flag: string;
}

export default function HomeSearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<CountryOption[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleSearch(value: string) {
    setQuery(value);
    if (value.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(value)}`);
      const data = await res.json();
      setResults(data.countries || []);
      setIsOpen(true);
    } catch {
      setResults([]);
    }
  }

  function handleSelect(slug: string) {
    setIsOpen(false);
    setQuery("");
    router.push(`/countries/${slug}`);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (results.length > 0) {
      handleSelect(results[0].slug);
    } else if (query.length > 0) {
      router.push(`/countries?q=${encodeURIComponent(query)}`);
    }
  }

  return (
    <div ref={wrapperRef} className="relative max-w-lg mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={() => results.length > 0 && setIsOpen(true)}
            placeholder="Search a country (e.g., Portugal, Singapore...)"
            className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-primary-200 text-base font-body focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent"
            aria-label="Search countries"
            aria-expanded={isOpen}
            aria-controls="search-results-listbox"
            role="combobox"
            aria-autocomplete="list"
          />
        </div>
      </form>

      {isOpen && results.length > 0 && (
        <ul
          id="search-results-listbox"
          className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 max-h-64 overflow-y-auto z-50"
          role="listbox"
        >
          {results.map((country) => (
            <li key={country.slug}>
              <button
                type="button"
                onClick={() => handleSelect(country.slug)}
                className="w-full px-4 py-3 flex items-center gap-3 hover:bg-primary-50 dark:hover:bg-primary-950/30 transition-colors text-left"
                role="option"
                aria-selected={false}
              >
                <span className="text-xl">{country.flag}</span>
                <span className="text-sm font-medium text-slate-800 dark:text-slate-100">
                  {country.name}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
