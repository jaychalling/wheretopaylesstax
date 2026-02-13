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

export default function AdPlaceholder({ size = "rectangle", className = "" }: AdPlaceholderProps) {
  const sizeConfig = sizes[size];

  return (
    <div
      className={className}
      data-ad-slot={size}
      aria-hidden="true"
      style={{
        width: size === "banner" ? "100%" : sizeConfig.width,
        height: sizeConfig.height,
        maxWidth: "100%",
      }}
    />
  );
}
