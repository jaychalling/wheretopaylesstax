import { ImageResponse } from "next/og";
import { getAllCountries } from "@/lib/data";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  const countries = getAllCountries();

  // Get top 5 lowest income tax countries
  const topByIncome = [...countries]
    .sort((a, b) => a.incomeTax.topRate - b.incomeTax.topRate)
    .slice(0, 5);

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
        {/* Accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "6px",
            background: "linear-gradient(90deg, #FBBF24, #F59E0B, transparent)",
            display: "flex",
          }}
        />

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
            wheretopaylesstax.com
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              fontSize: "54px",
              fontWeight: 800,
              color: "white",
              lineHeight: 1.1,
              display: "flex",
            }}
          >
            Tax Rankings 2026
          </div>
          <div
            style={{
              fontSize: "22px",
              color: "rgba(148, 163, 184, 0.8)",
              display: "flex",
            }}
          >
            Compare income tax, corporate tax & VAT across 50+ countries
          </div>
        </div>

        {/* Top countries list */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {topByIncome.map((country, i) => (
            <div
              key={country.slug}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                backgroundColor: "rgba(255,255,255,0.05)",
                borderRadius: "10px",
                padding: "12px 20px",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  color: i === 0 ? "#FBBF24" : "rgba(148, 163, 184, 0.5)",
                  width: "28px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                #{i + 1}
              </div>
              <div style={{ fontSize: "28px", lineHeight: 1, display: "flex" }}>
                {country.flag}
              </div>
              <div
                style={{
                  flex: 1,
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "white",
                  display: "flex",
                }}
              >
                {country.name}
              </div>
              <div style={{ display: "flex", gap: "24px" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "2px" }}>
                  <span style={{ fontSize: "18px", fontWeight: 700, color: "#22C55E", display: "flex" }}>
                    {country.incomeTax.topRate}%
                  </span>
                  <span style={{ fontSize: "11px", color: "rgba(148,163,184,0.6)", display: "flex" }}>
                    Income
                  </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "2px" }}>
                  <span
                    style={{
                      fontSize: "18px",
                      fontWeight: 700,
                      color: country.corporateTax.standardRate <= 15 ? "#22C55E" : "#F59E0B",
                      display: "flex",
                    }}
                  >
                    {country.corporateTax.standardRate}%
                  </span>
                  <span style={{ fontSize: "11px", color: "rgba(148,163,184,0.6)", display: "flex" }}>
                    Corporate
                  </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "2px" }}>
                  <span
                    style={{
                      fontSize: "18px",
                      fontWeight: 700,
                      color: country.vat.standardRate === 0 ? "#22C55E" : "rgba(148,163,184,0.8)",
                      display: "flex",
                    }}
                  >
                    {country.vat.standardRate}%
                  </span>
                  <span style={{ fontSize: "11px", color: "rgba(148,163,184,0.6)", display: "flex" }}>
                    VAT
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
