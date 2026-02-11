import { NextRequest, NextResponse } from "next/server";
import { searchCountries } from "@/lib/data";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q") || "";

  if (q.length < 2) {
    return NextResponse.json({ countries: [] });
  }

  const results = searchCountries(q).slice(0, 8).map((c) => ({
    slug: c.slug,
    name: c.name,
    flag: c.flag,
  }));

  return NextResponse.json({ countries: results });
}
