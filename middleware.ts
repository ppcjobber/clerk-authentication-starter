import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/archive",
  "/pricing",
  "/success",
  "/meetings/(.*)",
  "/api/create-checkout-session",
  "/api/check-subscription",
  "/api/meeting-data",
  '/api/meeting-data-list',
  "/courses/(.*)",
  "/privacy",
  "/terms",
  "/responsible-gambling",
  "/contact",
  "/about",
  "/how-it-works",
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
