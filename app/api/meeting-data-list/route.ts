import { NextResponse } from "next/server";

export async function GET() {
  try {
    const url = `https://raw.githubusercontent.com/ppcjobber/clerk-authentication-starter/main/app/archive/page.tsx`;
    const r = await fetch(url, { cache: 'no-store' });
    if (!r.ok) return NextResponse.json({ today: [], tomorrow: [] });

    const text = await r.text();

    const months = ['January','February','March','April','May','June',
                    'July','August','September','October','November','December'];

    // UK is UTC+0 in winter, UTC+1 in summer (BST starts last Sunday March)
    // March 27 2026 is after BST starts so UTC+1
    const nowUtc = new Date();
    const ukOffsetMs = 60 * 60 * 1000; // UTC+1 (BST)
    const ukNow = new Date(nowUtc.getTime() + ukOffsetMs);
    
    const today    = `${ukNow.getUTCDate()} ${months[ukNow.getUTCMonth()]} ${ukNow.getUTCFullYear()}`;
    const ukTom    = new Date(ukNow.getTime() + 86400000);
    const tomorrow = `${ukTom.getUTCDate()} ${months[ukTom.getUTCMonth()]} ${ukTom.getUTCFullYear()}`;

    const arrayMatch = text.match(/const MEETINGS[^=]*=\s*\[([\s\S]*?)\];/);
    if (!arrayMatch) return NextResponse.json({ today: [], tomorrow: [] });

    const entries = arrayMatch[1].split(/\},\s*\{/);

    const todayMeetings:    { slug: string; course: string; going: string; races: number; courseSlug: string }[] = [];
    const tomorrowMeetings: { slug: string; course: string; going: string; races: number; courseSlug: string }[] = [];

    for (const entry of entries) {
      const slug       = (entry.match(/slug:\s*"([^"]+)"/)       || [])[1];
      const date       = (entry.match(/date:\s*"([^"]+)"/)       || [])[1];
      const label      = (entry.match(/label:\s*"([^"]+)"/)      || [])[1];
      const going      = (entry.match(/going:\s*"([^"]*)"/)      || [])[1] || '';
      const courseSlug = (entry.match(/courseSlug:\s*"([^"]+)"/) || [])[1] || '';
      const racesM     = entry.match(/races:\s*(\d+)/);
      const races      = racesM ? parseInt(racesM[1]) : 0;

      if (!slug || !date || !label) continue;

      const course = label.split(' \u2014 ')[0];
      const item   = { slug, course, going, races, courseSlug };

      if (date === today)    todayMeetings.push(item);
      if (date === tomorrow) tomorrowMeetings.push(item);
    }

    return NextResponse.json({ today: todayMeetings, tomorrow: tomorrowMeetings });

  } catch {
    return NextResponse.json({ today: [], tomorrow: [] });
  }
}
