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

  // Country pages — use BUILD_DATE since data was recently verified
  const countryPages: MetadataRoute.Sitemap = countries.map((country) => ({
    url: `${BASE_URL}/countries/${country.slug}`,
    lastModified: BUILD_DATE,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Comparison pages
  const comparisonPages: MetadataRoute.Sitemap = comparisonSlugs.map(
    (slug) => ({
      url: `${BASE_URL}/compare/${slug}`,
      lastModified: BUILD_DATE,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })
  );

  // Guide pages
  const guidePages: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: `${BASE_URL}/guides/${guide.slug}`,
    lastModified: BUILD_DATE,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...countryPages, ...comparisonPages, ...guidePages];
}
