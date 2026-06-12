import type { Metadata } from "next";
import Script from "next/script";
import { Lexend, Source_Sans_3 } from "next/font/google";
import localFont from "next/font/local";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

// AdSense is only loaded when NEXT_PUBLIC_ADSENSE_CLIENT is set (no hardcoded ca-pub ID).
const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || "G-R8QPDPEK50";

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://wheretopaylesstax.com"),
  title: {
    default: "WhereToPayLessTax - Compare Taxes. Move Smarter.",
    template: "%s | WhereToPayLessTax",
  },
  description:
    "Compare tax rates across 50+ countries. Find the best places to live and work as a digital nomad, freelancer, or expat. Income tax, corporate tax, VAT, and more.",
  keywords: [
    "tax comparison",
    "digital nomad taxes",
    "low tax countries",
    "expat tax guide",
    "corporate tax rates",
    "income tax by country",
    "tax-friendly countries",
    "remote worker taxes",
  ],
  openGraph: {
    title: "WhereToPayLessTax - Compare Taxes. Move Smarter.",
    description:
      "Compare income tax, corporate tax, and cost of living across 50+ countries. Make smarter decisions about where to live and work.",
    type: "website",
    locale: "en_US",
    siteName: "WhereToPayLessTax",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "WhereToPayLessTax - Compare Tax Rates by Country",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WhereToPayLessTax - Compare Taxes. Move Smarter.",
    description:
      "Compare tax rates across 50+ countries for digital nomads and expats.",
    images: ["/opengraph-image"],
  },
  icons: {
    icon: "/favicon.svg",
  },
  verification: {
    google: "yRn3qVqybCBilrJ_3DnMWXamYnhiJAkqXUCbNp-aNQk",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${lexend.variable} ${sourceSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-body antialiased min-h-screen flex flex-col">
        <Script
          id="ga-loader"
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga-config" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');`}
        </Script>
        {ADSENSE_CLIENT && (
          <Script
            id="adsense-loader"
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://wheretopaylesstax.com/#organization",
                  name: "WhereToPayLessTax",
                  url: "https://wheretopaylesstax.com",
                  description:
                    "Compare tax rates across 50+ countries for digital nomads, freelancers, and expats.",
                },
                {
                  "@type": "WebSite",
                  "@id": "https://wheretopaylesstax.com/#website",
                  url: "https://wheretopaylesstax.com",
                  name: "WhereToPayLessTax",
                  publisher: {
                    "@id": "https://wheretopaylesstax.com/#organization",
                  },
                  potentialAction: {
                    "@type": "SearchAction",
                    target: {
                      "@type": "EntryPoint",
                      urlTemplate:
                        "https://wheretopaylesstax.com/countries?q={search_term_string}",
                    },
                    "query-input": "required name=search_term_string",
                  },
                },
              ],
            }),
          }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
