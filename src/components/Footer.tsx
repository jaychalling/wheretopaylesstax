import Link from "next/link";
import NewsletterForm from "./NewsletterForm";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: "Explore",
    links: [
      { label: "All Countries", href: "/countries" },
      { label: "Tax Rankings", href: "/rankings" },
      { label: "Compare Countries", href: "/compare" },
      { label: "Tax Guides", href: "/guides" },
    ],
  },
  {
    title: "Popular Countries",
    links: [
      { label: "Portugal", href: "/countries/portugal" },
      { label: "UAE (Dubai)", href: "/countries/uae" },
      { label: "Singapore", href: "/countries/singapore" },
      { label: "Estonia", href: "/countries/estonia" },
      { label: "Georgia", href: "/countries/georgia" },
    ],
  },
  {
    title: "Tax Guides",
    links: [
      { label: "Digital Nomad Tax Guide", href: "/guides/tax-guide-digital-nomads" },
      { label: "Zero Tax Countries", href: "/guides/zero-tax-countries" },
      { label: "Crypto Tax Guide", href: "/guides/crypto-tax-friendly-countries" },
      { label: "Low Tax Europe", href: "/guides/lowest-tax-countries-europe" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300">
      {/* Newsletter Section */}
      <div className="border-b border-slate-800">
        <div className="page-container py-10">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-xl font-heading font-bold text-white mb-2">
              Stay Updated on Global Tax Changes
            </h3>
            <p className="text-slate-400 mb-4 text-sm font-body">
              Get weekly insights on tax optimization, nomad visas, and country comparisons.
            </p>
            <NewsletterForm variant="footer" />
          </div>
        </div>
      </div>

      {/* Link Sections */}
      <div className="page-container py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-heading font-semibold text-white uppercase tracking-wider mb-3">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors no-underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-700">
        <div className="page-container py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500">
              &copy; {currentYear} WhereToPayLessTax. All rights reserved.
            </p>
            <p className="text-xs text-slate-500">
              Tax data is for informational purposes only. Always consult a qualified tax professional.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
