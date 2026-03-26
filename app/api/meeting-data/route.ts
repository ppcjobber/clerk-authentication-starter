import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");
  if (!slug) return NextResponse.json({ error: "No slug" }, { status: 400 });

  try {
    const r = await fetch(
      `https://raw.githubusercontent.com/ppcjobber/clerk-authentication-starter/main/public/data/${slug}.json`,
      { next: { revalidate: 300 } }
    );
    if (!r.ok) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const data = await r.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
