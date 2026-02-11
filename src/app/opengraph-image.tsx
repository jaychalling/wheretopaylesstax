import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "WhereToPayLessTax - Compare Taxes. Move Smarter.";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #1E3A8A 0%, #1D4ED8 50%, #3B82F6 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
          position: "relative",
        }}
      >
        {/* Background pattern */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 0%, transparent 50%)",
            display: "flex",
          }}
        />

        {/* Logo icon */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "80px",
            height: "80px",
            borderRadius: "20px",
            backgroundColor: "rgba(255,255,255,0.15)",
            marginBottom: "32px",
            border: "2px solid rgba(255,255,255,0.3)",
          }}
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 32 32"
            fill="none"
          >
            <circle cx="16" cy="16" r="14" stroke="white" strokeWidth="2" />
            <path
              d="M11 21L16 11L21 21"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <line
              x1="13"
              y1="18"
              x2="19"
              y2="18"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              fontSize: "56px",
              fontWeight: 700,
              color: "white",
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
              textAlign: "center",
              display: "flex",
            }}
          >
            WhereToPayLessTax
          </div>

          <div
            style={{
              fontSize: "28px",
              fontWeight: 400,
              color: "rgba(255,255,255,0.85)",
              textAlign: "center",
              display: "flex",
            }}
          >
            Compare Taxes. Move Smarter.
          </div>
        </div>

        {/* Stats bar */}
        <div
          style={{
            display: "flex",
            gap: "48px",
            marginTop: "48px",
            padding: "20px 40px",
            backgroundColor: "rgba(255,255,255,0.1)",
            borderRadius: "16px",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <span
              style={{
                fontSize: "32px",
                fontWeight: 700,
                color: "#FBBF24",
                display: "flex",
              }}
            >
              50+
            </span>
            <span
              style={{
                fontSize: "14px",
                color: "rgba(255,255,255,0.7)",
                display: "flex",
              }}
            >
              Countries
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <span
              style={{
                fontSize: "32px",
                fontWeight: 700,
                color: "#FBBF24",
                display: "flex",
              }}
            >
              6
            </span>
            <span
              style={{
                fontSize: "14px",
                color: "rgba(255,255,255,0.7)",
                display: "flex",
              }}
            >
              Tax Types
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <span
              style={{
                fontSize: "32px",
                fontWeight: 700,
                color: "#FBBF24",
                display: "flex",
              }}
            >
              Free
            </span>
            <span
              style={{
                fontSize: "14px",
                color: "rgba(255,255,255,0.7)",
                display: "flex",
              }}
            >
              Always
            </span>
          </div>
        </div>

        {/* Domain */}
        <div
          style={{
            position: "absolute",
            bottom: "32px",
            fontSize: "16px",
            color: "rgba(255,255,255,0.5)",
            display: "flex",
          }}
        >
          wheretopayless.tax
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
