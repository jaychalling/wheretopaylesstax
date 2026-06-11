import type { MetadataRoute } from "next";
import { getAllCountries, getAllGuides, getComparisonSlugs } from "@/lib/data";

const BASE_URL = "https://wheretopaylesstax.com";

// Build date for static pages; guide/country pages use their own lastUpdated
const BUILD_DATE = new Date().toISOString();

export default function sitemap(): MetadataRoute.Sitemap {
  const countries = getAllCountries();
  const guides = getAllGuides();
  const comparisonSlugs = getComparisonSlugs();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: BUILD_DATE,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/countries`,
      lastModified: BUILD_DATE,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/compare`,
      lastModified: BUILD_DATE,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/rankings`,
      lastModified: BUILD_DATE,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/guides`,
      lastModified: BUILD_DATE,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: BUILD_DATE,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: BUILD_DATE,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: BUILD_DATE,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: BUILD_DATE,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  // Country pages — priorities based on GSC performance data
  // High-impression countries get boosted priority + weekly crawl
  const HIGH_IMPRESSION_COUNTRIES = new Set([
    "hong-kong", "greece", "malta", "germany", "georgia",
    "panama", "cayman-islands", "hungary", "croatia", "costa-rica",
    "portugal", "uae", "singapore", "switzerland", "thailand",
    "japan", "south-korea", "netherlands",
  ]);

  const countryPages: MetadataRoute.Sitemap = countries.map((country) => {
    const isHighPerformer = HIGH_IMPRESSION_COUNTRIES.has(country.slug);
    // Use country's lastUpdated if available
    const countryDate = country.lastUpdated
      ? `${country.lastUpdated}T00:00:00Z`
      : BUILD_DATE;
    return {
      url: `${BASE_URL}/countries/${country.slug}`,
      lastModified: countryDate,
      changeFrequency: isHighPerformer ? "weekly" as const : "monthly" as const,
      priority: isHighPerformer ? 0.9 : 0.8,
    };
  });

  // Comparison pages — boost pages with GSC traction
  const HIGH_IMPRESSION_COMPARISONS = new Set([
    "usa-vs-canada", "italy-vs-portugal", "panama-vs-costa-rica",
    "germany-vs-netherlands", "france-vs-spain", "japan-vs-south-korea",
    "bulgaria-vs-romania", "singapore-vs-hong-kong", "uae-vs-singapore",
    "usa-vs-uk", "portugal-vs-spain", "uk-vs-ireland",
  ]);

  const comparisonPages: MetadataRoute.Sitemap = comparisonSlugs.map(
    (slug) => ({
      url: `${BASE_URL}/compare/${slug}`,
      lastModified: BUILD_DATE,
      changeFrequency: HIGH_IMPRESSION_COMPARISONS.has(slug) ? "weekly" as const : "monthly" as const,
      priority: HIGH_IMPRESSION_COMPARISONS.has(slug) ? 0.85 : 0.7,
    })
  );

  // Guide pages — use per-guide lastUpdated when available
  // High-traction guides (GSC) get boosted priority + weekly crawl
  const HIGH_PRIORITY_GUIDES = new Set([
    "tax-guide-digital-nomads",
    "southeast-asia-tax-guide",
    "freelancer-tax-optimization",
    "lowest-tax-countries-europe",
  ]);

  const guidePages: MetadataRoute.Sitemap = guides.map((guide) => {
    // Boost priority for key guides
    let priority = 0.7;
    let changeFrequency: "weekly" | "monthly" = "monthly";

    if (HIGH_PRIORITY_GUIDES.has(guide.slug)) {
      priority = guide.slug === "tax-guide-digital-nomads" ? 0.9 : 0.85;
      changeFrequency = "weekly";
    }

    // Use guide's lastUpdated (format "2026-02") or fall back to BUILD_DATE
    const guideDate = guide.lastUpdated
      ? `${guide.lastUpdated}-01T00:00:00Z`
      : BUILD_DATE;

    return {
      url: `${BASE_URL}/guides/${guide.slug}`,
      lastModified: guideDate,
      changeFrequency,
      priority,
    };
  });

  return [...staticPages, ...countryPages, ...comparisonPages, ...guidePages];
}
