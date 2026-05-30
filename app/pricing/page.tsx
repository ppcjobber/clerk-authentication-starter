import PricingClient from "./PricingClient";

export const metadata = {
  title: "PaceMap Pricing — Day Pass £2.99, Monthly £9.99",
  description: "Race 1 of every meeting is always free. Unlock the full card with a £2.99 day pass or £9.99 monthly subscription. No long-term commitment, cancel anytime.",
};

export default function PricingPage() {
  return <PricingClient />;
}
