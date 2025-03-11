import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

export default clerkMiddleware(async (auth, req) => {
  const url = new URL(req.url);

  // Allow public access to the root route
  if (url.pathname === "/") {
    return;
  }

  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

export const config = {
  matcher: [
    // Skip middleware for the root route
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)|$).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
