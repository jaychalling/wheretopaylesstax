import { ImageResponse } from "next/og";
import { getAllGuides, getGuideBySlug } from "@/lib/data";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllGuides().map((g) => ({ slug: g.slug }));
}

const CATEGORY_COLORS: Record<string, string> = {
  "Strategy": "#6366F1",
  "Regions": "#0EA5E9",
  "Business": "#10B981",
  "Visas": "#F59E0B",
  "Tax Types": "#8B5CF6",
  "Lifestyle": "#EC4899",
};

export default async function Image({ params }: { params: { slug: string } }) {
  const guide = getGuideBySlug(params.slug);

  if (!guide) {
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

  const categoryColor = CATEGORY_COLORS[guide.category] ?? "#3B82F6";

  // Truncate title for display if too long
  const displayTitle =
    guide.title.length > 60
      ? guide.title.slice(0, 57) + "..."
      : guide.title;

  const wordCount = guide.sections.reduce(
    (acc, s) => acc + s.content.split(/\s+/).length,
    0
  );

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
            background: `linear-gradient(90deg, ${categoryColor}, transparent)`,
            display: "flex",
          }}
        />

        {/* Top label */}
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
              fontSize: "13px",
              color: "rgba(148, 163, 184, 0.8)",
              display: "flex",
              letterSpacing: "0.08em",
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
              fontSize: "13px",
              fontWeight: 600,
              color: categoryColor,
              display: "flex",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            {guide.category}
          </div>
        </div>

        {/* Guide icon */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "72px",
            height: "72px",
            borderRadius: "16px",
            backgroundColor: `${categoryColor}20`,
            border: `2px solid ${categoryColor}40`,
            marginBottom: "28px",
          }}
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            style={{ display: "flex" }}
          >
            <path
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              stroke={categoryColor}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: displayTitle.length > 45 ? "40px" : "48px",
            fontWeight: 800,
            color: "white",
            lineHeight: 1.15,
            display: "flex",
            flexDirection: "column",
            marginBottom: "28px",
            maxWidth: "900px",
          }}
        >
          {displayTitle}
        </div>

        {/* Meta info */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
            marginTop: "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "rgba(255,255,255,0.07)",
              borderRadius: "8px",
              padding: "8px 16px",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <span
              style={{
                fontSize: "14px",
                color: "rgba(148, 163, 184, 0.9)",
                display: "flex",
              }}
            >
              {guide.readTime} min read
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "rgba(255,255,255,0.07)",
              borderRadius: "8px",
              padding: "8px 16px",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <span
              style={{
                fontSize: "14px",
                color: "rgba(148, 163, 184, 0.9)",
                display: "flex",
              }}
            >
              ~{wordCount.toLocaleString()} words
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "rgba(255,255,255,0.07)",
              borderRadius: "8px",
              padding: "8px 16px",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <span
              style={{
                fontSize: "14px",
                color: "rgba(148, 163, 184, 0.9)",
                display: "flex",
              }}
            >
              Updated {guide.lastUpdated}
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
