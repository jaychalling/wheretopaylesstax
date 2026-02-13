import Link from "next/link";
import HomeSearchBar from "@/components/HomeSearchBar";

export default function NotFound() {
  return (
    <div className="section">
      <div className="page-container text-center">
        <h1 className="text-6xl font-heading font-bold text-primary-600 mb-4">404</h1>
        <h2 className="text-2xl font-heading font-semibold mb-4">Page Not Found</h2>
        <p className="text-slate-500 mb-8 max-w-md mx-auto">
          The page you are looking for does not exist or has been moved.
        </p>

        <div className="max-w-lg mx-auto mb-8">
          <p className="text-sm text-slate-400 mb-3">Try searching for a country:</p>
          <HomeSearchBar />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/" className="btn-primary btn-md no-underline text-slate-900 hover:text-slate-900">
            Go Home
          </Link>
          <Link href="/countries" className="btn-outline btn-md no-underline">
            Browse Countries
          </Link>
        </div>
      </div>
    </div>
  );
}
