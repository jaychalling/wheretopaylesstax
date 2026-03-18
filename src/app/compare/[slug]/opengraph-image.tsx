import { ImageResponse } from "next/og";
import { getComparisonBySlug, getComparisonSlugs } from "@/lib/data";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export function generateStaticParams() {
  return getComparisonSlugs().map((slug) => ({ slug }));
}

function getTaxColor(rate: number): string {
  if (rate === 0) return "#22C55E";
  if (rate <= 15) return "#84CC16";
  if (rate <= 25) return "#F59E0B";
  return "#EF4444";
}

export default async function Image({ params }: { params: { slug: string } }) {
  const comparison = getComparisonBySlug(params.slug);

  if (!comparison) {
    return new ImageResponse(
      (
        <div
          style={{
            background: "linear-gradient(135deg, #1E3A8A 0%, #1D4ED8 50%, #3B82F6 100%)",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ color: "white", fontSize: "48px", fontWeight: 700, display: "flex" }}>
            WhereToPayLessTax
          </div>
        </div>
      ),
      { ...size }
    );
  }

  const { countryA, countryB } = comparison;

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0F172A 0%, #1E293B 60%, #0F172A 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "52px 60px",
          position: "relative",
        }}
      >
        {/* Top label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "36px",
          }}
        >
          <div
            style={{
              fontSize: "13px",
              color: "rgba(148, 163, 184, 0.8)",
              display: "flex",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            wheretopaylesstax.com · Tax Comparison 2026
          </div>
        </div>

        {/* Countries header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "40px",
          }}
        >
          {/* Country A */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
              flex: 1,
            }}
          >
            <div style={{ fontSize: "72px", lineHeight: 1, display: "flex" }}>
              {countryA.flag}
            </div>
            <div
              style={{
                fontSize: "30px",
                fontWeight: 700,
                color: "white",
                display: "flex",
              }}
            >
              {countryA.name}
            </div>
          </div>

          {/* VS divider */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              padding: "0 32px",
            }}
          >
            <div
              style={{
                fontSize: "28px",
                fontWeight: 800,
                color: "rgba(148, 163, 184, 0.6)",
                display: "flex",
                letterSpacing: "0.1em",
              }}
            >
              VS
            </div>
          </div>

          {/* Country B */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
              flex: 1,
            }}
          >
            <div style={{ fontSize: "72px", lineHeight: 1, display: "flex" }}>
              {countryB.flag}
            </div>
            <div
              style={{
                fontSize: "30px",
                fontWeight: 700,
                color: "white",
                display: "flex",
              }}
            >
              {countryB.name}
            </div>
          </div>
        </div>

        {/* Tax comparison rows */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {/* Income Tax */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "rgba(255,255,255,0.05)",
              borderRadius: "12px",
              padding: "14px 24px",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontSize: "32px",
                  fontWeight: 800,
                  color: getTaxColor(countryA.incomeTax.topRate),
                  display: "flex",
                }}
              >
                {countryA.incomeTax.topRate}%
              </span>
            </div>
            <div
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontSize: "14px",
                  color: "rgba(148, 163, 184, 0.7)",
                  display: "flex",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                Income Tax
              </span>
            </div>
            <div
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontSize: "32px",
                  fontWeight: 800,
                  color: getTaxColor(countryB.incomeTax.topRate),
                  display: "flex",
                }}
              >
                {countryB.incomeTax.topRate}%
              </span>
            </div>
          </div>

          {/* Corporate Tax */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "rgba(255,255,255,0.05)",
              borderRadius: "12px",
              padding: "14px 24px",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
              <span
                style={{
                  fontSize: "32px",
                  fontWeight: 800,
                  color: getTaxColor(countryA.corporateTax.standardRate),
                  display: "flex",
                }}
              >
                {countryA.corporateTax.standardRate}%
              </span>
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
              <span
                style={{
                  fontSize: "14px",
                  color: "rgba(148, 163, 184, 0.7)",
                  display: "flex",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                Corporate Tax
              </span>
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
              <span
                style={{
                  fontSize: "32px",
                  fontWeight: 800,
                  color: getTaxColor(countryB.corporateTax.standardRate),
                  display: "flex",
                }}
              >
                {countryB.corporateTax.standardRate}%
              </span>
            </div>
          </div>

          {/* VAT */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "rgba(255,255,255,0.05)",
              borderRadius: "12px",
              padding: "14px 24px",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
              <span
                style={{
                  fontSize: "32px",
                  fontWeight: 800,
                  color: getTaxColor(countryA.vat.standardRate),
                  display: "flex",
                }}
              >
                {countryA.vat.standardRate}%
              </span>
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
              <span
                style={{
                  fontSize: "14px",
                  color: "rgba(148, 163, 184, 0.7)",
                  display: "flex",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                VAT
              </span>
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
              <span
                style={{
                  fontSize: "32px",
                  fontWeight: 800,
                  color: getTaxColor(countryB.vat.standardRate),
                  display: "flex",
                }}
              >
                {countryB.vat.standardRate}%
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
