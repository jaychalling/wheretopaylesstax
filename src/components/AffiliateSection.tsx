import affiliatesData from "@/data/affiliates.json";

// TODO: affiliate tracking id — replace plain URLs with tracked affiliate links
// (e.g. Wise partner link, SafetyWing ambassador link, FreshBooks partner link)
// once affiliate program accounts are approved. Keep rel="sponsored" when doing so.

interface Affiliate {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  url: string;
  cta: string;
  audience: string[];
}

const affiliates: Affiliate[] = affiliatesData as Affiliate[];

export default function AffiliateSection({
  heading = "Tools for Moving & Working Abroad",
  className = "",
}: {
  heading?: string;
  className?: string;
}) {
  if (affiliates.length === 0) return null;

  return (
    <section className={className} aria-label="Recommended tools">
      <h2 className="text-xl font-heading font-bold mb-1">{heading}</h2>
      <p className="text-xs text-slate-400 mb-4">
        Some links below may become affiliate links, at no extra cost to you.
        We only list tools relevant to relocating and working internationally.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {affiliates.map((item) => (
          <div key={item.id} className="card flex flex-col">
            <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 mb-1">
              {item.category}
            </p>
            <h3 className="font-heading font-semibold text-slate-900 dark:text-white mb-1">
              {item.name}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3 flex-1">
              {item.tagline}
            </p>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline no-underline"
            >
              {item.cta} &rarr;
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
