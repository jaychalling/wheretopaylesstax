import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllGuides,
  getGuideBySlug,
  getGuidesByCategory,
  getCountryBySlug,
  getComparisonBySlug,
  type GuideData,
  type GuideSection,
} from "@/lib/data";
import { formatDate, getCategoryColor } from "@/lib/utils";
import AdPlaceholder from "@/components/AdPlaceholder";
import TaxDisclaimer from "@/components/TaxDisclaimer";
import NewsletterForm from "@/components/NewsletterForm";

// Generate static params for all 15 guide slugs
export function generateStaticParams() {
  const guides = getAllGuides();
  return guides.map((guide) => ({ slug: guide.slug }));
}

// CTR-optimized overrides for high-opportunity guides (from GSC data)
const GUIDE_CTR_TITLES: Record<string, { title: string; description: string }> = {
  "southeast-asia-tax-guide": {
    title: "Southeast Asia Tax Guide 2026: Thailand, Vietnam, Malaysia & More",
    description: "Southeast Asia tax rates compared: Thailand 0-35%, Vietnam 5-35%, Malaysia territorial system. Digital nomad visas, cost of living & expat strategies for SE Asia.",
  },
  "zero-tax-countries": {
    title: "Zero Tax Countries 2026: 9 Countries with 0% Income Tax",
    description: "Countries with 0% income tax: UAE, Cayman Islands, Bahamas, Monaco & more. Are they really tax-free? Residency requirements, hidden costs & how to qualify.",
  },
  "freelancer-tax-optimization": {
    title: "Freelancer Tax Optimization 2026: Best Countries for Self-Employed",
    description: "Best countries for freelancers: Georgia 1%, Bulgaria 10%, Romania 10%, Estonia 0% on retained profits. Compare freelancer tax rates, social security & visas.",
  },
  "territorial-tax-systems": {
    title: "Territorial Tax Countries 2026: Only Pay Tax on Local Income",
    description: "Territorial tax systems explained: Panama, Costa Rica, Malaysia, Paraguay & more only tax local income. Foreign income = 0% tax. Full country list & strategies.",
  },
  "best-countries-corporate-tax": {
    title: "Lowest Corporate Tax Countries 2026: Where to Register Your Business",
    description: "Lowest corporate tax rates: Hungary 9%, Ireland 12.5%, Bulgaria 10%, UAE 0%. Compare 50+ countries and find the best place to register your company.",
  },
  "lowest-tax-countries-europe": {
    title: "Lowest Tax Countries in Europe 2026: Tax-Friendly EU & Non-EU",
    description: "Europe's lowest tax countries: Bulgaria 10%, Hungary 15%, Romania 10%. Plus non-EU options like Georgia 1%. Expat-friendly regimes & residency routes compared.",
  },
};

// Generate metadata for each guide
export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const guide = getGuideBySlug(params.slug);
  if (!guide) {
    return { title: "Guide Not Found" };
  }

  const ctrOverride = GUIDE_CTR_TITLES[params.slug];
  const title = ctrOverride?.title ?? guide.title;
  const description = ctrOverride?.description ?? guide.metaDescription;

  return {
    title,
    description,
    keywords: guide.targetKeywords,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: `${guide.lastUpdated}-01T00:00:00Z`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `https://wheretopaylesstax.com/guides/${params.slug}`,
    },
  };
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Render content with basic markdown (bold, lists, numbered lists)
function renderContent(content: string) {
  const paragraphs = content.split("\n\n");

  return paragraphs.map((paragraph, pIdx) => {
    // Check if it's a numbered list
    const lines = paragraph.split("\n").filter((l) => l.trim());
    const isNumberedList = lines.every(
      (l) => /^\d+\.\s/.test(l.trim()) || l.trim().startsWith("**")
    );
    const isBulletList = lines.every(
      (l) => l.trim().startsWith("- ") || l.trim().startsWith("* ")
    );

    if (isNumberedList && lines.length > 1) {
      return (
        <ol
          key={pIdx}
          className="list-decimal list-outside ml-6 space-y-2 text-slate-700 dark:text-slate-300"
        >
          {lines.map((line, lIdx) => (
            <li key={lIdx} className="leading-relaxed">
              <span
                dangerouslySetInnerHTML={{
                  __html: line
                    .replace(/^\d+\.\s*/, "")
                    .replace(
                      /\*\*(.*?)\*\*/g,
                      '<strong class="text-slate-900 dark:text-white font-semibold">$1</strong>'
                    ),
                }}
              />
            </li>
          ))}
        </ol>
      );
    }

    if (isBulletList) {
      return (
        <ul
          key={pIdx}
          className="list-disc list-outside ml-6 space-y-2 text-slate-700 dark:text-slate-300"
        >
          {lines.map((line, lIdx) => (
            <li key={lIdx} className="leading-relaxed">
              <span
                dangerouslySetInnerHTML={{
                  __html: line
                    .replace(/^[-*]\s*/, "")
                    .replace(
                      /\*\*(.*?)\*\*/g,
                      '<strong class="text-slate-900 dark:text-white font-semibold">$1</strong>'
                    ),
                }}
              />
            </li>
          ))}
        </ul>
      );
    }

    return (
      <p
        key={pIdx}
        className="text-slate-700 dark:text-slate-300 leading-relaxed"
        dangerouslySetInnerHTML={{
          __html: paragraph.replace(
            /\*\*(.*?)\*\*/g,
            '<strong class="text-slate-900 dark:text-white font-semibold">$1</strong>'
          ),
        }}
      />
    );
  });
}

