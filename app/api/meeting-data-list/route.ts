import { NextResponse } from "next/server";

export async function GET() {
  try {
    const url = `https://raw.githubusercontent.com/ppcjobber/clerk-authentication-starter/main/app/archive/page.tsx`;
    const r = await fetch(url, { cache: 'no-store' });
    if (!r.ok) return NextResponse.json([]);

    const text = await r.text();

    // Today's date in the format stored in the archive e.g. "27 March 2026"
    const today = new Date().toLocaleDateString('en-GB', {
      day: 'numeric', month: 'long', year: 'numeric'
    });

    // Parse MEETINGS array by splitting on entry boundaries
    const results: { slug: string; date: string; course: string; going: string; races: number }[] = [];

    const slugMatches = text.match(/slug:\s*"([^"]+)"/g) || [];
    const dateMatches = text.match(/date:\s*"([^"]+)"/g) || [];
    const labelMatches = text.match(/label:\s*"([^"]+)"/g) || [];
    const goingMatches = text.match(/going:\s*"([^"]*)"/g) || [];
    const racesMatches = text.match(/races:\s*(\d+)/g) || [];

    const count = Math.min(slugMatches.length, dateMatches.length, labelMatches.length, racesMatches.length);

    for (let i = 0; i < count; i++) {
      const date  = dateMatches[i].replace(/date:\s*"/, '').replace(/"$/, '').trim();
      if (date !== today) continue;

      const slug  = slugMatches[i].replace(/slug:\s*"/, '').replace(/"$/, '').trim();
      const label = labelMatches[i].replace(/label:\s*"/, '').replace(/"$/, '').trim();
      const going = goingMatches[i] ? goingMatches[i].replace(/going:\s*"/, '').replace(/"$/, '').trim() : '';
      const races = parseInt(racesMatches[i].replace(/races:\s*/, ''));
      const course = label.split(' \u2014 ')[0];

      results.push({ slug, date, course, going, races });
    }

    return NextResponse.json(results);
  } catch {
    return NextResponse.json([]);
  }
}
