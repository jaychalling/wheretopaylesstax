import type { MetadataRoute } from "next";
import { getAllCountries, getAllGuides, getComparisonSlugs } from "@/lib/data";

const BASE_URL = "https://wheretopaylesstax.com";

// Fixed build date to avoid lastModified changing on every deploy
const BUILD_DATE = "2026-02-13T00:00:00Z";

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
  ]);

  const countryPages: MetadataRoute.Sitemap = countries.map((country) => {
    const isHighPerformer = HIGH_IMPRESSION_COUNTRIES.has(country.slug);
    return {
      url: `${BASE_URL}/countries/${country.slug}`,
      lastModified: BUILD_DATE,
      changeFrequency: isHighPerformer ? "weekly" as const : "monthly" as const,
      priority: isHighPerformer ? 0.9 : 0.8,
    };
  });

  // Comparison pages — boost pages with GSC traction
  const HIGH_IMPRESSION_COMPARISONS = new Set([
    "usa-vs-canada", "italy-vs-portugal", "panama-vs-costa-rica",
    "germany-vs-netherlands", "france-vs-spain", "japan-vs-south-korea",
    "bulgaria-vs-romania",
  ]);

  const comparisonPages: MetadataRoute.Sitemap = comparisonSlugs.map(
    (slug) => ({
      url: `${BASE_URL}/compare/${slug}`,
      lastModified: BUILD_DATE,
      changeFrequency: HIGH_IMPRESSION_COMPARISONS.has(slug) ? "weekly" as const : "monthly" as const,
      priority: HIGH_IMPRESSION_COMPARISONS.has(slug) ? 0.85 : 0.7,
    })
  );

  // Guide pages
  const guidePages: MetadataRoute.Sitemap = guides.map((guide) => {
    // Boost priority for key guides
    let priority = 0.7;
    let changeFrequency: "weekly" | "monthly" = "monthly";
    
    if (guide.slug === 'tax-guide-digital-nomads') {
      priority = 0.9;
      changeFrequency = "weekly";
    }
    
    return {
      url: `${BASE_URL}/guides/${guide.slug}`,
      lastModified: BUILD_DATE,
      changeFrequency,
      priority,
    };
  });

  return [...staticPages, ...countryPages, ...comparisonPages, ...guidePages];
}
