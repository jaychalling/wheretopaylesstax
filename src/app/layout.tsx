import type { Metadata } from "next";
import { Lexend, Source_Sans_3 } from "next/font/google";
import localFont from "next/font/local";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

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
  metadataBase: new URL("https://wheretopayless.tax"),
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
  },
  twitter: {
    card: "summary_large_image",
    title: "WhereToPayLessTax - Compare Taxes. Move Smarter.",
    description:
      "Compare tax rates across 50+ countries for digital nomads and expats.",
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
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
