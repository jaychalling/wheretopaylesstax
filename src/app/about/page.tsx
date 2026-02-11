import type { Metadata } from "next";
import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "About WhereToPayLessTax",
  description:
    "Learn about WhereToPayLessTax — our mission, data methodology, and how we help digital nomads, freelancers, and expats find tax-efficient countries.",
  openGraph: {
    title: "About WhereToPayLessTax",
    description:
      "Learn about our mission, data methodology, and how we help people find tax-efficient countries.",
  },
};

function SectionCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="card">
      <div className="flex items-start gap-4">
        <div className="shrink-0 w-10 h-10 bg-primary-50 dark:bg-primary-950/30 rounded-lg flex items-center justify-center text-primary-600 dark:text-primary-400">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-heading font-bold text-slate-900 dark:text-white mb-2">
            {title}
          </h3>
          <div className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed space-y-3">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="section">
      <div className="page-container">
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-display font-heading font-bold text-slate-900 dark:text-white mb-6">
            Compare Taxes.{" "}
            <span className="text-primary-600 dark:text-primary-400">
              Move Smarter.
            </span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            WhereToPayLessTax is a free, independent resource that helps digital
            nomads, freelancers, remote workers, and expats understand and
            compare tax systems across 50+ countries. We believe everyone
            deserves access to clear, actionable tax information.
          </p>
        </div>

        {/* Mission Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-heading font-bold text-slate-900 dark:text-white mb-8 text-center">
            Our Mission
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SectionCard
              icon={
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                  />
                </svg>
              }
              title="Democratize Tax Information"
            >
              <p>
                International tax planning has traditionally been the domain of
                the wealthy with expensive advisors. We make this information
                accessible to everyone for free.
              </p>
            </SectionCard>

            <SectionCard
              icon={
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                  />
                </svg>
              }
              title="Data-Driven Comparisons"
            >
              <p>
                Side-by-side comparisons of income tax, corporate tax, VAT,
                capital gains, cost of living, and quality of life across 50+
                countries, all in one place.
              </p>
            </SectionCard>

            <SectionCard
              icon={
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                  />
                </svg>
              }
              title="Honest & Unbiased"
            >
              <p>
                We present both pros and cons of every jurisdiction. We are not
                affiliated with any government, visa agency, or tax advisory
                firm. Our revenue comes solely from advertising.
              </p>
            </SectionCard>
          </div>
        </section>

        {/* How We Collect Data */}
        <section className="mb-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-heading font-bold text-slate-900 dark:text-white mb-6">
              How We Collect Data
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              Our tax data is compiled through a rigorous research methodology
              to ensure accuracy and timeliness. Here is how we gather and
              maintain our information:
            </p>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="shrink-0 w-8 h-8 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full flex items-center justify-center text-sm font-bold font-heading">
                  1
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-slate-900 dark:text-white mb-1">
                    Official Government Sources
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Tax rates and brackets are sourced primarily from national
                    tax authority websites, government gazettes, and official
                    revenue service publications. These include the IRS (USA),
                    HMRC (UK), ATO (Australia), and equivalent bodies in each
                    country.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0 w-8 h-8 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full flex items-center justify-center text-sm font-bold font-heading">
                  2
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-slate-900 dark:text-white mb-1">
                    International Organizations
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    We cross-reference data with OECD Tax Database, World Bank,
                    IMF fiscal reports, and PwC/Deloitte/EY worldwide tax
                    summaries for accuracy.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0 w-8 h-8 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full flex items-center justify-center text-sm font-bold font-heading">
                  3
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-slate-900 dark:text-white mb-1">
                    Cost of Living & Quality of Life
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Cost of living indices are derived from Numbeo, Expatistan,
                    and internal surveys. Quality of life scores incorporate UN
                    Human Development Index, Mercer Quality of Living surveys,
                    and healthcare/safety indices.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0 w-8 h-8 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full flex items-center justify-center text-sm font-bold font-heading">
                  4
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-slate-900 dark:text-white mb-1">
                    Regular Updates
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Tax data is reviewed and updated at least quarterly. When
                    major tax reforms are announced, we update the affected
                    country data within days. Each country page shows its last
                    update date.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Data Sources Disclaimer */}
        <section className="mb-16">
          <div className="max-w-3xl mx-auto">
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-6">
              <h2 className="text-xl font-heading font-bold text-amber-900 dark:text-amber-100 mb-3">
                Important Disclaimer
              </h2>
              <div className="space-y-3 text-sm text-amber-800 dark:text-amber-200 leading-relaxed">
                <p>
                  The information provided on WhereToPayLessTax is for{" "}
                  <strong>general informational purposes only</strong> and does
                  not constitute tax, legal, or financial advice.
                </p>
                <p>
                  Tax laws are complex and change frequently. The rates,
                  thresholds, and rules presented may not reflect the most recent
                  changes. Individual tax situations vary based on income type,
                  citizenship, residency status, applicable tax treaties, and
                  many other factors.
                </p>
                <p>
                  <strong>
                    Always consult a qualified tax professional or licensed
                    advisor
                  </strong>{" "}
                  before making decisions about your tax residency, business
                  structure, or financial planning based on the information found
                  on this website.
                </p>
                <p>
                  We make every effort to keep data accurate and up-to-date, but
                  we cannot guarantee the accuracy, completeness, or timeliness
                  of all information. WhereToPayLessTax accepts no liability for
                  any loss or damage arising from reliance on this data.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Who This Is For */}
        <section className="mb-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-heading font-bold text-slate-900 dark:text-white mb-6">
              Who Is This For?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  label: "Digital Nomads",
                  desc: "Find the best countries for remote work with favorable tax treatment and nomad visas.",
                },
                {
                  label: "Freelancers",
                  desc: "Compare self-employment tax rates, social security, and freelancer-friendly regimes.",
                },
                {
                  label: "Expats",
                  desc: "Understand tax implications before relocating, including exit taxes and treaty benefits.",
                },
                {
                  label: "Startup Founders",
                  desc: "Find optimal jurisdictions for company incorporation with low corporate tax.",
                },
                {
                  label: "Investors",
                  desc: "Compare capital gains tax and dividend tax rates across jurisdictions.",
                },
                {
                  label: "Retirees",
                  desc: "Discover countries with favorable pension taxation and low cost of living.",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg"
                >
                  <svg
                    className="w-5 h-5 text-success-600 dark:text-success-500 shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                  <div>
                    <span className="font-heading font-semibold text-slate-900 dark:text-white text-sm block">
                      {item.label}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {item.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact / Feedback */}
        <section className="mb-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-8">
              <h2 className="text-2xl font-heading font-bold text-slate-900 dark:text-white mb-4">
                Contact & Feedback
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                Found an error in our data? Have a suggestion for improvement?
                Want to contribute? We would love to hear from you.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-slate-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                  <span className="text-sm text-slate-700 dark:text-slate-300">
                    Email:{" "}
                    <a
                      href="mailto:hello@wheretopayless.tax"
                      className="text-primary-600 dark:text-primary-400 no-underline hover:underline"
                    >
                      hello@wheretopayless.tax
                    </a>
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-slate-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 12.75c1.148 0 2.278.08 3.383.237 1.037.146 1.866.966 1.866 2.013 0 3.728-2.35 6.75-5.25 6.75S6.75 18.728 6.75 15c0-1.046.83-1.867 1.866-2.013A24.204 24.204 0 0112 12.75zm0 0c2.883 0 5.647.508 8.207 1.44a23.91 23.91 0 01-1.152 3.31M12 12.75c-2.883 0-5.647.508-8.208 1.44.125 1.166.456 2.296.956 3.31M12 12.75V4.5m0 0a2.25 2.25 0 10-4.5 0 2.25 2.25 0 004.5 0z"
                    />
                  </svg>
                  <span className="text-sm text-slate-700 dark:text-slate-300">
                    Data corrections:{" "}
                    <a
                      href="mailto:data@wheretopayless.tax"
                      className="text-primary-600 dark:text-primary-400 no-underline hover:underline"
                    >
                      data@wheretopayless.tax
                    </a>
                  </span>
                </div>
              </div>

              <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                <h3 className="text-lg font-heading font-semibold text-slate-900 dark:text-white mb-2">
                  Stay Updated
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  Subscribe to get notified about tax changes, new country data,
                  and optimization strategies.
                </p>
                <NewsletterForm variant="inline" />
              </div>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-xl font-heading font-semibold text-slate-900 dark:text-white mb-4">
              Start Exploring
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/countries"
                className="btn-secondary btn-md no-underline"
              >
                Browse Countries
              </Link>
              <Link
                href="/compare"
                className="btn-primary btn-md no-underline text-slate-900"
              >
                Compare Countries
              </Link>
              <Link
                href="/guides"
                className="btn-outline btn-md no-underline"
              >
                Read Guides
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
