import countriesData from "../data/countries.json";
import guidesData from "../data/guides.json";

// ============ Types ============

export interface TaxBracket {
  min: number;
  max: number | null;
  rate: number;
}

export interface IncomeTax {
  brackets: TaxBracket[];
  topRate: number;
  notes: string;
}

export interface CorporateTax {
  standardRate: number;
  smallBusinessRate?: number;
  notes: string;
}

export interface VATInfo {
  standardRate: number;
  reducedRates: number[];
  notes: string;
}

export interface CapitalGainsTax {
  rate: number;
  longTermRate?: number;
  notes: string;
}

export interface SocialSecurity {
  employeeRate: number;
  employerRate: number;
  selfEmployedRate: number;
  notes: string;
}

export interface SpecialRegime {
  name: string;
  description: string;
  eligibility: string;
}

export interface CountryData {
  slug: string;
  name: string;
  flag: string;
  region: string;
  currency: string;
  incomeTax: IncomeTax;
  corporateTax: CorporateTax;
  vat: VATInfo;
  capitalGainsTax: CapitalGainsTax;
  socialSecurity: SocialSecurity;
  specialRegimes: SpecialRegime[];
  taxTreaties: number;
  costOfLivingIndex: number;
  qualityOfLifeIndex: number;
  digitalNomadVisa: boolean;
  digitalNomadVisaDetails?: string;
  summary: string;
  pros: string[];
  cons: string[];
  bestFor: string[];
  lastUpdated: string;
}

export interface GuideSection {
  heading: string;
  content: string;
  table?: {
    title: string;
    headers: string[];
    rows: string[][];
  };
}

export interface GuideData {
  slug: string;
  title: string;
  metaDescription: string;
  category: string;
  targetKeywords: string[];
  readTime: number;
  lastUpdated: string;
  relatedCountries: string[];
  relatedComparisons: string[];
  sections: GuideSection[];
}

export interface ComparisonPair {
  slug: string;
  countryA: string;
  countryB: string;
}

// ============ Data Access ============

const countries: CountryData[] = countriesData as CountryData[];
const guides: GuideData[] = guidesData as GuideData[];

// Popular comparison pairs
const POPULAR_COMPARISONS: ComparisonPair[] = [
  { slug: "portugal-vs-spain", countryA: "portugal", countryB: "spain" },
  { slug: "singapore-vs-hong-kong", countryA: "singapore", countryB: "hong-kong" },
  { slug: "uae-vs-singapore", countryA: "uae", countryB: "singapore" },
  { slug: "usa-vs-canada", countryA: "usa", countryB: "canada" },
  { slug: "uk-vs-ireland", countryA: "united-kingdom", countryB: "ireland" },
  { slug: "germany-vs-netherlands", countryA: "germany", countryB: "netherlands" },
  { slug: "thailand-vs-malaysia", countryA: "thailand", countryB: "malaysia" },
  { slug: "estonia-vs-portugal", countryA: "estonia", countryB: "portugal" },
  { slug: "switzerland-vs-germany", countryA: "switzerland", countryB: "germany" },
  { slug: "australia-vs-new-zealand", countryA: "australia", countryB: "new-zealand" },
  { slug: "panama-vs-costa-rica", countryA: "panama", countryB: "costa-rica" },
  { slug: "japan-vs-south-korea", countryA: "japan", countryB: "south-korea" },
  { slug: "france-vs-spain", countryA: "france", countryB: "spain" },
  { slug: "uae-vs-switzerland", countryA: "uae", countryB: "switzerland" },
  { slug: "bulgaria-vs-romania", countryA: "bulgaria", countryB: "romania" },
  { slug: "malta-vs-cyprus", countryA: "malta", countryB: "cyprus" },
  { slug: "colombia-vs-mexico", countryA: "colombia", countryB: "mexico" },
  { slug: "usa-vs-uk", countryA: "usa", countryB: "united-kingdom" },
  { slug: "canada-vs-australia", countryA: "canada", countryB: "australia" },
  { slug: "italy-vs-portugal", countryA: "italy", countryB: "portugal" },
];

// ============ Country Functions ============

export function getAllCountries(): CountryData[] {
  return countries;
}

export function getCountryBySlug(slug: string): CountryData | undefined {
  return countries.find((c) => c.slug === slug);
}

export function getCountriesByRegion(region: string): CountryData[] {
  return countries.filter((c) => c.region === region);
}

export function getRegions(): string[] {
  return [...new Set(countries.map((c) => c.region))];
}

export function searchCountries(query: string): CountryData[] {
  const q = query.toLowerCase();
  return countries.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.slug.includes(q) ||
      c.region.toLowerCase().includes(q)
  );
}

export function getCountriesSortedBy(
  field: "incomeTax" | "corporateTax" | "vat" | "capitalGains" | "costOfLiving",
  order: "asc" | "desc" = "asc"
): CountryData[] {
  const sorted = [...countries].sort((a, b) => {
    let valA: number, valB: number;
    switch (field) {
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
      case "capitalGains":
        valA = a.capitalGainsTax.rate;
        valB = b.capitalGainsTax.rate;
        break;
      case "costOfLiving":
        valA = a.costOfLivingIndex;
        valB = b.costOfLivingIndex;
        break;
    }
    return order === "asc" ? valA - valB : valB - valA;
  });
  return sorted;
}

export function getTopCountries(
  field: "incomeTax" | "corporateTax" | "vat" | "capitalGains" | "costOfLiving",
  limit: number = 20
): CountryData[] {
  return getCountriesSortedBy(field, "asc").slice(0, limit);
}

export function getDigitalNomadCountries(): CountryData[] {
  return countries.filter((c) => c.digitalNomadVisa);
}

// ============ Comparison Functions ============

export function getPopularComparisons(): ComparisonPair[] {
  return POPULAR_COMPARISONS;
}

export function getComparisonBySlug(slug: string): {
  countryA: CountryData;
  countryB: CountryData;
  isPopular: boolean;
} | null {
  const pair = POPULAR_COMPARISONS.find((p) => p.slug === slug);

  let countryASlug: string;
  let countryBSlug: string;
  let isPopular = false;

  if (pair) {
    countryASlug = pair.countryA;
    countryBSlug = pair.countryB;
    isPopular = true;
  } else {
    // Parse slug: "country-a-vs-country-b"
    const parts = slug.split("-vs-");
    if (parts.length !== 2) return null;
    countryASlug = parts[0];
    countryBSlug = parts[1];
  }

  const countryA = getCountryBySlug(countryASlug);
  const countryB = getCountryBySlug(countryBSlug);

  if (!countryA || !countryB) return null;

  return { countryA, countryB, isPopular };
}

export function getComparisonSlugs(): string[] {
  return POPULAR_COMPARISONS.map((p) => p.slug);
}

export function getRelatedComparisons(countrySlug: string): ComparisonPair[] {
  return POPULAR_COMPARISONS.filter(
    (p) => p.countryA === countrySlug || p.countryB === countrySlug
  );
}

// ============ Guide Functions ============

export function getAllGuides(): GuideData[] {
  return guides;
}

export function getGuideBySlug(slug: string): GuideData | undefined {
  return guides.find((g) => g.slug === slug);
}

export function getGuidesByCategory(category: string): GuideData[] {
  return guides.filter((g) => g.category === category);
}

export function getGuideCategories(): string[] {
  return [...new Set(guides.map((g) => g.category))];
}

export function getRelatedGuides(countrySlug: string): GuideData[] {
  return guides.filter((g) => g.relatedCountries.includes(countrySlug));
}
