import { NextResponse } from "next/server";

export async function GET() {
  try {
    const url = `https://raw.githubusercontent.com/ppcjobber/clerk-authentication-starter/main/app/archive/page.tsx`;
    const r = await fetch(url, { cache: 'no-store' });
    if (!r.ok) return NextResponse.json([]);

    const text = await r.text();

    // Build today's date string to match archive format: "27 March 2026"
    const now = new Date();
    const months = ['January','February','March','April','May','June',
                    'July','August','September','October','November','December'];
    const today = `${now.getUTCDate()} ${months[now.getUTCMonth()]} ${now.getUTCFullYear()}`;

    const results: { slug: string; date: string; course: string; going: string; races: number }[] = [];

    // Extract each { ... } block from the MEETINGS array
    const arrayMatch = text.match(/const MEETINGS[^=]*=\s*\[([\s\S]*?)\];/);
    if (!arrayMatch) return NextResponse.json([]);

    const arrayContent = arrayMatch[1];

    // Split on entry boundaries
    const entries = arrayContent.split(/\},\s*\{/);

    for (const entry of entries) {
      const slug  = (entry.match(/slug:\s*"([^"]+)"/)  || [])[1];
      const date  = (entry.match(/date:\s*"([^"]+)"/)  || [])[1];
      const label = (entry.match(/label:\s*"([^"]+)"/) || [])[1];
      const going = (entry.match(/going:\s*"([^"]*)"/) || [])[1] || '';
      const racesM = entry.match(/races:\s*(\d+)/);
      const races = racesM ? parseInt(racesM[1]) : 0;

      if (!slug || !date || !label) continue;
      if (date !== today) continue;

      const course = label.split(' \u2014 ')[0];
      results.push({ slug, date, course, going, races });
    }

    return NextResponse.json(results);

  } catch {
    return NextResponse.json([]);
  }
}
