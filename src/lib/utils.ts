/**
 * Shared utility functions used across multiple components and pages.
 */

/**
 * Returns a Tailwind CSS class string for color-coding a tax rate.
 * - Green for low rates (<=15%)
 * - Warning/yellow for medium rates (<=30%)
 * - Red/danger for high rates (>30%)
 */
export function getTaxRateColor(rate: number): string {
  if (rate <= 15) return "tax-rate-low";
  if (rate <= 30) return "tax-rate-medium";
  return "tax-rate-high";
}

/**
 * Variant of getTaxRateColor that returns explicit text color classes
 * instead of the custom utility classes. Used in components that need
 * direct Tailwind color classes (CountriesGrid, RankingsTable, compare pages).
 */
export function getTaxRateColorExplicit(rate: number): string {
  if (rate <= 15) return "text-success-600 dark:text-success-500";
  if (rate <= 30) return "text-warning-600 dark:text-warning-500";
  return "text-danger-600 dark:text-danger-500";
}

/**
 * Formats a date string like "2025-01" into "January 2025".
 */
export function formatDate(dateStr: string): string {
  const [year, month] = dateStr.split("-");
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long" });
}

/**
 * Returns a badge CSS class based on guide category.
 */
export function getCategoryColor(category: string): string {
  switch (category) {
    case "Digital Nomad":
      return "badge-info";
    case "Country/Region":
      return "badge-success";
    case "Tax Strategy":
      return "badge-warning";
    default:
      return "badge-neutral";
  }
}
