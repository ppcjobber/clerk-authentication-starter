import { NextResponse } from "next/server";

export async function GET() {
  try {
    const url = `https://raw.githubusercontent.com/ppcjobber/clerk-authentication-starter/main/app/archive/page.tsx`;
    const r = await fetch(url, { cache: 'no-store' });
    if (!r.ok) return NextResponse.json([]);
    
    const text = await r.text();
    const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    
    // Extract MEETINGS array entries
    const matches = [...text.matchAll(/slug:\s*"([^"]+)"[^}]*date:\s*"([^"]+)"[^}]*label:\s*"([^"]+)"[^}]*races:\s*(\d+)/gs)];
    
    const todaysMeetings = matches
      .filter(m => m[2] === today)
      .map(m => ({ slug: m[1], date: m[2], course: m[3].split(' — ')[0], races: parseInt(m[4]) }));
    
    return NextResponse.json(todaysMeetings);
  } catch {
    return NextResponse.json([]);
  }
}
