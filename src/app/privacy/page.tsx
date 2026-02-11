import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for WhereToPayLessTax. Learn how we collect, use, and protect your information.",
};

export default function PrivacyPage() {
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
                Privacy Policy
              </li>
            </ol>
          </nav>

          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-6">
            Privacy Policy
          </h1>
          <p className="text-sm text-slate-500 mb-8">
            Last updated: January {new Date().getFullYear()}
          </p>

          <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
            <section>
              <h2 className="text-xl font-heading font-bold mb-3">
                Information We Collect
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                WhereToPayLessTax collects minimal personal information. When
                you visit our site, we may collect anonymous usage data through
                analytics tools, including pages visited, time spent on pages,
                and general geographic location. If you subscribe to our
                newsletter, we collect your email address.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-heading font-bold mb-3">
                Cookies and Tracking
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                We use cookies and similar tracking technologies to analyze
                website traffic and improve user experience. Third-party
                services, including Google Analytics and Google AdSense, may
                place cookies on your device to collect information about your
                browsing activity. Google AdSense uses cookies to serve ads
                based on your prior visits to this website or other websites.
                You can opt out of personalized advertising by visiting{" "}
                <a
                  href="https://www.google.com/settings/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:underline"
                >
                  Google Ads Settings
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-xl font-heading font-bold mb-3">
                How We Use Your Information
              </h2>
              <ul className="list-disc list-outside ml-6 space-y-2 text-slate-600 dark:text-slate-300">
                <li>To provide and maintain our service</li>
                <li>To analyze usage patterns and improve our content</li>
                <li>
                  To send newsletters and updates (only if you have subscribed)
                </li>
                <li>To display relevant advertisements via Google AdSense</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-heading font-bold mb-3">
                Third-Party Services
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                We use the following third-party services that may collect data:
              </p>
              <ul className="list-disc list-outside ml-6 space-y-2 text-slate-600 dark:text-slate-300 mt-2">
                <li>
                  <strong>Google Analytics</strong> - for website traffic
                  analysis
                </li>
                <li>
                  <strong>Google AdSense</strong> - for displaying
                  advertisements
                </li>
                <li>
                  <strong>Vercel</strong> - for website hosting and analytics
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-heading font-bold mb-3">
                Data Retention
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                We retain your personal information only for as long as is
                necessary for the purposes set out in this policy. Analytics
                data is retained in aggregate form. Newsletter subscription data
                is retained until you unsubscribe.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-heading font-bold mb-3">
                Your Rights
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                You have the right to access, correct, or delete your personal
                data. You can unsubscribe from our newsletter at any time using
                the link provided in each email. To exercise any of these
                rights, please contact us.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-heading font-bold mb-3">
                Changes to This Policy
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                We may update this privacy policy from time to time. Any changes
                will be posted on this page with an updated revision date.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-heading font-bold mb-3">
                Contact Us
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                If you have any questions about this Privacy Policy, please{" "}
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
