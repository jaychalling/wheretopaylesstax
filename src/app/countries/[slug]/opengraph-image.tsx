import { ImageResponse } from "next/og";
import { getCountryBySlug, getAllCountries } from "@/lib/data";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllCountries().map((c) => ({ slug: c.slug }));
}

export default async function Image({ params }: { params: { slug: string } }) {
  const country = getCountryBySlug(params.slug);

  if (!country) {
    // Fallback OG image if country not found
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

  const incomeTaxColor =
    country.incomeTax.topRate === 0
      ? "#22C55E"
      : country.incomeTax.topRate <= 20
      ? "#84CC16"
      : country.incomeTax.topRate <= 35
      ? "#F59E0B"
      : "#EF4444";

  const corporateTaxColor =
    country.corporateTax.standardRate === 0
      ? "#22C55E"
      : country.corporateTax.standardRate <= 15
      ? "#84CC16"
      : country.corporateTax.standardRate <= 25
      ? "#F59E0B"
      : "#EF4444";

  const vatColor =
    country.vat.standardRate === 0
      ? "#22C55E"
      : country.vat.standardRate <= 10
      ? "#84CC16"
      : country.vat.standardRate <= 20
      ? "#F59E0B"
      : "#EF4444";

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0F172A 0%, #1E293B 60%, #0F172A 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "60px",
          position: "relative",
        }}
      >
        {/* Top bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              fontSize: "14px",
              color: "rgba(148, 163, 184, 0.8)",
              display: "flex",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            wheretopaylesstax.com
          </div>
          <div
            style={{
              width: "4px",
              height: "4px",
              borderRadius: "50%",
              backgroundColor: "rgba(148, 163, 184, 0.5)",
              display: "flex",
            }}
          />
          <div
            style={{
              fontSize: "14px",
              color: "rgba(148, 163, 184, 0.8)",
              display: "flex",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            Tax Guide 2026
          </div>
        </div>

        {/* Country name and flag */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
            marginBottom: "48px",
          }}
        >
          <div
            style={{
              fontSize: "96px",
              lineHeight: 1,
              display: "flex",
            }}
          >
            {country.flag}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div
              style={{
                fontSize: "60px",
                fontWeight: 800,
                color: "white",
                lineHeight: 1.1,
                display: "flex",
              }}
            >
              {country.name}
            </div>
            <div
              style={{
                fontSize: "22px",
                color: "rgba(148, 163, 184, 0.9)",
                display: "flex",
                gap: "12px",
              }}
            >
              <span style={{ display: "flex" }}>{country.region}</span>
              <span style={{ display: "flex", opacity: 0.5 }}>·</span>
              <span style={{ display: "flex" }}>{country.currency}</span>
              {country.digitalNomadVisa && (
                <>
                  <span style={{ display: "flex", opacity: 0.5 }}>·</span>
                  <span style={{ display: "flex", color: "#60A5FA" }}>Digital Nomad Visa</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Tax rate cards */}
        <div
          style={{
            display: "flex",
            gap: "20px",
          }}
        >
          {/* Income Tax */}
          <div
            style={{
              flex: 1,
              backgroundColor: "rgba(255,255,255,0.06)",
              borderRadius: "16px",
              padding: "24px",
              border: "1px solid rgba(255,255,255,0.1)",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <div
              style={{
                fontSize: "13px",
                color: "rgba(148, 163, 184, 0.8)",
                display: "flex",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Income Tax
            </div>
            <div
              style={{
                fontSize: "52px",
                fontWeight: 800,
                color: incomeTaxColor,
                lineHeight: 1,
                display: "flex",
              }}
            >
              {country.incomeTax.topRate}%
            </div>
            <div
              style={{
                fontSize: "13px",
                color: "rgba(148, 163, 184, 0.6)",
                display: "flex",
              }}
            >
              Top marginal rate
            </div>
          </div>

          {/* Corporate Tax */}
          <div
            style={{
              flex: 1,
              backgroundColor: "rgba(255,255,255,0.06)",
              borderRadius: "16px",
              padding: "24px",
              border: "1px solid rgba(255,255,255,0.1)",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <div
              style={{
                fontSize: "13px",
                color: "rgba(148, 163, 184, 0.8)",
                display: "flex",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Corporate Tax
            </div>
            <div
              style={{
                fontSize: "52px",
                fontWeight: 800,
                color: corporateTaxColor,
                lineHeight: 1,
                display: "flex",
              }}
            >
              {country.corporateTax.standardRate}%
            </div>
            <div
              style={{
                fontSize: "13px",
                color: "rgba(148, 163, 184, 0.6)",
                display: "flex",
              }}
            >
              Standard rate
            </div>
          </div>

          {/* VAT */}
          <div
            style={{
              flex: 1,
              backgroundColor: "rgba(255,255,255,0.06)",
              borderRadius: "16px",
              padding: "24px",
              border: "1px solid rgba(255,255,255,0.1)",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <div
              style={{
                fontSize: "13px",
                color: "rgba(148, 163, 184, 0.8)",
                display: "flex",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              VAT / Sales Tax
            </div>
            <div
              style={{
                fontSize: "52px",
                fontWeight: 800,
                color: vatColor,
                lineHeight: 1,
                display: "flex",
              }}
            >
              {country.vat.standardRate}%
            </div>
            <div
              style={{
                fontSize: "13px",
                color: "rgba(148, 163, 184, 0.6)",
                display: "flex",
              }}
            >
              Standard rate
            </div>
          </div>

          {/* Capital Gains */}
          <div
            style={{
              flex: 1,
              backgroundColor: "rgba(255,255,255,0.06)",
              borderRadius: "16px",
              padding: "24px",
              border: "1px solid rgba(255,255,255,0.1)",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <div
              style={{
                fontSize: "13px",
                color: "rgba(148, 163, 184, 0.8)",
                display: "flex",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Capital Gains
            </div>
            <div
              style={{
                fontSize: "52px",
                fontWeight: 800,
                color:
                  country.capitalGainsTax.rate === 0
                    ? "#22C55E"
                    : country.capitalGainsTax.rate <= 20
                    ? "#84CC16"
                    : "#F59E0B",
                lineHeight: 1,
                display: "flex",
              }}
            >
              {country.capitalGainsTax.rate}%
            </div>
            <div
              style={{
                fontSize: "13px",
                color: "rgba(148, 163, 184, 0.6)",
                display: "flex",
              }}
            >
              Standard rate
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
