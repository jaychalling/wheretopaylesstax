// Seed script using better-sqlite3 directly to avoid Prisma client ESM/CJS conflicts
const Database = require("better-sqlite3");
const fs = require("fs");
const path = require("path");

const DB_PATH = path.join(__dirname, "..", "dev.db");
const COUNTRIES_PATH = path.join(__dirname, "..", "data", "countries.json");
const GUIDES_PATH = path.join(__dirname, "..", "data", "guides.json");

const db = new Database(DB_PATH);
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

function main() {
  console.log("Starting seed...");
  console.log(`Database: ${DB_PATH}`);

  const countriesData = JSON.parse(fs.readFileSync(COUNTRIES_PATH, "utf-8"));
  const guidesData = JSON.parse(fs.readFileSync(GUIDES_PATH, "utf-8"));

  console.log(`Found ${countriesData.length} countries and ${guidesData.length} guides`);

  // Clear existing data (order matters for foreign keys)
  console.log("Clearing existing data...");
  db.exec("DELETE FROM comparisons");
  db.exec("DELETE FROM guides");
  db.exec("DELETE FROM countries");

  // Seed countries
  console.log("Seeding countries...");
  const insertCountry = db.prepare(`
    INSERT INTO countries (
      slug, name, flag, region, currency,
      income_tax_top_rate, income_tax_brackets, income_tax_notes,
      corporate_tax_rate, corporate_tax_small_biz_rate, corporate_tax_notes,
      vat_standard_rate, vat_reduced_rates, vat_notes,
      capital_gains_tax_rate, capital_gains_tax_long_term, capital_gains_tax_notes,
      social_security_employee, social_security_employer, social_security_self_employed, social_security_notes,
      special_regimes,
      tax_treaties, cost_of_living_index, quality_of_life_index,
      digital_nomad_visa, digital_nomad_visa_details,
      summary, pros, cons, best_for,
      last_updated,
      created_at, updated_at
    ) VALUES (
      @slug, @name, @flag, @region, @currency,
      @incomeTaxTopRate, @incomeTaxBrackets, @incomeTaxNotes,
      @corporateTaxRate, @corporateTaxSmallBizRate, @corporateTaxNotes,
      @vatStandardRate, @vatReducedRates, @vatNotes,
      @capitalGainsTaxRate, @capitalGainsTaxLongTerm, @capitalGainsTaxNotes,
      @socialSecurityEmployee, @socialSecurityEmployer, @socialSecuritySelfEmployed, @socialSecurityNotes,
      @specialRegimes,
      @taxTreaties, @costOfLivingIndex, @qualityOfLifeIndex,
      @digitalNomadVisa, @digitalNomadVisaDetails,
      @summary, @pros, @cons, @bestFor,
      @lastUpdated,
      @createdAt, @updatedAt
    )
  `);

  const countryMap = {};
  const now = new Date().toISOString();

  const insertCountries = db.transaction((countries) => {
    for (const c of countries) {
      const result = insertCountry.run({
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
        digitalNomadVisa: c.digitalNomadVisa ? 1 : 0,
        digitalNomadVisaDetails: c.digitalNomadVisaDetails ?? null,
        summary: c.summary,
        pros: JSON.stringify(c.pros),
        cons: JSON.stringify(c.cons),
        bestFor: JSON.stringify(c.bestFor),
        lastUpdated: c.lastUpdated,
        createdAt: now,
        updatedAt: now,
      });
      countryMap[c.slug] = result.lastInsertRowid;
    }
  });

  insertCountries(countriesData);
  console.log(`Seeded ${Object.keys(countryMap).length} countries`);

  // Seed guides
  console.log("Seeding guides...");
  const insertGuide = db.prepare(`
    INSERT INTO guides (
      slug, title, excerpt, content, tags, author,
      meta_description, published_at,
      created_at, updated_at
    ) VALUES (
      @slug, @title, @excerpt, @content, @tags, @author,
      @metaDescription, @publishedAt,
      @createdAt, @updatedAt
    )
  `);

  const insertGuides = db.transaction((guides) => {
    for (const g of guides) {
      insertGuide.run({
        slug: g.slug,
        title: g.title,
        excerpt: g.excerpt,
        content: g.content,
        tags: g.tags.join(","),
        author: g.author,
        metaDescription: g.metaDescription,
        publishedAt: new Date(g.publishedDate).toISOString(),
        createdAt: now,
        updatedAt: now,
      });
    }
  });

  insertGuides(guidesData);
  console.log(`Seeded ${guidesData.length} guides`);

  // Generate 20 comparison combinations
  console.log("Generating comparisons...");
  const insertComparison = db.prepare(`
    INSERT INTO comparisons (
      slug, country_a_id, country_b_id,
      meta_title, meta_description,
      created_at, updated_at
    ) VALUES (
      @slug, @countryAId, @countryBId,
      @metaTitle, @metaDescription,
      @createdAt, @updatedAt
    )
  `);

  const comparisonPairs = [
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

  let compCount = 0;
  const insertComparisons = db.transaction((pairs) => {
    for (const [slugA, slugB] of pairs) {
      const idA = countryMap[slugA];
      const idB = countryMap[slugB];

      if (!idA || !idB) {
        console.warn(`Skipping comparison: ${slugA} vs ${slugB} (missing country)`);
        continue;
      }

      const nameA = countriesData.find((c) => c.slug === slugA)?.name ?? slugA;
      const nameB = countriesData.find((c) => c.slug === slugB)?.name ?? slugB;

      insertComparison.run({
        slug: `${slugA}-vs-${slugB}`,
        countryAId: Number(idA),
        countryBId: Number(idB),
        metaTitle: `${nameA} vs ${nameB} Tax Comparison`,
        metaDescription: `Compare tax rates between ${nameA} and ${nameB}. Income tax, corporate tax, VAT, capital gains, and more side by side.`,
        createdAt: now,
        updatedAt: now,
      });
      compCount++;
    }
  });

  insertComparisons(comparisonPairs);
  console.log(`Seeded ${compCount} comparisons`);

  // Final counts
  const countryCount = db.prepare("SELECT COUNT(*) as count FROM countries").get().count;
  const guideCount = db.prepare("SELECT COUNT(*) as count FROM guides").get().count;
  const comparisonCount = db.prepare("SELECT COUNT(*) as count FROM comparisons").get().count;

  console.log("\n=== Seed Complete ===");
  console.log(`Countries: ${countryCount}`);
  console.log(`Guides: ${guideCount}`);
  console.log(`Comparisons: ${comparisonCount}`);

  db.close();
}

main();
