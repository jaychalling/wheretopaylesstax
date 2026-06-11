interface AdPlaceholderProps {
  size?: "leaderboard" | "rectangle" | "skyscraper" | "banner";
  className?: string;
}

const sizes = {
  leaderboard: { width: "728px", height: "90px" },
  rectangle: { width: "300px", height: "250px" },
  skyscraper: { width: "160px", height: "600px" },
  banner: { width: "100%", height: "90px" },
};

// Real AdSense unit, gated entirely behind an env var.
// Set NEXT_PUBLIC_ADSENSE_CLIENT (e.g. in Vercel project settings) to activate.
// When unset, this component renders nothing at all (no empty placeholder boxes).
const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

// TODO: replace with real ad unit slot IDs once AdSense units are created.
// Optionally set NEXT_PUBLIC_ADSENSE_SLOT to a default slot ID via env.
const ADSENSE_SLOT = process.env.NEXT_PUBLIC_ADSENSE_SLOT;

export default function AdPlaceholder({ size = "rectangle", className = "" }: AdPlaceholderProps) {
  // Ads are disabled until NEXT_PUBLIC_ADSENSE_CLIENT is configured.
  if (!ADSENSE_CLIENT) return null;

  const sizeConfig = sizes[size];

  return (
    <div
      className={className}
      data-ad-container={size}
      style={{
        width: size === "banner" ? "100%" : sizeConfig.width,
        maxWidth: "100%",
        minHeight: sizeConfig.height,
      }}
    >
      <ins
        className="adsbygoogle"
        style={{ display: "block", width: "100%", height: sizeConfig.height }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={ADSENSE_SLOT}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      <script
        dangerouslySetInnerHTML={{
          __html: "(adsbygoogle = window.adsbygoogle || []).push({});",
        }}
      />
    </div>
  );
}
