import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of service for WhereToPayLessTax. Please read these terms carefully before using our website.",
};

export default function TermsPage() {
  return (
    <div className="section">
      <div className="page-container">
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm" aria-label="Breadcrumb">
            <ol className="flex items-center gap-1.5 text-slate-500">
              <li>
                <Link
                  href="/"
                  className="hover:text-primary-600 no-underline text-slate-500"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-slate-800 dark:text-slate-200 font-medium">
                Terms of Service
              </li>
            </ol>
          </nav>

          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-6">
            Terms of Service
          </h1>
          <p className="text-sm text-slate-500 mb-8">
            Last updated: January {new Date().getFullYear()}
          </p>

          <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
            <section>
              <h2 className="text-xl font-heading font-bold mb-3">
                Acceptance of Terms
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                By accessing and using WhereToPayLessTax (&quot;the
                Website&quot;), you agree to be bound by these Terms of Service.
                If you do not agree to these terms, please do not use the
                Website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-heading font-bold mb-3">
                Disclaimer - Informational Purposes Only
              </h2>
              <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg">
                <p className="text-sm text-amber-800 dark:text-amber-200 leading-relaxed">
                  <strong>Important:</strong> All tax data, rates, comparisons,
                  guides, and other content provided on this Website are for
                  general informational purposes only and do not constitute tax,
                  legal, or financial advice. Tax laws and regulations change
                  frequently and may vary based on individual circumstances. You
                  should always consult a qualified tax professional or legal
                  advisor before making any decisions based on information found
                  on this Website.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-heading font-bold mb-3">
                Accuracy of Information
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                While we strive to keep all tax data accurate and up-to-date, we
                make no warranties or representations about the completeness,
                accuracy, reliability, or suitability of the information
                provided. Tax rates and regulations are subject to change
                without notice. We are not responsible for any errors or
                omissions in the content.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-heading font-bold mb-3">
                Limitation of Liability
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                In no event shall WhereToPayLessTax, its owners, operators, or
                contributors be liable for any direct, indirect, incidental,
                consequential, or special damages arising out of or in
                connection with your use of the Website or reliance on any
                information provided herein. This includes, but is not limited
                to, any financial losses resulting from tax decisions made based
                on our content.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-heading font-bold mb-3">
                Intellectual Property
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                All content on this Website, including text, graphics, logos, and
                data compilations, is the property of WhereToPayLessTax and is
                protected by applicable copyright and intellectual property
                laws. You may not reproduce, distribute, or create derivative
                works from this content without prior written permission.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-heading font-bold mb-3">
                Use of the Website
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                You agree to use the Website only for lawful purposes and in a
                manner that does not infringe the rights of, restrict, or
                inhibit anyone else&apos;s use and enjoyment of the Website. You
                shall not use automated tools, bots, or scrapers to access the
                Website without our express permission.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-heading font-bold mb-3">
                Third-Party Links
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                The Website may contain links to third-party websites or
                services that are not owned or controlled by us. We have no
                control over, and assume no responsibility for, the content,
                privacy policies, or practices of any third-party websites.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-heading font-bold mb-3">
                Changes to Terms
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                We reserve the right to modify or replace these Terms of Service
                at any time. Changes will be effective immediately upon posting
                to the Website. Your continued use of the Website after any
                changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-heading font-bold mb-3">
                Contact Us
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                If you have any questions about these Terms of Service, please{" "}
                <Link
                  href="/contact"
                  className="text-primary-600 hover:underline"
                >
                  contact us
                </Link>
                .
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
