import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with WhereToPayLessTax. Have questions, feedback, or suggestions? We would love to hear from you.",
};

export default function ContactPage() {
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
                Contact
              </li>
            </ol>
          </nav>

          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
            Have questions, feedback, or suggestions? We would love to hear from
            you.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Email Contact */}
            <div className="card">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary-50 dark:bg-primary-950/30 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-primary-600 dark:text-primary-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                </div>
                <h2 className="text-lg font-heading font-semibold">Email</h2>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
                For general inquiries, data corrections, or partnership
                opportunities:
              </p>
              <a
                href="mailto:hello@wheretopayless.tax"
                className="text-primary-600 dark:text-primary-400 hover:underline font-medium"
              >
                hello@wheretopayless.tax
              </a>
            </div>

            {/* Data Corrections */}
            <div className="card">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary-50 dark:bg-primary-950/30 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-primary-600 dark:text-primary-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                    />
                  </svg>
                </div>
                <h2 className="text-lg font-heading font-semibold">
                  Data Corrections
                </h2>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
                Found incorrect tax data or outdated information? Let us know
                and we will update it promptly.
              </p>
              <a
                href="mailto:data@wheretopayless.tax"
                className="text-primary-600 dark:text-primary-400 hover:underline font-medium"
              >
                data@wheretopayless.tax
              </a>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-10 p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg">
            <p className="text-sm text-amber-800 dark:text-amber-200">
              <strong>Please note:</strong> We are not tax advisors. We cannot
              provide personalized tax advice. For specific tax questions about
              your situation, please consult a qualified tax professional in
              your jurisdiction.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