function SectionContent({ section, index }: { section: GuideSection; index: number }) {
  const headingId = slugify(section.heading);

  return (
    <section id={headingId} className="scroll-mt-24">
      <h2 className="text-2xl font-heading font-bold text-slate-900 dark:text-white mb-4">
        {section.heading}
      </h2>

      <div className="space-y-4">{renderContent(section.content)}</div>

      {/* Render table if present */}
      {section.table && (
        <div className="mt-6 mb-2">
          <h3 className="text-lg font-heading font-semibold text-slate-800 dark:text-slate-200 mb-3">
            {section.table.title}
          </h3>
          <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
            <table className="comparison-table">
              <thead>
                <tr>
                  {section.table.headers.map((header, hIdx) => (
                    <th key={hIdx}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {section.table.rows.map((row, rIdx) => (
                  <tr key={rIdx}>
                    {row.map((cell, cIdx) => (
                      <td
                        key={cIdx}
                        className={cIdx === 0 ? "font-medium" : ""}
                        dangerouslySetInnerHTML={{
                          __html: cell.replace(
                            /\*\*(.*?)\*\*/g,
                            "<strong>$1</strong>"
                          ),
                        }}
                      />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Ad between sections (every 2 sections) */}
      {index % 2 === 1 && (
        <div className="flex justify-center my-8">
          <AdPlaceholder size="banner" />
        </div>
      )}
    </section>
  );
}

function TableOfContents({ sections }: { sections: GuideSection[] }) {
  return (
    <nav
      aria-label="Table of contents"
      className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg p-5"
    >
      <h3 className="text-sm font-heading font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
        Table of Contents
      </h3>
      <ol className="space-y-2">
        {sections.map((section, idx) => (
          <li key={idx}>
            <a
              href={`#${slugify(section.heading)}`}
              className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 no-underline transition-colors leading-snug block"
            >
              {idx + 1}. {section.heading}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function RelatedGuidesSidebar({
  currentSlug,
  category,
}: {
  currentSlug: string;
  category: string;
}) {
  const relatedGuides = getGuidesByCategory(category).filter(
    (g) => g.slug !== currentSlug
  );

  if (relatedGuides.length === 0) return null;

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-5">
      <h3 className="text-sm font-heading font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
        Related Guides
      </h3>
      <ul className="space-y-3">
        {relatedGuides.slice(0, 5).map((guide) => (
          <li key={guide.slug}>
            <Link
              href={`/guides/${guide.slug}`}
              className="block no-underline group"
            >
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors leading-snug block">
                {guide.title}
              </span>
              <span className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 block">
                {guide.readTime} min read
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function RelatedCountries({ countrySlugs }: { countrySlugs: string[] }) {
  const countries = countrySlugs
    .map((slug) => getCountryBySlug(slug))
    .filter(Boolean);

  if (countries.length === 0) return null;

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-5">
      <h3 className="text-sm font-heading font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
        Countries Mentioned
      </h3>
      <div className="flex flex-wrap gap-2">
        {countries.map((country) =>
          country ? (
            <Link
              key={country.slug}
              href={`/countries/${country.slug}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 dark:bg-slate-700 text-sm text-slate-700 dark:text-slate-300 rounded-md hover:bg-primary-50 dark:hover:bg-primary-950 hover:text-primary-600 dark:hover:text-primary-400 no-underline transition-colors"
            >
              <span>{country.flag}</span>
              <span>{country.name}</span>
            </Link>
          ) : null
        )}
      </div>
    </div>
  );
}

function RelatedComparisons({ comparisonSlugs }: { comparisonSlugs: string[] }) {
  const comparisons = comparisonSlugs
    .map((slug) => {
      const data = getComparisonBySlug(slug);
      if (!data) return null;
      return { slug, countryA: data.countryA, countryB: data.countryB };
    })
    .filter(Boolean);

  if (comparisons.length === 0) return null;

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-5">
      <h3 className="text-sm font-heading font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
        Related Comparisons
      </h3>
      <ul className="space-y-2">
        {comparisons.map((comp) =>
          comp ? (
            <li key={comp.slug}>
              <Link
                href={`/compare/${comp.slug}`}
                className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 no-underline transition-colors"
              >
                <span>{comp.countryA.flag}</span>
                <span className="font-medium">{comp.countryA.name} vs {comp.countryB.name}</span>
                <span className="text-slate-400">&rarr;</span>
              </Link>
            </li>
          ) : null
        )}
      </ul>
    </div>
  );
}

// FAQPage structured data generated from guide sections
function FAQPageJsonLd({ guide }: { guide: GuideData }) {
  // Generate FAQ items from sections that have question-like headings or substantial content
  const faqItems = guide.sections
    .filter((s) => s.content.length > 50)
    .slice(0, 6)
    .map((section) => {
      // Use heading as question, first ~300 chars of content as answer
      const question = section.heading.endsWith("?")
        ? section.heading
        : `What about ${section.heading.toLowerCase()}?`;
      const answer = section.content
        .replace(/\*\*/g, "")
        .replace(/\n/g, " ")
        .slice(0, 300)
        .trim();
      return {
        "@type": "Question" as const,
        name: question,
        acceptedAnswer: {
          "@type": "Answer" as const,
          text: answer + (section.content.length > 300 ? "..." : ""),
        },
      };
    });

  if (faqItems.length === 0) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// Structured data for the article
function ArticleJsonLd({ guide }: { guide: GuideData }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.metaDescription,
    datePublished: `${guide.lastUpdated}-01T00:00:00Z`,
    dateModified: `${guide.lastUpdated}-01T00:00:00Z`,
    author: {
      "@type": "Organization",
      name: "WhereToPayLessTax",
      url: "https://wheretopaylesstax.com",
    },
    publisher: {
      "@type": "Organization",
      name: "WhereToPayLessTax",
      url: "https://wheretopaylesstax.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://wheretopaylesstax.com/guides/${guide.slug}`,
    },
    keywords: guide.targetKeywords.join(", "),
    articleSection: guide.category,
    wordCount: guide.sections.reduce(
      (acc, s) => acc + s.content.split(/\s+/).length,
      0
    ),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function GuideDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const guide = getGuideBySlug(params.slug);

  if (!guide) {
    notFound();
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://wheretopaylesstax.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Guides",
        item: "https://wheretopaylesstax.com/guides",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: guide.title,
        item: `https://wheretopaylesstax.com/guides/${guide.slug}`,
      },
    ],
  };

  return (
    <>
      <ArticleJsonLd guide={guide} />
      <FAQPageJsonLd guide={guide} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="section">
        <div className="page-container">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-6 text-sm text-slate-500 dark:text-slate-400"
          >
            <ol className="flex items-center gap-2">
              <li>
                <Link
                  href="/"
                  className="hover:text-primary-600 dark:hover:text-primary-400 no-underline"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  href="/guides"
                  className="hover:text-primary-600 dark:hover:text-primary-400 no-underline"
                >
                  Guides
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-slate-700 dark:text-slate-300 truncate">
                {guide.title}
              </li>
            </ol>
          </nav>

          {/* Article Header */}
          <header className="max-w-3xl mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className={getCategoryColor(guide.category)}>
                {guide.category}
              </span>
              <span className="text-sm text-slate-500 dark:text-slate-400">
                {guide.readTime} min read
              </span>
              <time
                dateTime={guide.lastUpdated}
                className="text-sm text-slate-500 dark:text-slate-400"
              >
                Updated {formatDate(guide.lastUpdated)}
              </time>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-display font-heading font-bold text-slate-900 dark:text-white mb-4 text-balance">
              {guide.title}
            </h1>

            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              {guide.metaDescription}
            </p>
          </header>

          {/* Layout: Content + Sidebar */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Main Content */}
            <article className="flex-1 min-w-0 max-w-3xl">
              {/* Mobile Table of Contents */}
              <div className="lg:hidden mb-8">
                <TableOfContents sections={guide.sections} />
              </div>

              {/* Article Sections */}
              <div className="space-y-10">
                {guide.sections.map((section, idx) => (
                  <SectionContent key={idx} section={section} index={idx} />
                ))}
              </div>

              {/* Disclaimer */}
              <div className="mt-12">
                <TaxDisclaimer />
              </div>

              {/* Newsletter CTA */}
              <div className="mt-10">
                <NewsletterForm variant="card" />
              </div>

              {/* Bottom Ad */}
              <div className="flex justify-center mt-10">
                <AdPlaceholder size="leaderboard" />
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:w-80 shrink-0 space-y-6">
              {/* Desktop Table of Contents */}
              <div className="hidden lg:block lg:sticky lg:top-24">
                <div className="space-y-6">
                  <TableOfContents sections={guide.sections} />
                  <RelatedComparisons comparisonSlugs={guide.relatedComparisons} />
                  <RelatedCountries countrySlugs={guide.relatedCountries} />
                  <RelatedGuidesSidebar
                    currentSlug={guide.slug}
                    category={guide.category}
                  />

                  {/* Sidebar Ad */}
                  <div className="flex justify-center">
                    <AdPlaceholder size="rectangle" />
                  </div>
                </div>
              </div>

              {/* Mobile only sidebar content */}
              <div className="lg:hidden space-y-6">
                <RelatedComparisons comparisonSlugs={guide.relatedComparisons} />
                <RelatedCountries countrySlugs={guide.relatedCountries} />
                <RelatedGuidesSidebar
                  currentSlug={guide.slug}
                  category={guide.category}
                />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
