import { PrismaClient } from "../src/generated/prisma/client.js";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();

interface TaxBracket {
  min: number;
  max: number | null;
  rate: number;
}

interface IncomeTax {
  brackets: TaxBracket[];
  topRate: number;
  notes: string;
}

interface CorporateTax {
  standardRate: number;
  smallBusinessRate?: number | null;
  notes: string;
}

interface VAT {
  standardRate: number;
  reducedRates: number[];
  notes: string;
}

interface CapitalGainsTax {
  rate: number;
  longTermRate?: number | null;
  notes: string;
}

interface SocialSecurity {
  employeeRate: number;
  employerRate: number;
  selfEmployedRate?: number | null;
  notes: string;
}

interface SpecialRegime {
  name: string;
  description: string;
  eligibility: string;
}

interface CountryData {
  slug: string;
  name: string;
  flag: string;
  region: string;
  currency: string;
  incomeTax: IncomeTax;
  corporateTax: CorporateTax;
  vat: VAT;
  capitalGainsTax: CapitalGainsTax;
  socialSecurity: SocialSecurity;
  specialRegimes: SpecialRegime[];
  taxTreaties: number;
  costOfLivingIndex: number;
  qualityOfLifeIndex: number;
  digitalNomadVisa: boolean;
  digitalNomadVisaDetails: string | null;
  summary: string;
  pros: string[];
  cons: string[];
  bestFor: string[];
  lastUpdated: string;
}

interface GuideData {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedDate: string;
  tags: string[];
  metaDescription: string;
}

async function main() {
  console.log("Starting seed...");

  // Read data files
  const countriesPath = path.join(__dirname, "..", "data", "countries.json");
  const guidesPath = path.join(__dirname, "..", "data", "guides.json");

  const countriesData: CountryData[] = JSON.parse(
    fs.readFileSync(countriesPath, "utf-8")
  );
  const guidesData: GuideData[] = JSON.parse(
    fs.readFileSync(guidesPath, "utf-8")
  );

  console.log(`Found ${countriesData.length} countries and ${guidesData.length} guides`);

  // Clear existing data
  console.log("Clearing existing data...");
  await prisma.comparison.deleteMany();
  await prisma.guide.deleteMany();
  await prisma.country.deleteMany();

  // Seed countries
  console.log("Seeding countries...");
  const countryMap: Record<string, number> = {};

  for (const c of countriesData) {
    const country = await prisma.country.create({
      data: {
        slug: c.slug,
        name: c.name,
        flag: c.flag,
        region: c.region,
        currency: c.currency,
        incomeTaxTopRate: c.incomeTax.topRate,
        incomeTaxBrackets: JSON.stringify(c.incomeTax.brackets),
        incomeTaxNotes: c.incomeTax.notes,
        corporateTaxRate: c.corporateTax.standardRate,
        corporateTaxSmallBizRate: c.corporateTax.smallBusinessRate ?? null,
        corporateTaxNotes: c.corporateTax.notes,
        vatStandardRate: c.vat.standardRate,
        vatReducedRates: JSON.stringify(c.vat.reducedRates),
        vatNotes: c.vat.notes,
        capitalGainsTaxRate: c.capitalGainsTax.rate,
        capitalGainsTaxLongTerm: c.capitalGainsTax.longTermRate ?? null,
        capitalGainsTaxNotes: c.capitalGainsTax.notes,
        socialSecurityEmployee: c.socialSecurity.employeeRate,
        socialSecurityEmployer: c.socialSecurity.employerRate,
        socialSecuritySelfEmployed: c.socialSecurity.selfEmployedRate ?? null,
        socialSecurityNotes: c.socialSecurity.notes,
        specialRegimes: JSON.stringify(c.specialRegimes),
        taxTreaties: c.taxTreaties,
        costOfLivingIndex: c.costOfLivingIndex,
        qualityOfLifeIndex: c.qualityOfLifeIndex,
        digitalNomadVisa: c.digitalNomadVisa,
        digitalNomadVisaDetails: c.digitalNomadVisaDetails ?? null,
        summary: c.summary,
        pros: JSON.stringify(c.pros),
        cons: JSON.stringify(c.cons),
        bestFor: JSON.stringify(c.bestFor),
        lastUpdated: c.lastUpdated,
      },
    });
    countryMap[c.slug] = country.id;
  }
  console.log(`Seeded ${Object.keys(countryMap).length} countries`);

  // Seed guides
  console.log("Seeding guides...");
  for (const g of guidesData) {
    await prisma.guide.create({
      data: {
        slug: g.slug,
        title: g.title,
        excerpt: g.excerpt,
        content: g.content,
        tags: g.tags.join(","),
        author: g.author,
        metaDescription: g.metaDescription,
        publishedAt: new Date(g.publishedDate),
      },
    });
  }
  console.log(`Seeded ${guidesData.length} guides`);

  // Generate 20 comparison combinations
  console.log("Generating comparisons...");
  const comparisonPairs: [string, string][] = [
    ["portugal", "spain"],
    ["ireland", "netherlands"],
    ["uae", "singapore"],
    ["germany", "switzerland"],
    ["usa", "united-kingdom"],
    ["estonia", "bulgaria"],
    ["thailand", "vietnam"],
    ["panama", "costa-rica"],
    ["hong-kong", "singapore"],
    ["france", "germany"],
    ["italy", "greece"],
    ["cyprus", "malta"],
    ["romania", "hungary"],
    ["canada", "australia"],
    ["japan", "south-korea"],
    ["malaysia", "indonesia"],
    ["brazil", "colombia"],
    ["georgia", "romania"],
    ["cayman-islands", "bahamas"],
    ["luxembourg", "switzerland"],
  ];

  for (const [slugA, slugB] of comparisonPairs) {
    const idA = countryMap[slugA];
    const idB = countryMap[slugB];

    if (!idA || !idB) {
      console.warn(`Skipping comparison: ${slugA} vs ${slugB} (missing country)`);
      continue;
    }

    const nameA = countriesData.find((c) => c.slug === slugA)?.name ?? slugA;
    const nameB = countriesData.find((c) => c.slug === slugB)?.name ?? slugB;

    await prisma.comparison.create({
      data: {
        slug: `${slugA}-vs-${slugB}`,
        countryAId: idA,
        countryBId: idB,
        metaTitle: `${nameA} vs ${nameB} Tax Comparison`,
        metaDescription: `Compare tax rates between ${nameA} and ${nameB}. Income tax, corporate tax, VAT, capital gains, and more side by side.`,
      },
    });
  }
  console.log(`Seeded ${comparisonPairs.length} comparisons`);

  // Final counts
  const countryCount = await prisma.country.count();
  const guideCount = await prisma.guide.count();
  const comparisonCount = await prisma.comparison.count();

  console.log("\n=== Seed Complete ===");
  console.log(`Countries: ${countryCount}`);
  console.log(`Guides: ${guideCount}`);
  console.log(`Comparisons: ${comparisonCount}`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("Seed error:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
