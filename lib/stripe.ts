import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export const PRICES = {
  monthly: "price_1TEzDGEduSNHToGx9qNj7Aad",
  dayPass: "price_1TEzCaEduSNHToGxTZGIPjAj",
};

export async function hasActiveAccess(userId: string): Promise<boolean> {
  try {
    const customers = await stripe.customers.search({
      query: `metadata['clerkUserId']:'${userId}'`,
    });
    if (!customers.data.length) return false;

    const customerId = customers.data[0].id;

    const subs = await stripe.subscriptions.list({
      customer: customerId,
      status: "active",
    });
    if (subs.data.length > 0) return true;

    const today = new Date().toISOString().split("T")[0];
    const sessions = await stripe.checkout.sessions.list({
      customer: customerId,
      limit: 20,
    });
    return sessions.data.some(
      (s) =>
        s.status === "complete" &&
        s.metadata?.type === "day_pass" &&
        s.metadata?.date === today
    );
  } catch {
    return false;
  }
}
