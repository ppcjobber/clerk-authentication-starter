import { NextResponse } from "next/server";

export async function GET() {
  try {
    const url = `https://raw.githubusercontent.com/ppcjobber/clerk-authentication-starter/main/app/archive/page.tsx`;
    const r = await fetch(url, { cache: 'no-store' });
    if (!r.ok) return NextResponse.json({ today: [], tomorrow: [] });

    const text = await r.text();

    const now = new Date();
    const months = ['January','February','March','April','May','June',
                    'July','August','September','October','November','December'];

    const todayDate  = new Date();
    const tomorrowDate = new Date(Date.now() + 86400000);

    const today    = `${todayDate.getUTCDate()} ${months[todayDate.getUTCMonth()]} ${todayDate.getUTCFullYear()}`;
    const tomorrow = `${tomorrowDate.getUTCDate()} ${months[tomorrowDate.getUTCMonth()]} ${tomorrowDate.getUTCFullYear()}`;

    // Extract MEETINGS array block
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
