import type { Metadata } from "next";
import Link from "next/link";
import { getAllGuides, getGuideCategories, type GuideData } from "@/lib/data";
import { formatDate, getCategoryColor } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Tax Guides & Articles",
  description:
    "In-depth guides on international tax planning, digital nomad taxes, freelancer optimization, and the best low-tax countries for expats and remote workers.",
  openGraph: {
    title: "Tax Guides & Articles | WhereToPayLessTax",
    description:
      "In-depth guides on international tax planning, digital nomad taxes, freelancer optimization, and the best low-tax countries.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tax Guides & Articles | WhereToPayLessTax",
    description:
      "In-depth guides on international tax planning, digital nomad taxes, freelancer optimization, and the best low-tax countries for expats and remote workers.",
  },
  alternates: {
    canonical: "https://wheretopaylesstax.com/guides",
  },
};

function GuideCard({ guide }: { guide: GuideData }) {
  const excerpt =
    guide.sections[0]?.content.slice(0, 180) + "..." || guide.metaDescription;

  return (
    <Link
      href={`/guides/${guide.slug}`}
      className="card-hover group block no-underline"
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-2 mb-3">
          <span className={getCategoryColor(guide.category)}>
            {guide.category}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {guide.readTime} min read
          </span>
        </div>

        <h2 className="text-lg font-heading font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {guide.title}
        </h2>

        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 flex-1 leading-relaxed">
          {excerpt}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 dark:border-slate-700">
          <div className="flex flex-wrap gap-1">
            {guide.targetKeywords.slice(0, 2).map((keyword) => (
              <span
                key={keyword}
                className="text-xs px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 rounded"
              >
                {keyword}
              </span>
            ))}
          </div>
          <time
            dateTime={guide.lastUpdated}
            className="text-xs text-slate-400 dark:text-slate-500 shrink-0 ml-2"
          >
            {formatDate(guide.lastUpdated)}
          </time>
        </div>
      </div>
    </Link>
  );
}

export default function GuidesPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const allGuides = getAllGuides();
  const categories = getGuideCategories();
  const activeCategory = searchParams.category || "all";

  const filteredGuides =
    activeCategory === "all"
      ? allGuides
      : allGuides.filter((g) => g.category === activeCategory);

  return (
    <div className="section">
      <div className="page-container">
        {/* Page Header */}
        <div className="max-w-3xl mb-10">
          <h1 className="text-4xl md:text-display font-heading font-bold text-slate-900 dark:text-white mb-4">
            Tax Guides & Articles
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            In-depth guides on international tax planning, digital nomad taxes,
            and strategies to legally reduce your tax burden. Written for
            freelancers, remote workers, and expats.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Link
            href="/guides"
            className={`btn btn-sm no-underline transition-colors ${
              activeCategory === "all"
                ? "bg-primary-600 text-white hover:bg-primary-700"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            All Guides
          </Link>
          {categories.map((category) => (
            <Link
              key={category}
              href={`/guides?category=${encodeURIComponent(category)}`}
              className={`btn btn-sm no-underline transition-colors ${
                activeCategory === category
                  ? "bg-primary-600 text-white hover:bg-primary-700"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {category}
            </Link>
          ))}
        </div>

        {/* Results Count */}
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
          Showing {filteredGuides.length} guide
          {filteredGuides.length !== 1 ? "s" : ""}
          {activeCategory !== "all" ? ` in "${activeCategory}"` : ""}
        </p>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGuides.map((guide) => (
            <GuideCard key={guide.slug} guide={guide} />
          ))}
        </div>

        {/* Empty State */}
        {filteredGuides.length === 0 && (
          <div className="text-center py-16">
            <p className="text-slate-500 dark:text-slate-400 text-lg mb-4">
              No guides found for this category.
            </p>
            <Link href="/guides" className="btn-secondary btn-md no-underline">
              View All Guides
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
