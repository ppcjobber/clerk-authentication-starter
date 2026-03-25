import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { hasActiveAccess } from "@/lib/stripe";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ active: false });
  const active = await hasActiveAccess(userId);
  return NextResponse.json({ active });
}
