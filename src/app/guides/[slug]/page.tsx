import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllGuides,
  getGuideBySlug,
  getGuidesByCategory,
  getCountryBySlug,
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

  return {
    title: guide.title,
    description: guide.metaDescription,
    keywords: guide.targetKeywords,
    openGraph: {
      title: guide.title,
      description: guide.metaDescription,
      type: "article",
      publishedTime: `${guide.lastUpdated}-01T00:00:00Z`,
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: guide.metaDescription,
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
