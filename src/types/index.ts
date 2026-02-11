// Tax bracket type for parsed JSON
export interface TaxBracket {
  min: number;
  max: number | null; // null means unlimited
  rate: number;
}

// Special tax regime type for parsed JSON
export interface SpecialRegime {
  name: string;
  description: string;
  eligibility?: string;
  rate?: number;
}

// Region type
export type Region =
  | "Europe"
  | "Asia"
  | "Americas"
  | "Middle East"
  | "Africa"
  | "Oceania";

// Ranking category
export type RankingCategory =
  | "overall"
  | "income-tax"
  | "corporate-tax"
  | "vat"
  | "capital-gains";

// Comparison winner per category
export interface ComparisonResult {
  category: string;
  countryAValue: number;
  countryBValue: number;
  winner: "A" | "B" | "tie";
}
