import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { stripe, PRICES } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const { type } = await req.json();
  const isMonthly = type === "monthly";
  const priceId = isMonthly ? PRICES.monthly : PRICES.dayPass;
  const mode = isMonthly ? "subscription" : "payment";
  const baseUrl = process.env.NEXT_PUBLIC_URL || "https://pacemap.co.uk";
  const today = new Date().toISOString().split("T")[0];

  const existing = await stripe.customers.search({
    query: `metadata['clerkUserId']:'${userId}'`,
  });
  let customerId: string;
  if (existing.data.length > 0) {
    customerId = existing.data[0].id;
  } else {
    const c = await stripe.customers.create({ metadata: { clerkUserId: userId } });
    customerId = c.id;
  }

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/pricing`,
    metadata: {
      clerkUserId: userId,
      type: isMonthly ? "subscription" : "day_pass",
      date: today,
    },
  });

  return NextResponse.json({ url: session.url });
}
