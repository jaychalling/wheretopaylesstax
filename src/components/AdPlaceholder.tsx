interface AdPlaceholderProps {
  size?: "leaderboard" | "rectangle" | "skyscraper" | "banner";
  className?: string;
}

const sizes = {
  leaderboard: { width: "728px", height: "90px", label: "728x90" },
  rectangle: { width: "300px", height: "250px", label: "300x250" },
  skyscraper: { width: "160px", height: "600px", label: "160x600" },
  banner: { width: "100%", height: "90px", label: "Responsive" },
};

export default function AdPlaceholder({ size = "rectangle", className = "" }: AdPlaceholderProps) {
  const sizeConfig = sizes[size];

  return (
    <div
      className={`flex items-center justify-center bg-slate-100 border border-dashed border-slate-300 rounded text-slate-400 text-xs ${className}`}
      style={{
        width: size === "banner" ? "100%" : sizeConfig.width,
        height: sizeConfig.height,
        maxWidth: "100%",
      }}
    >
      <span>Advertisement ({sizeConfig.label})</span>
    </div>
  );
}
